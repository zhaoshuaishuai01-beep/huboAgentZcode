# AgentZ 官网方案 README

> **一句话定位**：AgentZ 是面向企业的 AI Agent 工作台 — 让每个岗位都拥有一位会用工具、能自主执行、可被信赖的"领域专家"。
>
> （继承 AgentX「One Assistant Per Domain」的内核，融合通用 Agent 开发平台能力。）

---

## 0. 方案速览

| 项目 | 值 |
|---|---|
| 产品名 | **AgentZ** |
| 视觉风格 | **AgentX 手册延伸风** —— 中性蓝灰文档底色 + 蓝色品牌强调 + 青绿点缀；支持 light/dark 切换 |
| 技术栈 | 纯 **HTML / CSS / JS**（单文件友好，零构建），可直接静态部署 / 也可后续迁移到 Next.js |
| 页面数 | 9 个 HTML 页面 + 1 套共享 CSS/JS |
| 交付路径 | `outputs/agentz-site/` |
| 浏览方式 | 双击 `index.html` 直接打开 / 或 `python3 -m http.server` 起本地服务 |

---

## 1. 信息架构 (IA)

```
AgentZ.com
├── 首页              index.html      Hero · 价值主张 · 核心能力 · 场景 · 案例 · CTA
├── 产品功能          features.html   Assistants · Skills · MCP · Scheduled · Space · Settings
├── 解决方案          solutions.html  供应链 / 电商 / 数据分析 / 客户成功 / 研发提效 行业 Tab
├── 使用手册          handbook.html   三栏 docs 布局（左目录 + 中正文 + 右 TOC）
├── 服务              service.html    售前咨询 · 售后支持 · SLA · 培训 · 客户成功
├── 开发者 & API      developers.html SDK · API Reference · Skill 开发 · MCP 接入
├── 安全              security.html   隔离沙箱 · 数据合规 · 审计 · 信任中心
├── 联系我们          contact.html    商务咨询表单 + 区域办公室
└── 法律              legal.html      服务条款 · 隐私政策 · Cookie
```

**全局导航（Top Nav）**：产品功能 / 解决方案 / 使用手册 / 开发者 / 价格 / 安全 →（右）登录 / 免费试用。

**全局页脚（Footer）**：产品 · 解决方案 · 资源 · 公司 · 联系 五列 + 备案 + 社媒。

---

## 2. 视觉规范

### 2.1 配色
| Token | 值 | 用途 |
|---|---|---|
| `--az-brand` | `#2A5BFF` | 主品牌色 / 主 CTA / 链接 |
| `--az-brand-strong` | `#1846E6` | hover 加深 |
| `--az-brand-soft` | `#E8EEFF` | tag / 浅底强调 |
| `--az-accent` | `#00C2A8` | 成功 / "✓" / 渐变收尾 |
| `--az-bg / bg-alt` | `#FFFFFF / #F7F8FC` | light 背景 |
| `--az-bg / bg-alt` (dark) | `#0B1220 / #0F172A` | dark 背景 |
| `--az-text / muted / soft` | `#0B1220 / #5A6478 / #8A93A6` | 三级文字 |

### 2.2 字体
- 中英混排：`Inter, "PingFang SC", "Microsoft YaHei", system-ui`
- 代码 / 数据：`"JetBrains Mono", ui-monospace`

### 2.3 圆角与阴影
- 卡片 `16px` · 按钮 `999px (pill)` · 容器 `24px`
- 阴影分三档：`sm / md / lg`，主用于卡片 hover / 模拟产品截图。

### 2.4 组件库（已封装在 styles.css）
- `.az-btn` 主/次/链接三态
- `.az-card` 含 `.az-card__icon` 图标块
- `.az-tabs` 切换条
- `.az-grid--2/3/4` 响应式栅格
- `.az-docs` 三栏 docs 布局
- `.az-tier` 定价/服务套餐卡
- `.az-cta` 渐变行动横幅
- `.az-mock` 产品 mock 框（首屏伪截图）

