"use client";

import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowRight, Zap, Waves, Radio, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import Head from 'next/head';
import Script from 'next/script';

export default function Home() {
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

  // 导航菜单项 - 移除了 Contact，因为已经有 Get in Touch 按钮
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

  // 结构化数据用于 SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AUVTEK",
    "description": "Leading innovation in underwater autonomous technology and acoustic sensing",
    "url": "https://auvtek.com",
    "logo": "https://auvtek.com/images/logo.png",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+61-415-176-288",
      "contactType": "Customer Service",
      "email": "hksynergyinfo@gmail.com",
      "areaServed": "Global",
      "availableLanguage": ["English", "Chinese"]
    },
    "founder": {
      "@type": "Organization",
      "name": "AUVTEK"
    }
  };

  return (
    <>

        <title>AUVTEK - Advanced Underwater Autonomous Technology & Acoustic Sensors</title>
        
        
        
        <link rel="canonical" href="https://auvtek.com" />


      {/* JSON-LD Structured Data for SEO */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="w-full">
        {/* 固定导航栏 */}
        <nav 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled 
              ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg py-3' 
              : 'bg-transparent py-5'
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Waves className="w-6 h-6 text-white" />
                </div>
                <span className={`text-2xl font-bold ${scrolled ? 'text-primary' : 'text-white'}`}>
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
                          : 'text-white/90 hover:text-white hover:bg-white/10'
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
                    className={`${scrolled ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-white text-primary hover:bg-white/90'}`}
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
                  <X className={`w-6 h-6 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
                ) : (
                  <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
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
                {/* 移动端菜单中添加 Get in Touch 按钮 */}
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

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Background Image - 添加 background-position 和 background-size 调整 */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: "url('/images/hero-auv-sonar.jpg')",
              backgroundPosition: "center 80%", // 调整图片位置，使AUV模型不上移
              backgroundSize: "cover",
            }}
          >
            {/* 渐变叠加 - 调整透明度确保文字清晰 */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
          </div>

          {/* 内容 */}
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Explore the Deep with
                <span className="block text-accent mt-2 animate-pulse">Cutting-Edge Autonomy</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Advanced underwater autonomous platforms and acoustic sensors for research, exploration, and innovation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                <Link href="/products">
                  <Button className="bg-accent text-primary hover:bg-accent/90 px-8 py-6 text-lg transform hover:scale-105 transition-transform">
                    Explore Products <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-2 border-white bg-white/90 backdrop-blur-sm text-primary hover:bg-white hover:text-primary px-8 py-6 text-lg transform hover:scale-105 transition-transform"
                  >
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="animate-bounce">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Features Section - 添加更多SEO相关文本 */}
        <section className="py-20 bg-white" id="features">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Why Choose AUVTEK
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Trusted by researchers, explorers, and industries worldwide for underwater excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 - AUV/UUV Systems */}
              <div className="bg-card border border-border rounded-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Advanced Autonomous Systems</h3>
                <p className="text-muted-foreground">
                  State-of-the-art AUV (Autonomous Underwater Vehicle) and UUV (Unmanned Underwater Vehicle) systems that operate independently for extended missions in deep-sea environments.
                </p>
              </div>

              {/* Feature 2 - Acoustic & Sonar Technology */}
              <div className="bg-card border border-border rounded-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <Waves className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Acoustic & Sonar Excellence</h3>
                <p className="text-muted-foreground">
                  Precision hydrophones, acoustic sensors, and advanced Sonar Systems for unparalleled underwater sensing, imaging, and detection capabilities.
                </p>
              </div>

              {/* Feature 3 - R&D Capabilities */}
              <div className="bg-card border border-border rounded-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <Radio className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Custom R&D Solutions</h3>
                <p className="text-muted-foreground">
                  Proven expertise in developing custom underwater technology solutions for diverse marine applications including research, defense, and industrial operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Preview Section */}
        <section className="py-20 bg-muted/30" id="products">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Our Product Portfolio
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive solutions for autonomous underwater exploration
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* AUV/UUV Card */}
              <div className="group bg-white rounded-lg overflow-hidden border border-border hover:shadow-2xl transition-all duration-300">
                <div
                  className="h-64 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage: "url('/images/sonar-imaging-visualization.jpg')",
                  }}
                ></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    Autonomous Underwater Vehicles (AUV/UUV)
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Advanced AUV and UUV platforms for deep-sea exploration, marine research, and industrial applications including offshore inspection and underwater mapping.
                  </p>
                  <Link href="/products">
                    <Button className="bg-primary hover:bg-primary/90 text-white group-hover:scale-105 transition-transform">
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Acoustic Sensors Card */}
              <div className="group bg-white rounded-lg overflow-hidden border border-border hover:shadow-2xl transition-all duration-300">
                <div
                  className="h-64 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage: "url('/images/acoustic-sensors-tech.jpg')",
                  }}
                ></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    Acoustic Sensors & Sonar Systems
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    High-precision hydrophones, transducers, and synthetic aperture sonar (SAS) systems for underwater detection, imaging, and acoustic measurement.
                  </p>
                  <Link href="/products">
                    <Button className="bg-primary hover:bg-primary/90 text-white group-hover:scale-105 transition-transform">
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 transform hover:scale-105 transition-transform"
                >
                  View All Products <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-20 bg-white" id="solutions">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Solutions for Every Application
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From research to commercial operations, we have the expertise
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Scientific Research", desc: "Deep-sea exploration and oceanographic studies", icon: "🔬" },
                { title: "Underwater Imaging", desc: "High-resolution sonar and camera systems", icon: "📷" },
                { title: "Environmental Monitoring", desc: "Marine ecosystem and pollution tracking", icon: "🌊" },
                { title: "Offshore Operations", desc: "Inspection and maintenance support", icon: "⚓" },
                { title: "Fishing & Detection", desc: "Fish stock assessment and detection", icon: "🎣" },
                { title: "Defense & Security", desc: "Naval and underwater surveillance", icon: "🛡️" },
              ].map((solution, idx) => (
                <div
                  key={idx}
                  className="bg-muted/50 border border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">{solution.icon}</div>
                  <h3 className="text-lg font-bold text-primary mb-2">{solution.title}</h3>
                  <p className="text-muted-foreground text-sm">{solution.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/solutions">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 px-8 py-6 transform hover:scale-105 transition-transform"
                >
                  Explore Solutions <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
          {/* 背景图案 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Partner with AUVTEK?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Connect with our team to discuss your underwater technology needs
            </p>
            <Link href="/contact">
              <Button className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg transform hover:scale-105 transition-transform shadow-lg">
                Start a Conversation <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* 页脚 - 添加更多SEO关键词和相关链接 */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <Waves className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold">AUVTEK</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Leading innovation in underwater autonomous technology and acoustic sensing. Specialists in AUV, UUV, Sonar Systems, and Marine Research Equipment.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">AUV & UUV Products</Link></li>
                  <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">Sonar & Acoustic Sensors</Link></li>
                  <li><Link href="/solutions" className="text-gray-400 hover:text-white transition-colors">Marine Solutions</Link></li>
                  <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About AUVTEK</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  
<li>
      <a 
        href="mailto:hksynergyinfo@gmail.com" 
        className="hover:text-white transition-colors hover:underline"
        title="Send email to AUVTEK"
      >
        hksynergyinfo@gmail.com
      </a>
    </li>


                  <li>+61 415 176 288</li>
                  <li>Hong Kong & Singapore Offices</li>
                  <li>20 Cecil Street, PLUS, Singapore 049705</li>
                  <li>7F, Astoria Building, Tsim Sha Tsui, Hong Kong</li>
                  <li className="mt-4 pt-4 border-t border-gray-800">
                    <strong>Specializing in:</strong><br />
                    AUV UUV Platform | Sonar System<br />
                    Synthetic Aperture Sonar | Acoustic Sensors<br />
                    Piezo-electric Single Crystal | Underwater Robotics
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4">Stay Updated</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Subscribe to our newsletter for the latest updates on underwater technology
                </p>
                <form onSubmit={(e) => e.preventDefault()} className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="px-4 py-2 rounded-l-lg bg-gray-800 text-white flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-white rounded-l-none">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} AUVTEK - Underwater Autonomous Vehicle Technology & Acoustic Sensing Solutions. All rights reserved.</p>
              <p className="mt-2 text-xs">
                AUVTEK specializes in: Autonomous Underwater Vehicles (AUV), Unmanned Underwater Vehicles (UUV), Sonar Systems, Acoustic Sensors, Hydrophones, Underwater Imaging, Marine Research Equipment, Oceanographic Instruments, Underwater Robotics
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}