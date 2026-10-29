import { NoticeItem, QuickServiceItem, SchoolItem, CampaignSlide, CardNewsItem } from '../types/index.ts';

export const HERO_SLIDES: CampaignSlide[] = [
  {
    id: 'slide-1',
    tag: '세종 늘봄학교',
    title: '모두가 특별해지는 세종교육, 2026 늘봄학교 전면 확대',
    subtitle: '정규수업 전후 맞춤형 돌봄 및 질 높은 미래형 교육프로그램을 누구나 안심하고 참여합니다.',
    description: '초등 전 학년 대상 맞춤형 방과후·돌봄 통합 지원 체계 구축 및 안전 귀가 지원 시스템 가동',
    badgeText: '중점추진정책',
    gradientClass: 'from-blue-900 via-indigo-900 to-slate-900',
    accentColor: '#0284c7',
    linkText: '늘봄학교 안내 바로가기',
    category: '교육복지',
  },
  {
    id: 'slide-2',
    tag: '소통·열린행정',
    title: '빛나는 오늘, 설레는 내일! 제5대 교육감 소통 널마당',
    subtitle: '시민과 학생, 학부모, 교직원의 목소리에 귀 기울이며 새로운 미래 10년을 함께 열어갑니다.',
    description: '공약이행평가 주민참여단 상시 운영 및 교육감 직통 정책 제안 창구 운영',
    badgeText: '시민소통',
    gradientClass: 'from-emerald-900 via-teal-900 to-slate-900',
    accentColor: '#10b981',
    linkText: '교육감실 바로가기',
    category: '교육감실',
  },
  {
    id: 'slide-3',
    tag: '채용 및 임용',
    title: '2026학년도 공립 유·초·중등·특수 교원 및 교육공무직원 선발',
    subtitle: '세종 교육의 미래를 함께 이끌어갈 열정 넘치는 우수 교육 가족을 모집합니다.',
    description: '원서접수, 시험일정, 가산점 및 최종 합격자 발표 전 과정 온라인 투명 공개',
    badgeText: '채용공고',
    gradientClass: 'from-amber-900 via-stone-900 to-slate-900',
    accentColor: '#f59e0b',
    linkText: '채용공고 확인하기',
    category: '인사채용',
  },
  {
    id: 'slide-4',
    tag: '안전·평화학교',
    title: '365일 안심 배움터, 세종 학교폭력 제로 & 학생마음건강 핫라인',
    subtitle: '전문 전담조사관 제도 정착과 전문 심리상담 원스톱 케어로 평화롭고 따뜻한 학교를 만듭니다.',
    description: '24시간 위(Wee)센터 온라인 상담 및 피해학생 맞춤형 심리치유 클리닉 지원',
    badgeText: '안전학교',
    gradientClass: 'from-rose-900 via-pink-950 to-slate-900',
    accentColor: '#f43f5e',
    linkText: '안전신고센터 안내',
    category: '학생안전',
  },
];

