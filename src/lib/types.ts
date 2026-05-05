/**
 * Minimal data shapes the bridge sends from the extension. Mirrors the
 * extension's `@/types/archive` but kept stand-alone so this site has
 * no compile-time dependency on the extension repo.
 */

/**
 * Mirror of the extension's `ROW_SCHEMA_VERSION`. The bridge does not
 * negotiate this — every row carries its own `_v` so the site can tell
 * legacy rows from modern ones independently. Keep this constant in
 * sync with the value the extension stamps on writes.
 */
export const ROW_SCHEMA_VERSION = 2;

export type MessageRole = 'user' | 'assistant' | 'system' | 'tool' | 'unknown';

export type ContentPartType =
  | 'text'
  | 'markdown'
  | 'code'
  | 'image'
  | 'file'
  | 'tool_call'
  | 'internal'
  | 'unknown';

export interface ContentPart {
  type: ContentPartType;
  text?: string;
  language?: string;
  name?: string;
  assetId?: string;
  metadata?: Record<string, unknown>;
}

export interface ArchiveMessage {
  /** Row schema version stamped by the extension at write time. */
  _v?: number;
  id: string;
  conversation_id: string;
  parent_id: string | null;
  role: MessageRole;
  created_at: string | null;
  content: ContentPart[];
  model?: string;
  metadata?: Record<string, unknown>;
}

export interface ArchiveConversation {
  /** Row schema version stamped by the extension at write time. */
  _v?: number;
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  models: string[];
  message_count: number;
  user_message_count: number;
  assistant_message_count: number;
  has_code: boolean;
  has_images: boolean;
  has_files: boolean;
  account_id?: string;
  account_email?: string;
  workspace_name?: string;
  workspace_plan_type?: string;
  workspace_structure?: 'personal' | 'workspace' | 'unknown';
  project_id?: string;
  project_slug?: string;
  project_name?: string;
}

export interface ConversationIndexRow {
  /** Row schema version stamped by the extension at write time. */
  _v?: number;
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  models: string[];
  message_count: number;
  user_message_count: number;
  assistant_message_count: number;
  has_code: boolean;
  has_images: boolean;
  has_files: boolean;
  account_id?: string;
  account_email?: string;
  workspace_name?: string;
  workspace_plan_type?: string;
  workspace_structure?: 'personal' | 'workspace' | 'unknown';
  project_id?: string;
  project_slug?: string;
  project_name?: string;
}
