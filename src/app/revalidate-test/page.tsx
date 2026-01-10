export const revalidate = 600;

const RevalidateTest = () => {
  return (
    <div className="p-4 font-mono">
      <div>TTL: {revalidate}s</div>
      <div>Time: {new Date().toISOString()}</div>
    </div>
  );
};

export default RevalidateTest;
