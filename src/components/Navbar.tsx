import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <div className="w-full border-b border-slate-200 sticky top-0 bg-white/90 backdrop-blur z-40">
      <div className="container py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/src/assets/logo.svg" alt="ALLMYNE" className="h-40 w-40 rounded" />
          <div className="flex flex-col leading-tight">
            {/* <span className="font-bold tracking-wide">ALLMYNE</span> */}
            {/* <span className="text-xs text-slate-500">Miles &amp; More Partnership</span> */}
          </div>
        </div>

        {/* Desktop menu */}
        {/* <nav className="hidden md:flex items-center gap-6 text-sm">
          <a className="hover:underline" href="#">Find &amp; Reserve</a>
          <a className="hover:underline" href="#">Deals &amp; Packages</a>
          <a className="hover:underline" href="#">Meetings &amp; Events</a>
          <a className="hover:underline" href="#">Our Brands</a>
          <a className="hover:underline" href="#">About</a>
        </nav>

        <div className="hidden md:flex items-center gap-4 text-sm">
          <a className="hover:underline" href="#">Help</a>
          <a className="hover:underline" href="#">My Trips</a>
          <a className="hover:underline" href="#">Sign In / Join</a>
        </div> */}

        {/* Hamburger */}
        <button aria-label="Open menu" onClick={() => setOpen(!open)} className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-slate-200">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h14M3 10h14M3 14h14"/></svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container py-3 grid gap-3 text-sm">
            <a className="py-2 border-b border-slate-100" href="#">Find &amp; Reserve</a>
            <a className="py-2 border-b border-slate-100" href="#">Deals &amp; Packages</a>
            <a className="py-2 border-b border-slate-100" href="#">Meetings &amp; Events</a>
            <a className="py-2 border-b border-slate-100" href="#">Our Brands</a>
            <a className="py-2 border-b border-slate-100" href="#">About</a>
            <div className="flex gap-4 pt-2">
              <a className="underline" href="#">Help</a>
              <a className="underline" href="#">My Trips</a>
              <a className="underline" href="#">Sign In / Join</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
