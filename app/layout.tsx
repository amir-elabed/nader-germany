'use client'

import { Inter } from 'next/font/google'
import { CssBaseline, ThemeProvider, Paper } from '@mui/material'
import theme from '@/styles/theme'
import { usePathname } from 'next/navigation'
import { Provider } from 'react-redux'
import { store } from '../services/store'
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

const inter = Inter({ subsets: ['latin'] })

i18n
  .use(initReactI18next) // Utilisez le package React
  .init({
    resources: {
      en: { translation: require('../locale/en.json') },
      fr: { translation: require('../locale/fr.json') },
      it: { translation: require('../locale/it.json') }
    },
    lng: 'fr', // Langue par défaut
    interpolation: {
      escapeValue: false
    }
  })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const paddingTopValue = pathname === '/connexion' ? '0' : '/MotDePasseOublie' ? '0' : '65px'

  return (
    <html>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link rel='shortcut icon' type='TYPE_MIME' href='/image/favicon.png' />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Nerko+One&family=Playwrite+CU:wght@100..400&display=swap'
          rel='stylesheet'
        ></link>
      </head>
      <body className={inter.className} style={{ paddingTop: paddingTopValue }}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Paper variant='elevation' elevation={0}>
            {children}
          </Paper>
        </ThemeProvider>
      </body>
    </html>
  )
}
