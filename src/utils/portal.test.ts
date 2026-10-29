import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterNotices,
  filterSchools,
  validateFacilityBooking,
  validateCertificateRequest,
  formatKoreanDate,
  calculateDDay,
} from './portal.ts';
import { NoticeItem, SchoolItem } from '../types/index.ts';

const mockNotices: NoticeItem[] = [
  {
    id: 'n1',
    category: 'notice',
    title: '2026학년도 초등학교 통학구역 설정 행정예고 안내',
    department: '행정지원과',
    date: '2026-10-27',
    views: 124,
    content: '세종특별자치시 관내 초등학교 통학구역에 관한 행정예고입니다.',
  },
  {
    id: 'n2',
    category: 'recruitment',
    title: '2026년도 세종특별자치시교육청 지방공무원 공개채용시험 시행계획',
    department: '운영지원과',
    date: '2026-10-25',
    views: 890,
    content: '교육행정직 및 시설직 9급 공채 시행계획을 공고합니다.',
  },
  {
    id: 'n3',
    category: 'announcement',
    title: '학교폭력 전담조사관 위촉 계획 공고',
    department: '민주시민교육과',
    date: '2026-10-20',
    views: 312,
    content: '학교폭력 사안처리의 전문성 향상을 위한 조사관 위촉 공고입니다.',
  },
];

const mockSchools: SchoolItem[] = [
  {
    id: 's1',
    name: '보람초등학교',
    level: 'elementary',
    district: '보람동',
    address: '세종특별자치시 호려울로 19',
    tel: '044-903-5100',
    homepageUrl: 'http://boram.sjedues.kr',
    studentsCount: 780,
    establishedYear: 2016,
  },
  {
    id: 's2',
    name: '세종국제고등학교',
    level: 'high',
    district: '아름동',
    address: '세종특별자치시 달빛1로 39',
    tel: '044-410-0500',
    homepageUrl: 'http://sji.sjeduhs.kr',
    studentsCount: 320,
    establishedYear: 2013,
  },
  {
    id: 's3',
    name: '다정중학교',
    level: 'middle',
    district: '다정동',
    address: '세종특별자치시 다정중앙로 45',
    tel: '044-903-2400',
    homepageUrl: 'http://dajeong.sjedums.kr',
    studentsCount: 650,
    establishedYear: 2018,
  },
];

test('filterNotices filters by category accurately', () => {
  const recruitments = filterNotices(mockNotices, 'recruitment', '');
  assert.equal(recruitments.length, 1);
  assert.equal(recruitments[0].id, 'n2');

  const all = filterNotices(mockNotices, 'all', '');
  assert.equal(all.length, 3);
});

test('filterNotices searches by title or department', () => {
  const result = filterNotices(mockNotices, 'all', '행정지원과');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'n1');

  const searchKeyword = filterNotices(mockNotices, 'all', '공개채용');
  assert.equal(searchKeyword.length, 1);
  assert.equal(searchKeyword[0].id, 'n2');
});

test('filterSchools filters by level and search term', () => {
  const highs = filterSchools(mockSchools, 'high', '');
  assert.equal(highs.length, 1);
  assert.equal(highs[0].name, '세종국제고등학교');

  const searchDistrict = filterSchools(mockSchools, 'all', '보람동');
  assert.equal(searchDistrict.length, 1);
  assert.equal(searchDistrict[0].name, '보람초등학교');
});

test('validateFacilityBooking checks required inputs correctly', () => {
  const invalid = validateFacilityBooking({});
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.applicantName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.schoolId);

  const valid = validateFacilityBooking({
    applicantName: '홍길동',
    phone: '010-1234-5678',
    schoolId: 's1',
    date: '2026-11-15',
    timeSlot: '14:00 ~ 16:00',
    participantsCount: 20,
    purpose: '세종시 청소년 배드민턴 동아리 정기 체육활동',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('validateCertificateRequest checks birthDate and certificate type', () => {
  const invalid = validateCertificateRequest({
    applicantName: '김세종',
    birthDate: '1234', // invalid
    phone: '010-1111-2222',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.birthDate);

  const valid = validateCertificateRequest({
    applicantName: '김세종',
    birthDate: '950315',
    phone: '010-1111-2222',
    certificateType: '졸업증명서(국문)',
    schoolName: '보람초등학교',
  });
  assert.equal(valid.isValid, true);
});

test('formatKoreanDate and calculateDDay compute correctly', () => {
  const formatted = formatKoreanDate('2026-10-28T09:00:00Z');
  assert.ok(formatted.includes('2026'));

  const ddayFuture = calculateDDay('2026-11-02', '2026-10-28');
  assert.equal(ddayFuture, 'D-5');

  const ddayToday = calculateDDay('2026-10-28', '2026-10-28');
  assert.equal(ddayToday, 'D-DAY');
});
