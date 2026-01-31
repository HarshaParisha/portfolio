import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// SMTP Configuration for Brevo - Test endpoint
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '935118001@smtp-brevo.com',
    pass: process.env.SMTP_PASS || 'q20MdRPKhWxGODyc'
  }
});

export async function GET() {
  try {
    console.log('🔧 Testing SMTP connection...');
    console.log('Configuration:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      hasPass: !!process.env.SMTP_PASS
    });
    
    // Test the connection
    await transporter.verify();
    
    return NextResponse.json({
      success: true,
      message: 'SMTP connection successful',
      config: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        hasKey: !!process.env.BREVO_SMTP_KEY
      }
    });
  } catch (error) {
    console.error('SMTP Test Error:', error);
    return NextResponse.json({
      success: false,
      message: 'SMTP connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
