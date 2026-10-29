import { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, Lock, AlertTriangle } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const [reportType, setReportType] = useState('school_violence');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [reporterName, setReporterName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !details.trim()) {
      alert('신고 제목과 세부 내용을 입력해주세요.');
      return;
    }
    const code = `SJE-SAFE-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedCode(code);
  };

  const handleReset = () => {
    setSubmittedCode(null);
    setSubject('');
    setDetails('');
    setReporterName('');
    setPhone('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
    >
      <div className="liquid-slab bg-white/92 backdrop-blur-3xl w-full max-w-2xl rounded-3xl shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-900/90 via-slate-900/90 to-purple-950/90 text-white px-6 py-4 flex items-center justify-between border-b border-white/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full liquid-gel-rose flex items-center justify-center text-white shadow-xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 id="report-modal-title" className="text-base font-bold text-white">
                세종교육 통합안심신고센터
              </h2>
              <p className="text-[11px] text-rose-200/90">
                공직비리 익명신고 • 학교폭력 긴급제보 • 성희롱·갑질 피해구제
              </p>
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
        <div className="p-6 overflow-y-auto flex-1">
          {!submittedCode ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="liquid-card bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-2xl text-xs text-amber-950 flex items-start gap-2">
                <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  본 센터는 신고자의 신원 비밀을 법률(공익신고자 보호법)에 의해 엄격히 보호하며, IP추적 방지 시스템이 적용됩니다.
                </span>
              </div>

              {/* Report Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">
                  신고 분야 선택
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'school_violence', label: '학교폭력 제보' },
                    { key: 'corruption', label: '공직비리·청렴' },
                    { key: 'harassment', label: '갑질·성희롱' },
                    { key: 'academy', label: '불법사교육' },
                  ].map((cat) => {
                    const isSelected = reportType === cat.key;
                    return (
                      <button
                        type="button"
                        key={cat.key}
                        onClick={() => setReportType(cat.key)}
                        className={`py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                          isSelected
                            ? 'liquid-gel-rose text-white shadow-md'
                            : 'liquid-pill-white text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Anonymous Check */}
              <div className="flex items-center gap-2.5 liquid-pill-white px-4 py-2.5 rounded-full">
                <input
                  type="checkbox"
                  id="anonymous-check"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="anonymous-check" className="text-xs text-slate-800 font-bold cursor-pointer">
                  익명 신고 진행 (신고자 인적사항을 남기지 않습니다)
                </label>
              </div>

              {!isAnonymous && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">신고자 성명</label>
                    <div className="liquid-pill-white px-3.5 py-1.5">
                      <input
                        type="text"
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                        placeholder="성명 입력"
                        className="w-full text-xs py-1 bg-transparent border-0 outline-hidden text-slate-800 placeholder-slate-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">연락처</label>
                    <div className="liquid-pill-white px-3.5 py-1.5">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="010-0000-0000"
                        className="w-full text-xs py-1 bg-transparent border-0 outline-hidden text-slate-800 placeholder-slate-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">
                  신고/제보 제목 <span className="text-rose-500">*</span>
                </label>
                <div className="liquid-pill-white px-3.5 py-1.5">
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="구체적인 사안 제목을 입력해주세요"
                    className="w-full text-xs py-1 bg-transparent border-0 outline-hidden text-slate-800 placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">
                  상세 신고 내용 (육하원칙에 의거 기재) <span className="text-rose-500">*</span>
                </label>
                <div className="liquid-card bg-white/90 p-3 rounded-2xl">
                  <textarea
                    rows={4}
                    required
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="일시, 대상 학교/기관, 사안 내용 등을 객관적으로 입력해주세요."
                    className="w-full text-xs bg-transparent border-0 outline-hidden text-slate-800 placeholder-slate-400 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 liquid-gel-rose text-white font-bold text-sm rounded-full shadow-lg transition-all cursor-pointer hover:brightness-105 active:scale-[0.99]"
              >
                비밀보장 신고서 접수하기
              </button>
            </form>
          ) : (
            /* Submission Success View */
            <div className="space-y-5 text-center py-6">
              <div className="w-16 h-16 rounded-full liquid-gel-rose text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  신고서가 안전하게 접수되었습니다.
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  담당 조사관에게 비공개 암호화 전달되며 신속히 사안 조사가 착수됩니다.
                </p>
              </div>

              <div className="liquid-card bg-white/80 rounded-2xl p-4 border border-white/60 max-w-sm mx-auto text-xs space-y-1 shadow-md">
                <div className="text-slate-500">신고 접수 및 처리조회 번호</div>
                <div className="font-mono text-base font-extrabold text-rose-600">
                  {submittedCode}
                </div>
                <div className="text-[11px] text-slate-400">
                  * 위 번호는 향후 처리결과 조회 시 필수이므로 보관해주세요.
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 liquid-gel-rose text-white rounded-full text-xs font-bold cursor-pointer shadow-md hover:brightness-105"
              >
                확인 및 추가신고
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
