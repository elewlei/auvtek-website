"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Menu, X, ChevronDown, Waves, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from 'next/link';
import Head from 'next/head';

// 定义表单数据类型
interface ContactFormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

// 邮箱验证正则表达式
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// FAQ 数据
const FAQ_DATA = [
  {
    q: "What is the typical lead time for orders?",
    a: "Lead times vary based on customization requirements. Standard products typically ship within 4-6 weeks. Custom solutions may require 8-12 weeks.",
  },
  {
    q: "Do you offer technical support after purchase?",
    a: "Yes, we provide comprehensive technical support including deployment assistance, training, and ongoing maintenance support.",
  },
  {
    q: "Can you customize products for specific applications?",
    a: "Absolutely. Our R&D team specializes in developing custom solutions tailored to unique underwater challenges.",
  },
  {
    q: "What warranty coverage is included?",
    a: "All products come with a 2-year warranty covering manufacturing defects and normal operational use.",
  },
  {
    q: "Do you offer financing options?",
    a: "Yes, we work with partners to offer flexible financing solutions for large orders and partnerships.",
  },
  {
    q: "How do I get started with a pilot project?",
    a: "Contact our sales team to discuss your requirements. We can arrange a consultation and proposal within 48 hours.",
  },
];

export default function Contact() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // 处理滚动效果
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 组件挂载时清理
  useEffect(() => {
    return () => {
      // 清理函数
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
    };
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

  // 表单字段变更处理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 表单验证
  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }
    
    if (!EMAIL_REGEX.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    
    if (!formData.subject) {
      toast.error("Please select a subject");
      return false;
    }
    
    if (!formData.message.trim()) {
      toast.error("Please enter your message");
      return false;
    }
    
    return true;
  };

  // 表单重置
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    });
  };


