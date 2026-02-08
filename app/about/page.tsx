import AboutClient from './AboutClient';
import { Metadata } from 'next';

// ✅ 核心优化：强化元数据
export const metadata: Metadata = {
  title: 'About AUVTEK | Leaders in AUV, UUV & Underwater Sonar Technology',
  description: 'AUVTEK is a pioneer in underwater technology, specializing in Autonomous Underwater Vehicles (AUV), Unmanned Underwater Vehicles (UUV), and advanced sonar systems for global research and industry.',
  keywords: 'about AUVTEK, Autonomous Underwater Vehicle manufacturer, UUV company, underwater sonar technology, marine research team, ocean exploration',
  openGraph: {
    title: 'About AUVTEK | Underwater Technology Leaders',
    description: 'Learn about our mission to advance ocean exploration with autonomous and acoustic technology.',
    type: 'website',
    url: 'https://www.auvtek.com/about',
  },
  alternates: {
    canonical: 'https://www.auvtek.com/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}