'use client'

import Layout from '@/components/layout/publicLayout'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import ProjetCard from '@/components/card/ProjetCard'
import Link from 'next/link'
import { useGetHomePageQuery } from '@/services/api/HomePageAPI'
import Image from 'next/image'

const hometitle = 'Dachrinnenreinigung'
const homedescription = `Eine regelmäßige Dachrinnenreinigung verhindert Fallrohrverstopfungen und die daraus entstehenden Folgeschäden an der Dachkonstruktion und Hausfassade durch überlaufendes Regenwasser.

Wir übernehmen auch komplizierte Aufträge in großer Höhe, dort wo Gerüste oder Hebebühnen nicht einsetzbar sind. Wir können mit unserer Sicherungstechnik durch Seilgeschirr und Spezialleitern in jeden Winkel vordringen. Mit Hebebühnen, Steiger bzw. Hubwagen erledigen wir auch Aufträge bei denen das Betreten des Daches nicht gewünscht oder möglich ist. Wir kontrollieren auf Wunsch bei der Dachrinnenreinigung auch die Fallrohre auf Verstopfungen, die Regenrinnen auf Leckagen und das Dach auf Schäden.

Zeitnahe Bearbeitung Ihrer Aufträge, Sauberkeit und ein sorgsamer Umgang mit Ihrer Immobilie ist für uns selbstverständlich.

Nach dem reinigung es werden fotos gemacht und geschikt von der saubere dachrime damit konnen sie auch sehen unsere saubere arbeit.

Wussten Sie schon? Zusätzlich bieten wir Ihnen einen Wartungsvertrag an, bei dem wir Ihre Regenrinnen, an den von Ihnen vorgegebenen Intervallen reinigen. Bei Abschluss eines Wartungsvertrages über eine Dachrinnenreinigung oder Dachreinigung gewähren wir 10% Rabatt auf den lfd. Meterpreis. 

Kontaktieren Sie uns gerne .

Möchten Sie eine angebot erhalten oder  haben Sie Fragen ?  schreiben Sie uns gerne eine Nachricht über unsere Kontaktformular.`

const projects = [
  {
    image: '/image/dachrinnenreinigung1.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/dachrinnenreinigung2.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/dachrinnenreinigung3.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/dachrinnenreinigung4.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/dachrinnenreinigung5.jpg',
    title: '',
    description: ''
  }
]

const description1 = `
Dachrinninreinigung pro lfm 2,99€ bis 3,99.€.
reinigung von laubschutzgitter pro lfm 1,99 .€
Seilklettertechnik 75,00€ bis 150,00€.`

const description2 = `
Fallrohrreinigung pro stück 5,99€.
verstopft abflussrohr 25,00€ bis 39,00€.
verstopft abflussrohr 25,00€ bis 50,00€.
Verstpoft Grundleitungsreinigung  50,00€ bis 100,00€.`

const description3 = `
Verstpoft Grundleitungsreinigung  50,00€ bis 100,00€.`

const description4 = `
Abdichtung von Dachrinnen  15,00€ bis  35,00€.`

const description5 = `
Dach Reinigung : 10,00 € pro m² bis 20,00 EUR pro m².
Seilklettertechnik 75,00€ bis 150,00€.`

const description6 = `
Reinigung pro Solar-module  5,00€.`

const description7 = `
reinigung von Terrassendach  [ nach anfrage ].`

