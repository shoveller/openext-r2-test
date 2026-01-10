import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';
import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache';

export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(r2IncrementalCache, {
    mode: 'long-lived', // 'short-lived' (1분) 또는 'long-lived' (30분/재검증시까지) 선택 가능
    shouldLazilyUpdateOnCacheHit: true, // 캐시 적중 시에도 백그라운드에서 최신 데이터 확인
  }),
});
