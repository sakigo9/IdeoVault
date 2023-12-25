import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ConvexClientProvider } from '@/components/providers/convex.provider'
import { Toaster } from 'sonner'
import { GlobalContext } from '@/components/providers/global-context'
import { useReducer } from 'react'
import { GlobalState, initialState, reducer } from '@/state/reducer'
import { SearchProvider } from '@/hooks/use-search'

const inter = Poppins({ subsets: ['latin'], weight: ['400', '600'] })

export const metadata: Metadata = {
  title: 'IdeoVault',
  description:
    'All-in-one workspace platform that combines note-taking, document sharing, task management,etc.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        {/* <GlobalContext.Provider value={{ state, dispatch }}> */}
        <SearchProvider>
          <ConvexClientProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
              storageKey='ideo-vault-theme'
            >
              <Toaster position='bottom-right' />
              {children}
            </ThemeProvider>
          </ConvexClientProvider>
          {/* </GlobalContext.Provider> */}
        </SearchProvider>
      </body>
    </html>
  )
}
