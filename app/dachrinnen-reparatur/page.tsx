'use client'

import Layout from '@/components/layout/publicLayout'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import ProjetCard from '@/components/card/ProjetCard'
import Link from 'next/link'
import { useGetHomePageQuery } from '@/services/api/HomePageAPI'

const hometitle = 'Dachrinnen Reparatur'
const description = `Ihre Dachrinnen sind undicht? Können Sie nachts wegen nerviger Tropfgeräusche auf Ihre Terrassenüberdachung nicht schlafen? Ihre Kunden werden auf dem Weg zur Ladentür von einem feinen Wasserstrahl “geduscht”? Ursache hierfür sind meist unfachmännische oder auch altersschwache Lötnähte. Sprechen Sie uns einfach an! Wir bieten Ihnen hochwertige und kostengünstige Möglichkeiten zur Dachrinnenabdichtung an.

Nehmen Sie einfach Kontakt mit uns auf.`

const projects = [
  {
    image: '/image/dachrinnen-reparatur1.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/dachrinnen-reparatur12.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/dachrinnen-reparatur3.jpg',
    title: '',
    description: ''
  },
  {
    image: '/image/dachrinnen-reparatur4.jpg',
    title: '',
    description: ''
  }
]

export default function DachrinnenReparatur() {
  return (
    <Box sx={{ paddingTop: { lg: '4.375rem', xs: '2.3rem' } }}>
      <Layout>
        <Box
          className='couverture'
          sx={{
            backgroundImage: 'url(/image/AdobeStock_662883735.jpg)',
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
              Dachrinnen Reparatur
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
