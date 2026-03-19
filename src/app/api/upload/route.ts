import { writeFile, mkdir } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  // request.formData() parses multipart/form-data without any extra library
  const formData = await request.formData()
  const file = formData.get('photo') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  // Basic validation
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 })
  }

  // Build a safe, unique filename — never trust the original filename from the user
  const ext      = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
  const filename = `${randomUUID()}.${ext}`

  // Ensure the uploads directory exists (creates it if missing)
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDir, { recursive: true })

  // Convert the File object to a Node.js Buffer and write to disk
  const bytes  = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  await writeFile(path.join(uploadDir, filename), buffer)

  return NextResponse.json({ filename })
}
