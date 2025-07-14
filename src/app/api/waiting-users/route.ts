import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient, UserRole } from '@/generated/prisma';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Check if user has authenticated role
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email! }
    });

    if (!currentUser || currentUser.role !== UserRole.AUTHENTICATED) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Get all waiting users
    const waitingUsers = await prisma.user.findMany({
      where: { role: UserRole.WAITING },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      users: waitingUsers
    });

  } catch (error) {
    console.error('Fetch waiting users error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 