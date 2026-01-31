import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export async function GET() {
  try {
    console.log('🔍 Checking Twilio WhatsApp Sandbox Status...');
    
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );
    
    // Get recent messages to check delivery status
    const messages = await client.messages.list({
      from: process.env.TWILIO_WHATSAPP_FROM,
      limit: 5
    });
    
    console.log(`📱 Found ${messages.length} recent messages`);
    
    const messageDetails = messages.map(msg => ({
      sid: msg.sid,
      to: msg.to,
      status: msg.status,
      errorCode: msg.errorCode,
      errorMessage: msg.errorMessage,
      dateCreated: msg.dateCreated,
      direction: msg.direction
    }));
    
    // Check if sandbox is properly configured
    const sandboxInfo = {
      fromNumber: process.env.TWILIO_WHATSAPP_FROM,
      toNumber: process.env.YOUR_WHATSAPP_NUMBER,
      recentMessages: messageDetails
    };
    
    return NextResponse.json({
      success: true,
      message: 'Twilio sandbox status checked',
      sandbox: sandboxInfo,
      instructions: [
        '1. Save +14155238886 as contact in WhatsApp',
        '2. Send "join <sandbox-code>" to activate',
        '3. Wait for confirmation message',
        '4. Test again'
      ],
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('❌ Sandbox check failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      details: {
        code: error.code,
        status: error.status,
        moreInfo: error.moreInfo
      }
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testMessage } = body;
    
    console.log('📤 Sending test message to WhatsApp...');
    
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );
    
    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM!,
      to: process.env.YOUR_WHATSAPP_NUMBER!,
      body: testMessage || `🧪 Manual Test Message\n\nTesting WhatsApp delivery...\n\nTime: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`
    });
    
    console.log('✅ Test message sent:', message.sid);
    
    return NextResponse.json({
      success: true,
      message: 'Test message sent successfully',
      details: {
        messageSid: message.sid,
        status: message.status,
        to: message.to,
        from: message.from
      }
    });
    
  } catch (error: any) {
    console.error('❌ Test message failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      details: {
        code: error.code,
        status: error.status
      }
    }, { status: 500 });
  }
}
