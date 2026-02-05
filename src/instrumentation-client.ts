// src/instrumentation-client.ts
// 이 파일은 클라이언트 사이드(브라우저)에서 Sentry를 초기화하고 설정하는 역할을 합니다.
// 사용자가 브라우저에서 페이지를 로드할 때마다 이 설정이 적용됩니다.
// 상세 가이드: https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs';

import { sharedConfig } from '../sentry.shared.config';

Sentry.init({
  ...sharedConfig,

  // 클라이언트 환경 전용 통합(Integrations) 설정 추가
  integrations: [
    ...(sharedConfig.integrations || []),
    // HTTP 요청 추적: 외부 API 호출 성능과 응답 상태를 기록
    Sentry.httpClientIntegration(),
    // 세션 리플레이: 사용자의 상호작용을 녹화하여 에러 발생 시의 상황을 재현
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
    // 브라우저 프로파일링: 실제 사용자의 브라우저에서 함수 단위 성능을 측정
    Sentry.browserProfilingIntegration(),
    // 사용자 피드백 UI 제공
    Sentry.feedbackIntegration({
      colorScheme: 'system',
      isNameRequired: false,
      isEmailRequired: false,
      buttonLabel: '피드백 보내기',
      submitButtonLabel: '보내기',
      formTitle: '피드백',
    }),
  ],

  // 세션 리플레이 샘플링 비율 설정
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // 브라우저 환경 전용 노이즈 필터링
  denyUrls: [
    /extensions\//i,
    /^chrome-extension:\/\//i,
    /^moz-extension:\/\//i,
    /graph\.facebook\.com/i,
    /connect\.facebook\.net\/en_US\/all\.js/i,
  ],
});

// Next.js 앱 라우터의 내비게이션 시작 시 성능 측정을 위한 훅 내보내기
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