export const QUICK_SERVICES: QuickServiceItem[] = [
  {
    id: 'neis',
    title: '나이스 대국민서비스',
    subtitle: '성적·출결·학교생활기록부',
    iconName: 'GraduationCap',
    badge: '필수',
    actionType: 'external',
    target: 'https://www.neis.go.kr',
    colorScheme: 'blue',
  },
  {
    id: 'cert',
    title: '온라인 제증명 발급',
    subtitle: '졸업·재학·경력증명서',
    iconName: 'FileCheck2',
    badge: '원스톱',
    actionType: 'modal',
    colorScheme: 'teal',
  },
  {
    id: 'facility',
    title: '학교시설 예약신청',
    subtitle: '체육관·강당·운동장 대여',
    iconName: 'Building2',
    badge: '시민개방',
    actionType: 'modal',
    colorScheme: 'emerald',
  },
  {
    id: 'school_map',
    title: '세종 학교·기관 찾기',
    subtitle: '관내 유·초·중·고 정보',
    iconName: 'MapPin',
    actionType: 'modal',
    colorScheme: 'indigo',
  },
  {
    id: 'afterschool',
    title: '방과후·늘봄학교',
    subtitle: '온라인 수강신청 및 안내',
    iconName: 'Clock',
    actionType: 'modal',
    colorScheme: 'amber',
  },
  {
    id: 'transfer',
    title: '초·중·고 전편입학',
    subtitle: '학군 배정 및 구비서류',
    iconName: 'ArrowRightLeft',
    actionType: 'modal',
    colorScheme: 'blue',
  },
  {
    id: 'evpn',
    title: '교직원 원격업무(eVPN)',
    subtitle: 'K-에듀파인 및 행정망',
    iconName: 'Laptop',
    badge: '교직원',
    actionType: 'external',
    target: 'https://evpn.sje.go.kr',
    colorScheme: 'rose',
  },
  {
    id: 'report',
    title: '세종교육신고센터',
    subtitle: '공직비리·학폭·불법사교육',
    iconName: 'ShieldAlert',
    badge: '익명보장',
    actionType: 'modal',
    colorScheme: 'teal',
  },
];

