# 建立前端
FROM node:18 AS frontend
WORKDIR /app
COPY frontend ./
RUN npm install && npm run build

# 建立後端
FROM node:18
WORKDIR /app
COPY backend ./
COPY --from=frontend /app/dist ./frontend/dist
RUN npm install

# 設定環境變數
ENV PORT=8080

# 確保 8080 端口開放
EXPOSE 8080

# 啟動應用
CMD ["node", "app.js"]
