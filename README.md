# ระบบจัดการข่าวสาร (News Management System)
### ชุดข้อสอบปฏิบัติการ: ชุดที่ 2 (News)
### รหัสวิชา: 7153403

---

## 1. ข้อมูลผู้จัดทำ
- **รหัสนักศึกษา**: [ระบุรหัสนักศึกษาของคุณ]
- **ชื่อ-นามสกุล**: [ระบุชื่อ-นามสกุลของคุณ]
- **ชื่อ Repository**: `รหัสนักศึกษา_7153403_Final_B`

---

## 2. เครื่องมือและเทคโนโลยีที่ใช้ (Tech Stack)

### ฝั่ง Backend
- **Runtime**: Node.js (v20+)
- **Web Framework**: Express.js
- **ORM**: Sequelize
- **Database**: PostgreSQL (เช่น Neon Serverless PostgreSQL / Render PostgreSQL) พร้อม fallback SQLite สำหรับ Local Testing
- **Middleware**: CORS, dotenv, express.json

### ฝั่ง Frontend
- **Framework / Bundler**: React 18 + Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Hooks (`useState`, `useEffect`, `useCallback`)

### บริการ Deployment
- **Backend Deployment**: Render (Web Service)
- **Frontend Deployment**: Vercel
- **Database Hosting**: Neon.tech / Render Postgres

---

## 3. URLs สำหรับ Production

- **Frontend URL (Vercel)**: `https://<your-project>.vercel.app`
- **Backend Base URL (Render)**: `https://<your-api>.onrender.com`
- **API Health Check**: `https://<your-api>.onrender.com/health`
- **News API Endpoint**: `https://<your-api>.onrender.com/api/news`

> [!NOTE]
> **เวลาเริ่มต้นโดยประมาณเมื่อบริการพักตัว (Cold Start):**
> บริการฟรีบน Render จะเข้าสู่โหมดประหยัดพลังงาน (Spin down / Sleep) หลังไม่มี Request 15 นาที เมื่อมี Request แรกเข้ามา เซิร์ฟเวอร์จะใช้เวลาตื่นตัว (Cold Start) ประมาณ **30 - 50 วินาที**

---

## 4. โครงสร้างฐานข้อมูล (Database Schema)

ตาราง `news` มีฟิลด์ดังนี้:

| ฟิลด์ (Field) | ชนิดข้อมูล (Data Type) | ข้อกำหนด (Constraints) | คำอธิบาย |
| :--- | :--- | :--- | :--- |
| `id` | INTEGER | Primary Key, Auto Increment | รหัสข่าวสาร |
| `title` | STRING(150) | NOT NULL, trim <= 150 | หัวข้อข่าว |
| `reporter` | STRING(100) | NOT NULL, trim <= 100 | ชื่อผู้สื่อข่าว |
| `category` | STRING(50) | NOT NULL, ต้องเป็น 'การศึกษา' \| 'เทคโนโลยี' \| 'สังคม' | หมวดหมู่ข่าว |
| `publishedDate` | DATEONLY | NOT NULL, รูปแบบ YYYY-MM-DD | วันที่เผยแพร่ |
| `description` | TEXT | NULLABLE | รายละเอียดเนื้อหาข่าว |
| `status` | BOOLEAN | NOT NULL, DEFAULT true | สถานะ (true = เผยแพร่, false = ฉบับร่าง) |
| `createdAt` | TIMESTAMP | NOT NULL | วันเวลาที่สร้างข้อมูล |
| `updatedAt` | TIMESTAMP | NOT NULL | วันเวลาที่แก้ไขข้อมูลล่าสุด |

---

## 5. รูปแบบ JSON ของ API (API Endpoints & JSON Schema)

### 5.1 ดึงรายการข่าวทั้งหมด (GET `/api/news`)
รองรับ Query Parameters:
- `?search=<คำค้นหา>` (ค้นหาใน title, reporter, description, category)
- `?category=<การศึกษา|เทคโนโลยี|สังคม>` (กรองตามหมวดหมู่)
- สามารถใช้ร่วมกันได้ เช่น `/api/news?search=เทคโนโลยี&category=เทคโนโลยี`

