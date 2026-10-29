import { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  Paperclip,
  Eye,
  Calendar,
  PhoneCall,
  Filter,
} from 'lucide-react';
import { NOTICES_DATA } from '../data/portalData.ts';
import { NoticeItem, NoticeCategory } from '../types/index.ts';
import { filterNotices, formatKoreanDate } from '../utils/portal.ts';

interface NoticeBoardSectionProps {
  onSelectNotice: (notice: NoticeItem) => void;
  activeCategory: NoticeCategory;
  setActiveCategory: (cat: NoticeCategory) => void;
}

export default function NoticeBoardSection({
  onSelectNotice,
  activeCategory,
  setActiveCategory,
}: NoticeBoardSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { key: NoticeCategory; label: string }[] = [
    { key: 'all', label: '전체소식' },
    { key: 'notice', label: '공지사항' },
    { key: 'announcement', label: '고시·공고' },
    { key: 'recruitment', label: '채용정보' },
    { key: 'press', label: '보도자료' },
    { key: 'tender', label: '입찰정보' },
  ];

  const filteredNotices = useMemo(() => {
    return filterNotices(NOTICES_DATA, activeCategory, searchQuery);
  }, [activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: NOTICES_DATA.length };
    NOTICES_DATA.forEach((n) => {
      counts[n.category] = (counts[n.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <section id="notices" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-label="세종교육 알림마당">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Main Notice Board (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="liquid-slab p-6 sm:p-7 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-extrabold text-violet-700 tracking-wider uppercase">
                  Notice & Information
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                  세종교육 알림마당
                </h2>
              </div>

              {/* Quick Search Within Board (Pill Input) */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="공고명, 부서명 검색..."
                  className="w-full liquid-pill-white text-xs pl-8 pr-8 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-violet-400 font-medium"
                  aria-label="게시물 검색"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Tabs (Liquid Segmented Tabs Container like reference image) */}
            <div className="liquid-tabs-container flex items-center gap-1 overflow-x-auto">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.key;
                const count = categoryCounts[cat.key] || 0;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'liquid-gel-violet text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
                    }`}
                    aria-selected={isActive}
                    role="tab"
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Notice List */}
            <div className="divide-y divide-slate-100/90 rounded-2xl overflow-hidden bg-white/70 border border-white">
              {filteredNotices.length === 0 ? (
                <div className="p-10 text-center text-slate-500 space-y-2">
                  <Filter className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-sm font-semibold">검색 조건에 맞는 공고가 없습니다.</p>
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchQuery('');
                    }}
                    className="text-xs text-violet-700 hover:underline font-semibold cursor-pointer"
                  >
                    검색 초기화
                  </button>
                </div>
              ) : (
                filteredNotices.map((notice) => (
                  <button
                    key={notice.id}
                    onClick={() => onSelectNotice(notice)}
                    className="w-full text-left p-4 hover:bg-white/90 transition-all group flex items-start justify-between gap-4 cursor-pointer focus:outline-hidden"
                    aria-label={`${notice.title} 열기`}
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        {notice.isUrgent && (
                          <span className="liquid-gel-rose text-white font-extrabold px-2 py-0.2 shadow-2xs">
                            긴급
                          </span>
                        )}
                        {notice.isNew && (
                          <span className="liquid-gel-teal text-white font-extrabold px-2 py-0.2 shadow-2xs">
                            NEW
                          </span>
                        )}
                        <span className="text-violet-800 bg-violet-50 font-bold px-2 py-0.5 rounded-full border border-violet-100">
                          {notice.department}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500 font-mono text-[11px]">
                          {formatKoreanDate(notice.date)}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-violet-700 transition-colors truncate">
                        {notice.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-1 font-normal">
                        {notice.content.slice(0, 90)}...
                      </p>
                    </div>

                    <div className="hidden sm:flex flex-col items-end shrink-0 text-slate-400 text-xs space-y-1">
                      {notice.attachments && notice.attachments.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-violet-700 bg-violet-50/80 px-2 py-0.5 rounded-full border border-violet-200">
                          <Paperclip className="w-3 h-3" />
                          <span>첨부 {notice.attachments.length}</span>
                        </span>
                      )}
                      <span className="text-[11px] flex items-center gap-1 font-mono text-slate-500">
                        <Eye className="w-3 h-3" />
                        <span>{notice.views}</span>
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Academic Calendar & Help Desk (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Education Calendar Widget (Liquid Prismatic Card) */}
          <div className="liquid-prismatic-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-violet-800" />
                <h3 className="font-extrabold text-slate-900 text-sm">
                  주간 주요 교육일정
                </h3>
              </div>
              <span className="liquid-pill-white text-[11px] font-mono font-bold text-violet-700 px-2.5 py-0.5 shadow-2xs">
                2026년 10월~11월
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white flex items-start gap-3 shadow-2xs">
                <div className="w-12 text-center shrink-0">
                  <span className="block text-[10px] font-extrabold text-violet-800">11.07</span>
                  <span className="liquid-gel-violet inline-block text-[10px] text-white font-black px-1.5 py-0.2">
                    D-10
                  </span>
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900">
                    2026 공립 임용 1차 시험
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    장소: 아름고, 어진중 (08:30 입실)
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white flex items-start gap-3 shadow-2xs">
                <div className="w-12 text-center shrink-0">
                  <span className="block text-[10px] font-extrabold text-teal-800">11.10</span>
                  <span className="liquid-gel-teal inline-block text-[10px] text-white font-black px-1.5 py-0.2">
                    D-13
                  </span>
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900">
                    중학교 신입생 배정원서
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    관내 초등학교 6학년 대상
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white flex items-start gap-3 shadow-2xs">
                <div className="w-12 text-center shrink-0">
                  <span className="block text-[10px] font-extrabold text-amber-700">11.18</span>
                  <span className="bg-gradient-to-b from-amber-400 to-amber-600 inline-block text-[10px] text-white font-black px-1.5 py-0.2 rounded-full shadow-2xs">
                    D-21
                  </span>
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900">
                    통학구역 행정예고 마감
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    교육복지과 18:00 접수 마감
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call Center Box (Liquid Aurora Glass Card) */}
          <div className="liquid-aurora p-6 space-y-3">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-violet-800" />
              <span className="text-xs font-extrabold text-violet-900">
                세종교육 통합안내센터
              </span>
            </div>

            <div className="text-2xl font-black text-slate-900 tracking-tight font-mono">
              044-320-1000
            </div>
            <p className="text-[11px] text-slate-600 font-medium">
              평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)
            </p>

            <div className="pt-3 border-t border-white/60 grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-500">교원임용 문의:</span>
                <span className="block font-bold text-slate-900">044-320-3114</span>
              </div>
              <div>
                <span className="text-slate-500">학폭·학생상담:</span>
                <span className="block font-bold text-slate-900">044-320-117</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
