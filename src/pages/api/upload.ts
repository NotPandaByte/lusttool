import formidable from 'formidable';
import fs from 'fs';
import { Pool } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: { bodyParser: false },
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({ 
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB limit
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Formidable error:', err);
      return res.status(500).json({ error: 'Upload error' });
    }

    try {
      const fileArray = Array.isArray(files.image) ? files.image : [files.image];
      const file = fileArray[0];
      
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Read the file as buffer
      const buffer = fs.readFileSync(file.filepath);
      const mimetype = file.mimetype || 'image/jpeg';
      const filename = file.originalFilename || 'uploaded-image';

      // Validate it's an image
      if (!mimetype.startsWith('image/')) {
        return res.status(400).json({ error: 'Only image files are allowed' });
      }

      // Insert into database
      const result = await pool.query(
        'INSERT INTO "Image" (id, data, mimetype, filename, "createdAt") VALUES (gen_random_uuid()::text, $1, $2, $3, NOW()) RETURNING id',
        [buffer, mimetype, filename]
      );

      const imageId = result.rows[0].id;

      // Clean up temp file
      fs.unlinkSync(file.filepath);

      res.status(200).json({ 
        success: true, 
        imageId,
        url: `/api/image/${imageId}`
      });

    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to save image' });
    }
  });
} 