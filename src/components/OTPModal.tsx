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
    if (otp.length !== 6) { setError('Digite o codigo de 6 digitos.'); return }
    try {
      setBusy(true); setError(null)
      const res = await axios.post(API_URL + '/api/auth/verify-code', {
        contact: contact,
        code: otp,
      });
      console.log("Verify OTP response:", res.data);
      if (!res.data) throw new Error('Invalid OTP')
      onClose()
      onVerified()
    } catch (err: any) {
      console.error("Verify OTP error:", err);
      setError("Codigo invalido. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="mx-auto w-full max-w-sm rounded-lg bg-white p-6">
        <h3 className="text-center text-lg font-semibold text-slate-950">Digite o codigo OTP</h3>
        <p className="mt-1 text-center text-sm text-slate-600">Enviamos um codigo de 6 digitos para <strong>{contact}</strong>.</p>

        <div className="mt-4 flex justify-center gap-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={el => inputsRef.current[i] = el}
              value={d}
              onChange={(e) => onChange(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              aria-label={`Digito ${i + 1}`}
              className="h-12 w-10 rounded-lg border border-slate-300 text-center text-xl focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          ))}
        </div>

        {error && <div className="mt-3 text-center text-sm text-red-600">{error}</div>}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button onClick={onClose} className="btn btn-outline">Fechar</button>
          <button
            onClick={submitOTP}
            disabled={busy}
            className={`btn btn-primary flex items-center justify-center gap-2 ${busy ? "opacity-75 cursor-not-allowed" : ""
              }`}
          >
            {busy ? (
              <>
                {/* Tailwind spinner */}
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
              "Confirmar"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
