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
const descriptionPhoto = `Photovoltaik Module bringen ihren besten Ertrag unter optimalen Bedingungen – das ist soweit bekannt. Da der Selbstreinigungseffekt in der Praxis nicht immer perfekt funktioniert, sollten Verschmutzungen regelmäßig durch eine Photovoltaik Reinigung entfernt werden.

Verschmutzungen auf den Photovoltaik Modulen wirken wie Verschattungen. Sie mindern den Ertrag der Photovoltaikanlage. Je nach Stärke der Verschmutzung kann diese Ertragsminderung zwischen 10 und 20 Prozent ausmachen.

Darüber hinaus führen Verschmutzungen an den Rändern der PV-Anlage zu einem erhöhten Reparatur- und Instandhaltungsbedarf.

Die regelmäßige Photovoltaik Reinigung trägt entscheidend dazu bei, den Ertrag der Photovoltaikanlage zu erhalten. Damit ist eine Solarreinigung regelmäßig wirtschaftlich sinnvoll und Wert steigernd.`

const hometitleTerra = 'Terrassendach reinigung'
const descriptionTerra = `Genießen Sie Ihren Wintergarten oder ihre Überdachung in Dithmarschen in vollen Zügen mit unserem professionellen Terrassenüberdachungsreinigungsservice!

Wir bringen Ihren Außenbereich wieder zum Strahlen, entfernen hartnäckigen Schmutz und sorgen für eine makellose Überdachung. Vertrauen Sie auf unsere Expertise und lassen Sie uns für klare Sicht und strahlenden Glanz sorgen, damit Sie Ihre Zeit im Freien uneingeschränkt genießen können. Kontaktieren Sie uns noch heute für ein sauberes und gepflegtes Erlebnis!`

const hometitleVelux = 'Velux-dachfenster reinigung'
const descriptionVelux = `Wir reinigen gerne Ihre Velux fenster von außen damit die Sonne kann wieder Ihnen scheinen.`

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
                fontSize: '30px',
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
            {/* <Box
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
            </Box> */}
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
                component='div'
                dangerouslySetInnerHTML={{ __html: descriptionPhoto.replace(/\n/g, '<br/>') }}
                sx={{ whiteSpace: 'pre-wrap', marginBottom: '5rem' }}
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
                component='div'
                dangerouslySetInnerHTML={{ __html: descriptionTerra.replace(/\n/g, '<br/>') }}
                sx={{ whiteSpace: 'pre-wrap', marginBottom: '5rem' }}
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
                component='div'
                dangerouslySetInnerHTML={{ __html: descriptionVelux.replace(/\n/g, '<br/>') }}
                sx={{ whiteSpace: 'pre-wrap' }}
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
