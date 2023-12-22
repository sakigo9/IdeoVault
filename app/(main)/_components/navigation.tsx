'use client'

import { cn } from '@/lib/utils'
import { ChevronsLeft, MenuIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { ElementRef, useRef, useState, useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'
const Nagivation = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const pathname = usePathname()
  const [isReset, setIsReset] = useState(false)
  const [isCollapse, setIsCollapse] = useState(isMobile)
  const isResizingRef = useRef(false)
  const sidebarRef = useRef<ElementRef<'aside'>>(null)
  const navbarRef = useRef<ElementRef<'div'>>(null)

  useEffect(() => {
    if (isMobile) {
      collapse()
    } else {
      resetExpandSidebarWidth()
    }
  }, [isMobile])

  useEffect(() => {
    if (isMobile) {
      collapse()
    }
  }, [pathname, isMobile])

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return
    let newWidth = e.clientX
    if (newWidth < 240) newWidth = 240
    if (newWidth > 480) newWidth = 480
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty('left', `${newWidth}px`)
      navbarRef.current.style.setProperty('width', `calc(100%-${newWidth}px)`)
    }
  }
  const handleMouseUp = (e: MouseEvent) => {
    isResizingRef.current = false
    document.removeEventListener('mousedown', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const handleSidebarDragMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault()
    e.stopPropagation()
    isResizingRef.current = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const resetExpandSidebarWidth = () => {
    if (navbarRef.current && sidebarRef.current) {
      setIsCollapse(false)
      setIsReset(true)

      navbarRef.current.style.setProperty(
        'width',
        isMobile ? '0' : 'calc(100%-240px)',
      )
      sidebarRef.current.style.width = isMobile ? '100%' : '240px'
      navbarRef.current.style.setProperty('left', isMobile ? '0' : '240px')
      setTimeout(() => setIsReset(false), 300)
    }
  }

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapse(true)
      setIsReset(true)

      sidebarRef.current.style.width = '0'
      navbarRef.current.style.setProperty('width', '100%')
      navbarRef.current.style.setProperty('left', '0')
      setTimeout(() => setIsReset(false), 300)
    }
  }

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar bg-secondary h-full flex-col w-60 overflow-y-auto relative z-[99999]',
          isReset && 'transition-all ease-in-out duration-300 ',
          isMobile && 'w-0',
        )}
      >
        <div
          role='button'
          onClick={collapse}
          className={cn(
            'h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition ',
            isMobile && 'opacity-100',
          )}
        >
          <ChevronsLeft className='h-6 w-6' />
        </div>
        <div>
          <p>Home</p>
        </div>
        <div>
          <p>Blog</p>
        </div>
        <div>
          <p>Action</p>
        </div>
        <div
          onMouseDown={handleSidebarDragMouseDown}
          onClick={resetExpandSidebarWidth}
          className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0'
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          'absolute left-60 w-[calc(100%-240px) top-0 z-[99999]]',
          isMobile && 'left-0 w-full',
          isReset && 'translate-all ease-in-out duration-300',
        )}
      >
        <nav className='bg-transparent px-3 py-2 w-full'>
          {isCollapse && (
            <MenuIcon
              onClick={resetExpandSidebarWidth}
              role='button'
              className='h-6 w-6 text-muted-foreground'
            />
          )}
        </nav>
      </div>
    </>
  )
}

export default Nagivation
