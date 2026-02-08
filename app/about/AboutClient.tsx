"use client";

import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowRight, Award, Users, Zap, Globe, ChevronRight, Menu, X, ChevronDown, Waves } from "lucide-react";
import Head from 'next/head';
import { useMemo, useState, useEffect } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 定义类型
interface ValueCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

interface Capability {
  title: string;
  items: string[];
}

interface TeamMember {
  role: string;
  count: string;
  desc: string;
}

interface Statistic {
  value: string;
  label: string;
}

// 常量定义
const VALUES: ValueCard[] = [
  {
    icon: Zap,
    title: "Innovation",
    desc: "Continuously pushing the boundaries of autonomous navigation and underwater acoustic sensing to create next-generation AUV/UUV and sonar solutions.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Uncompromising commitment to quality, reliability, and performance",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "Working closely with partners to achieve shared objectives",
  },
  {
    icon: Globe,
    title: "Sustainability",
    desc: "Protecting marine environments while advancing scientific knowledge",
  },
];

const CAPABILITIES: Capability[] = [
  {
    title: "Autonomous Vehicle & Navigation Lab",
    items: [
      "AUV/UUV vehicle design and prototyping",
      "Underwater navigation system development",
      "Autonomous mission control algorithms",
      "Sonar system integration and testing",
    ],
  },
  {
    title: "Advanced Acoustic & Sonar Research",
    items: [
      "Hydrophone and transducer design and calibration",
      "High-resolution sonar system development",
      "Synthetic Aperture Sonar (SAS) signal processing",
      "Acoustic Vector Sensor characterization",
    ],
  },
  {
    title: "Integration & Testing",
    items: [
      "System integration services",
      "Pressure testing facilities",
      "Performance validation",
      "Quality assurance",
    ],
  },
  {
    title: "Field Operations",
    items: [
      "Deployment support",
      "Mission management",
      "Data acquisition",
      "Technical consultation",
    ],
  },
];

const TEAM_DATA: TeamMember[] = [
  {
    role: "Research & Development",
    count: "25+",
    desc: "Engineers and scientists advancing autonomous and acoustic technology",
  },
  {
    role: "Operations & Support",
    count: "15+",
    desc: "Technical specialists ensuring mission success and customer satisfaction",
  },
  {
    role: "Business & Strategy",
    count: "10+",
    desc: "Leaders driving partnerships and market innovation",
  },
];

const STATISTICS: Statistic[] = [
  { value: "15+", label: "Years of Experience" },
  { value: "500+", label: "Successful Missions" },
  { value: "50+", label: "Global Partners" },
];

// 子组件：统计数据卡片
const StatCard = ({ value, label }: Statistic) => (
  <div className="flex-1">
    <p className="text-3xl font-bold text-primary">{value}</p>
    <p className="text-muted-foreground mt-1">{label}</p>
  </div>
);

// 子组件：价值卡片
const ValueCard = ({ icon: Icon, title, desc }: ValueCard) => (
  <div 
    className="bg-white border border-border rounded-lg p-8 text-center hover:shadow-md transition-shadow"
    role="article"
    aria-label={`${title}: ${desc}`}
  >
    <div 
      className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4"
      aria-hidden="true"
    >
      <Icon className="w-8 h-8 text-accent" />
    </div>
    <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
    <p className="text-muted-foreground text-sm">{desc}</p>
  </div>
);

