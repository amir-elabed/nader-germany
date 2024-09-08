'use client'

import Layout from '@/components/layout/publicLayout'
import { Typography, Button, TextField, CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { getCookie } from 'cookies-next'
import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

export default function Home() {
  const [formData, setFormData] = useState({
    from_name: '',
    to_name: '',
    message: ''
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const form = useRef()

  const handleSubmit = e => {
    setIsLoading(true)
    e.preventDefault()

    // Replace with your own EmailJS service ID, template ID, and user ID
    const serviceID = 'service_rux13ec'
    const templateID = 'template_ffiiab6'

    emailjs
      .sendForm(serviceID, templateID, form.current, {
        publicKey: '8h2UhpnN_SkeID6RR'
      })
      .then(
        () => {
          console.log('SUCCESS!')
          setIsLoading(false)
        },
        error => {
          setIsLoading(false)
          console.log('FAILED...', error.text)
        }
      )
  }

  return (
    <Box sx={{ paddingTop: { lg: '4.375rem', xs: '2.3rem' } }}>
      <Layout>
        <Box
          className='couverture'
          sx={{
            backgroundImage: 'url(/image/couverture.png)',
            width: '100%',
            borderBottom: '1px solid #E5E5E5',
            boxShadow: 'inset 0px 11px 8px -10px #cccccc78',
            backgroundPosition: 'top right'
          }}
        >
          <Container>
            <Typography component='h1' className='banner__title'>
              Kontakt
            </Typography>
          </Container>
        </Box>
        <Box className='contact'>
          <Container maxWidth='lg' fixed>
            <Grid container spacing={2} sx={{ p: '3rem 0' }}>
              <Grid item xs={12} sm={6} lg={6}>
                <Box sx={{ padding: '1rem' }}>
                  <form ref={form} onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Box className='form__wrapper'>
                      <TextField
                        className='form__input'
                        fullWidth
                        size='medium'
                        variant='outlined'
                        name='from_name'
                        margin='dense'
                        type='text'
                        id='from_name'
                        placeholder='Name'
                        value={formData.from_name}
                        onChange={handleChange}
                      />
                    </Box>

                    <Box className='form__wrapper'>
                      <TextField
                        className='form__input'
                        fullWidth
                        size='medium'
                        variant='outlined'
                        name='to_name'
                        margin='dense'
                        type='text'
                        id='to_name'
                        placeholder='Email'
                        value={formData.to_name}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box className='form__wrapper'>
                      <TextField
                        className='form__input'
                        fullWidth
                        size='medium'
                        variant='outlined'
                        name='message'
                        margin='dense'
                        type='text'
                        id='message'
                        placeholder='Nachricht'
                        multiline
                        rows={10}
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </Box>
                    <Button
                      type={'submit'}
                      variant='contained'
                      sx={{
                        backgroundColor: '#0C5BB0',
                        mt: '1rem',
                        paddingInline: '4rem',
                        paddingBlock: '0.5rem',
                        boxShadow: 'none',
                        display: 'block',

                        '&:hover': {
                          backgroundColor: '#3D3D3D'
                        }
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress
                          sx={{
                            '&.MuiCircularProgress-root': {
                              width: '21px!important',
                              height: '21px!important',
                              color: '#fff'
                            }
                          }}
                        />
                      ) : (
                        'Absenden'
                      )}
                    </Button>
                  </form>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <Box sx={{ padding: '1rem' }}>
                  <Typography
                    component={'h3'}
                    sx={{ color: '#05264A', fontSize: '22px', fontWeight: 'bold', pb: '1rem', fontFamily: 'Poppins' }}
                  >
                    Kontaktformular
                  </Typography>
                  <Typography sx={{ marginBottom: '1rem' }}>
                    Haben Sie Fragen, oder möchten Sie einen Termin mit uns vereinbaren? Dann rufen Sie uns gerne an,
                    oder schreiben Sie uns eine Nachricht über unser Kontaktformular.
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography className='contact_name'>
                      Adresse: <span> Robertstraße 79 A 44809 Bochum</span>
                    </Typography>
                    <Typography className='contact_name'>
                      Email: <span> bbsexpress7@gmail.com</span>
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', pt: '1rem', pr: { xs: '0', lg: '6rem' } }}
                  >
                    <Typography className='contact_name'>
                      Telefonnummer: <span> +49 15904816092</span>
                    </Typography>
                  </Box>
                  <Box sx={{ pt: '1rem' }}>
                    {/* <iframe
                      src='https://maps.app.goo.gl/TtFtAmkiXSzqBbHa8'
                      height='400'
                      style={{ border: '0' }}
                    ></iframe> */}
                    <iframe
                      src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.975994866211!2d7.2047987!3d51.495307999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8e050189d0859%3A0x7636327b2f487fc4!2sRobertstra%C3%9Fe%2079A%2C%2044809%20Bochum%2C%20Allemagne!5e0!3m2!1sfr!2stn!4v1725550615516!5m2!1sfr!2stn'
                      height='400'
                      style={{ border: '0' }}
                    ></iframe>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    </Box>
  )
}
