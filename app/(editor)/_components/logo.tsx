import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

const font = Inter({ subsets: ['latin'] })
const Logo = () => {
  return <div className='hidden md:flex items-center gap-x-2'>IdeoVault</div>
}

export default Logo
