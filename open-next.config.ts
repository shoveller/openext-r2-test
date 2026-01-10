import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';
import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache';
import doQueue from '@opennextjs/cloudflare/overrides/queue/do-queue';

export default defineCloudflareConfig({
  // ISR(증분 정적 재생성)을 위한 캐시 저장소 설정
  // 기본 데이터는 R2(Object Storage)에 영구 저장되지만, 성능을 위해 Regional Cache(Tiered Cache)를 사용합니다.
  incrementalCache: withRegionalCache(r2IncrementalCache, {
    // 'long-lived': 캐시를 최대한 오래 유지하며(30분), 재검증(revalidate) 요청이 있을 때만 갱신합니다.
    // 'short-lived': 1분마다 강제로 만료시킵니다.
    mode: 'long-lived',
    // 캐시가 적중(Hit)하더라도 백그라운드에서 R2의 최신 데이터를 확인하여 업데이트합니다.
    // 오래된 지역 캐시가 계속 서빙되는 것을 방지합니다.
    shouldLazilyUpdateOnCacheHit: true,
  }),

  // Time-based ISR(시간 기반 재검증)을 위한 큐 설정
  // 동일한 페이지에 대한 재검증 요청이 동시에 여러 개 들어올 경우,
  // 이를 큐(Durable Object)에서 하나로 합쳐서(Deduplication) 서버 부하를 방지하고 순차적으로 처리합니다.
  // 예: revalidate: 60 설정이 있는 페이지에 트래픽이 몰릴 때 필수적입니다.
  queue: doQueue,
});
