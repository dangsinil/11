import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Bell, ArrowRight, UserCheck, CheckCircle2, MessageSquareText, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data/portalData.ts';

interface HeroBannerProps {
  onSlideClick: (category: string) => void;
  onOpenSuperintendent: () => void;
}

export default function HeroBanner({ onSlideClick, onOpenSuperintendent }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8" aria-label="주요 정책 알림 및 교육감실">
      {/* Rolling Urgent Announcement Ribbon (Liquid Pill) */}
      <div className="mb-5 flex items-center justify-between gap-3 liquid-pill-white px-4 py-2 text-xs shadow-sm">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="liquid-gel-rose text-white text-[10px] font-extrabold px-2.5 py-0.5 shadow-2xs shrink-0 flex items-center gap-1">
            <Bell className="w-3 h-3" />
            <span>주요알림</span>
          </span>
          <span className="truncate text-slate-700 hover:text-violet-700 transition-colors font-medium">
            📢 2026학년도 관내 초등학교 통학구역 설정 행정예고 의견수렴 (2026.10.28 ~ 11.18)
          </span>
        </div>
        <a
          href="#notices"
          className="hidden sm:inline-flex items-center gap-1 text-slate-500 hover:text-violet-700 shrink-0 font-semibold text-[11px]"
        >
          <span>상세보기</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* Master Frosted Acrylic Slab (Directly matching the outer rounded glass slab in the reference image) */}
      <div className="liquid-slab p-6 sm:p-10 relative overflow-hidden">
        {/* Subtle internal chromatic refraction bloom */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-violet-200/40 via-cyan-200/30 to-pink-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left: Campaign Slider Content (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Tag Capsules (styled like the glossy pills in reference image) */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="liquid-gel-violet text-white text-xs font-bold px-3.5 py-1 flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3 h-3" />
                <span>{slide.tag}</span>
              </span>
              <span className="liquid-pill-white text-slate-600 text-xs font-semibold px-3 py-1 shadow-2xs">
                {slide.badgeText}
              </span>
            </div>

            {/* Headline and Description */}
            <div className="min-h-[140px] sm:min-h-[120px] transition-all">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-slate-900">
                {slide.title}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
                {slide.subtitle}
              </p>
              <p className="mt-1 text-xs text-slate-500 hidden sm:block">
                {slide.description}
              </p>
            </div>

            {/* Action Buttons & Slider Controls */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {/* Primary Action Button (Glossy Violet Gel Pill like image) */}
              <button
                onClick={() => onSlideClick(slide.category)}
                className="liquid-gel-violet px-6 py-3 text-sm font-bold shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group"
              >
                <span>{slide.linkText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Slider Controls (Glass Pill Capsule with Waterdrop buttons) */}
              <div className="flex items-center gap-2 liquid-pill-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-2xs">
                <span className="font-mono text-violet-700 font-bold">
                  0{currentSlide + 1}
                </span>
                <span className="text-slate-300">/</span>
                <span className="font-mono text-slate-400">
                  0{HERO_SLIDES.length}
                </span>

                <div className="h-3 w-px bg-slate-200 mx-1" />

                <button
                  onClick={() =>
                    setCurrentSlide(
                      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
                    )
                  }
                  className="liquid-bubble w-6 h-6 flex items-center justify-center text-slate-600 hover:text-violet-700 cursor-pointer"
                  title="이전 슬라이드"
                  aria-label="이전 슬라이드"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="liquid-bubble w-6 h-6 flex items-center justify-center text-slate-600 hover:text-violet-700 cursor-pointer"
                  title={isPlaying ? '슬라이드 정지' : '슬라이드 재생'}
                  aria-label={isPlaying ? '슬라이드 정지' : '슬라이드 재생'}
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>

                <button
                  onClick={() =>
                    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
                  }
                  className="liquid-bubble w-6 h-6 flex items-center justify-center text-slate-600 hover:text-violet-700 cursor-pointer"
                  title="다음 슬라이드"
                  aria-label="다음 슬라이드"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center gap-2 pt-1">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? 'w-8 bg-violet-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`${idx + 1}번 슬라이드로 이동`}
                />
              ))}
            </div>
          </div>

          {/* Right: Superintendent Box (Styled as the Aurora Liquid Glass Card from bottom-right of reference image) */}
          <div className="lg:col-span-4">
            <div className="liquid-aurora p-6 relative overflow-hidden group hover:scale-[1.01] transition-transform">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-13 h-13 rounded-full bg-white/90 p-1 shadow-md border border-white flex items-center justify-center shrink-0">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-violet-600 to-teal-400 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-[11px] text-violet-800 font-extrabold uppercase tracking-wide">
                    열린 교육감실
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                    제5대 세종특별자치시교육감
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    "새로운 학교, 행복한 아이들"
                  </p>
                </div>
              </div>

              <blockquote className="text-xs text-slate-700 bg-white/70 backdrop-blur-md rounded-2xl p-3.5 border border-white/80 leading-relaxed mb-4 shadow-2xs font-medium">
                “세종의 모든 아이가 저마다의 꿈과 재능을 마음껏 꽃피울 수 있도록 따뜻한 책임교육을 실현하겠습니다.”
              </blockquote>

              <div className="grid grid-cols-2 gap-2 text-center text-xs mb-4">
                <div className="liquid-pill-white p-2.5 shadow-2xs">
                  <div className="text-[10px] text-slate-500 font-medium">공약이행률</div>
                  <div className="text-sm font-black text-teal-700 flex items-center justify-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>94.2%</span>
                  </div>
                </div>
                <div className="liquid-pill-white p-2.5 shadow-2xs">
                  <div className="text-[10px] text-slate-500 font-medium">시민제안수렴</div>
                  <div className="text-sm font-black text-violet-700 flex items-center justify-center gap-1 mt-0.5">
                    <MessageSquareText className="w-3.5 h-3.5 text-violet-600" />
                    <span>1,840건</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons as Smooth White Pills */}
              <div className="flex gap-2">
                <button
                  onClick={onOpenSuperintendent}
                  className="flex-1 py-2.5 liquid-pill-white hover:bg-white text-slate-800 text-xs font-bold text-center cursor-pointer shadow-sm"
                >
                  인사말 및 공약
                </button>
                <a
                  href="#community"
                  className="flex-1 py-2.5 liquid-gel-violet text-white text-xs font-bold text-center cursor-pointer shadow-sm"
                >
                  교육감에게 바란다
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
