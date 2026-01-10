import { getCloudflareContext } from '@opennextjs/cloudflare';
import { unstable_cache } from 'next/cache';

type WorkerFetch = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

type CachedQueryOptions = {
  revalidate?: number | false;
  tags?: string[];
};

export function createSelfFetch<TResult, TArgs extends never[]>(
  queryFn: (fetch: WorkerFetch, ...args: TArgs) => Promise<TResult>,
  keys: string[],
  options?: CachedQueryOptions,
) {
  return unstable_cache(
    async (...args: TArgs) => {
      const { env } = getCloudflareContext();
      const isDev = process.env.NODE_ENV === 'development';

      // -------------------------------------------------------
      // CASE 1: 로컬 개발 환경 (Deadlock 방지)
      // -------------------------------------------------------
      if (isDev) {
        const localFetcher: WorkerFetch = (input, init) => {
          // Request 객체가 들어오면 그대로 전달
          if (input instanceof Request) {
            return fetch(input, init);
          }

          // 문자열이나 URL 객체인 경우: http://127.0.0.1:3000 기준으로 절대 경로 생성
          // new URL()은 input이 이미 절대 경로면 base를 무시하므로 별도 if문 불필요
          const url = new URL(input.toString(), 'http://127.0.0.1:3000');
          return fetch(url.toString(), init);
        };

        return queryFn(localFetcher, ...args);
      }

      // -------------------------------------------------------
      // CASE 2: 배포 환경 (Service Binding 사용)
      // -------------------------------------------------------

      // 배포 환경인데 바인딩이 없으면 에러 (Guard Clause)
      if (!env?.WORKER_SELF_REFERENCE) {
        throw new Error(
          '[createSelfFetch] WORKER_SELF_REFERENCE binding is missing in production.',
        );
      }

      const worker = env.WORKER_SELF_REFERENCE;

      const workerFetcher: WorkerFetch = (input, init) => {
        // Request 객체가 들어오면 그대로 전달
        if (input instanceof Request) {
          return worker.fetch(input, init);
        }

        // Service Binding용 URL 생성
        // http://self는 더미 호스트이며, 실제로는 바인딩된 워커로 직접 라우팅됨
        const url = new URL(input.toString(), 'http://self');
        return worker.fetch(url.toString(), init);
      };

      return queryFn(workerFetcher, ...args);
    },
    keys,
    options,
  );
}
