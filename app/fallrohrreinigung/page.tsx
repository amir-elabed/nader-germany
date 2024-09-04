'use client'

import Layout from '@/components/layout/publicLayout'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import ProjetCard from '@/components/card/ProjetCard'
import Link from 'next/link'
import { useGetHomePageQuery } from '@/services/api/HomePageAPI'

const hometitle = 'Fallrohrreinigung'
const description = `Verstopfungsbeseitigungen von Dachentwässerungssystemen

ist eine unserer Leistungen, die häufig durch das Unterlassen der regelmäßigen Dachrinnenreinigung zum Tragen kommt, z.B. durch Silvesterraketen, Äste und sonstigen Hausmüll. Hierbei entstehen Verstopfungen vom Dachrinnenablauf über das Regenfallrohr bis hin zur Grundleitung. Diese Probleme beseitigen wir mit unserer elektromechanischen Rohrreinigungsfräse. Mit der Spirale und Wasser wird durch die Reinigungsklappe unten am Standrohr die Verstopfung in der Grundleitung, ggf. bis zum nächsten Kontroll- oder Reinigungsschacht frei gefräst und beseitigt.

Für eine schnelle Beseitigung einer Verstopfung in Ihrer Regenwasserleitung, nehmen Sie einfach Kontakt mit uns auf.`
const projects = [
  {
    image: '/image/fallrohrreinigung1.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/fallrohrreinigung2.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/fallrohrreinigung3.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/fallrohrreinigung4.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/fallrohrreinigung5.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/fallrohrreinigung6.jpg',
    title: '',
    description: ''
  }
]

export default function Fallrohrreinigung() {
  return (
    <Box sx={{ paddingTop: { lg: '4.375rem', xs: '2.3rem' } }}>
      <Layout>
        <Box
          className='couverture'
          sx={{
            backgroundImage: 'url(/image/csm_dach-AdobeStock_208897803_31effa941a.jpg)',
            width: '100%',
            borderBottom: '1px solid #E5E5E5',
            boxShadow: 'inset 0px 11px 8px -10px #cccccc78',
            backgroundPosition: '0% 70%' // 20% from left, 80% from top
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
              Fallrohrreinigung
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
              <Typography
                component='div'
                dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br/>') }}
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
