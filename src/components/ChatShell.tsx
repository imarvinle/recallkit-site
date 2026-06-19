/**
 * ChatGPT-style two-pane shell shared by /library and /c/:id.
 *
 * Owns the cross-page state — extension detection + the conversation
 * list — and renders the left sidebar (quick actions, projects,
 * recent conversations, user pill) plus the main pane top bar. Pages
 * pass their own content via `children`.
 *
 * Visual fidelity is the goal: light-gray (#f9f9f9) sidebar, single
 * `#ececec` hover/selected fill, no rules between sections, right-side
 * collapse toggle that hides the sidebar entirely.
 */

import { useEffect, useMemo, useState } from 'react';
import {
  BridgeError,
  detectExtension,
  listConversations,
} from '../lib/extension-bridge';
import type { ConversationIndexRow } from '../lib/types';
import { ROW_SCHEMA_VERSION } from '../lib/types';

const PROBE_TIMEOUT_HINT_MS = 3500;
const RECENT_SHOWN = 12;

export interface ShellState {
  installed: boolean | null;
  version?: string;
  rows: ConversationIndexRow[];
  loading: boolean;
  error?: string;
}

export default function ChatShell({
  currentId,
  children,
  /** Heading shown in the top bar (e.g. "ChatGPT" or the conv title). */
  title = 'ChatGPT',
  /** Optional rendered to the right of the top bar (e.g. share). */
  topRight,
}: {
  currentId?: string;
  children: React.ReactNode;
  title?: string;
  topRight?: React.ReactNode;
}) {
  const [state, setState] = useState<ShellState>({
    installed: null,
    rows: [],
    loading: true,
  });
  const [collapsed, setCollapsed] = useState<boolean>(() =>
    typeof window !== 'undefined' && window.localStorage?.getItem('rk:sidebar') === 'collapsed',
  );
  const [search, setSearch] = useState('');
  const [accountFilter, setAccountFilter] = useState<string>(() => {
    try {
      return window.localStorage?.getItem('rk:accountFilter') ?? 'all';
    } catch {
      return 'all';
    }
  });
  useEffect(() => {
    try {
      window.localStorage?.setItem('rk:accountFilter', accountFilter);
    } catch {
      /* ignore */
    }
  }, [accountFilter]);

  const accounts = useMemo(() => collectAccounts(state.rows), [state.rows]);
  const visibleRows = useMemo(() => {
    if (accountFilter === 'all') return state.rows;
    if (accountFilter === 'unknown') return state.rows.filter((r) => !r.account_id);
    return state.rows.filter((r) => r.account_id === accountFilter);
  }, [state.rows, accountFilter]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const probe = await detectExtension();
      if (cancelled) return;
      if (!probe.installed) {
        setState({ installed: false, rows: [], loading: false });
        return;
      }
      setState((s) => ({ ...s, installed: true, version: probe.version }));
      try {
        const r = await listConversations();
        if (cancelled) return;
        setState({
          installed: true,
          version: probe.version,
          rows: r.rows,
          loading: false,
        });
      } catch (err) {
        if (cancelled) return;
        setState({
          installed: true,
          version: probe.version,
          rows: [],
          loading: false,
          error:
            err instanceof BridgeError ? err.message : (err as Error).message ?? '加载失败',
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleCollapse = () => {
    setCollapsed((c) => {
      const next = !c;
      try {
        window.localStorage?.setItem('rk:sidebar', next ? 'collapsed' : 'open');
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  return (
    <div className="flex min-h-screen bg-white text-zinc-900">
      <Sidebar
        rows={visibleRows}
        currentId={currentId}
        collapsed={collapsed}
        onToggle={toggleCollapse}
        search={search}
        onSearchChange={setSearch}
        installed={state.installed}
        loading={state.loading}
        error={state.error}
        accounts={accounts}
        accountFilter={accountFilter}
        onAccountFilterChange={setAccountFilter}
      />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopBar title={title} right={topRight} sidebarCollapsed={collapsed} onToggle={toggleCollapse} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

function Sidebar({
  rows,
  currentId,
  collapsed,
  onToggle,
  search,
  onSearchChange,
  installed,
  loading,
  error,
  accounts,
  accountFilter,
  onAccountFilterChange,
}: {
  rows: ConversationIndexRow[];
  currentId?: string;
  collapsed: boolean;
  onToggle: () => void;
  search: string;
  onSearchChange: (v: string) => void;
  installed: boolean | null;
  loading: boolean;
  error?: string;
  accounts: AccountSummary[];
  accountFilter: string;
  onAccountFilterChange: (id: string) => void;
}) {
  const [showAllRecent, setShowAllRecent] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Group by project; rows without `project_id` go to "recent".
  const { projects, recent } = useMemo(() => {
    const projMap = new Map<string, { id: string; name: string; rows: ConversationIndexRow[] }>();
    const recentList: ConversationIndexRow[] = [];
    for (const r of rows) {
      if (r.project_id) {
        const cur = projMap.get(r.project_id);
        const name = r.project_name || r.project_slug || r.project_id.slice(0, 8);
        if (cur) cur.rows.push(r);
        else projMap.set(r.project_id, { id: r.project_id, name, rows: [r] });
      } else {
        recentList.push(r);
      }
    }
    const projects = Array.from(projMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    return { projects, recent: recentList };
  }, [rows]);

  const filterMatch = (title: string | null) => {
    if (!search.trim()) return true;
    return (title || '').toLowerCase().includes(search.trim().toLowerCase());
  };
  const filteredRecent = recent.filter((r) => filterMatch(r.title));
  const visibleRecent = showAllRecent ? filteredRecent : filteredRecent.slice(0, RECENT_SHOWN);
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 8);

  if (collapsed) {
    return (
      <aside className="flex w-[60px] shrink-0 flex-col items-center bg-[#f9f9f9] py-3">
        <button
          onClick={onToggle}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-600 hover:bg-[#ececec] transition-colors"
          title="展开侧栏"
        >
          <SidebarToggleIcon />
        </button>
        <a
          href="https://chatgpt.com/"
          target="_blank"
          rel="noreferrer"
          className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg text-zinc-600 hover:bg-[#ececec] transition-colors"
          title="新聊天"
        >
          <PencilEditIcon />
        </a>
        <button
          onClick={onToggle}
          className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg text-zinc-600 hover:bg-[#ececec] transition-colors"
          title="搜索聊天"
        >
          <SearchIcon />
        </button>
      </aside>
    );
  }

  return (
    <aside className="flex h-screen w-[280px] shrink-0 flex-col bg-[#f9f9f9] sticky top-0">
      {/* Top: logo + collapse toggle */}
      <div className="flex items-center justify-between px-3 pt-3">
        <a href="/" className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#ececec]" title="KeepChat AI 主页">
          <Logo />
        </a>
        <button
          onClick={onToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 hover:bg-[#ececec] transition-colors"
          title="收起侧栏"
        >
          <SidebarToggleIcon />
        </button>
      </div>

      {/* Quick actions */}
      <div className="mt-2 flex flex-col gap-0.5 px-2">
        <SidebarItem
          href="https://chatgpt.com/"
          external
          icon={<PencilEditIcon />}
          label="新聊天"
        />
        <SidebarSearchItem value={search} onChange={onSearchChange} />
        <SidebarItem
          href="https://chatgpt.com/codex"
          external
          icon={<CodexIcon />}
          label="Codex"
          rightIcon={<ExternalIcon />}
        />
        <SidebarItem icon={<DotsIcon />} label="更多" muted />
      </div>

      {/* Body — scrollable */}
      <div className="flex-1 overflow-y-auto px-2 pt-3">
        {installed === false && <InstallPrompt />}
        {installed && loading && (
          <p className="px-3 py-4 text-xs text-zinc-400">读取归档中…</p>
        )}
        {installed && error && (
          <p className="px-3 py-4 text-xs text-red-500">读取失败：{error}</p>
        )}
        {installed && !loading && !error && rows.length === 0 && (
          <p className="px-3 py-4 text-xs text-zinc-400">还没有备份的会话。打开 ChatGPT，让 KeepChat AI 开始实时备份。</p>
        )}

        {projects.length > 0 && (
          <>
            <SectionLabel>项目</SectionLabel>
            <div className="flex flex-col gap-0.5">
              <SidebarItem icon={<FolderPlusIcon />} label="新项目" muted />
              {visibleProjects.map((p) => (
                <ProjectFolder
                  key={p.id}
                  name={p.name}
                  rows={p.rows}
                  currentId={currentId}
                  filter={search}
                />
              ))}
              {projects.length > 8 && (
                <button
                  onClick={() => setShowAllProjects((v) => !v)}
                  className="px-3 py-1.5 text-left text-[13px] text-zinc-500 hover:bg-[#ececec] rounded-lg flex items-center gap-2"
                >
                  <DotsIcon /> {showAllProjects ? '收起' : '更多'}
                </button>
              )}
            </div>
          </>
        )}

        {filteredRecent.length > 0 && (
          <>
            <SectionLabel>最近</SectionLabel>
            <div className="flex flex-col gap-0.5">
              {visibleRecent.map((r) => (
                <ConversationLink key={r.id} row={r} active={r.id === currentId} />
              ))}
              {filteredRecent.length > RECENT_SHOWN && !showAllRecent && (
                <button
                  onClick={() => setShowAllRecent(true)}
                  className="px-3 py-1.5 text-left text-[13px] text-zinc-500 hover:bg-[#ececec] rounded-lg"
                >
                  显示更多
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* User pill at bottom — also serves as the workspace switcher */}
      <UserPill
        rows={rows}
        accounts={accounts}
        accountFilter={accountFilter}
        onAccountFilterChange={onAccountFilterChange}
      />

      {installed === null && (
        <p className="px-4 pb-2 text-[10px] text-zinc-400 animate-pulse">
          {/* < PROBE_TIMEOUT_HINT_MS shows quietly */}
          检测扩展中…
        </p>
      )}
      {/* expose hint timeout for build optimisers */}
      <span className="hidden">{PROBE_TIMEOUT_HINT_MS}</span>
    </aside>
  );
}

function ProjectFolder({
  name,
  rows,
  currentId,
  filter,
}: {
  name: string;
  rows: ConversationIndexRow[];
  currentId?: string;
  filter: string;
}) {
  const expandedDefault = rows.some((r) => r.id === currentId);
  const [open, setOpen] = useState(expandedDefault);
  const filtered = filter.trim()
    ? rows.filter((r) => (r.title || '').toLowerCase().includes(filter.trim().toLowerCase()))
    : rows;

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-zinc-700 hover:bg-[#ececec] transition-colors"
      >
        <FolderIcon open={open} />
        <span className="truncate flex-1">{name}</span>
        <span className="text-[10px] text-zinc-400">{rows.length}</span>
      </button>
      {open && (
        <div className="ml-4 flex flex-col gap-0.5 border-l border-zinc-200 pl-2">
          {filtered.map((r) => (
            <ConversationLink key={r.id} row={r} active={r.id === currentId} />
          ))}
        </div>
      )}
    </div>
  );
}

function ConversationLink({ row, active }: { row: ConversationIndexRow; active: boolean }) {
  return (
    <a
      href={`/c/${encodeURIComponent(row.id)}`}
      title={row.title || '(无标题)'}
      className={`group flex items-center gap-1 rounded-lg px-3 py-1.5 text-[13.5px] transition-colors ${
        active ? 'bg-[#ececec] text-zinc-900' : 'text-zinc-700 hover:bg-[#ececec]'
      }`}
    >
      <span className="flex-1 truncate">{row.title || '(无标题)'}</span>
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 pb-1 pt-4 text-[11px] font-medium text-zinc-400">{children}</div>
  );
}

function SidebarItem({
  href,
  external,
  icon,
  label,
  rightIcon,
  muted,
  onClick,
}: {
  href?: string;
  external?: boolean;
  icon: React.ReactNode;
  label: string;
  rightIcon?: React.ReactNode;
  muted?: boolean;
  onClick?: () => void;
}) {
  const cls = `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
    muted ? 'text-zinc-500' : 'text-zinc-800'
  } hover:bg-[#ececec]`;
  const inner = (
    <>
      <span className="flex h-5 w-5 items-center justify-center text-zinc-700">{icon}</span>
      <span className="flex-1 truncate">{label}</span>
      {rightIcon && <span className="text-zinc-400">{rightIcon}</span>}
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        className={cls}
      >
        {inner}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={`${cls} text-left w-full`}>
      {inner}
    </button>
  );
}

function SidebarSearchItem({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex cursor-text items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-800 hover:bg-[#ececec] focus-within:bg-[#ececec] transition-colors">
      <span className="flex h-5 w-5 items-center justify-center text-zinc-700">
        <SearchIcon />
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="搜索聊天"
        className="flex-1 bg-transparent placeholder:text-zinc-500 focus:outline-none"
      />
    </label>
  );
}

function InstallPrompt() {
  return (
    <div className="mx-2 mt-2 rounded-xl border border-zinc-200 bg-white p-3 text-[12.5px] leading-relaxed text-zinc-600">
      <p className="font-medium text-zinc-900">未检测到扩展</p>
      <p className="mt-1">
        本页面只是 KeepChat AI 扩展的在线阅读窗口；请先安装扩展并备份至少一条会话。
      </p>
      <a
        href="/"
        className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-medium text-zinc-900 hover:underline"
      >
        前往首页 →
      </a>
    </div>
  );
}

interface AccountSummary {
  id: string;
  email?: string;
  workspace_name?: string;
  workspace_plan_type?: string;
  workspace_structure?: 'personal' | 'workspace' | 'unknown';
  count: number;
  /**
   * Highest `_v` (row schema version) seen across this account's rows.
   * Used to distinguish "all rows are pre-workspace legacy backups"
   * from "rows are modern but workspace fields happened to come back
   * empty". Undefined if every row also lacks `_v` (treated as 0).
   */
  maxV: number;
}

const PLAN_DISPLAY: Record<string, string> = {
  free: 'Free',
  plus: 'Plus',
  pro: 'Pro',
  prolite: 'Pro Lite',
  team: 'Team',
  enterprise: 'Enterprise',
  go: 'Go',
};

function prettyPlan(p?: string): string | undefined {
  if (!p) return undefined;
  return PLAN_DISPLAY[p] ?? p.charAt(0).toUpperCase() + p.slice(1);
}

function accountPrimaryLabel(a: AccountSummary): string {
  // Always lead with the email so users with multiple ChatGPT logins
  // can tell them apart at a glance — workspace name follows for Team
  // memberships. Legacy rows (saved before the workspace metadata was
  // captured) use the account-id suffix as a last-resort disambiguator.
  const email = a.email;
  if (a.workspace_structure === 'workspace' && a.workspace_name) {
    return email ? `${email} · ${a.workspace_name}` : a.workspace_name;
  }
  if (a.workspace_structure === 'personal' && email) {
    return `${email} · 个人`;
  }
  if (email) {
    // No workspace metadata — append id suffix so duplicate-email rows
    // are at least visually distinct.
    return `${email} · #${a.id.slice(0, 6)}`;
  }
  return a.id.slice(0, 8);
}

function accountSecondaryLabel(a: AccountSummary): string {
  const plan = prettyPlan(a.workspace_plan_type);
  if (a.workspace_structure === 'workspace') {
    return plan ? `${plan} · 工作区` : '工作区';
  }
  if (a.workspace_structure === 'personal') {
    return plan ? `${plan} · 个人空间` : '个人空间';
  }
  // No workspace identity captured. Use the row schema version to
  // distinguish two distinct cases that look identical at the field
  // level — without `_v` we'd label real personal accounts (whose
  // workspace fetch happened to fail) as "历史归档", which confused
  // users on first launch.
  if (a.maxV < ROW_SCHEMA_VERSION) {
    return '历史归档 · 重新备份后会显示';
  }
  return '未识别 · 刷新对话后会显示';
}

function accountInitial(a: AccountSummary): string {
  if (a.workspace_structure === 'workspace' && a.workspace_name) {
    return a.workspace_name[0]?.toUpperCase() || '·';
  }
  if (a.workspace_structure === 'personal') return 'P';
  return (a.email?.[0] || a.id[0] || '·').toUpperCase();
}

function collectAccounts(rows: ConversationIndexRow[]): AccountSummary[] {
  const map = new Map<string, AccountSummary>();
  let untagged = 0;
  let untaggedMaxV = 0;
  for (const r of rows) {
    const rowV = r._v ?? 0;
    if (!r.account_id) {
      untagged++;
      if (rowV > untaggedMaxV) untaggedMaxV = rowV;
      continue;
    }
    const cur = map.get(r.account_id);
    if (cur) {
      cur.count++;
      if (rowV > cur.maxV) cur.maxV = rowV;
      if (!cur.email && r.account_email) cur.email = r.account_email;
      if (!cur.workspace_name && r.workspace_name) cur.workspace_name = r.workspace_name;
      if (!cur.workspace_plan_type && r.workspace_plan_type)
        cur.workspace_plan_type = r.workspace_plan_type;
      if (!cur.workspace_structure && r.workspace_structure)
        cur.workspace_structure = r.workspace_structure;
    } else {
      map.set(r.account_id, {
        id: r.account_id,
        email: r.account_email,
        workspace_name: r.workspace_name,
        workspace_plan_type: r.workspace_plan_type,
        workspace_structure: r.workspace_structure,
        count: 1,
        maxV: rowV,
      });
    }
  }
  const tagged = Array.from(map.values()).sort((a, b) => b.count - a.count);
  if (untagged > 0) {
    tagged.push({
      id: 'unknown',
      count: untagged,
      workspace_structure: 'unknown',
      maxV: untaggedMaxV,
    });
  }
  return tagged;
}

function UserPill({
  rows,
  accounts,
  accountFilter,
  onAccountFilterChange,
}: {
  rows: ConversationIndexRow[];
  accounts: AccountSummary[];
  accountFilter: string;
  onAccountFilterChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const total = rows.length;

  const active = accounts.find((a) => a.id === accountFilter);
  const primary =
    accountFilter === 'all'
      ? '全部账号'
      : accountFilter === 'unknown'
        ? '未标注'
        : active
          ? accountPrimaryLabel(active)
          : '本地档案';
  const secondary =
    accountFilter === 'all'
      ? `${total} 条会话`
      : accountFilter === 'unknown'
        ? `${active?.count ?? 0} 条 · 历史归档`
        : active
          ? `${accountSecondaryLabel(active)} · ${active.count} 条`
          : '本地档案';
  const initial = active
    ? accountInitial(active)
    : (primary[0] || 'R').toUpperCase();

  return (
    <div className="relative border-t border-zinc-200/60 px-3 py-3">
      {open && accounts.length > 0 && (
        <>
          <button
            aria-label="关闭"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <div className="absolute bottom-[calc(100%-2px)] left-3 right-3 z-20 mb-1 max-h-[60vh] overflow-y-auto rounded-xl border border-zinc-200 bg-white py-1 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <SwitcherRow
              initial="·"
              label="全部账号"
              secondary={`${total} 条会话`}
              active={accountFilter === 'all'}
              onClick={() => {
                onAccountFilterChange('all');
                setOpen(false);
              }}
            />
            {accounts.map((a) => (
              <SwitcherRow
                key={a.id}
                initial={a.id === 'unknown' ? '?' : accountInitial(a)}
                label={
                  a.id === 'unknown'
                    ? '未标注（历史归档）'
                    : accountPrimaryLabel(a)
                }
                secondary={
                  a.id === 'unknown'
                    ? `${a.count} 条`
                    : `${accountSecondaryLabel(a)} · ${a.count} 条`
                }
                active={accountFilter === a.id}
                onClick={() => {
                  onAccountFilterChange(a.id);
                  setOpen(false);
                }}
              />
            ))}
          </div>
        </>
      )}
      <button
        type="button"
        onClick={() => accounts.length > 0 && setOpen((v) => !v)}
        disabled={accounts.length === 0}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-[#ececec] disabled:cursor-default disabled:hover:bg-transparent"
        title={accounts.length > 0 ? '切换账号 / 工作区' : ''}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700 text-[12px] font-semibold text-white">
          {initial}
        </span>
        <div className="flex min-w-0 flex-1 flex-col leading-tight">
          <span className="truncate text-[13px] text-zinc-900">{primary}</span>
          <span className="truncate text-[11px] text-zinc-500">{secondary}</span>
        </div>
        {accounts.length > 0 && (
          <span className="text-zinc-400">
            <ChevronDownIcon />
          </span>
        )}
      </button>
    </div>
  );
}

function SwitcherRow({
  initial,
  label,
  secondary,
  active,
  onClick,
}: {
  initial: string;
  label: string;
  secondary: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-[#f4f4f5] ${
        active ? 'bg-[#f4f4f5]' : ''
      }`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-200 text-[11px] font-semibold text-zinc-700">
        {initial}
      </span>
      <div className="flex min-w-0 flex-1 flex-col leading-tight">
        <span className="truncate text-[13px] text-zinc-900">{label}</span>
        <span className="truncate text-[11px] text-zinc-500">{secondary}</span>
      </div>
      {active && (
        <span className="text-emerald-700" aria-hidden>
          ✓
        </span>
      )}
    </button>
  );
}

function TopBar({
  title,
  right,
  sidebarCollapsed,
  onToggle,
}: {
  title: string;
  right?: React.ReactNode;
  sidebarCollapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-transparent bg-white/85 px-4 backdrop-blur-md">
      {sidebarCollapsed && (
        <button
          onClick={onToggle}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 transition-colors"
          title="展开侧栏"
        >
          <SidebarToggleIcon />
        </button>
      )}
      <h1 className="flex items-center gap-1 font-semibold tracking-tight text-zinc-900">
        <span>{title}</span>
        <ChevronDownIcon />
      </h1>
      <div className="flex-1" />
      {right}
    </header>
  );
}

/* ─── icons ─────────────────────────────────────────────────────── */

function Logo() {
  // Mark: white speech bubble + sage-deep check on the sage-deep
  // rounded square. Mirrors the Chrome extension icon (public/icons/
  // icon.svg in the chatgpt-exporter repo) so the brand reads the
  // same wherever it shows up.
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-md bg-sage-deep">
      <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden>
        <path
          d="M14 14 H50 a6 6 0 0 1 6 6 V40 a6 6 0 0 1 -6 6 H30 L22 54 V46 H14 a6 6 0 0 1 -6 -6 V20 a6 6 0 0 1 6 -6 z"
          fill="#FFFFFF"
        />
        <path
          d="M21 30 L28 37 L42 21"
          stroke="#496A48"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </span>
  );
}

function SidebarToggleIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3.5" width="14" height="13" rx="2" />
      <path d="M8 3.5v13" />
    </svg>
  );
}

function PencilEditIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 13.4V16h2.6l8-8L12 5.4l-8 8z" />
      <path d="M11.5 5.9l2.6 2.6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="9" cy="9" r="5" />
      <path d="M13 13l3.5 3.5" strokeLinecap="round" />
    </svg>
  );
}

function CodexIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="10,2.5 17,6.5 17,13.5 10,17.5 3,13.5 3,6.5" />
      <circle cx="10" cy="10" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
      <circle cx="5" cy="10" r="1.4" />
      <circle cx="10" cy="10" r="1.4" />
      <circle cx="15" cy="10" r="1.4" />
    </svg>
  );
}

function FolderPlusIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M3 6.5V15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-6L8.5 5H4a1 1 0 0 0-1 1v.5z" />
      <path d="M10 11h4M12 9v4" strokeLinecap="round" />
    </svg>
  );
}

function FolderIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4 transition-transform"
      style={{ transform: open ? 'rotate(0)' : 'rotate(0)' }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M3 6.5V15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-6L8.5 5H4a1 1 0 0 0-1 1v.5z" />
      {open && <path d="M5 10h10" strokeLinecap="round" />}
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 5h8v8" strokeLinecap="round" />
      <path d="M15 5l-9 9" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
