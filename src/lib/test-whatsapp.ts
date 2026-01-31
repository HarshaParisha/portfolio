import { whatsappService } from '@/lib/whatsapp-service';

interface TestInquiry {
  name: string;
  email: string;
  whatsapp?: string;
  welcomeChoice: string;
  serviceType: string;
  projectDescription: string;
  timeline: string;
  projectStatus: string;
  contactInfo?: string;
}

export async function testWhatsAppIntegration() {
  console.log('🧪 Testing WhatsApp Integration...');

  // Test connection first
  const connectionTest = await whatsappService.testConnection();
  if (!connectionTest) {
    console.error('❌ WhatsApp connection test failed');
    return false;
  }

  // Test studio inquiry
  const mockInquiry: TestInquiry = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    whatsapp: '+91 9876543210',
    welcomeChoice: 'I want to build an AI solution',
    serviceType: 'ChatGPT-like conversational AI',
    projectDescription: 'I need an AI chatbot for customer support that can handle multiple languages and integrate with our existing CRM system.',
    timeline: 'Normal (1-2 months)',
    projectStatus: 'I have a general idea but need help refining',
    contactInfo: 'John Doe, john.doe@example.com, +91 9876543210'
  };

  const result = await whatsappService.sendStudioInquiry(mockInquiry);
  
  if (result.success) {
    console.log('✅ Test inquiry sent successfully:', result.messageId);
    
    // Send quick notification test
    await whatsappService.sendQuickNotification('Test notification from portfolio website');
    
    return true;
  } else {
    console.error('❌ Test inquiry failed:', result.error);
    return false;
  }
}

// You can run this test by calling it from a React component or API route
export default testWhatsAppIntegration;
