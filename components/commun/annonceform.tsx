'use client'

import Dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import { useState, useMemo } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Alert, AlertColor, Box, Button, Snackbar } from '@mui/material'
import { useAddAnnonceMutation } from '@/services/api/AnnoncesAPI'
import { getCookie } from 'cookies-next'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { useRouter } from 'next/navigation'

const FormControl = Dynamic<any>(() => import('@mui/material/FormControl'), { ssr: false })
const Select = Dynamic<any>(() => import('@mui/material/Select'), { ssr: false })
const Grid = Dynamic<any>(() => import('@mui/material/Grid'), { ssr: false })
const MenuItem = Dynamic<any>(() => import('@mui/material/MenuItem'), { ssr: false })
const FormHelperText = Dynamic<any>(() => import('@mui/material/FormHelperText'), { ssr: false })
const Typography = Dynamic<any>(() => import('@mui/material/Typography'), {
  ssr: false
})
const TextField = Dynamic<any>(() => import('@mui/material/TextField'), {
  ssr: false
})

const AnnonceForm = ({ settings, setIsLoading }: { settings?: any; setIsLoading?: any }) => {
  const { t } = useTranslation()

  const [addNewAnnonce] = useAddAnnonceMutation()
  const ReactQuill = useMemo(() => Dynamic(() => import('react-quill'), { ssr: false }), [])
  const [text, setText] = useState(settings?.annonce?.description || '')
  const token = getCookie('token')
  const router = useRouter()

  const validate = (values: any) => {
    const errors: any = {}

    if (!values.title || values.title === '') {
      errors.title = t('form__required')
    }

    if (!values.status) {
      errors.status = t('form__required')
    }
    if (!values.publish_date) {
      errors.publish_date = t('form__required')
    }
    if (!values.unpublish_date) {
      errors.unpublish_date = t('form__required')
    }
    if (values.unpublish_date && values.publish_date) {
      const publishDate = new Date(values.publish_date)
      const unpublishDate = new Date(values.unpublish_date)

      if (unpublishDate <= publishDate) {
        errors.unpublish_date = 'La date de fin doit être supérieure à la date de publication.'
      }
    }

    return errors
  }

  const initialFormValues: any = {
    title: settings?.annonce?.title || '',
    status: settings?.annonce?.status || '',
    publish_date: settings?.annonce?.publish_date?.substring(0, 10) || '',
    unpublish_date: settings?.annonce?.unpublish_date?.substring(0, 10) || ''
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
      if (settings?.annonce) {
        try {
          await fetch(`${settings?.url}`, {
            method: `${settings?.method}`,
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              title: values.title,
              description: text,
              status: values.status,
              publish_date: values.publish_date,
              unpublish_date: values.unpublish_date
            })
          })

          setToastType('success')
          setOpenToast(true)
          setToastMessage(t('successAffect'))
          setIsLoading(false)
          router.push('/espace-expert/annonces')
        } catch (error) {
          setToastType('error')
          setOpenToast(true)
          setToastMessage(t('error'))
          setIsLoading(false)
        }
      } else {
        addNewAnnonce({
          title: values.title,
          description: text,
          status: values.status,
          publish_date: values.publish_date,
          unpublish_date: values.unpublish_date
        })
          .unwrap()
          .then((response: any) => {
            if (response?._id) {
              setToastType('success')
              setOpenToast(true)
              setToastMessage(t('announcement__sent'))
              formik.resetForm()
              router.push('/espace-expert/annonces')
            }
            setIsLoading(false)
          })
          .catch((err: any) => {
            console.log(t('announcement__error'), err)
            setIsLoading(false)
          })
      }
    }
  })

  return (
    <>
      <form autoComplete='off' onSubmit={formik.handleSubmit}>
        <Grid
          marginTop='5px'
          spacing={2}
          container
          alignItems='center'
          justifyContent='space-between'
          sx={{ px: '3rem' }}
        >
          <Grid item xs={12} alignItems='center' justifyContent='space-between'>
            <Typography className='smallinputtitle' sx={{ mb: '5px' }}>
              {t('title')}
            </Typography>
            <TextField
              autoComplete='off'
              type='text'
              id='title'
              name='title'
              label={`${t('title')} ${t('announcement')}`}
              variant='outlined'
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} alignItems='center'>
            <Typography className='smallinputtitle' sx={{ mb: '5px' }} htmlFor='text'>
              {t('description')}
            </Typography>
            <ReactQuill value={text} onChange={setText} style={{ minHeight: '20px' }} theme="snow"
              modules={{
                toolbar: {
                  container: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link", "image", "video"],
                    ["code-block"],
                    ["clean"],
                  ],
                },
                clipboard: {
                  matchVisual: false,
                },
              }}
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "video",
                "code-block",
              ]} />
          </Grid>
          <Grid item xs={4} alignItems='center'>
            <Typography className='inputtitle'>{t('status')}</Typography>
            <FormControl fullWidth size='medium' margin='dense'>
              <Select
                sx={{ border: '1px solid #E5E5E5' }}
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
                <MenuItem value='1'>{'Publié'}</MenuItem>
                <MenuItem value='0'>{'Non Publié'}</MenuItem>
              </Select>
              <FormHelperText sx={{ color: '#d32f2f' }}>
                {(formik.touched.status && formik.errors.status) || '\u00a0'}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4} alignItems='center'>
            <Typography className='inputtitle'>{t('pubDate')}</Typography>
            <TextField
              sx={{ color: '#E5E5E5 !important' }}
              fullWidth
              size='medium'
              variant='outlined'
              name='publish_date'
              margin='dense'
              type='date'
              className='champs'
              value={formik.values.publish_date}
              onChange={formik.handleChange}
              error={formik.touched.publish_date && Boolean(formik.errors.publish_date)}
              helperText={(formik.touched.publish_date && formik.errors.publish_date) || '\u00a0'}
            />
          </Grid>
          <Grid item xs={4} alignItems='center'>
            <Typography className='inputtitle'>{t('endDate')}</Typography>
            <TextField
              fullWidth
              className='champs'
              size='medium'
              variant='outlined'
              name='unpublish_date'
              margin='dense'
              type='date'
              value={formik.values.unpublish_date}
              onChange={formik.handleChange}
              error={formik.touched.unpublish_date && Boolean(formik.errors.unpublish_date)}
              helperText={(formik.touched.unpublish_date && formik.errors.unpublish_date) || '\u00a0'}
            />
          </Grid>
          <Box mt='25px' mx='15px' mb='5rem'>
            <Button variant='contained' color='primary' type='submit' className='button' sx={{ marginLeft: 'auto', pb: '2rem', }}>
              <Typography className='button__typo'>{settings?.annonce ? 'Modifier' : 'Ajouter'}</Typography>
            </Button>
          </Box>
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
export default AnnonceForm
