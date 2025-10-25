import QuickEntry from "./QuickEntry";
import UploadCard from "./UploadCard";

export default function InputSection() {
  return (
    <main>
      {/* Hero */}
      <section className="container pt-8 pb-4 text-center">
        <h1 className="h1">Two Friends, One Photo. <br />Scan to Win $500 USD!</h1>
        <p className="lead mt-2">Join ALLMYNE's Friends Take You Further campaign at Copacabana Beach! Snap a photo with a friend, register in seconds, and you could walk away with $500 USD. It's that simple. Ready to win?</p>
      </section>


      <QuickEntry />
      {/* Upload & contact card */}
      {/* <UploadCard /> */}
    </main>
  )
}
