'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const PRODUCT = { slug: 'standard', label: '6.5×6.5"', price: 39.99 }

const RUSH_FEE = 15
const SHIPPING  = 9

export default function OrderForm() {
  const searchParams = useSearchParams()
  // Kept for compatibility with old links; we only have one size now.
  void searchParams

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

  const subtotal = PRODUCT.price + (rush ? RUSH_FEE : 0) + SHIPPING

  // Show the uploaded photo as a full-color preview, and check its resolution
  // to warn if it's too low to print crisp detail.
  const generatePreview = useCallback((file: File) => {
    const objectUrl = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      const minDim = Math.min(img.naturalWidth, img.naturalHeight)
      setResolutionOk(minDim >= 1000)
      setPreviewUrl(objectUrl)
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
          size: PRODUCT.slug,
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

        {/* Product */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900">
          <h2 className="font-semibold text-zinc-100 mb-4">1. Your 3D Photo Lamp</h2>
          <div className="flex items-center justify-between p-4 rounded-xl border border-amber-400/60 bg-amber-400/5">
            <div>
              <div className="font-medium text-zinc-100">{PRODUCT.label} Lithophane</div>
              <div className="text-zinc-500 text-xs mt-0.5">Our standard square size</div>
            </div>
            <span className="text-amber-400 font-bold">${PRODUCT.price.toFixed(2)}</span>
          </div>
          <p className="text-zinc-500 text-xs mt-3">
            Need a different size, color, or custom background? <a href="/#custom" className="text-amber-400 hover:underline">Request a custom quote.</a>
          </p>
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
          <p className="text-zinc-500 text-sm mb-4">Any special instructions, like cropping preferences or which person to focus on.</p>
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
              <span className="text-zinc-400">{PRODUCT.label} 3D Photo Lamp</span>
              <span className="text-zinc-200">${PRODUCT.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Rush processing</span>
              <span className={rush ? 'text-zinc-200' : 'text-zinc-600'}>{rush ? '+$15.00' : 'none'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Shipping</span>
              <span className="text-zinc-200">$9.00</span>
            </div>
            <div className="border-t border-zinc-700 pt-2 mt-2 flex justify-between text-base font-semibold">
              <span className="text-zinc-200">Total</span>
              <span className="text-amber-400">${subtotal.toFixed(2)}</span>
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

        {/* Photo preview */}
        {previewUrl && (
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900">
            <h2 className="font-semibold text-zinc-100 mb-1">Your Photo</h2>
            <p className="text-zinc-500 text-xs mb-4">
              This is the photo we'll use for your lamp.
            </p>
            <div className="relative rounded-xl overflow-hidden bg-zinc-950 flex items-center justify-center">
              <img
                src={previewUrl}
                alt="Uploaded photo preview"
                className="relative z-10 max-h-72 w-auto object-contain"
              />
            </div>
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
            `Continue to Payment · $${subtotal.toFixed(2)}`
          )}
        </button>

        <p className="text-center text-zinc-600 text-xs">
          Secure checkout via Stripe. You'll be redirected to enter your card details.
        </p>
      </div>
    </form>
  )
}
