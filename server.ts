import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const port = parseInt(process.env.PORT || '3000', 10);

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini API client on the server side
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // System instruction for Sejong Office of Education Assistant
  const SYSTEM_INSTRUCTION = `당신은 대한민국 세종특별자치시교육청(sje.go.kr) 공식 인공지능 민원·교육상담 챗봇 "세종이"입니다.
세종시민, 학생, 학부모, 교직원의 교육행정 문의에 대해 공손하고 친절하며 명확하게 안내합니다.

세종특별자치시교육청의 핵심 정보:
- 교육 비전 및 슬로건: "모두가 특별해지는 세종교육", "새로운 학교, 행복한 아이들", "빛나는 오늘 설레는 내일"
- 교육청 주소: 세종특별자치시 한누리대로 2154 (보람동)
- 대표전화: 044-320-1000, 팩스: 044-320-1009
- 주요 서비스:
  1. 온라인 제증명 발급: 졸업증명서, 생활기록부, 재학증명서 등 (홈페이지 '온라인 제증명 발급' 메뉴 또는 나이스/정부24)
  2. 학교 시설 개방 예약: 관내 학교 체육관, 강당, 운동장 시민 개방 대여
  3. 세종 늘봄학교: 초등 전 학년 대상 맞춤형 방과후 및 돌봄 통합 서비스
  4. 학교 전·편입학: 초·중·고 학군 배정 및 필요 구비서류
  5. 세종교육신고센터: 공직비리, 학교폭력 제보, 불법사교육 익명 신고 (044-320-117)
  6. 교직원 원격업무: eVPN (evpn.sje.go.kr), K-에듀파인

답변 규칙:
- 간결하고 가독성 좋은 한국어로 불릿 포인트나 단계별로 설명합니다.
- 관련된 홈페이지 기능(예: '온라인 제증명 발급', '학교시설 예약', '알림마당')이 있으면 바로 이용할 수 있도록 친절히 안내합니다.
- 확실하지 않거나 개별 학교의 세부 학사일정은 학교 행정실 또는 교육청 대표전화(044-320-1000)로 안내합니다.`;

  // Fallback responder when API key is not configured or in case of network error
  function getKnowledgeFallbackResponse(query: string): string {
    const q = query.toLowerCase();
    if (q.includes('증명') || q.includes('졸업') || q.includes('생활기록부')) {
      return `[세종특별자치시교육청 제증명 발급 안내]\n\n• 초·중·고 졸업증명서, 학교생활기록부, 재학증명서는 홈페이지의 **[자주 찾는 서비스 > 온라인 제증명 발급]** 메뉴에서 즉시 신청 및 전자발급받으실 수 있습니다.\n• 정부24(gov.kr) 또는 나이스 대국민서비스(neis.go.kr)에서도 공인인증서 로그인 후 24시간 무료 발급이 가능합니다.\n• 문의: 세종특별자치시교육청 민원실 (044-320-1000)`;
    }
    if (q.includes('늘봄') || q.includes('돌봄') || q.includes('방과후')) {
      return `[세종 늘봄학교 안내]\n\n• **대상**: 세종 관내 모든 공립 초등학교 재학생\n• **주요 내용**: 정규수업 전후 질 높은 맞춤형 교육프로그램(놀이·체육·디지털·문화예술) 및 무료 2시간 맞춤형 돌봄을 제공합니다.\n• **신청 방법**: 해당 학교 학부모 알리미 또는 세종시교육청 방과후·늘봄 통합포털에서 분기별 신청이 가능합니다.\n• **안심 귀가**: 학교 안전지킴이 및 스마트 안심알림 서비스가 함께 연계됩니다.`;
    }
    if (q.includes('전학') || q.includes('전입') || q.includes('편입')) {
      return `[초·중·고 전·편입학 배정 안내]\n\n• **초등학교**: 관할 주민센터에서 전입신고 후 배정받은 통학구역 내 초등학교 교무실/행정실에 '주민등록등본'을 제출하여 즉시 전입\n• **중학교**: 세종시교육청 중등교육과를 통해 거주지 학교군 내 결원 범위 내 컴퓨터 추첨 배정\n• **고등학교**: 평준화 일반고는 본청 교육복지과에서 결원 현황에 따라 전입 절차 진행\n• 자세한 구비서류 및 상담: 교육복지과 학생배정담당 (044-320-3312)`;
    }
    if (q.includes('시설') || q.includes('체육관') || q.includes('강당') || q.includes('대여') || q.includes('예약')) {
      return `[학교시설 시민개방 예약 안내]\n\n• 세종시 관내 각급 초·중·고등학교 체육관, 다목적 강당, 운동장을 지역 주민 및 생활체육 동호인에게 개방하고 있습니다.\n• **이용 가능 시간**: 평일 방과후(18:00~22:00) 및 주말·공휴일(09:00~17:00)\n• **신청 방법**: 홈페이지 **[자주 찾는 서비스 > 학교시설 예약신청]**에서 온라인 예약서를 제출하시면 학교 행정실 승인 후 이용 가능합니다.`;
    }
    if (q.includes('채용') || q.includes('임용') || q.includes('시험') || q.includes('공무원')) {
      return `[2026학년도 채용 및 시험 안내]\n\n• **교원 임용시험**: 공립 유치원·초등·중등·특수 교사 임용 1차 필기시험 장소 및 수험생 유의사항이 공고되었습니다.\n• **교육공무직원 선발**: 교무행정사, 조리실무사, 특수교육실무사 공개경쟁 채용 원서접수가 진행 중입니다.\n• 홈페이지 상단 **[알림마당 > 채용정보]** 탭에서 공고문 전문과 응시원서(HWP)를 다운로드하실 수 있습니다.`;
    }
    if (q.includes('교육감') || q.includes('제안') || q.includes('소통')) {
      return `[열린 교육감실 소통 안내]\n\n• 제5대 세종특별자치시교육감은 "모두가 특별해지는 세종교육"을 위해 시민과 교육가족의 의견을 소중히 경청하고 있습니다.\n• 메인 화면의 **[열린 교육감실 > 교육감에게 바란다]** 또는 상단 **[참여마당 > 시민참여 정책제안]** 게시판에 자유롭게 제안을 남기실 수 있습니다.`;
    }
    return `안녕하세요! 세종특별자치시교육청 AI 상담원 세종이입니다.\n\n문의하신 내용에 대해 안내해 드립니다:\n세종 교육행정, 온라인 제증명 발급, 관내 학교 전입학, 늘봄학교 프로그램, 학교 시설 개방 예약, 채용공고 등에 대해 질문해 주시면 상세히 답변해 드릴 수 있습니다.\n\n추가로 궁금하신 점이 있으시면 교육청 대표번호(044-320-1000) 또는 담당 부서로 편하게 문의해 주시기 바랍니다.`;
  }

  // API endpoint for Chatbot
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: '메시지를 입력해주세요.' });
      }

      // If Gemini client is configured with API key
      if (ai) {
        try {
          const contents: any[] = [];
          if (Array.isArray(history)) {
            for (const h of history) {
              if (h.role === 'user' || h.role === 'model') {
                contents.push({
                  role: h.role,
                  parts: [{ text: h.content || '' }],
                });
              }
            }
          }
          contents.push({
            role: 'user',
            parts: [{ text: message }],
          });

          const generatePromise = ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
            },
          });

          // Timeout after 2500ms to guarantee instant response in container
          const timeoutPromise = new Promise<null>((_, reject) =>
            setTimeout(() => reject(new Error('Gemini API timeout')), 2500)
          );

          const response = await Promise.race([generatePromise, timeoutPromise]);
          const replyText = response?.text || getKnowledgeFallbackResponse(message);
          return res.json({ reply: replyText });
        } catch (apiError: any) {
          console.warn('Gemini API call warning, using authoritative knowledge response:', apiError?.message || apiError);
          const fallbackReply = getKnowledgeFallbackResponse(message);
          return res.json({ reply: fallbackReply });
        }
      } else {
        // Fallback knowledge response if no API key
        const fallbackReply = getKnowledgeFallbackResponse(message);
        return res.json({ reply: fallbackReply });
      }
    } catch (err: any) {
      console.error('Server error handling chat:', err);
      return res.status(500).json({
        reply: '상담 처리 중 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    }
  });

  // Vite middleware in dev or static files in production
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port} (mode: ${isProd ? 'production' : 'development'})`);
  });
}

startServer();
