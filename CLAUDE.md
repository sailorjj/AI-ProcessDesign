# AI-ProcessDesign — AI 流程设计平台

> 本文件是 AI-ProcessDesign 项目的项目级执行规范，每次会话启动时自动加载。
> 通用工程规范（铁律、Agent 调度、署名、测试闭环）见全局 `~/.claude/CLAUDE.md`，本文件只写项目特有内容。

---

## 一、项目概述

AI-ProcessDesign 是基于开源项目 [next-ai-draw-io](https://github.com/DayuanJiang/next-ai-draw-io)（Apache-2.0）**深度定制**的 AI 流程设计平台：用自然语言与 AI 对话，在真实 draw.io 画布上绘制/编辑流程图、架构图、时序图。

**定位**：深度定制开发（非体验/调研），需要时直接修改上游源码，加 WHY 注释。

**核心能力（上游已有）**：
- 一句话生成流程图/架构图，内置 AWS/Azure/GCP/K8s 图标库
- 对话式编辑（流式上画布、选中局部修改、版本卡片对比/回退/撤销）
- 截图/手绘重绘、PDF/Markdown/代码内容转图
- 25 个模型提供商（含 OpenAI 兼容预设），浏览器端自填 API Key
- Web 应用 + Electron 桌面应用（Win/Mac/Linux）+ MCP Server

## 二、技术栈

| 层次 | 技术 | 备注 |
|------|------|------|
| 框架 | Next.js（App Router）+ TypeScript | `app/` 目录 |
| 画布 | draw.io embed（`scripts/fetch-drawio.mjs` 拉取） | predev/prebuild 自动执行 |
| AI | Vercel AI SDK 多提供商（`@ai-sdk/*`，含 deepseek） | 模型配置在浏览器端 |
| 桌面端 | Electron（`electron/`，`dist-electron/`） | |
| Lint/格式化 | Biome（`npm run check`） | 非 ESLint/Prettier |
| 测试 | Vitest（`npm test`）+ Playwright E2E（`npm run test:e2e`） | |
| 部署 | opennextjs-cloudflare（Cloudflare）/ Dockerfile | |

## 三、常用命令

```bash
npm run dev          # 开发模式（端口 6002，turbopack；自动先拉 draw.io 静态资源）
npm run build        # 生产构建
npm start            # 生产运行（端口 6001）
npm run check        # Biome 静态检查（提交前必过）
npm test             # Vitest 单元测试
npm run test:e2e     # Playwright E2E
npm run electron:dev # Electron 桌面开发模式
```

## 四、开发规则（项目特有）

1. **上游源码可改**：深度定制定位，需要时直接改，加 WHY 注释；注意保留与上游同步的可能性（大改动前评估 rebase/merge 成本）
2. **License**：上游 Apache-2.0（兼容）；新增依赖仍须过全局 license 红线
3. **模型接入**：优先使用国产/私有化模型（DeepSeek 等），走 AI SDK 的 OpenAI 兼容或现有 provider 扩展
4. **画布交互**：draw.io 通过 embed iframe 集成，所有画布操作走其 XML 契约，不在前端自绘图元

## 五、Agent 调度

使用 devkit 插件（`devkit:` 前缀，见全局规范第四章）。项目暂无专属 agent；后续如沉淀流程图领域专属 agent/skill，放本项目 `.claude/agents|skills/` 下。

## 六、文档索引

| 文档 | 用途 |
|------|------|
| `README.md` | 上游项目说明（英文） |
| `docs/cn/README_CN.md` | 上游中文说明 |
| `docs/` | 上游多语言文档与 shape 库说明 |
