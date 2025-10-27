import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import UploadCard from './UploadCard'
import selfieImage from '../assets/selfie-group.png'

export default function QuickEntry() {
    const [showUpload, setShowUpload] = useState(false)
    const uploadRef = useRef<HTMLDivElement | null>(null)

    // Khi showUpload = true → tự scroll mượt đến UploadCard
    useLayoutEffect(() => {
        console.log('showUpload changed:', showUpload)
        if (showUpload && uploadRef.current) {
            uploadRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [showUpload])

    const handleShowUpload = () => {
        setShowUpload(true)
        // luôn scroll xuống, dù showUpload đã true
        setTimeout(() => {
            uploadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 300)
    }

    return (
        <section className="container py-10">
            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Left column: steps */}
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                        Quick Entry Form — <span className="text-brand">Win $500 USD!</span>
                    </h2>

                    {/* Step 1 */}
                    <div className="mb-5">
                        <h3 className="font-semibold text-lg mb-1">
                            Step 1: <span className="text-slate-900">Your Contact Info</span>
                        </h3>
                        <p className="text-slate-600">
                            Enter your <strong>email</strong> or <strong>WhatsApp number</strong> so we can reach you when you win!
                        </p>
                    </div>
                    <hr className="border-slate-200 my-4" />

                    {/* Step 2 */}
                    <div className="mb-5">
                        <h3 className="font-semibold text-lg mb-1">
                            Step 2: <span className="text-slate-900">Upload Your Selfie</span>
                        </h3>
                        <p className="text-slate-600">
                            Snap a photo with your friend right now or upload from your camera roll. Make it fun and memorable!
                        </p>
                    </div>
                    <hr className="border-slate-200 my-4" />

                    {/* Step 3 */}
                    <div className="mb-5">
                        <h3 className="font-semibold text-lg mb-1">
                            Step 3: <span className="text-slate-900">Create Your Travel Journal</span>
                        </h3>
                        <p className="text-slate-600">
                            <strong>Journal creation is required for contest entry.</strong><br />
                            Complete your entry by creating a Travel Journal in the ALLMYNE app.
                        </p>
                    </div>
                    <hr className="border-slate-200 my-4" />

                    {/* Step 4 */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-1">
                            Step 4: <span className="text-slate-900">Submit & Enter</span>
                        </h3>
                        <p className="text-slate-600">
                            Hit the big button below to complete your entry. You&apos;ll get your Explorer Badge instantly!
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={() => {
                            console.log(' set show upload true ')
                            handleShowUpload()
                        }}
                        className="bg-[#1e2761] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#11194a] transition w-full sm:w-auto"
                    >
                        Submit Photo &amp; Enter to Win!
                    </button>
                </div>

                {/* Right column: image and privacy box */}
                <div className="space-y-6">
                    <div className="rounded-xl overflow-hidden shadow-md">
                        {/* <img
              src="https://cdn.allmyne.com/mockups/allmyne-phone-on-beach.png"
              alt="ALLMYNE app on phone at beach"
              className="w-full object-cover"
            /> */}
                        <img src={selfieImage} alt="ALLMYNE" className="w-full object-cover" />
                    </div>
                    <div className="bg-brand-light border border-brand/20 rounded-lg p-4 text-sm text-slate-700">
                        <p className="font-semibold mb-1 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-brand">
                                <path fillRule="evenodd" d="M12 2a10 10 0 00-10 10v3.25A2.75 2.75 0 004.75 18H7a5 5 0 0010 0h2.25A2.75 2.75 0 0022 15.25V12A10 10 0 0012 2zM9.75 9.75a.75.75 0 011.5 0V12a.75.75 0 01-1.5 0V9.75zm3.75 0a.75.75 0 011.5 0V12a.75.75 0 01-1.5 0V9.75z" clipRule="evenodd" />
                            </svg>
                            Privacy Promise
                        </p>
                        <p>
                            Your information is completely confidential and only used for this contest.
                            We respect your data and won&apos;t share it with third parties.
                        </p>
                    </div>
                </div>
            </div>

            {/* UploadCard appears after clicking submit */}
            {showUpload && (
                <div ref={uploadRef} className="mt-10 animate-fadeIn">
                    <UploadCard />
                </div>
            )}
        </section>
    )
}
