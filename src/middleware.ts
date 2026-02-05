import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 이 함수 내에서 `await`를 사용하는 경우 `async`를 추가할 수 있습니다.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 다음으로 시작하는 경로를 제외한 모든 요청 경로와 일치:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - monitoring (Sentry tunnelRoute)
     * - favicon.ico (파비콘 파일)
     */
    '/((?!api|_next/static|_next/image|monitoring|favicon.ico).*)',
  ],
};
