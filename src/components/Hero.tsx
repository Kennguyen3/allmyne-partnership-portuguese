import logo from '../assets/logo.svg'
import selfieImage from '../assets/selfie-group.png'

export default function Hero() {
  return (
    <section className="relative w-full">
      <img
        src={selfieImage}
        alt="Selfie promocional do ALLMYNE no YVY Festival"
        className="h-56 w-full object-cover sm:h-72 md:h-[360px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      <div className="container absolute inset-x-0 bottom-5">
        <div className="max-w-xl text-white">
          <img src={logo} className="mb-2 h-10 w-10 rounded" alt="ALLMYNE" />
          <div className="text-sm font-semibold uppercase">ALLMYNE x YVY Festival</div>
        </div>
      </div>
    </section>
  )
}
