import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published') !== 'false'; // Default to published events
    const includeAll = searchParams.get('includeAll') === 'true'; // For admin/staff views

    const events = await prisma.event.findMany({
      where: includeAll ? {} : { published: true },
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
      },
      orderBy: [
        { date: 'asc' }
      ]
    });

    // Add registration count to each event
    const eventsWithCounts = events.map(event => ({
      ...event,
      registrationCount: event.registrations.length,
    }));

    return NextResponse.json({ 
      success: true, 
      events: eventsWithCounts 
    });

  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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
      staffAssigned,
      published = false
    } = body;

    // Validate required fields
    if (!title || !description || !date || !time || !location || !capacity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the event
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        time,
        location,
        type: type || 'REGULAR',
        capacity: parseInt(capacity),
        price: price ? parseFloat(price) : 0,
        features: features || [],
        published,
        publishedAt: published ? new Date() : null,
        status: published ? 'ACTIVE' : 'DRAFT',
        createdById: session.user.id || '',
        staff: staffAssigned ? {
          connect: staffAssigned.map((staffId: string) => ({ id: staffId }))
        } : undefined
      },
      include: {
        createdBy: {
          select: {
            name: true,
            email: true,
          }
        },
        staff: true,
        registrations: true
      }
    });

    return NextResponse.json({ 
      success: true, 
      event 
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
} 