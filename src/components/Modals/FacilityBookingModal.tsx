import { useState } from 'react';
import { X, Building2, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { FacilityBookingForm } from '../../types/index.ts';
import { SCHOOLS_DATA } from '../../data/portalData.ts';
import { validateFacilityBooking } from '../../utils/portal.ts';

interface FacilityBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FacilityBookingModal({ isOpen, onClose }: FacilityBookingModalProps) {
  const [formData, setFormData] = useState<Partial<FacilityBookingForm>>({
    facilityType: 'gym',
    timeSlot: '18:00 ~ 20:00 (야간 1타임)',
    participantsCount: 15,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<{
    form: FacilityBookingForm;
    code: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateFacilityBooking(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    const randomCode = `SJE-RES-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedBooking({
      form: formData as FacilityBookingForm,
      code: randomCode,
    });
  };

  const selectedSchool = SCHOOLS_DATA.find((s) => s.id === formData.schoolId);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="facility-modal-title"
    >
      <div className="liquid-slab bg-white/90 backdrop-blur-3xl w-full max-w-2xl rounded-3xl shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600/90 via-teal-700/90 to-cyan-800/90 text-white px-6 py-4 flex items-center justify-between border-b border-white/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-xs">
              <Building2 className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <h2 id="facility-modal-title" className="text-base font-bold text-white leading-tight">
                세종 각급 학교 시설개방 온라인 예약
              </h2>
              <p className="text-[11px] text-emerald-100/90">
                시민과 생활체육 동호인을 위한 학교 체육관·강당·운동장 개방 예약
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
          {!confirmedBooking ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="liquid-card bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-2xl text-xs text-emerald-950 font-medium">
                📌 학생 교육활동에 지장이 없는 방과후 및 주말에 한하여 일반 시민에게 개방됩니다.
              </div>

              {/* School Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">
                  이용 희망 학교 선택 <span className="text-rose-500">*</span>
                </label>
                <div className="liquid-pill-white px-3 py-1.5">
                  <select
                    value={formData.schoolId || ''}
                    onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                    className="w-full text-xs py-1 bg-transparent border-0 outline-hidden text-slate-800 cursor-pointer"
                  >
                    <option value="">-- 관내 학교를 선택하세요 --</option>
                    {SCHOOLS_DATA.filter((s) => s.level !== 'institute').map((s) => (
                      <option key={s.id} value={s.id}>
                        [{s.district}] {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.schoolId && <p className="text-[11px] text-rose-600 font-medium">{errors.schoolId}</p>}
              </div>

              {/* Facility Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">
                  개방 시설 종류 <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'gym', label: '실내 체육관' },
                    { key: 'auditorium', label: '다목적 강당' },
                    { key: 'field', label: '인조잔디 운동장' },
                  ].map((f) => {
                    const isSelected = formData.facilityType === f.key;
                    return (
                      <button
                        type="button"
                        key={f.key}
                        onClick={() =>
                          setFormData({ ...formData, facilityType: f.key as any })
                        }
                        className={`py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                          isSelected
                            ? 'liquid-gel-teal text-white shadow-md'
                            : 'liquid-pill-white text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">
                    예약 희망일 <span className="text-rose-500">*</span>
                  </label>
                  <div className="liquid-pill-white px-3 py-1.5">
                    <input
                      type="date"
                      value={formData.date || ''}
                      min="2026-10-29"
                      max="2026-12-31"
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full text-xs py-1 bg-transparent border-0 outline-hidden text-slate-800"
                    />
                  </div>
                  {errors.date && <p className="text-[11px] text-rose-600 font-medium">{errors.date}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">
                    이용 시간대 <span className="text-rose-500">*</span>
                  </label>
                  <div className="liquid-pill-white px-3 py-1.5">
                    <select
                      value={formData.timeSlot || ''}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full text-xs py-1 bg-transparent border-0 outline-hidden text-slate-800 cursor-pointer"
                    >
                      <option value="09:00 ~ 12:00 (오전 타임)">09:00 ~ 12:00 (오전 타임)</option>
                      <option value="13:00 ~ 17:00 (오후 타임)">13:00 ~ 17:00 (오후 타임)</option>
                      <option value="18:00 ~ 20:00 (야간 1타임)">18:00 ~ 20:00 (야간 1타임)</option>
                      <option value="20:00 ~ 22:00 (야간 2타임)">20:00 ~ 22:00 (야간 2타임)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Applicant & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">
                    신청자 성명 / 단체 대표자 <span className="text-rose-500">*</span>
                  </label>
                  <div className="liquid-pill-white px-3.5 py-1.5">
                    <input
                      type="text"
                      value={formData.applicantName || ''}
                      onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                      placeholder="이세종"
                      className="w-full text-xs py-1 bg-transparent border-0 outline-hidden text-slate-800 placeholder-slate-400"
                    />
                  </div>
                  {errors.applicantName && (
                    <p className="text-[11px] text-rose-600 font-medium">{errors.applicantName}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">
                    휴대폰 연락처 <span className="text-rose-500">*</span>
                  </label>
                  <div className="liquid-pill-white px-3.5 py-1.5">
                    <input
                      type="text"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="010-9876-5432"
                      className="w-full text-xs py-1 bg-transparent border-0 outline-hidden text-slate-800 placeholder-slate-400"
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-600 font-medium">{errors.phone}</p>}
                </div>
              </div>

              {/* Organization & Participants */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">
                    단체/동호회명
                  </label>
                  <div className="liquid-pill-white px-3.5 py-1.5">
                    <input
                      type="text"
                      value={formData.groupName || ''}
                      onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                      placeholder="예: 보람동 배드민턴 클럽"
                      className="w-full text-xs py-1 bg-transparent border-0 outline-hidden text-slate-800 placeholder-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">
                    예상 참여인원 (명) <span className="text-rose-500">*</span>
                  </label>
                  <div className="liquid-pill-white px-3.5 py-1.5">
                    <input
                      type="number"
                      min={1}
                      max={200}
                      value={formData.participantsCount || 15}
                      onChange={(e) =>
                        setFormData({ ...formData, participantsCount: Number(e.target.value) })
                      }
                      className="w-full text-xs py-1 bg-transparent border-0 outline-hidden text-slate-800"
                    />
                  </div>
                  {errors.participantsCount && (
                    <p className="text-[11px] text-rose-600 font-medium">{errors.participantsCount}</p>
                  )}
                </div>
              </div>

              {/* Purpose */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">
                  사용 목적 <span className="text-rose-500">*</span>
                </label>
                <div className="liquid-card bg-white/90 p-3 rounded-2xl">
                  <textarea
                    rows={2}
                    value={formData.purpose || ''}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    placeholder="예: 정기 생활체육 동호회 친선 배구 활동"
                    className="w-full text-xs bg-transparent border-0 outline-hidden text-slate-800 placeholder-slate-400 resize-none"
                  />
                </div>
                {errors.purpose && <p className="text-[11px] text-rose-600 font-medium">{errors.purpose}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 liquid-gel-teal text-white font-bold text-sm rounded-full shadow-lg transition-all cursor-pointer hover:brightness-105 active:scale-[0.99]"
                >
                  시설 개방 예약 신청하기
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation Screen */
            <div className="space-y-5 text-center py-4">
              <div className="w-16 h-16 rounded-full liquid-gel-teal text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  학교시설 개방 예약 신청이 완료되었습니다!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  학교 행정실 승인 후 예약 확정 안내 문자가 발송됩니다.
                </p>
              </div>

              <div className="liquid-card bg-white/80 rounded-2xl p-5 border border-white/60 text-left text-xs space-y-2.5 max-w-md mx-auto shadow-md">
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">예약접수번호</span>
                  <span className="font-mono font-bold text-teal-700">
                    {confirmedBooking.code}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">신청 학교</span>
                  <span className="font-semibold text-slate-900">
                    {selectedSchool?.name || '선택 학교'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">예약 일시</span>
                  <span className="font-semibold text-slate-900">
                    {confirmedBooking.form.date} ({confirmedBooking.form.timeSlot})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">신청자</span>
                  <span className="font-semibold text-slate-900">
                    {confirmedBooking.form.applicantName} ({confirmedBooking.form.phone})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">참여인원</span>
                  <span className="font-semibold text-slate-900">
                    약 {confirmedBooking.form.participantsCount}명
                  </span>
                </div>
              </div>

              <button
                onClick={() => setConfirmedBooking(null)}
                className="px-6 py-2.5 liquid-gel-teal text-white rounded-full text-xs font-bold transition-all cursor-pointer shadow-md hover:brightness-105"
              >
                추가 예약하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
