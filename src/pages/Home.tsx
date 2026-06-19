/**
 * KeepChat AI landing page — single-screen marketing for the Chrome
 * extension. Optimised for first-load SEO + Chrome Web Store reviewer
 * skim: hero with single primary CTA, feature grid, privacy callout,
 * use-cases, FAQ, footer with privacy policy link.
 */

import { useEffect } from 'react';
import { setSeo } from '../lib/seo';

const STORE_URL =
  'https://chromewebstore.google.com/detail/bannmklgebikoonanccnaalpfbibnlia';

export default function Home() {
  useEffect(() => {
    setSeo({
      title: 'KeepChat AI · ChatGPT 聊天记录备份、导出与本地归档',
      description:
        'KeepChat AI 自动备份 ChatGPT 聊天记录，支持本地全文搜索、会话归档、Markdown / JSON / ZIP 导出和降智检测，全程不上传服务器。',
      path: '/',
    });
  }, []);

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
          <span className="font-semibold tracking-tight">KeepChat AI</span>
        </a>
        <nav className="hidden items-center gap-4 text-sm text-zinc-600 lg:flex">
          <a href="#features" className="hover:text-zinc-900">功能</a>
          <a href="/chatgpt-backup" className="hover:text-zinc-900">聊天备份</a>
          <a href="/chatgpt-export" className="hover:text-zinc-900">记录导出</a>
          <a href="/chatgpt-archive" className="hover:text-zinc-900">本地归档</a>
          <a href="/guides" className="hover:text-zinc-900">导出教程</a>
          <a href="/degraded" className="hover:text-zinc-900">降智检测</a>
          <a href="/install" className="hover:text-zinc-900">安装教程</a>
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
          降智检测 · 实时备份 · 全程离线
        </span>
        <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          ChatGPT 聊天记录<br />
          <span className="italic text-sage-deep">自动备份与导出。</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
          KeepChat AI 在你聊天的同时，
          <strong className="text-zinc-900">实时识别 ChatGPT 是否被悄悄降智</strong>
          ，并把每一条会话静默归档到浏览器本地。
          它也是一款 ChatGPT 聊天记录备份与导出工具，支持本地搜索、会话归档、
          Markdown / JSON / ZIP 多格式导出。
          <strong className="text-zinc-900">不上传服务器，不收集隐私，不依赖账号注册。</strong>
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href={STORE_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <ChromeGlyph /> 免费安装到 Chrome
          </a>
          <a href="/install" className="btn-outline">
            不会装？看教程 →
          </a>
        </div>
        <p className="mt-6 text-xs text-zinc-400">
          兼容 Chrome / Edge / Brave / Arc
        </p>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      title: 'ChatGPT 降智检测',
      en: 'Degrade detection',
      desc: '本地交叉校验，识别后台被悄悄替换的模型；三档判定，发现异常立刻给出明确结论。',
      href: '/degraded',
    },
    {
      title: 'ChatGPT 实时备份',
      en: 'Live backup',
      desc: '边聊边自动同步：检测到新消息后 2 秒内写入本地，永不丢失。',
      href: '/chatgpt-backup',
    },
    {
      title: 'ChatGPT 聊天记录全文搜索',
      en: 'Full-text search',
      desc: '在所有标题、消息正文、代码块中亚秒级定位，关键词高亮。',
      href: '/chatgpt-archive',
    },
    {
      title: 'ChatGPT 聊天记录导出',
      en: 'Multi-format export',
      desc: 'Markdown / 归档 JSON / GPT 原生 JSON 三选一，单条或批量打 zip。',
      href: '/chatgpt-export',
    },
    {
      title: 'ChatGPT 本地隐私保护',
      en: 'Local-only',
      desc: '所有数据存在浏览器本地，没有任何聊天内容流向服务器。',
      href: '/privacy',
    },
    {
      title: 'ChatGPT Projects 多账号归档',
      en: 'Projects + accounts',
      desc: '原生识别 ChatGPT Projects，多账号自动分组，互不干扰。',
    },
    {
      title: 'ChatGPT 会话归档阅读视图',
      en: 'ChatGPT-style reader',
      desc: '左侧标题列表 + 右侧对话流，配色字体几乎复刻官网。',
      href: '/chatgpt-archive',
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
            ChatGPT 备份、导出、搜索与降智检测。
          </h2>
          <p className="mt-4 text-lg text-zinc-600">
            围绕"降智识别、备份、归档、搜索、导出"五个最高频的需求设计，
            每一项都在你浏览器里就完成。
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => {
            const inner = (
              <>
                <h3 className="text-lg font-semibold">{it.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-400">{it.en}</p>
                <p className="mt-3 leading-relaxed text-zinc-600">{it.desc}</p>
                {it.href && (
                  <span className="mt-4 inline-flex text-sm font-medium text-sage-deep">
                    了解详情 →
                  </span>
                )}
              </>
            );
            return it.href ? (
              <a
                key={it.title}
                href={it.href}
                className="feature-card hover:-translate-y-0.5 hover:border-sage/60 transition"
              >
                {inner}
              </a>
            ) : (
              <div key={it.title} className="feature-card">
                {inner}
              </div>
            );
          })}
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
            ChatGPT 聊天记录本地保存，<br />不上传服务器。
          </h2>
          <p className="mt-4 text-lg text-zinc-600">
            隐私不是营销话术，而是产品边界。KeepChat AI
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
      title: 'ChatGPT 学术研究记录备份',
      desc: '把每次和 ChatGPT 的论证过程留底，方便随时追溯思路。',
    },
    {
      title: 'ChatGPT 编程开发会话归档',
      desc: '保存 prompt 模板、代码方案、调试记录，本地全文搜索。',
    },
    {
      title: 'ChatGPT 内容创作 Markdown 导出',
      desc: '写作灵感、稿件初稿一键导出 Markdown 进 Obsidian / Notion。',
    },
    {
      title: 'ChatGPT 商业咨询记录管理',
      desc: '客户案例、商业分析做长期归档，免账号风控丢失风险。',
    },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-sage-deep">Use cases · 适用场景</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            哪些场景需要 ChatGPT 聊天记录备份？
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
      q: '什么是"降智"？KeepChat AI 怎么发现的？',
      a: '"降智"指 ChatGPT 在不告知用户的情况下，把请求路由到比 UI 选择更低规格的模型。KeepChat AI 在你浏览器本地交叉校验，发现实际运行的模型与你选择的不一致时立刻给出"已降智"结论。详情见 /degraded 说明页。',
    },
    {
      q: '会和 ChatGPT 网页冲突吗？',
      a: '不会。KeepChat AI 只是在后台静默读取并备份你的 ChatGPT 会话，不修改页面、不注入按钮，对你正常使用网页没有任何视觉干扰。',
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
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          ChatGPT 备份、导出和降智检测常见问题
        </h2>
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
          把 ChatGPT 聊天记录<span className="italic text-sage-deep">备份到自己手里</span>。
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600">
          一分钟安装，从下一条对话开始就受到保护。
        </p>
        <div className="mt-8">
          <a href={STORE_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <ChromeGlyph /> 免费安装到 Chrome
          </a>
        </div>
        <p className="mt-4 text-sm text-zinc-500">
          打不开应用商店？查看{' '}
          <a href="/install" className="text-sage-deep hover:underline">
            安装教程
          </a>
          。
        </p>
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
          <span>© {new Date().getFullYear()} KeepChat AI. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="/install" className="hover:text-zinc-900">安装教程</a>
          <a href="/chatgpt-backup" className="hover:text-zinc-900">聊天备份</a>
          <a href="/chatgpt-export" className="hover:text-zinc-900">记录导出</a>
          <a href="/guides" className="hover:text-zinc-900">ChatGPT 导出教程</a>
          <a href="/changelog" className="hover:text-zinc-900">更新日志</a>
          <a href="/privacy" className="hover:text-zinc-900">隐私政策 / Privacy</a>
        </div>
      </div>
    </footer>
  );
}

function Logo({ small = false }: { small?: boolean }) {
  const size = small ? 20 : 26;
  // Mark mirrors the Chrome extension icon: white speech bubble +
  // sage-deep checkmark on the sage-deep rounded square.
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

function ChromeGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2.5v6M3.5 7.5l5.2 3M20.5 7.5l-5.2 3M9 21l3-9" />
    </svg>
  );
}
