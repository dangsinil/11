export type NoticeCategory = 'all' | 'notice' | 'announcement' | 'recruitment' | 'press' | 'tender';

export interface NoticeItem {
  id: string;
  category: 'notice' | 'announcement' | 'recruitment' | 'press' | 'tender';
  title: string;
  department: string;
  date: string;
  views: number;
  isNew?: boolean;
  isUrgent?: boolean;
  content: string;
  attachments?: {
    name: string;
    size: string;
    type: 'hwp' | 'pdf' | 'zip' | 'xlsx';
  }[];
}

export interface QuickServiceItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  badge?: string;
  actionType: 'modal' | 'external' | 'link';
  target?: string;
  colorScheme: 'blue' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'teal';
}

export type SchoolLevel = 'all' | 'kindergarten' | 'elementary' | 'middle' | 'high' | 'special' | 'institute';

export interface SchoolItem {
  id: string;
  name: string;
  level: SchoolLevel;
  district: string; // e.g., 보람동, 다정동, 나성동, 어진동, 조치원읍
  address: string;
  tel: string;
  homepageUrl: string;
  studentsCount: number;
  establishedYear: number;
}

export interface CampaignSlide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  badgeText: string;
  gradientClass: string;
  accentColor: string;
  linkText: string;
  category: string;
}

export interface CardNewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  imagePrompt: string;
  likes: number;
}

export interface CertificateApplication {
  applicantName: string;
  birthDate: string;
  phone: string;
  certificateType: string;
  schoolName: string;
  graduationYear: string;
  purpose: string;
}

export interface FacilityBookingForm {
  applicantName: string;
  groupName: string;
  phone: string;
  schoolId: string;
  facilityType: 'auditorium' | 'gym' | 'field' | 'classroom';
  date: string;
  timeSlot: string;
  participantsCount: number;
  purpose: string;
}
