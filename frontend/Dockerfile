# 1. 建立 Node.js 編譯環境
FROM node:18-alpine AS build

# 2. 設定工作目錄，複製專案並安裝依賴
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# 3. 打包前端應用程式
RUN npm run build

# 4. 使用 NGINX 來提供靜態檔案
FROM nginx:alpine

# 5. 將打包後的檔案複製到 NGINX 的根目錄
COPY --from=build /app/dist /usr/share/nginx/html

# 6. 複製 NGINX 配置來正確處理路由
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
