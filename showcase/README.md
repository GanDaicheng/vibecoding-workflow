# Vibe Coding 工作流网站

静态中文介绍站与成品作品目录。无需安装依赖或构建；仓库工作流会将 `showcase/` 发布到 GitHub Pages。

## 本地打开

直接双击 `index.html` 可查看 Skill 介绍页，双击 `works.html` 可查看作品目录。复制按钮在安全上下文中使用 Clipboard API；本地文件协议下若浏览器限制剪贴板，可手动复制显示的命令。也可用本地静态服务器预览，例如 `npx serve showcase`。

## 添加一个作品

编辑 `src/projects.js`，把 `window.PORTFOLIO_PROJECTS = [];` 换成下面这样的数组。将成品地址填进 `url`，可选封面放在 `assets/covers/` 中。首发保持空数组，不用占位案例。

```js
window.PORTFOLIO_PROJECTS = [
  {
    title: "作品名称",
    category: "实验工具",
    description: "用一句话介绍这个网站。",
    url: "https://example.com",
    cover: "assets/covers/example.webp",
    year: 2026,
  },
];
```

必填字段：

- `title`：作品名称。
- `category`：分类名称，页面会自动生成分类筛选按钮。
- `description`：简短介绍。
- `url`：成品网站地址。

可选字段：

- `cover`：相对于项目根目录的图片路径，例如 `assets/covers/example.webp`。没有封面时会显示样本册的图形封面。
- `year`：作品年份。

保存后刷新 `works.html` 即可看到更新。新增真实作品时，将封面放在 `assets/covers/` 并使用相对路径；提交到 `main` 后 Pages 自动重新部署。

## 页面

- `index.html`：工作流介绍、安装命令和调用示例。
- `works.html`：真实成品作品、分类筛选和空状态。
- `src/landing.js`：安装命令复制交互。
- `src/app.js`：作品卡片、类别筛选和空状态。
- `src/projects.js`：作品数据源。

正式网址：<https://gandaicheng.github.io/vibecoding-workflow/>（启用 Pages 并完成首次部署后可用）。

## 项目结构

- `index.html`、`works.html`：页面内容和结构。
- `src/styles.css`：视觉样式与响应式布局。
- `src/projects.js`：作品数据。
- `src/app.js`：作品卡片、分类筛选和空状态。
- `docs/PROJECT.md`：产品目标和范围。
- `docs/ROADMAP.md`：开发进度和后续方向。
