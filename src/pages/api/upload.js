import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Create upload directories
  const uploadDirs = ['public/uploads', 'public/staff-images', 'public/staff-models'];
  for (const dir of uploadDirs) {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  const form = formidable({ 
    uploadDir: path.join(process.cwd(), 'public/uploads'), 
    keepExtensions: true,
    maxFileSize: 50 * 1024 * 1024, // 50MB
    filter: (part) => {
      // Only allow image and model files
      if (!part.originalFilename) return false;
      const fileName = part.originalFilename.toLowerCase();
      const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      const modelExts = ['.fbx', '.glb', '.gltf'];
      return imageExts.some(ext => fileName.endsWith(ext)) || 
             modelExts.some(ext => fileName.endsWith(ext));
    }
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Formidable parse error:', err);
      return res.status(500).json({ error: 'Upload failed' });
    }

    const file = files.file?.[0] || files.image?.[0];
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Determine the correct path based on file type
    const fileName = file.originalFilename?.toLowerCase() || '';
    let uploadPath = '/uploads/';
    
    if (fileName.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      uploadPath = '/staff-images/';
    } else if (fileName.match(/\.(fbx|glb|gltf)$/)) {
      uploadPath = '/staff-models/';
    }

    const publicUrl = `${uploadPath}${file.newFilename}`;

    res.status(200).json({ 
      url: publicUrl,
      filename: file.newFilename,
      originalName: file.originalFilename,
      size: file.size,
      type: file.mimetype
    });
  });
} 