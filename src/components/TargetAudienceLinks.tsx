import { useState } from 'react';
import { Users, GraduationCap, Building, ChevronRight, Laptop } from 'lucide-react';

interface TargetLink {
  title: string;
  desc: string;
  tag: string;
  badgeGel: string;
  url: string;
}

export default function TargetAudienceLinks() {
  const [activeTab, setActiveTab] = useState<'student' | 'parent' | 'teacher' | 'citizen'>('student');

  const audienceData: Record<
    'student' | 'parent' | 'teacher' | 'citizen',
    { title: string; subtitle: string; icon: any; links: TargetLink[] }
  > = {
    student: {
      title: '학생 맞춤 서비스',
      subtitle: '꿈을 키우고 안전하게 배우는 세종 학생 전용 공간',
      icon: GraduationCap,
      links: [
        {
          title: '세종 학생자치회 온라인 플랫폼',
          desc: '학생들이 직접 정책을 제안하고 의견을 나누는 소통 마당',
          tag: '자치참여',
          badgeGel: 'liquid-gel-blue',
          url: '#student-gov',
        },
        {
          title: '세종사이버안심존 및 스마트폰 과의존 예방',
          desc: '청소년 스마트폰 유해정보 차단 및 올바른 디지털 이용 습관',
          tag: '디지털윤리',
          badgeGel: 'liquid-gel-teal',
          url: '#digital-clean',
        },
        {
          title: '세종창의진로교육원 진로상담 예약',
          desc: '1:1 맞춤형 진로적성검사 및 전문 상담사 심층 진로컨설팅',
          tag: '진로진학',
          badgeGel: 'liquid-gel-violet',
          url: '#career-counseling',
        },
        {
          title: 'Wee센터 24시간 청소년 마음건강 상담',
          desc: '학업 스트레스, 친구 관계 고민을 비밀 보장으로 털어놓는 공간',
          tag: '마음안심',
          badgeGel: 'liquid-gel-rose',
          url: '#wee-center',
        },
      ],
    },
    parent: {
      title: '학부모 맞춤 서비스',
      subtitle: '아이의 바른 성장을 돕는 세종 학부모 종합지원센터',
      icon: Users,
      links: [
        {
          title: '세종 학부모 아카데미 및 연수 신청',
          desc: '자녀 양육 코칭, 미래 진로 특강, 학교폭력 예방 무료 학부모 교실',
          tag: '학부모연수',
          badgeGel: 'liquid-gel-teal',
          url: '#parent-academy',
        },
        {
          title: '늘봄학교·초등 돌봄교실 신청 안내',
          desc: '정규수업 전후 안심 돌봄 및 미래형 특기적성 프로그램',
          tag: '돌봄복지',
          badgeGel: 'bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-white',
          url: '#neulbom-care',
        },
        {
          title: '학교급식 안심 모니터링 및 식단표 조회',
          desc: '친환경 우수 농산물 식재료 원산지 정보 및 영양 식단 안내',
          tag: '안전급식',
          badgeGel: 'liquid-gel-teal',
          url: '#school-meal',
        },
        {
          title: '학부모 학교참여 공모사업 지원',
          desc: '단위학교 학부모회 자율 교육활동 지원 및 우수사례 공유',
          tag: '학교참여',
          badgeGel: 'liquid-gel-violet',
          url: '#parent-council',
        },
      ],
    },
    teacher: {
      title: '교직원 전용 서비스',
      subtitle: '선생님의 교육활동과 보람을 지키는 든든한 행정·복지 포털',
      icon: Laptop,
      links: [
        {
          title: 'K-에듀파인 및 원격업무지원 (eVPN)',
          desc: '국가지방교육재정시스템 및 외부 보안 원격 행정망 접속',
          tag: '행정포털',
          badgeGel: 'liquid-gel-rose',
          url: 'https://evpn.sje.go.kr',
        },
        {
          title: '세종교원치유지원센터 (마음봄)',
          desc: '교육활동 침해 사안 법률자문 및 심리상담·회복 프로그램 지원',
          tag: '교권보호',
          badgeGel: 'liquid-gel-blue',
          url: '#teacher-healing',
        },
        {
          title: '세종특별자치시교육원 직무연수 신청',
          desc: '교원 및 지방공무원 역량 강화를 위한 전문 원격·집합 연수 과정',
          tag: '전문연수',
          badgeGel: 'liquid-gel-violet',
          url: 'https://sjti.sje.go.kr',
        },
        {
          title: '교직원 맞춤형 복지포탈 바로가기',
          desc: '복지포인트 배정 현황, 단체보험 보장내역 및 카드 청구',
          tag: '맞춤복지',
          badgeGel: 'liquid-gel-teal',
          url: '#welfare-point',
        },
      ],
    },
    citizen: {
      title: '시민·지역사회 서비스',
      subtitle: '세종시민과 교육공동체가 함께 만드는 열린 자치행정',
      icon: Building,
      links: [
        {
          title: '주민참여예산 제안사업 공모',
          desc: '세종시 교육예산 편성과정에 직접 사업 아이디어를 제안하세요',
          tag: '주민참여',
          badgeGel: 'bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-white',
          url: '#citizen-budget',
        },
        {
          title: '세종평생교육학습관 프로그램 수강신청',
          desc: '인문학, 외국어, 디지털, 자격증 등 시민 맞춤형 평생학습 강좌',
          tag: '평생학습',
          badgeGel: 'liquid-gel-blue',
          url: 'https://sjle.sje.go.kr',
        },
        {
          title: '학교 시설(체육관·강당) 시민 개방 예약',
          desc: '지역 동호회 및 시민 대상 관내 각급 학교 체육시설 대관',
          tag: '시설대관',
          badgeGel: 'liquid-gel-teal',
          url: '#facility-reserve',
        },
        {
          title: '공공기록물 열람 및 정보공개청구',
          desc: '세종시교육청 행정정보 및 주요 정책 원문 문서 투명 열람',
          tag: '정보공개',
          badgeGel: 'liquid-gel-violet',
          url: '#open-info',
        },
      ],
    },
  };

  const current = audienceData[activeTab];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-label="대상별 맞춤 서비스">
      <div className="liquid-slab p-6 sm:p-8 space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/70 gap-3">
          <div>
            <span className="text-[11px] font-extrabold text-violet-700 tracking-wider uppercase">
              Target Services
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              대상별 맞춤 서비스
            </h2>
          </div>

          {/* 4 Tabs - Liquid Segmented Tabs Container */}
          <div className="liquid-tabs-container flex items-center gap-1">
            {(
              [
                { key: 'student', label: '학생', icon: GraduationCap },
                { key: 'parent', label: '학부모', icon: Users },
                { key: 'teacher', label: '교직원', icon: Laptop },
                { key: 'citizen', label: '시민', icon: Building },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'liquid-gel-violet text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
                  }`}
                  aria-selected={isActive}
                  role="tab"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Description */}
        <div>
          <p className="text-xs text-slate-500 font-medium">
            {current.subtitle}
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {current.links.map((link) => (
            <a
              key={link.title}
              href={link.url}
              className="liquid-card p-4 flex items-start justify-between gap-3 group"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs ${link.badgeGel}`}
                  >
                    {link.tag}
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-violet-700 transition-colors">
                  {link.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {link.desc}
                </p>
              </div>

              <div className="liquid-bubble w-7 h-7 flex items-center justify-center text-slate-400 group-hover:text-violet-700 shrink-0 mt-1">
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
