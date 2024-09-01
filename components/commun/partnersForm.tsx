'use client'

import * as React from 'react'
import Dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import 'react-quill/dist/quill.snow.css'
import { Alert, AlertColor, Button, CircularProgress, Snackbar } from '@mui/material'
import { getCookie } from 'cookies-next'
import { useTranslation } from 'react-i18next'
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

const PartnersForm = ({ settings }: any) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { t } = useTranslation()

  const token = getCookie('token')

  const validate = (values: any) => {
    const errors: any = {}

    if (!values.label) {
      errors.label = t('form__required')
    }
    if (!values.status) {
      errors.status = t('form__required')
    }
    if (!values.lien) {
      errors.lien = t('form__required')
    }
    if (!values.logo) {
      errors.logo = t('form__required')
    }

    return errors
  }

  const handleImageFileChange = (event: any) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      formik.setFieldValue('logo', selectedFile)
    }
  }
  const initialFormValues: any = {
    label: settings?.partner?.label || '',
    lien: settings?.partner?.lien || '',
    logo: settings?.partner?.logo || '',
    status: settings?.partner?.status || ''
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
      const formData = new FormData()
      formData.append('lien', values.lien)
      formData.append('label', values.label)
      formData.append('logo', values.logo)
      formData.append('status', values.status)

      try {
        await fetch(`${settings?.url}`, {
          method: `${settings?.method}`,
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        })
        setToastType('success')
        setOpenToast(true)
        setToastMessage('Action effectué avec succès')
        setIsLoading(false)
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
      <form autoComplete='off' onSubmit={formik.handleSubmit}>
        <Box sx={{ padding: '0px 20px 15px ', borderBottom: '1px solid #E5E5E5', display: 'flex' }}>
          <Typography className='title2'>{settings?.partner ? t('Modif partner') : t('New Partner lower')}</Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <Button
              variant='text'
              sx={{
                marginLeft: 'auto',
                color: '#05264A',
                marginRight: '1rem',
                ':hover': { backgroundColor: 'transparent', color: 'blue' }
              }}
              onClick={() => router.push(`/espace-admin/partners`)}
            >
              <Typography className=''>{t('return')}</Typography>
            </Button>
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
        </Box>
        <Grid container spacing={1}>
          <Grid item lg={8} xs={12} sx={{ mt: '30px', ml: '20px', mb: '10rem' }}>
            <Grid spacing={2} container>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('label')}
                </Typography>
                <TextField
                  autoComplete='off'
                  type='text'
                  id='label'
                  name='label'
                  label={t('label')}
                  variant='outlined'
                  value={formik.values.label}
                  onChange={formik.handleChange}
                  error={formik.touched.label && Boolean(formik.errors.label)}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '10px', ml: '5px' }}>
                  Logo
                </Typography>
                <input
                  style={{ display: 'none' }}
                  id='logo'
                  name='logo'
                  type='file'
                  accept='image/png, image/svg'
                  onChange={handleImageFileChange}
                />
                <label htmlFor='logo'>
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
                    <Typography
                      sx={{
                        marginLeft: '1rem',
                        textTransform: 'none',
                        color: '#000',
                        fontSize: '0.875rem'
                      }}
                    >
                      {formik?.values?.logo?.name || formik?.values?.logo || ''}
                    </Typography>
                  </Button>
                  <Typography color= 'red'>{(formik.touched.logo && formik.errors.logo) || '\u00a0'}</Typography>
                </label>
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('link')}
                </Typography>
                <TextField
                  autoComplete='off'
                  type='text'
                  id='lien'
                  name='lien'
                  label={t('link')}
                  variant='outlined'
                  value={formik.values.lien}
                  onChange={formik.handleChange}
                  error={formik.touched.lien && Boolean(formik.errors.lien)}
                  sx={{ width: '100%' }}
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
                    <MenuItem value={'1'}>{t('published')}</MenuItem>
                    <MenuItem value={'0'}>{t('unpublished')}</MenuItem>
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
export default PartnersForm
