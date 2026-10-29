import { useState } from 'react';
import { ZoomIn, ZoomOut, Eye, Globe, Share2 } from 'lucide-react';

interface TopGovBarProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  isHighContrast: boolean;
  setIsHighContrast: (val: boolean) => void;
  onOpenSitemap: () => void;
}

export default function TopGovBar({
  fontSize,
  setFontSize,
  isHighContrast,
  setIsHighContrast,
  onOpenSitemap,
}: TopGovBarProps) {
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [showShareNotice, setShowShareNotice] = useState(false);

  const handleZoom = (delta: number) => {
    const next = Math.max(90, Math.min(130, fontSize + delta));
    setFontSize(next);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShowShareNotice(true);
    setTimeout(() => setShowShareNotice(false), 2000);
  };

  return (
    <div className="w-full bg-white/40 backdrop-blur-md text-slate-700 text-xs border-b border-white/60 relative z-40 transition-colors">
      {/* Official Government Identifier Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Republic of Korea Gov Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white/70 px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-800 border border-white/90 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-blue-600 via-rose-500 to-white inline-block shadow-xs" />
            <span>대한민국 정부 공공기관</span>
          </div>
          <span className="hidden sm:inline text-slate-600 text-[11px]">
            이 누리집은 대한민국 <strong className="text-slate-900 font-semibold">세종특별자치시교육청</strong> 공식 대표 누리집입니다.
          </span>
        </div>

        {/* Accessibility & Utilities */}
        <div className="flex items-center gap-2.5">
          {/* Font Scale Changer (Liquid Pill Capsule) */}
          <div className="flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-full border border-white shadow-2xs">
            <span className="text-[11px] text-slate-500 mr-0.5 font-medium">글자크기</span>
            <button
              onClick={() => handleZoom(-10)}
              className="p-0.5 text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
              title="글자 축소"
              aria-label="글자 축소"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] font-bold text-violet-700 px-1">{fontSize}%</span>
            <button
              onClick={() => handleZoom(10)}
              className="p-0.5 text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
              title="글자 확대"
              aria-label="글자 확대"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {fontSize !== 100 && (
              <button
                onClick={() => setFontSize(100)}
                className="text-[10px] text-slate-400 hover:text-slate-800 underline ml-0.5 cursor-pointer"
              >
                기본
              </button>
            )}
          </div>

          {/* High Contrast Mode Toggle */}
          <button
            onClick={() => setIsHighContrast(!isHighContrast)}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-[11px] font-semibold transition-all cursor-pointer ${
              isHighContrast
                ? 'bg-amber-400 text-black border-amber-300 font-bold shadow-md'
                : 'bg-white/80 text-slate-700 border-white hover:bg-white shadow-2xs'
            }`}
            title="시각 장애인 및 저시력자를 위한 고대비 화면 전환"
            aria-label="고대비 모드 전환"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>고대비 {isHighContrast ? 'ON' : 'OFF'}</span>
          </button>

          {/* Language Selector */}
          <div className="hidden md:flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-full border border-white shadow-2xs">
            <Globe className="w-3 h-3 text-slate-500" />
            <button
              onClick={() => setLang('ko')}
              className={`text-[11px] font-medium px-1 cursor-pointer ${
                lang === 'ko' ? 'text-violet-700 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              한국어
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setLang('en')}
              className={`text-[11px] font-medium px-1 cursor-pointer ${
                lang === 'en' ? 'text-violet-700 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              ENG
            </button>
          </div>

          {/* Sitemap Quick Link */}
          <button
            onClick={onOpenSitemap}
            className="hidden sm:inline-block text-[11px] font-medium text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
          >
            사이트맵
          </button>

          {/* Share Link */}
          <button
            onClick={handleCopyLink}
            className="p-1.5 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-950 rounded-full border border-white shadow-2xs transition-colors cursor-pointer relative"
            title="URL 주소 복사"
            aria-label="URL 주소 복사"
          >
            <Share2 className="w-3.5 h-3.5" />
            {showShareNotice && (
              <span className="absolute top-8 right-0 z-50 bg-slate-900 text-white text-[10px] px-2.5 py-1 rounded-full shadow-xl whitespace-nowrap">
                주소가 복사되었습니다!
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
