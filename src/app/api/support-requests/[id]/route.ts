import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest
) {
  try {
    // Extract ID from URL pathname
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    
    const session = await getServerSession();
    
    // Check if user is authenticated and has admin access
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status, response, assignedTo } = body;

    const updateData: any = {};
    
    if (status) {
      updateData.status = status;
      if (status === 'RESOLVED' || status === 'CLOSED') {
        updateData.resolvedAt = new Date();
      }
    }
    
    if (response) {
      updateData.response = response;
    }
    
    if (assignedTo) {
      updateData.assignedTo = assignedTo;
    }

    updateData.updatedAt = new Date();

    const updatedRequest = await prisma.supportRequest.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      request: updatedRequest 
    });

  } catch (error) {
    console.error('Error updating support request:', error);
    return NextResponse.json(
      { error: 'Failed to update support request' },
      { status: 500 }
    );
  }
} 