import axios from 'axios';

// คำนวณ Base URL ป้องกันปัญหาเรื่อง trailing slash หรือการระบุ prefix ซ้ำซ้อน
const rawUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').trim().replace(/\/+$/, '');
let apiEndpoint = rawUrl;

if (!apiEndpoint.endsWith('/api/news')) {
  if (apiEndpoint.endsWith('/api')) {
    apiEndpoint = `${apiEndpoint}/news`;
  } else {
    apiEndpoint = `${apiEndpoint}/api/news`;
  }
}

const api = axios.create({
  baseURL: apiEndpoint,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 1. ดึงรายการข่าวทั้งหมด พร้อมค้นหาและกรองหมวดหมู่
export const getNewsList = async (search = '', category = '') => {
  const params = {};
  if (search && search.trim()) params.search = search.trim();
  if (category && category.trim()) params.category = category.trim();

  const response = await api.get('', { params });
  return response.data;
};

// 2. ดึงข้อมูลข่าวตาม id
export const getNewsById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// 3. สร้างข่าวใหม่
export const createNews = async (newsData) => {
  const response = await api.post('', newsData);
  return response.data;
};

// 4. แก้ไขข้อมูลข่าว
export const updateNews = async (id, newsData) => {
  const response = await api.put(`/${id}`, newsData);
  return response.data;
};

// 5. ลบข้อมูลข่าว
export const deleteNews = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
