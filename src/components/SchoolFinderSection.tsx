import { useState, useMemo } from 'react';
import { School, MapPin, Phone, ExternalLink, Search, Users } from 'lucide-react';
import { SCHOOLS_DATA } from '../data/portalData.ts';
import { SchoolLevel } from '../types/index.ts';
import { filterSchools } from '../utils/portal.ts';

export default function SchoolFinderSection() {
  const [activeLevel, setActiveLevel] = useState<SchoolLevel>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const levels: { key: SchoolLevel; label: string }[] = [
    { key: 'all', label: '전체 (20개+)' },
    { key: 'elementary', label: '초등학교' },
    { key: 'middle', label: '중학교' },
    { key: 'high', label: '고등학교' },
    { key: 'special', label: '특수학교' },
    { key: 'institute', label: '직속기관' },
  ];

  const filteredSchools = useMemo(() => {
    return filterSchools(SCHOOLS_DATA, activeLevel, searchTerm);
  }, [activeLevel, searchTerm]);

  const getLevelBadge = (level: SchoolLevel) => {
    switch (level) {
      case 'elementary':
        return <span className="liquid-gel-teal text-white text-[10px] font-extrabold px-2 py-0.5 shadow-2xs">초등학교</span>;
      case 'middle':
        return <span className="liquid-gel-blue text-white text-[10px] font-extrabold px-2 py-0.5 shadow-2xs">중학교</span>;
      case 'high':
        return <span className="liquid-gel-violet text-white text-[10px] font-extrabold px-2 py-0.5 shadow-2xs">고등학교</span>;
      case 'special':
        return <span className="liquid-gel-rose text-white text-[10px] font-extrabold px-2 py-0.5 shadow-2xs">특수학교</span>;
      case 'institute':
        return <span className="bg-gradient-to-b from-amber-400 to-amber-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-2xs">직속기관</span>;
      default:
        return <span className="liquid-pill-white text-slate-700 text-[10px] font-extrabold px-2 py-0.5 shadow-2xs">학교</span>;
    }
  };

  return (
    <section id="schools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-label="관내 학교 및 직속기관 찾기">
      <div className="liquid-slab p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold text-violet-700 tracking-wider uppercase">
              School Directory
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              세종 관내 학교 및 직속기관 안내
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              세종특별자치시 관내 유치원, 초·중·고등학교 및 교육청 산하 직속기관 정보를 손쉽게 검색하세요.
            </p>
          </div>

          {/* Search Input (Smooth White Pill) */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="학교명, 지역명(보람동, 아름동...) 검색"
              className="w-full liquid-pill-white text-xs pl-9 pr-8 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-violet-400 font-medium"
              aria-label="학교 검색"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Level Filters (Liquid Tabs Container) */}
        <div className="liquid-tabs-container flex items-center gap-1 overflow-x-auto">
          {levels.map((lvl) => {
            const isActive = activeLevel === lvl.key;
            return (
              <button
                key={lvl.key}
                onClick={() => setActiveLevel(lvl.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'liquid-gel-violet text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
                }`}
                aria-pressed={isActive}
              >
                {lvl.label}
              </button>
            );
          })}
        </div>

        {/* Schools Card Grid (Liquid Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSchools.map((school) => (
            <div
              key={school.id}
              className="liquid-card p-4 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getLevelBadge(school.level)}
                    <span className="liquid-pill-white text-[10px] font-bold text-slate-600 px-2 py-0.5 shadow-2xs">
                      {school.district}
                    </span>
                  </div>
                  {school.establishedYear > 0 && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      개교 {school.establishedYear}년
                    </span>
                  )}
                </div>

                <h3 className="font-black text-slate-900 text-base">
                  {school.name}
                </h3>

                <div className="space-y-1 text-xs text-slate-600 font-medium">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{school.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <a
                      href={`tel:${school.tel}`}
                      className="font-mono text-violet-700 hover:underline"
                    >
                      {school.tel}
                    </a>
                  </div>
                  {school.studentsCount > 0 && (
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>재학생: 약 {school.studentsCount}명</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                <a
                  href={school.homepageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-violet-700 hover:text-violet-900 hover:underline"
                  aria-label={`${school.name} 홈페이지 새창 열기`}
                >
                  <span>학교 누리집 방문</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
