# 建立前端
FROM node:20 AS frontend
WORKDIR /app
COPY frontend ./
RUN npm install && npm run build

# 建立後端
FROM node:18
WORKDIR /app
COPY backend ./backend
WORKDIR /app/backend
COPY backend/package.json ./
COPY backend/package-lock.json ./
RUN ls -la /app/backend
RUN npm install --omit=dev

# 設定環境變數
ENV PORT=8080

# 確保 8080 端口開放
EXPOSE 8080

# 啟動應用
CMD ["node", "app.js"]
