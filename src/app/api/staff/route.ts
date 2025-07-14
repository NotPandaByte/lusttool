import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient, UserRole } from '@/generated/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// GET - Fetch all staff members
export async function GET() {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json({
      staff
    });

  } catch (error) {
    console.error('Fetch staff error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new staff member (authenticated users only)
export async function POST(request: NextRequest) {
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

    const { name, rank, description, image, banner, vrchatAvatar, links, order } = await request.json();

    // Basic validation
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Create new staff member
    const staff = await prisma.staff.create({
      data: {
        name,
        rank,
        description,
        image,
        banner,
        vrchatAvatar,
        links,
        order: order || 0
      }
    });

    return NextResponse.json({
      message: 'Staff member created successfully',
      staff
    }, { status: 201 });

  } catch (error) {
    console.error('Create staff error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 