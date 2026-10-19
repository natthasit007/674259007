const { sequelize, News } = require('../models');

const sampleNews = [
  {
    title: 'กระทรวงศึกษาธิการประกาศปฏิรูปหลักสูตรดิจิทัลปี 2026',
    reporter: 'สมศักดิ์ สายการศึกษา',
    category: 'การศึกษา',
    publishedDate: '2026-01-15',
    description: 'เน้นทักษะ AI และ Data Literacy ให้แก่นักเรียนระดับมัธยมศึกษาทั่วประเทศ เพื่อเตรียมความพร้อมสู่ตลาดแรงงานสากล',
    status: true
  },
  {
    title: 'มหาวิทยาลัยชั้นนำเปิดตัวคอร์สเรียนฟรีออนไลน์สำหรับบุคคลทั่วไป',
    reporter: 'กมลวรรณ ธรรมดี',
    category: 'การศึกษา',
    publishedDate: '2026-02-10',
    description: 'มีหลักสูตรให้เลือกกว่า 50 รายวิชา สามารถสะสมหน่วยกิตและรับใบประกาศนียบัตรรับรองทักษะได้ทันที',
    status: true
  },
  {
    title: 'โครงการวิจัยแนวโน้มการศึกษานอกระบบในยุคใหม่',
    reporter: 'อภิชาต วัฒนา',
    category: 'การศึกษา',
    publishedDate: '2026-03-05',
    description: 'เอกสารร่างโครงการและข้อเสนอแนะในการพัฒนาระบบการเรียนรู้ตลอดชีวิตสำหรับผู้ใหญ่และผู้สูงวัย',
    status: false
  },
  {
    title: 'เปิดตัวเทคโนโลยีชิปประมวลผลควอนตัมขนาดเล็กรุ่นแรกสำหรับการแพทย์',
    reporter: 'ธนากร เทคอัปเดต',
    category: 'เทคโนโลยี',
    publishedDate: '2026-02-01',
    description: 'ช่วยประมวลผลและวิเคราะห์โครงสร้างโปรตีนเพื่อผลิตยารักษาโรคได้อย่างรวดเร็วกว่าเดิม 100 เท่า',
    status: true
  },
  {
    title: 'เทรนด์เทคโนโลยี Cloud Computing และ Serverless ในภูมิภาคเอเชีย',
    reporter: 'ปิยะดา นวัตกรรม',
    category: 'เทคโนโลยี',
    publishedDate: '2026-02-28',
    description: 'องค์กรกว่า 70% ย้ายโครงสร้างพื้นฐานขึ้นคลาวด์เพื่อความยืดหยุ่นและลดต้นทุนการดูแลศูนย์ข้อมูล',
    status: true
  },
  {
    title: 'รายงานการทดสอบเทคโนโลยีเครือข่ายดาวเทียมวงโคจรต่ำฉบับร่าง',
    reporter: 'ธนากร เทคอัปเดต',
    category: 'เทคโนโลยี',
    publishedDate: '2026-03-12',
    description: 'เอกสารทดสอบความเร็วอินเทอร์เน็ตและความหน่วงของสัญญาณในพื้นที่ทุรกันดารทางภาคเหนือ',
    status: false
  },
  {
    title: 'กรุงเทพฯ ขยายพื้นที่สวนสาธารณะสีเขียวเพิ่ม 5 แห่ง',
    reporter: 'วิชัย ชุมชนเมือง',
    category: 'สังคม',
    publishedDate: '2026-01-20',
    description: 'ส่งเสริมการออกกำลังกาย สุขภาพจิตที่ดี และช่วยดูดซับมลพิษฝุ่น PM 2.5 ในเขตชุมชนหนาแน่น',
    status: true
  },
  {
    title: 'โครงการอาสาสมัครดูแลผู้สูงอายุในชุมชนชานเมือง',
    reporter: 'พิมพา ช่วยสังคม',
    category: 'สังคม',
    publishedDate: '2026-02-14',
    description: 'สร้างเครือข่ายจิตอาสาช่วยเหลือและตรวจสุขภาพเบื้องต้นให้กับผู้สูงอายุติดบ้านและผู้ป่วยเรื้อรัง',
    status: true
  },
  {
    title: 'แคมเปญลดขยะพลาสติกในตลาดสดชุมชน',
    reporter: 'วิชัย ชุมชนเมือง',
    category: 'สังคม',
    publishedDate: '2026-03-01',
    description: 'รณรงค์การใช้ถุงผ้า ตะกร้า และกล่องใส่อาหารเพื่อลดขยะพลาสติกแบบใช้ครั้งเดียวทิ้งในตลาดสด',
    status: true
  },
  {
    title: 'แผนงานจัดตั้งศูนย์เยาวชนเพื่อการเรียนรู้สร้างสรรค์',
    reporter: 'พิมพา ช่วยสังคม',
    category: 'สังคม',
    publishedDate: '2026-03-15',
    description: 'ร่างแผนงานเบื้องต้นเพื่อเสนอของบประมาณในการจัดสร้างพื้นที่แลกเปลี่ยนไอเดียและศิลปะสำหรับเยาวชน',
    status: false
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting and syncing database...');
    await sequelize.sync({ force: true });
    console.log('Database synced. Seeding sample news items...');
    await News.bulkCreate(sampleNews);
    console.log('Seeded 10 news items successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding news database:', error);
    process.exit(1);
  }
};

seedDatabase();
