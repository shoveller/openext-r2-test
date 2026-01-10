export const revalidate = 60;

const RevalidatePageTest = () => {
  return (
    <div className="p-4 font-mono">
      <h1 className="text-xl font-bold mb-4">Page Level ISR Test</h1>
      <div>TTL: {revalidate}s</div>
      <div>
        Page Render Time: <span className="text-blue-500">{new Date().toISOString()}</span>
      </div>
      <div className="text-sm text-gray-500 mt-2">
        * This entire page is cached for 60 seconds.
      </div>
    </div>
  );
};

export default RevalidatePageTest;
