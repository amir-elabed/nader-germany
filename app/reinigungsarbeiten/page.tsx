'use client'

import Layout from '@/components/layout/publicLayout'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import ProjetCard from '@/components/card/ProjetCard'
import Link from 'next/link'
import { useGetHomePageQuery } from '@/services/api/HomePageAPI'

const hometitleDach = 'Dach reinigung'
const homedescriptionDach =
  'Vom Eigenheim bis hin zum Großprojekt sind wir Ihr professioneller Ansprechpartner rund um das Thema Regenrinnenreinigung. Egal ob es sich um eine einmalige Maßnahme, oder auch um regelmäßige Reinigungsintervalle handelt – wir unterstützen Sie fachmännisch bei der Reinigung Ihrer Dachrinnen.'

const hometitlePhoto = 'Photovoltaik reinigung'
const homedescriptionPhoto =
  'Vom Eigenheim bis hin zum Großprojekt sind wir Ihr professioneller Ansprechpartner rund um das Thema Regenrinnenreinigung. Egal ob es sich um eine einmalige Maßnahme, oder auch um regelmäßige Reinigungsintervalle handelt – wir unterstützen Sie fachmännisch bei der Reinigung Ihrer Dachrinnen.'

const hometitleTerra = 'Terrassendach reinigung'
const homedescriptionTerra =
  'Vom Eigenheim bis hin zum Großprojekt sind wir Ihr professioneller Ansprechpartner rund um das Thema Regenrinnenreinigung. Egal ob es sich um eine einmalige Maßnahme, oder auch um regelmäßige Reinigungsintervalle handelt – wir unterstützen Sie fachmännisch bei der Reinigung Ihrer Dachrinnen.'

const hometitleVelux = 'Velux-dachfenster reinigung'
const homedescriptionVelux =
  'Vom Eigenheim bis hin zum Großprojekt sind wir Ihr professioneller Ansprechpartner rund um das Thema Regenrinnenreinigung. Egal ob es sich um eine einmalige Maßnahme, oder auch um regelmäßige Reinigungsintervalle handelt – wir unterstützen Sie fachmännisch bei der Reinigung Ihrer Dachrinnen.'

const projects = [
  {
    image: '/image/dach-reinigung1.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/dach-reinigung2.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/dach-reinigung3.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/dach-reinigung4.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/dach-reinigung5.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/photovoltaik-reinigung1.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/photovoltaik-reinigung2.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/terrassendach-reinigung1.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/terrassendach-reinigung2.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/terrassendach-reinigung3.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/banner.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/nettoyage-de-velux.jpg',
    title: '',
    description: ''
  }
]

export default function Reinigungsarbeiten() {
  return (
    <Box sx={{ paddingTop: { lg: '4.375rem', xs: '2.3rem' } }}>
      <Layout>
        <Box
          className='couverture'
          sx={{
            backgroundImage: 'url(/image/dsfesfesfesf.jpg)',
            width: '100%',
            borderBottom: '1px solid #E5E5E5',
            boxShadow: 'inset 0px 11px 8px -10px #cccccc78',
            backgroundPosition: '0% 80%'
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
              Reinigungsarbeiten
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
              <Typography className='homedescription__title' dangerouslySetInnerHTML={{ __html: hometitleDach }} />
              <Typography
                className='homedescription__description'
                dangerouslySetInnerHTML={{ __html: homedescriptionDach }}
              />
            </Box>
            <Box
              display='flex'
              alignItems='center'
              flexDirection='column'
              maxWidth='768px'
              textAlign='center'
              sx={{ marginInline: 'auto' }}
            >
              <Typography className='homedescription__title' dangerouslySetInnerHTML={{ __html: hometitlePhoto }} />
              <Typography
                className='homedescription__description'
                dangerouslySetInnerHTML={{ __html: homedescriptionPhoto }}
              />
            </Box>
            <Box
              display='flex'
              alignItems='center'
              flexDirection='column'
              maxWidth='768px'
              textAlign='center'
              sx={{ marginInline: 'auto' }}
            >
              <Typography className='homedescription__title' dangerouslySetInnerHTML={{ __html: hometitleTerra }} />
              <Typography
                className='homedescription__description'
                dangerouslySetInnerHTML={{ __html: homedescriptionTerra }}
              />
            </Box>
            <Box
              display='flex'
              alignItems='center'
              flexDirection='column'
              maxWidth='768px'
              textAlign='center'
              sx={{ marginInline: 'auto' }}
            >
              <Typography className='homedescription__title' dangerouslySetInnerHTML={{ __html: hometitleVelux }} />
              <Typography
                className='homedescription__description'
                dangerouslySetInnerHTML={{ __html: homedescriptionVelux }}
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
