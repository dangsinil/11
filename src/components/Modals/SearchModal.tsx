import { useState, useMemo } from 'react';
import { Search, X, FileText, School, ExternalLink, ArrowRight } from 'lucide-react';
import { NOTICES_DATA, SCHOOLS_DATA, GNB_MENU } from '../../data/portalData.ts';
import { NoticeItem, SchoolItem } from '../../types/index.ts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNotice: (notice: NoticeItem) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelectNotice,
}: SearchModalProps) {
  const [query, setQuery] = useState('');

  const quickKeywords = ['늘봄학교', '채용공고', '초등학교 통학구역', '임용시험', '보람초', '국제고', '시설예약', '제증명'];

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const matchedNotices = NOTICES_DATA.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.department.toLowerCase().includes(q)
    );

    const matchedSchools = SCHOOLS_DATA.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.district.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q)
    );

    const matchedMenus: { menu: string; sub: string; desc: string }[] = [];
    GNB_MENU.forEach((m) => {
      m.subcategories.forEach((sub) => {
        if (sub.name.toLowerCase().includes(q) || sub.desc.toLowerCase().includes(q)) {
          matchedMenus.push({
            menu: m.title,
            sub: sub.name,
            desc: sub.desc,
          });
        }
      });
    });

    return {
      notices: matchedNotices,
      schools: matchedSchools,
      menus: matchedMenus,
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-12 bg-slate-900/40 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
    >
      <div className="liquid-slab bg-white/95 backdrop-blur-3xl w-full max-w-3xl shadow-2xl border border-white overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-white bg-white/60 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full liquid-gel-violet text-white flex items-center justify-center shrink-0">
            <Search className="w-4 h-4 text-white" />
          </div>
          <input
            type="text"
            id="search-modal-title"
            value={query}
            autoFocus
            onChange={(e) => setQuery(e.target.value)}
            placeholder="찾으시는 공고, 학교, 교육정책, 메뉴명을 입력하세요..."
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 placeholder-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-800 p-1 cursor-pointer font-bold"
            >
              지우기
            </button>
          )}
          <button
            onClick={onClose}
            className="liquid-bubble w-7 h-7 flex items-center justify-center text-slate-700 hover:text-rose-600 cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Keywords */}
        <div className="px-5 py-2.5 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 shrink-0 font-semibold text-[11px]">추천 검색어:</span>
          {quickKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => setQuery(kw)}
              className="bg-slate-100 hover:bg-blue-50 hover:text-blue-700 px-2.5 py-1 rounded-full text-slate-600 shrink-0 transition-colors text-[11px] font-medium cursor-pointer"
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {!searchResults ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Search className="w-10 h-10 mx-auto text-slate-300 stroke-1" />
              <p className="text-sm font-medium">검색어를 입력하시면 관련 공고와 학교를 실시간으로 검색합니다.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Menu Results */}
              {searchResults.menus.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <span>메뉴 바로가기 ({searchResults.menus.length}건)</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {searchResults.menus.map((m, idx) => (
                      <div
                        key={idx}
                        onClick={onClose}
                        className="p-2.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors cursor-pointer text-xs"
                      >
                        <div className="font-bold text-blue-700">{m.sub}</div>
                        <div className="text-[11px] text-slate-500 truncate">{m.menu} &gt; {m.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notice Results */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>알림마당 공고 검색결과 ({searchResults.notices.length}건)</span>
                </h3>
                {searchResults.notices.length === 0 ? (
                  <p className="text-xs text-slate-400 py-2">일치하는 공고가 없습니다.</p>
                ) : (
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                    {searchResults.notices.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => {
                          onClose();
                          onSelectNotice(n);
                        }}
                        className="w-full text-left p-3 hover:bg-blue-50/60 transition-colors flex items-start justify-between gap-3 text-xs cursor-pointer"
                      >
                        <div className="space-y-1 truncate">
                          <span className="font-bold text-slate-900 truncate block">
                            {n.title}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {n.department} | {n.date}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* School Results */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-emerald-600" />
                  <span>관내 학교/기관 검색결과 ({searchResults.schools.length}건)</span>
                </h3>
                {searchResults.schools.length === 0 ? (
                  <p className="text-xs text-slate-400 py-2">일치하는 학교가 없습니다.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {searchResults.schools.map((s) => (
                      <div
                        key={s.id}
                        className="p-3 rounded-lg border border-slate-200 text-xs space-y-1"
                      >
                        <div className="font-bold text-slate-900 flex items-center justify-between">
                          <span>{s.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal">[{s.district}]</span>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">{s.address}</div>
                        <div className="text-[11px] font-mono text-blue-600">{s.tel}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
