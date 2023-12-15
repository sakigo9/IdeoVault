import Footer from './_components/footer'
import Header from './_components/heading'
import Heros from './_components/heros'

export default function Editor() {
  return (
    <div className='min-h-full flex flex-col'>
      <div className='flex flex-col items-center justify-center md:justify-start text-center gap-y-2 flex-1 px-6 pt-2'>
        <Header />
        <Heros />
        <Footer />
      </div>
    </div>
  )
}
