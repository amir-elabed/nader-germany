'use client'
import Menu from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import i18n from 'i18next'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Container from '@mui/material/Container'
import { useRouter } from 'next/navigation'
import FooterPublic from '../FooterPublic'
import { setCookie } from 'cookies-next'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Language from '@mui/icons-material/Language'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import IconButton from '@mui/material/IconButton'
import { InputBase } from '@mui/material'
import { useTranslation } from 'react-i18next'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined'
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import Close from '@mui/icons-material/Close'
import ListItemText from '@mui/material/ListItemText'

const pages = [
  { name: 'Dachrinnenreinigung', path: '/dachrinnenreinigung' },
  { name: 'Fallrohrreinigung', path: '/fallrohrreinigung' },
  { name: 'Dachrinnen Reparatur', path: '/dachrinnen-reparatur' },
  { name: 'Reinigungsarbeiten', path: '/reinigungsarbeiten' },
  { name: 'Preise', path: '/preise' },
  { name: 'Kontakt', path: '/kontakt' }
]

const PublicLayout = ({ children }: any) => {
  const [drawer, setDrawer] = useState(false)

  const list = () => (
    <Box sx={{ width: 300 }} role='presentation' onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Box
        className='navbarPublic__nav'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          paddingBlock: '2rem',
          '& a': {
            textDecoration: 'none',
            fontSize: '1rem',
            color: '#05264A',
            fontFamily: "'Arial', sans-serif",
            paddingInline: '2rem',
            '&.active': {
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontWeight: '700'
            },
            '&.active:before': {
              content: "''",
              display: 'block',
              width: '1.25rem',
              height: '2px',
              backgroundColor: '#087FD1'
            }
          }
        }}
      >
        <IconButton onClick={toggleDrawer(false)} sx={{ marginLeft: 'auto', marginRight: '2rem' }}>
          <Close />
        </IconButton>
        {pages.map(page => (
          <Link href={page?.path} key={page?.name}>
            <ListItemText primary={page?.name} />
          </Link>
        ))}
      </Box>
    </Box>
  )

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setDrawer(open)
  }

  const { t } = useTranslation()

  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpenLanguageMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLanguageAnchorEl(event.currentTarget)
  }

  const handleCloseLanguageMenu = () => {
    setLanguageAnchorEl(null)
  }

  const router = useRouter()

  return (
    <>
      <Box className='navbarPublic'>
        <Container fixed maxWidth={'lg'}>
          <IconButton onClick={toggleDrawer(true)} sx={{ display: { xs: 'flex', lg: 'none' } }}>
            <Menu />
          </IconButton>
          <Box
            className='logo'
            sx={{
              '& img': {
                maxWidth: 9999,
                height: 60,
                width: 'auto',
                display: 'block'
              }
            }}
          >
            <Link href={'/'}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: { xs: 'right', sm: 'start' }
                }}
              >
                <Image
                  src='/image/logo2.jpg'
                  width={100} // Increase the width
                  height={100} // Increase the height
                  alt={'logo'}
                  style={{ width: '65%', height: 'auto' }}
                />
                {/* <Typography
                  component='div'
                  sx={{
                    textAlign: 'center',
                    // display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'Nerko One,cursive',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '1.25rem',
                    color: '#203959',
                    display: { xs: 'none', sm: 'flex' }
                  }}
                >
                  Seit 2018
                </Typography> */}
              </Box>
            </Link>
          </Box>
          <Box className='navbarPublic__nav' sx={{ display: { lg: 'block', xs: 'none' } }}>
            <nav>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Link href='dachrinnenreinigung'>
                  <Box
                    sx={{
                      marginRight: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      '& *': {
                        color: '#05264A'
                      },
                      ':hover *': { color: '#64B2E1' }
                    }}
                  >
                    {/* <InfoOutlinedIcon sx={{ marginBlock: '0.5rem' }} /> */}
                    <Typography
                      variant='overline'
                      sx={{
                        marginTop: '-5px',
                        cursor: 'pointer',
                        fontWeight: '800',
                        fontSize: '0.8rem',
                        textTransform: 'none'
                      }}
                    >
                      Dachrinnenreinigung
                    </Typography>
                  </Box>
                </Link>
                <Link href='fallrohrreinigung'>
                  <Box
                    sx={{
                      marginRight: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      '& *': {
                        color: '#05264A'
                      },
                      ':hover *': { color: '#64B2E1' }
                    }}
                  >
                    <Typography
                      variant='overline'
                      sx={{
                        marginTop: '-5px',
                        cursor: 'pointer',
                        fontWeight: '800',
                        fontSize: '0.8rem',
                        textTransform: 'none'
                      }}
                    >
                      Fallrohrreinigung
                    </Typography>
                  </Box>
                </Link>
                <Link href='/dachrinnen-reparatur'>
                  <Box
                    sx={{
                      marginRight: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      '& *': {
                        color: '#05264A'
                      },
                      ':hover *': { color: '#64B2E1' }
                    }}
                  >
                    <Typography
                      variant='overline'
                      sx={{
                        marginTop: '-5px',
                        cursor: 'pointer',
                        fontWeight: '800',
                        fontSize: '0.8rem',
                        textTransform: 'none'
                      }}
                    >
                      Dachrinnen Reparatur
                    </Typography>
                  </Box>
                </Link>
                <Link href='/reinigungsarbeiten'>
                  <Box
                    sx={{
                      marginRight: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      '& *': {
                        color: '#05264A'
                      },
                      ':hover *': { color: '#64B2E1' }
                    }}
                  >
                    <Typography
                      variant='overline'
                      sx={{
                        marginTop: '-5px',
                        cursor: 'pointer',
                        fontWeight: '800',
                        fontSize: '0.8rem',
                        textTransform: 'none'
                      }}
                    >
                      Reinigungsarbeiten
                    </Typography>
                  </Box>
                </Link>

                <Link href='/preise'>
                  <Box
                    sx={{
                      marginRight: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      '& *': {
                        color: '#05264A'
                      },
                      ':hover *': { color: '#64B2E1' }
                    }}
                  >
                    <Typography
                      variant='overline'
                      sx={{
                        marginTop: '-5px',
                        cursor: 'pointer',
                        fontWeight: '800',
                        fontSize: '0.8rem',
                        textTransform: 'none'
                      }}
                    >
                      Preise
                    </Typography>
                  </Box>
                </Link>

                <Link href='/kontakt'>
                  <Box
                    sx={{
                      marginRight: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      '& *': {
                        color: '#05264A'
                      },
                      ':hover *': { color: '#64B2E1' }
                    }}
                  >
                    <Typography
                      variant='overline'
                      sx={{
                        marginTop: '-5px',
                        cursor: 'pointer',
                        fontWeight: '800',
                        fontSize: '0.8rem',
                        textTransform: 'none'
                      }}
                    >
                      Kontakt
                    </Typography>
                  </Box>
                </Link>
                <Link href='/'>
                  <Box
                    sx={{
                      marginRight: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      '& *': {
                        color: '#05264A'
                      },
                      ':hover *': { color: '#64B2E1' }
                    }}
                  >
                    <Image
                      src='/image/seit.png'
                      width={100}
                      height={100}
                      // style={{ width: '25%', height: 'auto' }}
                      alt='banner_logo'
                    />
                  </Box>
                </Link>
              </Box>
            </nav>
          </Box>
        </Container>
      </Box>

      <Drawer anchor={'right'} open={drawer} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>

      {children}
      <FooterPublic links={pages} />
    </>
  )
}
export default PublicLayout
