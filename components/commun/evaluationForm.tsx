'use client'

import * as React from 'react'
import Dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import 'react-quill/dist/quill.snow.css'
import { Alert, AlertColor, Button, CircularProgress, Snackbar } from '@mui/material'
import { getCookie } from 'cookies-next'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Box = Dynamic<any>(() => import('@mui/material/Box'), { ssr: false })
const Grid = Dynamic<any>(() => import('@mui/material/Grid'), { ssr: false })
const Typography = Dynamic<any>(() => import('@mui/material/Typography'), {
  ssr: false
})
const TextField = Dynamic<any>(() => import('@mui/material/TextField'), {
  ssr: false
})

const EvalForm = ({ settings }: any) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { t } = useTranslation()
  const router = useRouter()


  const token = getCookie('token')

  const validate = (values: any) => {
    const errors: any = {}

    if (!values.title) {
      errors.title = t('form__required')
    }
    if (!values.start_date) {
      errors.start_date = t('form__required')
    }
    if (!values.end_date) {
      errors.end_date = t('form__required')
    }
    if (!values.observation) {
      errors.observation = t('form__required')
    }

    return errors
  }

  const initialFormValues: any = {
    title: settings?.title || '',
    start_date: settings?.start_date || '',
    end_date: settings?.end_date || '',
    observation: settings?.observation || ''
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
      return
    }

    setOpenToast(false)
  }

  const formik = useFormik({
    initialValues: initialFormValues,
    validate: validate,
    onSubmit: async values => {
      setIsLoading(true)
      const dataToSend = {
        title: values.title,
        start_date: values.start_date,
        end_date: values.end_date,
        observation: values.observation
      }

      try {
          await axios.post(`${settings?.url}`, dataToSend, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
        setToastType('success')
        setOpenToast(true)
        setToastMessage('Action effectué avec succès')
        setIsLoading(false)
        router.push('/espace-adminprojet/evaluation')
      } catch (error) {
        setToastType('error')
        setOpenToast(true)
        setToastMessage('Une erreur est survenue')
        setIsLoading(false)
      }
    }
  })

  return (
    <>
      <form autoComplete='off' onSubmit={formik.handleSubmit}>
        <Box sx={{ padding: '0px 20px 15px ', borderBottom: '1px solid #E5E5E5', display: 'flex' }}>
          <Typography className='title2'>{t('New_eval')}</Typography>
          <Button variant='contained' color='primary' type='submit' className='button' sx={{ marginLeft: 'auto' }}>
            <Typography className='button__typo'>
              {isLoading ? (
                <CircularProgress
                  sx={{
                    '&.MuiCircularProgress-root': { width: '21px!important', height: '21px!important', color: '#fff' }
                  }}
                />
              ) : (
                t('save')
              )}
            </Typography>
          </Button>
        </Box>
        <Grid container spacing={1}>
          <Grid item lg={8} xs={12} sx={{ mt: '30px', ml: '20px', mb: '10rem' }}>
            <Grid spacing={2} container>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('Titled')}
                </Typography>
                <TextField
                  autoComplete='off'
                  type='text'
                  id='title'
                  name='title'
                  label={t('Titled')}
                  variant='outlined'
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={6} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('Start date')}
                </Typography>
                <TextField
                  fullWidth
                  size='medium'
                  variant='outlined'
                  name='start_date'
                  margin='dense'
                  type='datetime-local'
                  value={formik.values.start_date ? formik.values.start_date.replace('Z', '') : ''}
                  onChange={formik.handleChange}
                  error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                />
              </Grid>
              <Grid item xs={6} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('End date')}
                </Typography>
                <TextField
                  fullWidth
                  size='medium'
                  variant='outlined'
                  name='end_date'
                  margin='dense'
                  type='datetime-local'
                  value={formik.values.end_date ? formik.values.end_date.replace('Z', '') : ''}
                  onChange={formik.handleChange}
                  error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                />
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('Observation')}
                </Typography>
                <TextField
                  autoComplete='off'
                  type='text'
                  id='observation'
                  name='observation'
                  multiline
                  rows= {5}
                  variant='outlined'
                  value={formik.values.observation}
                  onChange={formik.handleChange}
                  error={formik.touched.observation && Boolean(formik.errors.observation)}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Alert onClose={handleClose} severity={mapToastTypeToSeverity(toastType)} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
export default EvalForm
