export const revalidate = 0; // 페이지 자체는 매번 렌더링

const RevalidateFetchTest = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto', {
    next: { revalidate: 60 },
  });
  const data = await res.json<{ time: number }>();

  return (
    <div className="p-4 font-mono">
      <h1 className="mb-4 text-xl font-bold">Fetch Level ISR Test</h1>
      <div>TTL: 60s</div>
      <div>
        API Time (Cached): <span className="text-blue-500">{JSON.stringify(data)}</span>
      </div>
      <div>
        Page Render Time: <span className="text-green-500">{new Date().toISOString()}</span>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        * Only the API response is cached. Page render time should update on refresh.
      </div>
    </div>
  );
};

export default RevalidateFetchTest;