**Status**: `200 OK`
```json
[
  {
    "id": 1,
    "title": "กระทรวงศึกษาธิการประกาศปฏิรูปหลักสูตรดิจิทัลปี 2026",
    "reporter": "สมศักดิ์ สายการศึกษา",
    "category": "การศึกษา",
    "publishedDate": "2026-01-15",
    "description": "เน้นทักษะ AI และ Data Literacy ให้แก่นักเรียนระดับมัธยมศึกษาทั่วประเทศ",
    "status": true,
    "createdAt": "2026-10-19T07:25:31.000Z",
    "updatedAt": "2026-10-19T07:25:31.000Z"
  }
]
```

---

### 5.2 ดึงข้อมูลข่าวตามรหัส (GET `/api/news/:id`)
- ตรวจสอบ `id` ต้องเป็นจำนวนเต็มบวก หากไม่ใช่ คืน `400 Bad Request`
- หากไม่พบคืน `404 Not Found`
- หากพบคืน `200 OK`

**Status**: `200 OK`
```json
{
  "id": 1,
  "title": "กระทรวงศึกษาธิการประกาศปฏิรูปหลักสูตรดิจิทัลปี 2026",
  "reporter": "สมศักดิ์ สายการศึกษา",
  "category": "การศึกษา",
  "publishedDate": "2026-01-15",
  "description": "เน้นทักษะ AI และ Data Literacy ให้แก่นักเรียนระดับมัธยมศึกษาทั่วประเทศ",
  "status": true,
  "createdAt": "2026-10-19T07:25:31.000Z",
  "updatedAt": "2026-10-19T07:25:31.000Z"
}
```

---

### 5.3 เพิ่มข่าวสารใหม่ (POST `/api/news`)
**Request Body**:
```json
{
  "title": "เปิดตัวเทคโนโลยีชิปประมวลผลควอนตัม",
  "reporter": "ธนากร เทคอัปเดต",
  "category": "เทคโนโลยี",
  "publishedDate": "2026-02-01",
  "description": "ช่วยประมวลผลการคำนวณอย่างรวดเร็ว",
  "status": true
}
```
**Response Status**: `201 Created`
```json
{
  "id": 11,
  "title": "เปิดตัวเทคโนโลยีชิปประมวลผลควอนตัม",
  "reporter": "ธนากร เทคอัปเดต",
  "category": "เทคโนโลยี",
  "publishedDate": "2026-02-01",
  "description": "ช่วยประมวลผลการคำนวณอย่างรวดเร็ว",
  "status": true,
  "createdAt": "2026-10-19T07:26:00.000Z",
  "updatedAt": "2026-10-19T07:26:00.000Z"
}
```

---

### 5.4 แก้ไขข้อมูลข่าว (PUT `/api/news/:id`)
**Response Status**: `200 OK`

---

### 5.5 ลบข้อมูลข่าว (DELETE `/api/news/:id`)
**Response Status**: `200 OK`
```json
{
  "message": "ลบข้อมูลข่าวสารสำเร็จ",
  "deletedItem": {
    "id": 11,
    "title": "เปิดตัวเทคโนโลยีชิปประมวลผลควอนตัม"
  }
}
```

---

### 5.6 การจัดการ Status Code
- `200`: การเรียกข้อมูล, แก้ไข หรือลบข้อมูลสำเร็จ
- `201`: การสร้างข้อมูลใหม่สำเร็จ
- `400`: ข้อมูลที่ส่งมาไม่ถูกต้อง (เช่น id ไม่ใช่จำนวนเต็มบวก, ขาดฟิลด์บังคับ, หมวดหมู่ไม่อยู่ในรายการที่กำหนด, ความยาวเกิน)
- `404`: ไม่พบข้อมูลตามรหัสที่ระบุ
- `500`: เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ โดยส่งข้อความทั่วไปปลอดภัย: `{"message": "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง"}`

