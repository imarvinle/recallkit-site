/**
 * Minimal data shapes the bridge sends from the extension. Mirrors the
 * extension's `@/types/archive` but kept stand-alone so this site has
 * no compile-time dependency on the extension repo.
 */

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
