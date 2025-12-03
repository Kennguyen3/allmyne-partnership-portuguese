import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Explore from '../components/Explore'
import Preference from '../components/Preference'
import Footer from '../components/Footer'
import InputSection from '../components/InputSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* <Navbar /> */}
      <Hero />
      <InputSection />
      {/* <Explore /> */}
      {/* <Preference /> */}
      {/* <section className="container py-8 text-center">
        <p className="text-slate-500">Explore the benefits of airline partnerships and maximise your earning when you stay and when you fly.</p>
      </section>
      <Footer /> */}
    </div>
  )
}
