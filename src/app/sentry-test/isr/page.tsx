export const revalidate = 10; // 10초마다 재검증

export default function SentryIsrTestPage() {
  const now = new Date().toISOString();

  // 이 페이지는 서버 사이드에서 생성되며, 10초마다 데이터가 갱신(ISR)됩니다.
  return (
    <div style={{ padding: '20px' }}>
      <h1>Sentry ISR Test</h1>
      <p>Last rendered at (Server-side): {now}</p>
      <p>10초마다 ISR 재검증이 발생합니다.</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/sentry-test">테스트 스위트로 돌아가기</a>
      </div>
    </div>
  );
}
