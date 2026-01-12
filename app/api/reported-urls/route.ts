import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/app/api/_base';

// POST /api/reported-urls - Report a URL that couldn't be scraped
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Check if URL is already reported
    const existingReport = await prisma.reportedURL.findFirst({
      where: { url }
    });

    if (existingReport) {
      return NextResponse.json({
        message: 'URL already reported',
        reportedUrl: existingReport
      }, { status: 200 });
    }

    // Create new reported URL
    const reportedUrl = await prisma.reportedURL.create({
      data: {
        url,
        addressed: false
      }
    });

    return NextResponse.json({
      message: 'URL reported successfully',
      reportedUrl
    }, { status: 201 });
  } catch (error) {
    console.error('Error reporting URL:', error);
    return NextResponse.json({ error: 'Failed to report URL' }, { status: 500 });
  }
}

// GET /api/reported-urls - Get all reported URLs (for admin use)
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const addressedFilter = searchParams.get('addressed');

    const where = addressedFilter !== null
      ? { addressed: addressedFilter === 'true' }
      : {};

    const reportedUrls = await prisma.reportedURL.findMany({
      where,
      orderBy: { id: 'desc' }
    });

    return NextResponse.json(reportedUrls);
  } catch (error) {
    console.error('Error fetching reported URLs:', error);
    return NextResponse.json({ error: 'Failed to fetch reported URLs' }, { status: 500 });
  }
}
