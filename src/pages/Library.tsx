/**
 * Library landing — wraps ChatShell with a ChatGPT-style empty state.
 *
 * Mirrors the official product's first screen: huge centred greeting +
 * a rounded composer pill. Our composer is a static visual that opens
 * chatgpt.com on click (we are a viewer, not a chat client).
 */

import { useEffect } from 'react';
import ChatShell from '../components/ChatShell';

export default function Library() {
  useEffect(() => {
    document.title = 'Recallkit · 我的归档';
  }, []);
  return (
    <ChatShell title="ChatGPT" topRight={<TopRightIcons />}>
      <EmptyState />
    </ChatShell>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] w-full max-w-3xl flex-col items-center justify-center px-6">
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
        我能帮什么忙吗？
      </h2>
      <Composer />
      <p className="mt-6 text-xs text-zinc-400">
        本站为 Recallkit 扩展的在线阅读窗口；左侧选一条会话开始阅读。
      </p>
    </div>
  );
}

function Composer() {
  return (
    <a
      href="https://chatgpt.com/"
      target="_blank"
      rel="noreferrer"
      title="在 ChatGPT 开始新对话"
      className="mt-10 flex h-14 w-full max-w-[700px] items-center gap-3 rounded-full border border-zinc-200 bg-white px-3 text-zinc-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-700 hover:bg-zinc-100">
        <PlusIcon />
      </span>
      <span className="flex-1 text-[15px]">有问题，尽管问</span>
      <span className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-700 hover:bg-zinc-100">
        <MicIcon />
      </span>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
        <WaveformIcon />
      </span>
    </a>
  );
}

function TopRightIcons() {
  return (
    <div className="flex items-center gap-1">
      <button
        className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 transition-colors"
        title="新对话"
        onClick={() => window.open('https://chatgpt.com/', '_blank', 'noopener')}
      >
        <UserPlusIcon />
      </button>
      <button
        className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 transition-colors"
        title="模型"
      >
        <ModelIcon />
      </button>
    </div>
  );
}

/* icons */
function PlusIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}
function MicIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7.5" y="3" width="5" height="9" rx="2.5" />
      <path d="M5 10v.5a5 5 0 0 0 10 0V10M10 16v2" />
    </svg>
  );
}
function WaveformIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M5 8v4M8 6v8M11 5v10M14 8v4" />
    </svg>
  );
}
function UserPlusIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="7" r="3" />
      <path d="M2.5 16.5c.7-2.7 3-4 5.5-4s4.8 1.3 5.5 4" />
      <path d="M15 5v4M13 7h4" />
    </svg>
  );
}
function ModelIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
      <path d="M10 3v14" />
      <path d="M3.5 10h13" />
      <circle cx="10" cy="10" r="6" />
    </svg>
  );
}
