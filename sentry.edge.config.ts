// sentry.edge.config.ts
// 이 파일은 Cloudflare Workers(V8 Isolate)와 같은 Edge 런타임에서 실행되는 Sentry 설정을 담고 있습니다.
// 상세 가이드: https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs';

import pkg from './package.json';
import { sharedConfig } from './sentry.shared.config';

Sentry.init({
  ...sharedConfig,

  // Edge 런타임은 실행 시간이 짧으므로 리포트 전송 지연을 방지하기 위해
  // 불필요한 클라이언트 리포트 기능을 비활성화합니다.
  sendClientReports: false,

  integrations: [
    ...(sharedConfig.integrations || []),
    // Edge 환경에서 fetch 요청을 추적하기 위한 통합 설정
    Sentry.winterCGFetchIntegration(),
  ],
});
