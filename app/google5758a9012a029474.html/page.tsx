export default function GoogleVerificationPage() {
  // 这个组件不需要渲染任何实际内容
  return null;
}

// 这是关键部分：生成静态的验证元数据
export async function generateMetadata() {
  return {
    // 这会让此路由直接返回Google要求的验证字符串
    other: {
      'google-site-verification': 'google5758a9012a029474.html',
    },
  };
}