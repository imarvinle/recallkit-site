/**
 * Chrome installation guide page. Walks new users through installing
 * KeepChat AI from the Chrome Web Store, pinning the toolbar icon,
 * verifying it on chatgpt.com, and falling back to manual install for
 * users who can't reach the Web Store.
 *
 * Layout mirrors Privacy.tsx / Degraded.tsx (sticky navbar, hero, TL;DR,
 * sections, footer) so the brand voice stays consistent.
 */

import { useEffect } from 'react';

const STORE_URL =
  'https://chromewebstore.google.com/detail/bannmklgebikoonanccnaalpfbibnlia';

export default function Install() {
  useEffect(() => {
    document.title = 'Chrome 安装教程 · KeepChat AI';
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Navbar />
      <Hero />
      <Tldr />
      <article className="mx-auto max-w-3xl px-6 pb-24 leading-relaxed text-[15.5px] text-zinc-700">
        <Section title="方式 A · Chrome 应用商店一键安装（推荐）">
          <Steps
            items={[
              {
                title: '打开 Chrome 应用商店页面',
                body: (
                  <>
                    点击下方按钮直接跳转 KeepChat AI 的应用商店详情页：
                    <div className="mt-3">
                      <a
                        href={STORE_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary"
                      >
                        <ChromeGlyph /> 前往 Chrome 应用商店
                      </a>
                    </div>
                    <p className="mt-3 text-sm text-zinc-500">
                      地址：
                      <code className="mx-1 inline rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px]">
                        chromewebstore.google.com/detail/bannmklgebikoonanccnaalpfbibnlia
                      </code>
                    </p>
                  </>
                ),
              },
              {
                title: '点击「添加至 Chrome」',
                body: (
                  <p>
                    在详情页右上角点击蓝色按钮
                    <strong className="text-zinc-900"> 添加至 Chrome / Add to Chrome</strong>
                    ，浏览器会弹出权限确认窗口。
                  </p>
                ),
              },
              {
                title: '在弹窗中点击「添加扩展程序」',
                body: (
                  <p>
                    Chrome 会列出 KeepChat AI 需要的权限（仅限 chatgpt.com），点击
                    <strong className="text-zinc-900"> 添加扩展程序 / Add extension</strong>
                    。安装一般在 1–2 秒内完成，工具栏右上角会出现 KeepChat AI 的图标。
                  </p>
                ),
              },
              {
                title: '把 KeepChat AI 固定到工具栏',
                body: (
                  <p>
                    Chrome 默认会把新安装的扩展折叠在「拼图」图标
                    <span className="mx-1 inline-block rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px]">
                      🧩
                    </span>
                    后面。点击拼图，找到 KeepChat AI 后点击右侧的
                    <strong className="text-zinc-900"> 图钉 </strong>
                    图标，把它固定到工具栏，方便随时打开侧栏。
                  </p>
                ),
              },
              {
                title: '打开 ChatGPT 验证',
                body: (
                  <p>
                    访问{' '}
                    <a
                      href="https://chatgpt.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sage-deep underline"
                    >
                      chatgpt.com
                    </a>
                    ，刷新页面后点击工具栏上的 KeepChat AI 图标，能看到侧栏弹出即代表安装成功。
                    第一次进入会提示首次同步，等待几秒就可以使用全文搜索、备份、降智检测等功能。
                  </p>
                ),
              },
            ]}
          />
        </Section>

        <Section title="方式 B · 装不上应用商店怎么办">
          <p>
            国内网络环境下偶尔会出现
            <strong className="text-zinc-900">「无法连接应用商店」</strong>
            或<strong className="text-zinc-900">「下载失败 - 网络错误」</strong>
            。可以按下面的顺序排查：
          </p>
          <ul className="list-disc space-y-1.5 pl-6">
            <li>
              换个网络再试一次：临时切换到手机热点 / 公司网 / 不同的 VPN 节点，多数情况下应用商店能直接打开
            </li>
            <li>
              确认 Chrome 是最新版本：访问
              <code className="mx-1 inline rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px]">
                chrome://settings/help
              </code>
              ，等待自动检查并重启浏览器
            </li>
            <li>
              清理 Chrome 应用商店相关 Cookie：访问
              <code className="mx-1 inline rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px]">
                chrome://settings/cookies
              </code>
              ，搜索 <code>chromewebstore.google.com</code> 删除后重试
            </li>
            <li>
              仍然不行？可以在 Chrome 应用商店详情页留言，我们会跟进给出 <code>.crx</code> 离线安装包及操作步骤
            </li>
          </ul>
        </Section>

        <Section title="方式 C · 在 Edge / Brave / Arc 上安装">
          <p>
            Edge、Brave、Arc 等基于 Chromium 的浏览器都可以直接装 Chrome 应用商店里的扩展，
            <strong className="text-zinc-900">操作和 Chrome 几乎一样</strong>：
          </p>
          <Steps
            compact
            items={[
              {
                title: 'Microsoft Edge',
                body: (
                  <p>
                    打开{' '}
                    <a
                      href={STORE_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sage-deep underline"
                    >
                      Chrome 应用商店链接
                    </a>
                    ，首次访问会提示「允许来自其他应用商店的扩展」，点击允许后即可像 Chrome 一样添加。
                  </p>
                ),
              },
              {
                title: 'Brave',
                body: (
                  <p>Brave 默认就允许 Chrome 应用商店扩展，按方式 A 的流程操作即可。</p>
                ),
              },
              {
                title: 'Arc',
                body: (
                  <p>
                    Arc 在「Settings → Extensions」里直接复用 Chrome 扩展生态，从应用商店一键安装即可，
                    安装后扩展会出现在地址栏右侧。
                  </p>
                ),
              },
            ]}
          />
        </Section>

        <Section title="装好后建议你做的 3 件事">
          <ul className="list-disc space-y-1.5 pl-6">
            <li>
              <strong className="text-zinc-900">把图标固定到工具栏</strong>
              ：方便随时一键召出侧栏
            </li>
            <li>
              <strong className="text-zinc-900">先去 chatgpt.com 触发一次同步</strong>
              ：第一次会把已有会话拉到本地，之后每次新对话都会在 2 秒内自动追加
            </li>
            <li>
              <strong className="text-zinc-900">在侧栏里打开「降智检测」</strong>
              ：发新消息后 KeepChat AI 会自动判断你是否被路由到了低规格模型。
              不了解什么是降智？看
              <a className="ml-1 text-sage-deep underline" href="/degraded">
                /degraded 说明页
              </a>
            </li>
          </ul>
        </Section>

        <Section title="常见安装疑问">
          <Faq
            items={[
              {
                q: '需要登录账号吗？',
                a: '不需要。KeepChat AI 不做账号体系、不存登录态，安装完直接用即可。',
              },
              {
                q: '会读取我的 ChatGPT 密码吗？',
                a: '不会。扩展只读取 chatgpt.com 已登录页面里的会话内容，与你直接在浏览器里打开 ChatGPT 完全等价。详见隐私政策。',
              },
              {
                q: '装上后看不到图标？',
                a: '点击工具栏上的「拼图」🧩 图标展开扩展列表，找到 KeepChat AI 后点旁边的图钉就会显示在工具栏。',
              },
              {
                q: '会自动更新吗？',
                a: '会。Chrome 会在后台静默拉取新版本，平时不会打扰你。如果想立即升级，访问 chrome://extensions 打开「开发者模式」，点击「立即更新」。',
              },
              {
                q: '想卸载怎么办？',
                a: '右键工具栏上的 KeepChat AI 图标 → 选择「从 Chrome 中移除」即可。卸载后所有本地数据会一并清除。',
              },
            ]}
          />
        </Section>
      </article>
      <Footer />
    </main>
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
          Install · 安装教程
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          一分钟在 Chrome 上装好 KeepChat AI。
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          全程只需要点几下「下一步」，从下一条 ChatGPT 对话开始就会被自动备份并实时检测降智。
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={STORE_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <ChromeGlyph /> 免费安装到 Chrome
          </a>
          <a href="#install-fallback" className="btn-outline">
            装不上？看备用方案
          </a>
        </div>
      </div>
    </section>
  );
}

function Tldr() {
  const lines = [
    '点 ① 打开应用商店链接',
    '点 ②「添加至 Chrome」',
    '点 ③ 弹窗里「添加扩展程序」',
    '点 ④ 工具栏图钉，固定图标',
  ];
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="font-display text-2xl font-semibold tracking-tight">四步搞定 / TL;DR</h2>
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
  const id =
    title.includes('装不上') || title.includes('方式 B') ? 'install-fallback' : undefined;
  return (
    <section id={id} className="mt-10 first:mt-0 scroll-mt-24">
      <h3 className="font-display text-xl font-semibold tracking-tight text-zinc-900">{title}</h3>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function Steps({
  items,
  compact = false,
}: {
  items: { title: string; body: React.ReactNode }[];
  compact?: boolean;
}) {
  return (
    <ol className="mt-2 space-y-4">
      {items.map((it, i) => (
        <li
          key={it.title}
          className="rounded-xl border border-zinc-200 bg-white p-5"
        >
          <div className="flex items-baseline gap-3">
            {!compact && (
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-deep font-mono text-sm text-white">
                {i + 1}
              </span>
            )}
            <h4 className="font-semibold text-zinc-900">{it.title}</h4>
          </div>
          <div className="mt-2 space-y-2 pl-0 text-zinc-600 sm:pl-10">{!compact ? it.body : it.body}</div>
        </li>
      ))}
    </ol>
  );
}

function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
      {items.map((it) => (
        <details key={it.q} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-medium text-zinc-900">
            {it.q}
            <span className="text-zinc-400 transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">{it.a}</p>
        </details>
      ))}
    </div>
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
          <a href="/degraded" className="hover:text-zinc-900">
            降智检测
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

function ChromeGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2.5v6M3.5 7.5l5.2 3M20.5 7.5l-5.2 3M9 21l3-9" />
    </svg>
  );
}
