import Link from 'next/link';

export default function Home() {
  return (
    <ul className="list-disc space-y-2 pl-5">
      <li>
        <Link href="/revalidate-page">페이지 레벨 revalidate 기능 테스트</Link>
      </li>
      <li>
        <Link href="/revalidate-fetch">fetch 레벨 revalidate 기능 테스트</Link>
      </li>
    </ul>
  );
}
