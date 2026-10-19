# Stage 1: Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# คัดลอก package.json เพื่อติดตั้ง Dependencies
COPY package*.json ./
RUN npm ci

# คัดลอกโค้ดทั้งหมด
COPY . .

# กำหนด VITE_API_URL ในช่วง Build (ค่าเริ่มต้นคือ http://localhost:5000)
ARG VITE_API_URL=http://localhost:5000
ENV VITE_API_URL=$VITE_API_URL

# บิลด์ไฟล์ Production สำหรับ Frontend (ได้โฟลเดอร์ dist)
RUN npm run build

# Stage 2: Production Nginx Server
FROM nginx:alpine

# คัดลอกไฟล์ที่บิลด์แล้วจาก Stage 1 ไปยัง Nginx Web Root
COPY --from=builder /app/dist /usr/share/nginx/html

# คัดลอกคอนฟิก Nginx สำหรับรองรับ SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# เปิดพอร์ต 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
