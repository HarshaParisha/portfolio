import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import validator from 'email-validator';
import { storeSubscriber } from '@/lib/firestore';

// SMTP Configuration for Brevo with correct login credentials
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '935118001@smtp-brevo.com',
    pass: process.env.SMTP_PASS || 'q20MdRPKhWxGODyc'
  }
});

// Verify SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('✅ SMTP Server ready for email sending');
  }
});

const createWelcomeEmailHTML = (userEmail: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to OneStop AI!</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f8f9fa;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 30px;
          text-align: center;
          color: white;
        }
        .header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .content {
          padding: 40px 30px;
        }
        .greeting {
          font-size: 18px;
          margin-bottom: 20px;
          color: #2c3e50;
        }
        .main-text {
          font-size: 16px;
          margin-bottom: 25px;
          line-height: 1.7;
          color: #555;
        }
        .highlight-box {
          background: linear-gradient(135deg, #ff6b6b, #ee5a52);
          padding: 25px;
          border-radius: 8px;
          margin: 25px 0;
          color: white;
          text-align: center;
        }
        .highlight-box h2 {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .signature {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #eee;
          font-style: italic;
          color: #666;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px 30px;
          text-align: center;
          color: #888;
          font-size: 14px;
        }
        .emoji {
          font-size: 20px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>OneStop AI</h1>
          <p>Welcome to the Community!</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            Hi there <span class="emoji">👋</span>,
          </div>
          
          <div class="main-text">
            Thanks for subscribing to <strong>OneStop AI</strong>!<br>
            You're now part of an ever-growing family of dreamers, builders, and creators.
          </div>
          
          <div class="main-text">
            We'll keep you posted with the best tools, resources, and updates to empower your journey in tech and creativity.
          </div>
          
          <div class="highlight-box">
            <h2><span class="emoji">🚀</span> Welcome to OneStop AI!</h2>
            <p>Your journey of innovation starts here.</p>
          </div>
          
          <div class="signature">
            <strong>- Harsha, Founder of OneStop</strong><br>
            <small style="color: #888; font-style: normal;">onestop.ai007@gmail.com</small>
          </div>
        </div>
        
        <div class="footer">
          <p>You're receiving this because you subscribed to OneStop AI updates.</p>
          <p>Keep building amazing things! <span class="emoji">✨</span></p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !validator.validate(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Log configuration for debugging (without sensitive data)
    console.log('📧 Processing subscription for:', email);
    console.log('🔧 SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      hasPass: !!process.env.SMTP_PASS
    });

    // Step 1: Store subscriber in Firestore
    console.log('💾 Storing subscriber in Firestore...');
    const firestoreResult = await storeSubscriber(email);
    
    if (!firestoreResult.success) {
      return NextResponse.json({
        success: false,
        message: firestoreResult.message
      }, { status: 400 });
    }

    // Step 2: Send welcome email
    console.log('� Sending welcome email...');
    const mailOptions = {
      from: {
        name: process.env.SMTP_FROM_NAME || 'Harsha',
        address: process.env.SMTP_FROM_EMAIL || 'onestop.ai007@gmail.com'
      },
      to: email,
      subject: 'Welcome to OneStop AI!',
      html: createWelcomeEmailHTML(email)
    };

    const emailResult = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', emailResult.messageId);
    console.log('✅ Subscriber stored in Firestore with ID:', firestoreResult.id);

    return NextResponse.json({
      success: true,
      message: 'Welcome aboard! Check your email for a special welcome message.',
      firestoreId: firestoreResult.id
    });

  } catch (error) {
    console.error('❌ Subscription processing error:', error);
    
    // More specific error messages
    let errorMessage = 'Failed to process subscription. Please try again later.';
    
    if (error instanceof Error) {
      if (error.message.includes('Authentication')) {
        errorMessage = 'Email service authentication failed. Please contact support.';
      } else if (error.message.includes('Network')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message.includes('Invalid')) {
        errorMessage = 'Invalid email configuration. Please contact support.';
      } else if (error.message.includes('Firebase') || error.message.includes('Firestore')) {
        errorMessage = 'Database error. Please try again later.';
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage
      },
      { status: 500 }
    );
  }
}
