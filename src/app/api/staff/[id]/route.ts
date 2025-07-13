import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient, UserRole } from '@/generated/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// DELETE - Remove staff member
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = params;

    // Delete staff member
    await prisma.staff.delete({
      where: { id }
    });

    return NextResponse.json({
      message: 'Staff member deleted successfully'
    });

  } catch (error) {
    console.error('Delete staff error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 