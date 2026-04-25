/**
 * Single-conversation reader. Loads `{conversation, messages}` from the
 * local extension via the bridge, renders messages ChatGPT-style:
 * user bubble on the right, assistant flowed text on the left.
 *
 * Asset images load lazily — for each image part we issue a separate
 * `SITE_GET_ASSET` call and swap in the returned data: URL once it
 * resolves. No server is involved at any step.
 */

import { useEffect, useState } from 'react';
import {
  BridgeError,
  getAssetUrl,
  getConversation,
} from '../lib/extension-bridge';
import type {
  ArchiveConversation,
  ArchiveMessage,
  ContentPart,
} from '../lib/types';

type Stage =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; conversation: ArchiveConversation; messages: ArchiveMessage[] };

export default function Reader({ id }: { id: string }) {
  const [stage, setStage] = useState<Stage>({ kind: 'loading' });
  const [showInternals, setShowInternals] = useState(false);

  useEffect(() => {
    let cancelled = false;
    document.title = '加载中… · Recallkit';
    void (async () => {
      try {
        const r = await getConversation(id);
        if (cancelled) return;
        document.title = `${r.conversation.title || '会话'} · Recallkit`;
        setStage({ kind: 'ready', ...r });
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
  }, [id]);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Navbar />
      <div className="mx-auto max-w-[768px] px-6 py-10">
        {stage.kind === 'loading' && (
          <p className="animate-pulse py-20 text-center text-zinc-400">从扩展读取中…</p>
        )}
        {stage.kind === 'error' && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="font-medium text-red-800">读取失败</p>
            <p className="mt-1 text-sm text-red-700">{stage.message}</p>
            <a href="/library" className="mt-4 inline-block text-sm text-sage-deep hover:underline">
              ← 返回归档列表
            </a>
          </div>
        )}
        {stage.kind === 'ready' && (
          <>
            <Header conv={stage.conversation} />
            {hasAnyInternal(stage.messages) && (
              <div className="mb-2 flex justify-end">
                <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-zinc-900 select-none">
                  <input
                    type="checkbox"
                    checked={showInternals}
                    onChange={(e) => setShowInternals(e.target.checked)}
                    className="accent-zinc-700"
                  />
                  <span>显示工具调用与思考过程</span>
                </label>
              </div>
            )}
            <div className="space-y-6 py-2">
              {stage.messages.map((m) => (
                <MessageBlock key={m.id} message={m} showInternals={showInternals} />
              ))}
            </div>
            <div className="mt-12 border-t border-zinc-100 pt-6 text-center text-xs text-zinc-400">
              对话结束 · 数据从你浏览器的 Recallkit 扩展直接读取，未经过任何服务器
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}

function Header({ conv }: { conv: ArchiveConversation }) {
  return (
    <header className="mb-8">
      <a href="/library" className="text-xs text-zinc-400 hover:text-zinc-900">
        ← 返回归档列表
      </a>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
        {conv.title || '(无标题)'}
      </h1>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-xs text-zinc-500">
        <span>创建 {conv.created_at?.slice(0, 10)}</span>
        <span>更新 {conv.updated_at?.slice(0, 10)}</span>
        <span>{conv.message_count} 条消息</span>
        {conv.models?.length > 0 && (
          <span className="font-mono">{conv.models.join(', ')}</span>
        )}
        {conv.project_name && <span>项目 · {conv.project_name}</span>}
      </div>
    </header>
  );
}

function hasAnyInternal(messages: ArchiveMessage[]): boolean {
  return messages.some(
    (m) =>
      Array.isArray(m.content) &&
      m.content.some((p) => p.type === 'internal' || p.type === 'tool_call' || p.type === 'unknown'),
  );
}

function MessageBlock({
  message,
  showInternals,
}: {
  message: ArchiveMessage;
  showInternals: boolean;
}) {
  const isUser = message.role === 'user';
  const visible = (Array.isArray(message.content) ? message.content : []).filter((p) =>
    showInternals ? true : p.type !== 'internal' && p.type !== 'tool_call' && p.type !== 'unknown',
  );
  if (visible.length === 0) return null;

  if (isUser) {
    return (
      <div className="flex flex-col items-end">
        <div className="max-w-[80%] rounded-[18px] bg-[#2f2f2f] px-5 py-2.5 text-white break-words">
          {visible.map((p, i) => (
            <Part key={i} part={p} invert />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {visible.map((p, i) => (
        <Part key={i} part={p} />
      ))}
    </div>
  );
}

function Part({ part, invert = false }: { part: ContentPart; invert?: boolean }) {
  switch (part.type) {
    case 'markdown':
    case 'text':
      return <Markdown text={part.text ?? ''} invert={invert} />;
    case 'code':
      return <CodeBlock lang={part.language} text={part.text ?? ''} />;
    case 'tool_call':
      return <ToolCall recipient={part.name} lang={part.language} text={part.text ?? ''} />;
    case 'internal':
      return <InternalBlock kind={part.name} text={part.text ?? ''} />;
    case 'image':
      return <ImagePart assetId={part.assetId} name={part.name} />;
    case 'file':
      return <FilePart assetId={part.assetId} name={part.name} />;
    default:
      return null;
  }
}

function Markdown({ text, invert }: { text: string; invert?: boolean }) {
  // No syntax-highlighting / GFM; preserve newlines and a few trivial
  // markdown bits via prose-ish CSS. Adequate for an archive viewer.
  return (
    <div
      className={`whitespace-pre-wrap leading-7 ${invert ? 'text-white' : 'text-zinc-900'}`}
    >
      {text}
    </div>
  );
}

function CodeBlock({ lang, text }: { lang?: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <figure className="my-4 overflow-hidden rounded-2xl bg-zinc-950">
      <figcaption className="flex items-center justify-between bg-zinc-800/70 px-4 py-2">
        <span className="font-mono text-[11px] text-zinc-400">{lang || 'code'}</span>
        <button
          onClick={copy}
          className="font-mono text-[11px] text-zinc-300 transition-colors hover:text-white"
        >
          {copied ? '已复制' : '复制'}
        </button>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6 text-zinc-100">
        <code>{text}</code>
      </pre>
    </figure>
  );
}

function ToolCall({
  recipient,
  lang,
  text,
}: {
  recipient?: string;
  lang?: string;
  text: string;
}) {
  return (
    <details className="group my-3 rounded-xl border border-zinc-200 bg-zinc-50">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-1.5 text-[12px] text-zinc-600 [&::-webkit-details-marker]:hidden">
        <span className="font-mono text-[10px] text-zinc-400 transition-transform group-open:rotate-90">
          ▶
        </span>
        <span>工具调用</span>
        {recipient && <span className="font-mono text-[11px] text-zinc-500 truncate">· {recipient}</span>}
        {lang && <span className="ml-auto font-mono text-[10px] uppercase text-zinc-400">{lang}</span>}
      </summary>
      <pre className="m-2 mt-0 overflow-x-auto rounded-lg bg-zinc-950 p-3 font-mono text-[12px] leading-6 text-zinc-100">
        <code>{text}</code>
      </pre>
    </details>
  );
}

function InternalBlock({ kind, text }: { kind?: string; text: string }) {
  const label = kind === 'thoughts' ? '思考' : kind === 'reasoning_recap' ? '思考摘要' : '内部';
  return (
    <div className="my-3 rounded-xl border border-dashed border-zinc-300 bg-zinc-50/60 px-4 py-3 text-zinc-600">
      <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-zinc-400">
        {label}
      </div>
      <div className="whitespace-pre-wrap text-[13.5px] italic leading-6">{text}</div>
    </div>
  );
}

function ImagePart({ assetId, name }: { assetId?: string; name?: string }) {
  const [url, setUrl] = useState<string | 'missing' | undefined>(undefined);
  useEffect(() => {
    if (!assetId) {
      setUrl('missing');
      return;
    }
    let cancelled = false;
    void (async () => {
      try {
        const r = await getAssetUrl(assetId);
        if (!cancelled) setUrl(r.url);
      } catch {
        if (!cancelled) setUrl('missing');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [assetId]);

  if (url === 'missing') {
    return (
      <div className="my-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-500">
        ◫ 图片未保存原图
      </div>
    );
  }
  if (!url) {
    return (
      <div className="my-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-400">
        ◫ 图片加载中…
      </div>
    );
  }
  return (
    <figure className="my-3 overflow-hidden rounded-2xl">
      <img src={url} alt={name ?? 'image'} loading="lazy" className="block h-auto max-w-full" />
    </figure>
  );
}

function FilePart({ assetId, name }: { assetId?: string; name?: string }) {
  const [url, setUrl] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!assetId) return;
    let cancelled = false;
    void (async () => {
      try {
        const r = await getAssetUrl(assetId);
        if (!cancelled) setUrl(r.url);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [assetId]);
  if (!url) return <div className="my-2 text-sm text-zinc-500">▤ {name ?? 'file'}</div>;
  return (
    <a
      href={url}
      download={name}
      className="my-2 inline-flex items-center gap-2 rounded-2xl bg-zinc-100 px-3 py-2 text-sm text-zinc-900 transition-colors hover:bg-zinc-200"
    >
      <span className="text-zinc-500">▤</span>
      <span className="truncate">{name ?? 'file'}</span>
      <span className="text-[11px] text-zinc-500">下载</span>
    </a>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[768px] items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold tracking-tight">Recallkit</span>
        </a>
        <a href="/library" className="text-sm text-zinc-500 hover:text-zinc-900">
          ← 我的归档
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-100 py-10 text-sm text-zinc-500">
      <div className="mx-auto flex max-w-[768px] flex-wrap items-center justify-between gap-4 px-6">
        <span>© {new Date().getFullYear()} Recallkit</span>
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
