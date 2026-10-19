FROM node:20-alpine

WORKDIR /app

# คัดลอกเฉพาะ package.json เพื่อใช้ Docker Cache Layer
COPY package*.json ./

RUN npm ci --omit=dev

# คัดลอกโค้ดทั้งหมด
COPY . .

# เปิดพอร์ต 5000 สำหรับ Express API
EXPOSE 5000

# รัน Backend Server
CMD ["node", "index.js"]
