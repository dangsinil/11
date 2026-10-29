import { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
  Minimize2,
  Maximize2,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  actionType?: 'cert' | 'facility' | 'schools' | 'notices';
}

interface ChatbotWidgetProps {
  onOpenCertModal: () => void;
  onOpenFacilityModal: () => void;
  onScrollToSchools: () => void;
  onScrollToNotices: () => void;
}

export default function ChatbotWidget({
  onOpenCertModal,
  onOpenFacilityModal,
  onScrollToSchools,
  onScrollToNotices,
}: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `안녕하세요! 세종특별자치시교육청 공식 AI 상담원 **세종이**입니다. ✨\n\n교육행정, 온라인 제증명 발급, 늘봄학교, 전편입학 배정, 학교시설 개방 예약 등 궁금하신 사항을 무엇이든 질문해 주세요!`,
      timestamp: '방금 전',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickQuestions = [
    '온라인으로 졸업증명서는 어떻게 발급받나요?',
    '세종 늘봄학교 신청 대상과 프로그램을 알려주세요.',
    '초등학교 전학(전입학) 절차와 구비서류는?',
    '학교 체육관이나 강당 대여 예약은 어떻게 하나요?',
    '2026학년도 교원 및 교육공무직 채용 일정 안내',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
      setHasUnread(false);
    }
  }, [isOpen, isMinimized, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const history = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
        }),
      });

      const data = await res.json();
      const replyText = data.reply || '답변을 가져오는 중 오류가 발생했습니다.';

      let action: ChatMessage['actionType'] = undefined;
      const lowerReply = (text + ' ' + replyText).toLowerCase();
      if (lowerReply.includes('증명') || lowerReply.includes('졸업')) {
        action = 'cert';
      } else if (lowerReply.includes('시설') || lowerReply.includes('체육관') || lowerReply.includes('강당')) {
        action = 'facility';
      } else if (lowerReply.includes('학교') && lowerReply.includes('찾기')) {
        action = 'schools';
      } else if (lowerReply.includes('채용') || lowerReply.includes('공고')) {
        action = 'notices';
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: replyText,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        actionType: action,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: 'model',
          content: '서버와 연결이 원활하지 않습니다. 잠시 후 다시 질문해 주시거나 대표전화(044-320-1000)를 이용해 주세요.',
          timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        content: `대화가 초기화되었습니다. 궁금하신 세종교육 소식이나 행정 민원에 대해 질문해 주세요!`,
        timestamp: '방금 전',
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 1. Floating Launcher Button when Closed (Refractive Waterdroplet Glass with Specular Shine) */}
      {!isOpen && (
        <div className="relative group">
          {/* Tooltip Bubble */}
          {hasUnread && (
            <div className="absolute -top-12 right-0 liquid-pill-white text-slate-800 text-[11px] font-extrabold px-3 py-1.5 shadow-xl whitespace-nowrap animate-bounce flex items-center gap-1.5 border border-white">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              <span>세종교육 AI 상담톡 열기</span>
            </div>
          )}

          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="flex items-center gap-3 liquid-gel-violet px-5 py-3.5 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
            aria-label="세종교육 AI 상담 챗봇 열기"
          >
            <div className="relative w-7 h-7 rounded-full bg-white/20 border border-white/60 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-teal-300 rounded-full border border-white animate-pulse" />
            </div>
            <span className="font-extrabold text-sm tracking-tight pr-1 hidden sm:inline drop-shadow-xs">
              세종이 AI 상담톡
            </span>
          </button>
        </div>
      )}

      {/* 2. Open Chatbot Window (Liquid Glass Container) */}
      {isOpen && (
        <div
          className={`liquid-slab bg-white/80 backdrop-blur-3xl shadow-2xl border border-white overflow-hidden flex flex-col transition-all duration-300 ${
            isMinimized
              ? 'w-72 sm:w-80 h-14'
              : 'w-[92vw] sm:w-[420px] h-[590px] max-h-[85vh]'
          }`}
          role="region"
          aria-label="세종교육 AI 상담톡"
        >
          {/* Header (Frosted Glass Acrylic Bar) */}
          <div className="bg-gradient-to-r from-violet-600/80 via-purple-600/70 to-indigo-600/80 backdrop-blur-xl text-white px-4 py-3 flex items-center justify-between shrink-0 select-none border-b border-white/40">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-8 h-8 rounded-full bg-white/20 border border-white/50 flex items-center justify-center shrink-0 shadow-2xs">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-white truncate drop-shadow-xs">
                    세종이 AI 상담톡
                  </h3>
                  <span className="liquid-pill-white text-teal-700 text-[9px] font-black px-1.5 py-0.2 shadow-2xs">
                    실시간 ON
                  </span>
                </div>
                <div className="text-[10px] text-white/80 truncate font-medium">
                  세종특별자치시교육청 인공지능 민원상담
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleResetChat}
                className="liquid-bubble w-6 h-6 flex items-center justify-center text-slate-700 hover:text-violet-700 cursor-pointer"
                title="대화 초기화"
                aria-label="대화 초기화"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="liquid-bubble w-6 h-6 flex items-center justify-center text-slate-700 hover:text-violet-700 cursor-pointer"
                title={isMinimized ? '창 확대' : '창 최소화'}
                aria-label={isMinimized ? '창 확대' : '창 최소화'}
              >
                {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="liquid-bubble w-6 h-6 flex items-center justify-center text-slate-700 hover:text-rose-600 cursor-pointer"
                title="상담창 닫기"
                aria-label="상담창 닫기"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Body when Not Minimized */}
          {!isMinimized && (
            <>
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/40 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'model' && (
                      <div className="w-7 h-7 rounded-full liquid-gel-violet text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div className="max-w-[80%] space-y-1.5">
                      <div
                        className={`p-3.5 leading-relaxed whitespace-pre-wrap shadow-sm ${
                          msg.role === 'user'
                            ? 'liquid-gel-violet text-white rounded-2xl rounded-tr-none font-medium'
                            : 'liquid-card bg-white/90 text-slate-800 rounded-2xl rounded-tl-none font-sans font-medium'
                        }`}
                      >
                        {msg.content}

                        {/* Interactive Direct Action Shortcut within Bot Answer */}
                        {msg.actionType === 'cert' && (
                          <div className="mt-3 pt-2 border-t border-slate-100">
                            <button
                              onClick={onOpenCertModal}
                              className="w-full inline-flex items-center justify-center gap-1.5 liquid-gel-teal text-white font-extrabold px-3 py-2 text-[11px] shadow-sm cursor-pointer"
                            >
                              <span>온라인 제증명 발급 바로가기</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}

                        {msg.actionType === 'facility' && (
                          <div className="mt-3 pt-2 border-t border-slate-100">
                            <button
                              onClick={onOpenFacilityModal}
                              className="w-full inline-flex items-center justify-center gap-1.5 liquid-gel-teal text-white font-extrabold px-3 py-2 text-[11px] shadow-sm cursor-pointer"
                            >
                              <span>학교시설 개방 예약신청 바로가기</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}

                        {msg.actionType === 'schools' && (
                          <div className="mt-3 pt-2 border-t border-slate-100">
                            <button
                              onClick={onScrollToSchools}
                              className="w-full inline-flex items-center justify-center gap-1.5 liquid-gel-blue text-white font-extrabold px-3 py-2 text-[11px] shadow-sm cursor-pointer"
                            >
                              <span>관내 학교 및 기관 찾기 이동</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}

                        {msg.actionType === 'notices' && (
                          <div className="mt-3 pt-2 border-t border-slate-100">
                            <button
                              onClick={onScrollToNotices}
                              className="w-full inline-flex items-center justify-center gap-1.5 liquid-gel-rose text-white font-extrabold px-3 py-2 text-[11px] shadow-sm cursor-pointer"
                            >
                              <span>채용공고/알림마당 바로가기</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      <div
                        className={`text-[10px] text-slate-400 font-mono ${
                          msg.role === 'user' ? 'text-right' : 'text-left'
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-full liquid-pill-white text-slate-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs font-bold">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex gap-2.5 justify-start">
                    <div className="w-7 h-7 rounded-full liquid-gel-violet text-white flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="liquid-card bg-white/90 p-3 rounded-2xl rounded-tl-none flex items-center gap-2 text-slate-500 shadow-2xs">
                      <div className="w-2 h-2 rounded-full bg-violet-600 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-violet-600 animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 rounded-full bg-violet-600 animate-bounce [animation-delay:0.4s]" />
                      <span className="text-[11px] ml-1 font-medium">세종이가 답변을 작성하고 있습니다...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Chips (Smooth White Pills) */}
              <div className="px-3 py-2.5 bg-white/60 border-t border-white/80 flex items-center gap-1.5 overflow-x-auto">
                <span className="text-[10px] font-extrabold text-slate-500 shrink-0">빠른질문:</span>
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    disabled={isLoading}
                    className="liquid-pill-white hover:bg-white text-slate-700 hover:text-violet-700 text-[10px] font-semibold px-3 py-1 whitespace-nowrap transition-all shrink-0 cursor-pointer disabled:opacity-50 shadow-2xs"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar (Smooth White Pill Input & Gel Send Button) */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-white/70 border-t border-white/80 flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="세종교육에 대해 질문하세요..."
                  disabled={isLoading}
                  className="flex-1 liquid-pill-white text-xs px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-violet-400 font-medium placeholder-slate-400"
                  aria-label="상담 메시지 입력"
                />

                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="w-9 h-9 rounded-full liquid-gel-violet disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-sm disabled:cursor-not-allowed"
                  aria-label="메시지 전송"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
