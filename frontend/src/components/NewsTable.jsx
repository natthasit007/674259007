import React from 'react';

const CATEGORY_STYLES = {
  'การศึกษา': 'bg-purple-100 text-purple-900 border-purple-300 font-bold',
  'เทคโนโลยี': 'bg-[#C0E4F6] text-slate-900 border-tropical-400 font-bold',
  'สังคม': 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold'
};

export default function NewsTable({ newsList, loading, onEdit, onDelete, onViewDetail }) {
  if (loading) {
    return (
      <div className="bg-white p-16 text-center rounded-2xl shadow-sm border-2 border-[#C0E4F6]">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-tropical-500 border-t-transparent mb-3"></div>
        <p className="text-slate-800 font-bold text-sm">กำลังโหลดข้อมูลข่าวสาร...</p>
      </div>
    );
  }

  if (!newsList || newsList.length === 0) {
    return (
      <div className="bg-white p-16 text-center rounded-2xl shadow-sm border-2 border-[#C0E4F6]">
        <div className="text-4xl mb-3">📭</div>
        <h3 className="text-base font-bold text-slate-900 mb-1">ไม่พบข้อมูลข่าวสาร</h3>
        <p className="text-slate-600 text-sm">ยังไม่มีรายการข่าว หรือไม่มีข้อมูลที่ตรงกับเงื่อนไขการค้นหา</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border-2 border-[#C0E4F6] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-tropical-100 border-b-2 border-[#C0E4F6] text-slate-900 text-xs font-black uppercase tracking-wider">
              <th className="py-3.5 px-4 w-16 text-slate-900">#</th>
              <th className="py-3.5 px-4 text-slate-900">หัวข้อข่าว</th>
              <th className="py-3.5 px-4 text-slate-900">ผู้สื่อข่าว</th>
              <th className="py-3.5 px-4 text-slate-900">หมวดหมู่</th>
              <th className="py-3.5 px-4 text-slate-900">วันที่เผยแพร่</th>
              <th className="py-3.5 px-4 text-slate-900">สถานะ</th>
              <th className="py-3.5 px-4 text-center w-52 text-slate-900">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {newsList.map((item) => (
              <tr key={item.id} className="hover:bg-tropical-50/60 transition">
                <td className="py-3.5 px-4 font-mono text-xs font-bold text-slate-500">
                  {item.id}
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs truncate">
                  {item.title}
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-800">
                  {item.reporter}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs border ${CATEGORY_STYLES[item.category] || 'bg-slate-100 text-slate-900'}`}>
                    {item.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                  {item.publishedDate}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  {item.status ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      เผยแพร่
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                      ฉบับร่าง
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1.5">
                    {/* ปุ่มดูรายละเอียด */}
                    <button
                      type="button"
                      onClick={() => onViewDetail(item)}
                      className="px-2.5 py-1 text-xs bg-[#C0E4F6] hover:bg-tropical-300 active:bg-tropical-400 text-slate-900 rounded-lg font-bold transition border border-tropical-300"
                      title="ดูรายละเอียด"
                    >
                      รายละเอียด
                    </button>
                    {/* ปุ่มแก้ไข */}
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="px-2.5 py-1 text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg font-bold transition border border-amber-300"
                      title="แก้ไข"
                    >
                      แก้ไข
                    </button>
                    {/* ปุ่มลบ */}
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      className="px-2.5 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-900 rounded-lg font-bold transition border border-red-300"
                      title="ลบ"
                    >
                      ลบ
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-3.5 bg-tropical-50 border-t border-[#C0E4F6] text-xs text-slate-800 flex justify-between items-center px-4 font-semibold">
        <span>จำนวนข่าวทั้งหมด: <strong className="text-slate-900 font-black">{newsList.length}</strong> รายการ</span>
      </div>
    </div>
  );
}
