import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    const category = formData.get('category') as string || 'general'; // staff, gallery, general

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // File size validation (50MB limit)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: `File too large. Maximum size is 50MB. Your file is ${(file.size / (1024 * 1024)).toFixed(1)}MB.` 
      }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = {
      image: {
        mimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
        extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
      },
      model: {
        mimeTypes: ['application/octet-stream', 'model/gltf-binary', 'model/gltf+json'],
        extensions: ['.fbx', '.glb', '.gltf']
      }
    };

    const fileType = allowedTypes[type as keyof typeof allowedTypes];
    if (!fileType) {
      return NextResponse.json({ 
        error: 'Invalid type. Must be either "image" or "model".' 
      }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    const isValidType = fileType.mimeTypes.includes(file.type) || 
                       fileType.extensions.some(ext => fileName.endsWith(ext));

    if (!isValidType) {
      return NextResponse.json({ 
        error: `Invalid file type. Expected ${type} file with extensions: ${fileType.extensions.join(', ')}` 
      }, { status: 400 });
    }

    // Create directory based on type and category
    let uploadDir = '';
    if (type === 'image') {
      uploadDir = category === 'staff' ? 'staff-images' : 'uploads/images';
    } else if (type === 'model') {
      uploadDir = category === 'staff' ? 'staff-models' : 'uploads/models';
    }

    const dirPath = path.join(process.cwd(), 'public', uploadDir);
    
    try {
      await mkdir(dirPath, { recursive: true });
    } catch (error) {
      console.error('Error creating directory:', error);
      return NextResponse.json({ 
        error: 'Failed to create upload directory' 
      }, { status: 500 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${sanitizedName}`;
    const filepath = path.join(dirPath, filename);

    // Convert file to buffer and save
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filepath, buffer);
    } catch (error) {
      console.error('Error saving file:', error);
      return NextResponse.json({ 
        error: 'Failed to save file' 
      }, { status: 500 });
    }

    // Return the public URL
    const publicUrl = `/${uploadDir}/${filename}`;

    return NextResponse.json({ 
      url: publicUrl,
      filename: filename,
      originalName: file.name,
      size: file.size,
      type: file.type,
      uploadDir: uploadDir
    }, { status: 200 });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Failed to upload file. Please try again.' 
    }, { status: 500 });
  }
} 