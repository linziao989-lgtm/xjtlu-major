# 上传到 GitHub Pages（5 步，大约 3 分钟）

这个文件夹里的东西**就是网站根目录**，不要多一层嵌套：
`index.html` 必须在仓库的最外层。

---

## 第 1 步：建仓库

打开 https://github.com/new ，填写：

- **Repository name**：`xjtlu-major`
- **Description**：西浦大一专业分流参考 / Year-1 programme guide
- 选 **Public**（免费账号的 Pages 必须公开仓库）
- **不要**勾选 "Add a README file"
- 点 **Create repository**

---

## 第 2 步：上传文件

在新仓库页面点 **uploading an existing file**（或直接打开
`https://github.com/<你的用户名>/xjtlu-major/upload/main`）。

然后把这个文件夹里的**所有内容**（`index.html`、`css`、`js`、`assets`、`README.md`、`.nojekyll`）
一起拖进浏览器窗口。

> 拖文件夹进去时，浏览器会保留目录结构；如果它只上传了文件、没带文件夹，
> 就把 `css`、`js`、`assets` 三个文件夹分别再拖一次。

在下面填 commit message（随便写，比如 `initial site`），点 **Commit changes**。

---

## 第 3 步：开启 Pages

仓库页面 → **Settings** → 左侧 **Pages**

- **Source**：选 `Deploy from a branch`
- **Branch**：选 `main`，目录保持 `/ (root)`
- 点 **Save**

---

## 第 4 步：等 1–2 分钟

刷新 **Settings → Pages**，顶部会出现绿色提示：

> Your site is live at `https://<你的用户名>.github.io/xjtlu-major/`

第一次部署通常 30–90 秒；如果超过 5 分钟还是 404，去 **Actions** 标签页看构建记录。

---

## 第 5 步：改完东西怎么更新

以后我这边改完，你只需要：

1. 在仓库页面点 **Add file → Upload files**
2. 把改动过的文件（通常是 `index.html`、`css/style.css`、`js/*.js`，或者整个 `assets/photos/`）拖进去
3. **Commit changes**

Pages 会自动重新发布，1 分钟左右生效。

---

## 常见问题

**Q：网址能不能更短？**
能。把仓库改名为 `<你的用户名>.github.io`，网址就变成 `https://<你的用户名>.github.io/`
（每个账号只能有一个这样的仓库）。改名在 Settings → General → Repository name。

**Q：图片打不开 / 页面没样式？**
99% 是上传时丢了目录结构，检查仓库根目录下是否有 `css/`、`js/`、`assets/` 三个文件夹。

**Q：能不能不公开？**
Pages 对免费账号只支持公开仓库；私有仓库要 GitHub Pro。这个站没有敏感信息，公开没问题。

**Q：更新有延迟？**
Pages 有 CDN 缓存，强制刷新用 `Ctrl + F5`，或者等一两分钟。
