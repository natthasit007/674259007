import React from 'react';

const CATEGORY_STYLES = {
  'การศึกษา': 'bg-purple-100 text-purple-900 border-purple-300 font-bold',
  'เทคโนโลยี': 'bg-[#C0E4F6] text-slate-900 border-tropical-400 font-bold',
  'สังคม': 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold'
};

export default function NewsDetailModal({ news, onClose }) {
  if (!news) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border-2 border-[#C0E4F6]">
        {/* Header */}
        <div className="p-6 border-b border-[#C0E4F6] flex items-start justify-between bg-tropical-100">
          <div>
            <span className="text-xs font-mono text-slate-600 font-bold">ข่าวรหัส #{news.id}</span>
            <h3 className="text-xl font-black text-slate-900 mt-1 leading-snug">
              {news.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 p-1.5 rounded-lg hover:bg-[#C0E4F6] transition font-black text-lg"
          >
            ✕
          </button>
        </div>

        {/* Badges / Meta Info */}
        <div className="px-6 py-3.5 bg-tropical-50/50 border-b border-tropical-200 flex flex-wrap gap-2 text-xs">
          <span className={`px-2.5 py-1 rounded-full border ${CATEGORY_STYLES[news.category] || 'bg-slate-100 text-slate-900'}`}>
            หมวดหมู่: {news.category}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white text-slate-900 font-bold border border-slate-300">
            ผู้สื่อข่าว: {news.reporter}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white text-slate-900 font-bold border border-slate-300">
            วันที่เผยแพร่: {news.publishedDate}
          </span>
          <span className={`px-2.5 py-1 rounded-full border font-bold ${news.status ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-amber-100 text-amber-900 border-amber-300'}`}>
            สถานะ: {news.status ? 'เผยแพร่แล้ว' : 'ฉบับร่าง'}
          </span>
        </div>

        {/* เนื้อหาข่าว */}
        <div className="p-6 text-sm text-slate-900 leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto font-medium">
          {news.description ? (
            <p className="bg-tropical-50/40 p-4 rounded-xl border border-tropical-200 text-slate-900">{news.description}</p>
          ) : (
            <p className="text-slate-500 italic">ไม่มีรายละเอียดเนื้อหาข่าวเพิ่มเติม</p>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-tropical-50 border-t border-[#C0E4F6] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#C0E4F6] hover:bg-tropical-300 text-slate-900 font-bold text-sm rounded-xl transition border border-tropical-300 shadow-xs"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
}
