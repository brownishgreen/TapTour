# 📇 TapTour — 旅遊平台（Full-stack）

一個以「活動 / 景點 / 商品」為核心的旅遊服務平台，讓使用者能搜尋、追蹤喜愛的活動，並一站式購買票券與用品、留言評價與管理個人旅遊檔案。
**TapTour** 提供前台消費者體驗與後台管理功能，整合 Google Maps、檔案上傳與第三方登入，後端為 Node.js + Express，資料庫為 MySQL（Sequelize）。

* Built with **React + Vite + Node.js/Express + MySQL/Sequelize**
* 支援 Google Cloud Storage 檔案上傳、Google OAuth、Swagger API 文件

---

## Demo / 說明

* 🔗 Live Demo / https://yuanologue.com/#/projects/taptour
* 🔗 GitHub Repo: https://github.com/brownishgreen/TapTour
* 📽️ https://youtu.be/GG404dTFyzw

---

## Features 功能與特色

1. **搜尋活動 / 景點 / 商品** — 關鍵字搜尋與分類篩選。
2. **追蹤喜愛（Follow / Favorite）** — 追蹤活動、商品或其他旅行者。
3. **留言與評論系統** — 在活動／商品頁面留下留言與評價。
4. **個人旅遊檔案** — 顯示追蹤項目、收藏、歷史訂單等。
5. **一站式購物與訂單** — 建立訂單並於個人管理頁面查看訂單
6. **管理後台** — 管理員可新增/編輯/刪除活動、景點、商品，並指派管理員權限；前台可直接刪除特定留言（依授權）。
7. **地圖整合** — Google Maps API 顯示景點與座標。
8. **檔案上傳** — 圖片上傳並儲存於 Google Cloud Storage。
9. **驗證與安全** — JWT 驗證、bcrypt 密碼雜湊、Passport (Google OAuth) 支援。
10. **API 文件** — Swagger (OpenAPI) 提供互動式 API 文件。

---

## Tech Stack 技術棧

**Frontend**

* React (function components + hooks)
* Vite
* SCSS / Bootstrap / Swiper
* react-router-dom, @react-google-maps/api

**Backend**

* Node.js + Express
* MySQL + Sequelize
* Joi（request validation）
* multer / @google-cloud/storage（檔案上傳）
* passport / passport-google-oauth20
* jsonwebtoken (JWT)
* swagger-jsdoc + swagger-ui-express

**Dev Tools**

* nodemon, sequelize-cli

---

## Install & Run（開發流程）

### Backend

```bash
cd backend
npm install

# 開發（nodemon）
npm run dev

#### Sequelize migration / seed

```bash
# 確認 config 與 .env 設定正確後
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### Frontend

```bash
cd frontend
npm install

# 開發（Vite）
npm run dev

---

## Author

👤 **Jim(brownishgreen) and Cen(Ryan5381)**

* Github: [@Ryan5381 \/ @brownishgreen]( https://github.com/Ryan5381 / https://github.com/brownishgreen )

