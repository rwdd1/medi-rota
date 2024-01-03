import { Inter } from 'next/font/google'
import { Red_Hat_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const redHat = Red_Hat_Display( {weight: "400", style: "normal", display: "swap", subsets: ["latin"]});

export const metadata = {
  title: 'MediRota',
  description: 'Simple rota for clinical staff',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={redHat.className}>
      {children}
      </body>
    </html>
  )
}
