# 使用官方 Node.js 18 映像
FROM node:18

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝 npm 依賴
RUN npm install

# 複製所有專案檔案
COPY . .

# 設定環境變數（Cloud Run 預設使用 PORT 8080）
ENV PORT=8080

# 開啟 8080 端口
EXPOSE 8080

# 啟動應用
CMD ["npm", "start"]
