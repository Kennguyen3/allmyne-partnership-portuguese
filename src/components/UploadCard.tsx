import React, { useMemo, useRef, useState } from 'react'
import OTPModal from './OTPModal'
import axios from "axios";

const API_UPLOAD = 'https://api.allmyne.com/event/upload'
export const API_URL = 'https://new-backend.allmyne.com'

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
function isValidPhone(value: string) {
  return /^\+?[1-9]\d{6,14}$/.test(value.replace(/\s+/g, ''))
}

export default function UploadCard() {
  const [contact, setContact] = useState('')
  const [verified, setVerified] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [popup, setPopup] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [otpOpen, setOtpOpen] = useState(false)
  const [progress, setProgress] = useState<number>(0)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isSendingOTP, setIsSendingOTP] = useState(false)

  const isContactValid = useMemo(() => {
    const v = contact.trim()
    return isValidEmail(v) || isValidPhone(v)
  }, [contact])

  const onChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    setFile(f)
    setPreview(f ? URL.createObjectURL(f) : null)
  }

  const uploadWithProgress = (form: FormData) => {
    return new Promise<Response>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', API_URL + '/api/partnership-event/upload-image')
      xhr.onload = () => {
        // Create a minimal Response-like object
        const ok = xhr.status >= 200 && xhr.status < 300
        const blob = new Blob([xhr.response || ''], { type: 'application/json' })
        const init = { status: xhr.status, statusText: xhr.statusText }
        const response = new Response(blob, init)
        if (ok) resolve(response)
        else reject(response)
      }
      xhr.onerror = () => reject(new Error('Network error'))
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const pct = Math.round((e.loaded / e.total) * 100)
          setProgress(pct)
        }
      }
      xhr.send(form)
    })
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!verified) return setError('Please verify your contact first')
    if (!file) return setError('Please choose a file to upload')

    try {
      setBusy(true)
      setProgress(0)
      const form = new FormData()
      form.append('email', contact.trim())
      form.append('image', file)

      const res = await uploadWithProgress(form)
      if (!res.ok) throw new Error('Server returned an error')
      setPopup('🎉 Thanks for your submission!')
    } catch (err: any) {
      setError(err?.message || 'Submission failed, please try again later.')
    } finally {
      setBusy(false)
      setProgress(0)
    }
  }

  const handleSendOtp = async () => {
    try {
      setIsSendingOTP(true);
      const res = await axios.post(API_URL + '/api/auth/send-code', {
        email: contact,
      });
      if (res.data) {
        setOtpOpen(true);
      } else {
        alert("Send OTP failed. Please try again.");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      alert("An error occurred while sending OTP.");
    } finally {
      setIsSendingOTP(false);
    }
  };

  return (
    <section className="container pb-10">
      <form onSubmit={onSubmit} className="card p-5 sm:p-6 space-y-5">
        {/* <div className="text-center">
          <h2 className="text-lg font-semibold">Quick Entry</h2>
          <p className="lead">Điền liên hệ → Verify → Tải ảnh → Gửi</p>
        </div> */}

        <div className="space-y-2">
          <label className="block text-sm font-medium">Email or Phone</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={contact}
              onChange={(e) => { setContact(e.target.value); setVerified(false); }}
              placeholder="Enter your email or WhatsApp number"
              className="input flex-1"
              inputMode="email"
            />
            <button
              type="button"
              disabled={!isContactValid || isSendingOTP}
              onClick={handleSendOtp}
              className={`btn btn-outline flex items-center justify-center gap-2 ${!isContactValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
              title={isContactValid ? "Send and enter OTP" : "Enter a valid contact first"}
            >
              {isSendingOTP ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                "Verify"
              )}
            </button>
          </div>
          {!isContactValid && contact && (
            <div className="text-xs text-red-600">Invalid format. E.g., you@example.com or +8490xxxxxxx</div>
          )}
          {verified && <div className="text-xs text-green-600">✔ Contact verified</div>}
        </div>

        <div className={`space-y-2 ${verified ? '' : 'opacity-50 pointer-events-none'}`}>
          <label className="block text-sm font-medium">Upload Your Selfie</label>
          <div className="flex items-center gap-3">
            <label className="btn btn-outline cursor-pointer">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onChooseFile}
                disabled={!verified}
              />
              Choose File
            </label>
            {file && <span className="text-sm text-slate-600 truncate">{file.name}</span>}
          </div>
          {preview && (
            <img src={preview} alt="preview" className="mt-2 w-full h-56 object-cover rounded-xl" />
          )}
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        {/* Progress bar */}
        {progress > 0 && (
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 rounded-full bg-brand transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="btn btn-primary w-full"
        >
          {busy ? 'Uploading...' : 'Submit'}
        </button>
      </form>

      {popup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-auto text-center">
            <p className="text-lg">{popup}</p>
            <button
              className="btn btn-primary mt-4 w-full"
              onClick={() => setPopup(null)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      <OTPModal
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerified={() => setVerified(true)}
        contact={contact.trim()}
      />
    </section>
  )
}
