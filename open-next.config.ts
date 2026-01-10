import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';
import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache';
import doQueue from '@opennextjs/cloudflare/overrides/queue/do-queue';
import queueCache from '@opennextjs/cloudflare/overrides/queue/queue-cache';

export default defineCloudflareConfig({
  // ISR(증분 정적 재생성)을 위한 캐시 저장소 설정
  // 기본 데이터는 R2(Object Storage)에 영구 저장되지만, 성능을 위해 Regional Cache(Tiered Cache)를 사용한다.
  incrementalCache: withRegionalCache(r2IncrementalCache, {
    // 'long-lived': 캐시를 최대한 오래 유지하며(30분), 재검증(revalidate) 요청이 있을 때만 갱신한다.
    // 'short-lived': 1분마다 강제로 만료시킵니다.
    mode: 'long-lived',
    // 캐시가 적중(Hit)하더라도 백그라운드에서 R2의 최신 데이터를 확인하여 업데이트한다.
    // 오래된 지역 캐시가 계속 서빙되는 것을 방지한다.
    shouldLazilyUpdateOnCacheHit: true,
  }),

  // Time-based ISR(시간 기반 재검증)을 위한 큐 설정
  // queueCache를 사용하여 큐로 보내기 전에 Cache API를 확인, 불필요한 중복 요청(Stale Requests)을 줄인다.
  // Queue 는 진짜 queue 인프라가 아니라 Durable Objects 이다.
  queue: queueCache(doQueue, {
    regionalCacheTtlSec: 5, // 지역 캐시 TTL (기본값 5초)
    waitForQueueAck: true, // 큐가 요청을 받았다는 확인(ACK)을 기다린 후 응답할지 여부
  }),
});
