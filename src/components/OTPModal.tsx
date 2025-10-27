import React, { useEffect, useRef, useState } from 'react'
import { API_URL } from './UploadCard'
import axios from "axios";

type Props = {
  open: boolean
  onClose: () => void
  onVerified: () => void
  contact: string
}

export default function OTPModal({ open, onClose, onVerified, contact }: Props) {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', ''])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if (open) {
      setDigits(['', '', '', '', '', ''])
      setError(null)
      setBusy(false)
      setTimeout(() => inputsRef.current[0]?.focus(), 20)
    }
  }, [open])

  const onChange = (idx: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return
    const next = [...digits]
    next[idx] = val
    setDigits(next)
    if (val && idx < 5) inputsRef.current[idx + 1]?.focus()
  }

  const onKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus()
    }
  }

  const submitOTP = async () => {
    console.log('Submitting OTP:', digits)
    console.log('Contact:', contact)
    const otp = digits.join('')
    if (otp.length !== 6) { setError('Nhập đủ 6 số OTP'); return }
    try {
      setBusy(true); setError(null)
      const res = await axios.post(API_URL + '/api/auth/verify-code', {
        email: contact,
        code: otp,
      });
      console.log("Verify OTP response:", res.data);
      if (!res.data) throw new Error('Mã OTP không đúng')
      onClose()
      onVerified()
    } catch (err: any) {
      console.error("Verify OTP error:", err);
      const serverMessage = err.response?.data?.message || err.message || "Unknown error occurred.";
      setError(serverMessage);
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm mx-auto w-[92%]">
        <h3 className="text-lg font-semibold text-center">Enter OTP code</h3>
        <p className="text-sm text-slate-600 text-center mt-1">We have sent a 6-digit code to <strong>{contact}</strong></p>

        <div className="flex justify-center gap-2 mt-4">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={el => inputsRef.current[i] = el}
              value={d}
              onChange={(e) => onChange(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              className="w-10 h-12 text-center text-xl border border-slate-300 rounded-lg"
            />
          ))}
        </div>

        {error && <div className="text-sm text-red-600 text-center mt-3">{error}</div>}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button onClick={onClose} className="btn btn-outline">Close</button>
          <button
            onClick={submitOTP}
            disabled={busy}
            className={`btn btn-primary flex items-center justify-center gap-2 ${busy ? "opacity-75 cursor-not-allowed" : ""
              }`}
          >
            {busy ? (
              <>
                {/* Spinner (TailwindCSS) */}
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
              </>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
