const { Op } = require('sequelize');
const { News, sequelize } = require('../models');

const ALLOWED_CATEGORIES = ['การศึกษา', 'เทคโนโลยี', 'สังคม'];

// ตรวจสอบว่า id เป็นจำนวนเต็มบวกหรือไม่
const isValidPositiveInteger = (val) => {
  if (typeof val === 'number') {
    return Number.isInteger(val) && val > 0;
  }
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (!/^\d+$/.test(trimmed)) return false;
    const num = Number(trimmed);
    return Number.isInteger(num) && num > 0;
  }
  return false;
};

// ตรวจสอบรูปแบบวันที่ YYYY-MM-DD
const isValidDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
};

// 1. GET /api/news (ค้นหา + กรองหมวดหมู่พร้อมกันได้)
exports.getAllNews = async (req, res) => {
  try {
    const { search, category } = req.query;
    const whereConditions = {};

    // กรองตามหมวดหมู่
    if (category && typeof category === 'string' && category.trim()) {
      whereConditions.category = category.trim();
    }

    // ค้นหาตามคำสำคัญ (หัวข้อ, ผู้สื่อข่าว, รายละเอียด, หมวดหมู่)
    if (search && typeof search === 'string' && search.trim()) {
      const keyword = `%${search.trim()}%`;
      const likeOp = sequelize.getDialect() === 'postgres' ? Op.iLike : Op.like;
      whereConditions[Op.or] = [
        { title: { [likeOp]: keyword } },
        { reporter: { [likeOp]: keyword } },
        { description: { [likeOp]: keyword } },
        { category: { [likeOp]: keyword } }
      ];
    }

    const newsList = await News.findAll({
      where: whereConditions,
      order: [['publishedDate', 'DESC'], ['id', 'DESC']]
    });

    return res.status(200).json(newsList);
  } catch (error) {
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง' });
  }
};

// 2. GET /api/news/:id
exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidPositiveInteger(id)) {
      return res.status(400).json({ message: 'รหัสข่าวสาร (id) ต้องเป็นจำนวนเต็มบวกเท่านั้น' });
    }

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลข่าวสารที่ระบุ' });
    }

    return res.status(200).json(news);
  } catch (error) {
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง' });
  }
};

// 3. POST /api/news
exports.createNews = async (req, res) => {
  try {
    let { title, reporter, category, publishedDate, description, status } = req.body;

    title = title !== undefined && title !== null ? String(title).trim() : '';
    reporter = reporter !== undefined && reporter !== null ? String(reporter).trim() : '';
    category = category !== undefined && category !== null ? String(category).trim() : '';
    description = description !== undefined && description !== null ? String(description).trim() : '';

    if (!title) {
      return res.status(400).json({ message: 'กรุณากรอกหัวข้อข่าว' });
    }
    if (title.length > 150) {
      return res.status(400).json({ message: 'หัวข้อข่าวต้องมีความยาวไม่เกิน 150 ตัวอักษร' });
    }

    if (!reporter) {
      return res.status(400).json({ message: 'กรุณากรอกชื่อผู้สื่อข่าว' });
    }
    if (reporter.length > 100) {
      return res.status(400).json({ message: 'ชื่อผู้สื่อข่าวต้องมีความยาวไม่เกิน 100 ตัวอักษร' });
    }

    if (!category || !ALLOWED_CATEGORIES.includes(category)) {
      return res.status(400).json({ 
        message: `หมวดหมู่ต้องเป็นอย่างใดอย่างหนึ่งในนี้: ${ALLOWED_CATEGORIES.join(', ')}` 
      });
    }

    if (!publishedDate || !isValidDate(publishedDate)) {
      return res.status(400).json({ message: 'วันที่เผยแพร่ต้องถูกต้องตามรูปแบบ YYYY-MM-DD' });
    }

    const newNews = await News.create({
      title,
      reporter,
      category,
      publishedDate,
      description: description || null,
      status: status !== undefined ? Boolean(status) : true
    });

    return res.status(201).json(newNews);
  } catch (error) {
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง' });
  }
};

// 4. PUT /api/news/:id
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidPositiveInteger(id)) {
      return res.status(400).json({ message: 'รหัสข่าวสาร (id) ต้องเป็นจำนวนเต็มบวกเท่านั้น' });
    }

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลข่าวสารที่ต้องการแก้ไข' });
    }

    let { title, reporter, category, publishedDate, description, status } = req.body;

    title = title !== undefined && title !== null ? String(title).trim() : '';
    reporter = reporter !== undefined && reporter !== null ? String(reporter).trim() : '';
    category = category !== undefined && category !== null ? String(category).trim() : '';
    description = description !== undefined && description !== null ? String(description).trim() : '';

    if (!title) {
      return res.status(400).json({ message: 'กรุณากรอกหัวข้อข่าว' });
    }
    if (title.length > 150) {
      return res.status(400).json({ message: 'หัวข้อข่าวต้องมีความยาวไม่เกิน 150 ตัวอักษร' });
    }

    if (!reporter) {
      return res.status(400).json({ message: 'กรุณากรอกชื่อผู้สื่อข่าว' });
    }
    if (reporter.length > 100) {
      return res.status(400).json({ message: 'ชื่อผู้สื่อข่าวต้องมีความยาวไม่เกิน 100 ตัวอักษร' });
    }

    if (!category || !ALLOWED_CATEGORIES.includes(category)) {
      return res.status(400).json({ 
        message: `หมวดหมู่ต้องเป็นอย่างใดอย่างหนึ่งในนี้: ${ALLOWED_CATEGORIES.join(', ')}` 
      });
    }

    if (!publishedDate || !isValidDate(publishedDate)) {
      return res.status(400).json({ message: 'วันที่เผยแพร่ต้องถูกต้องตามรูปแบบ YYYY-MM-DD' });
    }

    await news.update({
      title,
      reporter,
      category,
      publishedDate,
      description: description || null,
      status: status !== undefined ? Boolean(status) : news.status
    });

    return res.status(200).json(news);
  } catch (error) {
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง' });
  }
};

// 5. DELETE /api/news/:id
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidPositiveInteger(id)) {
      return res.status(400).json({ message: 'รหัสข่าวสาร (id) ต้องเป็นจำนวนเต็มบวกเท่านั้น' });
    }

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลข่าวสารที่ต้องการลบ' });
    }

    await news.destroy();
    return res.status(200).json({ message: 'ลบข้อมูลข่าวสารสำเร็จ', deletedItem: news });
  } catch (error) {
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง' });
  }
};
