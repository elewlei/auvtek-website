// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// 邮箱验证正则表达式
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, subject, message } = body;

    // 验证必填字段
    if (!name?.trim()) {
      return NextResponse.json(
        { error: 'Please enter your full name' },
        { status: 400 }
      );
    }
    
    if (!email?.trim()) {
      return NextResponse.json(
        { error: 'Please enter your email address' },
        { status: 400 }
      );
    }
    
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }
    
    if (!subject) {
      return NextResponse.json(
        { error: 'Please select a subject' },
        { status: 400 }
      );
    }
    
    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Please enter your message' },
        { status: 400 }
      );
    }

    // 检查环境变量
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Email configuration missing');
      
      // 如果没有配置邮箱，返回模拟成功（用于开发和测试）
      return NextResponse.json({
        success: true,
        message: 'Form submitted successfully (email not configured - demo mode)',
        data: { name, email, subject },
        note: 'In production, this would send an email to hksynergyinfo@gmail.com'
      });
    }

    // 获取主题显示文本
    const subjectMap: Record<string, string> = {
      'product-inquiry': 'Product Inquiry',
      'partnership': 'Partnership Opportunity',
      'technical-support': 'Technical Support',
      'custom-solution': 'Custom Solution Request',
      'other': 'Other Inquiry'
    };

    const subjectText = subjectMap[subject] || subject;

    // 创建邮件传输器
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      // 增加超时设置
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // 邮件内容
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"AUVTEK Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || 'hksynergyinfo@gmail.com',
      replyTo: email,
      subject: `[AUVTEK Contact Form] ${subjectText}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
            .header { background: linear-gradient(to right, #3b82f6, #8b5cf6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { padding: 20px; background: #f9fafb; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #374151; margin-bottom: 5px; }
            .value { padding: 10px; background: white; border: 1px solid #e5e7eb; border-radius: 4px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Contact Form Submission</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">AUVTEK Underwater Technology Solutions</p>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email</div>
                <div class="value">
                  <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                </div>
              </div>
              
              ${company ? `
              <div class="field">
                <div class="label">Company/Organization</div>
                <div class="value">${company}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${subjectText}</div>
              </div>
              
              <div class="field">
                <div class="label">Message</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            
            <div class="footer">
              <p>This message was sent from the AUVTEK website contact form.</p>
              <p>Submission time: ${new Date().toLocaleString('en-US', { 
                timeZone: 'Asia/Hong_Kong',
                dateStyle: 'full',
                timeStyle: 'long'
              })} (HKT)</p>
            </div>
          </div>
        </body>
        </html>
      `,
      // 纯文本版本（备用）
      text: `
New Contact Form Submission - AUVTEK Website

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
Subject: ${subjectText}
Message:
${message}

---
Sent from AUVTEK website contact form at ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' })}
      `.trim(),
    };

    // 发送邮件
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry! We will contact you within 24 hours.',
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    // 提供更友好的错误信息
    let errorMessage = 'Failed to send email. Please try again.';
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        errorMessage = 'Email service configuration error.';
      } else if (error.message.includes('connect')) {
        errorMessage = 'Cannot connect to email server.';
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// 可选：移除 GET 方法，如果你不需要它
// 或者保留它作为 API 状态检查
export async function GET() {
  return NextResponse.json({
    service: 'AUVTEK Contact API',
    status: 'operational',
    version: '1.0',
    timestamp: new Date().toISOString(),
    note: 'POST /api/contact to submit contact form'
  });
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}