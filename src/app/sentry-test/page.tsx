'use client';

import * as Sentry from '@sentry/nextjs';

export default function SentryTestPage() {
  const triggerClientError = () => {
    throw new Error('Sentry Test: Manual Client Error');
  };

  const triggerUnhandledRejection = () => {
    new Promise((_, reject) => {
      reject(new Error('Sentry Test: Unhandled Promise Rejection'));
    });
  };

  const callApiSuccess = async () => {
    const res = await fetch('/api/sentry-test');
    const data = await res.json();
    console.log(data);
    alert('API 호출 성공 (콘솔 확인)');
  };

  const callApiError = async () => {
    await fetch('/api/sentry-test', { method: 'POST' });
    alert('API 호출 완료 (서버 에러 유도됨)');
  };

  const captureManualMessage = () => {
    Sentry.captureMessage('Sentry Test: Manual Message');
    alert('메시지 캡처됨');
  };

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '300px',
      }}
    >
      <h1>Sentry Test Suite</h1>

      <button onClick={triggerClientError}>1. 클라이언트 에러 발생</button>
      <button onClick={triggerUnhandledRejection}>2. 프로미스 거부 발생</button>
      <button onClick={callApiSuccess}>3. API 호출 (성공)</button>
      <button onClick={callApiError}>4. API 호출 (서버 에러)</button>
      <button onClick={captureManualMessage}>5. 수동 메시지 캡처</button>

      <div style={{ marginTop: '20px' }}>
        <a href="/sentry-test/isr">ISR 테스트 페이지로 이동</a>
      </div>
    </div>
  );
}
