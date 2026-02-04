"use client";

import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowRight, BookOpen, Microscope, AlertCircle, Wrench, Fish, Shield, Menu, X, ChevronDown, Waves } from "lucide-react";
import { useState, useEffect } from "react";

export default function Solutions() {
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

  const solutions = [
    {
      icon: Microscope,
      title: "Scientific Research",
      description: "Deep-sea oceanographic studies and marine biology research",
      image: "/images/scientific-research.jpg",
      details: [
        "Autonomous data collection in extreme environments",
        "Multi-sensor payload integration",
        "Real-time data transmission and analysis",
        "Extended mission capabilities",
      ],
    },
    {
      icon: BookOpen,
      title: "Underwater Imaging & Mapping",
      description: "High-resolution sonar and camera systems for detailed surveys",
      image: "/images/Imaging-Mapping.jpg",
      details: [
        "Synthetic aperture sonar for precise imaging",
        "3D seafloor mapping and bathymetry",
        "Archaeological site documentation",
        "Infrastructure inspection",
      ],
    },
    {
      icon: AlertCircle,
      title: "Environmental Monitoring",
      description: "Marine ecosystem and pollution tracking systems",
      image: "/images/Environment Monitoring.jpg",
      details: [
        "Acoustic marine life detection",
        "Water quality parameter monitoring",
        "Pollution plume tracking",
        "Biodiversity assessment",
      ],
    },
    {
      icon: Wrench,
      title: "Offshore Operations",
      description: "Inspection and maintenance support for subsea infrastructure",
      image: "/images/Offshore-Operations.jpg",
      details: [
        "Pipeline and cable inspection",
        "Subsea equipment maintenance",
        "Installation support",
        "Damage assessment",
      ],
    },
    {
      icon: Fish,
      title: "Fishing & Stock Assessment",
      description: "Fish detection and population monitoring systems",
      image: "/images/fishing-stock.jpg",
      details: [
        "Fish species identification",
        "Stock abundance estimation",
        "Behavioral monitoring",
        "Sustainable fishing support",
      ],
    },
    {
      icon: Shield,
      title: "Defense & Security",
      description: "Naval and underwater surveillance solutions",
      image: "/images/Defense-Security.jpg",
      details: [
        "Underwater threat detection",
        "Perimeter security monitoring",
        "Mine detection and clearance",
        "Classified research support",
      ],
    },
  ];

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
              Solutions & Applications
            </h1>
            <p className="text-xl text-muted-foreground whitespace-nowrap mx-auto">
              Tailored underwater technology solutions for diverse industries and research domains
            </p>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {solutions.map((solution, idx) => {
                const Icon = solution.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url('${solution.image}')` }}
                    ></div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-2xl font-bold text-primary">{solution.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-6">{solution.description}</p>
                      <ul className="space-y-2 mb-8">
                        {solution.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary/10"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-4">Recent Projects</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real-world applications demonstrating our capabilities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Mariana Trench Expedition",
                  client: "International Research Consortium",
                  result: "Successfully deployed AUV to 6,000m depth for geological sampling",
                },
                {
                  title: "Offshore Pipeline Inspection",
                  client: "Global Energy Corporation",
                  result: "Completed 500km pipeline survey with 99.8% coverage accuracy",
                },
                {
                  title: "Marine Biodiversity Study",
                  client: "Ocean Conservation Foundation",
                  result: "Documented 47 new species using acoustic and visual sensors",
                },
                {
                  title: "Naval Defense Operations",
                  client: "Defense Ministry",
                  result: "Deployed surveillance system covering 1,000 sq km area",
                },
              ].map((project, idx) => (
                <div key={idx} className="bg-white border border-border rounded-lg p-8">
                  <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.client}</p>
                  <p className="text-muted-foreground">{project.result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-4">Why AUVTEK</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Proven expertise across diverse underwater applications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Custom R&D",
                  desc: "Tailored solutions for unique underwater challenges and requirements",
                },
                {
                  title: "Proven Reliability",
                  desc: "Decades of operational experience in extreme underwater environments",
                },
                {
                  title: "Technical Support",
                  desc: "Comprehensive support from deployment through data analysis",
                },
                {
                  title: "Integration Expertise",
                  desc: "Seamless integration with existing systems and workflows",
                },
                {
                  title: "Scalability",
                  desc: "Solutions that grow with your operational needs",
                },
                {
                  title: "Innovation",
                  desc: "Continuous development of next-generation underwater technologies",
                },
              ].map((capability, idx) => (
                <div
                  key={idx}
                  className="bg-muted/50 border border-border rounded-lg p-8 hover:border-accent transition-colors"
                >
                  <h3 className="text-lg font-bold text-primary mb-3">{capability.title}</h3>
                  <p className="text-muted-foreground text-sm">{capability.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Explore New Possibilities?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss how AUVTEK can support your underwater objectives
            </p>
            <Link href="/contact">
              <Button className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg">
                Schedule a Consultation <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}