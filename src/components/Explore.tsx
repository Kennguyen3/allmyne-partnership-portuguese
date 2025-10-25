export default function Explore() {
  return (
    <section className="w-full bg-slate-50/70 border-y border-slate-200 py-8 sm:py-10 md:py-12">
      <div className="container">
        <h2 className="h2 text-center">Explore the Possibilities</h2>
        <p className="lead text-center mt-2">
          Choose your current statuses to preview your benefits, then link accounts.
        </p>

        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6 mt-6">
          <div className="space-y-3">
            <select className="w-full border border-slate-300 rounded-lg px-3 py-2">
              <option>ALLMYNE STATUS</option>
              <option>Basic</option><option>Silver</option><option>Gold</option><option>Platinum</option>
            </select>
            <select className="w-full border border-slate-300 rounded-lg px-3 py-2">
              <option>MILES &amp; MORE STATUS</option>
              <option>None</option><option>Frequent Traveller</option><option>Senator</option><option>HON Circle</option>
            </select>
            <div className="flex items-center justify-between bg-white border border-slate-300 rounded-lg px-3 py-2">
              <span className="text-sm pr-3">Do you have the Lufthansa Miles &amp; More Credit Card issued by Deutsche Bank AG?</span>
              <label className="inline-flex items-center cursor-pointer shrink-0">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-10 h-6 bg-slate-300 rounded-full peer-checked:bg-slate-900 relative transition">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4"></div>
                </div>
              </label>
            </div>
          </div>

          <div className="border-2 border-dashed border-slate-300 rounded-xl min-h-[160px] flex items-center justify-center text-slate-500">
            REVEAL YOUR RESULTS
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <a className="btn btn-primary btn-full" href="#">Sign In</a>
        </div>
      </div>
    </section>
  )
}
