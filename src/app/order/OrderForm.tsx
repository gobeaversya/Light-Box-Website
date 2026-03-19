'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const SIZES = [
  { slug: '4x5',  label: '4×5"',  price: 40 },
  { slug: '6x8',  label: '6×8"',  price: 60 },
  { slug: '8x10', label: '8×10"', price: 80 },
]

const RUSH_FEE = 15
const SHIPPING  = 9

export default function OrderForm() {
  const searchParams = useSearchParams()

  // Pre-select size if ?size= is in the URL (set by ProductCard links)
  const defaultSize = SIZES.find(s => s.slug === searchParams.get('size'))?.slug ?? '4x5'

  const [selectedSize, setSelectedSize] = useState(defaultSize)
  const [rush, setRush] = useState(false)
  const [notes, setNotes] = useState('')

  // Photo upload state
  const [photoFile, setPhotoFile]       = useState<File | null>(null)
  const [photoLink, setPhotoLink]       = useState('')
  const [previewUrl, setPreviewUrl]     = useState<string | null>(null)
  const [resolutionOk, setResolutionOk] = useState<boolean | null>(null) // null = not checked yet

  // Form submission state
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const [uploadMethod, setUploadMethod] = useState<'file' | 'link'>('file')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const selectedSizeData = SIZES.find(s => s.slug === selectedSize)!
  const subtotal = selectedSizeData.price + (rush ? RUSH_FEE : 0) + SHIPPING

  // ── Image processing ──────────────────────────────────────────────────────
  // When the user uploads a photo, we:
  //   1. Check its resolution (warn if too low)
  //   2. Generate a lithophane preview using the Canvas API
  //
  // How the preview works: A real lithophane is thick where the photo is dark
  // (thick plastic blocks light → appears dark when backlit) and thin where
  // it's bright (thin plastic lets light through → appears bright when backlit).
  // So to approximate what the backlit lithophane will look like, we:
  //   - Convert to grayscale (luminance formula weights channels by human perception)
  //   - Invert the colors (dark ↔ light)
  // The result is a rough approximation — actual lithophanes look even better.
  const generatePreview = useCallback((file: File) => {
    const objectUrl = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      // Resolution check — 1000px on shortest side is the minimum for good detail
      const minDim = Math.min(img.naturalWidth, img.naturalHeight)
      setResolutionOk(minDim >= 1000)

      // Scale the preview canvas to at most 480px wide/tall for performance
      const scale   = Math.min(480 / img.naturalWidth, 480 / img.naturalHeight, 1)
      const canvas  = document.createElement('canvas')
      canvas.width  = Math.round(img.naturalWidth  * scale)
      canvas.height = Math.round(img.naturalHeight * scale)

      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const d = imageData.data // Flat Uint8ClampedArray: [R,G,B,A, R,G,B,A, ...]

      for (let i = 0; i < d.length; i += 4) {
        // Weighted grayscale (ITU-R BT.601 luma coefficients)
        const gray    = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]
        const inverted = 255 - gray // Invert: approximate backlit appearance
        d[i]     = inverted  // R
        d[i + 1] = inverted  // G
        d[i + 2] = inverted  // B
        // d[i + 3] = alpha — leave unchanged
      }

      ctx.putImageData(imageData, 0, 0)
      setPreviewUrl(canvas.toDataURL('image/jpeg', 0.85))

      URL.revokeObjectURL(objectUrl) // Free memory
    }

    img.src = objectUrl
  }, [])

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, WebP, etc.)')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Photo must be under 10MB. Try compressing it first.')
      return
    }
    setError(null)
    setPhotoFile(file)
    generatePreview(file)
  }

  // Drag-and-drop handlers
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFileChange(file)
  }

  // ── Form submission ───────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!photoFile && !photoLink.trim()) {
      setError('Please upload a photo or paste a link to your photo.')
      return
    }

    setLoading(true)

    try {
      let photoFilename = ''

      // Step 1: Upload the file (if one was selected)
      if (photoFile) {
        const formData = new FormData()
        formData.append('photo', photoFile)

        const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
        const uploadData = await uploadRes.json()

        if (!uploadRes.ok) throw new Error(uploadData.error || 'Upload failed')
        photoFilename = uploadData.filename
      }

      // Step 2: Create a Stripe Checkout session
      const checkoutRes = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          size: selectedSize,
          rush,
          notes,
          photoFilename,
          photoLink: photoLink.trim(),
        }),
      })
      const checkoutData = await checkoutRes.json()

      if (!checkoutRes.ok) throw new Error(checkoutData.error || 'Could not start checkout')

      // Step 3: Redirect to Stripe's hosted checkout page
      window.location.href = checkoutData.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">

      {/* ── LEFT COLUMN: Order options ──────────────────────────────────── */}
      <div className="space-y-6">

        {/* Size selector */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900">
          <h2 className="font-semibold text-zinc-100 mb-4">1. Choose Your Size</h2>
          <div className="space-y-3">
            {SIZES.map((s) => (
              <label
                key={s.slug}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
                  ${selectedSize === s.slug
                    ? 'border-amber-400/60 bg-amber-400/5'
                    : 'border-zinc-700 hover:border-zinc-600'}`}
              >
                <div className="flex items-center gap-3">
                  {/* Custom radio button */}
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                    ${selectedSize === s.slug ? 'border-amber-400' : 'border-zinc-600'}`}
                  >
                    {selectedSize === s.slug && (
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </div>
                  <input
                    type="radio"
                    name="size"
                    value={s.slug}
                    checked={selectedSize === s.slug}
                    onChange={() => setSelectedSize(s.slug)}
                    className="sr-only" // visually hidden — the div above is the visible indicator
                  />
                  <span className="font-medium text-zinc-100">{s.label}</span>
                </div>
                <span className="text-amber-400 font-bold">${s.price}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rush order toggle */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900">
          <h2 className="font-semibold text-zinc-100 mb-4">2. Rush Order</h2>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="text-zinc-200 font-medium">Add rush processing</div>
              <div className="text-zinc-500 text-sm mt-0.5">Ships in 2–3 business days instead of 5–7</div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${rush ? 'text-amber-400' : 'text-zinc-500'}`}>
                {rush ? '+$15' : 'Free'}
              </span>
              {/* Toggle switch */}
              <button
                type="button"
                role="switch"
                aria-checked={rush}
                onClick={() => setRush(!rush)}
                className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none
                  ${rush ? 'bg-amber-400' : 'bg-zinc-700'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform
                  ${rush ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
            </div>
          </label>
        </div>

        {/* Notes */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900">
          <h2 className="font-semibold text-zinc-100 mb-1">3. Order Notes <span className="text-zinc-500 font-normal">(optional)</span></h2>
          <p className="text-zinc-500 text-sm mb-4">Any special instructions — cropping preferences, which person to focus on, etc.</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={500}
            rows={3}
            placeholder="e.g. Please crop tightly around the two people on the left…"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600
              focus:outline-none focus:border-amber-400/50 resize-none text-sm transition-colors"
          />
          <div className="text-right text-xs text-zinc-600 mt-1">{notes.length}/500</div>
        </div>

        {/* Price summary */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900">
          <h2 className="font-semibold text-zinc-100 mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">{selectedSizeData.label} 3D Photo Lamp</span>
              <span className="text-zinc-200">${selectedSizeData.price}.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Rush processing</span>
              <span className={rush ? 'text-zinc-200' : 'text-zinc-600'}>{rush ? '+$15.00' : '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Shipping</span>
              <span className="text-zinc-200">$9.00</span>
            </div>
            <div className="border-t border-zinc-700 pt-2 mt-2 flex justify-between text-base font-semibold">
              <span className="text-zinc-200">Total</span>
              <span className="text-amber-400">${subtotal}.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN: Photo upload ───────────────────────────────────── */}
      <div className="space-y-6">
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900">
          <h2 className="font-semibold text-zinc-100 mb-4">4. Upload Your Photo</h2>

          {/* Tab: File vs Link */}
          <div className="flex rounded-lg border border-zinc-700 p-1 mb-5 gap-1">
            {(['file', 'link'] as const).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setUploadMethod(method)}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors
                  ${uploadMethod === method ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                {method === 'file' ? 'Upload from Device' : 'Google Drive / Dropbox Link'}
              </button>
            ))}
          </div>

          {uploadMethod === 'file' ? (
            <>
              {/* Drag & drop zone */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-zinc-700 hover:border-amber-400/40 rounded-xl p-8 text-center cursor-pointer transition-colors mb-3"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                />
                {photoFile ? (
                  <div>
                    <div className="text-amber-400 font-medium mb-1">✓ {photoFile.name}</div>
                    <div className="text-zinc-500 text-xs">Click to change</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl mb-2">📷</div>
                    <div className="text-zinc-300 font-medium mb-1">Drop your photo here</div>
                    <div className="text-zinc-500 text-sm">or click to browse</div>
                    <div className="text-zinc-600 text-xs mt-2">JPEG, PNG, WebP · Max 10MB</div>
                  </div>
                )}
              </div>

              {/* Resolution warning */}
              {resolutionOk === false && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 text-sm mb-3">
                  <span className="mt-0.5">⚠</span>
                  <span>
                    This photo may be too small for crisp detail. We recommend at least 1000px on the
                    shortest side. Your photo will still print, but fine detail may be soft.
                  </span>
                </div>
              )}
              {resolutionOk === true && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300 text-sm mb-3">
                  <span>✓</span>
                  <span>Great resolution! This photo will print with excellent detail.</span>
                </div>
              )}
            </>
          ) : (
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Paste your Google Drive or Dropbox link
              </label>
              <input
                type="url"
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                maxLength={500}
                placeholder="https://drive.google.com/file/d/..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600
                  focus:outline-none focus:border-amber-400/50 text-sm transition-colors"
              />
              <p className="text-zinc-600 text-xs mt-2">
                Make sure the link is set to "Anyone with the link can view". We'll download it to process your order.
              </p>
            </div>
          )}
        </div>

        {/* Lithophane preview */}
        {previewUrl && (
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900">
            <h2 className="font-semibold text-zinc-100 mb-1">Lamp Preview</h2>
            <p className="text-zinc-500 text-xs mb-4">
              Approximate look when backlit — grayscale + inverted. The real thing looks even better.
            </p>
            <div className="relative rounded-xl overflow-hidden bg-zinc-950 flex items-center justify-center">
              {/* Simulated backlight glow behind the preview */}
              <div className="absolute inset-0 opacity-40"
                style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,200,100,0.3) 0%, transparent 70%)' }}
              />
              <img
                src={previewUrl}
                alt="Lithophane preview"
                className="relative z-10 max-h-72 w-auto object-contain"
              />
            </div>
            <p className="text-zinc-600 text-xs mt-3">
              ℹ This is a rough approximation. Actual lithophanes have greater depth and contrast when backlit.
            </p>
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-full font-bold text-lg
            transition-all hover:shadow-[0_0_30px_rgba(251,191,36,0.25)] active:scale-[0.98]
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Processing…
            </span>
          ) : (
            `Continue to Payment — $${subtotal}.00`
          )}
        </button>

        <p className="text-center text-zinc-600 text-xs">
          Secure checkout via Stripe. You'll be redirected to enter your card details.
        </p>
      </div>
    </form>
  )
}
