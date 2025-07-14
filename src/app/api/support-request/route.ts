import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, type, userId, userRole } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Determine the correct userRole and priority
    const finalUserRole = userRole === 'VIP' ? 'VIP' : 'AUTHENTICATED';
    const priority = userRole === 'VIP' ? 'HIGH' : 'NORMAL';

    // Create support request
    const supportRequest = await prisma.supportRequest.create({
      data: {
        name,
        email,
        subject,
        message,
        type,
        userId,
        userRole: finalUserRole,
        priority,
        status: 'OPEN',
        createdAt: new Date(),
      }
    });

    return NextResponse.json({ 
      success: true, 
      requestId: supportRequest.id 
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating support request:', error);
    return NextResponse.json(
      { error: 'Failed to create support request' },
      { status: 500 }
    );
  }
} 