export const NOTICES_DATA: NoticeItem[] = [
  {
    id: 'not-01',
    category: 'notice',
    title: '2026학년도 세종특별자치시 관내 초등학교 통학구역 설정 행정예고',
    department: '교육복지과',
    date: '2026-10-28',
    views: 452,
    isNew: true,
    isUrgent: true,
    content: `세종특별자치시 관내 신설 및 기존 초등학교의 통학구역을 합리적으로 재조정하여 통학 안전을 확보하고 교육여건을 개선하고자 「초·중등교육법 시행령」 제16조에 따라 다음과 같이 행정예고합니다.

1. 주요 예고 내용
- 5-1생활권 스마트시티 국가시범도시 신설초 통학구역 신설
- 6-3생활권 산울동 신규 공동주택 입주에 따른 인근 초등학교 학군 조정
- 공동학구 지정에 따른 안심 통학버스 노선 개편

2. 의견 제출 기한: 2026년 11월 18일(수) 18:00까지
3. 문의처: 세종특별자치시교육청 교육복지과 학생배정담당 (044-320-3312)`,
    attachments: [
      { name: '2026학년도_초등학교_통학구역_행정예고문.pdf', size: '1.4MB', type: 'pdf' },
      { name: '통학구역_변경_의견제출서식.hwp', size: '48KB', type: 'hwp' },
    ],
  },
  {
    id: 'not-02',
    category: 'recruitment',
    title: '2026년도 세종특별자치시교육청 교육공무직원 및 특수운영직군 공개경쟁 채용공고',
    department: '교원인사과',
    date: '2026-10-27',
    views: 1820,
    isNew: true,
    content: `2026년도 세종특별자치시교육청 교육공무직원 및 특수운영직군 종사자 공개경쟁 채용시험 시행계획을 다음과 같이 공고하오니 역량 있는 인재들의 많은 지원을 바랍니다.

1. 선발 인원 및 직종
- 교무행정사: 15명
- 조리실무사: 32명
- 특수교육실무사: 8명
- 시설관리원: 6명

2. 원서접수 기간: 2026년 11월 3일(화) 09:00 ~ 11월 7일(토) 18:00까지 (온라인채용시스템 접수)
3. 1차 서류 및 필기전형: 2026년 11월 21일(토)
4. 최종합격자 발표: 2026년 12월 15일(화) 세종시교육청 누리집`,
    attachments: [
      { name: '2026년도_교육공무직원_채용공고문_전문.pdf', size: '2.1MB', type: 'pdf' },
      { name: '응시원서_및_자기소개서_양식.hwp', size: '65KB', type: 'hwp' },
      { name: '직종별_직무기술서.xlsx', size: '120KB', type: 'xlsx' },
    ],
  },
  {
    id: 'not-03',
    category: 'press',
    title: '[보도자료] 세종교육청, 모든 초등학교에 미래형 AI 맞춤형 튜터링 전면 도입',
    department: '소통담당관',
    date: '2026-10-26',
    views: 890,
    isNew: true,
    content: `세종특별자치시교육청은 26일 브리핑을 통해 세종 관내 모든 초등학교 3~6학년 학생을 대상으로 기초학력 보장과 개별 맞춤학습을 지원하는 '세종 AI 스마트 튜터링 플랫폼'을 전면 구축했다고 밝혔다.

이번 플랫폼 도입은 학생 개개인의 학습 성취도를 다각적으로 진단하고, 학습 결손을 즉각 보완하여 '단 한 명의 아이도 배움에서 소외되지 않는 세종 미래교육'을 구현하기 위한 핵심 전략이다.

교육감은 "디지털 대전환 시대에 발맞춰 에듀테크와 인간 교사의 따뜻한 코칭이 결합된 세종형 하이브리드 교실을 완성할 것"이라고 강조했다.`,
    attachments: [
      { name: '보도자료_세종교육청_AI맞춤튜터링_도입.pdf', size: '890KB', type: 'pdf' },
      { name: '현장브리핑_사진자료.zip', size: '5.4MB', type: 'zip' },
    ],
  },
  {
    id: 'not-04',
    category: 'announcement',
    title: '2026년 하반기 세종특별자치시교육청 주민참여예산 제안사업 공모 결과 발표',
    department: '예산조정과',
    date: '2026-10-24',
    views: 630,
    content: `세종 교육 재정 운영의 투명성과 주민 민주적 참여를 확대하기 위해 실시한 '2026년도 주민참여예산 제안사업' 최종 선정 결과를 공고합니다.

- 총 접수 건수: 142건
- 주민참여예산위원회 최종 심사 선정: 총 18개 사업 (총 예산 15억 6,000만 원 반영)
- 주요 선정 사업:
  1. 학교 숲 생태체험 힐링 쉼터 조성
  2. 찾아가는 청소년 마음건강 버스 운영
  3. 안전한 스마트 등하굣길 보행 알리미 설치`,
    attachments: [
      { name: '2026_주민참여예산_최종선정목록_공고.pdf', size: '1.1MB', type: 'pdf' },
    ],
  },
  {
    id: 'not-05',
    category: 'tender',
    title: '[입찰공고] 2026년 세종 미래교육 스마트스쿨 노후 무선 인프라 개선 사업',
    department: '교육시설과',
    date: '2026-10-23',
    views: 1120,
    content: `세종 관내 45개 학교의 노후 무선 AP 및 네트워크 스위치 교체 사업을 위한 일반경쟁입찰(협상에 의한 계약)을 다음과 같이 공고합니다.

- 사업예산: 금 2,450,000,000원(추정가격, 부가세 포함)
- 입찰방식: 전자입찰(국가종합전자조달시스템 나라장터 G2B)
- 제안서 제출마감: 2026년 11월 12일 14:00까지
- 사업설명회: 2026년 11월 2일 14:00 세종교육청 대회의실`,
    attachments: [
      { name: '스마트스쿨_네트워크개선_제안요청서.pdf', size: '3.8MB', type: 'pdf' },
      { name: '물량내역서_및_시방서.xlsx', size: '250KB', type: 'xlsx' },
    ],
  },
  {
    id: 'not-06',
    category: 'notice',
    title: '2026학년도 중학교 신입생 무시험 배정 원서접수 일정 및 방법 안내',
    department: '중등교육과',
    date: '2026-10-21',
    views: 940,
    content: `2026학년도 세종특별자치시 관내 초등학교 졸업예정자 및 동등 학력 인정자를 대상으로 중학교 무시험 근거리 배정 계획을 공지합니다.

- 원서 작성 및 제출: 2026. 11. 10.(화) ~ 11. 17.(화) 각 초등학교
- 컴퓨터 추첨 배정일: 2026. 12. 23.(수) 14:00 (학부모 참관 가능)
- 배정 결과 발표: 2026. 12. 24.(목) 10:00 세종시교육청 누리집`,
    attachments: [
      { name: '2026_중학교_신입생_배정_시행요강.pdf', size: '1.8MB', type: 'pdf' },
    ],
  },
  {
    id: 'not-07',
    category: 'recruitment',
    title: '2026학년도 공립 유치원·초등학교·특수학교(유·초) 교사 임용시험 제1차 시험 장소 공고',
    department: '교원인사과',
    date: '2026-10-20',
    views: 2310,
    content: `2026학년도 세종특별자치시 공립 유치원·초등학교·특수학교(유치원·초등) 교사 임용후보자 선정경쟁시험 제1차 시험 장소 및 응시자 유의사항을 공고합니다.

- 시험일시: 2026. 11. 7.(토) 09:00 ~ 13:40 (08:30까지 입실 완료)
- 시험장소: 아름고등학교, 어진중학교
- 수험표 출력: 온라인나이스 교직원채용시스템에서 출력`,
    attachments: [
      { name: '1차시험_장소공고_및_수험생_유의사항.pdf', size: '950KB', type: 'pdf' },
    ],
  },
  {
    id: 'not-08',
    category: 'press',
    title: '[보도자료] 세종학생해양수련원 2026 가족과 함께하는 생태힐링 캠프 성료',
    department: '소통담당관',
    date: '2026-10-19',
    views: 520,
    content: `충남 보령에 위치한 세종특별자치시교육청 학생해양수련원에서 관내 초·중·고 60가족 240여 명이 참가한 가운데 '2026 가을맞이 가족 해양생태 힐링캠프'가 성황리에 마무리되었습니다. 해양레포츠 체험, 갯벌 생태 탐구 및 가족 대화의 밤 등 다채로운 프로그램으로 큰 호응을 얻었습니다.`,
    attachments: [
      { name: '보도자료_해양수련원_가족캠프_성료.pdf', size: '720KB', type: 'pdf' },
    ],
  },
];