---

## 3. 各页面要点

### 3.1 首页 `index.html`
1. **Hero**：左标语 + CTA + 信任徽章；右产品 mock 对话框（侧栏助手 + 三个气泡）。
2. **客户 Logo 带**：占位灰字 logo 6 个。
3. **核心能力 4 卡**：AI 助手 / 技能体系 / 工具 (MCP) / 定时任务。
4. **价值主张 Split × 3**：领域专精 / 工具调用 / 多助手协作。
5. **行业场景 Tabs**：供应链 / 电商 / 数据分析（与解决方案页联动）。
6. **客户案例**：4 张效率对比卡（参考 Qoder Work 的"传统 vs AgentZ"格式）。
7. **统计数据条**：4 项数字。
8. **CTA banner** + Footer。

### 3.2 产品功能页 `features.html`
按 AgentX 手册的 8 大模块梳理，提炼为 5 大产品能力：
- AI 助手工作台 (Assistants)
- 技能体系 (Skills)
- 外部工具调用 (MCP)
- 定时任务自动化 (Scheduled Tasks)
- 智能体空间 / 运营看板 (Agent Space)

每个能力一段 Split 布局（左文右图/mock），底部接对比表（AgentZ vs 通用对话 AI）。

### 3.3 解决方案 `solutions.html`
五大行业 Tab：供应链物流 · 电商运营 · 数据分析 · 客户成功 · 研发提效。每 Tab 包含：痛点 → 方案 → 关键能力 → ROI 数据 → 客户引用。

### 3.4 使用手册 `handbook.html`
**三栏 docs 风**：左导航树（参照 AgentX 章节）、中正文、右页内锚点 TOC。
内置首页文章「Quick Start：5 分钟创建你的第一个 AgentZ 助手」，含步骤截图位、代码块、引用块、`code` inline。

### 3.5 服务 `service.html`
- 三档服务套餐卡（标准 / 专业 / 企业）— 借鉴 MuleRun 定价
- 售前流程时间轴：需求 → POC → 部署 → 培训 → 上线
- 售后能力矩阵：工单 / 7×24 / 专属 CSM
- 培训与客户成功

### 3.6 开发者 & API `developers.html`
- 开发者 Hero + 三大入口卡（API · SDK · Skill 开发）
- API Reference 示例代码块（curl / Python / Node）
- Skill / MCP 接入指南导航
- 社区与开源资源

### 3.7 安全 `security.html`
四大支柱：硬件隔离沙箱 · 数据合规（GDPR/等保2.0）· 审计与可追溯 · 透明可控。
底部"信任中心"区块 + 安全白皮书下载入口。

### 3.8 联系 `contact.html`
左侧表单（姓名/公司/邮箱/需求场景/留言）+ 右侧办公室卡片（北京/杭州/新加坡）。

### 3.9 法律 `legal.html`
单页长文模板：服务条款 / 隐私政策 / Cookie 政策 三段折叠区。

---

## 4. 文案语气总纲

- 务实、专业、轻技术黑话。
- 多用动词开头："让数据自己说话"、"把流程交给 AgentZ"。
- 数据要具体：「6 人 → 1 人」「1 天 → 11 分钟」（参考 Qoder Work 案例样式）。
- 中文为主，关键英文术语保留：Assistant、Skill、MCP、Agent Space。

---

## 5. 给 Vibe Coding 工具的提示词模板

把整个 `agentz-site/` 文件夹打开后，可粘贴下面提示词让 Cursor / Qoder 接力：

```text
我已经有一份 AgentZ 官网 HTML 原型（位于当前目录，9 个页面 + assets/styles.css/script.js）。
请帮我：
1) 保持现有视觉系统（CSS Variables 不动，组件类名前缀 .az-）
2) 把首页 Hero 中的 .az-mock 模拟卡，替换为一段真实的 Lottie 或 Canvas 动效，
   表现 "用户提问 → 助手调用工具 → 返回结构化结果" 的过程
3) 把 handbook.html 升级为支持搜索（⌘K）的真实文档站点，正文用 Markdown 渲染
4) 给所有页面加上路由级别的过渡动画（fade + slight slide-up）
5) 接入埋点：所有 .az-btn-primary 点击发送 az_cta_click 事件
6) 保持单文件可静态部署（不要引入构建工具，可用 ESM 通过 CDN 引入 dependencies）
```

