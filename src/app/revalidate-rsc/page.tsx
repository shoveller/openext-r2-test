// Next.js App Router의 모든 컴포넌트는 기본적으로 RSC(React Server Component)입니다.
// 여기에 revalidate 값을 export하면 해당 시간만큼 캐싱(ISR)됩니다.

export const revalidate = 60; // 60초마다 재생성 (ISR)

export default async function RevalidateRSCTest() {
  // RSC는 async/await를 사용할 수 있습니다.
  // 서버에서만 실행되는 로직 (예: DB 조회 시뮬레이션)
  await new Promise((resolve) => setTimeout(resolve, 100));

  const time = new Date().toISOString();

  return (
    <div className="p-4 font-mono">
      <h1 className="mb-4 text-xl font-bold">RSC (Server Component) ISR Test</h1>
      <div>TTL: 60s</div>
      <div>
        Render Time (RSC): <span className="text-purple-500">{time}</span>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        * This is an async Server Component.
        <br />* The resulting HTML and RSC Payload are cached in R2 for 60 seconds.
      </div>
    </div>
  );
}
