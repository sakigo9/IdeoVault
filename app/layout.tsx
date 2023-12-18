import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'

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
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
          storageKey='ideo-vault-theme'
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