// 子组件：能力卡片
const CapabilityCard = ({ title, items }: Capability) => (
  <div className="bg-muted/50 border border-border rounded-lg p-8 hover:shadow-sm transition-shadow">
    <h3 className="text-xl font-bold text-primary mb-4">{title}</h3>
    <ul className="space-y-3" aria-label={`${title} capabilities`}>
      {items.map((item, index) => (
        <li 
          key={index} 
          className="flex items-center gap-2 text-muted-foreground"
        >
          <div 
            className="w-2 h-2 bg-accent rounded-full flex-shrink-0"
            aria-hidden="true"
          ></div>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// 子组件：团队卡片
const TeamCard = ({ role, count, desc }: TeamMember) => (
  <div 
    className="bg-white border border-border rounded-lg p-8 text-center hover:shadow-md transition-shadow"
    role="article"
  >
    <p className="text-4xl font-bold text-accent mb-2">{count}</p>
    <h3 className="text-lg font-bold text-primary mb-3">{role}</h3>
    <p className="text-muted-foreground text-sm">{desc}</p>
  </div>
);

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 处理滚动效果
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 导航菜单项
  const navItems = [
    { label: 'Home', href: '/' },
    { 
      label: 'Products', 
      href: '/products',
      submenu: [
        { label: 'Autonomous Vehicles', href: '/products#auv' },
        { label: 'Acoustic Sensors', href: '/products#sensors' },
        { label: 'Sonar Systems', href: '/products#sonar' },
        { label: 'Custom Solutions', href: '/products#custom' },
      ]
    },
    { 
      label: 'Solutions', 
      href: '/solutions',
      submenu: [
        { label: 'Scientific Research', href: '/solutions#research' },
        { label: 'Environmental Monitoring', href: '/solutions#environmental' },
        { label: 'Offshore Operations', href: '/solutions#offshore' },
        { label: 'Defense & Security', href: '/solutions#defense' },
      ]
    },
    { label: 'About', href: '/about' },
  ];

  // 使用 useMemo 优化性能
  const memoizedValues = useMemo(() => VALUES, []);
  const memoizedCapabilities = useMemo(() => CAPABILITIES, []);
  const memoizedTeamData = useMemo(() => TEAM_DATA, []);
  const memoizedStatistics = useMemo(() => STATISTICS, []);

  return (
    <>




      <div className="w-full" role="main">
        {/* 固定导航栏 */}
        <nav 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled 
              ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg py-3' 
              : 'bg-white py-3'
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Waves className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-primary">
                  AUVTEK
                </span>
              </Link>

              {/* 桌面导航菜单 */}
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <div key={item.label} className="relative group">
                    <Link
                      href={item.href}
                      className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                        scrolled
                          ? 'text-gray-700 hover:text-primary hover:bg-primary/5'
                          : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {item.label}
                      {item.submenu && <ChevronDown className="ml-1 w-4 h-4" />}
                    </Link>
                    
                    {/* 下拉菜单 */}
                    {item.submenu && (
                      <div className="absolute top-full left-0 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Get in Touch 按钮 */}
                <Link href="/contact" className="ml-2">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Get in Touch
                  </Button>
                </Link>
              </div>

              {/* 移动端菜单按钮 */}
              <button
                className="md:hidden p-2 rounded-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>

            {/* 移动端菜单 */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 bg-white rounded-lg shadow-xl border border-gray-100 p-4">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 mt-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-4 py-2 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors text-sm"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* 内容区域 - 添加 margin-top 避免被导航栏遮挡 */}
        <div className="pt-16">
          {/* Page Header */}
          <section 
            className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border"
            aria-labelledby="page-title"
          >
            <div className="container mx-auto px-4">
              <h1 
                id="page-title" 
                className="text-5xl md:text-6xl font-bold text-primary mb-4"
              >
                About AUVTEK
              </h1>
              <p className="text-xl text-muted-foreground whitespace-nowrap mx-auto">
                Leading innovation in underwater autonomous technology and acoustic sensing
              </p>
              
            </div>
          </section>

          
{/* Mission Section */}
<section 
  className="py-20 bg-white"
  aria-labelledby="mission-title"
>
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 
          id="mission-title" 
          className="text-4xl font-bold text-primary mb-6"
        >
          Our Mission
        </h2>
        
<div className="space-y-6">
  <p className="text-lg text-muted-foreground">
    At AUVTEK, we are the driving force behind the next generation of <strong>underwater autonomous and sonar technology</strong>. As a leading developer of <strong>Autonomous Underwater Vehicles (AUV)</strong> and <strong>Unmanned Underwater Vehicles (UUV)</strong>, combined with our cutting-edge <strong>Underwater Sonar</strong> and <strong>Acoustic Sensor</strong> systems, we empower scientists, engineers, and industries to unlock the secrets of the deep.
  </p>
  <p className="text-lg text-muted-foreground">
    Our mission is twofold: to engineer the most reliable and capable <strong>underwater exploration platforms</strong>, and to provide the high-fidelity sensing tools—like our <strong>Synthetic Aperture Sonar (SAS), Side-scan Sonar, Ultra-Wide Band Transducers</strong>—that turn data into discovery. We believe that advancing <strong>underwater technology</strong> is essential for oceanographic research, environmental stewardship, and the future of marine operations.
  </p>
</div>

        
        {/* 统计数据 */}
        <div 
          className="flex gap-6 mt-8 pt-8 border-t border-border"
          role="list"
          aria-label="Company statistics"
        >
          {memoizedStatistics.map((stat, index) => (
            <div 
              key={index} 
              role="listitem"
              className="flex-1"
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </div>
      
      {/* 图片区域 - Swiper轮播 */}
      <div className="relative">
        <div className="h-96 rounded-lg shadow-lg overflow-hidden">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="h-full"
          >
            <SwiperSlide>
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/sonar-imaging-visualization.jpg')",
                }}
                role="img"
                aria-label="Deep ocean exploration with AUVTEK technology"
              />
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/Fieldtest01.jpg')",
                }}
                role="img"
                aria-label="Underwater research platform"
              />
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/Fieldtest02.jpg')",
                }}
                role="img"
                aria-label="Acoustic sensors technology"
              />
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/Fieldtest03.jpg')",
                }}
                role="img"
                aria-label="AUV operations in deep sea"
              />
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/SAS-image01.jpg')",
                }}
                role="img"
                aria-label="AUV operations in deep sea"
              />
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/SAS-image02.jpg')",
                }}
                role="img"
                aria-label="AUV operations in deep sea"
              />
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/SAS-image03.jpg')",
                }}
                role="img"
                aria-label="AUV operations in deep sea"
              />
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/SAS-image04.jpg')",
                }}
                role="img"
                aria-label="AUV operations in deep sea"
              />
            </SwiperSlide>

          </Swiper>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2">
          AUVTEK technology in action
        </p>
      </div>
    </div>
  </div>
