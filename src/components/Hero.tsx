import { IMAGES } from '../assets/images'
import logo from '../assets/logo.svg'

export default function Hero() {
  return (
    <section className="relative w-full">
      <img src={IMAGES.heroWing} alt="Airplane wing at sunset" className="w-full h-[260px] sm:h-[320px] md:h-[420px] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="container absolute inset-x-0 bottom-6">
        <div className="text-white max-w-xl">
          <img src={logo} className="h-10 w-10 mb-2 rounded" alt="ALLMYNE" />
          {/* <div className="text-xl sm:text-2xl font-semibold">ALLMYNE</div> */}
          {/* <div className="opacity-90 text-sm sm:text-base">Partner of Miles &amp; More</div> */}
        </div>
      </div>
    </section>
  )
}
