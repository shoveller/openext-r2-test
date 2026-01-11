import { revalidateTag } from 'next/cache';
import Link from 'next/link';

// 테스트를 위해 페이지 자체에는 시간기반 revalidate를 적용하지 않음
export const revalidate = 0;

// 인라인 서버 액션. 반드시 비동기 함수여야 함
const purge = async (tag: string) => {
  'use server';
  revalidateTag(tag);
};

const RevalidateFetchExternalTag = async (props: {
  searchParams: Promise<{ offset?: string }>;
}) => {
  const params = await props.searchParams;
  const offset = Number(params.offset) || 0;
  const limit = 5;
  const CACHE_TAG = `external-pokemon-${offset}`;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`, {
    next: { tags: [CACHE_TAG] },
  });
  const data = await res.json<{ results: { name: string }[] }>();
  // 서버액션은 직렬화해서 클라이언트로 보내고 이것으로 RPC를 구현한다.
  // 클라이언트로 보내려면 직렬화를 해야 하는데, 함수는 직렬화를 할 수 없다.
  // 그러므로 함수의 참조를 넘겨야 한다
  // bind 메소드를 사용해서 새로운 함수를 만들고 함수의 참조를 클라이언트로 보내서 RPC를 구현한다.
  const action = purge.bind(null, CACHE_TAG);

  return (
    <div className="p-4 font-mono">
      <p>렌더링한 시각: {new Date().toISOString()}</p>
      <ul>
        {data.results.map((p) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>

      <div className="my-4 flex gap-2">
        {offset > 0 && (
          <Link
            href={`?offset=${Math.max(0, offset - limit)}`}
            className="cursor-pointer border p-2"
          >
            이전페이지
          </Link>
        )}
        <Link href={`?offset=${offset + limit}`} className="cursor-pointer border p-2">
          다음페이지
        </Link>
      </div>

      <form action={action}>
        <button type="submit" className="cursor-pointer border p-2">
          CDN 지우기 {CACHE_TAG}
        </button>
      </form>
    </div>
  );
};

export default RevalidateFetchExternalTag;
