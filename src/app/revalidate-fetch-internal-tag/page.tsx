import { revalidateTag } from 'next/cache';

import { createSelfFetch } from '../createSelfFetch';

export const revalidate = 0;

const CACHE_TAG = 'internal-time';

const getCachedTime = createSelfFetch(
  async (fetch) => {
    const res = await fetch('/api/time');
    return res.json<{ time: number }>();
  },
  ['time-data-tag'],
  { tags: [CACHE_TAG] },
);

const purge = async () => {
  'use server';
  revalidateTag(CACHE_TAG);
};

const RevalidateFetchInternalTag = async () => {
  const data = await getCachedTime();

  return (
    <div className="p-4 font-mono">
      <p>캐시한 시각: {data?.time}</p>
      <p>렌더링한 시각: {new Date().toISOString()}</p>

      <form action={purge} className="mt-4">
        <button type="submit" className="cursor-pointer border p-2">
          CDN 지우기 {CACHE_TAG}
        </button>
      </form>
    </div>
  );
};

export default RevalidateFetchInternalTag;