---

## 6. วิธีติดตั้งและเริ่มระบบในเครื่อง (Local Setup)

### 6.1 ติดตั้งและรัน Backend
```bash
# 1. เข้าสู่โฟลเดอร์ backend
cd backend

# 2. ติดตั้ง Dependencies
npm install

# 3. เตรียมไฟล์ Environment (.env)
cp .env.example .env

# 4. รัน Seeder สร้างตารางและใส่ข้อมูลข่าวสารเริ่มต้น 10 รายการ
npm run seed

# 5. เริ่มต้นเซิร์ฟเวอร์ Backend (พอร์ต 5000)
npm run dev
# หรือ
npm start
```

### 6.2 ติดตั้งและรัน Frontend
```bash
# 1. เข้าสู่โฟลเดอร์ frontend
cd ../frontend

# 2. ติดตั้ง Dependencies
npm install

# 3. เตรียมไฟล์ Environment (.env)
cp .env.example .env

# 4. เริ่มต้นเซิร์ฟเวอร์ Frontend (พอร์ต 5173)
npm run dev
```
เปิดเบราว์เซอร์ไปที่: `http://localhost:5173`

---

### 6.3 วิธีรันทั้งระบบด้วย Docker & Docker Compose 🐳
สามารถเปิดทั้งฐานข้อมูล PostgreSQL, เซิร์ฟเวอร์ Backend และหน้าเว็บ Frontend พร้อมกันได้ด้วยคำสั่งเดียว:

```bash
# 1. สั่ง Build และเริ่มต้นคอนเทนเนอร์ทั้งหมดในพื้นหลัง (Background)
docker compose up -d --build

# 2. ตรวจสอบสถานะคอนเทนเนอร์
docker compose ps

# 3. ดู Log การทำงานและการ Seed ข้อมูลอัตโนมัติ
docker compose logs -f backend

# 4. เมื่อต้องการหยุดการทำงาน
docker compose down
```

**พอร์ตและทางเข้าใช้งานเมื่อรันด้วย Docker:**
* 🌐 **Frontend (Web App - Nginx)**: [http://localhost:5173](http://localhost:5173) หรือ [http://localhost](http://localhost)
* ⚙️ **Backend (API)**: [http://localhost:5000](http://localhost:5000)
* 🐘 **Database (PostgreSQL 16)**: `localhost:5432` (Username: `postgres`, Password: `postgres`, Database: `news_db`)
> *หมายเหตุ: ระบบ Docker Compose จะรัน Seeder ใส่ข้อมูลข่าวสาร 10 รายการลงใน PostgreSQL คอนเทนเนอร์ให้อัตโนมัติในครั้งแรกที่เปิดเซิร์ฟเวอร์*

---

## 7. คู่มือการ Deployment

### 7.1 การตั้งค่าฐานข้อมูลออนไลน์ (Neon.tech)
1. สมัครใช้งานที่ [neon.tech](https://neon.tech)
2. สร้าง Project ใหม่ เลือกภูมิภาคใกล้เคียง เช่น `ap-southeast-1` (Singapore)
3. คัดลอก Connection String เช่น:
   `postgresql://neondb_owner:********@ep-xxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`

### 7.2 Backend Deployment (บน Render)
- **Service Type**: Web Service
- **Root Directory**: `backend`
- **Build Command**: `npm ci`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `PORT`: `5000` (หรือปล่อยให้ Render ตั้งค่าอัตโนมัติ)
  - `DATABASE_URL`: `[Connection String ของ Neon/Render Postgres]`
  - `DB_SSL`: `true`
  - `CLIENT_URL`: `[Production URL ของ Vercel]`

### 7.3 Frontend Deployment (บน Vercel)
- **Framework Preset**: `Vite`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: `[Base URL ของ Render เช่น https://news-api.onrender.com โดยห้ามใส่ /api/news]`
"# -_674259007_Final_B"  
