// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'picsum.photos',
    //   },
    // ],
  },
};

export default withSentryConfig(nextConfig, {
  // 모든 옵션 확인: https://www.npmjs.com/package/@sentry/webpack-plugin#options
  org: 'illuwa-soft',
  project: 'javascript',

  // 소스맵 업로드 로그를 표시.
  silent: false,

  // 번들 사이즈 최적화 설정
  bundleSizeOptimizations: {
    excludeDebugStatements: false, // 디버그 코드 제거
    excludeTracing: false, // 트레이싱 코드 유지
  },

  // [보안] 소스맵 업로드 완료 후 빌드 결과물에서 소스맵을 삭제하여 외부 노출을 차단합니다.
  sourcemaps: {
    // 소스맵 업로드 이후에 자동 삭제
    deleteSourcemapsAfterUpload: true,
  },

  // [수집율] 광고 차단기에 의한 Sentry 차단을 방지하기 위해 터널링 경로를 설정합니다.
  // 이 경로는 미들웨어에서 제외되어야 정상적으로 동작합니다.
  tunnelRoute: '/monitoring',

  // [분석] 더 정밀한 스택 트레이스를 위해 클라이언트 파일 업로드 범위를 확장합니다.
  widenClientFileUpload: true,

  webpack: {
    // Vercel Cron 모니터링 자동 설정
    automaticVercelMonitors: true,

    // [디버깅] React 컴포넌트 이름을 에러 정보에 포함시켜 문제 지점을 쉽게 찾게 합니다.
    reactComponentAnnotation: {
      enabled: true,
    },

    // 트리쉐이킹 설정으로 번들 사이즈 최적화
    treeshake: {
      // Sentry 디버그 로그 구문을 빌드 시점에 제거합니다.
      removeDebugLogging: true,
    },
  },
});

initOpenNextCloudflareForDev();