// 防抖函数 - 修复版本
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | undefined;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

  // 表单提交处理（使用防抖）
  const handleSubmit = debounce(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      // 模拟表单提交（实际应用中替换为 API 调用）
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Thank you for your inquiry! We'll be in touch within 24 hours.");
      
      // 重置表单
      resetForm();
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(
        error instanceof Error 
          ? `Failed to send message: ${error.message}` 
          : "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }, 300);

  // 清除表单
  const handleClearForm = () => {
    resetForm();
    toast.info("Form cleared");
  };

  return (
    <>
      <Head>
        <title>Contact Us | AUVTEK - Underwater Technology Solutions</title>
        <meta 
          name="description" 
          content="Contact AUVTEK for underwater technology inquiries, product information, custom solutions, and technical support." 
        />
        <meta 
          name="keywords" 
          content="underwater technology, contact, inquiry, marine equipment, technical support, custom solutions" 
        />
        <meta property="og:title" content="Contact AUVTEK - Get in Touch" />
        <meta property="og:description" content="Connect with our team to discuss your underwater technology needs" />
      </Head>

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
                
                {/* Get in Touch 按钮 - 当前页面高亮 */}
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
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Connect with our team to discuss your underwater technology needs
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Contact Information */}
                <div className="lg:col-span-1">
                  <h2 className="text-2xl font-bold text-primary mb-8">Contact Information</h2>

                  <div className="space-y-8">
                    {/* Email */}
                    <div className="flex gap-4">
                      <div 
                        className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0"
                        aria-hidden="true"
                      >
                        <Mail className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold text-primary mb-1">Email</h3>
                        <a
                          href="mailto:hksynergyinfo@gmail.com"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Send email to hksynergyinfo@gmail.com"
                        >
                          hksynergyinfo@gmail.com
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          General inquiries and partnerships
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-4">
                      <div 
                        className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0"
                        aria-hidden="true"
                      >
                        <Phone className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-primary mb-1">Phone</h3>
                        <a
                          href="tel:+61415176288"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Call +61 415 176 288"
                        >
                          +61 415 176 288
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Monday - Friday, 9AM - 6PM HKT/SGT
                        </p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex gap-4">
                      <div 
                        className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0"
                        aria-hidden="true"
                      >
                        <MapPin className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold text-primary mb-3">Hong Kong Office</h3>
                        <address className="text-muted-foreground text-sm mb-4 not-italic">
                          7/F, Astoria Building<br />
                          34 Ashley Road<br />
                          Tsim Sha Tsui, Kowloon<br />
                          Hong Kong
                        </address>
                        <h3 className="font-bold text-primary mb-3">Singapore Office</h3>
                        <address className="text-muted-foreground text-sm not-italic">
                          20 Cecil Street, PLUS<br />
                          Singapore 049705
                        </address>
                      </div>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="mt-12 pt-8 border-t border-border">
                    <h3 className="font-bold text-primary mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link 
                          href="/products" 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="View products"
                        >
                          View Products
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/solutions" 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Explore solutions"
                        >
                          Explore Solutions
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/about" 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Learn about us"
                        >
                          Learn About Us
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                  <div className="bg-muted/30 border border-border rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>

                    <form 
                      ref={formRef}
                      onSubmit={handleSubmit} 
                      className="space-y-6"
                      noValidate
                      aria-label="Contact form"
                    >
                      {/* Name */}
                      <div>
                        <label 
                          htmlFor="name" 
                          className="block text-sm font-medium text-primary mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          aria-required="true"
                          className="w-full px-4 py-3 border border-border rounded-lg bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                          placeholder="Your name"
                          aria-describedby="name-required"
                        />
                        <span id="name-required" className="sr-only">Required field</span>
                      </div>

                      {/* Email */}
                      <div>
                        <label 
                          htmlFor="email" 
                          className="block text-sm font-medium text-primary mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          aria-required="true"
                          className="w-full px-4 py-3 border border-border rounded-lg bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                          placeholder="your@email.com"
                          aria-describedby="email-required email-format"
                        />
                        <span id="email-required" className="sr-only">Required field</span>
                        <span id="email-format" className="sr-only">Must be a valid email address</span>
                      </div>

                      {/* Company */}
                      <div>
                        <label 
                          htmlFor="company" 
                          className="block text-sm font-medium text-primary mb-2"
                        >
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                          placeholder="Your company"
                          aria-label="Your company or organization (optional)"
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label 
                          htmlFor="subject" 
                          className="block text-sm font-medium text-primary mb-2"
                        >
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          aria-required="true"
                          className="w-full px-4 py-3 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                          aria-describedby="subject-required"
                        >
                          <option value="">Select a subject</option>
                          <option value="product-inquiry">Product Inquiry</option>
                          <option value="partnership">Partnership Opportunity</option>
                          <option value="technical-support">Technical Support</option>
                          <option value="custom-solution">Custom Solution Request</option>
                          <option value="other">Other</option>
                        </select>
                        <span id="subject-required" className="sr-only">Required field</span>
                      </div>

                      {/* Message */}
                      <div>
                        <label 
                          htmlFor="message" 
                          className="block text-sm font-medium text-primary mb-2"
                        >
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          aria-required="true"
                          rows={6}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors resize-none"
                          placeholder="Tell us about your project or inquiry..."
                          aria-describedby="message-required"
                        ></textarea>
                        <span id="message-required" className="sr-only">Required field</span>
                      </div>

                      {/* Form Actions */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Submit Button */}
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-primary hover:bg-primary/90 text-white py-3 flex items-center justify-center gap-2"
                          aria-label={isSubmitting ? "Sending message" : "Send message"}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                          {!isSubmitting && <Send className="w-5 h-5" />}
                        </Button>

                        {/* Clear Button */}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleClearForm}
                          className="w-full py-3"
                          aria-label="Clear form"
                        >
                          Clear Form
                        </Button>
                      </div>

                      <p className="text-xs text-muted-foreground text-center">
                        We'll get back to you within 24 hours during business days.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-muted/30" aria-labelledby="faq-title">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 
                  id="faq-title" 
                  className="text-4xl font-bold text-primary mb-4"
                >
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Common questions about our products and services
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {FAQ_DATA.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-bold text-primary mb-3">{faq.q}</h3>
                    <p className="text-muted-foreground text-sm">{faq.a}</p>
                  </div>
                ))}
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