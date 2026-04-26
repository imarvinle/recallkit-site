/**
 * "What is ChatGPT 降智 / model degradation" page.
 *
 * Linked from the Recallkit extension whenever the in-browser detector
 * spots that ChatGPT silently swapped the user's selected model for a
 * cheaper one. The page explains, in plain Chinese, what's happening
 * and what the user can do about it.
 *
 * Layout mirrors Privacy.tsx (sticky navbar, hero, TL;DR, sections,
 * footer) so the brand voice stays consistent.
 */

import { useEffect } from 'react';

export default function Degraded() {
  useEffect(() => {
    document.title = 'ChatGPT 降智是什么？· Recallkit';
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Navbar />
      <Hero />
      <Tldr />
      <article className="mx-auto max-w-3xl px-6 pb-24 leading-relaxed text-[15.5px] text-zinc-700">
        <Section title="1. 什么是「降智」">
          <p>
            「降智」是用户对 ChatGPT 一种行为的口语化称呼：
            <strong className="text-zinc-900">
              你在 UI 上选择了某个高规格模型（例如 GPT-5 Thinking、GPT-4o）
            </strong>
            ，但 OpenAI 后端在不告知你的情况下，悄悄把请求路由到一个低规格的内部模型，
            <strong className="text-zinc-900">而前端显示的依然是你选择的那个名字</strong>
            。
          </p>
          <p>这意味着：你以为自己在用顶级模型，账单也按顶级计费，但实际拿到的是低一档的回答质量。</p>
        </Section>

        <Section title="2. 为什么会发生">
          <p>降智通常和账号风控、服务负载、地理位置等因素相关。常见触发场景：</p>
          <ul className="list-disc space-y-1.5 pl-6">
            <li>账号被识别为「高风险」（短时间内大量请求、共享账号、代理 IP 等）</li>
            <li>所在地区或网络被 OpenAI 判定为风控区域</li>
            <li>系统整体负载过高，服务端走「省成本」分流策略</li>
            <li>某些第三方共享号或非官方渠道的账号长期处于受控状态</li>
          </ul>
          <p>
            OpenAI 从未在产品里公开承认或解释这个行为，但相关现象在开发者社区已被反复观察并验证。
          </p>
        </Section>

        <Section title="3. Recallkit 是怎么检测的">
          <p>
            Recallkit 会在你每次对话发生时，
            <strong className="text-zinc-900">读取浏览器和 ChatGPT 之间的若干关键信号</strong>
            ，并做交叉校验，判断你这条请求是否被路由到了非预期的模型。
          </p>
          <p>
            整个判断过程
            <strong className="text-zinc-900">完全发生在你的设备上</strong>
            ：不上传任何数据、不依赖外部服务、不调用第三方接口。一旦发现异常，立刻在侧栏给出明确结论。
          </p>
        </Section>

        <Section title="4. 降智时我能怎么办">
          <ul className="list-disc space-y-1.5 pl-6">
            <li>
              <strong className="text-zinc-900">换个网络环境</strong>
              ：换 IP、关掉代理或换地区节点，刷新后再发一条消息看看是否恢复
            </li>
            <li>
              <strong className="text-zinc-900">清理浏览器 Cookie 后重新登录</strong>
              ：重置会话指纹，部分情况能短期解除风控
            </li>
            <li>
              <strong className="text-zinc-900">间歇使用</strong>
              ：被风控的账号暂停一段时间（数小时到一天）后大概率会自动恢复
            </li>
            <li>
              <strong className="text-zinc-900">改用新会话 / 新对话</strong>
              ：有时仅是当前会话被路由到低规格模型，新建一个对话即可恢复
            </li>
            <li>
              <strong className="text-zinc-900">考虑账号源</strong>
              ：第三方共享号本身长期处于风控状态的概率较高，对模型质量敏感的场景建议使用官方个人订阅
            </li>
          </ul>
        </Section>

        <Section title="5. 为什么这个判断比「自己问 GPT」准确">
          <p>
            很多人会直接问 ChatGPT「你是什么模型？」，但 ChatGPT 的回答并不可靠：
            它可能基于训练数据回答出旧型号，也可能因为系统提示而误报。
          </p>
          <p>
            而 Recallkit 读取的是 <strong className="text-zinc-900">接口元数据</strong>
            ，这是后端实际路由信息，不依赖模型自我描述。
          </p>
        </Section>

        <Section title="6. 还有疑问？">
          <p>
            欢迎邮件联系{' '}
            <a className="text-sage-deep underline" href="mailto:2039652520@qq.com">
              2039652520@qq.com
            </a>
            ，我们会持续跟踪 ChatGPT 的行为变化并更新检测策略。
          </p>
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
          ChatGPT 降智说明
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          你选的模型，可能根本不是你拿到的。
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          ChatGPT 会在不通知你的情况下把请求悄悄路由到低规格模型。Recallkit 通过读取接口元数据，本地直接告诉你这件事是否正在发生。
        </p>
      </div>
    </section>
  );
}

function Tldr() {
  const lines = [
    '前端显示的模型 ≠ 实际运行的模型',
    'OpenAI 不会主动告知你被降智',
    'Recallkit 通过元数据本地比对，结果可信',
    '换网络 / 重登 / 间歇使用，多数情况可恢复',
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
          <a href="mailto:2039652520@qq.com" className="hover:text-zinc-900">
            联系我们
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
