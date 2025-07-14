import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            name: true,
            email: true,
          }
        },
        image: true,
        staff: {
          select: {
            id: true,
            name: true,
            position: true,
          }
        },
        registrations: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                role: true,
              }
            }
          }
        }
      }
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const eventWithCount = {
      ...event,
      registrationCount: event.registrations.length,
    };

    return NextResponse.json({ 
      success: true, 
      event: eventWithCount 
    });

  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      title, 
      description, 
      date, 
      time, 
      location, 
      type, 
      capacity, 
      price, 
      features, 
      status,
      published,
      staffAssigned
    } = body;

    // Check if user owns the event or is admin
    const existingEvent = await prisma.event.findUnique({
      where: { id },
      select: { createdById: true, publishedAt: true }
    });

    if (!existingEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (existingEvent.createdById !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updateData: any = {};
    
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (date !== undefined) updateData.date = new Date(date);
    if (time !== undefined) updateData.time = time;
    if (location !== undefined) updateData.location = location;
    if (type !== undefined) updateData.type = type;
    if (capacity !== undefined) updateData.capacity = parseInt(capacity);
    if (price !== undefined) updateData.price = parseFloat(price);
    if (features !== undefined) updateData.features = features;
    if (status !== undefined) updateData.status = status;
    
    // Handle publishing
    if (published !== undefined) {
      updateData.published = published;
      if (published && !existingEvent.publishedAt) {
        updateData.publishedAt = new Date();
        updateData.status = 'ACTIVE';
      } else if (!published) {
        updateData.publishedAt = null;
        updateData.status = 'DRAFT';
      }
    }

    // Handle staff assignment
    if (staffAssigned !== undefined) {
      updateData.staff = {
        set: staffAssigned.map((staffId: string) => ({ id: staffId }))
      };
    }

    updateData.updatedAt = new Date();

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: updateData,
      include: {
        createdBy: {
          select: {
            name: true,
            email: true,
          }
        },
        image: true,
        staff: true,
        registrations: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                role: true,
              }
            }
          }
        }
      }
    });

    const eventWithCount = {
      ...updatedEvent,
      registrationCount: updatedEvent.registrations.length,
    };

    return NextResponse.json({ 
      success: true, 
      event: eventWithCount 
    });

  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user owns the event or is admin
    const existingEvent = await prisma.event.findUnique({
      where: { id },
      select: { createdById: true }
    });

    if (!existingEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (existingEvent.createdById !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.event.delete({
      where: { id }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Event deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
} 