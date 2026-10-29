import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl: string;
}

export default function VideoModal({ isOpen, onClose, title, videoUrl }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div className="liquid-slab bg-slate-900/90 backdrop-blur-3xl w-full max-w-3xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-white/5">
          <h3 id="video-modal-title" className="text-sm font-bold text-white truncate pr-4">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
            aria-label="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Canvas / Player Area */}
        <div className="relative aspect-video bg-black/60 flex items-center justify-center border-b border-white/10">
          <div className="text-center text-slate-300 space-y-3 p-8">
            <div className="w-16 h-16 rounded-full liquid-gel-blue flex items-center justify-center mx-auto text-white shadow-lg cursor-pointer hover:scale-105 transition-transform">
              <Play className="w-8 h-8 fill-white ml-1 text-white" />
            </div>
            <p className="text-sm font-bold text-white tracking-wide">
              세종특별자치시교육청 공식 교육 다큐멘터리 스트리밍
            </p>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              세종시 모든 학교 현장의 자율성과 미래역량 중심 배움 수업 현장 영상이 준비되었습니다.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-white/5 flex items-center justify-between text-xs text-slate-300">
          <span>세종특별자치시교육청 미디어소통센터 제작</span>
          <button
            onClick={onClose}
            className="px-5 py-2 liquid-gel-blue text-white rounded-full font-bold cursor-pointer hover:brightness-105 shadow-md"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
