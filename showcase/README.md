# 网站样本册

一个用来收集和展示网站成品的静态作品集目录。

## 本地打开

直接在文件管理器中双击项目根目录的 `index.html`，浏览器会打开首页。首版没有安装依赖或构建步骤。

## 添加一个作品

编辑 `src/projects.js`，把 `window.PORTFOLIO_PROJECTS = [];` 换成下面这样的数组。将成品地址填进 `url`，可选封面放在 `assets/covers/` 中。

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

保存后刷新页面即可看到更新。部署后更新数据文件并重新部署，访客就能看到新作品。

## 项目结构

- `index.html`：页面内容和结构。
- `src/styles.css`：视觉样式与响应式布局。
- `src/projects.js`：作品数据。
- `src/app.js`：作品卡片、分类筛选和空状态。
- `docs/PROJECT.md`：产品目标和范围。
- `docs/ROADMAP.md`：开发进度和后续方向。
