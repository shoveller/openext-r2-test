// sentry.server.config.ts
// 이 파일은 Node.js 런타임(빌드 타임 SSG, 로컬 개발, CI 등)에서 실행되는 Sentry 설정을 담고 있습니다.
// 상세 가이드: https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs';

import { sharedConfig } from './sentry.shared.config';

Sentry.init({
  ...sharedConfig,

  // Node.js 환경 전용 통합 설정 추가
  integrations: [
    ...(sharedConfig.integrations || []),
    // HTTP 요청 추적 (Node.js)
    Sentry.httpIntegration(),
    // 로컬 변수 캡처: 에러 발생 시점의 변수 값을 기록하여 빌드 에러 원인 파악을 돕습니다.
    Sentry.localVariablesIntegration(),
  ],

  // 서버 사이드 성능 추적 비율 (빌드 타임 데이터 수집을 위해 100%로 덮어씀)
  tracesSampleRate: 1.0,
});
