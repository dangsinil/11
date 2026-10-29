import { useState } from 'react';
import { X, FileCheck2, Printer, CheckCircle, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import { CertificateApplication } from '../../types/index.ts';
import { validateCertificateRequest } from '../../utils/portal.ts';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificateModal({ isOpen, onClose }: CertificateModalProps) {
  const [formData, setFormData] = useState<Partial<CertificateApplication>>({
    certificateType: '졸업증명서(국문)',
    purpose: '공공기관 제출용',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [issuedDoc, setIssuedDoc] = useState<CertificateApplication | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateCertificateRequest(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIssuedDoc(formData as CertificateApplication);
    }, 80);
  };

  const handleReset = () => {
    setIssuedDoc(null);
    setFormData({
      certificateType: '졸업증명서(국문)',
      purpose: '공공기관 제출용',
    });
    setErrors({});
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div className="liquid-slab bg-white/90 backdrop-blur-3xl w-full max-w-2xl shadow-2xl border border-white overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500/80 via-emerald-500/70 to-cyan-500/80 text-white px-6 py-4 flex items-center justify-between border-b border-white/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 border border-white/50 flex items-center justify-center shadow-2xs">
              <FileCheck2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 id="cert-modal-title" className="text-base font-extrabold text-white leading-tight drop-shadow-xs">
                온라인 제증명 원스톱 발급 서비스
              </h2>
              <p className="text-[11px] text-teal-100 font-medium">
                세종특별자치시교육청 대국민 온라인 민원 발급 시스템
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="liquid-bubble w-7 h-7 flex items-center justify-center text-slate-700 hover:text-rose-600 cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!issuedDoc ? (
            /* Application Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-teal-50 border border-teal-200 p-3.5 rounded-xl text-xs text-teal-900 leading-relaxed">
                ℹ️ 본 서비스는 정부24 및 나이스(NEIS) 대국민서비스와 연계된 세종 관내 학교 제증명 즉시 열람 및 발급 시뮬레이터입니다.
              </div>

              {/* Certificate Type */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  발급 증명서 선택 <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.certificateType || ''}
                  onChange={(e) => setFormData({ ...formData, certificateType: e.target.value })}
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500"
                >
                  <option value="졸업증명서(국문)">초·중·고 졸업증명서 (국문)</option>
                  <option value="졸업증명서(영문)">초·중·고 졸업증명서 (영문)</option>
                  <option value="학교생활세부사항기록부(대입용)">학교생활기록부 (대입전형용)</option>
                  <option value="학교생활기록부(취업·제출용)">학교생활기록부 (취업·제출용)</option>
                  <option value="재학증명서">재학증명서</option>
                  <option value="교육비납입증명서">교육비납입증명서</option>
                </select>
                {errors.certificateType && (
                  <p className="text-[11px] text-rose-600">{errors.certificateType}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Applicant Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    신청인 성명 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.applicantName || ''}
                    onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                    placeholder="홍길동"
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500"
                  />
                  {errors.applicantName && (
                    <p className="text-[11px] text-rose-600">{errors.applicantName}</p>
                  )}
                </div>

                {/* Birth Date */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    생년월일 (6자리) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.birthDate || ''}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    placeholder="예: 980315"
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500"
                  />
                  {errors.birthDate && (
                    <p className="text-[11px] text-rose-600">{errors.birthDate}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    연락처 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="010-1234-5678"
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500"
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-600">{errors.phone}</p>
                  )}
                </div>

                {/* School Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    대상 학교명 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.schoolName || ''}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    placeholder="예: 보람고등학교, 새롬초등학교"
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500"
                  />
                  {errors.schoolName && (
                    <p className="text-[11px] text-rose-600">{errors.schoolName}</p>
                  )}
                </div>
              </div>

              {/* Purpose */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  용도 및 제출처
                </label>
                <input
                  type="text"
                  value={formData.purpose || ''}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  placeholder="예: 공공기관 제출용, 장학금 신청용"
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 liquid-gel-teal text-white font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>증명서 전산 조회 및 전자발급 중...</span>
                    </>
                  ) : (
                    <>
                      <span>증명서 즉시 발급하기</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Issued Certificate View */
            <div className="space-y-6">
              <div className="text-center space-y-1 pb-2">
                <div className="inline-flex items-center gap-1.5 text-emerald-700 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <CheckCircle className="w-4 h-4" />
                  <span>전자증명서 발급이 완료되었습니다</span>
                </div>
                <p className="text-xs text-slate-500">
                  발급번호: SJE-2026-CERT-{(Math.random() * 899999 + 100000).toFixed(0)}
                </p>
              </div>

              {/* Realistic Korean Certificate Document Container */}
              <div className="bg-amber-50/20 border-4 border-double border-slate-400 p-8 rounded-xl relative shadow-inner text-slate-900 space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-[11px] text-slate-500 tracking-widest uppercase">
                    SEJONG OFFICE OF EDUCATION CERTIFICATE
                  </div>
                  <h3 className="text-2xl font-black tracking-widest text-slate-950 underline decoration-slate-400 decoration-1 underline-offset-8">
                    {issuedDoc.certificateType}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-300">
                  <div>
                    <span className="text-slate-500">성 명:</span>{' '}
                    <strong className="text-slate-900 font-bold">{issuedDoc.applicantName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">생년월일:</span>{' '}
                    <span className="font-mono text-slate-900">{issuedDoc.birthDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">출신학교:</span>{' '}
                    <strong className="text-slate-900">{issuedDoc.schoolName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">용 도:</span>{' '}
                    <span className="text-slate-900">{issuedDoc.purpose}</span>
                  </div>
                </div>

                <div className="text-center py-6 text-sm leading-relaxed font-serif text-slate-800">
                  위 사람은 본 교육청 관내 <strong>{issuedDoc.schoolName}</strong>의 학적부에 기재된
                  사항과 틀림없음을 증명합니다.
                </div>

                <div className="text-center text-xs text-slate-600 font-mono">
                  2026년 10월 28일
                </div>

                {/* Official Seal Graphic */}
                <div className="pt-2 flex items-center justify-center gap-4 relative">
                  <span className="text-base font-extrabold tracking-widest text-slate-950">
                    세종특별자치시교육감
                  </span>

                  {/* Stamp Graphic */}
                  <div className="w-14 h-14 border-2 border-rose-600 rounded-lg flex items-center justify-center text-rose-600 font-bold text-[11px] leading-tight rotate-3 shadow-xs">
                    <div className="text-center leading-3">
                      세종시<br />교육감인
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>증명서 인쇄 및 PDF 저장</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  새로 발급하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
