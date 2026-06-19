import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { setSeo } from '../lib/seo';

const STORE_URL =
  'https://chromewebstore.google.com/detail/bannmklgebikoonanccnaalpfbibnlia';

type GuideLink = {
  title: string;
  href: string;
  desc: string;
};

type GuideSection = {
  title: string;
  body: ReactNode;
};

type GuideConfig = {
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  primaryKeyword: string;
  intro: ReactNode;
  takeaways: string[];
  sections: GuideSection[];
  faq: { q: string; a: string }[];
  related: GuideLink[];
};

const guideCards: GuideLink[] = [
  {
    title: 'ChatGPT 导出 Markdown 教程',
    href: '/guides/chatgpt-to-markdown',
    desc: '把 ChatGPT 聊天记录保存为 .md 文件，适合 Obsidian、Notion、Git 和长期知识库。',
  },
  {
    title: 'ChatGPT 导出 JSON 教程',
    href: '/guides/chatgpt-to-json',
    desc: '导出结构化 JSON，用于备份、迁移、脚本处理和数据分析。',
  },
  {
    title: 'ChatGPT 批量导出聊天记录',
    href: '/guides/bulk-export-chatgpt-conversations',
    desc: '对比官方导出、本地备份和批量 ZIP，选择适合迁移的方案。',
  },
  {
    title: 'ChatGPT 导出到 Obsidian',
    href: '/guides/export-chatgpt-to-obsidian',
    desc: '把 AI 对话整理进 Obsidian vault，保留 Markdown、代码块和上下文。',
  },
  {
    title: 'ChatGPT 聊天记录备份教程',
    href: '/guides/backup-chatgpt-conversations',
    desc: '理解自动备份、本地归档、官方导出和换电脑迁移的区别。',
  },
  {
    title: 'ChatGPT 官方导出 vs 本地备份',
    href: '/guides/chatgpt-official-export-vs-keepchat',
    desc: '官方数据导出、实时备份、Markdown / JSON / ZIP 导出应该怎么选。',
  },
];

