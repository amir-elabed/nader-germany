'use client'
import ProjetCard from '@/components/card/ProjetCard'
import Hero from '@/components/commun/Hero'
import Caroussel from '@/components/commun/caroussel'
import Layout from '@/components/layout/publicLayout'
import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import MyCard from '@/components/commun/homeCard'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import EngineeringIcon from '@mui/icons-material/Engineering'
import ConstructionIcon from '@mui/icons-material/Construction'
import CottageIcon from '@mui/icons-material/Cottage'
import FestivalIcon from '@mui/icons-material/Festival'
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService'
import Image from 'next/image'

const cardData = [
  { icon: HomeWorkIcon, title: 'DACHRINNENREINIGUNG' },
  { icon: EngineeringIcon, title: 'FALLROHRREINIGUNG' },
  { icon: ConstructionIcon, title: 'DACHRINNEN REPARATUR' },
  { icon: CottageIcon, title: 'DACH REINIGUNG' },
  { icon: FestivalIcon, title: 'PHOTOVOLTAIK REINIGUNG' },
  { icon: HomeRepairServiceIcon, title: 'TERRASSENDACH REINIGUNG' }
]

const lastNews = [
  {
    title: 'Dachrinnenreinigung',
    image: '/image/dachrinnenreinigung1.jpg',
    link: 'dachrinnenreinigung'
  },
  {
    title: 'Fallrohrreinigung',
    image: '/image/fallrohrreinigung1.jpg',
    link: 'fallrohrreinigung'
  },
  {
    title: 'Dachrinnen Reparatur',
    image: '/image/dachrinnen-reparatur1.jpg',
    link: 'dachrinnen-reparatur'
  },
  {
    title: 'Dach Reinigung',
    image: '/image/dach-reinigung1.jpg',
    link: 'reinigungsarbeiten'
  },
  {
    title: 'Photovoltaik Reinigung',
    image: '/image/photovoltaik-reinigung1.jpg',
    link: 'reinigungsarbeiten'
  },
  {
    title: 'Terrassendach Reinigung',
    image: '/image/terrassendach-reinigung1.jpg',
    link: 'reinigungsarbeiten'
  }
]

const hometitle = 'Über uns'
const homedescription = `
Zuverlässig und gründlich - ich erledige Ihre Dachrinnenreinigung   sowie kleinere Reparaturen für Sie. 

Ich bin ein motivierter Jungunternehmer der  seit 2018 im Bereich der Dachrinnenreinigung, kleineren Reparaturen rund ums Dach und der Säuberung von Dächern etc. tätig ist. Regelmäßige Dachrinnenreinigungen sind unverzichtbar,  um Ihr Haus vor Feuchtigkeitsschäden im Mauerwerk sowie Schimmel im Gebäude zu schützen. Ich helfe Ihnen gerne weiter und reinige Ihre Dachrinnen professionell und gründlich. Sollten Sie dazu Fragen haben, zögern Sie nicht und melden sich gerne per Mail oder Telefon. Ich erstelle Ihnen auch gerne ein Angebot und beantworte Ihre Rückfragen.`

export default function Home() {
  return (
    <Box sx={{ paddingTop: { lg: '4.375rem', xs: '2.3rem' } }}>
      <Layout>
        <Hero image={'/image/banner.jpg'} />
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

              <Image src='/image/logo3.jpg' width={300} height={300} alt={'logo'} />

              <Typography
                className='homedescription__description'
                dangerouslySetInnerHTML={{ __html: homedescription.replace(/\n/g, '<br/>') }}
              />

              <Typography
                sx={{
                  color: 'red', // Set the text color to red
                  textDecoration: 'underline', // Underline the text
                  fontWeight: 'bold', // Make the text bold
                  fontSize: '1rem',
                  marginTop: '2.5rem'
                }}
              >
                Einsatzgebiet im Umkreis von bis zu 40 km Rund um Bochum oder auf Anfrage.
              </Typography>
            </Box>
            <Grid container mt={4} columnSpacing={8} spacing={3}>
              {cardData.map((data, index) => (
                <>
                  <Grid item xs={12} md={4}>
                    <MyCard key={index} icon={data.icon} title={data.title} />
                  </Grid>
                </>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box sx={{ paddingBlock: '3rem' }}>
          <Container fixed maxWidth='xl' className='actualites'>
            <Box textAlign='center' alignItems='center'>
              <Typography component='h2' className='presentation__title'>
                Unsere Leistungen
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <Caroussel type='home2' data={lastNews} desktopItems={4} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    </Box>
  )
}
