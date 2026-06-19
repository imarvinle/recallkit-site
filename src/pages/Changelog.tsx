/**
 * Changelog page. Hand-curated release notes — every entry should be
 * something a *user* would notice, not every internal commit. Sort
 * newest first; bump the top block each release.
 */

import { useEffect } from 'react';

interface Release {
  version: string;
  date: string;
  highlights?: string;
  added?: string[];
  changed?: string[];
  fixed?: string[];
}

const RELEASES: Release[] = [
  {
    version: '1.0.0',
    date: '2026-04-26',
    highlights:
      '首个公开版本。本地实时备份、批量备份/导出、按工作区切换、网页阅读 ——\n够用版的"把 ChatGPT 装进你自己电脑"。',
    added: [
      '边聊边备份：在 ChatGPT 网页边聊边自动入档，新消息几秒内就保存到本地，悬浮球的状态点会告诉你它正在工作',
      '批量备份：「仅未备份」一键勾选还没存过的会话；遇到限流会自动等候并提示「立即重试 / 1 小时后再来」；偶尔失败的会话下次会自动补回来',
      '工作区识别：自动识别 Team / Personal / Plus / Pro 工作区，按工作区切换查看，多账号多空间互不干扰',
      '网页阅读：访问 keepchatai.com/library 在更宽的页面里查看本地档案，Markdown、代码、图片大图都能完整呈现，数据全程留在你的电脑',
      '导入 / 导出：兼容官方 ChatGPT 导出包、Markdown、JSON 三种格式互转，单条或一次打包都行',
      '隐私边界：所有数据都保存在浏览器本地，不上传任何分析、广告或日志服务；只有版本检查会联网，且不携带任何身份信息',
    ],
  },
];

export default function Changelog() {
  useEffect(() => {
    document.title = '更新日志 · KeepChat AI';
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Navbar />
      <Hero />
      <article className="mx-auto max-w-3xl px-6 pb-24">
        {RELEASES.map((r, i) => (
          <ReleaseBlock key={r.version} release={r} latest={i === 0} />
        ))}
      </article>
      <Footer />
    </main>
  );
}

function ReleaseBlock({ release, latest }: { release: Release; latest: boolean }) {
  return (
    <section className="border-b border-zinc-100 py-12 first:pt-10 last:border-b-0">
      <header className="flex flex-wrap items-baseline gap-3">
        <h2 className="font-display text-3xl font-semibold tracking-tight">
          v{release.version}
        </h2>
        {latest && (
          <span className="rounded-full bg-sage-deep px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
            Latest
          </span>
        )}
        <time className="ml-auto font-mono text-sm text-zinc-400">{release.date}</time>
      </header>

      {release.highlights && (
        <p className="mt-4 whitespace-pre-line text-[15.5px] leading-relaxed text-zinc-600">
          {release.highlights}
        </p>
      )}

      {release.added && release.added.length > 0 && (
        <Bucket label="新增" tone="sage" items={release.added} />
      )}
      {release.changed && release.changed.length > 0 && (
        <Bucket label="改动" tone="zinc" items={release.changed} />
      )}
      {release.fixed && release.fixed.length > 0 && (
        <Bucket label="修复" tone="amber" items={release.fixed} />
      )}
    </section>
  );
}

function Bucket({
  label,
  tone,
  items,
}: {
  label: string;
  tone: 'sage' | 'zinc' | 'amber';
  items: string[];
}) {
  const dotClass =
    tone === 'sage'
      ? 'bg-sage-deep'
      : tone === 'amber'
        ? 'bg-amber-500'
        : 'bg-zinc-400';
  return (
    <div className="mt-6">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
        {label}
      </h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-3 leading-relaxed text-zinc-700">
            <span className={`mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} />
            <span className="text-[15px] whitespace-pre-line">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2 text-zinc-900">
          <Logo />
          <span className="font-semibold tracking-tight">KeepChat AI</span>
        </a>
        <a href="/" className="text-sm text-zinc-500 hover:text-zinc-900">
          ← 返回首页
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="border-b border-zinc-100 bg-zinc-50 py-16">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-sage-deep">
          Changelog · 更新日志
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          KeepChat AI 都改了什么。
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          每个版本写下你能用上的变化——新增功能、UX 调整、修了哪些坑。内部重构 / 代码清理不在此列。
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-100 py-10 text-sm text-zinc-500">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-2">
          <Logo small />
          <span>© {new Date().getFullYear()} KeepChat AI. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="/" className="hover:text-zinc-900">
            首页
          </a>
          <a href="/privacy" className="hover:text-zinc-900">
            隐私政策
          </a>
        </div>
      </div>
    </footer>
  );
}

function Logo({ small = false }: { small?: boolean }) {
  const size = small ? 20 : 26;
  return (
    <span
      style={{ width: size, height: size }}
      className="inline-flex items-center justify-center overflow-hidden rounded-md bg-sage-deep"
    >
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
