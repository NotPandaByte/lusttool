import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient, UserRole } from '@/generated/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// PUT - Update staff member
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params;
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

    // Update staff member
    const staff = await prisma.staff.update({
      where: { id },
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
      message: 'Staff member updated successfully',
      staff: staffWithUrls
    });

  } catch (error) {
    console.error('Update staff error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Remove staff member
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params;

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