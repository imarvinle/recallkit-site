/**
 * Recallkit landing page — single-screen marketing for the Chrome
 * extension. Optimised for first-load SEO + Chrome Web Store reviewer
 * skim: hero with single primary CTA, feature grid, privacy callout,
 * use-cases, FAQ, footer with privacy policy link.
 */

const STORE_URL =
  'https://chrome.google.com/webstore/detail/'; // TODO: replace once published

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Header />
      <Hero />
      <Features />
      <Privacy />
      <UseCases />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold tracking-tight">Recallkit</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-zinc-600 md:flex">
          <a href="#features" className="hover:text-zinc-900">功能</a>
          <a href="#privacy" className="hover:text-zinc-900">隐私</a>
          <a href="#faq" className="hover:text-zinc-900">FAQ</a>
          <a href="/library" className="hover:text-zinc-900">我的归档</a>
        </nav>
        <a href={STORE_URL} target="_blank" rel="noreferrer" className="btn-primary !px-4 !py-2 text-[13px]">
          免费安装
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft sage glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-sage-soft/60 blur-3xl"
      />
      <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-sage-soft px-3 py-1 text-xs font-medium text-sage-deep">
          <span className="h-1.5 w-1.5 rounded-full bg-sage-deep" />
          实时备份 · 全程离线 · 永不上传
        </span>
        <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          别让重要的 ChatGPT 对话<br />
          <span className="italic text-sage-deep">悄悄消失。</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
          Recallkit 在你聊天的同时，把每一条 ChatGPT
          会话静默归档到浏览器本地。<strong className="text-zinc-900">不上传服务器，
          不收集隐私，不依赖账号注册。</strong>
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href={STORE_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <ChromeGlyph /> 免费安装到 Chrome
          </a>
          <a href="#features" className="btn-outline">
            查看功能 ↓
          </a>
        </div>
        <p className="mt-6 text-xs text-zinc-400">
          Manifest V3 · 完全开源思路 · 兼容 Chrome / Edge / Brave / Arc
        </p>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      title: '实时备份',
      en: 'Live backup',
      desc: '边聊边自动同步：检测到新消息后 2 秒内写入本地，永不丢失。',
    },
    {
      title: '全文搜索',
      en: 'Full-text search',
      desc: '在所有标题、消息正文、代码块中亚秒级定位，关键词高亮。',
    },
    {
      title: '多格式导出',
      en: 'Multi-format export',
      desc: 'Markdown / 归档 JSON / GPT 原生 JSON 三选一，单条或批量打 zip。',
    },
    {
      title: '100% 本地隐私',
      en: 'Local-only',
      desc: '所有数据存在浏览器本地，没有任何聊天内容流向服务器。',
    },
    {
      title: '项目 & 多账号',
      en: 'Projects + accounts',
      desc: '原生识别 ChatGPT Projects，多账号自动分组，互不干扰。',
    },
    {
      title: '类 ChatGPT 阅读视图',
      en: 'ChatGPT-style reader',
      desc: '左侧标题列表 + 右侧对话流，配色字体几乎复刻官网。',
    },
  ];
  return (
    <section id="features" className="border-t border-zinc-100 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-sage-deep">
            Functionality · 功能
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            把 ChatGPT 历史<span className="italic text-sage-deep">变成你自己的资产</span>。
          </h2>
          <p className="mt-4 text-lg text-zinc-600">
            围绕"备份、归档、搜索、导出"四个最高频的需求设计，
            每一项都做到比 ChatGPT 官方导出更顺手。
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="feature-card">
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-wider text-zinc-400">{it.en}</p>
              <p className="mt-3 leading-relaxed text-zinc-600">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Privacy() {
  const lines = [
    '不上传任何聊天内容到任何服务器',
    '不读取、不保存 ChatGPT 登录令牌',
    '不进行行为追踪 / 用户分析 / 广告投放',
    '所有数据保存在浏览器自带本地存储 (IndexedDB)',
    '一键清空全部归档；卸载即彻底移除',
  ];
  return (
    <section id="privacy" className="bg-zinc-50 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-sage-deep">
            Privacy · 隐私
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            数据从不离开<br />你的电脑。
          </h2>
          <p className="mt-4 text-lg text-zinc-600">
            隐私不是营销话术，而是产品边界。Recallkit
            的每个功能都设计成"在你浏览器里就完成"——没有云、没有账号、没有服务器，
            就连版本检查都不会带任何用户标识。
          </p>
          <a
            href="/privacy"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sage-deep hover:underline"
          >
            阅读完整隐私政策 →
          </a>
        </div>
        <ul className="space-y-4">
          {lines.map((l) => (
            <li key={l} className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4">
              <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-deep text-xs text-white">
                ✓
              </span>
              <span className="text-[15px] leading-relaxed text-zinc-700">{l}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function UseCases() {
  const cases = [
    {
      title: '研究 & 学术',
      desc: '把每次和 ChatGPT 的论证过程留底，方便随时追溯思路。',
    },
    {
      title: '编程开发',
      desc: '保存 prompt 模板、代码方案、调试记录，本地全文搜索。',
    },
    {
      title: '内容创作',
      desc: '写作灵感、稿件初稿一键导出 Markdown 进 Obsidian / Notion。',
    },
    {
      title: '商业咨询',
      desc: '客户案例、商业分析做长期归档，免账号风控丢失风险。',
    },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-sage-deep">Use cases · 适用场景</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            谁在用 Recallkit？
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cases.map((c) => (
            <div key={c.title} className="rounded-2xl bg-zinc-50 p-6 transition-colors hover:bg-zinc-100">
              <h3 className="text-base font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const items = [
    {
      q: '会和 ChatGPT 网页冲突吗？',
      a: '不会。Recallkit 用 Manifest V3 标准方式读取你的 ChatGPT 会话；备份在后台静默触发，对网页无任何视觉干扰。',
    },
    {
      q: '会让 ChatGPT 限流吗？',
      a: '不会。每次只在消息流稳定 2 秒后才会调用一次会话详情接口，远低于普通用户翻看历史的频率。',
    },
    {
      q: '换电脑能同步吗？',
      a: '本插件是纯本地工具，不做云同步。换电脑时可以"导出 zip → 新机导入"完成迁移。',
    },
    {
      q: '免费版 ChatGPT 也能用吗？',
      a: '可以。所有功能对 Free / Plus / Pro / Team 用户都开放。',
    },
    {
      q: '会读取我的密码 / token 吗？',
      a: '不会。我们没有任何代码读取或存储你的登录凭据；与你直接打开 chatgpt.com 完全等价。',
    },
  ];
  return (
    <section id="faq" className="border-t border-zinc-100 bg-zinc-50 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-sage-deep">FAQ · 常见问题</p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">放心，已经替你想好了。</h2>
        <div className="mt-10 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
          {items.map((it) => (
            <details key={it.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-medium">
                {it.q}
                <span className="text-zinc-400 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-sage-soft px-8 py-16 text-center">
        <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
          把 ChatGPT 历史<span className="italic text-sage-deep">留在自己手里</span>。
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600">
          一分钟安装，从下一条对话开始就受到保护。
        </p>
        <div className="mt-8">
          <a href={STORE_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <ChromeGlyph /> 免费安装到 Chrome
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-100 py-10 text-sm text-zinc-500">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-2">
          <Logo small />
          <span>© {new Date().getFullYear()} Recallkit. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="/privacy" className="hover:text-zinc-900">隐私政策 / Privacy</a>
          <a href="mailto:2039652520@qq.com" className="hover:text-zinc-900">联系我们</a>
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
      className="inline-flex items-center justify-center rounded-md bg-sage-deep text-white"
    >
      <svg viewBox="0 0 64 64" width={size * 0.7} height={size * 0.7} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 14 V36" />
        <path d="M22 27 L32 37 L42 27" />
        <rect x="14" y="44" width="36" height="5" rx="2.5" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}

function ChromeGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2.5v6M3.5 7.5l5.2 3M20.5 7.5l-5.2 3M9 21l3-9" />
    </svg>
  );
}
