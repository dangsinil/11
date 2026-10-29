import { useState } from 'react';
import { Search, Menu, X, ChevronDown, Plus } from 'lucide-react';
import { GNB_MENU } from '../data/portalData.ts';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenSitemap: () => void;
  onSelectCategory?: (category: string) => void;
}

export default function Header({
  onOpenSearch,
  onOpenSitemap,
  onSelectCategory,
}: HeaderProps) {
  const [activeGnb, setActiveGnb] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-2xl border-b border-white/80 shadow-xs transition-all">
      {/* Main Branding Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <a href="/" className="flex items-center gap-3.5 group cursor-pointer focus:outline-hidden">
          {/* Liquid Glass Logo Badge with specular shine */}
          <div className="relative w-12 h-12 rounded-2xl bg-white/80 p-1 shadow-md border border-white/90 flex items-center justify-center shrink-0 backdrop-blur-xl group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-500/20 via-teal-400/20 to-purple-500/20 flex items-center justify-center relative overflow-hidden">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute w-6 h-6 rounded-full bg-blue-600/15 border-2 border-blue-600 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-blue-600 to-teal-400" />
                </div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-tl-full bg-teal-400/80 transform rotate-12" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-tr-full bg-purple-500/80 transform -rotate-12" />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                세종특별자치시교육청
              </span>
              <span className="hidden xl:inline-block bg-white/80 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white shadow-2xs">
                모두가 특별해지는 세종교육
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-500 tracking-wider font-semibold uppercase">
              SEJONG SPECIAL SELF-GOVERNING CITY OFFICE OF EDUCATION
            </span>
          </div>
        </a>

        {/* Quick Action Tools on Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Liquid Glass Search Pill (Styled exactly like the "Search projects..." pill with circular button in reference image) */}
          <button
            onClick={onOpenSearch}
            className="flex items-center justify-between gap-3 bg-white/90 hover:bg-white text-slate-600 px-4 py-1.5 rounded-full border border-white shadow-sm hover:shadow transition-all cursor-pointer group w-72"
            aria-label="통합검색 열기"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
              <span className="text-xs text-slate-500 truncate">통합검색 (늘봄학교, 채용...)</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </div>
          </button>

          {/* Quick link: 채용공고 바로보기 as Liquid Mint/Teal Gel Pill */}
          <a
            href="#notices"
            onClick={() => onSelectCategory?.('recruitment')}
            className="liquid-gel-teal px-4 py-2 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>채용공고 확인</span>
          </a>

          {/* 전체메뉴: Liquid Violet Gel Capsule Button (like the top-left button in reference image) */}
          <button
            onClick={onOpenSitemap}
            className="liquid-gel-violet px-4 py-2 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            aria-label="전체메뉴 사이트맵 열기"
          >
            <Menu className="w-4 h-4" />
            <span>전체메뉴</span>
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenSearch}
            className="liquid-bubble p-2 text-slate-700"
            aria-label="검색창 열기"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="liquid-bubble p-2 text-slate-700"
            aria-label="모바일 메뉴 토글"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Main Navigation Bar (GNB) */}
      <nav className="hidden lg:block border-t border-white/60 bg-white/40" aria-label="메인 메뉴">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-between">
            {GNB_MENU.map((item, idx) => (
              <li
                key={item.title}
                className="relative group py-2"
                onMouseEnter={() => setActiveGnb(idx)}
                onMouseLeave={() => setActiveGnb(null)}
              >
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1 px-4 py-2 text-[15px] font-bold text-slate-700 hover:text-violet-700 transition-colors focus:outline-hidden rounded-full hover:bg-white/60"
                >
                  <span>{item.title}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600 transition-transform group-hover:rotate-180" />
                </a>

                {/* Sub Dropdown Menu with Liquid Glass Styling */}
                {activeGnb === idx && (
                  <div className="absolute left-0 top-full w-72 liquid-card bg-white/90 p-4 shadow-2xl border border-white z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[12px] font-bold text-violet-700 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
                      <span>{item.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">세종시교육청</span>
                    </div>
                    <ul className="space-y-1">
                      {item.subcategories.map((sub) => (
                        <li key={sub.name}>
                          <a
                            href={item.href}
                            className="block px-3 py-2 rounded-xl hover:bg-white/80 text-slate-700 hover:text-violet-700 transition-all text-sm font-medium hover:shadow-2xs"
                          >
                            <div className="font-semibold text-[13px]">{sub.name}</div>
                            <div className="text-[11px] text-slate-400 truncate">{sub.desc}</div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Navigation with Frosted Liquid Glass */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/60 bg-white/95 backdrop-blur-2xl shadow-2xl max-h-[80vh] overflow-y-auto">
          <div className="p-4 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-center gap-2 liquid-pill-white py-3 text-sm text-slate-700 font-medium"
            >
              <Search className="w-4 h-4 text-violet-600" />
              <span>통합검색 실행하기</span>
            </button>

            <div className="space-y-2">
              {GNB_MENU.map((item) => (
                <div key={item.title} className="border-b border-slate-100/80 pb-2">
                  <div className="text-sm font-bold text-slate-900 py-2 px-1 text-violet-900">
                    {item.title}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 pl-2">
                    {item.subcategories.map((sub) => (
                      <a
                        key={sub.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs text-slate-600 hover:text-violet-700 py-1.5 px-2 rounded-lg hover:bg-white"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSitemap();
                }}
                className="w-full py-3 liquid-gel-violet text-white text-xs font-bold text-center"
              >
                전체 사이트맵 보기
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
