import { NextRequest, NextResponse } from 'next/server';

// Sample stock data - in a real app, this would come from a financial API
const stockData = {
  'AAPL': { symbol: 'AAPL', price: 195.89, change: 2.34, changePercent: 1.21 },
  'GOOGL': { symbol: 'GOOGL', price: 142.56, change: -1.23, changePercent: -0.85 },
  'MSFT': { symbol: 'MSFT', price: 378.85, change: 4.56, changePercent: 1.22 },
  'TSLA': { symbol: 'TSLA', price: 248.42, change: -3.21, changePercent: -1.27 },
  'NVDA': { symbol: 'NVDA', price: 875.28, change: 12.45, changePercent: 1.44 },
  'META': { symbol: 'META', price: 425.67, change: 5.89, changePercent: 1.40 },
  'AMZN': { symbol: 'AMZN', price: 178.25, change: -2.10, changePercent: -1.16 }
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');

    if (symbol && stockData[symbol as keyof typeof stockData]) {
      return NextResponse.json(stockData[symbol as keyof typeof stockData]);
    }

    // Return all stocks if no specific symbol requested
    return NextResponse.json(stockData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // In a real app, this would handle stock data updates
    return NextResponse.json({ message: 'Stock data updated successfully', data });
  } catch (error) {
    console.error('Error updating stock data:', error);
    return NextResponse.json(
      { error: 'Failed to update stock data' },
      { status: 500 }
    );
  }
}