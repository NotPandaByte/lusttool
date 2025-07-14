import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient, UserRole } from '@/generated/prisma';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

// GET - Fetch all staff members
export async function GET() {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
      include: {
        image: true,
        banner: true
      }
    });

    // Convert to frontend-compatible format with image URLs
    const staffWithUrls = staff.map(member => ({
      ...member,
      image: member.imageId ? `/api/image/${member.imageId}` : null,
      banner: member.bannerId ? `/api/image/${member.bannerId}` : null,
      // Remove the included objects to avoid confusion
      imageId: undefined,
      bannerId: undefined
    }));

    return NextResponse.json({
      staff: staffWithUrls
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

    // Extract image IDs from URLs if they are in the format /api/image/{id}
    const extractImageId = (url: string) => {
      if (!url) return null;
      const match = url.match(/\/api\/image\/([a-zA-Z0-9-]+)/);
      return match ? match[1] : null;
    };

    const imageId = extractImageId(image);
    const bannerId = extractImageId(banner);

    // Create new staff member
    const staff = await prisma.staff.create({
      data: {
        name,
        rank,
        description,
        imageId,
        bannerId,
        vrchatAvatar,
        links,
        order: order || 0
      },
      include: {
        image: true,
        banner: true
      }
    });

    // Convert to frontend-compatible format
    const staffWithUrls = {
      ...staff,
      image: staff.imageId ? `/api/image/${staff.imageId}` : null,
      banner: staff.bannerId ? `/api/image/${staff.bannerId}` : null,
      imageId: undefined,
      bannerId: undefined
    };

    return NextResponse.json({
      message: 'Staff member created successfully',
      staff: staffWithUrls
    }, { status: 201 });

  } catch (error) {
    console.error('Create staff error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 