import { useState, useEffect } from 'react';
import TopGovBar from './components/TopGovBar.tsx';
import Header from './components/Header.tsx';
import HeroBanner from './components/HeroBanner.tsx';
import QuickServices from './components/QuickServices.tsx';
import NoticeBoardSection from './components/NoticeBoardSection.tsx';
import CampaignAndMedia from './components/CampaignAndMedia.tsx';
import TargetAudienceLinks from './components/TargetAudienceLinks.tsx';
import SchoolFinderSection from './components/SchoolFinderSection.tsx';
import Footer from './components/Footer.tsx';

import NoticeDetailModal from './components/Modals/NoticeDetailModal.tsx';
import CertificateModal from './components/Modals/CertificateModal.tsx';
import FacilityBookingModal from './components/Modals/FacilityBookingModal.tsx';
import SearchModal from './components/Modals/SearchModal.tsx';
import SitemapModal from './components/Modals/SitemapModal.tsx';
import SuperintendentModal from './components/Modals/SuperintendentModal.tsx';
import ReportModal from './components/Modals/ReportModal.tsx';
import VideoModal from './components/Modals/VideoModal.tsx';
import ChatbotWidget from './components/Chatbot/ChatbotWidget.tsx';

import { NoticeItem, NoticeCategory, CardNewsItem } from './types/index.ts';

export default function App() {
  const [fontSize, setFontSize] = useState<number>(100);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);

  // Modal states
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isFacilityModalOpen, setIsFacilityModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSitemapModalOpen, setIsSitemapModalOpen] = useState(false);
  const [isSuperintendentModalOpen, setIsSuperintendentModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    title: string;
    videoUrl: string;
  }>({
    isOpen: false,
    title: '',
    videoUrl: '',
  });

  // Notice category state
  const [activeNoticeCategory, setActiveNoticeCategory] = useState<NoticeCategory>('all');

  // Handle High Contrast mode toggle on document body
  useEffect(() => {
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  // Handle Quick Service Click Dispatches
  const handleSelectService = (serviceId: string) => {
    switch (serviceId) {
      case 'cert':
        setIsCertModalOpen(true);
        break;
      case 'facility':
        setIsFacilityModalOpen(true);
        break;
      case 'school_map':
        const el = document.getElementById('schools');
        el?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'afterschool':
        setActiveNoticeCategory('notice');
        document.getElementById('notices')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'transfer':
        setActiveNoticeCategory('notice');
        document.getElementById('notices')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'report':
        setIsReportModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleHeroSlideClick = (category: string) => {
    if (category === '교육감실') {
      setIsSuperintendentModalOpen(true);
    } else if (category === '인사채용') {
      setActiveNoticeCategory('recruitment');
      document.getElementById('notices')?.scrollIntoView({ behavior: 'smooth' });
    } else if (category === '학생안전') {
      setIsReportModalOpen(true);
    } else {
      setActiveNoticeCategory('notice');
      document.getElementById('notices')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCardNewsClick = (card: CardNewsItem) => {
    // Open a notice detail or search for related topic
    setIsSearchModalOpen(true);
  };

  return (
    <div
      style={{ fontSize: `${fontSize}%` }}
      className="min-h-screen flex flex-col relative overflow-x-hidden bg-[#f3f1ec] text-slate-800 transition-all duration-150"
    >
      {/* Liquid Glass Ambient Chromatic Light Orbs (Refracts through all frosted acrylic slabs) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-5%] left-[10%] w-[550px] h-[550px] rounded-full bg-violet-300/35 blur-[120px]" />
        <div className="absolute top-[20%] right-[5%] w-[600px] h-[600px] rounded-full bg-teal-200/40 blur-[130px]" />
        <div className="absolute top-[50%] left-[3%] w-[500px] h-[500px] rounded-full bg-rose-200/35 blur-[120px]" />
        <div className="absolute top-[75%] right-[12%] w-[650px] h-[650px] rounded-full bg-sky-200/40 blur-[140px]" />
      </div>

      {/* 1. Top Government Accessibility Banner */}
      <TopGovBar
        fontSize={fontSize}
        setFontSize={setFontSize}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        onOpenSitemap={() => setIsSitemapModalOpen(true)}
      />

      {/* 2. Main Header & GNB */}
      <Header
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenSitemap={() => setIsSitemapModalOpen(true)}
        onSelectCategory={(cat) => {
          setActiveNoticeCategory(cat as NoticeCategory);
          document.getElementById('notices')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Body Content */}
      <main className="flex-1">
        {/* 3. Hero Visual & Campaigns Slider + Superintendent Box */}
        <HeroBanner
          onSlideClick={handleHeroSlideClick}
          onOpenSuperintendent={() => setIsSuperintendentModalOpen(true)}
        />

        {/* 4. Quick Services Tiles (8 Grid) */}
        <QuickServices onSelectService={handleSelectService} />

        {/* 5. Notice Board Section (Categorized & Searchable Tabs) */}
        <NoticeBoardSection
          onSelectNotice={(notice) => setSelectedNotice(notice)}
          activeCategory={activeNoticeCategory}
          setActiveCategory={setActiveNoticeCategory}
        />

        {/* 6. Media & Campaign (Card News, Webzine, Pillars) */}
        <CampaignAndMedia
          onOpenVideo={(title, videoUrl) =>
            setVideoModal({ isOpen: true, title, videoUrl })
          }
          onOpenCardNews={handleCardNewsClick}
        />

        {/* 7. Target Audience Services [학생] [학부모] [교직원] [시민] */}
        <TargetAudienceLinks />

        {/* 8. School & Institution Finder Directory */}
        <SchoolFinderSection />
      </main>

      {/* 9. Official Government Footer */}
      <Footer />

      {/* Modals & Dialogs */}
      <NoticeDetailModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />

      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
      />

      <FacilityBookingModal
        isOpen={isFacilityModalOpen}
        onClose={() => setIsFacilityModalOpen(false)}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectNotice={(notice) => setSelectedNotice(notice)}
      />

      <SitemapModal
        isOpen={isSitemapModalOpen}
        onClose={() => setIsSitemapModalOpen(false)}
      />

      <SuperintendentModal
        isOpen={isSuperintendentModalOpen}
        onClose={() => setIsSuperintendentModalOpen(false)}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      <VideoModal
        isOpen={videoModal.isOpen}
        title={videoModal.title}
        videoUrl={videoModal.videoUrl}
        onClose={() => setVideoModal({ isOpen: false, title: '', videoUrl: '' })}
      />

      {/* 10. AI Chatbot Counselor Widget (세종이) */}
      <ChatbotWidget
        onOpenCertModal={() => setIsCertModalOpen(true)}
        onOpenFacilityModal={() => setIsFacilityModalOpen(true)}
        onScrollToSchools={() => {
          document.getElementById('schools')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onScrollToNotices={() => {
          setActiveNoticeCategory('recruitment');
          document.getElementById('notices')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}
