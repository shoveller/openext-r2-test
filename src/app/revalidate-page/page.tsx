export const revalidate = 60;

const RevalidatePageTest = () => {
  return (
    <div className="p-4 font-mono">
      <h1 className="mb-4 text-xl font-bold">Page Level ISR Test</h1>
      <div>TTL: {revalidate}s</div>
      <div>
        Page Render Time: <span className="text-blue-500">{new Date().toISOString()}</span>
      </div>
      <div className="mt-2 text-sm text-gray-500">* This entire page is cached for 60 seconds.</div>
    </div>
  );
};

export default RevalidatePageTest;