export const SCHOOLS_DATA: SchoolItem[] = [
  // 초등학교
  {
    id: 'sch-01',
    name: '보람초등학교',
    level: 'elementary',
    district: '보람동',
    address: '세종특별자치시 호려울로 19 (보람동)',
    tel: '044-903-5100',
    homepageUrl: 'http://boram.sjedues.kr',
    studentsCount: 840,
    establishedYear: 2016,
  },
  {
    id: 'sch-02',
    name: '다정초등학교',
    level: 'elementary',
    district: '다정동',
    address: '세종특별자치시 다정중앙로 45 (다정동)',
    tel: '044-903-4500',
    homepageUrl: 'http://dajeong.sjedues.kr',
    studentsCount: 960,
    establishedYear: 2018,
  },
  {
    id: 'sch-03',
    name: '새롬초등학교',
    level: 'elementary',
    district: '새롬동',
    address: '세종특별자치시 새롬서로 23 (새롬동)',
    tel: '044-903-2200',
    homepageUrl: 'http://saerom.sjedues.kr',
    studentsCount: 1120,
    establishedYear: 2017,
  },
  {
    id: 'sch-04',
    name: '아름초등학교',
    level: 'elementary',
    district: '아름동',
    address: '세종특별자치시 달빛로 65 (아름동)',
    tel: '044-903-1200',
    homepageUrl: 'http://areum.sjedues.kr',
    studentsCount: 890,
    establishedYear: 2014,
  },
  {
    id: 'sch-05',
    name: '도담초등학교',
    level: 'elementary',
    district: '도담동',
    address: '세종특별자치시 보듬로 70 (도담동)',
    tel: '044-903-0800',
    homepageUrl: 'http://dodam.sjedues.kr',
    studentsCount: 1050,
    establishedYear: 2013,
  },
  {
    id: 'sch-06',
    name: '해밀초등학교',
    level: 'elementary',
    district: '해밀동',
    address: '세종특별자치시 해밀3로 32 (해밀동)',
    tel: '044-903-7200',
    homepageUrl: 'http://haemil.sjedues.kr',
    studentsCount: 750,
    establishedYear: 2020,
  },
  {
    id: 'sch-07',
    name: '조치원대동초등학교',
    level: 'elementary',
    district: '조치원읍',
    address: '세종특별자치시 조치원읍 대동길 12',
    tel: '044-865-2121',
    homepageUrl: 'http://daedong.sjedues.kr',
    studentsCount: 680,
    establishedYear: 1915,
  },

  // 중학교
  {
    id: 'sch-08',
    name: '보람중학교',
    level: 'middle',
    district: '보람동',
    address: '세종특별자치시 남세종로 440 (보람동)',
    tel: '044-903-5200',
    homepageUrl: 'http://boram.sjedums.kr',
    studentsCount: 720,
    establishedYear: 2016,
  },
  {
    id: 'sch-09',
    name: '새롬중학교',
    level: 'middle',
    district: '새롬동',
    address: '세종특별자치시 새롬서로 15 (새롬동)',
    tel: '044-903-2500',
    homepageUrl: 'http://saerom.sjedums.kr',
    studentsCount: 810,
    establishedYear: 2017,
  },
  {
    id: 'sch-10',
    name: '어진중학교',
    level: 'middle',
    district: '어진동',
    address: '세종특별자치시 다솜2로 24 (어진동)',
    tel: '044-903-1400',
    homepageUrl: 'http://eojin.sjedums.kr',
    studentsCount: 560,
    establishedYear: 2013,
  },
  {
    id: 'sch-11',
    name: '해밀중학교',
    level: 'middle',
    district: '해밀동',
    address: '세종특별자치시 해밀3로 28 (해밀동)',
    tel: '044-903-7300',
    homepageUrl: 'http://haemil.sjedums.kr',
    studentsCount: 480,
    establishedYear: 2020,
  },

  // 고등학교
  {
    id: 'sch-12',
    name: '세종국제고등학교',
    level: 'high',
    district: '아름동',
    address: '세종특별자치시 달빛1로 39 (아름동)',
    tel: '044-410-0500',
    homepageUrl: 'http://sji.sjeduhs.kr',
    studentsCount: 300,
    establishedYear: 2013,
  },
  {
    id: 'sch-13',
    name: '세종과학예술영재학교',
    level: 'high',
    district: '아름동',
    address: '세종특별자치시 달빛1로 265 (아름동)',
    tel: '044-860-9100',
    homepageUrl: 'http://sasa.sjeduhs.kr',
    studentsCount: 270,
    establishedYear: 2015,
  },
  {
    id: 'sch-14',
    name: '세종예술고등학교',
    level: 'high',
    district: '어진동',
    address: '세종특별자치시 갈매로 349 (어진동)',
    tel: '044-905-2700',
    homepageUrl: 'http://sja.sjeduhs.kr',
    studentsCount: 240,
    establishedYear: 2018,
  },
  {
    id: 'sch-15',
    name: '보람고등학교',
    level: 'high',
    district: '보람동',
    address: '세종특별자치시 호려울로 45 (보람동)',
    tel: '044-903-5300',
    homepageUrl: 'http://boram.sjeduhs.kr',
    studentsCount: 650,
    establishedYear: 2017,
  },
  {
    id: 'sch-16',
    name: '새롬고등학교',
    level: 'high',
    district: '새롬동',
    address: '세종특별자치시 새롬서로 51 (새롬동)',
    tel: '044-903-2700',
    homepageUrl: 'http://saerom.sjeduhs.kr',
    studentsCount: 680,
    establishedYear: 2017,
  },

  // 특수학교
  {
    id: 'sch-17',
    name: '세종누리학교 (공립 특수학교)',
    level: 'special',
    district: '아름동',
    address: '세종특별자치시 달빛로 125 (아름동)',
    tel: '044-903-1600',
    homepageUrl: 'http://nuri.sjeduse.kr',
    studentsCount: 160,
    establishedYear: 2015,
  },
  {
    id: 'sch-18',
    name: '세종이음학교 (공립 특수학교)',
    level: 'special',
    district: '집현동',
    address: '세종특별자치시 집현중앙로 45 (집현동)',
    tel: '044-903-8800',
    homepageUrl: 'http://ieum.sjeduse.kr',
    studentsCount: 130,
    establishedYear: 2023,
  },

  // 직속기관
  {
    id: 'inst-01',
    name: '세종특별자치시교육원',
    level: 'institute',
    district: '조치원읍',
    address: '세종특별자치시 조치원읍 내창1길 11',
    tel: '044-902-1300',
    homepageUrl: 'https://sjti.sje.go.kr',
    studentsCount: 0,
    establishedYear: 2019,
  },
  {
    id: 'inst-02',
    name: '세종특별자치시교육청 평생교육학습관',
    level: 'institute',
    district: '조치원읍',
    address: '세종특별자치시 조치원읍 문예회관길 22',
    tel: '044-410-1400',
    homepageUrl: 'https://sjle.sje.go.kr',
    studentsCount: 0,
    establishedYear: 2012,
  },
  {
    id: 'inst-03',
    name: '세종특별자치시교육청 안전체험교육원',
    level: 'institute',
    district: '조치원읍',
    address: '세종특별자치시 조치원읍 서창리 244-1',
    tel: '044-905-1800',
    homepageUrl: 'https://safety.sje.go.kr',
    studentsCount: 0,
    establishedYear: 2021,
  },
  {
    id: 'inst-04',
    name: '세종특별자치시교육청 학생해양수련원',
    level: 'institute',
    district: '충남 보령',
    address: '충남 보령시 남포면 열린바다로 198',
    tel: '041-930-7100',
    homepageUrl: 'https://sjoc.sje.go.kr',
    studentsCount: 0,
    establishedYear: 2020,
  },
];

