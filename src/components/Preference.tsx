import { IMAGES } from '../assets/images'

export default function Preference() {
  return (
    <section className="container py-8 sm:py-10 md:py-12">
      <div className="card p-5 sm:p-6 md:p-8">
        <h2 className="h2 text-center">Choose Your Earning Preference</h2>
        <p className="lead text-center mt-2">
          Earn ALLMYNE points or Miles &amp; More miles for stays at participating hotels.
        </p>

        {/* Mobile carousel */}
        <div className="mt-5 flex gap-3 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <img src={IMAGES.rooftop} alt="Rooftop" className="h-48 w-80 object-cover rounded-xl shrink-0 snap-center" />
          <img src={IMAGES.woman} alt="Guest" className="h-48 w-80 object-cover rounded-xl shrink-0 snap-center" />
          <img src={IMAGES.rooftop} alt="Rooftop 2" className="h-48 w-80 object-cover rounded-xl shrink-0 snap-center" />
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-4 mt-5">
          <img src={IMAGES.rooftop} alt="Rooftop" className="rounded-xl w-full h-56 object-cover" />
          <img src={IMAGES.woman} alt="Guest" className="rounded-xl w-full h-56 object-cover" />
          <img src={IMAGES.rooftop} alt="Rooftop 2" className="rounded-xl w-full h-56 object-cover" />
        </div>

        <div className="flex justify-center mt-6">
          <a href="#" className="inline-flex items-center text-brand font-semibold">
            <span className="mr-2">»</span> LEARN MORE
          </a>
        </div>
      </div>
    </section>
  )
}
