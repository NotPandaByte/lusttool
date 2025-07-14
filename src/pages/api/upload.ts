import { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer'
import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  },
})

// Helper to run middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Run multer middleware
    await runMiddleware(req, res, upload.single('image'))

    const file = (req as any).file
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Get upload type from query (avatar or banner)
    const { type = 'avatar' } = req.query
    const uploadType = type as string

    // Validate upload type
    if (!['avatar', 'banner'].includes(uploadType)) {
      return res.status(400).json({ error: 'Invalid upload type. Must be "avatar" or "banner"' })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    
    // Define upload path based on type
    const uploadDir = uploadType === 'avatar' ? 'avatars' : 'banners'
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', uploadDir)
    const filePath = path.join(uploadPath, filename)

    // Ensure upload directory exists
    await fs.mkdir(uploadPath, { recursive: true })

    // Process image with Sharp
    const processedImage = sharp(file.buffer)

    // Resize based on type
    if (uploadType === 'avatar') {
      // Square avatar: 400x400
      processedImage.resize(400, 400, { 
        fit: 'cover',
        position: 'center'
      })
    } else {
      // Banner: 1200x300
      processedImage.resize(1200, 300, {
        fit: 'cover',
        position: 'center'
      })
    }

    // Convert to WebP for better compression and save
    await processedImage
      .webp({ quality: 85 })
      .toFile(filePath.replace(/\.[^/.]+$/, '.webp'))

    // Return the URL path
    const imageUrl = `/uploads/${uploadDir}/${filename.replace(/\.[^/.]+$/, '.webp')}`
    
    res.status(200).json({ 
      url: imageUrl,
      type: uploadType,
      filename: filename.replace(/\.[^/.]+$/, '.webp')
    })

  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Failed to upload image' })
  }
}

// Important: Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
} 