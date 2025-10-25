export default function Footer() {
  const brands = [
    "EDITION", "The Ritz-Carlton", "St. Regis", "W Hotels", "JW Marriott",
    "Marriott", "Sheraton", "Westin", "Renaissance", "Autograph Collection",
    "Le Méridien", "AC Hotels", "Moxy", "Delta Hotels", "Aloft",
    "Courtyard", "Four Points", "SpringHill Suites", "Fairfield", "Residence Inn"
  ]
  return (
    <footer className="border-t border-slate-200 mt-6">
      <div className="container py-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2">
            <img src="/src/assets/logo.svg" className="h-8 w-8 rounded" alt="ALLMYNE" />
            <span className="font-bold tracking-wide">ALLMYNE</span>
          </div>

        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-slate-500">
          {brands.map((b, i) => (
            <div key={i} className="border border-slate-200 rounded-lg py-3 px-2 text-xs text-center">{b}</div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-slate-500 space-x-2">
          <a href="#" className="underline">Terms &amp; Conditions</a>
          <span>•</span>
          <a href="#" className="underline">FAQs</a>
          <span>•</span>
          <a href="#" className="underline">Unlink Accounts</a>
        </div>

        <div className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} ALLMYNE International, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
