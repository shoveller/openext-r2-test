import { unstable_cache } from 'next/cache';

export const revalidate = 0; // 페이지 자체는 매번 렌더링

// 함수의 실행결과를 캐시 (unstable_cache 적용)
// 첫 번째 인자: 캐싱할 비동기 함수 (DB 쿼리, 복잡한 연산 등)
// 두 번째 인자: 캐시 키 배열 (고유해야 함, 내부적으로 식별자로 사용)
// 세 번째 인자: 옵션 객체 (tags: 온디맨드 재검증용 태그, revalidate: 시간 기반 재검증 초)
const getCachedTime = unstable_cache(async () => new Date().toISOString(), ['cached-time'], {
  revalidate: 60,
});

export default async function RevalidateCacheTest() {
  const cachedTime = await getCachedTime();

  return (
    <div className="p-4 font-mono">
      <h1 className="mb-4 text-xl font-bold">unstable_cache ISR Test</h1>
      <div>TTL: 60s</div>
      <div>
        Cached Time: <span className="text-blue-500">{cachedTime}</span>
      </div>
      <div>
        Page Render Time: <span className="text-green-500">{new Date().toISOString()}</span>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        * The value from unstable_cache is cached for 60 seconds.
      </div>
    </div>
  );
}
