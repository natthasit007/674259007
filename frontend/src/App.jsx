import React, { useState, useEffect, useCallback } from 'react';
import * as newsService from './services/newsService';
import SearchFilter from './components/SearchFilter';
import NewsForm from './components/NewsForm';
import NewsTable from './components/NewsTable';
import NewsDetailModal from './components/NewsDetailModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';

export default function App() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // เงื่อนไขการค้นหาและกรอง
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  // สถานะการแก้ไข (เมื่อคลิกปุ่มแก้ไขในตาราง)
  const [editingNews, setEditingNews] = useState(null);

  // โมดอลแสดงรายละเอียดข่าว และ โมดอลยืนยันการลบ
  const [detailNews, setDetailNews] = useState(null);
  const [deletingNews, setDeletingNews] = useState(null);

  // ดึงข้อมูลข่าวสารจาก API
  const fetchNews = useCallback(async () => {
    setLoading(true);
    setApiError('');
    try {
      const data = await newsService.getNewsList(search, category);
      setNewsList(data);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'ไม่สามารถเชื่อมต่อ API ข่าวสารได้ กรุณาตรวจสอบว่า Backend กำลังทำงานอยู่';
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  // เรียกโหลดข้อมูลเมื่อเริ่มต้น หรือเมื่อค่าค้นหา/กรองเปลี่ยน
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // ฟังก์ชันล้างเงื่อนไขการค้นหา
  const handleClearFilter = () => {
    setSearch('');
    setCategory('');
  };

  // ฟังก์ชันเพิ่มหรือแก้ไขข่าว
  const handleCreateOrUpdate = async (formData) => {
    try {
      setApiError('');
      setSuccessMessage('');

      if (editingNews) {
        await newsService.updateNews(editingNews.id, formData);
        setSuccessMessage(`แก้ไขข่าว "${formData.title}" สำเร็จ!`);
        setEditingNews(null);
      } else {
        await newsService.createNews(formData);
        setSuccessMessage(`เพิ่มข่าว "${formData.title}" เรียบร้อยแล้ว!`);
      }

      await fetchNews();

      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
      setApiError(msg);
    }
  };

  // ฟังก์ชันยืนยันการลบข่าว
  const handleDeleteConfirm = async (id) => {
    try {
      setApiError('');
      setSuccessMessage('');
      const targetTitle = deletingNews?.title;
      await newsService.deleteNews(id);
      setDeletingNews(null);
      setSuccessMessage(`ลบข่าว "${targetTitle}" สำเร็จแล้ว`);
      await fetchNews();

      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'เกิดข้อผิดพลาดในการลบข้อมูล';
      setApiError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-tropical-100/50 via-tropical-50 to-tropical-50 pb-20">
      {/* Navbar Header with Tropical Blue Theme */}
      <header className="bg-white/90 backdrop-blur-md border-b border-tropical-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 rounded-xl bg-tropical-200/60 text-tropical-800 shadow-inner">📰</span>
            <div>
              <h1 className="text-xl font-black text-tropical-900 tracking-tight flex items-center gap-2">
                ระบบจัดการข่าวสาร 
                <span className="text-xs font-bold bg-[#C0E4F6] text-tropical-900 px-2.5 py-1 rounded-lg border border-tropical-300 shadow-xs">
                  ชุด 2 (News)
                </span>
              </h1>
              <p className="text-xs text-tropical-700/80">ระบบบริหารจัดการข่าวสารและบทความออนไลน์ • Tropical Blue Theme</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-tropical-100 text-tropical-800 border border-tropical-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-tropical-500 animate-pulse"></span>
              API Connected
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 pt-6">
        {/* ข้อความแจ้งเตือนเมื่อ API ล้มเหลว */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl shadow-xs text-red-800 text-sm flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">❌</span>
              <div>
                <p className="font-bold">การเชื่อมต่อ API ล้มเหลว</p>
                <p className="text-xs text-red-600 mt-0.5">{apiError}</p>
              </div>
            </div>
            <button 
              onClick={() => setApiError('')}
              className="text-red-400 hover:text-red-600 text-sm font-bold ml-4"
            >
              ✕
            </button>
          </div>
        )}

        {/* ข้อความแจ้งเตือนเมื่อสำเร็จ */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl shadow-xs text-emerald-800 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">✅</span>
              <p className="font-medium">{successMessage}</p>
            </div>
            <button 
              onClick={() => setSuccessMessage('')}
              className="text-emerald-400 hover:text-emerald-600 text-sm font-bold ml-4"
            >
              ✕
            </button>
          </div>
        )}

        {/* ฟอร์มเพิ่ม / แก้ไขข่าวสาร */}
        <NewsForm
          onSubmit={handleCreateOrUpdate}
          editingNews={editingNews}
          onCancelEdit={() => setEditingNews(null)}
        />

        {/* กล่องค้นหาและกรองหมวดหมู่ */}
        <SearchFilter
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          onClear={handleClearFilter}
          onSearch={fetchNews}
        />

        {/* ตารางรายการข่าวสาร */}
        <NewsTable
          newsList={newsList}
          loading={loading}
          onEdit={(item) => {
            setEditingNews(item);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onDelete={(item) => setDeletingNews(item)}
          onViewDetail={(item) => setDetailNews(item)}
        />
      </main>

      {/* หน้าต่างโมดอลแสดงรายละเอียดข่าว */}
      <NewsDetailModal
        news={detailNews}
        onClose={() => setDetailNews(null)}
      />

      {/* หน้าต่างโมดอลยืนยันการลบ */}
      <ConfirmDeleteModal
        news={deletingNews}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingNews(null)}
      />
    </div>
  );
}