export const CARD_NEWS: CardNewsItem[] = [
  {
    id: 'card-01',
    title: '한눈에 보는 세종 늘봄학교 Q&A 총정리',
    category: '카드뉴스',
    date: '2026.10.25',
    summary: '초등 1~2학년 맞춤형 프로그램과 무료 2시간 돌봄! 신청 방법과 시간표를 확인하세요.',
    imagePrompt: 'elementary kids learning coding with bright smiles',
    likes: 142,
  },
  {
    id: 'card-02',
    title: '우리아이 안심 등하굣길 스마트 보행 알림 시스템',
    category: '세종교육 웹진',
    date: '2026.10.22',
    summary: '인공지능 CCTV와 보행자 알림 전광판으로 교통사고 위험을 90% 이상 예방합니다.',
    imagePrompt: 'crosswalk school zone with smart tech signs',
    likes: 98,
  },
  {
    id: 'card-03',
    title: '세종 미래 생태시민 양성: 학교 숲과 탄소중립 실천',
    category: '생태환경',
    date: '2026.10.18',
    summary: '교실 밖 자연에서 배우는 생태 순환 교육, 세종 학교들의 아름다운 숲 이야기.',
    imagePrompt: 'school forest nature garden with children watering plants',
    likes: 126,
  },
  {
    id: 'card-04',
    title: '진로진학 전문가가 들려주는 2028 대입 개편안 대비 가이드',
    category: '진로진학',
    date: '2026.10.15',
    summary: '고교학점제 완성과 수능 개편에 맞춘 세종 학생만의 맞춤형 교과 이수 전략.',
    imagePrompt: 'high school student studying with career counselor',
    likes: 215,
  },
];

