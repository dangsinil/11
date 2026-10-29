import { X, ExternalLink, Compass } from 'lucide-react';
import { GNB_MENU } from '../../data/portalData.ts';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SitemapModal({ isOpen, onClose }: SitemapModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sitemap-modal-title"
    >
      <div className="liquid-slab bg-white/92 backdrop-blur-3xl w-full max-w-4xl rounded-3xl shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900/90 via-indigo-950/90 to-purple-950/90 text-white px-6 py-4 flex items-center justify-between border-b border-white/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-xs">
              <Compass className="w-5 h-5 text-indigo-200" />
            </div>
            <div>
              <h2 id="sitemap-modal-title" className="text-base font-bold text-white">
                세종특별자치시교육청 전체 사이트맵
              </h2>
              <p className="text-[11px] text-indigo-200/90">
                교육청 주요 행정 서비스 및 누리집 종합 안내도
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer border border-white/30"
            aria-label="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sitemap Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 flex-1">
          {GNB_MENU.map((menu) => (
            <div key={menu.title} className="liquid-card bg-white/70 p-5 rounded-2xl space-y-3 hover:translate-y-[-2px] transition-all">
              <h3 className="font-extrabold text-sm text-indigo-950 border-b border-indigo-200/50 pb-2.5 flex items-center justify-between">
                <span>{menu.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-semibold border border-indigo-200/60">
                  메뉴 바로가기
                </span>
              </h3>

              <ul className="space-y-2.5">
                {menu.subcategories.map((sub) => (
                  <li key={sub.name}>
                    <a
                      href={menu.href}
                      onClick={onClose}
                      className="group block text-xs text-slate-700 hover:text-indigo-700 transition-colors"
                    >
                      <div className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors flex items-center justify-between">
                        <span>{sub.name}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{sub.desc}</div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-white/40 px-6 py-3.5 border-t border-white/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 liquid-gel-violet text-white text-xs font-bold rounded-full shadow-md cursor-pointer hover:brightness-105"
          >
            사이트맵 닫기
          </button>
        </div>
      </div>
    </div>
  );
}