const guides: Record<string, GuideConfig> = {
  'chatgpt-to-markdown': {
    slug: 'chatgpt-to-markdown',
    primaryKeyword: 'ChatGPT 导出 Markdown',
    title: 'ChatGPT 导出 Markdown：把聊天记录保存为 .md 文件',
    description:
      '想把 ChatGPT 对话放进 Obsidian、Notion 或 Git 仓库？这篇教程讲清楚官方导出、手动复制和 KeepChat AI 本地 Markdown 导出的区别。',
    seoTitle: 'ChatGPT 导出 Markdown 教程 | 保存聊天记录为 .md - KeepChat AI',
    seoDescription:
      '学习如何将 ChatGPT 聊天记录导出为 Markdown 文件，对比官方导出、复制粘贴和 KeepChat AI 本地导出，保留代码块、表格和上下文。',
    intro: (
      <p>
        <strong className="text-zinc-900">ChatGPT 导出 Markdown</strong>
        是很多重度用户最常见的需求：Markdown 能被 Obsidian、Notion、GitHub、VS Code 和静态博客直接读取，
        比截图或 PDF 更适合长期整理、搜索和二次编辑。
      </p>
    ),
    takeaways: [
      'Markdown 适合长期知识库，不只是一次性分享',
      '官方导出通常需要再转换，不能直接得到干净 .md',
      'KeepChat AI 可以把已备份会话导出为 Markdown',
      '代码块、表格、列表和上下文应尽量保留',
    ],
    sections: [
      {
        title: '为什么要把 ChatGPT 聊天记录导出为 Markdown',
        body: (
          <>
            <p>
              ChatGPT 对话里常常包含 prompt 模板、代码方案、写作草稿和研究思路。留在 ChatGPT 侧边栏里，
              它们很难和你自己的笔记系统连接起来。
            </p>
            <p>
              导出成 Markdown 后，每条聊天记录都能变成一个普通文本文件：可以全文搜索、版本管理、批注、链接到其他笔记，
              也能长期放在本地文件夹里。
            </p>
          </>
        ),
      },
      {
        title: '方法 1：用 KeepChat AI 导出 ChatGPT Markdown',
        body: (
          <Steps
            items={[
              '安装 KeepChat AI 并打开 chatgpt.com。',
              '先让扩展自动备份当前或历史 ChatGPT 会话。',
              '在本地归档里选择需要的聊天记录。',
              '选择 Markdown 导出，保存为 .md 文件。',
              '把文件放入 Obsidian、Notion、Git 仓库或你的知识库目录。',
            ]}
          />
        ),
      },
      {
        title: '方法 2：复制粘贴到 Markdown 文件',
        body: (
          <p>
            手动复制适合一两段短回答，但长对话容易丢失层级、代码块语言、表格和上下文。对需要长期保存的 ChatGPT 聊天记录，
            手动复制更像临时补救，不适合作为稳定备份流程。
          </p>
        ),
      },
      {
        title: '方法 3：官方导出后再转换 Markdown',
        body: (
          <p>
            ChatGPT 官方导出适合完整备份账号数据，但通常会给你一个原始数据包。要把它变成 Markdown，
            还需要解析 JSON、拆分会话、处理代码块和清理系统消息。这个方法适合技术用户，不适合每天整理笔记的人。
          </p>
        ),
      },
    ],
    faq: [
      {
        q: 'ChatGPT 可以直接导出 Markdown 吗？',
        a: 'ChatGPT 官方产品通常不直接提供干净的单条 Markdown 导出。KeepChat AI 可以把已备份的会话导出为 Markdown 文件。',
      },
      {
        q: 'ChatGPT 导出 Markdown 会保留代码块吗？',
        a: 'KeepChat AI 的目标是保留聊天正文、代码块、列表和表格等结构，适合放进 Obsidian 或 Git 仓库继续整理。',
      },
      {
        q: 'Markdown 和 PDF 哪个更适合备份 ChatGPT？',
        a: 'Markdown 更适合搜索、编辑和知识库；PDF 更适合分享和打印。长期备份通常优先 Markdown 或 JSON。',
      },
    ],
    related: [
      guideCards[1],
      guideCards[3],
      { title: 'ChatGPT 聊天记录导出', href: '/chatgpt-export', desc: '了解 KeepChat AI 支持的 Markdown / JSON / ZIP 导出。' },
    ],
  },
  'chatgpt-to-json': {
    slug: 'chatgpt-to-json',
    primaryKeyword: 'ChatGPT 导出 JSON',
    title: 'ChatGPT 导出 JSON：保存结构化聊天记录',
    description:
      'JSON 适合备份、迁移、脚本分析和二次处理。这篇教程解释 ChatGPT 官方 JSON、归档 JSON 和 GPT 原生 JSON 的区别。',
    seoTitle: 'ChatGPT 导出 JSON 教程 | 聊天记录结构化备份 - KeepChat AI',
    seoDescription:
      '了解如何导出 ChatGPT 聊天记录为 JSON，适合结构化备份、批量迁移、脚本分析和本地归档恢复。',
    intro: (
      <p>
        <strong className="text-zinc-900">ChatGPT 导出 JSON</strong>
        适合需要结构化数据的人：开发者、研究者、团队管理员，或者想把聊天记录做长期迁移和二次处理的用户。
      </p>
    ),
    takeaways: [
      'JSON 适合机器读取和跨设备迁移',
      '官方导出是账号级数据包，阅读体验不友好',
      '归档 JSON 更适合 KeepChat AI 内部恢复',
      'GPT 原生 JSON 适合脚本处理和数据转换',
    ],
    sections: [
      {
        title: 'ChatGPT JSON 导出适合哪些场景',
        body: (
          <ul className="list-disc space-y-1.5 pl-6">
            <li>换电脑时迁移本地聊天记录归档</li>
            <li>用脚本分析 prompt、主题、时间线和项目标签</li>
            <li>把 ChatGPT 对话转成其他格式，比如 Markdown 或 CSV</li>
            <li>为团队或个人知识库做长期备份快照</li>
          </ul>
        ),
      },
      {
        title: '官方 ChatGPT JSON 和本地归档 JSON 的区别',
        body: (
          <p>
            官方导出通常是完整账号数据，适合全量备份；本地归档 JSON 更关注已保存会话的恢复和迁移。
            如果你的目标是“可读”，Markdown 更合适；如果你的目标是“可处理、可恢复”，JSON 更合适。
          </p>
        ),
      },
      {
        title: '如何用 KeepChat AI 导出 ChatGPT JSON',
        body: (
          <Steps
            items={[
              '先通过实时备份或手动补备份保存 ChatGPT 会话。',
              '打开 KeepChat AI 本地归档，选择一条或多条聊天记录。',
              '选择归档 JSON 或 GPT 原生 JSON。',
              '下载文件并保存到本地备份目录。',
              '需要迁移时，在新设备安装扩展后再导入归档数据。',
            ]}
          />
        ),
      },
    ],
    faq: [
      {
        q: 'ChatGPT 导出 JSON 可以重新导入吗？',
        a: '取决于格式。KeepChat AI 的归档 JSON 面向本地恢复和迁移；官方导出的 JSON 通常需要额外处理。',
      },
      {
        q: 'JSON 比 Markdown 更适合备份吗？',
        a: 'JSON 更适合机器处理和恢复，Markdown 更适合阅读和编辑。长期保存可以两个格式都导出。',
      },
      {
        q: 'ChatGPT JSON 导出能用于数据分析吗？',
        a: '可以。结构化 JSON 适合用脚本统计主题、时间、关键词和会话数量。',
      },
    ],
    related: [
      guideCards[0],
      guideCards[2],
      { title: 'ChatGPT 本地会话归档', href: '/chatgpt-archive', desc: '先归档和搜索，再导出结构化数据。' },
    ],
  },
  'bulk-export-chatgpt-conversations': {
    slug: 'bulk-export-chatgpt-conversations',
    primaryKeyword: 'ChatGPT 批量导出聊天记录',
    title: 'ChatGPT 批量导出聊天记录：官方导出、本地备份和 ZIP 怎么选',
    description:
      '需要一次性保存大量 ChatGPT 历史记录？这篇教程对比官方导出、脚本转换、KeepChat AI 批量导出和换电脑迁移流程。',
    seoTitle: 'ChatGPT 批量导出聊天记录教程 | 官方导出 vs 本地 ZIP - KeepChat AI',
    seoDescription:
      '对比 ChatGPT 批量导出聊天记录的几种方法：官方数据导出、本地备份、Markdown / JSON / ZIP 批量导出和换电脑迁移。',
    intro: (
      <p>
        <strong className="text-zinc-900">ChatGPT 批量导出聊天记录</strong>
        通常出现在两个时刻：你要换电脑，或者你终于意识到几百条历史会话已经变成了工作资产。
      </p>
    ),
    takeaways: [
      '官方导出适合完整账号数据备份',
      '本地批量导出适合可读、可迁移的会话文件',
      'Markdown 适合知识库，JSON 适合恢复，ZIP 适合打包迁移',
      '批量导出前最好先做一次本地归档和清理',
    ],
    sections: [
      {
        title: '方法 1：ChatGPT 官方数据导出',
        body: (
          <p>
            官方导出适合做完整账号级备份，优点是覆盖范围广，缺点是格式更偏原始数据包。你拿到数据后，
            往往还需要解压、解析和转换，才能变成适合阅读或整理的单条会话文件。
          </p>
        ),
      },
      {
        title: '方法 2：KeepChat AI 批量导出 Markdown / JSON / ZIP',
        body: (
          <p>
            KeepChat AI 更适合日常批量整理：先把 ChatGPT 会话备份到浏览器本地，再按需要导出为 Markdown、JSON 或 ZIP。
            这个流程更适合迁移、知识库整理和阶段性备份。
          </p>
        ),
      },
      {
        title: '方法 3：用脚本转换官方导出',
        body: (
          <p>
            脚本转换适合开发者，但对普通用户成本较高。OpenAI 数据结构变化时，脚本也可能需要维护。
            如果你只想稳定保存聊天记录，不建议把脚本作为唯一备份方案。
          </p>
        ),
      },
      {
        title: '推荐的 ChatGPT 批量导出流程',
        body: (
          <Steps
            items={[
              '先安装 KeepChat AI，让历史会话进入本地归档。',
              '用全文搜索和项目分组确认重要会话。',
              '重要内容导出 Markdown，便于阅读和知识库整理。',
              '迁移场景导出 JSON 或 ZIP，便于恢复和打包。',
              '定期保留一份官方导出，作为账号级完整备份。',
            ]}
          />
        ),
      },
    ],
    faq: [
      {
        q: 'ChatGPT 可以一次性批量导出所有聊天记录吗？',
        a: '官方导出可以做账号级完整导出；KeepChat AI 更适合把本地已备份会话批量导出为 Markdown、JSON 或 ZIP。',
      },
      {
        q: '批量导出 ChatGPT 用 Markdown 还是 JSON？',
        a: '阅读和知识库选 Markdown；迁移、恢复和脚本处理选 JSON；整包搬家选 ZIP。',
      },
      {
        q: '换电脑时怎么迁移 ChatGPT 历史记录？',
        a: '先在旧电脑导出 ZIP 或归档 JSON，再在新电脑安装 KeepChat AI 后导入本地档案。',
      },
    ],
    related: [
      guideCards[4],
      guideCards[5],
      { title: 'ChatGPT 自动备份', href: '/chatgpt-backup', desc: '先让历史会话稳定进入本地档案。' },
    ],
  },
  'export-chatgpt-to-obsidian': {
    slug: 'export-chatgpt-to-obsidian',
    primaryKeyword: 'ChatGPT 导出到 Obsidian',
    title: 'ChatGPT 导出到 Obsidian：把 AI 对话保存进知识库',
    description:
      '把 ChatGPT 聊天记录导出为 Markdown，然后放进 Obsidian vault，保留 prompt、代码、研究笔记和项目上下文。',
    seoTitle: 'ChatGPT 导出到 Obsidian 教程 | 保存 AI 对话到知识库 - KeepChat AI',
    seoDescription:
      '学习如何将 ChatGPT 聊天记录导出到 Obsidian，使用 Markdown 保存 prompt、代码块、研究笔记和长期知识资产。',
    intro: (
      <p>
        <strong className="text-zinc-900">ChatGPT 导出到 Obsidian</strong>
        的关键不是“下载一个文件”，而是把 AI 对话变成能被链接、搜索、复盘和沉淀的知识资产。
      </p>
    ),
    takeaways: [
      'Obsidian 最适合接收 Markdown 格式',
      'ChatGPT 对话可以按项目、日期和主题组织',
      '代码块、prompt 和研究过程应该保留上下文',
      '本地优先工作流更符合隐私和长期保存需求',
    ],
    sections: [
      {
        title: '为什么把 ChatGPT 聊天记录放进 Obsidian',
        body: (
          <p>
            Obsidian 的优势是本地 Markdown、双链、标签和全文搜索。把 ChatGPT 历史记录导入后，
            你可以把一次 AI 对话连接到项目笔记、研究主题、代码文档或写作草稿里。
          </p>
        ),
      },
      {
        title: 'ChatGPT 导出到 Obsidian 的推荐格式',
        body: (
          <p>
            推荐优先使用 Markdown。PDF 不方便二次编辑，JSON 不适合直接阅读，Markdown 则能保留足够结构，
            同时保持文本文件的可移植性。
          </p>
        ),
      },
      {
        title: '如何把 ChatGPT 导出到 Obsidian',
        body: (
          <Steps
            items={[
              '用 KeepChat AI 备份需要保存的 ChatGPT 会话。',
              '选择 Markdown 导出。',
              '把 .md 文件放入 Obsidian vault 的 AI Conversations 文件夹。',
              '给文件添加项目标签、日期或 YAML frontmatter。',
              '用双链把 ChatGPT 对话连接到相关项目笔记。',
            ]}
          />
        ),
      },
      {
        title: 'Obsidian 归档命名建议',
        body: (
          <p>
            可以使用类似 <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px]">2026-06-19-chatgpt-seo-plan.md</code>
            的命名方式，把日期、来源和主题放进文件名，后续搜索会轻松很多。
          </p>
        ),
      },
    ],
    faq: [
      {
        q: 'ChatGPT 导出到 Obsidian 应该用什么格式？',
        a: '优先用 Markdown。它能被 Obsidian 原生读取，也方便搜索、链接和版本管理。',
      },
      {
        q: 'Obsidian 可以搜索 ChatGPT 聊天记录吗？',
        a: '可以。只要聊天记录保存为 Markdown 文件并放进 vault，Obsidian 就能全文搜索。',
      },
      {
        q: 'ChatGPT 对话里的代码适合放进 Obsidian 吗？',
        a: '适合。Markdown 代码块可以保留语言标记，方便 Obsidian 或其他编辑器高亮。',
      },
    ],
    related: [
      guideCards[0],
      guideCards[2],
      { title: 'ChatGPT 会话归档', href: '/chatgpt-archive', desc: '先在本地归档里搜索和筛选重要对话。' },
    ],
  },
  'backup-chatgpt-conversations': {
    slug: 'backup-chatgpt-conversations',
    primaryKeyword: 'ChatGPT 聊天记录备份',
    title: 'ChatGPT 聊天记录备份教程：自动保存、本地归档和换电脑迁移',
    description:
      '系统理解 ChatGPT 聊天记录备份：为什么要备份、备份在哪里、如何导出 Markdown / JSON / ZIP，以及怎么迁移到新电脑。',
    seoTitle: 'ChatGPT 聊天记录备份教程 | 自动保存和本地归档 - KeepChat AI',
    seoDescription:
      '完整 ChatGPT 聊天记录备份教程，覆盖自动备份、本地保存、全文搜索、Markdown / JSON / ZIP 导出和换电脑迁移。',
    intro: (
      <p>
        <strong className="text-zinc-900">ChatGPT 聊天记录备份</strong>
        是为了把重要对话从“网页历史”变成“你自己掌控的本地档案”。这对开发、研究、写作和商业分析都很重要。
      </p>
    ),
    takeaways: [
      '备份解决保存问题，归档解决长期管理问题',
      '自动备份比手动复制更稳定',
      '本地保存更适合隐私敏感内容',
      '导出文件可以用于迁移、知识库和长期快照',
    ],
    sections: [
      {
        title: '为什么需要备份 ChatGPT 聊天记录',
        body: (
          <p>
            重要的 ChatGPT 对话常常包含决策过程、代码上下文、prompt 设计和客户材料。
            如果只留在 ChatGPT 网页里，它们会受到账号状态、误删、搜索体验和跨设备迁移的限制。
          </p>
        ),
      },
      {
        title: 'ChatGPT 自动备份和手动导出有什么区别',
        body: (
          <p>
            手动导出适合偶尔保存一条会话；自动备份适合重度用户。KeepChat AI 会在聊天时把新消息写入本地档案，
            之后你再按需要搜索、阅读、导出和迁移。
          </p>
        ),
      },
      {
        title: 'ChatGPT 聊天记录备份到哪里',
        body: (
          <p>
            KeepChat AI 把会话保存在浏览器本地 IndexedDB 中，不上传聊天内容到服务器。
            这意味着你的长期对话默认留在自己电脑上，而不是被另一个云端工具托管。
          </p>
        ),
      },
      {
        title: '推荐的 ChatGPT 备份策略',
        body: (
          <Steps
            items={[
              '日常使用时开启实时备份。',
              '每周用全文搜索整理重要会话。',
              '对知识库内容导出 Markdown。',
              '对迁移和恢复内容导出 JSON 或 ZIP。',
              '偶尔保留官方账号级导出作为额外保险。',
            ]}
          />
        ),
      },
    ],
    faq: [
      {
        q: 'ChatGPT 聊天记录会不会丢？',
        a: '任何只依赖云端历史的记录都有不可控因素。把重要聊天记录备份到本地，可以降低误删、账号异常和迁移带来的风险。',
      },
      {
        q: 'ChatGPT 聊天记录备份安全吗？',
        a: 'KeepChat AI 的备份数据保存在浏览器本地，不上传服务器。隐私敏感内容建议优先选择本地备份。',
      },
      {
        q: '备份后的 ChatGPT 会话可以导出吗？',
        a: '可以。已备份会话可以导出为 Markdown、JSON 或 ZIP，用于知识库、迁移和长期保存。',
      },
    ],
    related: [
      guideCards[2],
      guideCards[5],
      { title: 'ChatGPT 聊天记录备份工具', href: '/chatgpt-backup', desc: '了解 KeepChat AI 的实时备份和本地保存能力。' },
    ],
  },
  'chatgpt-official-export-vs-keepchat': {
    slug: 'chatgpt-official-export-vs-keepchat',
    primaryKeyword: 'ChatGPT 官方导出 vs 本地备份',
    title: 'ChatGPT 官方导出 vs 本地备份：保存聊天记录怎么选',
    description:
      '官方导出、实时备份、Markdown 导出、JSON 迁移分别适合什么场景？这篇对比帮你选择保存 ChatGPT 聊天记录的方式。',
    seoTitle: 'ChatGPT 官方导出 vs 本地备份 | 保存聊天记录怎么选 - KeepChat AI',
    seoDescription:
      '对比 ChatGPT 官方导出和 KeepChat AI 本地备份：数据范围、格式、搜索、隐私、Markdown / JSON / ZIP 导出和迁移场景。',
    intro: (
      <p>
        <strong className="text-zinc-900">ChatGPT 官方导出 vs 本地备份</strong>
        不是谁替代谁的问题。官方导出更像完整账号数据包，本地备份更像每天都能使用的聊天记录管理工具。
      </p>
    ),
    takeaways: [
      '官方导出适合完整账号级数据备份',
      '本地备份适合实时保存、搜索和按需导出',
      'Markdown / JSON / ZIP 更适合日常整理和迁移',
      '最稳妥的策略是官方导出加本地实时备份',
    ],
    sections: [
      {
        title: 'ChatGPT 官方导出适合什么场景',
        body: (
          <p>
            当你需要一次性取回账号级数据时，官方导出很有价值。它适合做完整快照，但通常不适合直接阅读、
            单条导出或日常知识库整理。
          </p>
        ),
      },
      {
        title: 'KeepChat AI 本地备份适合什么场景',
        body: (
          <p>
            如果你每天都在用 ChatGPT，并且希望新会话自动保存、全文搜索、按项目归档，再导出 Markdown / JSON / ZIP，
            本地备份会更贴近日常工作流。
          </p>
        ),
      },
      {
        title: 'ChatGPT 官方导出和本地备份对比',
        body: (
          <div className="overflow-hidden rounded-xl border border-zinc-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-zinc-50 text-zinc-900">
                <tr>
                  <th className="border-b border-zinc-200 px-4 py-3">维度</th>
                  <th className="border-b border-zinc-200 px-4 py-3">官方导出</th>
                  <th className="border-b border-zinc-200 px-4 py-3">KeepChat AI 本地备份</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600">
                <CompareRow label="触发方式" official="手动请求账号数据" keepchat="聊天时自动保存，也可手动补备份" />
                <CompareRow label="导出格式" official="官方数据包" keepchat="Markdown / JSON / ZIP" />
                <CompareRow label="搜索体验" official="下载后自行处理" keepchat="本地全文搜索和阅读视图" />
                <CompareRow label="适用场景" official="完整快照" keepchat="日常备份、归档、迁移和知识库" />
              </tbody>
            </table>
          </div>
        ),
      },
      {
        title: '推荐选择',
        body: (
          <p>
            如果你只想偶尔做完整快照，用官方导出即可。如果你希望 ChatGPT 聊天记录每天自动保存、
            能搜索、能导出、能迁移，就用 KeepChat AI 做本地备份，再定期保留官方导出作为保险。
          </p>
        ),
      },
    ],
    faq: [
      {
        q: 'ChatGPT 官方导出可以替代本地备份吗？',
        a: '如果只是偶尔完整备份，可以。但如果你需要日常搜索、单条导出和 Markdown 整理，本地备份更合适。',
      },
      {
        q: '本地备份会影响 ChatGPT 官方数据吗？',
        a: '不会。KeepChat AI 只是读取可见会话并保存在本地，不修改 ChatGPT 官方数据。',
      },
      {
        q: '官方导出和 KeepChat AI 可以一起用吗？',
        a: '可以，而且这是更稳的策略：官方导出做完整快照，KeepChat AI 做日常实时备份。',
      },
    ],
    related: [
      guideCards[4],
      guideCards[2],
      { title: 'ChatGPT 聊天记录导出', href: '/chatgpt-export', desc: '查看 Markdown / JSON / ZIP 导出功能。' },
    ],
  },
};

