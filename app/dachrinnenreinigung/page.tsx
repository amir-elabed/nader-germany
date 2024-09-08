'use client'

import Layout from '@/components/layout/publicLayout'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import ProjetCard from '@/components/card/ProjetCard'
import Link from 'next/link'
import { useGetHomePageQuery } from '@/services/api/HomePageAPI'

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

export default function Dachrinnenreinigung() {
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
              Dachrinnenreinigung
            </Typography>
          </Container>
        </Box>
        <Box className='homedescription'>
          <Container maxWidth='lg' fixed>
            <Box
              display='flex'
              alignItems='center'
              flexDirection='column'
              maxWidth='768px'
              textAlign='center'
              sx={{ marginInline: 'auto' }}
            >
              <Typography className='homedescription__title' dangerouslySetInnerHTML={{ __html: hometitle }} />
              {/* <Typography
                className='homedescription__description'
                dangerouslySetInnerHTML={{ __html: homedescription }}
              /> */}
              <Typography
                component='div'
                dangerouslySetInnerHTML={{ __html: homedescription.replace(/\n/g, '<br/>') }}
                sx={{ whiteSpace: 'pre-wrap' }} // Ensures that the line breaks are respected
              />
            </Box>
          </Container>
        </Box>
        <Box className='projtes' sx={{ padding: '4rem 0' }}>
          <Container maxWidth='lg' fixed>
            <Grid container columnSpacing={3} rowSpacing={5.5}>
              {projects &&
                projects?.map((item: any) => (
                  <Grid item xs={12} sm={6} lg={4} key={item?._id}>
                    <ProjetCard imageUrl={item?.image} title={item.title} description={item.description} />
                  </Grid>
                ))}
            </Grid>
          </Container>
        </Box>
      </Layout>
    </Box>
  )
}
