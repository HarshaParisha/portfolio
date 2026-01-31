import { NextResponse } from 'next/server';
import { getAllSubscribers } from '@/lib/firestore';

export async function GET() {
  try {
    const subscribers = await getAllSubscribers();
    
    return NextResponse.json({
      success: true,
      count: subscribers.length,
      subscribers: subscribers
    });
    
  } catch (error) {
    console.error('❌ Error fetching subscribers:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch subscribers.' 
      },
      { status: 500 }
    );
  }
}
