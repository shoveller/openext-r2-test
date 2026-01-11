import Image from 'next/image';

export const revalidate = 0;

export default function ImageTestPage() {
  const src = 'https://picsum.photos/seed/test/1920/1080';

  return (
    <div className="p-8 pb-96 font-mono">
      <h1 className="mb-6 text-2xl font-bold">Cloudflare 이미지 최적화 테스트</h1>

      <div>
        <h2 className="mb-2 text-lg font-semibold">반응형 이미지 테스트</h2>
        <p className="mb-4 text-sm break-keep text-gray-500">
          아래 이미지는 화면 너비의 80%를 차지하도록 설정되어 있습니다. <br />
          브라우저 창 크기를 조절하면 Next.js가 자동으로 적절한 해상도의 이미지를 Cloudflare에
          요청합니다.
          <br />
          (개발자 도구의 Network 탭에서 이미지 요청을 확인해보세요.)
        </p>

        <div className="relative mx-auto aspect-video w-[80vw] border-4 border-red-500 bg-gray-100">
          <Image
            src={src}
            alt="Responsive Test Image"
            fill
            sizes="80vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="mt-2 text-center text-xs text-gray-400">
          이미지 영역: 화면 너비의 80% (80vw)
        </div>
      </div>
    </div>
  );
}
