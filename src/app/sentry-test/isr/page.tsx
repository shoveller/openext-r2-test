export const revalidate = 10; // 10초마다 재검증

export default function SentryIsrTestPage() {
  const now = new Date().toISOString();

  // 쿼리 파라미터나 특정 조건에 따라 서버 에러 유도 가능
  // 여기서는 단순히 렌더링 시점을 표시
  return (
    <div style={{ padding: '20px' }}>
      <h1>Sentry ISR Test</h1>
      <p>Last rendered at: {now}</p>
      <p>10초마다 ISR 재검증이 발생합니다.</p>
      <button
        onClick={() => {
          throw new Error('Sentry Test: ISR Client-side Error');
        }}
      >
        클라이언트 에러 발생시키기
      </button>
    </div>
  );
}
