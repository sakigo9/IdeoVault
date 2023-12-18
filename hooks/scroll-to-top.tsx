import { useEffect, useState } from 'react'

const useScrollTop = (limit = 10) => {
  const [scrollTop, setScrollTop] = useState<Boolean>(false)

  useEffect(() => {
    const handleScroll = () =>
      window.scrollY > limit ? setScrollTop(true) : setScrollTop(false)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [limit])
  return scrollTop
}

export default useScrollTop
