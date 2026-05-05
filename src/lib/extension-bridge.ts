/**
 * Bridge to the Recallkit Chrome extension.
 *
 * We rely on `manifest.externally_connectable.matches` to whitelist
 * recallkit.org as an allowed sender, then talk to the extension's
 * service worker via `chrome.runtime.sendMessage(EXT_ID, …)`.
 *
 * The extension SW responds to four messages, all read-only:
 *   - PING                      → { ok, version }
 *   - SITE_LIST_CONVERSATIONS   → { ok, rows: ConversationIndexRow[] }
 *   - SITE_GET_CONVERSATION     → { ok, conversation, messages }
 *   - SITE_GET_ASSET            → { ok, url } (image as data: URL)
 *
 * Data never leaves the user's machine — Chrome's message bus is
 * a private channel between the open site tab and the locally
 * installed extension on the same browser profile.
 */

import type {
  ArchiveConversation,
  ArchiveMessage,
  ConversationIndexRow,
} from './types';

/**
 * The Chrome-Web-Store-assigned extension id.
 *
 * Dev (`npm run dev`) talks to the locally loaded unpacked build; production
 * builds talk to the published store extension. Set `VITE_EXT_ID` in
 * `.env.local` to override (e.g. to debug the store build from a dev server).
 */
const EXT_ID =
  (import.meta.env.VITE_EXT_ID as string | undefined) ??
  (import.meta.env.DEV
    ? 'paahekbogdbgcgjkbgkkdicoddofghha'
    : 'bannmklgebikoonanccnaalpfbibnlia');

declare global {
  interface Window {
    chrome?: {
      runtime?: {
        id?: string;
        sendMessage?: (
          extId: string,
          msg: unknown,
          callback: (resp: unknown) => void,
        ) => void;
        lastError?: { message?: string } | null;
      };
    };
  }
}

export class BridgeError extends Error {
  constructor(
    public kind: 'no-extension' | 'denied' | 'failed' | 'timeout',
    message: string,
  ) {
    super(message);
    this.name = 'BridgeError';
  }
}

function call<T>(message: unknown, timeoutMs = 5000): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const send = window.chrome?.runtime?.sendMessage;
    if (typeof send !== 'function') {
      reject(new BridgeError('no-extension', '未检测到 Recallkit 扩展'));
      return;
    }
    const timer = window.setTimeout(() => {
      reject(new BridgeError('timeout', '扩展未在限时内响应'));
    }, timeoutMs);
    try {
      send(EXT_ID, message, (resp) => {
        window.clearTimeout(timer);
        const lastErr = window.chrome?.runtime?.lastError;
        if (lastErr) {
          reject(new BridgeError('no-extension', lastErr.message ?? '扩展未响应'));
          return;
        }
        if (!resp || typeof resp !== 'object') {
          reject(new BridgeError('failed', 'malformed response'));
          return;
        }
        const r = resp as { ok?: boolean; error?: string };
        if (!r.ok) {
          reject(
            new BridgeError(
              r.error === 'unauthorized origin' ? 'denied' : 'failed',
              r.error ?? '调用失败',
            ),
          );
          return;
        }
        resolve(resp as T);
      });
    } catch (err) {
      window.clearTimeout(timer);
      reject(new BridgeError('no-extension', (err as Error).message));
    }
  });
}

export interface PingResponse {
  ok: true;
  /** Manifest version, e.g. "1.1.0". Show in UI; do not feature-gate on this. */
  version: string;
  /**
   * Wire-protocol version the extension speaks. Bumped when message
   * semantics change. Older extensions omit this — treat absence as 0.
   */
  protocol?: number;
  /**
   * Granular capability flags advertised by the extension. Prefer
   * checking these over `protocol` when deciding whether a feature
   * is available. Possible values include:
   *   - 'workspace'    workspace_* fields are populated on rows
   *   - 'projects'     project_* fields are populated
   *   - 'assets'       SITE_GET_ASSET works
   *   - 'row-version'  rows carry `_v` for legacy detection
   */
  capabilities?: string[];
}

export function hasCapability(p: PingResponse, name: string): boolean {
  return Array.isArray(p.capabilities) && p.capabilities.includes(name);
}
export interface ListResponse {
  ok: true;
  rows: ConversationIndexRow[];
}
export interface GetConversationResponse {
  ok: true;
  conversation: ArchiveConversation;
  messages: ArchiveMessage[];
}
export interface GetAssetResponse {
  ok: true;
  url: string;
}

export const ping = () => call<PingResponse>({ type: 'PING' }, 1500);
export const listConversations = () =>
  call<ListResponse>({ type: 'SITE_LIST_CONVERSATIONS' }, 8000);
export const getConversation = (id: string) =>
  call<GetConversationResponse>({ type: 'SITE_GET_CONVERSATION', id }, 8000);
export const getAssetUrl = (id: string) =>
  call<GetAssetResponse>({ type: 'SITE_GET_ASSET', id }, 8000);

/**
 * One-shot capability detection for the home / library page. Resolves
 * to true only when the extension is installed AND replies in time.
 */
export async function detectExtension(): Promise<{
  installed: boolean;
  version?: string;
  protocol?: number;
  capabilities?: string[];
}> {
  try {
    const r = await ping();
    return {
      installed: true,
      version: r.version,
      protocol: r.protocol,
      capabilities: r.capabilities,
    };
  } catch {
    return { installed: false };
  }
}

export { EXT_ID };
