'use client'

import React from 'react'
import { useFormik } from 'formik'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Image from 'next/image'
import { Alert, AlertColor, Box, Snackbar } from '@mui/material'
import { useForgetPasswordMutation } from '@/services/api/AuthAPI'
import Dynamic from 'next/dynamic'
import ReCAPTCHA from 'react-google-recaptcha'



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

const iconsData = [
  { Icon: FacebookIcon, color: '#073463' },
  { Icon: InstagramIcon, color: '#073463' },
  { Icon: TwitterIcon, color: '#073463' },
  { Icon: LinkedInIcon, color: '#073463' },
  { Icon: YouTubeIcon, color: '#073463' }
]


const Mdp = () => {

  const [forgotpassword] = useForgetPasswordMutation()
  const [captchaVerified, setCaptchaVerified] = React.useState(false)


   const validate = (values: any) => {
     const errors: any = {}
     if (!values.email) {
       errors.email = 'Champ obligatoire'
     }

     return errors
   }

   const initialFormValues = {
     email: '',
     baseUrlEmail: ''
   }

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
      return;
    }

    setOpenToast(false);
  };



   const formik = useFormik({
     initialValues: initialFormValues,
     validate: validate,
     onSubmit: values => {
      if (captchaVerified) {
        values.baseUrlEmail = `${process.env.NEXT_PUBLIC_APP_URL}`
        forgotpassword(values)
          .unwrap()
          .then(() => {
            {
              setToastType('success')
              setOpenToast(true)
              setToastMessage('Demande envoyé avec succès')
            }
          })
          .catch(error => {
            setToastType('error')
            console.log('errorMessage', error)
            setOpenToast(true)
            setToastMessage(error?.data?.message)
          })
      } else {
        setToastType('error')
        setOpenToast(true)
        setToastMessage('Veuillez valider le captcha')
      }
     }
   })

  return (
    <Container className='login'>
      <Box className='login__formContainer' sx={{ marginTop: '200px !important' }}>
        <Image
          src='/image/logo.png'
          alt='Vercel Logo'
          width={180}
          height={70}
          priority
          style={{ marginBottom: '20px' }}
        />
        <Typography variant='h4' className='login__formTitle'>
          Mot de passe oublié
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
          <Box>
            <ReCAPTCHA
              sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`}
              onChange={() => {
                setCaptchaVerified(true)
              }}
            />
          </Box>

          <Button className='login__formsubmitButton' type='submit' sx={{ mt: '30px' }}>
            <Typography sx={{ color: '#F8FAFC', padding: '10px' }}>ENVOYER</Typography>
          </Button>
        </form>
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

export default Mdp
