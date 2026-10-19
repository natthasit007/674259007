import React from 'react';

export default function ConfirmDeleteModal({ news, onConfirm, onCancel }) {
  if (!news) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border-2 border-[#C0E4F6]">
        <div className="flex items-center gap-3 text-red-600 mb-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-lg font-bold">
            ⚠️
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">ยืนยันการลบข่าวสาร</h3>
            <span className="text-xs text-slate-500 font-medium">การกระทำนี้ไม่สามารถย้อนกลับได้</span>
          </div>
        </div>

        <p className="text-sm text-slate-700 mb-3 font-medium">
          คุณแน่ใจหรือไม่ว่าต้องการลบข่าวสารหัวข้อนี้ออกจากระบบ?
        </p>

        {/* แสดงชื่อหัวข้อข่าวอย่างชัดเจน */}
        <div className="p-3.5 bg-red-50 border border-red-300 rounded-xl text-sm text-red-950 font-black mb-6 break-words">
          "{news.title}"
        </div>

        <div className="flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            style={{ color: '#1e293b' }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-sm font-bold transition border border-slate-300"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={() => onConfirm(news.id)}
            style={{ color: '#ffffff' }}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-lg text-sm font-bold transition shadow-sm hover:shadow"
          >
            🗑️ ยืนยันการลบ
          </button>
        </div>
      </div>
    </div>
  );
}
