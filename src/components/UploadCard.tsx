import React, { useMemo, useRef, useState } from 'react'
import OTPModal from './OTPModal'
import axios from "axios";

export const API_URL = 'https://new-backend.allmyne.com'

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function UploadCard() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
    return isValidEmail(contact.trim());
  }, [contact]);

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
      xhr.onerror = () => reject(new Error('Erro de rede. Tente novamente.'))
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

    if (!verified) return setError('Verifique seu e-mail antes de enviar.')
    if (!file) return setError('Escolha uma selfie para enviar.')

    try {
      setBusy(true)
      setProgress(0)
      const form = new FormData()
      form.append('contact', contact.trim())
      form.append('image', file)
      form.append('first_name', firstName)
      form.append('last_name', lastName)

      const res = await uploadWithProgress(form)
      if (!res.ok) throw new Error('Nao foi possivel enviar sua selfie. Tente novamente.')
      setPopup('Verifique seu e-mail para baixar o app.')
    } catch (err: any) {
      setError(err?.message || 'Nao foi possivel enviar. Tente novamente mais tarde.')
    } finally {
      setBusy(false)
      setProgress(0)
    }
  }

  const handleSendOtp = async () => {
    try {
      setIsSendingOTP(true);
      const res = await axios.post(API_URL + '/api/auth/send-code', {
        contact: contact,
      });
      if (res.data) {
        setOtpOpen(true);
      } else {
        alert("Nao foi possivel enviar o codigo. Tente novamente.");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      alert("Ocorreu um erro ao enviar o codigo.");
    } finally {
      setIsSendingOTP(false);
    }
  };

  return (
    <section className="w-full">
      <form onSubmit={onSubmit} className="card space-y-5 p-4 sm:p-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900">E-mail</label>
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <input
                type="email"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  setVerified(false);
                }}
                placeholder="Digite seu e-mail"
                className="min-w-0 grow rounded-lg border border-slate-300 px-3 py-3 text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                inputMode="email"
                autoComplete="email"
              />
              <button
                type="button"
                disabled={!isContactValid || isSendingOTP}
                onClick={handleSendOtp}
                className={`inline-flex shrink-0 items-center justify-center rounded-lg border px-4 py-3 text-sm font-semibold transition sm:min-w-28
                  ${!isContactValid || isSendingOTP ? "cursor-not-allowed opacity-50" :
                    "border-brand text-brand hover:bg-brand-light"}`}
              >
                {isSendingOTP ? "Enviando..." : "Verificar"}
              </button>
            </div>
            {!isContactValid && contact && (
              <div className="text-xs text-red-600">
                Formato invalido. Exemplo: voce@email.com
              </div>
            )}
            {verified && (
              <div className="text-xs text-green-600">
                E-mail verificado.
              </div>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-900">Nome</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Nome"
                className="w-full min-w-0 rounded-lg border border-slate-300 px-3 py-3 text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                autoComplete="given-name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-900">Sobrenome</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Sobrenome"
                className="w-full min-w-0 rounded-lg border border-slate-300 px-3 py-3 text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                autoComplete="family-name"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-900">Envie Sua Selfie</label>
          <div className={`rounded-lg border border-dashed p-4 transition ${verified ? 'border-brand/40 bg-brand-light/40' : 'border-slate-300 bg-slate-50'}`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label
                aria-disabled={!verified}
                className={`inline-flex cursor-pointer items-center justify-center rounded-lg border px-4 py-3 text-sm font-semibold transition whitespace-nowrap
                  ${verified ? 'border-brand bg-white text-brand hover:bg-brand-light' : 'pointer-events-none border-slate-300 bg-white text-slate-400'}`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onChooseFile}
                  disabled={!verified}
                />
                Escolher Arquivo
              </label>
              <span className="truncate text-sm text-slate-600">
                {file ? file.name : 'Nenhum arquivo escolhido'}
              </span>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-600">
              {verified
                ? 'Sua selfie sera usada no fluxo de geracao do seu perfil ALLMYNE.'
                : 'Verifique seu e-mail para liberar o upload da selfie.'}
            </p>
            {preview && (
              <img
                src={preview}
                alt="Previa da selfie enviada"
                className="mt-3 h-56 w-full rounded-lg object-cover"
              />
            )}
          </div>
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
          className="btn btn-primary w-full py-3 text-base disabled:cursor-not-allowed disabled:opacity-70"
        >
          {busy ? 'Enviando...' : 'Enviar'}
        </button>
      </form>

      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 text-center shadow-xl">
            <p className="mb-4 text-xl font-semibold text-slate-950">{popup}</p>

            <button
              className="btn btn-primary mt-2 w-full py-3 text-base"
              onClick={() => setPopup(null)}
            >
              Fechar
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
