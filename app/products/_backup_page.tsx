// app/products/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowRight, Zap, Waves, Download, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

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
                  Autonomous Underwater Vehicles (AUV/UUV)
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our AUV and UUV platforms represent the pinnacle of autonomous underwater technology. Designed for extended missions, these vehicles operate independently with minimal human intervention, making them ideal for deep-sea exploration, research, and commercial operations.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  AUVs are fully autonomous systems that execute pre-programmed missions. UUVs can be autonomous or remotely operated, providing flexibility for various mission profiles. Both integrate advanced sonar systems, navigation sensors, and modular payload bays.
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
              <div
                className="h-96 rounded-lg bg-cover bg-center shadow-lg"
                style={{
                  backgroundImage: "url('/images/underwater-research-platform.jpg')",
                }}
              ></div>
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
            <div className="bg-muted/30 border border-border rounded-lg p-8 mb-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">AUV Documentation</h3>
                  <p className="text-muted-foreground">
                    Technical specifications, user guides, and case studies
                  </p>
                </div>
                {/* 已移除 FileUploadDialog 组件，因为不需要上传功能 */}
              </div>
              {/* 静态文件列表展示 */}
              {auvFiles.length > 0 ? (
                <div className="space-y-3">
                  {auvFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 bg-white border border-border rounded hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <Download className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={file.url} download>Download</a>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No documentation available yet
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Acoustic Sensors Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div
                className="h-96 rounded-lg bg-cover bg-center shadow-lg order-2 lg:order-1"
                style={{
                  backgroundImage: "url('/images/sonar-imaging-visualization.jpg')",
                }}
              ></div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-primary mb-6">
                  Acoustic Sensors & Transducers
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our comprehensive range of acoustic sensors delivers precision and reliability for underwater applications. From hydrophones to synthetic aperture sonar systems, we provide the acoustic foundation for advanced underwater exploration.
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
                  specs: ["Frequency: 1Hz - 170kHz", "Sensitivity: -200 to -120 dB", "Depth: Up to 6,000m"],
                },
                {
                  type: "Piezo-Electric Single Crystal Transducers",
                  specs: ["Frequency: 12kHz - 2MHz", "Compact Design (24mm thickness)", "Power Efficient (180 dB source level)"],
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
                  specs: ["Ultra-High Resolution: 3cm x 3cm", "Dual Frequency (350kHz + 900kHz)", "Advanced Seafloor Imaging"],
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
            <div className="bg-white border border-border rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Sensor Documentation</h3>
                  <p className="text-muted-foreground">
                    Technical datasheets, installation guides, and application notes
                  </p>
                </div>
                {/* 已移除 FileUploadDialog 组件 */}
              </div>
              {/* 静态文件列表展示 */}
              {sensorFiles.length > 0 ? (
                <div className="space-y-3">
                  {sensorFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 bg-muted/30 border border-border rounded hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <Download className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={file.url} download>Download</a>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No documentation available yet
                </p>
              )}
            </div>
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