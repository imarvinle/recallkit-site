/**
 * In-browser library reader: queries the locally-installed Recallkit
 * extension via the bridge SDK and renders the conversation list.
 *
 * Three states:
 *   - probing      → still trying to detect the extension
 *   - no-extension → install prompt
 *   - ready        → list of conversations, click to open /c/<id>
 *
 * The site never receives data over the network — message-passing
 * happens entirely inside the user's browser.
 */

import { useEffect, useMemo, useState } from 'react';
import {
  BridgeError,
  detectExtension,
  listConversations,
} from '../lib/extension-bridge';
import type { ConversationIndexRow } from '../lib/types';

type Stage =
  | { kind: 'probing' }
  | { kind: 'no-extension' }
  | { kind: 'loading'; version: string }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; rows: ConversationIndexRow[]; version: string };

export default function Library() {
  const [stage, setStage] = useState<Stage>({ kind: 'probing' });
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.title = '我的归档 · Recallkit';
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const probe = await detectExtension();
      if (cancelled) return;
      if (!probe.installed) {
        setStage({ kind: 'no-extension' });
        return;
      }
      setStage({ kind: 'loading', version: probe.version ?? '' });
      try {
        const r = await listConversations();
        if (cancelled) return;
        setStage({ kind: 'ready', rows: r.rows, version: probe.version ?? '' });
      } catch (err) {
        if (cancelled) return;
        setStage({
          kind: 'error',
          message:
            err instanceof BridgeError ? err.message : (err as Error).message || '加载失败',
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (stage.kind !== 'ready') return [];
    const q = query.trim().toLowerCase();
    if (!q) return stage.rows;
    return stage.rows.filter((r) => (r.title || '').toLowerCase().includes(q));
  }, [stage, query]);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm font-medium uppercase tracking-widest text-sage-deep">
          Library · 我的归档
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          在线浏览本地备份的 ChatGPT 记录
        </h1>
        <p className="mt-3 text-zinc-600">
          数据从你浏览器里的 Recallkit 扩展直接读取，**不经过任何服务器**。
        </p>

        {stage.kind === 'probing' && (
          <p className="mt-12 animate-pulse text-zinc-400">正在检测扩展…</p>
        )}

        {stage.kind === 'no-extension' && <NoExtension />}

        {stage.kind === 'loading' && (
          <p className="mt-12 animate-pulse text-zinc-400">已连接扩展 v{stage.version} · 正在读取归档…</p>
        )}

        {stage.kind === 'error' && (
          <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm font-medium text-red-800">读取失败</p>
            <p className="mt-1 text-sm text-red-700">{stage.message}</p>
          </div>
        )}

        {stage.kind === 'ready' && (
          <>
            <div className="mt-10 flex items-center justify-between gap-3 text-xs text-zinc-500">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sage-deep" />
                已连接扩展 v{stage.version} · 共 {stage.rows.length} 条会话
              </span>
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="按标题搜索…"
              className="mt-4 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sage-soft"
            />
            {filtered.length === 0 ? (
              <p className="mt-10 text-center text-sm text-zinc-400">没有匹配的会话</p>
            ) : (
              <ul className="mt-6 divide-y divide-zinc-100 rounded-2xl border border-zinc-200">
                {filtered.map((r) => (
                  <li key={r.id}>
                    <a
                      href={`/c/${encodeURIComponent(r.id)}`}
                      className="block px-5 py-4 transition-colors hover:bg-zinc-50"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="truncate font-medium text-zinc-900">
                          {r.title || '(无标题)'}
                        </span>
                        <time className="shrink-0 font-mono text-[11px] text-zinc-400">
                          {(r.updated_at ?? '').slice(0, 10)}
                        </time>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-zinc-500">
                        <span>{r.message_count} 条</span>
                        {r.has_code && <Chip>code</Chip>}
                        {r.has_images && <Chip>images</Chip>}
                        {r.project_name && <Chip>{r.project_name}</Chip>}
                        {r.account_email && (
                          <span className="ml-auto truncate font-mono">{r.account_email}</span>
                        )}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}

function NoExtension() {
  return (
    <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-8">
      <h2 className="font-display text-2xl font-semibold tracking-tight">
        还没有安装 Recallkit 扩展
      </h2>
      <p className="mt-3 leading-relaxed text-zinc-600">
        在线归档浏览功能需要本地安装 Recallkit 扩展。安装后你的 ChatGPT 聊天记录会保存在浏览器自带的本地存储里，本页面只是一个查看入口，**不会上传任何数据**。
      </p>
      <a href="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800">
        前往首页 →
      </a>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] text-zinc-600">
      {children}
    </span>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold tracking-tight">Recallkit</span>
        </a>
        <a href="/" className="text-sm text-zinc-500 hover:text-zinc-900">
          ← 返回首页
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-100 py-10 text-sm text-zinc-500">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6">
        <span>© {new Date().getFullYear()} Recallkit · 数据全程保存在浏览器本地</span>
        <a href="/privacy" className="hover:text-zinc-900">
          隐私政策
        </a>
      </div>
    </footer>
  );
}

function Logo() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-sage-deep text-white">
      <svg
        viewBox="0 0 64 64"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 14 V36" />
        <path d="M22 27 L32 37 L42 27" />
        <rect x="14" y="44" width="36" height="5" rx="2.5" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}
