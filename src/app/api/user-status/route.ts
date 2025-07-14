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

    // Get current user
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email! }
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user has admin privileges (can access staff admin)
    const isAdmin = currentUser.role === UserRole.AUTHENTICATED;

    // Check if user is a staff member (has a staff profile)
    const staffProfile = await prisma.staff.findFirst({
      where: {
        // We'll match by name since there's no direct link between User and Staff
        // This assumes staff profiles are created with the same name as the user
        name: currentUser.name || ''
      }
    });

    const isStaff = !!staffProfile;

    return NextResponse.json({
      user: {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
        image: currentUser.image
      },
      isAdmin,
      isStaff,
      staffProfile: staffProfile ? {
        id: staffProfile.id,
        name: staffProfile.name,
        rank: staffProfile.rank,
        description: staffProfile.description,
        order: staffProfile.order
      } : null
    });

  } catch (error) {
    console.error('Fetch user status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 