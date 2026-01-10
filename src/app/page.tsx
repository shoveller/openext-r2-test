import Link from 'next/link';

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/revalidate-test">페이지 레벨 revalidate 기능 테스트</Link>
      </li>
    </ul>
  );
}
