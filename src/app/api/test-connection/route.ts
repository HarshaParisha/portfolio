import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export async function GET() {
  try {
    console.log('🧪 Testing Twilio WhatsApp Connection...');
    
    // Check if environment variables are loaded
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_FROM;
    const toNumber = process.env.YOUR_WHATSAPP_NUMBER;
    
    console.log('📋 Environment Variables:');
    console.log('Account SID:', accountSid ? `${accountSid.slice(0, 10)}...` : 'MISSING');
    console.log('Auth Token:', authToken ? `${authToken.slice(0, 8)}...` : 'MISSING');
    console.log('From Number:', fromNumber);
    console.log('To Number:', toNumber);
    
    if (!accountSid || !authToken || !fromNumber || !toNumber) {
      return NextResponse.json({
        success: false,
        error: 'Missing required environment variables',
        details: {
          hasAccountSid: !!accountSid,
          hasAuthToken: !!authToken,
          hasFromNumber: !!fromNumber,
          hasToNumber: !!toNumber
        }
      }, { status: 400 });
    }
    
    // Initialize Twilio client
    const client = twilio(accountSid, authToken);
    
    // Test message
    const testMessage = `🧪 Test Connection\n\nTwilio WhatsApp integration test successful!\n\nTime: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
    
    console.log('📤 Sending test message...');
    
    const message = await client.messages.create({
      from: fromNumber,
      to: toNumber,
      body: testMessage
    });
    
    console.log('✅ Message sent successfully:', message.sid);
    
    return NextResponse.json({
      success: true,
      message: 'WhatsApp test message sent successfully!',
      details: {
        messageSid: message.sid,
        from: fromNumber,
        to: toNumber,
        status: message.status,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error: any) {
    console.error('❌ Test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      details: {
        code: error.code,
        status: error.status,
        moreInfo: error.moreInfo || 'Check Twilio documentation'
      }
    }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({
    message: 'Use GET method to test WhatsApp connection',
    endpoint: 'GET /api/test-connection'
  });
}
