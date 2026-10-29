import { NoticeItem, NoticeCategory, SchoolItem, SchoolLevel, FacilityBookingForm, CertificateApplication } from '../types/index.ts';

/**
 * Filter notices by category tab and search query keyword
 */
export function filterNotices(
  notices: NoticeItem[],
  category: NoticeCategory,
  query: string
): NoticeItem[] {
  const trimmed = query.trim().toLowerCase();

  return notices.filter((item) => {
    // Category match
    const categoryMatch = category === 'all' || item.category === category;
    if (!categoryMatch) return false;

    // Query match
    if (!trimmed) return true;

    return (
      item.title.toLowerCase().includes(trimmed) ||
      item.department.toLowerCase().includes(trimmed) ||
      item.content.toLowerCase().includes(trimmed)
    );
  });
}

/**
 * Filter schools by school level and search term
 */
export function filterSchools(
  schools: SchoolItem[],
  level: SchoolLevel,
  search: string
): SchoolItem[] {
  const trimmed = search.trim().toLowerCase();

  return schools.filter((school) => {
    const levelMatch = level === 'all' || school.level === level;
    if (!levelMatch) return false;

    if (!trimmed) return true;

    return (
      school.name.toLowerCase().includes(trimmed) ||
      school.district.toLowerCase().includes(trimmed) ||
      school.address.toLowerCase().includes(trimmed)
    );
  });
}

/**
 * Validate facility reservation form
 */
export function validateFacilityBooking(form: Partial<FacilityBookingForm>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!form.applicantName || form.applicantName.trim().length < 2) {
    errors.applicantName = '신청자 성함을 2자 이상 입력해주세요.';
  }

  if (!form.phone || !/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/.test(form.phone.replace(/-/g, ''))) {
    errors.phone = '올바른 휴대폰 번호를 입력해주세요. (예: 010-1234-5678)';
  }

  if (!form.schoolId) {
    errors.schoolId = '이용 희망 학교를 선택해주세요.';
  }

  if (!form.date) {
    errors.date = '예약 날짜를 선택해주세요.';
  }

  if (!form.timeSlot) {
    errors.timeSlot = '이용 희망 시간을 선택해주세요.';
  }

  if (!form.participantsCount || form.participantsCount < 1) {
    errors.participantsCount = '참여 인원을 1명 이상 입력해주세요.';
  }

  if (!form.purpose || form.purpose.trim().length < 5) {
    errors.purpose = '사용 목적을 5자 이상 상세히 입력해주세요.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate online certificate issuance request form
 */
export function validateCertificateRequest(form: Partial<CertificateApplication>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!form.applicantName || form.applicantName.trim().length < 2) {
    errors.applicantName = '성함을 2자 이상 입력해주세요.';
  }

  if (!form.birthDate || !/^\d{6}$/.test(form.birthDate)) {
    errors.birthDate = '주민등록번호 앞 6자리를 입력해주세요 (예: 980512)';
  }

  if (!form.phone || !/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/.test(form.phone.replace(/-/g, ''))) {
    errors.phone = '올바른 연락처를 입력해주세요.';
  }

  if (!form.certificateType) {
    errors.certificateType = '발급받으실 증명서 종류를 선택해주세요.';
  }

  if (!form.schoolName || form.schoolName.trim().length < 2) {
    errors.schoolName = '대상 학교명을 입력해주세요.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats date into standard Korean format (YYYY.MM.DD)
 */
export function formatKoreanDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
  } catch {
    return dateStr;
  }
}

/**
 * Calculate D-day remaining days from a target date string
 */
export function calculateDDay(targetDateStr: string, baseDateStr: string = '2026-10-28'): string {
  try {
    const target = new Date(targetDateStr);
    const base = new Date(baseDateStr);
    const diffTime = target.getTime() - base.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'D-DAY';
    if (diffDays > 0) return `D-${diffDays}`;
    return `D+${Math.abs(diffDays)}`;
  } catch {
    return 'D-DAY';
  }
}