export const GNB_MENU = [
  {
    title: '세종교육소개',
    href: '#about',
    subcategories: [
      { name: '교육비전 및 지표', desc: '모두가 특별해지는 세종교육 비전 체계' },
      { name: '교육감 인사말', desc: '제5대 교육감 인사 및 약력' },
      { name: '교육감 공약이행', desc: '5대 분야 86개 실천과제 추진현황' },
      { name: '조직도 및 청사안내', desc: '본청 3국 2관 1총괄 1센터 전화번호부' },
      { name: '교육청 상징', desc: '심벌마크, 슬로건, 캐릭터(세종이·자람이)' },
      { name: '찾아오시는 길', desc: '보람동 청사 위치 및 대중교통 안내' },
    ],
  },
  {
    title: '알림마당',
    href: '#notices',
    subcategories: [
      { name: '공지사항', desc: '교육청 공식 주요 행정 알림' },
      { name: '고시·공고', desc: '행정예고 및 법정 고시 공고문' },
      { name: '채용정보', desc: '교원/공무원/교육공무직원 선발공고' },
      { name: '보도자료', desc: '세종교육 생생한 언론 브리핑' },
      { name: '입찰정보', desc: '나라장터 연계 입찰 및 수의계약 공개' },
      { name: '주간행사계획', desc: '금주의 주요 교육행사 및 일정' },
    ],
  },
  {
    title: '참여마당',
    href: '#community',
    subcategories: [
      { name: '교육감에게 바란다', desc: '시민·학생·학부모 직접 소통 게시판' },
      { name: '시민참여 정책제안', desc: '세종교육 발전을 위한 창의 아이디어 공모' },
      { name: '주민참여예산방', desc: '내 손으로 만드는 세종 교육예산' },
      { name: '칭찬합시다', desc: '감사와 응원을 전하는 따뜻한 공간' },
      { name: '설문조사', desc: '교육 정책 수립을 위한 의견 수렴' },
    ],
  },
  {
    title: '민원마당',
    href: '#complaints',
    subcategories: [
      { name: '통합민원신청 (국민신문고)', desc: '온라인 민원 접수 및 처리 현황 조회' },
      { name: '온라인 제증명 발급안내', desc: '졸업/생활기록부 등 17종 즉시 발급' },
      { name: '자주 찾는 질문(FAQ)', desc: '분야별 다빈도 질의응답 검색' },
      { name: '세종교육신고센터', desc: '공직비리, 성희롱, 학폭 익명신고' },
      { name: '민원상담 전화안내', desc: '대표콜센터 044-320-1000' },
    ],
  },
  {
    title: '정보공개',
    href: '#open-info',
    subcategories: [
      { name: '정보공개제도 안내', desc: '청구 절차 및 비공개 세부기준' },
      { name: '사전정보공표 목록', desc: '시민 관심 정보 120개 과제 정기 공표' },
      { name: '업무추진비 집행내역', desc: '교육감 및 간부공무원 업무추진비 투명 공개' },
      { name: '예산·결산 공시', desc: '세종교육재정 운영 투명성 보고' },
      { name: '세종교육통계', desc: '학교별/학급별/학생수 공식 통계자료' },
    ],
  },
  {
    title: '교육마당',
    href: '#education',
    subcategories: [
      { name: '유아·특수교육', desc: '공립 숲유치원 및 특수맞춤교육' },
      { name: '초등·중등교육', desc: '세종 미래역량 중심 기초기본 교육과정' },
      { name: '세종 늘봄학교', desc: '초등 방과후 돌봄 통합지원포털' },
      { name: '세종진로진학정보', desc: '대입 수시/정시 및 진로상담 예약' },
      { name: '스마트 미래교육', desc: 'AI 디지털 교과서 및 에듀테크 지원' },
    ],
  },
];
