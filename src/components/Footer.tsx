import { useState } from 'react';
import { ArrowUp, MapPin } from 'lucide-react';

export default function Footer() {
  const [selectedFamily, setSelectedFamily] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedFamily(val);
    if (val) {
      window.open(val, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="mt-12 bg-white/50 backdrop-blur-2xl text-slate-600 text-xs border-t border-white/80" aria-label="교육청 대표 하단 정보">
      {/* Top Footer Policies Bar */}
      <div className="border-b border-white/60 bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 font-medium text-slate-700">
            <li>
              <a
                href="#privacy"
                className="text-violet-700 font-extrabold hover:underline"
              >
                개인정보처리방침
              </a>
            </li>
            <li>
              <span className="text-slate-300">|</span>
            </li>
            <li>
              <a href="#terms" className="hover:text-slate-900 hover:underline">
                이용약관
              </a>
            </li>
            <li>
              <span className="text-slate-300">|</span>
            </li>
            <li>
              <a href="#copyright" className="hover:text-slate-900 hover:underline">
                저작권보호정책
              </a>
            </li>
            <li>
              <span className="text-slate-300">|</span>
            </li>
            <li>
              <a href="#no-email" className="hover:text-slate-900 hover:underline">
                이메일무단수집거부
              </a>
            </li>
            <li>
              <span className="text-slate-300">|</span>
            </li>
            <li>
              <a href="#admin-guide" className="hover:text-slate-900 hover:underline">
                청사안내/찾아오시는길
              </a>
            </li>
            <li>
              <span className="text-slate-300">|</span>
            </li>
            <li>
              <a href="#viewer" className="hover:text-slate-900 hover:underline">
                뷰어프로그램 내려받기
              </a>
            </li>
          </ul>

          {/* Related Agencies Dropdown (Smooth White Pill) */}
          <div className="flex items-center gap-2">
            <select
              value={selectedFamily}
              onChange={handleFamilyChange}
              className="liquid-pill-white text-slate-700 text-xs px-3.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-violet-400 cursor-pointer font-medium"
              aria-label="유관기관 및 시도교육청 바로가기"
            >
              <option value="">-- 주요 유관기관 바로가기 --</option>
              <option value="https://www.moe.go.kr">교육부</option>
              <option value="https://www.sejong.go.kr">세종특별자치시청</option>
              <option value="https://www.neis.go.kr">나이스 대국민서비스</option>
              <option value="https://www.g2b.go.kr">조달청 나라장터</option>
              <option value="https://www.e-childschoolinfo.moe.go.kr">유치원알리미</option>
              <option value="https://www.schoolinfo.go.kr">학교알리미</option>
              <option value="https://www.gov.kr">정부24</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Footer Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Office Address & Contacts (9 cols) */}
          <div className="lg:col-span-9 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="font-black text-slate-900 text-sm">
                세종특별자치시교육청
              </span>
              <span className="text-slate-400 text-[11px] font-semibold">
                SEJONG SPECIAL SELF-GOVERNING CITY OFFICE OF EDUCATION
              </span>
            </div>

            <div className="space-y-1 text-slate-500 text-xs leading-relaxed font-medium">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  (우) 30151 세종특별자치시 한누리대로 2154 (보람동, 세종특별자치시교육청)
                </span>
              </p>
              <p className="flex flex-wrap items-center gap-x-4 gap-y-0.5">
                <span>
                  대표전화:{' '}
                  <strong className="text-slate-900 font-mono font-bold">044-320-1000</strong>
                </span>
                <span>
                  팩스: <span className="font-mono">044-320-1009</span>
                </span>
                <span>
                  당직실(야간): <span className="font-mono">044-320-1114</span>
                </span>
              </p>
            </div>

            <p className="text-[11px] text-slate-400 pt-1 font-normal">
              본 홈페이지에 게시된 이메일 주소가 자동 수집되는 것을 거부하며, 이를 위반 시 정보통신망법에 의해 처벌받을 수 있습니다.
              <br />
              Copyright &copy; 2026 Sejong Special Self-Governing City Office of Education. All Rights Reserved.
            </p>
          </div>

          {/* Right: Badges & Top Button (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end gap-4">
            <div className="flex items-center gap-2.5">
              {/* WA Accessibility Quality Mark Badge */}
              <div className="liquid-pill-white px-3 py-1.5 flex items-center gap-2 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-violet-100 border border-violet-200 flex items-center justify-center font-bold text-violet-700 text-[9px]">
                  WA
                </div>
                <div className="text-[10px] leading-tight">
                  <div className="font-bold text-slate-800">웹접근성인증</div>
                  <div className="text-slate-400">과기정통부</div>
                </div>
              </div>

              {/* KOGL Mark Badge */}
              <div className="liquid-pill-white px-3 py-1.5 flex items-center gap-2 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center font-bold text-teal-700 text-[9px]">
                  공공
                </div>
                <div className="text-[10px] leading-tight">
                  <div className="font-bold text-slate-800">공공누리</div>
                  <div className="text-slate-400">제1유형</div>
                </div>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="liquid-bubble px-4 py-2 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              aria-label="맨 위로 이동"
            >
              <span>맨 위로</span>
              <ArrowUp className="w-3.5 h-3.5 text-violet-700" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
