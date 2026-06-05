/**
 * Privacy policy page. Mirrors `docs/privacy-zh.md` from the extension
 * repo so users have a public URL they can share + the Chrome Web
 * Store reviewer can link to during submission.
 *
 * Structure: short navbar (Home link), hero, TL;DR card, full sections,
 * footer. Single page, no client-side state.
 */

import { useEffect } from 'react';

export default function Privacy() {
  useEffect(() => {
    document.title = '隐私政策 · Recallkit | Privacy Policy';
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Navbar />
      <Hero />
      <Tldr />
      <article className="mx-auto max-w-3xl px-6 pb-24 leading-relaxed text-[15.5px] text-zinc-700">
        <Section title="1. 我们采集什么">
          <p>
            <strong className="text-zinc-900">我们不采集任何个人身份信息（PII）</strong>，
            不收集你的聊天内容、邮箱、IP 地址或使用统计。整个插件不向任何分析、广告或日志后端发送数据。
          </p>
        </Section>

        <Section title="2. 数据存放在哪里">
          <Table>
            <thead>
              <tr>
                <th className="w-1/3">数据类型</th>
                <th className="w-1/3">存放位置</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>会话 / 消息 / 图片</td>
                <td>浏览器 IndexedDB</td>
                <td>仅本机可读</td>
              </tr>
              <tr>
                <td>偏好设置（实时备份开关、是否拉图等）</td>
                <td>chrome.storage.local</td>
                <td>仅本机可读</td>
              </tr>
              <tr>
                <td>ChatGPT 登录会话 token</td>
                <td>
                  <strong>不读取、不保存</strong>
                </td>
                <td>仅在请求时由浏览器自动附带</td>
              </tr>
            </tbody>
          </Table>
        </Section>

        <Section title="3. 与 ChatGPT 的交互">
          <p>
            为了备份你的会话，本插件会代替你向{' '}
            <code className="inline rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px]">
              chatgpt.com
            </code>{' '}
            发起请求（使用你浏览器已有的登录态）。这些请求：
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              仅在你 <strong>主动操作</strong> 时触发（备份、导入、实时备份开关打开后）
            </li>
            <li>
              <strong>不会被记录或转发</strong> 到任何第三方
            </li>
            <li>与你直接在 chatgpt.com 网页上操作的数据流完全相同</li>
          </ul>
        </Section>

        <Section title="4. 权限说明">
          <Table>
            <thead>
              <tr>
                <th className="w-1/3">权限</th>
                <th>用途</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code className="inline rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px]">
                    storage
                  </code>
                </td>
                <td>保存你的偏好设置</td>
              </tr>
              <tr>
                <td>
                  <code className="inline rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px]">
                    host_permissions: chatgpt.com
                  </code>
                </td>
                <td>读取你的会话内容（你授权的范围内）</td>
              </tr>
            </tbody>
          </Table>
        </Section>

        <Section title="5. 第三方共享">
          <p>
            <strong>没有。</strong>我们不与任何第三方共享或出售数据。
          </p>
        </Section>

        <Section title="6. 你的权利">
          <ul className="list-disc space-y-1 pl-6">
            <li>随时在设置页"清空本地数据"按钮一键删除全部归档</li>
            <li>
              卸载扩展会同时清空 <code className="font-mono">chrome.storage.local</code> 中的偏好
            </li>
            <li>IndexedDB 中的会话数据可在 Chrome 设置 → 隐私 → 网站设置 → 数据查看 / 清除</li>
          </ul>
        </Section>

        <Section title="7. 联系方式">
          <p>
            如有疑问，请通过 Chrome Web Store 商品页的「联系开发者」入口反馈。
          </p>
        </Section>

        <hr className="my-12 border-zinc-200" />

        <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-900">
          English version
        </h2>

        <Section title="TL;DR">
          <ul className="list-disc space-y-1 pl-6">
            <li>
              We collect <strong>nothing</strong>.
            </li>
            <li>
              Your ChatGPT conversations are <strong>never sent to any server</strong>.
            </li>
            <li>
              All data lives in your browser's local storage (IndexedDB /{' '}
              <code className="font-mono">chrome.storage.local</code>).
            </li>
            <li>Uninstalling the extension or clearing browser data removes everything.</li>
          </ul>
        </Section>

        <Section title="What we collect">
          <p>
            <strong>Nothing personally identifiable.</strong> We do not collect chat content, email
            addresses, IP addresses, telemetry, or usage analytics. The extension does not send data to
            any analytics, ad, or logging backend.
          </p>
        </Section>

        <Section title="Where data is stored">
          <p>
            All conversation data is persisted in your browser's local IndexedDB; preferences in{' '}
            <code className="font-mono">chrome.storage.local</code>. The extension never reads or
            stores your ChatGPT session token.
          </p>
        </Section>

        <Section title="Your rights">
          <ul className="list-disc space-y-1 pl-6">
            <li>Wipe everything at any time via Settings → "Clear local data".</li>
            <li>
              Uninstalling the extension also clears the{' '}
              <code className="font-mono">chrome.storage.local</code> preferences.
            </li>
            <li>
              IndexedDB data can be inspected or cleared from Chrome → Settings → Privacy → Site
              settings → View permissions and data.
            </li>
          </ul>
        </Section>

        <Section title="Contact">
          <p>
            Questions or concerns? Use the "Contact developer" link on the Chrome Web Store listing.
          </p>
        </Section>

        <p className="mt-12 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-600">
          If the Chinese and English versions of this policy conflict, the English version controls.
          中文版与英文版若出现冲突，以英文版为准。
        </p>

        <p className="mt-8 text-sm text-zinc-400">最后更新 / Last updated: 2026-04-25</p>
      </article>
      <Footer />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2 text-zinc-900">
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

function Hero() {
  return (
    <section className="border-b border-zinc-100 bg-zinc-50 py-16">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-sage-deep">
          Privacy Policy · 隐私政策
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          数据从不离开你的电脑。
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          隐私不是营销话术，而是产品边界。本页介绍 Recallkit 如何保护你的 ChatGPT 聊天记录
          —— 即"什么也不做"。
        </p>
      </div>
    </section>
  );
}

function Tldr() {
  const lines = [
    '不收集任何个人数据',
    '不向任何服务器上传聊天内容',
    '所有数据保存在浏览器本地 (IndexedDB / chrome.storage.local)',
    '卸载扩展或清空浏览器数据 = 数据彻底消失',
  ];
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="font-display text-2xl font-semibold tracking-tight">简短版 / TL;DR</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {lines.map((l) => (
          <li
            key={l}
            className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4"
          >
            <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-deep text-xs text-white">
              ✓
            </span>
            <span className="leading-relaxed text-zinc-700">{l}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h3 className="font-display text-xl font-semibold tracking-tight text-zinc-900">{title}</h3>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-2 overflow-hidden rounded-xl border border-zinc-200">
      <table className="w-full border-collapse text-sm">
        <style>{`
          table.privacy-tbl th, table.privacy-tbl td {
            border-bottom: 1px solid rgb(228 228 231);
            padding: 0.6rem 0.9rem;
            text-align: left;
          }
        `}</style>
        <colgroup>
          <col />
          <col />
          <col />
        </colgroup>
        <tbody className="[&_th]:bg-zinc-50 [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-zinc-500 [&_th]:py-2.5 [&_th]:px-3.5 [&_td]:py-2.5 [&_td]:px-3.5 [&_tr]:border-b [&_tr]:border-zinc-100 [&_tr:last-child]:border-0">
          {children}
        </tbody>
      </table>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-100 py-10 text-sm text-zinc-500">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-2">
          <Logo small />
          <span>© {new Date().getFullYear()} Recallkit. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="/" className="hover:text-zinc-900">
            首页
          </a>
          <a href="/changelog" className="hover:text-zinc-900">
            更新日志
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
