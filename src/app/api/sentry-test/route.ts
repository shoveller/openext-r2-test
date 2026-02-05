import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Sentry test GET successful' });
}

export async function POST() {
  // 의도적인 서버 에러 발생
  throw new Error('Sentry Test: Intentional Server Error (POST /api/sentry-test)');
}