---

## 6. 多语言支持（中 / EN / TH）

i18n 已内置在 `assets/script.js`，无需任何编译。

**工作机制**
- 全局字典 `I18N = { zh, en, th }`，key 形如 `nav.features`、`footer.copyright`、`zbao.title`。
- 任何元素打上 `data-i18n="key"`，切换语言时 `applyI18n()` 会把 `textContent` 替换为对应翻译。
- 占位符与 title 分别用 `data-i18n-placeholder` / `data-i18n-title`。
- 首选语言来源优先级：localStorage(`agentz-lang`) → `navigator.language` → `zh`。
- 顶部导航右侧自动注入 🇨🇳 中 / 🇬🇧 EN / 🇹🇭 TH 切换器；点选后切换并持久化。

**当前已覆盖 i18n 的范围**
- 顶部导航 6 项 + 「免费试用」CTA
- 页脚分类标题（产品/资源/公司）+ 标语 + 版权
- Z宝 智能助手全部 UI 文案 + 4 个常见问答回复

**扩展更多文案**
在需要翻译的文本上加 `data-i18n="your.key"`，并在 `I18N` 三种语言字典里补齐对应 key 即可。
正文长段落如尚未翻译，可暂时不加 `data-i18n`，将自然保留原中文。

---

## 7. Z宝 智能答疑悬浮 🤖

> 「Z宝」是 AgentZ 官网内嵌的智能客服 / 答疑助手，每一页右下角自动出现。

**特性**
- **零 HTML 改动**：由 `script.js` 中 `buildZbao()` 在 `DOMContentLoaded` 自动注入 body。
- **品牌一致**：FAB 圆形按钮与对话气泡头像都用 `assets/logo.png`。
- **多语**：标题、欢迎语、placeholder、常见问题 chip 全部走 i18n。
- **规则化意图匹配**：当前内置 4 个高频意图（创建助手 / 价格 / 私有化部署 / ERP·MCP 集成）+ 兜底文案；支持轻量 markdown（`**bold**` / `[text](url)`）渲染。
- **状态管理**：点击 FAB 切换面板；首次打开初始化欢迎语 + chips。

**后续可升级**
- 把 `matchAnswer()` 切到真实 RAG API（保留同样的 `appendBot()` 接口即可）。
- 接 Function Calling，让 Z宝 直接帮用户填表 / 发起试用 / 查询订单。
- 增加上下文记忆（用 sessionStorage 暂存对话历史）。

---

## 8. 后续可扩展项

- [x] 接 i18n（中/英/泰已内置；如需加日/韩，复制 `I18N.zh` 翻译即可）
- [ ] 接 CMS（Notion / Sanity）让市场同学自助更新案例
- [ ] 增加 Pricing 独立页（当前价格在 service.html）
- [ ] Hero mock 升级为可交互 Demo
- [ ] Z宝 接入真实 RAG 后端 / Function Calling
- [ ] 文档站接 Algolia DocSearch

---

**目录速览**

```
agentz-site/
├── README.md          ← 当前文件（PRD + 设计规范 + vibe coding 提示词）
├── index.html
├── features.html
├── solutions.html
├── handbook.html
├── service.html
├── developers.html
├── security.html
├── contact.html
├── legal.html
└── assets/
    ├── styles.css     ← 全部样式 + 设计 token + 语言切换器 + Z宝 悬浮
    ├── script.js      ← 主题切换 + Tabs + Nav 高亮 + i18n + Z宝 答疑
    └── logo.png       ← 品牌 logo（同时用于 favicon、.az-logo__mark、Z宝 FAB / 头像）
```
