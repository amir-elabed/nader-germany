'use client'

import React from 'react'
import { useFormik } from 'formik'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Image from 'next/image'
import { Alert, AlertColor, Box, Snackbar } from '@mui/material'
import Dynamic from 'next/dynamic'
import { useAuth } from '../../hooks/useAuth'
import Link from 'next/link'
import { Tooltip } from '@mui/material'
import ReCAPTCHA from 'react-google-recaptcha'

const IconButton = Dynamic<any>(() => import('@mui/material/IconButton'), { ssr: false })
const InputAdornment = Dynamic<any>(() => import('@mui/material/InputAdornment'), { ssr: false })
const MuiLink = Dynamic<any>(() => import('@mui/material/Link'), { ssr: false })
const Checkbox = Dynamic<any>(() => import('@mui/material/Checkbox'), { ssr: false })
const FormControlLabel = Dynamic<any>(() => import('@mui/material/FormControlLabel'), { ssr: false })
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
const EyeOutline = Dynamic<any>(() => import('mdi-material-ui/EyeOutline'), { ssr: false })
const EyeOffOutline = Dynamic<any>(() => import('mdi-material-ui/EyeOffOutline'), { ssr: false })

const iconsData = [
  { Icon: FacebookIcon, color: '#073463' },
  { Icon: InstagramIcon, color: '#073463' },
  { Icon: TwitterIcon, color: '#073463' },
  { Icon: LinkedInIcon, color: '#073463' },
  { Icon: YouTubeIcon, color: '#073463' }
]

const Login = () => {
  const auth = useAuth()
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [captchaVerified, setCaptchaVerified] = React.useState(false)

  const [openToast, setOpenToast] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState('')
  const [toastType, setToastType] = React.useState('success')

  const mapToastTypeToSeverity = (type: string): AlertColor => {
    switch (type) {
      case 'success':
        return 'success'
      case 'info':
        return 'info'
      case 'warning':
        return 'warning'
      case 'error':
        return 'error'
      default:
        return 'info' // Provide a default value or handle other cases
    }
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenToast(false)
  }

  const validate = (values: any) => {
    const errors: any = {}
    if (!values.email) {
      errors.email = 'Champ obligatoire'
    }
    if (!values.password) {
      errors.password = 'Champ obligatoire'
    }

    return errors
  }

  const initialFormValues = {
    password: '',
    email: ''
  }

  const formik = useFormik({
    initialValues: initialFormValues,
    validate: validate,
    onSubmit: async values => {
      if (captchaVerified) {
        const username = values?.email
        const password = values?.password
        try {
          await auth.login({ username, password })
        } catch (errorMessage) {
          setToastType('error')
          setOpenToast(true)
          setToastMessage(errorMessage?.toString() ?? "")
        }
      } else {
        setToastType('error')
        setOpenToast(true)
        setToastMessage('Veuillez valider le captcha')
      }
    }
  })

  return (
    <Container className='login'>
      <Box className='login__formContainer'>
        <Image
          src='/image/logo.png'
          alt='Vercel Logo'
          width={180}
          height={70}
          priority
          style={{ marginBottom: '20px' }}
        />
        <Typography variant='h4' className='login__formTitle'>
          S'identifier
        </Typography>
        <form autoComplete='off' onSubmit={formik.handleSubmit}>
          <Box className='login__forminputField'>
            <TextField
              autoComplete='off'
              required
              type='email'
              id='email'
              name='email'
              label='Email'
              variant='outlined'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              sx={{ width: '100%', backgroundColor: '#F7F9FA' }}
            />
          </Box>
          <Box className='login__forminputField' sx={{ padding: '0' }}>
            <TextField
              autoComplete='off'
              required
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              label='Password'
              variant='outlined'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              sx={{
                width: '100%',
                backgroundColor: '#F7F9FA'
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Tooltip title={showPassword ? 'Masquer mot de passe' : 'Affichet mot de passe'}>
                      <div>
                        <IconButton
                          edge='end'
                          onMouseDown={(e: any) => e.preventDefault()}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </div>
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <Box sx={{ maxWidth: '100%', '& iframe, & div': { maxWidth: '100%' } }}>
            <ReCAPTCHA
              sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`}
              onChange={() => {
                setCaptchaVerified(true)
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', color: '#05264A', fontSize: '12px' }}>
            <Box
              alignItems='center'
              justifyContent='space-between'
              textAlign='left'
              sx={{ color: '#05264A', fontFamily: '"arial", sans-serif' }}
            >
              <FormControlLabel
                control={<Checkbox {...formik.getFieldProps('prescription')} />}
                label='Se souvenir de moi ?'
                sx={{
                  color: '#05264A',
                  fontSize: '12px'
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              <Link style={{ textDecorationColor: '#0A4E96' }} passHref href='/MotDePasseOublie'>
                <Typography
                  textAlign='right'
                  component={MuiLink}
                  variant='body2'
                  sx={{ color: '#0A4E96', fontFamily: '"arial", sans-serif', textDecorationColor: '#0A4E96' }}
                >
                  Mot de passe oublié?
                </Typography>
              </Link>
            </Box>
          </Box>
          <Button className='login__formsubmitButton' type='submit' sx={{ mt: '30px' }}>
            <Typography sx={{ color: '#F8FAFC', padding: '10px' }}>SE CONNECTER</Typography>
          </Button>
          <Box className='login__formsfollowBox'>
            <Box className='login__formsdivider'></Box>
            <Typography className='login__formsfollowText'>Suivez nous</Typography>
            <Box className='login__formsdivider'></Box>
          </Box>
          <Box sx={{ textAlign: 'center', alignItems: 'center', mt: '20px' }}>
            {iconsData?.map((data: any, index: any) => {
              const { Icon, color } = data

              return (
                <span key={index} style={{ margin: '0 5px' }}>
                  <Box className='login__formssocialMedia'>
                    <Icon style={{ fontSize: 20, color: color }} />
                  </Box>
                </span>
              )
            })}
          </Box>
        </form>
      </Box>
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}>

        <Alert onClose={handleClose} severity={mapToastTypeToSeverity(toastType)} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>

      </Snackbar>
    </Container>
  )
}

export default Login
