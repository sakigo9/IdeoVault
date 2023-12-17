import { Button } from '@/components/ui/button'
import Logo from './logo'

const Footer = () => {
  return (
    <div className='z-50 flex items-center w-full p-6 bg-background min-[320px]:p-0'>
      <Logo />
      <div className='md:ml-auto w-full justify-between md:justify-end flex items-center text-muted-foreground'>
        <Button variant={'ghost'}>Pragmatic Dev</Button>
        <Button variant={'ghost'}>Made with ❤︎</Button>
      </div>
    </div>
  )
}

export default Footer
