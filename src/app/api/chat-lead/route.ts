import { NextRequest, NextResponse } from 'next/server';
import { whatsappService } from '@/lib/whatsapp-service';

interface ChatData {
  welcomeChoice: string;
  serviceType: string;
  projectDescription: string;
  timeline: string;
  projectStatus: string;
  name: string;
  email: string;
  whatsapp?: string;
  contactInfo?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ChatData = await request.json();

    // Log the inquiry
    console.log('� New Studio Inquiry received:', {
      name: data.name,
      email: data.email,
      service: data.serviceType,
      timestamp: new Date().toISOString()
    });

    // Send detailed WhatsApp notification using Twilio
    const whatsappResult = await whatsappService.sendStudioInquiry(data);
    
    if (whatsappResult.success) {
      console.log('✅ WhatsApp notification sent successfully:', whatsappResult.messageId);
      
      // Send a quick summary notification as well
      const summaryMessage = `New Studio Inquiry from ${data.name || 'Unknown'} - ${data.serviceType}`;
      await whatsappService.sendQuickNotification(summaryMessage);
      
    } else {
      console.error('❌ WhatsApp notification failed:', whatsappResult.error);
    }

    // Store inquiry data (you can implement Firebase/database storage here)
    // Example: await storeInquiry(data);

    return NextResponse.json({ 
      success: true, 
      message: 'Studio inquiry submitted successfully!',
      whatsappSent: whatsappResult.success,
      details: {
        messageId: whatsappResult.messageId,
        timestamp: new Date().toISOString(),
        source: 'studio-chat'
      }
    });

  } catch (error) {
    console.error('💥 API Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit studio inquiry. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Studio Assistant API with WhatsApp integration is running',
    endpoints: ['POST /api/chat-lead'],
    features: ['Twilio WhatsApp notifications', 'Formatted inquiry messages', 'Error handling'],
    timestamp: new Date().toISOString()
  });
}
