'use client'

import React from 'react'
import Box from '@mui/system/Box'
import SocialMedia from '../../commun/socialMediaPublic'
import Dynamic from 'next/dynamic'
import { Typography, Button, Container, Grid } from '@mui/material'
import { MapPin, Phone, Mail } from 'react-feather'
import Link from 'next/link'

const FacebookIcon = Dynamic(() => import('@mui/icons-material/Facebook'), {
  ssr: false
})
const InstagramIcon = Dynamic(() => import('@mui/icons-material/Instagram'), {
  ssr: false
})
const TwitterIcon = Dynamic(() => import('@mui/icons-material/Twitter'), {
  ssr: false
})
const LinkedInIcon = Dynamic(() => import('@mui/icons-material/LinkedIn'), {
  ssr: false
})
const YouTubeIcon = Dynamic(() => import('@mui/icons-material/YouTube'), {
  ssr: false
})
const buttonsData = ['Impressum', 'Datenschutz']

const settings = '© Copyright BBS Express'

const iconsData = {
  facebook: { Icon: FacebookIcon, color: '#073463' },
  twitter: { Icon: InstagramIcon, color: '#073463' },
  instagram: { Icon: TwitterIcon, color: '#073463' },
  youtube: { Icon: LinkedInIcon, color: '#073463' },
  linkedin: { Icon: YouTubeIcon, color: '#073463' }
}

function Footer({}: any) {
  return (
    <Box className='footer'>
      <Box className='footer__section'>
        <Container maxWidth='lg' fixed>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={1}></Grid>
            <Grid item xs={12} lg={11}>
              <Box
                className='footer__section__menu'
                sx={{
                  pl: {
                    lg: '0',
                    xs: '0'
                  },
                  flexWrap: 'wrap',
                  rowGap: '1.5rem',
                  justifyContent: {
                    md: 'space-between',
                    xs: 'center'
                  }
                }}
              >
                <Box>
                  {buttonsData.map((button, index) => (
                    <Button
                      key={index}
                      variant='text'
                      color='inherit'
                      sx={{
                        padding: '4px 8px',
                        fontSize: '14px',
                        color: '#031326',
                        fontFamily: 'Poppins',
                        borderRadius: '0',
                        textTransform: 'none',
                        borderRight: {
                          md: '1px solid #E5E5E5',
                          xs: 'none'
                        },
                        width: {
                          md: 'auto',
                          xs: '100%'
                        },
                        marginBottom: {
                          md: '0',
                          xs: '0.5rem'
                        },
                        '&:last-of-type': {
                          borderRight: 'none'
                        }
                      }}
                    >
                      {button}
                    </Button>
                  ))}
                </Box>
                {/* <Box>
                  <SocialMedia data={iconsData} sx={{ mr: '5px' }} />
                </Box> */}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box className='footer__container'>
        <Container fixed maxWidth='xl'>
          <Box className='footer__wrapper'>
            <Box className='footer__wrapper-section'>
              <Box className='footer__wrapper-typo'>
                <MapPin />
                <Typography>Robertstraße 79 A 44809 Bochum</Typography>
              </Box>
              <Box className='footer__wrapper-typo'>
                <Phone />
                <Typography>+49 15904816092</Typography>
              </Box>
              <Box className='footer__wrapper-typo'>
                <Mail />
                <Typography>bbsexpress7@gmail.com</Typography>
              </Box>
            </Box>

            <Box className='footer__wrapper-section'>
              <Box className='footer__wrapper-typo'>
                <Typography>Gemäß § 19 Abs. 1 Umsatzsteuergesetz wird keine Umsatzsteuer erhoben</Typography>
              </Box>
              <Box className='footer__wrapper-typo'>
                <Typography>Finanzamt Bochum Mitte, St.-Nr.: 306/5000/7071</Typography>
              </Box>
            </Box>

            {/* <Box className='footer__wrapper-section'>
            <Typography>Um sich uns anzuschließen, klicken Sie unten auf die Schaltfläche 'Kontakt'.</Typography>
            <Box sx={{ textAlign: 'center', alignItems: 'center' }}>
              <Link href='projets'>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{
                    // padding: '0.5rem 1.5rem',
                    fontWeight: '400',
                    fontSize: '0.875rem',
                    color: '#F8FAFC',
                    backgroundColor: '#0C5BB0',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: '#3D3D3D'
                    }
                  }}
                >
                  Kontakt
                </Button>
              </Link>
            </Box>
          </Box> */}
            {/* <Box
              className='logo'
              sx={{
                '& img': { maxWidth: 9999, height: 60, width: 'auto', display: 'block' }
              }}
            >
              <Link href={'/'}>
                <img src='/image/logo2-removebg.png' width={100} height={100} alt={'logo'} />
              </Link>
            </Box> */}

            {/* <Box className='footer__wrapper-typo'>
              <Mail />
              <Typography>Gemäß § 19 Abs. 1 Umsatzsteuergesetz wird keine Umsatzsteuer erhoben</Typography>
            </Box>
            <Box className='footer__wrapper-typo'>
              <Mail />
              <Typography>Finanzamt Bochum Mitte, St.-Nr.: 306/5000/7071</Typography>
            </Box> */}
          </Box>
          <Box className='footer__copyrightpublic'>
            <Typography sx={{ fontSize: '0.8rem' }}>{settings}</Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer
