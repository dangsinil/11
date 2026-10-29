import { X, UserCheck, CheckCircle2, Award, Heart, Sparkles } from 'lucide-react';

interface SuperintendentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuperintendentModal({ isOpen, onClose }: SuperintendentModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="superintendent-modal-title"
    >
      <div className="liquid-slab bg-white/92 backdrop-blur-3xl w-full max-w-3xl rounded-3xl shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900/90 via-indigo-950/90 to-purple-900/90 text-white px-6 py-5 flex items-center justify-between border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xs">
              <UserCheck className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <span className="text-[11px] text-blue-200 font-bold tracking-wider uppercase">
                열린 교육감실
              </span>
              <h2 id="superintendent-modal-title" className="text-base sm:text-lg font-bold text-white">
                제5대 세종특별자치시교육감 인사말 및 공약이행
              </h2>
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700 leading-relaxed">
          {/* Greeting Letter with Liquid Aurora style */}
          <div className="liquid-aurora p-6 rounded-3xl space-y-3.5 shadow-md">
            <h3 className="font-extrabold text-base text-slate-900">
              “모두가 특별해지는 세종교육을 향해 힘차게 나아가겠습니다.”
            </h3>
            <p className="text-xs sm:text-sm text-slate-700/90 leading-relaxed">
              존경하는 세종시민 여러분, 사랑하는 학생과 학부모님, 그리고 교직원 여러분!
              <br /><br />
              세종특별자치시교육청은 대한민국 교육의 중심지로서 '새로운 학교, 행복한 아이들'이라는 비전 아래 모든 아이가 각자의 소질과 재능을 마음껏 꽃피울 수 있는 미래 교육 환경을 조성해왔습니다.
              <br /><br />
              급변하는 미래 사회 속에서 지식의 전달을 넘어 학생들이 스스로 질문하고 탐구하며, 따뜻한 인성을 갖춘 민주시민으로 성장할 수 있도록 끊임없이 혁신하고 지원하겠습니다.
            </p>
            <div className="text-right pt-2 font-bold text-slate-900 text-xs">
              세종특별자치시교육감 드림
            </div>
          </div>

          {/* 5 Key Pledges Tracker */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" />
              <span>제5대 교육감 핵심 공약 5대 분야 실천현황 (종합이행률 94.2%)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="liquid-card bg-white/70 p-4 rounded-2xl space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>1. 미래형 학교 모델 혁신</span>
                  <span className="text-emerald-700 font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100/70 border border-emerald-300/60">96% 완료</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  세종 맞춤형 스마트스쿨 및 캠퍼스형 공동교육과정 정착
                </p>
              </div>

              <div className="liquid-card bg-white/70 p-4 rounded-2xl space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>2. 촘촘한 늘봄·돌봄 안전망</span>
                  <span className="text-emerald-700 font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100/70 border border-emerald-300/60">98% 완료</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  초등 전 학년 늘봄학교 전면 확대 및 안심 귀가 시스템
                </p>
              </div>

              <div className="liquid-card bg-white/70 p-4 rounded-2xl space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>3. 학교폭력 제로 & 교권 확립</span>
                  <span className="text-emerald-700 font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100/70 border border-emerald-300/60">92% 완료</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  전담조사관 제도 안착 및 교원치유지원센터 확대 개편
                </p>
              </div>

              <div className="liquid-card bg-white/70 p-4 rounded-2xl space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>4. 청렴도 1등급 교육행정</span>
                  <span className="text-emerald-700 font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100/70 border border-emerald-300/60">95% 완료</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  시민참여예산 확대 및 예산 편성 전 과정 투명 공개
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white/40 px-6 py-3.5 border-t border-white/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 liquid-gel-blue text-white text-xs font-bold rounded-full shadow-md cursor-pointer hover:brightness-105"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
}