export default function Preis() {
  return (
    <Box sx={{ paddingTop: { lg: '4.375rem', xs: '2.3rem' } }}>
      <Layout>
        <Box
          className='couverture'
          sx={{
            backgroundImage: 'url(/image/Dachrinnenreinigung_neu.webp)',
            width: '100%',
            borderBottom: '1px solid #E5E5E5',
            boxShadow: 'inset 0px 11px 8px -10px #cccccc78',
            backgroundPosition: 'top right'
            // marginTop: '80px'
          }}
        >
          <Container>
            <Typography
              component='h1'
              className='banner__title'
              sx={{
                color: '#031326',
                fontSize: '35px',
                fontFamily: 'Poppins',
                fontWeight: 'bold',
                padding: '4rem 0'
              }}
            >
              Preis
            </Typography>
          </Container>
        </Box>

        <Box className='homedescription'>
          <Container maxWidth='lg' fixed>
            <Box className='price'>
              <Box className='price__sectionLeft'>
                <Image src='/image/price1.png' width={220} height={200} alt='price' />
              </Box>
              <Box className='price__section'>
                <Typography
                  component='div'
                  dangerouslySetInnerHTML={{ __html: description1.replace(/\n/g, '<br/>') }}
                  sx={{ whiteSpace: 'pre-wrap' }}
                />
              </Box>
            </Box>
            <Box className='price'>
              <Box className='price__sectionLeft'>
                <Image src='/image/price2.png' width={220} height={200} alt='price' />
              </Box>
              <Box className='price__section'>
                <Typography
                  component='div'
                  dangerouslySetInnerHTML={{ __html: description2.replace(/\n/g, '<br/>') }}
                  sx={{ whiteSpace: 'pre-wrap' }}
                />
              </Box>
            </Box>
            {/* <Box className='price'>
              <Box className='price__sectionLeft'>
                <Image src='/image/price3.png' width={220} height={200} alt='price' />
              </Box>
              <Box className='price__section'>
                <Typography
                  component='div'
                  dangerouslySetInnerHTML={{ __html: description3.replace(/\n/g, '<br/>') }}
                  sx={{ whiteSpace: 'pre-wrap' }}
                />
              </Box>
            </Box> */}
            <Box className='price'>
              <Box className='price__sectionLeft'>
                <Image src='/image/price3.png' width={220} height={200} alt='price' />
              </Box>
              <Box className='price__section'>
                <Typography
                  component='div'
                  dangerouslySetInnerHTML={{ __html: description4.replace(/\n/g, '<br/>') }}
                  sx={{ whiteSpace: 'pre-wrap' }}
                />
              </Box>
            </Box>
            <Box className='price'>
              <Box className='price__sectionLeft'>
                <Image src='/image/price4.png' width={220} height={200} alt='price' />
              </Box>
              <Box className='price__section'>
                <Typography
                  component='div'
                  dangerouslySetInnerHTML={{ __html: description5.replace(/\n/g, '<br/>') }}
                  sx={{ whiteSpace: 'pre-wrap' }}
                />
              </Box>
            </Box>
            <Box className='price'>
              <Box className='price__sectionLeft'>
                <Image src='/image/price5.png' width={220} height={200} alt='price' />
              </Box>
              <Box className='price__section'>
                <Typography
                  component='div'
                  dangerouslySetInnerHTML={{ __html: description6.replace(/\n/g, '<br/>') }}
                  sx={{ whiteSpace: 'pre-wrap' }}
                />
              </Box>
            </Box>
            <Box className='price'>
              <Box className='price__sectionLeft'>
                <Image src='/image/price6.png' width={220} height={200} alt='price' />
              </Box>
              <Box className='price__section'>
                <Typography
                  component='div'
                  dangerouslySetInnerHTML={{ __html: description7.replace(/\n/g, '<br/>') }}
                  sx={{ whiteSpace: 'pre-wrap' }}
                />
              </Box>
            </Box>
            <Box className='price'>
              <Typography
                sx={{
                  color: 'red', // Set the text color to red
                  textDecoration: 'underline', // Underline the text
                  fontWeight: 'bold', // Make the text bold
                  fontSize: '1.5rem',
                  marginTop: '5rem'
                }}
              >
                Mindestauftragswert : 99,00 €.
              </Typography>
            </Box>
            <Box className='price' sx={{ marginTop: '5rem' }}>
              <Box className='price__section'>
                <Typography
                  sx={{
                    fontWeight: 'bold' // Make the text bold
                  }}
                >
                  Gemäß § 19 Abs. 1 Umsatzsteuergesetz wird keine Umsatzsteuer erhoben .
                </Typography>
              </Box>
              <Box className='price__section'>
                <Typography
                  sx={{
                    fontWeight: 'bold' // Make the text bold
                  }}
                >
                  Finanzamt Bochum Mitte, St.-Nr.: 306/5000/7071
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      </Layout>
    </Box>
  )
}