</section>



          {/* Values Section */}
          <section 
            className="py-20 bg-muted/30"
            aria-labelledby="values-title"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 
                  id="values-title" 
                  className="text-4xl font-bold text-primary mb-4"
                >
                  Our Values
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  The principles that guide our innovation and partnerships
                </p>
              </div>

              <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                role="list"
                aria-label="Company values"
              >
                {memoizedValues.map((value, idx) => (
                  <div 
                    key={idx} 
                    role="listitem"
                  >
                    <ValueCard {...value} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* R&D Capability Section */}
          <section 
            className="py-20 bg-white"
            aria-labelledby="capabilities-title"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 
                  id="capabilities-title" 
                  className="text-4xl font-bold text-primary mb-4"
                >
                  R&D Capabilities
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Advanced research and development facilities for custom solutions
                </p>
              </div>

              <div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
                role="list"
                aria-label="Research and development capabilities"
              >
                {memoizedCapabilities.map((capability, idx) => (
                  <div 
                    key={idx} 
                    role="listitem"
                  >
                    <CapabilityCard {...capability} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section 
            className="py-20 bg-muted/30"
            aria-labelledby="team-title"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 
                  id="team-title" 
                  className="text-4xl font-bold text-primary mb-4"
                >
                  Our Team
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Expert engineers, scientists, and technicians dedicated to underwater innovation
                </p>
              </div>

              <div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                role="list"
                aria-label="Team composition"
              >
                {memoizedTeamData.map((team, idx) => (
                  <div 
                    key={idx} 
                    role="listitem"
                  >
                    <TeamCard {...team} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section 
            className="py-20 bg-gradient-to-r from-primary to-secondary text-white"
            aria-labelledby="cta-title"
          >
            <div className="container mx-auto px-4 text-center">
              <h2 
                id="cta-title" 
                className="text-4xl font-bold mb-6"
              >
                Join Our Mission
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Partner with AUVTEK to advance underwater exploration and research
              </p>
              <Link 
                href="/contact" 
                className="inline-block"
                aria-label="Contact us to join our mission"
              >
                <Button 
                  className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg flex items-center gap-2"
                >
                  Get in Touch 
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Button>
              </Link>
              
              {/* 辅助链接 */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link 
                  href="/products" 
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-1"
                  aria-label="View our products"
                >
                  View AUV & Sonar Products <ChevronRight className="w-3 h-3" />
                </Link>
                <span className="text-white/50">•</span>
                <Link 
                  href="/solutions" 
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-1"
                  aria-label="Explore our solutions"
                >
                  Explore Industry Solutions <ChevronRight className="w-3 h-3" />
                </Link>
                <span className="text-white/50">•</span>
                <Link 
                  href="/careers" 
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-1"
                  aria-label="View career opportunities"
                >
                  Career Opportunities <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </section>

          {/* Back to Home CTA */}
          <section className="py-10 bg-muted/50">
            <div className="container mx-auto px-4 text-center">
              <Link href="/">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}