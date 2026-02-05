import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ verification: string }> }
) {
  const { verification } = await params;
  const verificationFileName = 'google5758a9012a029474.html';

  // 只有当访问的文件名完全匹配时，才返回验证内容
  if (verification === verificationFileName) {
    // 核心：返回 Google 要求的**精确内容**
    const verificationContent = 'google-site-verification: google5758a9012a029474.html';
    
    return new NextResponse(verificationContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        // 可选：添加缓存头，有助于验证
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  // 如果访问的不是验证文件，返回 404
  return NextResponse.json(
    { error: 'Not Found' },
    { status: 404 }
  );
}