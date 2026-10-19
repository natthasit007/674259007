const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // รองรับการต่อ Database Online เช่น Neon, Render Postgres, Supabase
  const isSsl = process.env.DB_SSL === 'true' || process.env.DATABASE_URL.includes('sslmode=require');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: isSsl ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {},
    logging: false
  });
} else if (process.env.DB_DIALECT === 'sqlite' || !process.env.DB_HOST) {
  // ค่าเริ่มต้นสำหรับการรันในเครื่องแบบไม่ต้องเปิด PostgreSQL server ก่อน
  const storagePath = process.env.DB_STORAGE 
    ? path.resolve(__dirname, '..', process.env.DB_STORAGE) 
    : path.resolve(__dirname, '..', 'database.sqlite');

  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath,
    logging: false
  });
} else {
  // การต่อกับ PostgreSQL / MySQL ผ่าน Environment variables แยก
  sequelize = new Sequelize(
    process.env.DB_NAME || 'news_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'postgres',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: process.env.DB_DIALECT || 'postgres',
      logging: false,
      dialectOptions: process.env.DB_SSL === 'true' ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      } : {}
    }
  );
}

module.exports = sequelize;
