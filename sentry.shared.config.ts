import * as Sentry from '@sentry/nextjs';

import pkg from './package.json';

/**
 * 이 파일은 클라이언트, 서버, 에지 런타임에서 공통으로 사용하는 Sentry 설정을 담고 있습니다.
 * 상세 설정 가이드: https://docs.sentry.io/platforms/javascript/guides/nextjs/
 */

const getRelease = () => {
  if (process.env.CF_PAGES_COMMIT_SHA) {
    return `${pkg.name}@${process.env.CF_PAGES_COMMIT_SHA}`;
  }

  return `${pkg.name}@${pkg.version}`;
};

export const sharedConfig = {
  // Sentry 프로젝트의 고유 식별자 (Data Source Name)
  dsn: 'https://4a59ecc0651b445ca39d9e98e2ce2383@o4505475310026752.ingest.us.sentry.io/4505475312779264',

  // 앱의 현재 버전 (Cloudflare 커밋 SHA 우선, 없으면 package.json의 version 사용)
  release: getRelease(),

  // 성능 추적 샘플링 비율 (1.0 = 100% 수집). 프로덕션 환경에서는 0.1 정도로 조절하는 것을 권장합니다.
  tracesSampleRate: 0.1,

  // Sentry SDK의 디버그 로그 활성화 여부
  enableLogs: true,

  // 사용자 개인정보(IP, HTTP 헤더 등) 자동 수집 여부
  sendDefaultPii: true,

  // 현재 앱의 환경 설정 (development, staging, production 등)
  environment: process.env.NODE_ENV,

  // 분산 추적 설정 (Distributed Tracing)
  // Sentry 추적 헤더를 허용할 타겟을 지정합니다. (자기 자신과 내부 API 경로 등)
  tracePropagationTargets: ['localhost', /^\//],

  // 무시할 에러 목록 (문자열 또는 정규식)
  ignoreErrors: [/ResizeObserver loop limit exceeded/, 'Script error.'],

  // 모든 환경에서 공통으로 사용하는 통합 기능들
  integrations: [
    // 콘솔 로그 자동 캡처
    Sentry.captureConsoleIntegration({
      levels: ['error', 'warn'],
    }),
    // 에러 객체의 추가 속성 캡처
    Sentry.extraErrorDataIntegration({
      depth: 3,
    }),
  ],

  // 에러 발생 시 특정 데이터나 민감 정보를 필터링하기 위한 콜백
  beforeSend(event) {
    return event;
  },
} satisfies Parameters<typeof Sentry.init>[0];
