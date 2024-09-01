import React, { useState } from 'react'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import HomeIcon from '@mui/icons-material/HomeOutlined'
import MessageIcon from '@mui/icons-material/MailOutline'
import FeedIcon from '@mui/icons-material/Feed'
import Button from '@mui/material/Button'
import { Typography, InputBase, Paper, Box } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Popover from '@mui/material/Popover'
import { deleteCookie } from 'cookies-next'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import MenuIcon from '@mui/icons-material/Menu'
import { useLanguage } from '../../context/LangueContext'
import i18n from 'i18next'
import { useTranslation } from 'react-i18next'
import { useGetProfileQuery } from '@/services/api/ProfileAPI'
import { useGetNotificationsQuery } from '@/services/api/NotificationsAPI'
import { setCookie } from 'cookies-next'
import Link from 'next/link'

function HeaderNav(props: any) {
  const imageStyles = {
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    objectFit: 'cover' as const
  }

  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null)
  const { data: notifs }: any = useGetNotificationsQuery({})

  const { language, setLanguage } = useLanguage()

  const changeLanguage = (newLanguage: any) => {
    setLanguage(newLanguage)
    i18n.changeLanguage(newLanguage)
    handleCloseLanguageMenu()
    setCookie('language', newLanguage)
  }

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleOpenLanguageMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLanguageAnchorEl(event.currentTarget)
  }

  const handleCloseLanguageMenu = () => {
    setLanguageAnchorEl(null)
  }

  const handleLogout = () => {
    deleteCookie('token')
    deleteCookie('user')
    handleCloseMenu()
    router.push('/connexion')
  }

  const toggleMenu = () => {
    props?.setIsMenuOpen(!props?.isMenuOpen)
  }

  const { t } = useTranslation()

  const { data: sessionInfo }: any = useGetProfileQuery({})

  return (
    <Toolbar className='navbar__wrapper'>
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        {!props?.noMenu && (
          <Button
            variant='text'
            onClick={toggleMenu}
            sx={{
              flexDirection: 'column',
              color: '#05264A',
              marginInlineEnd: {
                xs: '0.5rem',
                lg: '1.25rem'
              },
              textTransform: 'none',
              padding: 0,
              minWidth: 0,
              '& *': {
                color: '#05264A'
              },
              '&:hover': {
                background: 'transparent',
                '& *': {
                  color: '#0C5BB0'
                }
              },
              '& svg': {
                marginBottom: '0.25rem',
                fontSize: '1.5rem'
              },
              '& span': {
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 400,
                textTransform: 'none'
              }
            }}
          >
            <MenuIcon />
            <span>Menu</span>
          </Button>
        )}
        <Button
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            paddingInline: '0.625rem',
            paddingBlock: 0,
            minWidth: 0
          }}
          onClick={handleOpenLanguageMenu}
        >
          <LanguageIcon sx={{ color: '#05264A', marginBottom: '0.25rem' }} />
          <Typography
            variant='caption'
            color='textSecondary'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: '#05264A',
              textTransform: 'uppercase',
              '&::after': {
                content: '""',
                display: 'block',
                borderLeft: '4px solid transparent',
                borderRight: '4px solid transparent',
                borderTop: !languageAnchorEl ? '7px solid #25314C' : 'none',
                borderBottom: languageAnchorEl ? '7px solid #25314C' : 'none',
                width: 0,
                height: 0,
                cursor: 'pointer',
                marginBottom: '0.125rem'
              }
            }}
          >
            {language}
          </Typography>
        </Button>

        <Popover
          open={Boolean(languageAnchorEl)}
          anchorEl={languageAnchorEl}
          onClose={handleCloseLanguageMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          sx={{ marginTop: '15px', marginRight: '30px', color: '#05264A' }}
        >
          <Box p={2} sx={{ '& *': { color: '#05264A!important' } }}>
            <Button sx={{ display: 'block' }} onClick={() => changeLanguage('EN')} color='primary'>
              English
            </Button>
            <Button sx={{ display: 'block' }} onClick={() => changeLanguage('FR')} color='primary'>
              French
            </Button>
            <Button sx={{ display: 'block' }} onClick={() => changeLanguage('IT')} color='primary'>
              Italian
            </Button>
          </Box>
        </Popover>
        <Box
          sx={{
            margin: {
              lg: '0 20px',
              xs: '0 8px'
            },
            '& img': {
              maxWidth: {
                lg: 'auto',
                xs: '140px'
              },
              height: 'auto'
            }
          }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_API_WITHOUT}` + props?.logo || '/image/noImage.png'}
            className='logo-projet'
            alt='Vercel Logo'
            width={329}
            height={120}
            priority
          />
        </Box>
        <Paper component='div' elevation={0} className='navbar__search'>
          <IconButton color='inherit' sx={{ color: 'grey' }}>
            <SearchOutlinedIcon />
          </IconButton>
          <InputBase
            placeholder={t('search')}
            inputProps={{ 'aria-label': 'search' }}
            sx={{
              flexGrow: 1,
              color: 'grey',
              border: 'none',
              outline: 'none',
              display: {
                xs: 'none',
                lg: 'block'
              }
            }}
          />
        </Paper>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex'
            },
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: '16px',
            cursor: 'pointer',
            '& *': {
              color: '#0C5BB0'
            }
          }}
        >
          <HomeIcon sx={{ marginBlock: '0.5rem' }} />
          <Typography
            variant='caption'
            sx={{
              marginTop: '-5px'
            }}
          >
            {t('home')}
          </Typography>
        </Box>
        {props?.isLogged ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              position: 'relative',
              '& *': {
                color: '#05264A'
              },
              '&:hover *': { color: '#0C5BB0' }
            }}
            onClick={() => router.push('/espace-incube/notifications')}
          >
            <NotificationsNoneOutlinedIcon sx={{ marginBlock: '0.5rem' }} />
            {10 > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '0',
                  right: '1.25rem',
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '& span': {
                    lineHeight: 1
                  }
                }}
              >
                <Typography variant='caption' sx={{ color: 'white' }}>
                  {notifs?.unseenCount}
                </Typography>
              </Box>
            )}
            <Typography
              variant='caption'
              sx={{
                marginRight: '14px',
                marginTop: '-5px'
              }}
            >
              Notifications
            </Typography>
          </Box>
        ) : (
          <Link href={`/news`} style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                marginRight: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& *': {
                  color: '#05264A'
                },
                ':hover *': { color: '#0C5BB0' }
              }}
            >
              <FeedIcon sx={{ marginBlock: '0.5rem' }} />
              <Typography
                variant='caption'
                sx={{
                  marginTop: '-5px',
                  cursor: 'pointer'
                }}
              >
                News
              </Typography>
            </Box>
          </Link>
        )}
        ,
        <Link href={`/contact`} style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& *': {
                color: '#05264A'
              },
              ':hover *': { color: '#0C5BB0' }
            }}
          >
            <MessageIcon sx={{ marginBlock: '0.5rem' }} />

            <Typography
              variant='caption'
              sx={{
                marginTop: '-5px',
                cursor: 'pointer'
              }}
            >
              Contact
            </Typography>
          </Box>
        </Link>
      </Box>
      {props?.isLogged ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '&:hover *': { color: '#0C5BB0' },
            '& *': {
              color: '#05264A'
            }
          }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_API_WITHOUT}` + sessionInfo?.image || '/image/noImage.png'}
            alt='vous'
            width={40}
            height={40}
            style={imageStyles}
          />
          <Typography
            variant='caption'
            sx={{
              '&:hover': { color: '#0C5BB0' },
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              marginTop: '0.375rem',
              marginLeft: '0.375rem'
            }}
            onClick={handleOpenMenu}
          >
            Vous
            <ArrowDropDownIcon sx={{ marginLeft: '1px', fontSize: '15px' }} />
          </Typography>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            sx={{ marginTop: '15px', marginRight: '30px' }}
          >
            <Box
              py={1}
              px={2}
              sx={{
                '& *': {
                  color: '#05264A!important'
                }
              }}
            >
              <Box sx={{ minWidth: 160 }}>
                <Button variant='text' color='primary'>
                  {sessionInfo?.firstName} {sessionInfo?.lastName}
                </Button>
              </Box>
              <Box sx={{ minWidth: 160 }}>
                <Button variant='text' color='primary'>
                  {sessionInfo?.email}
                </Button>
              </Box>

              <Box sx={{ minWidth: 160 }}>
                <Button variant='text' color='primary' onClick={() => router.push(`/profile`)}>
                  Voir mon profile
                </Button>
              </Box>

              <Box sx={{ minWidth: 160 }}>
                <Button onClick={handleLogout} style={{ color: '#031326' }}>
                  Déconnexion
                </Button>
              </Box>
            </Box>
          </Popover>
        </Box>
      ) : (
        <Button
          variant='contained'
          color='primary'
          sx={{
            backgroundColor: '#0A4E96',
            padding: '0.5rem 1.5rem',
            fontWeight: '400',
            fontSize: '0.875rem',
            color: '#F8FAFC',
            marginLeft: '10px !important',
            '&:hover': { backgroundColor: '#087FD1' },
            boxShadow: 'none'
          }}
          onClick={() => router.push('/connexion')}
        >
          Se connecter
        </Button>
      )}
    </Toolbar>
  )
}

export default HeaderNav
