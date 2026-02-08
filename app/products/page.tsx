// app/products/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowRight, Zap, Waves, Download, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

// 导入Swiper相关
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 静态文件数据示例
const STATIC_AUV_FILES = [
  { id: 1, name: 'AUV_Technical_Specifications.pdf', size: '2.4 MB', url: '#' },
  { id: 2, name: 'Deep_Researcher_Case_Study.pdf', size: '1.8 MB', url: '#' },
  { id: 3, name: 'Maintenance_Guide_v2.1.pdf', size: '3.1 MB', url: '#' },
];

const STATIC_SENSOR_FILES = [
  { id: 1, name: 'Acoustic_Sensor_Datasheet.pdf', size: '1.5 MB', url: '#' },
  { id: 2, name: 'Sonar_Installation_Manual.pdf', size: '2.2 MB', url: '#' },
];

export default function Products() {
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

  // 直接使用静态数据
  const auvFiles = STATIC_AUV_FILES;
  const sensorFiles = STATIC_SENSOR_FILES;
  const isAdmin = false;

  return (
    <div className="w-full">
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
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
              Our Products
            </h1>
            <p className="text-xl text-muted-foreground whitespace-nowrap mx-auto">
              Advanced underwater platforms and acoustic sensors engineered for excellence
            </p>
          </div>
        </section>

        {/* AUV/UUV Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-4xl font-bold text-primary mb-6">
                Autonomous Underwater Vehicles (AUV/UUV): Advanced Platforms for Deep Sea Exploration
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                AUVTEK designs and manufactures state-of-the-art <strong>Autonomous Underwater Vehicles (AUV)</strong> and <strong>Unmanned Underwater Vehicles (UUV)</strong> for the most demanding underwater missions. Our autonomous systems are engineered for extended range, deep-depth operations, and reliable data collection in environments inaccessible to humans.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                Whether for oceanographic <strong>scientific research</strong>, detailed seafloor mapping with our integrated <strong>sonar systems</strong>, or long-duration <strong>offshore infrastructure inspection</strong>, AUVTEK's AUV/UUV platforms provide the autonomy and payload flexibility required for success.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-primary">Extended Range</h3>
                      <p className="text-muted-foreground text-sm">
                        Mission durations up to 24+ hours with advanced power management
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Waves className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-primary">Depth Capability</h3>
                      <p className="text-muted-foreground text-sm">
                        Depth ratings from 500m to 6,000m for abyssal exploration
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-primary">Modular Design</h3>
                      <p className="text-muted-foreground text-sm">
                        Reconfigurable payloads for diverse mission requirements
                      </p>
                    </div>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6">
                    Request Information <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
              
              {/* AUV/UUV 图片区域 - 替换为Swiper轮播 */}
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
                          backgroundImage: "url('/images/AUV-exploration-01.jpg')",
                        }}
                        role="img"
                        aria-label="Underwater research platform"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                          backgroundImage: "url('/images/AUV-exploration-02.jpg')",
                        }}
                        role="img"
                        aria-label="AUV in deep sea exploration"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                          backgroundImage: "url('/images/AUV-exploration-03.jpg')",
                        }}
                        role="img"
                        aria-label="AUV operations in mission"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                          backgroundImage: "url('/images/AUV-exploration-04.jpg')",
                        }}
                        role="img"
                        aria-label="AUV deployment process"
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  AUVTEK autonomous vehicles in action
                </p>
              </div>
            </div>

            {/* AUV Models */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  name: "Shallow Explorer",
                  depth: "500m",
                  duration: "12 hours",
                  desc: "Perfect for coastal research and shallow water surveys",
                },
                {
                  name: "Deep Researcher",
                  depth: "2,000m",
                  duration: "18 hours",
                  desc: "Ideal for mid-depth oceanographic missions",
                },
                {
                  name: "Abyssal Pioneer",
                  depth: "6,000m",
                  duration: "24+ hours",
                  desc: "Ultimate deep-sea exploration platform",
                },
              ].map((model, idx) => (
                <div
                  key={idx}
                  className="bg-muted/50 border border-border rounded-lg p-8 hover:border-accent transition-colors"
                >
                  <h3 className="text-xl font-bold text-primary mb-4">{model.name}</h3>
                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Max Depth</p>
                      <p className="text-lg font-bold text-primary">{model.depth}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mission Duration</p>
                      <p className="text-lg font-bold text-primary">{model.duration}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6">{model.desc}</p>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/10"
                  >
                    Learn More
                  </Button>
                </div>
              ))}
            </div>

            {/* AUV Resources Section */}

          </div>
        </section>

        {/* Acoustic Sensors Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Acoustic Sensors 图片区域 - 替换为Swiper轮播 */}
              <div className="relative order-2 lg:order-1">
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
                          backgroundImage: "url('/images/Hydrophone.jpg')",
                        }}
                        role="img"
                        aria-label="Sonar imaging visualization"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                          backgroundImage: "url('/images/Transducer00.jpg')",
                        }}
                        role="img"
                        aria-label="Acoustic sensors technology"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                          backgroundImage: "url('/images/Transducer01.jpg')",
                        }}
                        role="img"
                        aria-label="Sensor deployment in field"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                          backgroundImage: "url('/images/Transducer02.jpg')",
                        }}
                        role="img"
                        aria-label="Advanced sonar system"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                          backgroundImage: "url('/images/Transducer03.jpg')",
                        }}
                        role="img"
                        aria-label="Advanced sonar system"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                          backgroundImage: "url('/images/Multi-beam.jpg')",
                        }}
                        role="img"
                        aria-label="Advanced sonar system"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                          backgroundImage: "url('/images/AVS.jpg')",
                        }}
                        role="img"
                        aria-label="Advanced sonar system"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                          backgroundImage: "url('/images/Chirp.jpg')",
                        }}
                        role="img"
                        aria-label="Advanced sonar system"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                          backgroundImage: "url('/images/SAS-image01.jpg')",
                        }}
                        role="img"
                        aria-label="Advanced sonar system"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                          backgroundImage: "url('/images/SAS-image02.jpg')",
                        }}
                        role="img"
                        aria-label="Advanced sonar system"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                          backgroundImage: "url('/images/SAS-image03.jpg')",
                        }}
                        role="img"
                        aria-label="Advanced sonar system"
                      />
                    </SwiperSlide>

                  </Swiper>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  AUVTEK acoustic sensors and sonar technology
                </p>
              </div>
              
              <div className="order-1 lg:order-2">
                
                <h2 className="text-4xl font-bold text-primary mb-6">
                Acoustic Sensors & Sonar Systems: Precision Underwater Sensing and Imaging
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                Complementing our autonomous vehicles, AUVTEK's suite of high-performance <strong>acoustic sensors</strong>, <strong>hydrophones</strong>, and advanced <strong>sonar systems</strong> delivers unparalleled clarity and data accuracy beneath the waves.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                Our technologies, including <strong>Synthetic Aperture Sonar (SAS)</strong> for centimeter-resolution imaging and ruggedized <strong>piezo-electric transducers</strong>, are vital tools for <strong>underwater detection</strong>, environmental monitoring, and naval defense applications.
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Waves className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-primary">Hydrophones</h3>
                      <p className="text-muted-foreground text-sm">
                        High-sensitivity detection from 1Hz to 170kHz frequency range
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-primary">Synthetic Aperture Sonar</h3>
                      <p className="text-muted-foreground text-sm">
                        High-resolution imaging for seafloor mapping and object detection
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Waves className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-primary">Acoustic Vector Sensors</h3>
                      <p className="text-muted-foreground text-sm">
                        Directional acoustic measurements for advanced signal processing
                      </p>
                    </div>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6">
                    Request Information <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Sensor Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {[
                {
                  type: "Hydrophones",
                  specs: ["Frequency: 1Hz - 170kHz", "Sensitivity: -190 dB and above", "Depth: Up to 6,000m"],
                },
                {
                  type: "Piezo-Electric Single Crystal Transducers",
                  specs: ["Frequency: 10kHz - 80kHz", "Compact Design (20mm thickness)", "Power Efficient (>206 dB source level)"],
                },
                {
                  type: "Side-Scan Sonar",
                  specs: ["Resolution: 5-10cm", "Range: Up to 500m", "Dual-frequency capability"],
                },
                {
                  type: "Multi-Beam Arrays",
                  specs: ["Full Seafloor Coverage", "Real-time 3D Mapping", "Frequency: 100kHz - 500kHz"],
                },
                {
                  type: "Dual Frequency Synthetic Aperture Sonar (DFSAS)",
                  specs: ["Ultra-High Resolution: 2cm x 2cm", "Dual Frequency (15kHz / 150kHz)", "Advanced Seafloor Imaging， Buried Objects"],
                },
                {
                  type: "Acoustic Vector Sensors",
                  specs: ["3D Directional", "Frequency: 0.1Hz - 100kHz", "Low Noise Design"],
                },
              ].map((sensor, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-border rounded-lg p-8 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-primary mb-4">{sensor.type}</h3>
                  <ul className="space-y-2">
                    {sensor.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Sensor Resources Section */}

          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Need Custom Solutions?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our R&D team can develop tailored underwater systems for your specific requirements
            </p>
            <Link href="/contact">
              <Button className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg">
                Start a Project <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}