export function GuidesHub() {
  useEffect(() => {
    setSeo({
      title: 'ChatGPT 导出与备份教程 | Markdown、JSON、Obsidian、批量导出 - KeepChat AI',
      description:
        '系统学习 ChatGPT 聊天记录备份、导出 Markdown、导出 JSON、批量导出、导入 Obsidian 和官方导出对比。',
      path: '/guides',
    });
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Navbar />
      <section className="border-b border-zinc-100 bg-zinc-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm font-medium uppercase tracking-widest text-sage-deep">
            Guides · ChatGPT 导出教程
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            ChatGPT 聊天记录备份、导出和归档教程
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600">
            从 Markdown、JSON、批量导出到 Obsidian 知识库，这里整理了保存 ChatGPT 历史记录最常见的搜索问题和操作路径。
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {guideCards.map((card) => (
            <a
              key={card.href}
              href={card.href}
              className="feature-card hover:-translate-y-0.5 hover:border-sage/60"
            >
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{card.desc}</p>
              <span className="mt-4 inline-flex text-sm font-medium text-sage-deep">阅读教程 →</span>
            </a>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

export function GuideArticle({ slug }: { slug: string }) {
  const guide = guides[slug];

  useEffect(() => {
    if (!guide) {
      setSeo({
        title: 'ChatGPT 导出与备份教程 - KeepChat AI',
        description: 'ChatGPT 聊天记录备份、导出、归档和本地保存教程。',
        path: '/guides',
      });
      return;
    }

    setSeo({
      title: guide.seoTitle,
      description: guide.seoDescription,
      path: `/guides/${guide.slug}`,
    });
  }, [guide, slug]);

  if (!guide) return <GuidesHub />;

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Navbar />
      <section className="border-b border-zinc-100 bg-zinc-50 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-sm font-medium uppercase tracking-widest text-sage-deep">
            {guide.primaryKeyword}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600">
            {guide.description}
          </p>
        </div>
      </section>
      <article className="mx-auto max-w-3xl px-6 py-12 leading-relaxed text-[15.5px] text-zinc-700">
        <div className="space-y-3">{guide.intro}</div>
        <section className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-900">
            {guide.primaryKeyword}：要点速览
          </h2>
          <ul className="mt-4 list-disc space-y-1.5 pl-6">
            {guide.takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        {guide.sections.map((section) => (
          <section key={section.title} className="mt-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-900">
              {section.title}
            </h2>
            <div className="mt-3 space-y-3">{section.body}</div>
          </section>
        ))}
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-900">
            {guide.primaryKeyword}常见问题
          </h2>
          <Faq items={guide.faq} />
        </section>
        <RelatedLinks items={guide.related} />
      </article>
      <Cta />
      <Footer />
    </main>
  );
}

export function hasGuide(slug: string) {
  return Boolean(guides[slug]);
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={item} className="flex gap-3 rounded-xl border border-zinc-200 bg-white p-4">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-deep font-mono text-sm text-white">
            {index + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function CompareRow({ label, official, keepchat }: { label: string; official: string; keepchat: string }) {
  return (
    <tr>
      <td className="border-b border-zinc-100 px-4 py-3 font-medium text-zinc-900">{label}</td>
      <td className="border-b border-zinc-100 px-4 py-3">{official}</td>
      <td className="border-b border-zinc-100 px-4 py-3">{keepchat}</td>
    </tr>
  );
}

function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mt-4 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
      {items.map((item) => (
        <details key={item.q} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-zinc-900">
            {item.q}
            <span className="text-zinc-400 transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

function RelatedLinks({ items }: { items: GuideLink[] }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-900">
        继续阅读相关 ChatGPT 导出教程
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-sage/60 hover:bg-zinc-50"
          >
            <span className="font-medium text-zinc-900">{item.title}</span>
            <span className="mt-2 block text-sm leading-relaxed text-zinc-600">{item.desc}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2 text-zinc-900">
          <Logo />
          <span className="font-semibold tracking-tight">KeepChat AI</span>
        </a>
        <nav className="hidden items-center gap-5 text-sm text-zinc-600 md:flex">
          <a href="/guides" className="hover:text-zinc-900">ChatGPT 导出教程</a>
          <a href="/chatgpt-backup" className="hover:text-zinc-900">聊天备份</a>
          <a href="/chatgpt-export" className="hover:text-zinc-900">记录导出</a>
          <a href="/install" className="hover:text-zinc-900">安装</a>
        </nav>
        <a href={STORE_URL} target="_blank" rel="noreferrer" className="btn-primary !px-4 !py-2 text-[13px]">
          免费安装
        </a>
      </div>
    </header>
  );
}

function Cta() {
  return (
    <section className="border-t border-zinc-100 py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          开始备份和导出 ChatGPT 聊天记录
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-zinc-600">
          用 KeepChat AI 把重要会话保存到浏览器本地，再导出 Markdown、JSON 或 ZIP。
        </p>
        <div className="mt-7">
          <a href={STORE_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <ChromeGlyph /> 免费安装到 Chrome
          </a>
        </div>
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
          <a href="/" className="hover:text-zinc-900">首页</a>
          <a href="/guides" className="hover:text-zinc-900">指南</a>
          <a href="/privacy" className="hover:text-zinc-900">隐私政策</a>
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
