# 真夜 · 个人博客

## 项目概述
- **名称**：真夜的个人博客
- **目标**：展示个人信息（教育背景 / 竞赛 / 实习经历）与原创音乐作品，风格简洁、模块独立
- **主要功能**：
  - 首页：个人简介卡片（头像 / 昵称 / 专业方向 / 兴趣标签）
  - 音乐：5 首原创歌曲（开端 / 春 / 夏 / 秋 / 冬），左下角悬浮迷你播放器，支持播放/暂停/上一首/下一首/进度条/音量；「秋」额外提供 MV 弹窗播放
  - 简历：教育背景、技能、竞赛项目、获奖列表、实习经历，整合为独立板块
- 三个板块（首页 / 音乐 / 简历）通过顶部导航切换，**互相独立展示，不是同屏滚动**，支持浏览器前进/后退（hash 路由：`#home` / `#music` / `#resume`）

## URLs
- **GitHub**: https://github.com/huapu-kaf/my-blog
- **Production**: 部署后更新此处

## 数据架构
- **数据模型**：纯静态数据，定义在 `src/index.tsx` 内（tracks / competitions / awardList / internships），无数据库
- **存储服务**：无（不使用 D1 / KV / R2，纯静态站点 + 边缘渲染）
- **静态资源**：音频（mp3）、视频（mp4，秋/夏 MV 素材）、图片（头像、专辑封面、背景图）均放置于 `public/static/` 下，通过 Cloudflare Pages 静态资源服务

## 技术栈
- Hono（JSX SSR，`hono/jsx-renderer`）
- Cloudflare Pages / Workers（边缘部署）
- Vite 构建
- 纯 CSS + 原生 JS（无框架依赖，无 Tailwind）
- Font Awesome（CDN）+ Google Fonts（Noto Sans SC）

## 用户使用指南
1. 打开首页，查看个人简介
2. 点击顶部导航「音乐」，浏览 5 首原创歌曲封面，点击任意封面开始播放
3. 播放时左下角出现迷你播放器悬浮球，点击展开可控制播放/暂停/切歌/进度/音量
4. 播放「秋」时会出现 MV 按钮，点击可弹窗观看竖屏 MV
5. 点击顶部导航「简历」查看教育背景、技能、竞赛与实习经历

## 部署
- **平台**：Cloudflare Pages（Genspark 托管部署）
- **技术栈**：Hono + TypeScript + 原生 CSS/JS
- **资源声明**：项目未使用 D1 / KV / R2 / AI 绑定，`wrangler.jsonc` 中相关配置均为注释占位，无需额外资源配置
- **最后更新**：2026-08-10
