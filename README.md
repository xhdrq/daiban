# easyWeb Todo H5

一个纯静态的 H5 待办清单，支持：

- 新增待办
- 标记完成
- 删除任务
- `全部 / 进行中 / 已完成` 筛选
- `localStorage` 本地持久化

## 本地打开

这是一个无后端、无构建步骤的静态页面，直接双击 `index.html` 即可打开。

如果你想跑一下核心逻辑测试：

```bash
npm test
```

## 部署到 GitHub Pages

1. 在 GitHub 新建一个仓库。
2. 把本项目推上去。
3. 仓库里已经带了 `.github/workflows/deploy.yml`，推送到默认分支后会自动部署。
4. 在 GitHub 仓库设置里打开 `Pages`，Source 选择 `GitHub Actions`。
5. 等待 Action 跑完后，就能得到线上地址。

## 建议的初始化命令

```bash
git init
git add .
git commit -m "feat: add simple todo h5"
```
