import React from 'react';

const CATEGORIES = ['ทั้งหมด', 'การศึกษา', 'เทคโนโลยี', 'สังคม'];

export default function SearchFilter({ search, setSearch, category, setCategory, onClear, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl shadow-sm border-2 border-[#C0E4F6] mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* ช่องค้นหา */}
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-900 mb-1.5">
            🔍 ค้นหาข่าวสาร
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาตามหัวข้อ, ผู้สื่อข่าว หรือเนื้อหา..."
            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-[#C0E4F6] focus:border-tropical-500 focus:outline-none transition shadow-xs"
          />
        </div>

        {/* ตัวเลือกหมวดหมู่ */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1.5">
            📂 หมวดหมู่
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#C0E4F6] focus:border-tropical-500 focus:outline-none transition shadow-xs"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat === 'ทั้งหมด' ? '' : cat} className="text-slate-900 bg-white">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* ปุ่มค้นหา และ ปุ่มล้างเงื่อนไข */}
        <div className="flex gap-2">
          <button
            type="submit"
            style={{ color: '#ffffff' }}
            className="flex-1 bg-tropical-600 hover:bg-tropical-700 active:bg-tropical-800 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition shadow-sm hover:shadow"
          >
            🔍 ค้นหา
          </button>
          <button
            type="button"
            onClick={onClear}
            className="bg-[#C0E4F6] hover:bg-tropical-300 active:bg-tropical-400 text-slate-900 font-bold py-2.5 px-4 rounded-xl text-sm transition border border-tropical-300"
          >
            ล้างเงื่อนไข
          </button>
        </div>
      </div>
    </form>
  );
}
