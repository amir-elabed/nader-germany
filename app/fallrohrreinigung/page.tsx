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
const homedescription =
  'Sind die Fallrohre erst einmal verstopft, können in der Folge auch die Dachrinnen ihren Zweck nicht mehr erfüllen. Läuft das Regenwasser wasserfallartig aus Ihren Dachrinnen heraus, können Sie meist von einer Rohrverstopfung ausgehen. Profitieren Sie von unserer langjährigen Erfahrung auf dem Gebiet der Rohrreinigung. Wir bieten Ihnen gerne unsere professionelle und schnelle Unterstüzung an!'

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
                className='homedescription__description'
                dangerouslySetInnerHTML={{ __html: homedescription }}
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
