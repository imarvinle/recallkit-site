import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { setSeo } from '../lib/seo';

const STORE_URL =
  'https://chromewebstore.google.com/detail/bannmklgebikoonanccnaalpfbibnlia';

type LinkItem = {
  label: string;
  href: string;
  desc: string;
};

type SectionItem = {
  title: string;
  body: ReactNode;
};

type PageConfig = {
  eyebrow: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  path: string;
  tldr: string[];
  sections: SectionItem[];
  faq: { q: string; a: string }[];
  related: LinkItem[];
};

const pages = {
  backup: {
    eyebrow: 'ChatGPT Backup · 聊天记录备份',
    title: 'ChatGPT 聊天记录备份，把每一次对话保存到本地。',
    description:
      'KeepChat AI 在你使用 ChatGPT 时自动保存会话、消息、代码和图片，让重要聊天记录不再依赖网页历史，也不需要手动复制粘贴。',
    seoTitle: 'ChatGPT 聊天记录备份工具 | 自动保存会话到本地 - KeepChat AI',
    seoDescription:
      'KeepChat AI 自动备份 ChatGPT 聊天记录和历史会话，支持本地保存、全文搜索、批量导出 Markdown / JSON / ZIP，全程不上传服务器。',
    path: '/chatgpt-backup',
    tldr: [
      '打开 ChatGPT 后自动保存新会话',
      '聊天记录保存在浏览器本地 IndexedDB',
      '支持历史会话补备份和新消息实时追加',
      '备份后可搜索、阅读、导出和迁移',
    ],
    sections: [
      {
        title: '为什么需要 ChatGPT 聊天记录备份',
        body: (
          <>
            <p>
              ChatGPT 的对话往往不只是闲聊：里面可能有写作草稿、代码方案、客户分析、学习笔记和长期 prompt。
              如果只依赖网页侧边栏，遇到账号异常、浏览器数据清理、误删对话或跨设备迁移时，聊天记录很容易变得不可控。
            </p>
            <p>
              KeepChat AI 的定位很简单：
              <strong className="text-zinc-900">把 ChatGPT 会话备份变成一个后台自动发生的动作</strong>
              。你继续正常聊天，扩展在本地保存对话内容，并在后续提供搜索、归档和导出能力。
            </p>
          </>
        ),
      },
      {
        title: '自动备份如何工作',
        body: (
          <>
            <p>
              安装扩展后，KeepChat AI 会在 chatgpt.com 页面中监听会话变化。检测到新消息稳定后，
              会把对应的 ChatGPT 对话写入浏览器本地数据库；旧会话也可以通过侧栏触发补充备份。
            </p>
            <ul className="list-disc space-y-1.5 pl-6">
              <li>新消息自动追加，不需要手动复制</li>
              <li>历史记录可批量补备份，适合第一次整理账号</li>
              <li>多账号和 ChatGPT Projects 会自动分组，减少混乱</li>
              <li>会话、标题、代码块和图片记录都能保留在本地档案中</li>
            </ul>
          </>
        ),
      },
      {
        title: '本地备份比云端同步更适合隐私型聊天记录',
        body: (
          <>
            <p>
              很多人搜索 ChatGPT 本地备份，是因为聊天记录里包含了隐私、工作材料或尚未公开的想法。
              KeepChat AI 不做账号系统，也不会把你的 ChatGPT 聊天内容上传到第三方服务器。
            </p>
            <p>
              所有归档数据保存在浏览器本地存储中。换电脑时，可以通过导出 ZIP 的方式迁移，而不是把长期会话交给另一个云服务保存。
            </p>
          </>
        ),
      },
      {
        title: '备份之后可以做什么',
        body: (
          <ul className="list-disc space-y-1.5 pl-6">
            <li>用全文搜索找回某个 prompt、函数名、论点或客户名称</li>
            <li>在网页阅读器里按 ChatGPT 风格重新阅读归档会话</li>
            <li>把单条或多条聊天记录导出为 Markdown、JSON 或 ZIP</li>
            <li>把长期对话整理进 Obsidian、Notion、Git 仓库或个人知识库</li>
          </ul>
        ),
      },
    ],
    faq: [
      {
        q: 'KeepChat AI 会自动备份所有 ChatGPT 聊天记录吗？',
        a: '它会在你打开 ChatGPT 网页并授权扩展运行时保存可读取的会话。已有历史会话可以手动触发补备份，新消息会自动追加。',
      },
      {
        q: '备份的 ChatGPT 会话保存在哪里？',
        a: '保存在浏览器本地 IndexedDB 中，不上传 KeepChat AI 服务器，也不做云同步。',
      },
      {
        q: '免费版 ChatGPT 可以备份吗？',
        a: '可以。KeepChat AI 面向 ChatGPT Free、Plus、Pro 以及常见 Chromium 浏览器环境使用。',
      },
    ],
    related: [
      { label: '聊天记录导出', href: '/chatgpt-export', desc: '把备份后的会话导出为 Markdown / JSON / ZIP。' },
      { label: '本地会话归档', href: '/chatgpt-archive', desc: '用全文搜索和阅读视图管理长期历史记录。' },
      { label: '安装教程', href: '/install', desc: '一分钟安装到 Chrome、Edge、Brave 或 Arc。' },
      { label: '隐私政策', href: '/privacy', desc: '了解为什么聊天内容不会离开你的电脑。' },
    ],
  },
  export: {
    eyebrow: 'ChatGPT Export · 聊天记录导出',
    title: 'ChatGPT 聊天记录导出，Markdown / JSON / ZIP 都能带走。',
    description:
      '把 ChatGPT 对话从网页历史里解放出来：单条导出、批量打包、迁移到新电脑，或整理进你的个人知识库。',
    seoTitle: 'ChatGPT 聊天记录导出：Markdown / JSON / ZIP 批量导出 - KeepChat AI',
    seoDescription:
      '使用 KeepChat AI 导出 ChatGPT 聊天记录，支持 Markdown、归档 JSON、GPT 原生 JSON 和 ZIP 批量打包，适合备份、迁移和知识库整理。',
    path: '/chatgpt-export',
    tldr: [
      '支持单条会话和批量聊天记录导出',
      'Markdown 适合阅读、写作和知识库',
      'JSON 适合迁移、归档和二次处理',
      'ZIP 打包适合换电脑和长期备份',
    ],
    sections: [
      {
        title: '什么时候需要导出 ChatGPT 聊天记录',
        body: (
          <>
            <p>
              当一段 ChatGPT 对话从临时问答变成可复用资产时，就值得导出：比如一套 prompt 模板、
              一次完整的代码排错记录、一篇文章的推演过程，或一个客户项目的分析上下文。
            </p>
            <p>
              KeepChat AI 把聊天记录导出放在备份之后完成。先把会话稳定保存到本地，再按需要选择 Markdown、JSON 或 ZIP。
            </p>
          </>
        ),
      },
      {
        title: 'Markdown、JSON 和 ZIP 怎么选',
        body: (
          <div className="overflow-hidden rounded-xl border border-zinc-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-zinc-50 text-zinc-900">
                <tr>
                  <th className="border-b border-zinc-200 px-4 py-3">格式</th>
                  <th className="border-b border-zinc-200 px-4 py-3">适合场景</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600">
                <tr>
                  <td className="border-b border-zinc-100 px-4 py-3 font-medium text-zinc-900">Markdown</td>
                  <td className="border-b border-zinc-100 px-4 py-3">阅读、写作整理、Obsidian / Notion / Git 仓库归档</td>
                </tr>
                <tr>
                  <td className="border-b border-zinc-100 px-4 py-3 font-medium text-zinc-900">归档 JSON</td>
                  <td className="border-b border-zinc-100 px-4 py-3">长期保存、再次导入、跨设备迁移</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-zinc-900">GPT 原生 JSON</td>
                  <td className="px-4 py-3">兼容官方结构、二次处理、脚本分析和数据转换</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        title: '批量导出适合换电脑和长期备份',
        body: (
          <>
            <p>
              如果你要迁移设备，最稳的做法是先备份所有重要 ChatGPT 会话，再批量导出 ZIP。
              新电脑安装 KeepChat AI 后，可以把这些历史记录重新导入本地档案。
            </p>
            <p>
              对内容创作者、开发者和研究者来说，批量导出也适合做阶段性快照：每周或每月保存一次，
              让 ChatGPT 历史记录变成可管理、可迁移、可检索的资产。
            </p>
          </>
        ),
      },
      {
        title: '和官方数据导出的区别',
        body: (
          <p>
            ChatGPT 官方导出更像账号级数据请求，适合一次性取回完整数据。KeepChat AI 更偏日常工作流：
            你可以在本地实时备份会话，按单条、项目或批量选择导出格式，适合频繁整理聊天记录的人。
          </p>
        ),
      },
    ],
    faq: [
      {
        q: '可以把 ChatGPT 导出成 Markdown 吗？',
        a: '可以。KeepChat AI 支持把已备份的 ChatGPT 对话导出为 Markdown，适合放进 Obsidian、Notion 或代码仓库。',
      },
      {
        q: '可以批量导出所有聊天记录吗？',
        a: '可以。你可以选择多条会话并打包为 ZIP，用于迁移、离线备份或长期归档。',
      },
      {
        q: '导出的 JSON 能再次导入吗？',
        a: '归档 JSON 面向 KeepChat AI 的长期迁移和恢复场景设计，适合在新设备上导入。',
      },
    ],
    related: [
      { label: '自动备份', href: '/chatgpt-backup', desc: '先把 ChatGPT 会话稳定保存到本地。' },
      { label: '官方导出对比', href: '/guides/chatgpt-official-export-vs-keepchat', desc: '了解官方导出和实时备份的差异。' },
      { label: '本地归档', href: '/chatgpt-archive', desc: '导出前先用搜索和阅读视图整理会话。' },
      { label: '安装教程', href: '/install', desc: '安装扩展后开始导出聊天记录。' },
    ],
  },
  archive: {
    eyebrow: 'ChatGPT Archive · 会话归档',
    title: 'ChatGPT 会话归档与全文搜索，让历史记录重新可用。',
    description:
      '把散落在 ChatGPT 侧边栏里的历史对话整理成本地档案，按账号、项目、标题和正文搜索，随时找回关键内容。',
    seoTitle: 'ChatGPT 会话归档与全文搜索 | 本地管理历史记录 - KeepChat AI',
    seoDescription:
      'KeepChat AI 帮你本地归档 ChatGPT 会话，支持聊天记录备份、全文搜索、Projects 分组、阅读视图和多格式导出。',
    path: '/chatgpt-archive',
    tldr: [
      '把 ChatGPT 历史记录变成本地档案',
      '标题、正文和代码块都能全文搜索',
      '支持多账号和 Projects 分组',
      '归档后可阅读、导出、迁移和清理',
    ],
    sections: [
      {
        title: '为什么 ChatGPT 历史记录需要归档',
        body: (
          <>
            <p>
              ChatGPT 侧边栏适合继续最近的对话，却不适合管理几百条历史记录。标题相似、项目混杂、
              旧内容难找，是很多重度用户共同遇到的问题。
            </p>
            <p>
              KeepChat AI 的会话归档把聊天记录从“网页历史”变成“本地资料库”：
              你可以按关键词搜索正文、代码块和标题，也可以在更宽的阅读视图里复盘完整上下文。
            </p>
          </>
        ),
      },
      {
        title: '全文搜索覆盖哪些内容',
        body: (
          <ul className="list-disc space-y-1.5 pl-6">
            <li>ChatGPT 会话标题和用户问题</li>
            <li>助手回答正文、代码块、表格和列表</li>
            <li>prompt 模板、变量名、函数名和项目关键词</li>
            <li>多账号、多项目下的长期历史记录</li>
          </ul>
        ),
      },
      {
        title: '适合哪些长期使用场景',
        body: (
          <>
            <p>
              对开发者来说，归档可以保存调试过程和代码方案；对内容创作者来说，可以保存选题、初稿和结构推演；
              对咨询、研究和学习场景来说，归档能保留长期思路链路，方便后续引用。
            </p>
            <p>
              这些聊天记录未必每天都会打开，但一旦需要找回，全文搜索比手动翻 ChatGPT 侧边栏可靠得多。
            </p>
          </>
        ),
      },
      {
        title: '归档不是锁死数据',
        body: (
          <p>
            本地归档的价值在于可控。你可以继续在 KeepChat AI 阅读，也可以把会话导出为 Markdown、JSON 或 ZIP，
            迁移到自己的知识库、文件夹或新设备。
          </p>
        ),
      },
    ],
    faq: [
      {
        q: 'ChatGPT 会话归档和备份有什么区别？',
        a: '备份解决“保存下来”，归档解决“长期管理”。KeepChat AI 会先把聊天记录保存到本地，再提供搜索、阅读、分组和导出。',
      },
      {
        q: '可以搜索 ChatGPT 历史记录里的代码吗？',
        a: '可以。标题、正文和代码块都在全文搜索范围内，适合找回函数名、报错信息和 prompt 模板。',
      },
      {
        q: '本地归档会上传到云端吗？',
        a: '不会。归档数据保存在浏览器本地，除非你主动导出文件，否则不会离开你的设备。',
      },
    ],
    related: [
      { label: '自动备份', href: '/chatgpt-backup', desc: '先把聊天记录保存到本地档案。' },
      { label: '聊天记录导出', href: '/chatgpt-export', desc: '把归档会话导出为 Markdown / JSON / ZIP。' },
      { label: '我的归档', href: '/library', desc: '打开本地阅读器查看已备份会话。' },
      { label: '隐私政策', href: '/privacy', desc: '了解本地保存和数据边界。' },
    ],
  },
  guide: {
    eyebrow: 'Guide · 官方导出对比',
    title: 'ChatGPT 官方导出 vs 实时备份：哪种更适合保存聊天记录？',
    description:
      '官方导出适合账号级数据请求，实时备份适合日常保存、搜索、导出和迁移。两种方式可以互补，但解决的问题不一样。',
    seoTitle: 'ChatGPT 官方导出 vs 实时备份：保存聊天记录怎么选？- KeepChat AI',
    seoDescription:
      '对比 ChatGPT 官方导出和 KeepChat AI 实时备份：导出速度、格式、隐私、本地搜索、Markdown / JSON / ZIP 迁移场景有什么区别。',
    path: '/guides/chatgpt-official-export-vs-keepchat',
    tldr: [
      '官方导出适合一次性账号数据备份',
      '实时备份适合每天保存新会话',
      'KeepChat AI 支持本地搜索和按需导出',
      '两者可以互补，不是非此即彼',
    ],
    sections: [
      {
        title: 'ChatGPT 官方导出解决什么问题',
        body: (
          <>
            <p>
              ChatGPT 官方导出是账号级数据请求，适合在需要完整留存账号数据时使用。它通常包含聊天历史和其他账号相关数据，
              更像一次完整数据包，而不是日常工作流里的会话管理工具。
            </p>
            <p>
              如果你的目标是偶尔做一次完整备份，官方导出很合适；如果你的目标是每天自动保存新对话、随时搜索和按格式导出，
              就需要实时备份和本地归档工具配合。
            </p>
          </>
        ),
      },
      {
        title: '实时备份解决什么问题',
        body: (
          <ul className="list-disc space-y-1.5 pl-6">
            <li>新 ChatGPT 会话生成后自动进入本地档案</li>
            <li>重要对话可以随时搜索和复盘，不用等待导出邮件</li>
            <li>支持 Markdown、JSON、ZIP 等更适合知识库和迁移的格式</li>
            <li>数据保存在本机浏览器里，适合隐私敏感的长期记录</li>
          </ul>
        ),
      },
      {
        title: '两种方式的差异',
        body: (
          <div className="overflow-hidden rounded-xl border border-zinc-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-zinc-50 text-zinc-900">
                <tr>
                  <th className="border-b border-zinc-200 px-4 py-3">维度</th>
                  <th className="border-b border-zinc-200 px-4 py-3">官方导出</th>
                  <th className="border-b border-zinc-200 px-4 py-3">KeepChat AI</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600">
                <tr>
                  <td className="border-b border-zinc-100 px-4 py-3 font-medium text-zinc-900">触发方式</td>
                  <td className="border-b border-zinc-100 px-4 py-3">手动请求数据导出</td>
                  <td className="border-b border-zinc-100 px-4 py-3">聊天时自动备份，也可手动补备份</td>
                </tr>
                <tr>
                  <td className="border-b border-zinc-100 px-4 py-3 font-medium text-zinc-900">使用频率</td>
                  <td className="border-b border-zinc-100 px-4 py-3">偶尔做完整备份</td>
                  <td className="border-b border-zinc-100 px-4 py-3">日常保存、搜索和整理</td>
                </tr>
                <tr>
                  <td className="border-b border-zinc-100 px-4 py-3 font-medium text-zinc-900">格式</td>
                  <td className="border-b border-zinc-100 px-4 py-3">官方数据包</td>
                  <td className="border-b border-zinc-100 px-4 py-3">Markdown / JSON / ZIP</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-zinc-900">检索</td>
                  <td className="px-4 py-3">下载后自行处理</td>
                  <td className="px-4 py-3">本地全文搜索和阅读视图</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        title: '建议怎么选',
        body: (
          <p>
            如果你只是想偶尔取回账号数据，可以使用 ChatGPT 官方导出。如果你把 ChatGPT 当作长期工作区，
            需要保存 prompt、代码、草稿和项目上下文，建议使用 KeepChat AI 做实时备份，再按需要导出 Markdown、JSON 或 ZIP。
          </p>
        ),
      },
    ],
    faq: [
      {
        q: '用了 KeepChat AI 还需要官方导出吗？',
        a: '两者可以互补。官方导出适合账号级完整数据请求，KeepChat AI 适合日常实时备份、搜索和按会话导出。',
      },
      {
        q: '官方导出的聊天记录可以替代本地备份吗？',
        a: '如果你只需要偶尔保存一次，可以。但如果你经常需要搜索、整理、迁移和导出单条会话，本地实时备份会更顺手。',
      },
      {
        q: 'KeepChat AI 会影响 ChatGPT 官方数据吗？',
        a: '不会。它只是读取你浏览器里可见的会话并保存到本地，不修改 ChatGPT 官方数据。',
      },
    ],
    related: [
      { label: '聊天记录导出', href: '/chatgpt-export', desc: '了解 Markdown / JSON / ZIP 导出工作流。' },
      { label: '自动备份', href: '/chatgpt-backup', desc: '每天聊天时自动保存新会话。' },
      { label: '本地归档', href: '/chatgpt-archive', desc: '把历史记录变成可搜索档案。' },
    ],
  },
} satisfies Record<string, PageConfig>;

export function ChatGptBackupPage() {
  return <SeoLanding config={pages.backup} />;
}

export function ChatGptExportPage() {
  return <SeoLanding config={pages.export} />;
}

export function ChatGptArchivePage() {
  return <SeoLanding config={pages.archive} />;
}

export function OfficialExportGuidePage() {
  return <SeoLanding config={pages.guide} />;
}

function SeoLanding({ config }: { config: PageConfig }) {
  useEffect(() => {
    setSeo({
      title: config.seoTitle,
      description: config.seoDescription,
      path: config.path,
    });
  }, [config]);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Navbar />
      <Hero config={config} />
      <Tldr lines={config.tldr} />
      <article className="mx-auto max-w-3xl px-6 pb-24 leading-relaxed text-[15.5px] text-zinc-700">
        {config.sections.map((section) => (
          <Section key={section.title} title={section.title}>
            {section.body}
          </Section>
        ))}
        <Section title="常见问题">
          <Faq items={config.faq} />
        </Section>
        <RelatedLinks items={config.related} />
      </article>
      <Cta />
      <Footer />
    </main>
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
          <a href="/chatgpt-backup" className="hover:text-zinc-900">聊天备份</a>
          <a href="/chatgpt-export" className="hover:text-zinc-900">记录导出</a>
          <a href="/chatgpt-archive" className="hover:text-zinc-900">本地归档</a>
          <a href="/install" className="hover:text-zinc-900">安装</a>
        </nav>
        <a href={STORE_URL} target="_blank" rel="noreferrer" className="btn-primary !px-4 !py-2 text-[13px]">
          免费安装
        </a>
      </div>
    </header>
  );
}

function Hero({ config }: { config: PageConfig }) {
  return (
    <section className="border-b border-zinc-100 bg-zinc-50 py-16">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-sage-deep">
          {config.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          {config.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600">
          {config.description}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={STORE_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <ChromeGlyph /> 免费安装到 Chrome
          </a>
          <a href="/install" className="btn-outline">
            查看安装教程
          </a>
        </div>
      </div>
    </section>
  );
}

function Tldr({ lines }: { lines: string[] }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="font-display text-2xl font-semibold tracking-tight">简短版 / TL;DR</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {lines.map((line) => (
          <li
            key={line}
            className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4"
          >
            <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-deep text-xs text-white">
              ✓
            </span>
            <span className="leading-relaxed text-zinc-700">{line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="font-display text-xl font-semibold tracking-tight text-zinc-900">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
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

function RelatedLinks({ items }: { items: LinkItem[] }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-xl font-semibold tracking-tight text-zinc-900">相关页面</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-sage/60 hover:bg-zinc-50"
          >
            <span className="font-medium text-zinc-900">{item.label}</span>
            <span className="mt-2 block text-sm leading-relaxed text-zinc-600">{item.desc}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="border-t border-zinc-100 py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          从下一条 ChatGPT 对话开始备份。
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-zinc-600">
          安装 KeepChat AI 后，聊天记录会自动进入本地档案，之后再搜索、导出和迁移。
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
          <a href="/degraded" className="hover:text-zinc-900">降智检测</a>
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
