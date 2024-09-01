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
const MenuItem = Dynamic<any>(() => import('@mui/material/MenuItem'), { ssr: false })
const Select = Dynamic<any>(() => import('@mui/material/Select'), { ssr: false })
const FormControl = Dynamic<any>(() => import('@mui/material/FormControl'), { ssr: false })

const RessourcesForm = ({ settings, espace, refetch }: any) => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = React.useState(false)
  const token = getCookie('token')

  const validate = (values: any) => {
    const errors: any = {}

    if (!values.title) {
      errors.title = t('form__required')
    }
    if (!values.status) {
      errors.status = t('form__required')
    }
    if (!values.type) {
      errors.type = t('form__required')
    }
    if (!values.ressource) {
      errors.ressource = t('form__required')
    }
    if (!values.publication_date) {
      errors.publication_date = t('form__required')
    }
  }

  const handleImageFileChange = (event: any) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      formik.setFieldValue('resource', selectedFile)
    }
  }

  const initialFormValues: any = {
    title: settings?.ressource?.title || '',
    type: settings?.ressource?.type || '',
    resource: settings?.ressource?.resource || '',
    status: settings?.ressource?.status || '',
    publication_date: settings?.ressource?.publication_date || '',
    seo_title: settings?.ressource?.seo_title || '',
    seo_alias: settings?.ressource?.seo_alias || '',
    seo_description: settings?.ressource?.seo_description || ''
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
    onSubmit: async (values: any) => {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('type', values.type)
      formData.append('title', values.title)
      formData.append('status', values.status)
      formData.append('publication_date', values.publication_date)
      formData.append('seo_title', values.seo_title)
      formData.append('seo_alias', values.seo_alias)
      formData.append('seo_description', values.seo_description)
      formData.append('resource', values.resource)

      try {
        if (settings?.method === 'PATCH') {
          await axios.patch(`${settings?.url}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
            }
          })
        } else {
          await axios.post(`${settings?.url}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
            }
          })
        }
        setToastType('success')
        setIsLoading(false)
        setOpenToast(true)
        setToastMessage('Action effectué avec succès')
        if (refetch) {
          setTimeout(() => {
            refetch()
          }, 1500);
        }

      } catch (error) {
        setToastType('error')
        setOpenToast(true)
        setToastMessage('Une erreur est survenue')
        setIsLoading(false)
      }
    }
  })

  const router = useRouter()

  return (
    <>
      <form noValidate autoComplete='off' onSubmit={formik.handleSubmit} action=''>
        <Box sx={{ padding: '0 20px 15px', borderBottom: '1px solid #E5E5E5', display: 'flex' }}>
          <Typography className='title2'>
            {settings?.ressource ? t('Modif resource') : t('New Resource lower')}
          </Typography>
          <Button
            variant='text'
            color='primary'
            sx={{
              marginLeft: 'auto',
              marginRight: '1rem',
              paddingInline: '2rem',
              '&:hover': {
                backgroundColor: 'rgb(10 78 150 / 7%)'
              }
            }}
            onClick={() => router.push(`/${espace}/ressources`)}
          >
            <Typography
              sx={{
                color: '#0A4E96'
              }}
            >
              {t('return')}
            </Typography>
          </Button>
          <Button variant='contained' color='primary' type='submit' className='button'>
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
                  {t('title')}
                </Typography>
                <TextField
                  autoComplete='off'
                  type='text'
                  id='title'
                  name='title'
                  label={t('title')}
                  variant='outlined'
                  title
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('tableHeader__type')}
                </Typography>
                <FormControl fullWidth size='medium' margin='dense'>
                  <Select
                    variant='outlined'
                    required
                    labelId='status'
                    id='type'
                    label={t('tableHeader__type')}
                    name='type'
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    error={formik.touched.type && Boolean(formik.errors.type)}
                    margin='dense'
                  >
                    <MenuItem value={'Video'}>Vidéo</MenuItem>
                    <MenuItem value={'File'}>Document</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '10px', ml: '5px' }}>
                  {t('Ressource')}
                </Typography>
                <input
                  style={{ display: 'none' }}
                  id='ressource'
                  name='ressource'
                  type='file'
                  accept={formik.values.type === 'File' ? 'application/pdf' : 'image/jpg, image/png, , application/msword, image/gif, video/mp4, video/x-m4v, video/*'}
                  
                  // first 2 types are skipped by safari at video/*
                  onChange={handleImageFileChange}
                />
                <label htmlFor='ressource'>
                  <Button
                    variant='outlined'
                    component='span'
                    sx={{
                      width: '100%',
                      justifyContent: 'flex-start',
                      padding: 0,
                      border: '1px solid #E5E5E5',
                      backgroundColor: '#FFFFFF',
                      '& span': { backgroundColor: '#F3F3F9', color: '#746A6F', padding: '1rem' },
                      '& .MuiTouchRipple-root': { display: 'none' }
                    }}
                  >
                    <span>{t('choose__file')}</span>
                    <Typography sx={{
                      marginLeft: '1rem',
                      textTransform: 'none',
                      color: '#000',
                      fontSize: '0.875rem'
                    }}>{formik?.values?.resource?.name || formik?.values?.resource || ''}</Typography>
                  </Button>
                </label>
                {settings?.ressource?.resource && (
                  <Grid item xs={12} alignItems='center' justifyContent='space-between' sx={{ mb: '20px' }}>
                    <a href={`${process.env.NEXT_PUBLIC_API_WITHOUT}` + settings?.ressource?.resource} target='_blank'>
                      Voir la ressource
                    </a>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('pubDate')}
                </Typography>
                <TextField
                  fullWidth
                  size='medium'
                  variant='outlined'
                  name='publication_date'
                  id='publication_date'
                  margin='dense'
                  type='datetime-local'
                  value={formik.values.publication_date}
                  onChange={formik.handleChange}
                  error={formik.touched.publication_date && Boolean(formik.errors.publication_date)}
                />
              </Grid>
              <Grid item xs={12} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('status')}
                </Typography>
                <FormControl fullWidth size='medium' margin='dense'>
                  <Select
                    variant='outlined'
                    required
                    labelId='status'
                    id='status'
                    label={t('status')}
                    name='status'
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    margin='dense'
                  >
                    <MenuItem value={'1'}>{'Publié'}</MenuItem>
                    <MenuItem value={'0'}>{'Non Publié'}</MenuItem>
                  </Select>
                </FormControl>
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
export default RessourcesForm
