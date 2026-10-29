import { useState } from 'react';
import { Newspaper, Play, Heart, Compass, ShieldCheck, Users, Award, Sparkles } from 'lucide-react';
import { CARD_NEWS } from '../data/portalData.ts';
import { CardNewsItem } from '../types/index.ts';

interface CampaignAndMediaProps {
  onOpenVideo: (title: string, videoUrl: string) => void;
  onOpenCardNews: (card: CardNewsItem) => void;
}

export default function CampaignAndMedia({
  onOpenVideo,
  onOpenCardNews,
}: CampaignAndMediaProps) {
  const [likes, setLikes] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    CARD_NEWS.forEach((c) => (init[c.id] = c.likes));
    return init;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-label="세종교육 홍보관 및 카드뉴스">
      <div className="liquid-slab p-6 sm:p-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/70 gap-2">
          <div>
            <span className="text-[11px] font-extrabold text-violet-700 tracking-wider uppercase">
              Media & Story
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              세종교육 웹진 & 카드뉴스
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            세종의 생생한 교육 현장 이야기와 유익한 교육 정보를 알기 쉽게 전달합니다.
          </p>
        </div>

        {/* 4 Card News Grid (Liquid Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARD_NEWS.map((item, idx) => {
            const gradients = [
              'from-violet-500/70 to-indigo-600/70',
              'from-teal-400/70 to-emerald-600/70',
              'from-amber-400/70 to-orange-500/70',
              'from-sky-400/70 to-blue-600/70',
            ];
            const gradient = gradients[idx % gradients.length];

            return (
              <div
                key={item.id}
                onClick={() => onOpenCardNews(item)}
                className="liquid-card overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                {/* Visual Cover Header */}
                <div className={`h-36 bg-gradient-to-tr ${gradient} p-4 flex flex-col justify-between text-white relative overflow-hidden backdrop-blur-md`}>
                  <div className="flex items-center justify-between">
                    <span className="liquid-pill-white text-slate-900 text-[10px] font-extrabold px-2.5 py-0.5 shadow-2xs">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-white/90 font-mono font-medium drop-shadow-xs">
                      {item.date}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-white drop-shadow-xs">
                      세종특별자치시교육청
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-violet-700 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <button
                      onClick={(e) => handleLike(item.id, e)}
                      className="flex items-center gap-1 hover:text-rose-600 transition-colors cursor-pointer"
                      title="좋아요"
                      aria-label="좋아요 누르기"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-50 text-rose-500" />
                      <span className="font-mono text-[11px] font-bold text-slate-600">
                        {likes[item.id]}
                      </span>
                    </button>

                    <span className="text-[11px] text-violet-700 font-bold group-hover:underline">
                      자세히 보기 →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Video & Promotional Campaign Banner (Liquid Aurora Card) */}
        <div className="liquid-aurora p-6 sm:p-8 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="liquid-gel-violet text-white text-[10px] font-extrabold px-3 py-1 inline-flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3" />
                <span>세종교육 홍보영상관</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                “새로운 학교에서 피어나는 아이들의 행복한 웃음”
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
                미래를 향해 힘차게 도약하는 세종 아이들과 열정으로 함께하는 선생님들의 현장 기록 다큐멘터리를 지금 시청해보세요.
              </p>
            </div>

            <div className="lg:col-span-4 flex items-center lg:justify-end">
              <button
                onClick={() =>
                  onOpenVideo(
                    '2026 세종미래교육 다큐멘터리: 모두가 특별해지는 교실',
                    'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
                  )
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 liquid-pill-white hover:bg-white text-slate-900 px-6 py-3.5 rounded-full font-bold text-sm shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full liquid-gel-rose text-white flex items-center justify-center shadow-xs">
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                </div>
                <span>홍보 영상 바로보기</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5 Core Pillars Infographic */}
        <div className="space-y-4">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[11px] font-extrabold text-violet-700 tracking-wider uppercase">
              5 Core Values
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">
              세종특별자치시교육청 5대 교육지표
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { title: '미래지향 맞춤형 교육', desc: '개별 맞춤 배움과 미래역량', icon: Compass, gel: 'liquid-gel-violet' },
              { title: '온전한 배움과 삶', desc: '단 한 명도 소외 없는 교육복지', icon: Heart, gel: 'liquid-gel-rose' },
              { title: '안전하고 평화로운 학교', desc: '365일 안심 배움터 마음건강', icon: ShieldCheck, gel: 'liquid-gel-teal' },
              { title: '소통과 협력의 공동체', desc: '시민과 함께 만드는 교육자치', icon: Users, gel: 'liquid-gel-blue' },
              { title: '신뢰받는 투명한 행정', desc: '청렴하고 공정한 청렴 1등급', icon: Award, gel: 'bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-white shadow-md' },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="liquid-card p-4 text-center hover:scale-[1.02] transition-transform space-y-2"
                >
                  <div className={`w-10 h-10 rounded-2xl mx-auto flex items-center justify-center ${p.gel}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-900">{p.title}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
