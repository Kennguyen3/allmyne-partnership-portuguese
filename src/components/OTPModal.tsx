import React, { useEffect, useRef, useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  onVerified: () => void
  contact: string
}

const API_VERIFY = 'https://api.allmyne.com/event/verify-otp'

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
    const otp = digits.join('')

    //
    onClose()
    onVerified()
    //
    if (otp.length !== 6) { setError('Nhập đủ 6 số OTP'); return }
    try {
      setBusy(true); setError(null)
      const res = await fetch(API_VERIFY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, otp })
      })
      if (!res.ok) throw new Error('Mã OTP không đúng')
      onClose()
      onVerified()
    } catch (err: any) {
      setError(err?.message || 'Xác thực thất bại')
    } finally {
      setBusy(false)
    }
  }

  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm mx-auto w-[92%]">
        <h3 className="text-lg font-semibold text-center">Nhập mã OTP</h3>
        <p className="text-sm text-slate-600 text-center mt-1">Chúng tôi đã gửi mã 6 số tới <strong>{contact}</strong></p>

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
          <button onClick={onClose} className="btn btn-outline">Đóng</button>
          <button onClick={submitOTP} disabled={busy} className="btn btn-primary">
            {busy ? 'Đang xác thực…' : 'Xác nhận'}
          </button>
        </div>
      </div>
    </div>
  )
}
