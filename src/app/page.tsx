import Link from 'next/link';

export default function Home() {
  return (
    <ul className="list-disc space-y-2 pl-5">
      <li>
        <Link href="/revalidate-page">페이지 레벨 revalidate 기반 ISR 테스트</Link>
      </li>
      <li>
        <Link href="/revalidate-fetch-external">fetch 레벨 revalidate 기반 ISR 테스트(외부)</Link>
      </li>
      <li>
        <Link href="/revalidate-fetch-internal">fetch 레벨 revalidate 기반 ISR 테스트(내부)</Link>
      </li>
    </ul>
  );
}
