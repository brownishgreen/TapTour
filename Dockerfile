FROM node:18

WORKDIR /app

# 複製 package.json
COPY package.json package-lock.json ./
RUN npm install

# 複製整個專案
COPY . .

EXPOSE 8080
EXPOSE 5173

# 啟動前後端
CMD ["npm", "start"]
