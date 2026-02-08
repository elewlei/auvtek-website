import HomeClient from './HomeClient';
import { Metadata } from 'next';

// ✅ 使用Next.js元数据API，确保标签在初始HTML中
export const metadata: Metadata = {
  title: 'AUVTEK | Advanced AUV, UUV & Underwater Sonar Systems Manufacturer',
  description: 'Leading manufacturer of Autonomous Underwater Vehicles (AUV), Unmanned Underwater Vehicles (UUV), and high-resolution sonar systems for marine research, defense, and offshore industries.',
  keywords: 'Autonomous Underwater Vehicle, AUV, UUV, Unmanned Underwater Vehicle, underwater sonar, sonar system, marine robotics, acoustic sensor, underwater drone, ocean exploration',
  openGraph: {
    title: 'AUVTEK | Advanced Underwater Autonomous Technology & Acoustic Solutions',
    description: 'Advanced AUV, UUV platforms and acoustic sensors for research, exploration, and innovation.',
    type: 'website',
    url: 'https://www.auvtek.com',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.auvtek.com',
  },
};

export default function HomePage() {
  return <HomeClient />;
}