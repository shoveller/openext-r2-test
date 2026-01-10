import { unstable_cache } from 'next/cache';

export const revalidate = 0; // 페이지 자체는 매번 렌더링

// 캐싱된 시간을 반환하는 함수 (unstable_cache 적용)
const getCachedTime = unstable_cache(
  async () => new Date().toISOString(),
  ['cached-time'],
  { revalidate: 60 }
);

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