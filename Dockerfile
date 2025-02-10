# 1. 使用 Node.js 的官方映像檔 
FROM node:20-alpine

# 2. 設定容器工作目錄
WORKDIR /app

# 3. 複製 package.json 和 package-lock.json
COPY package.json .
COPY package-lock.json .

# 4. 安裝依賴
RUN npm install

# 5. 複製專案目錄
COPY . .

# 6. 設定環境變量
ENV NODE_ENV=production

# 7. 設定容器啟動命令
CMD ["npm", "start"]

