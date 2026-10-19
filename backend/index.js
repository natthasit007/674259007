const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || '*';

// ตั้งค่า CORS เพื่อรองรับ Frontend จาก Vercel หรือ localhost
app.use(cors({
  origin: CLIENT_URL === '*' ? '*' : CLIENT_URL.split(',').map(s => s.trim()),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'News API Server is running' });
});

// API Endpoints
app.use('/api/news', newsRoutes);

// Fallback 404 Not Found
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// ซิงค์ฐานข้อมูลและเริ่มต้นเซิร์ฟเวอร์
sequelize.sync().then(() => {
  console.log('Database synced successfully.');
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT} at http://0.0.0.0:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to sync database:', err.message);
});
