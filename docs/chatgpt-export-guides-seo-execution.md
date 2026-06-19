# ChatGPT Export Guides SEO Execution

## Goal

Apply the "plain but effective" SEO layout observed from ChatGPT Exporter:
search terms should appear directly in URLs, H1/H2/H3 headings, guide titles,
FAQ questions, and internal links.

## Keyword Page Matrix

| URL | Primary Keyword | Search Intent |
| --- | --- | --- |
| `/guides` | ChatGPT 导出教程 / ChatGPT 备份教程 | Hub page for all guide content |
| `/guides/chatgpt-to-markdown` | ChatGPT 导出 Markdown | Format-specific export |
| `/guides/chatgpt-to-json` | ChatGPT 导出 JSON | Structured data export |
| `/guides/bulk-export-chatgpt-conversations` | ChatGPT 批量导出聊天记录 | Bulk export / migration |
| `/guides/export-chatgpt-to-obsidian` | ChatGPT 导出到 Obsidian | Knowledge-base workflow |
| `/guides/backup-chatgpt-conversations` | ChatGPT 聊天记录备份 | Backup education and comparison |
| `/guides/chatgpt-official-export-vs-keepchat` | ChatGPT 官方导出 vs 本地备份 | Comparison intent |

## Page Template Rules

- H1 must contain the primary keyword.
- First paragraph must repeat the primary keyword naturally.
- H2 sections should use direct long-tail phrases such as:
  - 为什么需要 ChatGPT 聊天记录备份
  - 如何导出 ChatGPT 到 Markdown
  - ChatGPT 官方导出和本地备份有什么区别
- FAQ questions should be phrased like real search queries.
- Every guide should link to:
  - the closest product landing page
  - two related guides
  - the install page

## Internal Linking Rules

- Homepage navigation should expose `指南`.
- Homepage footer should link to `/guides`.
- `/chatgpt-backup`, `/chatgpt-export`, `/chatgpt-archive` should link to relevant guide content.
- `/guides` should link to all guide pages with keyword-rich card titles.
- Guide pages should cross-link to each other with descriptive anchor text.

## Implementation Checklist

- [x] Create this execution document.
- [x] Add `/guides` hub route.
- [x] Add guide article routes.
- [x] Build reusable guide page template.
- [x] Write guide content for Markdown, JSON, bulk export, Obsidian, backup, and official export comparison.
- [x] Update homepage navigation and footer.
- [x] Update SEO landing-page related links.
- [x] Update sitemap.
- [x] Run build and inspect changed routes.
