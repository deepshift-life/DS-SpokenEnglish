# DS Spoken English

DS Spoken English（DS 速通英语）是一个面向英语口语练习的 Web 应用，聚焦“听懂 → 跟读 → 输出 → 复习”的练习闭环。项目采用 pnpm workspace + Turborepo 组织，前端应用基于 Next.js。

## 功能概览

- **每日练习**：内置多场景口语单元，按短语块进行听力、跟读和输出训练。
- **AI 场景生成**：根据场景和用户水平生成定制化学习单元。
- **AI 自由对话**：选择真实场景，与 AI 进行英语对话练习。
- **发音与录音**：支持浏览器录音、TTS 播放、转写和发音评分接口。
- **复习与进度**：记录学习进度、连续天数和复习任务。
- **资源同步**：预留百度网盘授权与资源同步能力。

## 技术栈

- **框架**：Next.js 15、React 19、TypeScript
- **样式**：Tailwind CSS
- **状态管理**：Zustand
- **本地数据**：Dexie
- **动画**：Framer Motion
- **工程化**：pnpm workspace、Turborepo

## 目录结构

```txt
.
├── apps/
│   └── web/              # Next.js Web 应用
├── packages/
│   ├── audio/            # 录音、播放、TTS 等音频工具
│   ├── core/             # 核心业务逻辑
│   ├── db/               # 本地数据库封装
│   ├── types/            # 共享类型
│   └── ui/               # 共享 UI 组件
├── scripts/              # 项目级脚本
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## 环境要求

- Node.js >= 20
- pnpm >= 9

## 快速开始

```bash
pnpm install
cp apps/web/.env.local.example apps/web/.env.local
pnpm dev:web
```

启动后访问：

```txt
http://localhost:3000
```

## GitHub Pages 预览

本仓库已内置 GitHub Pages 静态预览工作流：`.github/workflows/pages.yml`。

由于 GitHub Pages 只能托管静态文件，预览版会保留主要页面、内置单元、跟读流程、复习和本地进度；服务端 API 相关能力会以提示或模拟数据降级，包括 AI 对话、AI 生成单元、TTS 服务端合成、ASR 转写、发音评分和百度网盘同步。

启用步骤：

1. 将代码推送到 GitHub 仓库的 `pages-preview` 分支。
2. 打开仓库 `Settings` → `Pages`。
3. 在 `Build and deployment` 中选择 `GitHub Actions`。
4. 等待 `Deploy GitHub Pages preview` 工作流完成。

发布地址：

```txt
https://deepshift-life.github.io/DS-SpokenEnglish/
```

本地验证静态预览构建：

```bash
pnpm build:pages
```

## 环境变量

环境变量示例位于 `apps/web/.env.local.example`。本地开发时复制为 `apps/web/.env.local` 后填写实际值。

| 变量 | 用途 | 是否必填 |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | AI 对话与内容生成 | 使用 AI 功能时必填 |
| `ANTHROPIC_BASE_URL` | Anthropic 兼容代理地址 | 可选 |
| `ELEVENLABS_API_KEY` | ElevenLabs TTS 发音 | 可选，不填则降级到浏览器 Web Speech API |
| `OPENAI_API_KEY` | Whisper ASR 转写 | 使用转写时必填 |
| `XUNFEI_APP_ID` | 科大讯飞发音评分 | 使用评分时必填 |
| `XUNFEI_API_KEY` | 科大讯飞发音评分 | 使用评分时必填 |
| `XUNFEI_API_SECRET` | 科大讯飞发音评分 | 使用评分时必填 |
| `BAIDU_APP_KEY` | 百度 OAuth / 网盘同步 | 使用百度同步时必填 |
| `BAIDU_SECRET_KEY` | 百度 OAuth / 网盘同步 | 使用百度同步时必填 |
| `BAIDU_REDIRECT_URI` | 百度 OAuth 回调地址 | 使用百度同步时必填 |

> `apps/web/.env.local` 包含本地密钥，不应提交到 Git。

## 常用命令

```bash
# 启动全部开发任务
pnpm dev

# 只启动 Web 应用
pnpm dev:web

# 构建全部 workspace
pnpm build

# 构建 Web 应用
pnpm --filter web build

# 生成内容
pnpm gen:content
```

## Workspace 包

- `@ds/audio`：录音、音频播放、TTS fallback、时间格式化等工具。
- `@ds/types`：学习单元、短语块、资源、进度等共享类型。
- `@ds/core`：核心业务能力的共享入口。
- `@ds/db`：浏览器端本地存储与同步相关封装。
- `@ds/ui`：跨应用复用的 React UI 组件。

## 开发说明

- 项目使用 workspace 依赖，修改 `packages/*` 后建议重新构建对应包或重启 dev server。
- `.next`、`dist`、`node_modules`、`.env.local` 等构建产物和本地配置已被 `.gitignore` 排除。
- 若遇到 workspace 包导出不一致，可先运行对应包的构建命令，例如：

```bash
pnpm --filter @ds/audio build
```
