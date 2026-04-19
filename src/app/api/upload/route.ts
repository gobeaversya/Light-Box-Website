import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { isRateLimited, getClientIp } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'
import { randomUUID } from 'crypto'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)

  // Allow 10 uploads per IP per 15 minutes
  if (isRateLimited(`upload:${ip}`, 10, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'Too many uploads. Please wait a few minutes.' },
      { status: 429 },
    )
  }

  const formData = await request.formData()
  const file = formData.get('photo') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 })
  }

  const bytes  = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Upload buffer to Cloudinary, return the secure CDN URL
  const secureUrl = await new Promise<string>((resolve, reject) => {
    const publicId = `lithophane-orders/${randomUUID()}`
    cloudinary.uploader.upload_stream(
      { public_id: publicId, overwrite: false },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error('Upload failed'))
        resolve(result.secure_url)
      }
    ).end(buffer)
  })

  // Return as `filename` to keep the existing form + webhook code unchanged
  return NextResponse.json({ filename: secureUrl })
}
