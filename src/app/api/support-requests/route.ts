import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    // Check if user is authenticated and has admin access
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supportRequests = await prisma.supportRequest.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json({ 
      success: true, 
      requests: supportRequests 
    });

  } catch (error) {
    console.error('Error fetching support requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch support requests' },
      { status: 500 }
    );
  }
} 