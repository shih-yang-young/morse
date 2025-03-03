# 使用 Node.js 18 Alpine 版本
FROM node:18-alpine

# 設定工作目錄
WORKDIR /app

# **先全域安裝 Quasar CLI**
RUN npm install -g @quasar/cli

# **先複製 package.json 和 package-lock.json**
COPY package.json package-lock.json ./

# **複製完整專案內容，避免 Quasar 認為這不是 Quasar 專案**
COPY . .

# **執行 npm install，確保 Quasar 可用**
RUN npm install

# **確保 Quasar 進行初始化**
RUN quasar prepare

# **編譯 Quasar 應用**
RUN quasar build

# **設定容器啟動時的指令**
CMD ["npm", "run", "dev"]