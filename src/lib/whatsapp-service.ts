import twilio from 'twilio';

interface StudioInquiry {
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

interface WhatsAppResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export class WhatsAppService {
  private client: twilio.Twilio;

  constructor() {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      throw new Error('Twilio credentials are required. Please check your environment variables.');
    }

    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  /**
   * Send formatted studio inquiry to WhatsApp
   */
  async sendStudioInquiry(data: StudioInquiry): Promise<WhatsAppResponse> {
    try {
      const message = this.formatStudioMessage(data);
      
      console.log('🚀 Sending WhatsApp notification for studio inquiry...');
      
      const result = await this.client.messages.create({
        from: process.env.TWILIO_WHATSAPP_FROM!,
        to: process.env.YOUR_WHATSAPP_NUMBER!,
        body: message
      });

      console.log('✅ WhatsApp message sent successfully:', result.sid);
      return { 
        success: true, 
        messageId: result.sid 
      };
      
    } catch (error) {
      console.error('❌ WhatsApp send error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  }

  /**
   * Send quick summary notification
   */
  async sendQuickNotification(message: string): Promise<boolean> {
    try {
      const timestamp = new Date().toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      const quickMessage = `🔔 *Portfolio Notification*\n\n${message}\n\n⏰ Time: ${timestamp}`;
      
      await this.client.messages.create({
        from: process.env.TWILIO_WHATSAPP_FROM!,
        to: process.env.YOUR_WHATSAPP_NUMBER!,
        body: quickMessage
      });

      console.log('✅ Quick notification sent successfully');
      return true;
      
    } catch (error) {
      console.error('❌ Quick notification error:', error);
      return false;
    }
  }

  /**
   * Format studio inquiry message for WhatsApp
   */
  private formatStudioMessage(data: StudioInquiry): string {
    const timestamp = new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    // Parse contact info if provided
    const contactParts = data.contactInfo?.split(',').map(part => part.trim()) || [];
    const [parsedName = '', parsedEmail = '', parsedPhone = ''] = contactParts;

    return `
🤖 *STUDIO AI CHAT INQUIRY*
━━━━━━━━━━━━━━━━━━━━━━━━━

👤 *CLIENT DETAILS:*
• Name: ${data.name || parsedName || 'Not provided'}
• Email: ${data.email || parsedEmail || 'Not provided'}
• WhatsApp: ${data.whatsapp || parsedPhone || 'Not provided'}

🎯 *INITIAL INTEREST:*
${data.welcomeChoice}

💼 *SERVICE TYPE:*
${data.serviceType}

📝 *PROJECT DESCRIPTION:*
${data.projectDescription || 'Details to be discussed'}

⏰ *TIMELINE:*
${data.timeline || 'To be determined'}

📊 *PROJECT STATUS:*
${data.projectStatus || 'New inquiry'}

${data.contactInfo ? `💬 *RAW CONTACT INFO:*\n${data.contactInfo}\n` : ''}

🌐 *Source:* AI Studio Chat Assistant
⏰ *Time:* ${timestamp}
🔗 *Website:* harshaparisha.tech

━━━━━━━━━━━━━━━━━━━━━━━━━
*This lead is ready for follow-up!* 🚀
    `.trim();
  }

  /**
   * Test WhatsApp connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const testMessage = `🧪 *WhatsApp Test*\n\nConnection test successful!\n\nTime: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
      
      await this.client.messages.create({
        from: process.env.TWILIO_WHATSAPP_FROM!,
        to: process.env.YOUR_WHATSAPP_NUMBER!,
        body: testMessage
      });

      console.log('✅ WhatsApp connection test successful');
      return true;
      
    } catch (error) {
      console.error('❌ WhatsApp connection test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const whatsappService = new WhatsAppService();
