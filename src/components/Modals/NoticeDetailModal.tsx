import { useState } from 'react';
import { X, Calendar, Eye, Building, Download, Printer, Share2, Check, FileText } from 'lucide-react';
import { NoticeItem } from '../../types/index.ts';
import { formatKoreanDate } from '../../utils/portal.ts';

interface NoticeDetailModalProps {
  notice: NoticeItem | null;
  onClose: () => void;
}

export default function NoticeDetailModal({ notice, onClose }: NoticeDetailModalProps) {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!notice) return null;

  const handleDownload = (filename: string) => {
    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notice-modal-title"
    >
      <div className="liquid-slab bg-white/90 backdrop-blur-3xl w-full max-w-3xl shadow-2xl border border-white overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600/90 via-purple-600/80 to-indigo-600/90 text-white px-6 py-4 flex items-center justify-between border-b border-white/30">
          <div className="flex items-center gap-2">
            <span className="liquid-pill-white text-violet-800 text-[10px] font-black px-2.5 py-0.5 shadow-2xs">
              {notice.category.toUpperCase()}
            </span>
            <span className="text-xs text-white/90 font-medium">세종특별자치시교육청 공식 알림</span>
          </div>
          <button
            onClick={onClose}
            className="liquid-bubble w-7 h-7 flex items-center justify-center text-slate-700 hover:text-rose-600 cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Title & Metadata */}
          <div className="space-y-3 pb-4 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                <Building className="w-3.5 h-3.5" />
                <span>{notice.department}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>등록일: {formatKoreanDate(notice.date)}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>조회수: {notice.views}회</span>
              </span>
            </div>

            <h2 id="notice-modal-title" className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {notice.title}
            </h2>
          </div>

          {/* Notice Main Content */}
          <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line bg-slate-50/70 p-5 rounded-xl border border-slate-100 font-sans">
            {notice.content}
          </div>

          {/* Attachments Section */}
          {notice.attachments && notice.attachments.length > 0 && (
            <div className="space-y-2 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>첨부파일 ({notice.attachments.length}건)</span>
              </h4>

              <div className="space-y-1.5">
                {notice.attachments.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                        {file.type}
                      </span>
                      <span className="truncate text-slate-800 font-medium">{file.name}</span>
                      <span className="text-[11px] text-slate-400 shrink-0">({file.size})</span>
                    </div>

                    <button
                      onClick={() => handleDownload(file.name)}
                      className="ml-2 inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold shrink-0 cursor-pointer text-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>내려받기</span>
                    </button>
                  </div>
                ))}
              </div>

              {downloadSuccess && (
                <div className="mt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 p-2 rounded border border-emerald-200">
                  <Check className="w-3.5 h-3.5" />
                  <span>'{downloadSuccess}' 파일 다운로드가 시작되었습니다.</span>
                </div>
              )}
            </div>
          )}

          {/* Inquiries */}
          <div className="bg-slate-100 p-3.5 rounded-lg text-xs text-slate-600 flex items-center justify-between">
            <span>본 공고 및 정책에 대한 문의사항은 세종특별자치시교육청 {notice.department}로 연락 바랍니다.</span>
            <span className="font-mono font-bold text-blue-700">044-320-1000</span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white/60 px-6 py-4 border-t border-white flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="liquid-pill-white hover:bg-white text-slate-700 px-4 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>화면 인쇄</span>
          </button>

          <button
            onClick={onClose}
            className="liquid-gel-violet px-6 py-2.5 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
}
