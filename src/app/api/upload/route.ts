import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient, UserRole } from '@/generated/prisma';
import { authOptions } from '../auth/[...nextauth]/route';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const prisma = new PrismaClient();

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

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const type: string = data.get('type') as string; // 'image' or 'model'

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const allowedModelTypes = ['model/gltf-binary', 'model/gltf+json', 'application/octet-stream'];
    
    if (type === 'image' && !allowedImageTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid image file type' },
        { status: 400 }
      );
    }

    if (type === 'model' && !allowedModelTypes.includes(file.type) && !file.name.endsWith('.glb') && !file.name.endsWith('.gltf') && !file.name.endsWith('.fbx')) {
      return NextResponse.json(
        { error: 'Invalid model file type. Only GLB, GLTF, and FBX files are supported' },
        { status: 400 }
      );
    }

    // Create unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const uploadDir = type === 'image' ? 'staff-images' : 'staff-models';
    const filepath = join(process.cwd(), 'public', uploadDir, filename);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Return the public URL
    const publicUrl = `/${uploadDir}/${filename}`;

    return NextResponse.json({
      message: 'File uploaded successfully',
      url: publicUrl,
      filename: filename
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 