import { NextRequest, NextResponse } from 'next/server';
import testWhatsAppIntegration from '@/lib/test-whatsapp';

export async function GET() {
  try {
    console.log('🧪 Starting WhatsApp integration test...');
    
    const testResult = await testWhatsAppIntegration();
    
    if (testResult) {
      return NextResponse.json({
        success: true,
        message: 'WhatsApp integration test completed successfully!',
        details: 'Check your WhatsApp for test messages.',
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'WhatsApp integration test failed.',
        details: 'Check console logs for error details.',
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('💥 Test API Error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Test API encountered an error.',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({
    message: 'Use GET method to run WhatsApp tests',
    availableEndpoints: {
      'GET /api/test-whatsapp': 'Run complete WhatsApp integration test'
    }
  });
}
