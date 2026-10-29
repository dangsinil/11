import {
  GraduationCap,
  FileCheck2,
  Building2,
  MapPin,
  Clock,
  ArrowRightLeft,
  Laptop,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { QUICK_SERVICES } from '../data/portalData.ts';
import { QuickServiceItem } from '../types/index.ts';

interface QuickServicesProps {
  onSelectService: (serviceId: string) => void;
}

export default function QuickServices({ onSelectService }: QuickServicesProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'FileCheck2':
        return <FileCheck2 className="w-5 h-5" />;
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5" />;
      case 'Clock':
        return <Clock className="w-5 h-5" />;
      case 'ArrowRightLeft':
        return <ArrowRightLeft className="w-5 h-5" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5" />;
      default:
        return <GraduationCap className="w-5 h-5" />;
    }
  };

  const getGelStyle = (color: QuickServiceItem['colorScheme']) => {
    switch (color) {
      case 'blue':
        return 'liquid-gel-blue';
      case 'teal':
        return 'liquid-gel-teal';
      case 'emerald':
        return 'liquid-gel-teal';
      case 'indigo':
        return 'liquid-gel-violet';
      case 'amber':
        return 'bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-white shadow-md border border-white/60';
      case 'rose':
        return 'liquid-gel-rose';
      default:
        return 'liquid-gel-blue';
    }
  };

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" aria-label="자주 찾는 주요 서비스">
      <div className="liquid-slab p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b border-white/70 mb-6 gap-2">
          <div>
            <span className="text-[11px] font-extrabold text-violet-700 uppercase tracking-wider">
              Quick Services
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              자주 찾는 서비스
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            시민, 학생, 학부모, 교직원이 가장 많이 이용하는 원스톱 민원 및 교육 서비스
          </p>
        </div>

        {/* 8 Grid Tiles - Liquid Glass Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {QUICK_SERVICES.map((svc) => {
            const gelClass = getGelStyle(svc.colorScheme);

            if (svc.actionType === 'external' && svc.target) {
              return (
                <a
                  key={svc.id}
                  href={svc.target}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-card p-4 flex flex-col justify-between group text-left cursor-pointer"
                  aria-label={`${svc.title} 새창으로 이동`}
                >
                  <div className="flex items-start justify-between mb-3">
                    {/* Glossy Liquid Gel Capsule Icon (like elements in reference image) */}
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform ${gelClass}`}
                    >
                      {getIcon(svc.iconName)}
                    </div>
                    {svc.badge ? (
                      <span className="liquid-pill-white text-[10px] font-extrabold px-2 py-0.5 text-violet-700 shadow-2xs">
                        {svc.badge}
                      </span>
                    ) : (
                      <div className="liquid-bubble w-6 h-6 flex items-center justify-center text-slate-400 group-hover:text-slate-700">
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-[15px] group-hover:text-violet-700 transition-colors flex items-center gap-1">
                      <span>{svc.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-violet-600" />
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate font-medium">
                      {svc.subtitle}
                    </p>
                  </div>
                </a>
              );
            }

            return (
              <button
                key={svc.id}
                onClick={() => onSelectService(svc.id)}
                className="liquid-card p-4 flex flex-col justify-between group text-left cursor-pointer"
                aria-label={`${svc.title} 상세창 열기`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform ${gelClass}`}
                  >
                    {getIcon(svc.iconName)}
                  </div>
                  {svc.badge && (
                    <span className="liquid-pill-white text-[10px] font-extrabold px-2 py-0.5 text-teal-700 shadow-2xs">
                      {svc.badge}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-[15px] group-hover:text-violet-700 transition-colors flex items-center gap-1">
                    <span>{svc.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-violet-600" />
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate font-medium">
                    {svc.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
