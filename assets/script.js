/* AgentZ site — interactions: theme toggle, tabs, nav active, i18n, Z宝 floating assistant */
(function () {
  const THEME_KEY = 'agentz-theme';
  const LANG_KEY = 'agentz-lang';
  const DEFAULT_LANG = 'zh';
  const SUPPORTED_LANGS = ['zh', 'en', 'th'];
  const LANG_META = {
    zh: { flag: '🇨🇳', label: '中文', short: '中' },
    en: { flag: '🇬🇧', label: 'English', short: 'EN' },
    th: { flag: '🇹🇭', label: 'ไทย', short: 'TH' },
  };

  /* ------------------------------------------------------------------
   * i18n dictionary — covers nav/footer, hero of every page, and the
   * substantive sections of the homepage. Other in-page sections still
   * fall back to the original Chinese until a key is added.
   * ------------------------------------------------------------------ */
  const I18N = {
    zh: {
      /* ---------- nav / footer / generic CTA ---------- */
      'nav.features': '产品功能',
      'nav.solutions': '解决方案',
      'nav.handbook': '使用手册',
      'nav.service': '服务与价格',
      'nav.developers': '开发者',
      'nav.security': '安全',
      'nav.contact': '联系我们',
      'nav.download': '下载 Agent Z',
      'nav.download.mac': 'macOS（Apple 芯片）',
      'nav.download.mac.desc': 'M1 / M2 / M3 / M4 系列',
      'nav.download.win': 'Windows',
      'nav.download.win.desc': 'Windows 10 / 11（64 位）',
      'nav.download.mac-intel': 'macOS（Intel 芯片）',
      'nav.download.mac-intel.desc': '2020 年前的 Mac 设备',
      'nav.download.recommended': '推荐',
      'nav.cta': '免费试用',
      'footer.tagline': '为每个岗位部署一位领域专家级 AI 助手。',
      'footer.product': '产品',
      'footer.resources': '资源',
      'footer.company': '公司',
      'footer.legal': '法律',
      'footer.pricing': '价格',
      'footer.api': 'API 平台',
      'footer.changelog': '更新日志',
      'footer.contact': '联系我们',
      'footer.partner': '合作伙伴',
      'footer.careers': '加入我们',
      'footer.terms': '服务条款',
      'footer.privacy': '隐私政策',
      'footer.cookie': 'Cookie 政策',
      'footer.copyright': '© 2026 AgentZ. 保留所有权利。',
      'footer.icp': '浙ICP备 0000000 号',

      /* ---------- index hero ---------- */
      'idx.hero.eyebrow': 'Enterprise AI Agent Platform',
      'idx.hero.h1':
        '把每一个岗位<br/>交给一位 <span style="color:var(--az-brand)">专注的 AI 助手</span>',
      'idx.hero.lead':
        'AgentZ 让你为「出库分析」「日报撰写」「合同审核」分别配置专属助手。每个助手都会用工具、记得上下文、能按计划自主完成多步任务 —— 像一位真正的同事，而不是又一个聊天机器人。',
      'idx.hero.cta1': '免费开始 →',
      'idx.hero.cta2': '查看使用手册',
      'idx.hero.meta1': '5 分钟创建首个助手',
      'idx.hero.meta2': '支持私有化部署',
      'idx.hero.meta3': 'MCP 工具生态',

      /* ---------- logos ---------- */
      'idx.logos.label': '已被这些团队用于关键业务',

      /* ---------- core capability ---------- */
      'idx.core.eyebrow': '核心能力',
      'idx.core.h2': '四块拼图，组成一支「永远在岗」的 AI 团队',
      'idx.core.lead':
        'AgentZ 把通用 LLM 收敛为可被信赖的岗位能力 —— 不是更聪明的对话，而是真正能交付结果的执行体。',
      'idx.core.c1.h': 'AI 助手',
      'idx.core.c1.p':
        '为每个业务岗位配置专属助手，三段式 Prompt（角色 / 工作指令 / 上下文）让它「像那个岗位的人」一样思考。',
      'idx.core.c2.h': '技能体系 Skills',
      'idx.core.c2.p':
        '内置 xlsx / docx / pptx / pdf / 数据分析等专业技能，每个助手可按需挂载；支持团队自建技能库。',
      'idx.core.c3.h': '外部工具 (MCP)',
      'idx.core.c3.p':
        '遵循 MCP 协议接入 ERP / CRM / BI / 内部 API；助手可"调用真实业务工具"而不是仅做文本生成。',
      'idx.core.c4.h': '定时任务',
      'idx.core.c4.p':
        '把例行工作交给助手按计划自动执行 —— 每日 7:30 自动出晨报，异常数据自动推送钉钉。',

      /* ---------- value split 1 / 2 / 3 ---------- */
      'idx.s1.eyebrow': 'One Domain · One Assistant',
      'idx.s1.h2': '不再追求"全能"，每个助手只做精一件事',
      'idx.s1.lead':
        '通用大模型在专业场景常常"什么都会一点，什么都不靠谱"。AgentZ 鼓励为「日报」「异常单」「合同审核」分别建立独立助手 —— 上下文更聚焦、Prompt 更稳定、效果更可预测。',
      'idx.s1.li1': '三段式 Prompt 模板（角色 / 工作指令 / 用户上下文）',
      'idx.s1.li2': '可挂载头像与个性，方便团队识别',
      'idx.s1.li3': '上下文隔离，避免任务串味',
      'idx.s2.eyebrow': 'Tool-Native',
      'idx.s2.h2': '"说一句" 背后，是真实的工具调用链',
      'idx.s2.lead':
        'AgentZ 助手不是文本生成器，是任务执行体。它会自动规划步骤、调用 MCP 工具、读写文件、再把结构化结果交给你 —— 全程可追溯、可中断、可重放。',
      'idx.s2.li1': '完整的 ReAct 推理链可展开',
      'idx.s2.li2': '任务监视器实时看进度 / 中途接管',
      'idx.s2.li3': '每一步工具调用都有审计日志',
      'idx.s3.eyebrow': 'Always-On',
      'idx.s3.h2': '不只是"问答"，更是 7×24 的自动化伙伴',
      'idx.s3.lead':
        '把例行工作交给定时任务 —— AgentZ 会按计划自动执行、把结果推到 IM、出现异常时主动 @ 你。它让团队真正实现"事找人"而不是"人找事"。',
      'idx.s3.link': '了解定时任务能力 →',

      /* ---------- scenarios ---------- */
      'idx.sc.eyebrow': '行业场景',
      'idx.sc.h2': '为不同业务岗位，预置开箱即用的助手模板',
      'idx.sc.t1': '供应链物流',
      'idx.sc.t2': '电商运营',
      'idx.sc.t3': '数据分析',
      'idx.sc.t4': '客户成功',
      'idx.sc.t1.c1.h': '出库异常单分析师',
      'idx.sc.t1.c1.p': '每 15 分钟扫一次 WMS 异常表，自动归因 + 推送对应仓主管。',
      'idx.sc.t1.c2.h': '运力调度助手',
      'idx.sc.t1.c2.p': '基于历史发运量预测明日运力缺口，自动建议派车方案。',
      'idx.sc.t1.c3.h': '日报助手',
      'idx.sc.t1.c3.p': '每天 07:30 自动生成华南/华东/华北仓 KPI 速览 PPT。',
      'idx.sc.t2.c1.h': '商品上架助手',
      'idx.sc.t2.c1.p': '从供应商表自动生成标题/详情/主图标签，1 人即可维护 1000 SKU。',
      'idx.sc.t2.c2.h': '竞品监控员',
      'idx.sc.t2.c2.p': '每日抓取 TOP 竞品价格 / 销量 / 评论，输出周维度变化分析。',
      'idx.sc.t2.c3.h': '大促复盘助手',
      'idx.sc.t2.c3.p': '活动结束 24 小时内自动产出多维度复盘报告。',
      'idx.sc.t3.c1.h': 'SQL 取数助手',
      'idx.sc.t3.c1.p': '用自然语言描述需求，自动写 SQL、跑数、做图表，并解释结论。',
      'idx.sc.t3.c2.h': 'A/B 实验解读员',
      'idx.sc.t3.c2.p': '接入实验平台，自动判定显著性并给业务建议。',
      'idx.sc.t3.c3.h': '看板巡检助手',
      'idx.sc.t3.c3.p': '每日巡检核心北极星指标，下降即推送归因分析。',
      'idx.sc.t4.c1.h': '客户健康度分析',
      'idx.sc.t4.c1.p': '合并用量 / 工单 / 续约信号，自动标红高风险账户。',
      'idx.sc.t4.c2.h': '续约准备包',
      'idx.sc.t4.c2.p': '续约前 30 天自动生成客户价值复盘 + 续约脚本。',
      'idx.sc.t4.c3.h': '工单分类员',
      'idx.sc.t4.c3.p': '自动给工单打标签、判优先级、起草初版回复。',
      'idx.sc.more': '查看完整解决方案 →',

      /* ---------- customer cases ---------- */
      'idx.cs.eyebrow': '客户成果',
      'idx.cs.h2': '从「天」到「分钟」的真实效率改写',
      'idx.cs.c1.h': '1000 SKU 自动上架',
      'idx.cs.c1.p':
        '由 6 人团队 → 1 人 + AgentZ，人效提升 <strong style="color:var(--az-text);">5×</strong>。',
      'idx.cs.c2.h': '异常单识别',
      'idx.cs.c2.p':
        '从次日复盘 → 实时识别，平均处置时长 <strong style="color:var(--az-text);">24h → 15min</strong>。',
      'idx.cs.c3.h': '每日晨报',
      'idx.cs.c3.p':
        '分析师每天 1 小时手工拼报 → AgentZ 7:30 自动推送，<strong style="color:var(--az-text);">100% 准时率</strong>。',
      'idx.cs.c4.h': '续约准备包',
      'idx.cs.c4.p':
        '单客户准备时间 <strong style="color:var(--az-text);">2 天 → 20 分钟</strong>，续约率提升 12%。',

      /* ---------- stats ---------- */
      'idx.st.1': '企业内活跃助手',
      'idx.st.2': '官方/社区技能',
      'idx.st.3': '服务可用性 SLA',
      'idx.st.4': '数据合规驻地',

      /* ---------- bottom CTA ---------- */
      'idx.cta.h2': '5 分钟，配置你的第一位 AI 同事',
      'idx.cta.p': '免费试用 30 天，包含 5 个助手席位、全部官方技能与 5,000 Credits。',
      'idx.cta.btn2': '阅读使用手册',

      /* ---------- features page ---------- */
      'feat.hero.eyebrow': 'Product',
      'feat.hero.h1': '一套完整的 AI Agent 工作台',
      'feat.hero.lead':
        '从「定义助手」到「调用工具」、从「人工对话」到「自动执行」，AgentZ 把企业落地 AI Agent 所需的每一块能力都准备好了。',
      'feat.nav.c1': 'AI 助手',
      'feat.nav.c1d': '领域专精的助手创建与管理',
      'feat.nav.c2': '技能体系',
      'feat.nav.c2d': '官方 + 自建技能 + 社区市场',
      'feat.nav.c3': '外部工具 MCP',
      'feat.nav.c3d': '连接 ERP / CRM / 内部 API',
      'feat.nav.c4': '定时任务',
      'feat.nav.c4d': '7×24 自动执行 + 主动推送',
      'feat.nav.c5': '智能体空间',
      'feat.nav.c5d': '统一观测、审计与治理',
      'feat.nav.c6': '桌面端能力',
      'feat.nav.c6d': '本地文件、浏览器自动化',

      /* ---------- solutions page ---------- */
      'sol.hero.eyebrow': 'Solutions',
      'sol.hero.h1': '为每个行业，预置开箱即用的 Agent 矩阵',
      'sol.hero.lead':
        '从供应链一线到客户成功一线，我们把 AgentZ 落地的最佳实践打包成行业解决方案。',

      /* ---------- handbook page ---------- */
      'hb.hero.eyebrow': 'Handbook',
      'hb.hero.h1': 'AgentZ 使用手册',
      'hb.hero.lead':
        '面向产品负责人、运营和开发者的端到端文档：从 5 分钟创建第一个助手，到生产级 MCP 集成与安全治理。',

      /* ---------- service page ---------- */
      'srv.hero.eyebrow': 'Service & Pricing',
      'srv.hero.h1': '从售前到售后，专属团队陪你跑完最后一公里',
      'srv.hero.lead': '我们相信，AI Agent 的成功不是"卖一个产品"，而是"陪客户跑通一个业务"。',

      /* ---------- developers page ---------- */
      'dev.hero.eyebrow': 'Developers',
      'dev.hero.h1': '把 AgentZ 接进你的系统里',
      'dev.hero.lead':
        'AgentZ 不仅是一款产品，更是一套可编程的 Agent 基础设施。开放的 API、SDK、Skill 协议与 MCP，让开发者可以自由扩展。',
      'dev.hero.cta1': '查看 API',
      'dev.hero.cta2': 'SDK 下载',

      /* ---------- security page ---------- */
      'sec.hero.eyebrow': 'Security & Trust',
      'sec.hero.h1': '透明、可控、可审计 — Agent 时代的企业级安全底座',
      'sec.hero.lead': 'AgentZ 把"安全"嵌进每一次工具调用、每一份数据流转、每一段对话上下文。',

      /* ---------- contact page ---------- */
      'con.hero.eyebrow': 'Contact',
      'con.hero.h1': '告诉我们你的业务场景',
      'con.hero.lead':
        '无论你是想做 POC 验证、私有化部署、还是只是想聊聊想法，我们的方案架构师会在 1 个工作日内回应。',

      /* ---------- legal page ---------- */
      'leg.hero.h1': '服务条款',

      /* ---------- Z宝 ---------- */
      'zbao.title': 'Z宝',
      'zbao.subtitle': 'AgentZ 智能答疑助手',
      'zbao.welcome': '嗨，我是 Z宝 👋 你可以问我 AgentZ 的功能、价格、部署、集成等问题。',
      'zbao.placeholder': '请输入你的问题…',
      'zbao.send': '发送',
      'zbao.close': '关闭',
      'zbao.tip': '试试常见问题：',
      'zbao.chip1': '如何创建一个助手？',
      'zbao.chip2': 'AgentZ 怎么收费？',
      'zbao.chip3': '支持私有化部署吗？',
      'zbao.chip4': '如何对接 ERP / MCP？',
      'zbao.answer.create':
        '在 AgentZ 控制台点击「新建助手」，按向导设置 **场景、知识库、工具与权限**，3 分钟即可上线。详细步骤见 [使用手册](handbook.html)。',
      'zbao.answer.pricing':
        'AgentZ 提供 **免费试用 / 团队版 / 企业版**，按助手数与调用量阶梯计费。具体可在 [服务与价格](service.html) 查看或直接 [联系销售](contact.html)。',
      'zbao.answer.deploy':
        '支持 **SaaS、专属云、私有化** 三种部署形态，企业版可独立部署在你的 VPC，模型与数据均在域内。详见 [安全](security.html)。',
      'zbao.answer.erp':
        'AgentZ 通过 **MCP 协议 + 自定义工具** 对接 ERP、CRM、内部 API。在 [开发者](developers.html) 页可查看连接器与代码示例。',
      'zbao.answer.fallback':
        '这个问题我还在学习中，建议你查阅 [使用手册](handbook.html) 或 [联系我们](contact.html) 获得人工支持。',
    },

    en: {
      'nav.features': 'Features',
      'nav.solutions': 'Solutions',
      'nav.handbook': 'Handbook',
      'nav.service': 'Service & Pricing',
      'nav.developers': 'Developers',
      'nav.security': 'Security',
      'nav.contact': 'Contact',
      'nav.download': 'Download Agent Z',
      'nav.download.mac': 'macOS (Apple Silicon)',
      'nav.download.mac.desc': 'M1 / M2 / M3 / M4 series',
      'nav.download.win': 'Windows',
      'nav.download.win.desc': 'Windows 10 / 11 (64-bit)',
      'nav.download.mac-intel': 'macOS (Intel)',
      'nav.download.mac-intel.desc': 'Pre-2020 Mac devices',
      'nav.download.recommended': 'Recommended',
      'nav.cta': 'Free Trial',
      'footer.tagline': 'Deploy a domain-expert AI assistant for every role on your team.',
      'footer.product': 'Product',
      'footer.resources': 'Resources',
      'footer.company': 'Company',
      'footer.legal': 'Legal',
      'footer.pricing': 'Pricing',
      'footer.api': 'API Platform',
      'footer.changelog': 'Changelog',
      'footer.contact': 'Contact us',
      'footer.partner': 'Partners',
      'footer.careers': 'Careers',
      'footer.terms': 'Terms of Service',
      'footer.privacy': 'Privacy Policy',
      'footer.cookie': 'Cookie Policy',
      'footer.copyright': '© 2026 AgentZ. All rights reserved.',
      'footer.icp': 'ICP License No. 0000000',

      'idx.hero.eyebrow': 'Enterprise AI Agent Platform',
      'idx.hero.h1':
        'Hand every role to<br/>a <span style="color:var(--az-brand)">focused AI specialist</span>',
      'idx.hero.lead':
        'AgentZ lets you build a dedicated assistant for each task — outbound analysis, daily reports, contract review. Each one uses real tools, remembers context, and runs multi-step jobs on schedule — like a real coworker, not just another chatbot.',
      'idx.hero.cta1': 'Start Free →',
      'idx.hero.cta2': 'Read the Handbook',
      'idx.hero.meta1': 'First assistant live in 5 min',
      'idx.hero.meta2': 'On-prem deployment supported',
      'idx.hero.meta3': 'MCP tool ecosystem',

      'idx.logos.label': 'Trusted by these teams for mission-critical work',

      'idx.core.eyebrow': 'Core Capabilities',
      'idx.core.h2': 'Four building blocks for an always-on AI team',
      'idx.core.lead':
        'AgentZ turns a generic LLM into trustworthy role-level capabilities — not smarter chat, but an execution engine that actually delivers.',
      'idx.core.c1.h': 'AI Assistants',
      'idx.core.c1.p':
        'A dedicated assistant per role. A three-part prompt (role / instructions / context) makes it think like the person in that seat.',
      'idx.core.c2.h': 'Skill System',
      'idx.core.c2.p':
        'Built-in skills for xlsx / docx / pptx / pdf / analytics; mount per assistant; teams can publish private skills.',
      'idx.core.c3.h': 'External Tools (MCP)',
      'idx.core.c3.p':
        'MCP-native: connect ERP / CRM / BI / internal APIs. Assistants call real business tools, not just generate text.',
      'idx.core.c4.h': 'Scheduled Tasks',
      'idx.core.c4.p':
        'Routine work runs on schedule — 7:30 daily reports, anomaly alerts pushed to chat the moment they happen.',

      'idx.s1.eyebrow': 'One Domain · One Assistant',
      'idx.s1.h2': 'Stop chasing a generalist — each assistant masters one job',
      'idx.s1.lead':
        'Generic LLMs in professional contexts know a bit of everything and nothing reliably. AgentZ encourages a dedicated assistant per workflow — tighter context, stabler prompts, more predictable output.',
      'idx.s1.li1': 'Three-part prompt template (role / instructions / user context)',
      'idx.s1.li2': 'Custom avatar & personality so the team can recognise it',
      'idx.s1.li3': 'Context isolation — no cross-task contamination',
      'idx.s2.eyebrow': 'Tool-Native',
      'idx.s2.h2': 'Behind every "just ask" is a real tool-call chain',
      'idx.s2.lead':
        'AgentZ assistants are execution engines, not text generators. They plan steps, call MCP tools, read & write files, and return structured results — fully traceable, interruptible, replayable.',
      'idx.s2.li1': 'Expandable ReAct reasoning trace',
      'idx.s2.li2': 'Task monitor for live progress / manual takeover',
      'idx.s2.li3': 'Audit log for every tool call',
      'idx.s3.eyebrow': 'Always-On',
      'idx.s3.h2': 'More than Q&A — a 24/7 automation partner',
      'idx.s3.lead':
        'Hand routine work to scheduled tasks — AgentZ runs them on plan, pushes results to chat, and @-mentions you when anomalies appear. Work finds the person, not the other way round.',
      'idx.s3.link': 'Explore scheduled tasks →',

      'idx.sc.eyebrow': 'Industry Scenarios',
      'idx.sc.h2': 'Pre-built assistant templates for every business role',
      'idx.sc.t1': 'Supply Chain',
      'idx.sc.t2': 'E-commerce Ops',
      'idx.sc.t3': 'Analytics',
      'idx.sc.t4': 'Customer Success',
      'idx.sc.t1.c1.h': 'Outbound Anomaly Analyst',
      'idx.sc.t1.c1.p':
        'Scans WMS exceptions every 15 minutes, attributes causes, pings the right warehouse owner.',
      'idx.sc.t1.c2.h': 'Capacity Planner',
      'idx.sc.t1.c2.p':
        "Predicts tomorrow's capacity gap from historical volume and proposes dispatch plans.",
      'idx.sc.t1.c3.h': 'Daily Report Bot',
      'idx.sc.t1.c3.p': 'Generates regional KPI PPT decks for each warehouse at 07:30 daily.',
      'idx.sc.t2.c1.h': 'Listing Assistant',
      'idx.sc.t2.c1.p':
        'Generates titles / descriptions / hero-image tags from supplier sheets — one person manages 1,000 SKUs.',
      'idx.sc.t2.c2.h': 'Competitor Watcher',
      'idx.sc.t2.c2.p':
        "Tracks top competitors' price / volume / reviews and outputs weekly change analyses.",
      'idx.sc.t2.c3.h': 'Campaign Recap Bot',
      'idx.sc.t2.c3.p': 'Produces a multi-dimension recap within 24 hours of campaign close.',
      'idx.sc.t3.c1.h': 'SQL Query Assistant',
      'idx.sc.t3.c1.p':
        'Describe what you need in plain language — it writes SQL, runs it, plots it, explains it.',
      'idx.sc.t3.c2.h': 'A/B Test Reader',
      'idx.sc.t3.c2.p':
        'Connects to your experiment platform, calls significance, and recommends next moves.',
      'idx.sc.t3.c3.h': 'Dashboard Sentinel',
      'idx.sc.t3.c3.p':
        'Watches the North-Star metrics and pushes root-cause analysis the moment they drop.',
      'idx.sc.t4.c1.h': 'Customer Health Score',
      'idx.sc.t4.c1.p':
        'Merges usage / tickets / renewal signals to flag high-risk accounts in red.',
      'idx.sc.t4.c2.h': 'Renewal Kit',
      'idx.sc.t4.c2.p': '30 days before renewal, auto-builds a value recap + renewal script.',
      'idx.sc.t4.c3.h': 'Ticket Triager',
      'idx.sc.t4.c3.p': 'Tags, prioritises and drafts a first reply for every incoming ticket.',
      'idx.sc.more': 'See full solutions →',

      'idx.cs.eyebrow': 'Customer Outcomes',
      'idx.cs.h2': 'Real before-and-after stories — days to minutes',
      'idx.cs.c1.h': '1,000 SKUs auto-listed',
      'idx.cs.c1.p':
        'A 6-person team → 1 person + AgentZ. Productivity up <strong style="color:var(--az-text);">5×</strong>.',
      'idx.cs.c2.h': 'Anomaly Detection',
      'idx.cs.c2.p':
        'From next-day review to real-time. Mean time-to-resolve <strong style="color:var(--az-text);">24h → 15min</strong>.',
      'idx.cs.c3.h': 'Daily Reports',
      'idx.cs.c3.p':
        'Analysts no longer stitch reports for an hour each morning — AgentZ pushes at 7:30, <strong style="color:var(--az-text);">100% on time</strong>.',
      'idx.cs.c4.h': 'Renewal Prep',
      'idx.cs.c4.p':
        'Per-account prep <strong style="color:var(--az-text);">2 days → 20 min</strong>, renewal rate +12%.',

      'idx.st.1': 'Active assistants in enterprise',
      'idx.st.2': 'Official / community skills',
      'idx.st.3': 'Service availability SLA',
      'idx.st.4': 'Regional data residencies',

      'idx.cta.h2': '5 minutes — onboard your first AI coworker',
      'idx.cta.p':
        'Free 30-day trial includes 5 assistant seats, all official skills and 5,000 credits.',
      'idx.cta.btn2': 'Read the handbook',

      'feat.hero.eyebrow': 'Product',
      'feat.hero.h1': 'A complete AI Agent workbench',
      'feat.hero.lead':
        'From defining an assistant to invoking tools, from human chat to autonomous execution — AgentZ ships every block you need to land AI Agents in production.',
      'feat.nav.c1': 'AI Assistants',
      'feat.nav.c1d': 'Domain-focused assistant creation',
      'feat.nav.c2': 'Skill System',
      'feat.nav.c2d': 'Official + custom + community skills',
      'feat.nav.c3': 'External Tools (MCP)',
      'feat.nav.c3d': 'Connect ERP / CRM / internal APIs',
      'feat.nav.c4': 'Scheduled Tasks',
      'feat.nav.c4d': '24/7 execution & proactive push',
      'feat.nav.c5': 'Agent Space',
      'feat.nav.c5d': 'Unified observability & governance',
      'feat.nav.c6': 'Desktop Capabilities',
      'feat.nav.c6d': 'Local files & browser automation',

      'sol.hero.eyebrow': 'Solutions',
      'sol.hero.h1': 'An out-of-the-box agent matrix for every industry',
      'sol.hero.lead':
        'From the supply-chain floor to the customer-success desk, we package AgentZ best practice into industry solutions.',

      'hb.hero.eyebrow': 'Handbook',
      'hb.hero.h1': 'AgentZ Handbook',
      'hb.hero.lead':
        'End-to-end docs for PMs, ops and developers — from your first assistant in 5 minutes to production-grade MCP and security.',

      'srv.hero.eyebrow': 'Service & Pricing',
      'srv.hero.h1': 'From pre-sales to post-sales — a dedicated team for the last mile',
      'srv.hero.lead':
        'AI Agent success isn\'t "selling a product" — it\'s "running a business workflow with the customer".',

      'dev.hero.eyebrow': 'Developers',
      'dev.hero.h1': 'Bring AgentZ into your stack',
      'dev.hero.lead':
        "AgentZ isn't just a product — it's programmable agent infrastructure. Open API, SDK, Skill protocol and MCP let developers extend it freely.",
      'dev.hero.cta1': 'View API',
      'dev.hero.cta2': 'Download SDK',

      'sec.hero.eyebrow': 'Security & Trust',
      'sec.hero.h1': 'Transparent, controllable, auditable — enterprise security for the Agent era',
      'sec.hero.lead':
        'AgentZ bakes security into every tool call, every data flow, every conversation context.',

      'con.hero.eyebrow': 'Contact',
      'con.hero.h1': 'Tell us about your use case',
      'con.hero.lead':
        'Whether you want a POC, an on-prem deployment, or just to chat about ideas — a solutions architect will reply within one business day.',

      'leg.hero.h1': 'Terms of Service',

      'zbao.title': 'Z-Bao',
      'zbao.subtitle': 'AgentZ AI Assistant',
      'zbao.welcome':
        "Hi, I'm Z-Bao 👋 Ask me anything about AgentZ — features, pricing, deployment, integrations.",
      'zbao.placeholder': 'Type your question…',
      'zbao.send': 'Send',
      'zbao.close': 'Close',
      'zbao.tip': 'Try a popular question:',
      'zbao.chip1': 'How to create an assistant?',
      'zbao.chip2': 'How is AgentZ priced?',
      'zbao.chip3': 'Do you support on-prem?',
      'zbao.chip4': 'How to integrate ERP / MCP?',
      'zbao.answer.create':
        'In the AgentZ console, click **New Assistant** and follow the wizard to set **scenario, knowledge base, tools and permissions** — live in under 3 minutes. See [Handbook](handbook.html).',
      'zbao.answer.pricing':
        'AgentZ offers **Free / Team / Enterprise** plans, billed by assistant count and call volume. Check [Service & Pricing](service.html) or [Talk to Sales](contact.html).',
      'zbao.answer.deploy':
        'We support **SaaS, dedicated cloud and on-prem** deployment. Enterprise customers can run AgentZ entirely inside their own VPC. See [Security](security.html).',
      'zbao.answer.erp':
        'AgentZ connects to ERP / CRM / internal APIs via **MCP protocol + custom tools**. Connectors and code samples live in [Developers](developers.html).',
      'zbao.answer.fallback':
        "I'm still learning that one. Please check the [Handbook](handbook.html) or [Contact us](contact.html) for a human reply.",
    },

    th: {
      'nav.features': 'ฟีเจอร์',
      'nav.solutions': 'โซลูชัน',
      'nav.handbook': 'คู่มือ',
      'nav.service': 'บริการและราคา',
      'nav.developers': 'นักพัฒนา',
      'nav.security': 'ความปลอดภัย',
      'nav.contact': 'ติดต่อเรา',
      'nav.download': 'ดาวน์โหลด Agent Z',
      'nav.download.mac': 'macOS (Apple Silicon)',
      'nav.download.mac.desc': 'ซีรีส์ M1 / M2 / M3 / M4',
      'nav.download.win': 'Windows',
      'nav.download.win.desc': 'Windows 10 / 11 (64 บิต)',
      'nav.download.mac-intel': 'macOS (Intel)',
      'nav.download.mac-intel.desc': 'Mac รุ่นก่อนปี 2020',
      'nav.download.recommended': 'แนะนำ',
      'nav.cta': 'ทดลองฟรี',
      'footer.tagline': 'ติดตั้งผู้ช่วย AI ผู้เชี่ยวชาญเฉพาะด้านให้ทุกตำแหน่งในทีมของคุณ',
      'footer.product': 'ผลิตภัณฑ์',
      'footer.resources': 'ทรัพยากร',
      'footer.company': 'บริษัท',
      'footer.legal': 'กฎหมาย',
      'footer.pricing': 'ราคา',
      'footer.api': 'แพลตฟอร์ม API',
      'footer.changelog': 'บันทึกการอัปเดต',
      'footer.contact': 'ติดต่อเรา',
      'footer.partner': 'พันธมิตร',
      'footer.careers': 'ร่วมงานกับเรา',
      'footer.terms': 'ข้อกำหนดการให้บริการ',
      'footer.privacy': 'นโยบายความเป็นส่วนตัว',
      'footer.cookie': 'นโยบายคุกกี้',
      'footer.copyright': '© 2026 AgentZ สงวนลิขสิทธิ์',
      'footer.icp': 'เลข ICP 0000000',

      'idx.hero.eyebrow': 'แพลตฟอร์ม AI Agent สำหรับองค์กร',
      'idx.hero.h1':
        'มอบทุกตำแหน่งงาน<br/>ให้กับ <span style="color:var(--az-brand)">ผู้เชี่ยวชาญ AI เฉพาะทาง</span>',
      'idx.hero.lead':
        'AgentZ ให้คุณสร้างผู้ช่วยเฉพาะสำหรับงาน "วิเคราะห์การเบิกของ" "เขียนรายงานประจำวัน" "ตรวจสอบสัญญา" แต่ละผู้ช่วยใช้เครื่องมือจริง จดจำบริบท และทำงานหลายขั้นตอนตามตารางได้ — เหมือนเพื่อนร่วมงานจริง ไม่ใช่แชทบอททั่วไป',
      'idx.hero.cta1': 'เริ่มฟรี →',
      'idx.hero.cta2': 'อ่านคู่มือ',
      'idx.hero.meta1': 'สร้างผู้ช่วยแรกใน 5 นาที',
      'idx.hero.meta2': 'รองรับการติดตั้งภายในองค์กร',
      'idx.hero.meta3': 'ระบบนิเวศเครื่องมือ MCP',

      'idx.logos.label': 'ทีมเหล่านี้ใช้ในงานสำคัญ',

      'idx.core.eyebrow': 'ความสามารถหลัก',
      'idx.core.h2': 'สี่เสาหลัก สร้างทีม AI ที่ทำงานตลอด 24 ชม.',
      'idx.core.lead':
        'AgentZ แปลง LLM ทั่วไปให้กลายเป็นความสามารถระดับตำแหน่งงานที่ไว้ใจได้ — ไม่ใช่การแชทที่ฉลาดขึ้น แต่เป็นกลไกที่ทำงานสำเร็จจริง',
      'idx.core.c1.h': 'ผู้ช่วย AI',
      'idx.core.c1.p':
        'ผู้ช่วยเฉพาะตำแหน่ง ใช้ Prompt 3 ส่วน (บทบาท / คำสั่ง / บริบท) ทำให้คิดเหมือนคนในตำแหน่งนั้น',
      'idx.core.c2.h': 'ระบบทักษะ',
      'idx.core.c2.p':
        'ทักษะในตัวสำหรับ xlsx / docx / pptx / pdf / การวิเคราะห์; แต่ละผู้ช่วยเลือกใช้ตามต้องการ; ทีมสร้างทักษะส่วนตัวได้',
      'idx.core.c3.h': 'เครื่องมือภายนอก (MCP)',
      'idx.core.c3.p':
        'ใช้ MCP เชื่อมต่อ ERP / CRM / BI / API ภายใน ผู้ช่วยเรียกใช้เครื่องมือจริง ไม่ใช่แค่สร้างข้อความ',
      'idx.core.c4.h': 'งานตามเวลา',
      'idx.core.c4.p':
        'งานประจำให้ทำตามตารางอัตโนมัติ — รายงานเช้า 07:30 แจ้งเตือนความผิดปกติทันทีที่เกิดขึ้น',

      'idx.s1.eyebrow': 'หนึ่งโดเมน · หนึ่งผู้ช่วย',
      'idx.s1.h2': 'เลิกไล่ตามผู้ช่วยอเนกประสงค์ — ให้แต่ละตัวทำงานเดียวให้ดีที่สุด',
      'idx.s1.lead':
        'LLM ทั่วไปในงานเฉพาะทางมักรู้เล็ก ๆ น้อย ๆ แต่ไม่น่าเชื่อถือ AgentZ สนับสนุนให้แยกผู้ช่วยทีละงาน — บริบทแคบลง Prompt เสถียร ผลลัพธ์คาดเดาได้',
      'idx.s1.li1': 'เทมเพลต Prompt 3 ส่วน (บทบาท / คำสั่ง / บริบทผู้ใช้)',
      'idx.s1.li2': 'ปรับ avatar และบุคลิกได้ ให้ทีมจำง่าย',
      'idx.s1.li3': 'แยกบริบทระหว่างงาน ไม่ปนกัน',
      'idx.s2.eyebrow': 'Tool-Native',
      'idx.s2.h2': 'เบื้องหลัง "แค่ถาม" คือห่วงโซ่การเรียกเครื่องมือจริง',
      'idx.s2.lead':
        'ผู้ช่วย AgentZ เป็นกลไกทำงาน ไม่ใช่เครื่องสร้างข้อความ มันวางแผน เรียกเครื่องมือ MCP อ่าน/เขียนไฟล์ และส่งผลแบบมีโครงสร้าง — ตรวจสอบย้อนได้ หยุด/เล่นซ้ำได้',
      'idx.s2.li1': 'แสดงเส้นทางการคิด ReAct เต็มรูปแบบ',
      'idx.s2.li2': 'ตัวตรวจสอบงานแบบเรียลไทม์ / รับช่วงกลางคันได้',
      'idx.s2.li3': 'บันทึก audit log ทุกครั้งที่เรียกเครื่องมือ',
      'idx.s3.eyebrow': 'Always-On',
      'idx.s3.h2': 'มากกว่าตอบคำถาม — เป็นพาร์ตเนอร์อัตโนมัติ 24/7',
      'idx.s3.lead':
        'ส่งงานประจำให้ Scheduled Tasks — AgentZ ทำตามตาราง ส่งผลเข้า IM แท็กคุณเมื่อพบความผิดปกติ ให้ "งานหาคน" ไม่ใช่ "คนหางาน"',
      'idx.s3.link': 'ดูความสามารถ Scheduled Tasks →',

      'idx.sc.eyebrow': 'สถานการณ์อุตสาหกรรม',
      'idx.sc.h2': 'เทมเพลตผู้ช่วยสำเร็จรูปสำหรับทุกตำแหน่งงาน',
      'idx.sc.t1': 'ซัพพลายเชน',
      'idx.sc.t2': 'อีคอมเมิร์ซ',
      'idx.sc.t3': 'การวิเคราะห์',
      'idx.sc.t4': 'Customer Success',
      'idx.sc.t1.c1.h': 'นักวิเคราะห์ใบเบิกผิดปกติ',
      'idx.sc.t1.c1.p': 'สแกนตาราง WMS ทุก 15 นาที ระบุสาเหตุ และส่งให้หัวหน้าคลังที่เกี่ยวข้อง',
      'idx.sc.t1.c2.h': 'ผู้ช่วยจัดสรรขนส่ง',
      'idx.sc.t1.c2.p': 'ทำนายช่องว่างขนส่งของวันพรุ่งนี้จากปริมาณในอดีต พร้อมเสนอแผนการจัดรถ',
      'idx.sc.t1.c3.h': 'ผู้ช่วยรายงานประจำวัน',
      'idx.sc.t1.c3.p': 'สร้าง PPT KPI ของคลังภาคใต้/ตะวันออก/เหนือทุก 07:30',
      'idx.sc.t2.c1.h': 'ผู้ช่วยลงสินค้า',
      'idx.sc.t2.c1.p':
        'สร้างชื่อ/รายละเอียด/แท็กภาพหลักจากตารางซัพพลายเออร์ — 1 คนดูแล 1,000 SKU ได้',
      'idx.sc.t2.c2.h': 'นักสังเกตคู่แข่ง',
      'idx.sc.t2.c2.p': 'ดึงราคา/ยอด/รีวิวคู่แข่งทุกวัน ออกบทวิเคราะห์การเปลี่ยนแปลงรายสัปดาห์',
      'idx.sc.t2.c3.h': 'ผู้ช่วยสรุปแคมเปญ',
      'idx.sc.t2.c3.p': 'หลังจบแคมเปญ 24 ชม. ออกรายงานสรุปหลายมิติอัตโนมัติ',
      'idx.sc.t3.c1.h': 'ผู้ช่วย SQL',
      'idx.sc.t3.c1.p':
        'อธิบายสิ่งที่ต้องการเป็นภาษาธรรมชาติ — เขียน SQL, รัน, สร้างกราฟ, อธิบายผล',
      'idx.sc.t3.c2.h': 'นักอ่านการทดสอบ A/B',
      'idx.sc.t3.c2.p': 'เชื่อมต่อแพลตฟอร์มทดลอง ตัดสินนัยสำคัญและเสนอขั้นถัดไป',
      'idx.sc.t3.c3.h': 'ผู้คุมแดชบอร์ด',
      'idx.sc.t3.c3.p': 'ตรวจสอบ Metric ดาวเหนือทุกวัน ส่งวิเคราะห์รากเหง้าทันทีที่ลดลง',
      'idx.sc.t4.c1.h': 'คะแนนสุขภาพลูกค้า',
      'idx.sc.t4.c1.p': 'รวมสัญญาณ usage/ตั๋ว/ต่อสัญญา ระบุบัญชีเสี่ยงด้วยสีแดง',
      'idx.sc.t4.c2.h': 'ชุดเตรียมต่อสัญญา',
      'idx.sc.t4.c2.p': 'ก่อนต่อสัญญา 30 วัน สร้างสรุปคุณค่า + สคริปต์ต่อสัญญาอัตโนมัติ',
      'idx.sc.t4.c3.h': 'ผู้แยกประเภทตั๋ว',
      'idx.sc.t4.c3.p': 'แท็ก จัดลำดับความสำคัญ และร่างคำตอบแรกให้ทุกตั๋ว',
      'idx.sc.more': 'ดูโซลูชันทั้งหมด →',

      'idx.cs.eyebrow': 'ผลลัพธ์ของลูกค้า',
      'idx.cs.h2': 'เรื่องจริงก่อน-หลัง — จากวันเป็นนาที',
      'idx.cs.c1.h': 'ลง 1,000 SKU อัตโนมัติ',
      'idx.cs.c1.p':
        'จากทีม 6 คน → 1 คน + AgentZ ประสิทธิภาพเพิ่ม <strong style="color:var(--az-text);">5 เท่า</strong>',
      'idx.cs.c2.h': 'ตรวจจับความผิดปกติ',
      'idx.cs.c2.p':
        'จากรีวิววันถัดไป → ตรวจจับเรียลไทม์ เวลาเฉลี่ย <strong style="color:var(--az-text);">24 ชม. → 15 นาที</strong>',
      'idx.cs.c3.h': 'รายงานประจำวัน',
      'idx.cs.c3.p':
        'นักวิเคราะห์ไม่ต้องทำรายงานชั่วโมงทุกเช้า — AgentZ ส่งที่ 7:30 <strong style="color:var(--az-text);">ตรงเวลา 100%</strong>',
      'idx.cs.c4.h': 'เตรียมต่อสัญญา',
      'idx.cs.c4.p':
        'เตรียมต่อบัญชี <strong style="color:var(--az-text);">2 วัน → 20 นาที</strong> อัตราต่อสัญญา +12%',

      'idx.st.1': 'ผู้ช่วยที่ใช้งานในองค์กร',
      'idx.st.2': 'ทักษะทางการ/ชุมชน',
      'idx.st.3': 'SLA ความพร้อมใช้งาน',
      'idx.st.4': 'ภูมิภาคข้อมูลที่รองรับ',

      'idx.cta.h2': '5 นาที — ตั้งค่าเพื่อนร่วมงาน AI คนแรก',
      'idx.cta.p': 'ทดลองฟรี 30 วัน รวมที่นั่งผู้ช่วย 5 ตัว ทักษะทางการทั้งหมด และเครดิต 5,000',
      'idx.cta.btn2': 'อ่านคู่มือ',

      'feat.hero.eyebrow': 'ผลิตภัณฑ์',
      'feat.hero.h1': 'ชุดทำงาน AI Agent ครบวงจร',
      'feat.hero.lead':
        'ตั้งแต่ "นิยามผู้ช่วย" ไปจนถึง "เรียกใช้เครื่องมือ" จากบทสนทนาสู่การทำงานอัตโนมัติ — AgentZ มีทุกองค์ประกอบสำหรับการนำ AI Agent ไปใช้จริง',
      'feat.nav.c1': 'ผู้ช่วย AI',
      'feat.nav.c1d': 'สร้างและบริหารผู้ช่วยเฉพาะทาง',
      'feat.nav.c2': 'ระบบทักษะ',
      'feat.nav.c2d': 'ทักษะทางการ + เอง + ชุมชน',
      'feat.nav.c3': 'เครื่องมือภายนอก (MCP)',
      'feat.nav.c3d': 'เชื่อม ERP / CRM / API ภายใน',
      'feat.nav.c4': 'งานตามเวลา',
      'feat.nav.c4d': 'ทำงาน 24/7 และแจ้งเตือนเชิงรุก',
      'feat.nav.c5': 'Agent Space',
      'feat.nav.c5d': 'สังเกตและกำกับดูแลรวมศูนย์',
      'feat.nav.c6': 'ความสามารถบนเดสก์ท็อป',
      'feat.nav.c6d': 'ไฟล์ในเครื่องและการใช้งานเบราว์เซอร์',

      'sol.hero.eyebrow': 'โซลูชัน',
      'sol.hero.h1': 'เมทริกซ์ Agent สำเร็จรูปสำหรับทุกอุตสาหกรรม',
      'sol.hero.lead':
        'ตั้งแต่หน้างานซัพพลายเชนถึงโต๊ะ Customer Success เรารวมแนวปฏิบัติที่ดีที่สุดของ AgentZ เป็นโซลูชันเฉพาะอุตสาหกรรม',

      'hb.hero.eyebrow': 'คู่มือ',
      'hb.hero.h1': 'คู่มือการใช้ AgentZ',
      'hb.hero.lead':
        'เอกสารครบวงจรสำหรับ PM, ทีมงาน และนักพัฒนา — ตั้งแต่ผู้ช่วยตัวแรกใน 5 นาที ไปจนถึง MCP และการรักษาความปลอดภัยระดับโปรดักชัน',

      'srv.hero.eyebrow': 'บริการและราคา',
      'srv.hero.h1': 'ตั้งแต่ก่อนขายถึงหลังขาย — ทีมเฉพาะที่พาคุณไปถึงไมล์สุดท้าย',
      'srv.hero.lead':
        'ความสำเร็จของ AI Agent ไม่ใช่ "ขายผลิตภัณฑ์" แต่คือ "การเดินกระบวนการธุรกิจไปกับลูกค้า"',

      'dev.hero.eyebrow': 'นักพัฒนา',
      'dev.hero.h1': 'นำ AgentZ เข้าไปในสแตกของคุณ',
      'dev.hero.lead':
        'AgentZ ไม่ใช่แค่ผลิตภัณฑ์ — เป็นโครงสร้างพื้นฐาน Agent ที่โปรแกรมได้ API, SDK, Skill Protocol และ MCP เปิดให้นักพัฒนาขยายได้อิสระ',
      'dev.hero.cta1': 'ดู API',
      'dev.hero.cta2': 'ดาวน์โหลด SDK',

      'sec.hero.eyebrow': 'ความปลอดภัยและความน่าเชื่อถือ',
      'sec.hero.h1': 'โปร่งใส ควบคุมได้ ตรวจสอบได้ — รากฐานความปลอดภัยระดับองค์กรของยุค Agent',
      'sec.hero.lead':
        'AgentZ ฝังความปลอดภัยเข้าไปในทุกการเรียกเครื่องมือ ทุกการไหลของข้อมูล ทุกบริบทสนทนา',

      'con.hero.eyebrow': 'ติดต่อ',
      'con.hero.h1': 'บอกเราเกี่ยวกับสถานการณ์ธุรกิจของคุณ',
      'con.hero.lead':
        'ไม่ว่าคุณจะอยากทำ POC, ติดตั้งภายในองค์กร หรือแค่อยากคุยไอเดีย สถาปนิกโซลูชันของเราจะตอบกลับใน 1 วันทำการ',

      'leg.hero.h1': 'ข้อกำหนดการให้บริการ',

      'zbao.title': 'Z-Bao',
      'zbao.subtitle': 'ผู้ช่วยอัจฉริยะของ AgentZ',
      'zbao.welcome':
        'สวัสดี ฉันคือ Z-Bao 👋 ถามฉันเกี่ยวกับ AgentZ ได้เลย ไม่ว่าจะเป็นฟีเจอร์ ราคา การติดตั้ง หรือการเชื่อมต่อ',
      'zbao.placeholder': 'พิมพ์คำถามของคุณ…',
      'zbao.send': 'ส่ง',
      'zbao.close': 'ปิด',
      'zbao.tip': 'คำถามยอดนิยม:',
      'zbao.chip1': 'สร้างผู้ช่วยอย่างไร?',
      'zbao.chip2': 'AgentZ คิดราคาอย่างไร?',
      'zbao.chip3': 'ติดตั้งภายในองค์กรได้ไหม?',
      'zbao.chip4': 'เชื่อมต่อ ERP / MCP อย่างไร?',
      'zbao.answer.create':
        'เข้าไปที่คอนโซล AgentZ คลิก **สร้างผู้ช่วยใหม่** แล้วทำตามขั้นตอนเพื่อกำหนด **สถานการณ์ ฐานความรู้ เครื่องมือ และสิทธิ์** ใช้งานได้ภายใน 3 นาที ดูเพิ่มเติมที่ [คู่มือ](handbook.html)',
      'zbao.answer.pricing':
        'AgentZ มีแพ็กเกจ **ฟรี / Team / Enterprise** คิดค่าใช้จ่ายตามจำนวนผู้ช่วยและการเรียกใช้ ดูที่ [บริการและราคา](service.html) หรือ [ติดต่อฝ่ายขาย](contact.html)',
      'zbao.answer.deploy':
        'รองรับ **SaaS, Dedicated Cloud และ On-prem** องค์กรสามารถติดตั้งใน VPC ของตนเองได้ ดูที่ [ความปลอดภัย](security.html)',
      'zbao.answer.erp':
        'AgentZ เชื่อมต่อ ERP / CRM / API ภายในผ่าน **MCP + เครื่องมือกำหนดเอง** ดู Connector และตัวอย่างที่ [นักพัฒนา](developers.html)',
      'zbao.answer.fallback':
        'ขออภัย ฉันยังตอบคำถามนี้ไม่ได้ ลองดูที่ [คู่มือ](handbook.html) หรือ [ติดต่อเรา](contact.html) เพื่อรับความช่วยเหลือ',
    },
  };

  function getLang() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && SUPPORTED_LANGS.indexOf(saved) >= 0) return saved;
    const nav = (navigator.language || 'zh').toLowerCase();
    if (nav.indexOf('th') === 0) return 'th';
    if (nav.indexOf('en') === 0) return 'en';
    return DEFAULT_LANG;
  }
  function setLang(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) < 0) return;
    localStorage.setItem(LANG_KEY, lang);
    applyI18n(lang);
    refreshLangSwitcher();
    refreshZbao();
  }
  function t(key, lang) {
    const l = lang || getLang();
    return (I18N[l] && I18N[l][key]) || (I18N[DEFAULT_LANG] && I18N[DEFAULT_LANG][key]) || key;
  }

  /* Light markdown: **bold** and [text](url) → HTML. Escape first. */
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function renderRich(text) {
    let html = escapeHtml(text);
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_, label, url) {
      return `<a href="${url}">${label}</a>`;
    });
    return html;
  }

  function applyI18n(lang) {
    const l = lang || getLang();
    document.documentElement.setAttribute('lang', l);
    // text nodes
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (key) el.textContent = t(key, l);
    });
    // raw HTML (allows <br/> / <strong> / <span> in translations)
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-html');
      if (key) el.innerHTML = t(key, l);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) el.setAttribute('placeholder', t(key, l));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-title');
      if (key) el.setAttribute('title', t(key, l));
    });
  }

  /* ------------------------------------------------------------------
   * Theme toggle
   * ------------------------------------------------------------------ */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.querySelector('[data-theme-toggle]');
    if (btn) btn.textContent = theme === 'dark' ? '☀' : '☾';
  }
  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));
    const btn = document.querySelector('[data-theme-toggle]');
    if (btn) {
      btn.addEventListener('click', function () {
        const cur = document.documentElement.getAttribute('data-theme') || 'light';
        const next = cur === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    }
  }

  /* ------------------------------------------------------------------
   * Tabs
   * ------------------------------------------------------------------ */
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach((group) => {
      const buttons = group.querySelectorAll('[data-tab]');
      const panels = document.querySelectorAll(
        `[data-tab-panel][data-tab-group='${group.dataset.tabs}']`,
      );
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          buttons.forEach((b) => b.classList.remove('is-active'));
          panels.forEach((p) => p.classList.remove('is-active'));
          btn.classList.add('is-active');
          const target = document.querySelector(
            `[data-tab-panel='${btn.dataset.tab}'][data-tab-group='${group.dataset.tabs}']`,
          );
          if (target) target.classList.add('is-active');
        });
      });
    });
  }

  /* ------------------------------------------------------------------
   * Nav active highlight
   * ------------------------------------------------------------------ */
  function initNav() {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.az-nav__menu a').forEach((a) => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      if (href === path) a.classList.add('is-active');
    });
  }

  /* ------------------------------------------------------------------
   * Language switcher (auto-inject into .az-nav__actions)
   * ------------------------------------------------------------------ */
  function buildLangSwitcher() {
    const host = document.querySelector('.az-nav__actions');
    if (!host || host.querySelector('.az-lang')) return;
    const wrap = document.createElement('div');
    wrap.className = 'az-lang';
    const cur = getLang();
    wrap.innerHTML =
      `<button type="button" class="az-lang__btn" aria-haspopup="listbox" aria-expanded="false">` +
      `<span class="az-lang__flag">${LANG_META[cur].flag}</span>` +
      `<span class="az-lang__short">${LANG_META[cur].short}</span>` +
      `<span class="az-lang__caret">▾</span>` +
      `</button>` +
      `<ul class="az-lang__menu" role="listbox">${SUPPORTED_LANGS.map(function (code) {
        const m = LANG_META[code];
        return (
          `<li class="az-lang__item${code === cur ? ' is-active' : ''}" data-lang="${code}" role="option">` +
          `<span class="az-lang__flag">${m.flag}</span>` +
          `<span class="az-lang__label">${m.label}</span>` +
          `</li>`
        );
      }).join('')}</ul>`;
    host.insertBefore(wrap, host.firstChild);

    const btn = wrap.querySelector('.az-lang__btn');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      wrap.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', wrap.classList.contains('is-open') ? 'true' : 'false');
    });
    wrap.querySelectorAll('.az-lang__item').forEach(function (item) {
      item.addEventListener('click', function () {
        const code = item.getAttribute('data-lang');
        wrap.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        setLang(code);
      });
    });
    document.addEventListener('click', function () {
      wrap.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  }
  function refreshLangSwitcher() {
    const wrap = document.querySelector('.az-lang');
    if (!wrap) return;
    const cur = getLang();
    const shortEl = wrap.querySelector('.az-lang__short');
    const flagEl = wrap.querySelector('.az-lang__btn .az-lang__flag');
    if (shortEl) shortEl.textContent = LANG_META[cur].short;
    if (flagEl) flagEl.textContent = LANG_META[cur].flag;
    wrap.querySelectorAll('.az-lang__item').forEach(function (item) {
      item.classList.toggle('is-active', item.getAttribute('data-lang') === cur);
    });
  }

  /* ------------------------------------------------------------------
   * Z宝 floating assistant
   * ------------------------------------------------------------------ */
  function buildZbao() {
    if (document.querySelector('.az-zbao')) return;
    const root = document.createElement('div');
    root.className = 'az-zbao';
    root.innerHTML =
      '<button type="button" class="az-zbao__fab" aria-label="Z宝">' +
      '<span class="az-zbao__pulse"></span>' +
      '<span class="az-zbao__badge" data-i18n="zbao.title">Z宝</span>' +
      '</button>' +
      '<section class="az-zbao__panel" role="dialog" aria-label="Z宝">' +
      '<header class="az-zbao__header">' +
      '<span class="az-zbao__avatar"></span>' +
      '<div class="az-zbao__heading">' +
      '<div class="az-zbao__title" data-i18n="zbao.title">Z宝</div>' +
      '<div class="az-zbao__subtitle" data-i18n="zbao.subtitle">AgentZ 智能答疑助手</div>' +
      '</div>' +
      '<button type="button" class="az-zbao__close" aria-label="close" data-i18n-title="zbao.close">×</button>' +
      '</header>' +
      '<div class="az-zbao__body"></div>' +
      '<form class="az-zbao__input">' +
      '<input type="text" autocomplete="off" data-i18n-placeholder="zbao.placeholder" />' +
      '<button type="submit" class="az-zbao__send" data-i18n="zbao.send">发送</button>' +
      '</form>' +
      '</section>';
    document.body.appendChild(root);

    const fab = root.querySelector('.az-zbao__fab');
    const panel = root.querySelector('.az-zbao__panel');
    const closeBtn = root.querySelector('.az-zbao__close');
    const form = root.querySelector('.az-zbao__input');
    const input = form.querySelector('input');

    fab.addEventListener('click', function () {
      root.classList.toggle('is-open');
      if (root.classList.contains('is-open')) {
        if (!panel.dataset.inited) {
          resetZbao();
          panel.dataset.inited = '1';
        }
        setTimeout(function () {
          input && input.focus();
        }, 50);
      }
    });
    closeBtn.addEventListener('click', function () {
      root.classList.remove('is-open');
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const v = (input.value || '').trim();
      if (!v) return;
      sendUserMsg(v);
      input.value = '';
    });
  }

  function refreshZbao() {
    resetZbao();
  }

  function resetZbao() {
    const body = document.querySelector('.az-zbao__body');
    if (!body) return;
    body.innerHTML = '';
    appendBot(t('zbao.welcome'));
    const tip = document.createElement('div');
    tip.className = 'az-zbao__tip';
    tip.textContent = t('zbao.tip');
    body.appendChild(tip);
    const chips = document.createElement('div');
    chips.className = 'az-zbao__chips';
    ['zbao.chip1', 'zbao.chip2', 'zbao.chip3', 'zbao.chip4'].forEach(function (k) {
      const c = document.createElement('button');
      c.type = 'button';
      c.className = 'az-zbao__chip';
      c.textContent = t(k);
      c.addEventListener('click', function () {
        sendUserMsg(t(k));
      });
      chips.appendChild(c);
    });
    body.appendChild(chips);
    body.scrollTop = body.scrollHeight;
  }

  function appendBot(text) {
    const body = document.querySelector('.az-zbao__body');
    if (!body) return;
    const el = document.createElement('div');
    el.className = 'az-zbao__msg az-zbao__msg--bot';
    el.innerHTML = renderRich(text);
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }
  function appendUser(text) {
    const body = document.querySelector('.az-zbao__body');
    if (!body) return;
    const el = document.createElement('div');
    el.className = 'az-zbao__msg az-zbao__msg--user';
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  function sendUserMsg(text) {
    appendUser(text);
    const reply = matchAnswer(text);
    setTimeout(function () {
      appendBot(reply);
    }, 250);
  }

  function matchAnswer(q) {
    const s = (q || '').toLowerCase();
    if (/(创建|新建|怎么用|how to use|create|build|new assistant|สร้าง|วิธีใช้)/i.test(s))
      return t('zbao.answer.create');
    if (/(价格|多少钱|收费|价钱|pricing|price|cost|how much|ราคา|ค่าใช้|กี่บาท)/i.test(s))
      return t('zbao.answer.pricing');
    if (/(部署|私有化|本地|on[- ]?prem|deploy|self[- ]?host|ติดตั้ง|ภายในองค์กร)/i.test(s))
      return t('zbao.answer.deploy');
    if (/(erp|crm|对接|集成|api|mcp|integrat|connect|เชื่อมต่อ|เชื่อม)/i.test(s))
      return t('zbao.answer.erp');
    return t('zbao.answer.fallback');
  }

  /* ---------- Download Dropdown ---------- */
  function initDownloadDropdown() {
    const dropdowns = document.querySelectorAll('.az-download-dropdown');
    dropdowns.forEach(function (dropdown) {
      const btn = dropdown.querySelector('.az-download-btn');
      if (!btn) return;
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('is-open');
        // close all other dropdowns
        dropdowns.forEach(function (d) {
          d.classList.remove('is-open');
        });
        if (!isOpen) dropdown.classList.add('is-open');
      });
    });
    // close on outside click
    document.addEventListener('click', function () {
      dropdowns.forEach(function (d) {
        d.classList.remove('is-open');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initTabs();
    initNav();
    buildLangSwitcher();
    buildZbao();
    initDownloadDropdown();
    applyI18n(getLang());
  });
})();
