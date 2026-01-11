import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import { purgeCache } from '@opennextjs/cloudflare/overrides/cache-purge/index';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';
import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache';
import doQueue from '@opennextjs/cloudflare/overrides/queue/do-queue';
import queueCache from '@opennextjs/cloudflare/overrides/queue/queue-cache';
import doShardedTagCache from '@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache';

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
  // 시간기반 재검증 기능을 사용하지 않는다면 지워도 된다.
  queue: queueCache(doQueue, {
    regionalCacheTtlSec: 5, // 지역 캐시 TTL (기본값 5초)
    waitForQueueAck: true, // 큐가 요청을 받았다는 확인(ACK)을 기다린 후 응답할지 여부
  }),

  // On-Demand Revalidation(태그 기반 재검증) 시 필요한 태그와 경로 간의 매핑 정보를 저장한다.
  // 대규모 트래픽 처리를 위해 데이터를 여러 Durable Objects에 분산(Sharding) 저장하는 방식을 사용한다.
  // D1이나 DO를 사용할 수 있다. 아래의 옵션은 DO 1개가 트래픽을 담당한다.
  // 추천하는 DO의 갯수는 아래와 같다
  // 소규모: 1개
  // 중규모: 10 ~ 20개
  // 대규모: 수십 ~ 수백개
  tagCache: doShardedTagCache({ baseShardSize: 1 }),

  // revalidateTag/revalidatePath 호출 시 Cloudflare CDN 캐시를 즉시 삭제(Purge)한다.
  // 이 설정이 없으면 데이터가 갱신되어도 사용자는 계속 이전 캐시 화면을 보게 된다.
  // 'direct' 모드는 별도 DO 없이 API를 직접 호출한다.
  // CACHE_PURGE_API_TOKEN, CACHE_PURGE_ZONE_ID 필요하다
  // 커스텀 도메인에 배포할 때만 효과가 있다.
  cachePurge: purgeCache({ type: 'direct' }),

  // [PPR 사용 시 비활성화 필수]
  // 캐시된 페이지(ISR/SSG) 요청 시 Next.js 서버 로직을 건너뛰고 캐시에서 바로 응답한다.
  // PPR(Partial Prerendering)과는 호환되지 않으므로, PPR 사용 시 false로 설정하거나 제거해야 한다.
  enableCacheInterception: true,
});
