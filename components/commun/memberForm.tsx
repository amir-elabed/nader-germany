'use client'
import * as React from 'react'
import Dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import { getCookie } from 'cookies-next'
import {
  Alert,
  AlertColor,
  Button,
  CircularProgress,
  Container,
  FormHelperText,
  InputLabel,
  Snackbar
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { usePathname, useRouter } from 'next/navigation'

const Box = Dynamic<any>(() => import('@mui/material/Box'), { ssr: false })
const Typography = Dynamic<any>(() => import('@mui/material/Typography'), {
  ssr: false
})

const TextField = Dynamic<any>(() => import('@mui/material/TextField'), {
  ssr: false
})
const MenuItem = Dynamic<any>(() => import('@mui/material/MenuItem'), { ssr: false })
const Select = Dynamic<any>(() => import('@mui/material/Select'), { ssr: false })

const MemberForm = ({ settings, espace }: any) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = React.useState(false)

  const token = getCookie('token')
  const validate = (values: any) => {
    const errors: any = {}

    if (!values?.firstName) {
      errors.firstName = t('form__required')
    }
    if (!values?.lastName) {
      errors.lastName = t('form__required')
    }
    if (!values?.email) {
      errors.email = t('form__required')
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values?.email)) {
      errors.email = t('form__invalid')
    }
    if (!values?.image) {
      errors.image = t('form__required')
    }

    if (!values?.status) {
      errors.status = t('form__required')
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = t('form__required');
    } else if (!/^\+?[0-9]{6,14}$/.test(values.phoneNumber)) {
      errors.phoneNumber = 'Format de numéro incorrect. Exemple: +1234567890 ou 1234567890';
    }

    if (!values?.function) {
      errors.function = t('form__required')
    }

    return errors
  }

  const handleFileChange = (event: any, fieldName: string) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      formik?.setFieldValue(fieldName, selectedFile)
    }
  }

  const initialFormValues: any = {
    firstName: settings?.team?.firstName || '',
    lastName: settings?.team?.lastName || '',
    image: settings?.team?.image || '',
    email: settings?.team?.email || '',
    status: settings?.team?.status || '',
    function: settings?.team?.function || '',
    phoneNumber: settings?.team?.phoneNumber || ''
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
      formData.append('firstName', values?.firstName)
      formData.append('lastName', values?.lastName)
      formData.append('email', values?.email)
      formData.append('status', values?.status)
      formData.append('image', values?.image)
      formData.append('phoneNumber', values?.phoneNumber)
      formData.append('function', values?.function)
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
  const pathname = usePathname()

  return (
    <>
      <form onSubmit={formik?.handleSubmit}>
        <Box
          sx={{
            padding: '0 20px 15px',
            borderBottom: '1px solid #E5E5E5',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            rowGap: '0.75rem'
          }}
        >
          <Typography className='title2'>
            {pathname?.includes('modification') ? t('Modif Member') : t('New Member')}
          </Typography>
          <Button
            variant='text'
            color='primary'
            sx={{
              marginLeft: 'auto',
              marginRight: '1rem',
              paddingInline: '2rem',
              '&:hover': {
                backgroundColor: 'rgb(10 78 150 / 7%)',
              }
            }}
            onClick={() => router.push(`/${espace}/equipe`)}
          >
            <Typography
              sx={{
                color: '#0A4E96'
              }}
            >
              {t('return')}
            </Typography>
          </Button>
          <Button variant='contained' color='primary' className='button' type='submit'>
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

        <Container maxWidth={'md'} sx={{ marginInlineStart: 0, mt: '30px', mb: '10rem' }}>
          <Box className='form__wrapper'>
            <InputLabel htmlFor='firstName' className='smallinputtitle'>
              {t('name')}
            </InputLabel>
            <TextField
              className='form__input'
              fullWidth
              size='medium'
              variant='outlined'
              name='firstName'
              margin='dense'
              type='text'
              id='firstName'
              placeholder={t('name')}
              value={formik?.values?.firstName}
              onChange={formik?.handleChange}
              error={formik?.touched?.firstName && Boolean(formik?.errors?.firstName)}
              helperText={formik?.touched?.firstName ? (formik?.errors?.firstName as string) : '\u00a0'}
            />
          </Box>
          <Box className='form__wrapper'>
            <InputLabel htmlFor='lastName' className='smallinputtitle'>
              {t('lastName')}
            </InputLabel>
            <TextField
              className='form__input'
              fullWidth
              size='medium'
              variant='outlined'
              name='lastName'
              margin='dense'
              type='text'
              id='lastName'
              placeholder={t('lastName')}
              value={formik?.values?.lastName}
              onChange={formik?.handleChange}
              error={formik?.touched?.lastName && Boolean(formik?.errors?.lastName)}
              helperText={formik?.touched?.lastName ? (formik?.errors?.lastName as string) : '\u00a0'}
            />
          </Box>

          <Box className='form__wrapper'>
            <InputLabel htmlFor='function' className='smallinputtitle'>
              {t('function')}
            </InputLabel>
            <TextField
              className='form__input'
              fullWidth
              size='medium'
              variant='outlined'
              name='function'
              margin='dense'
              type='text'
              id={t('function')}
              placeholder='function'
              value={formik?.values?.function}
              onChange={formik?.handleChange}
              error={formik?.touched?.function && Boolean(formik?.errors?.function)}
              helperText={formik?.touched?.function ? (formik?.errors?.function as string) : '\u00a0'}
            />
          </Box>

          <Box
            className='form__wrapper'
            sx={{
              '& .error': {
                color: '#d32f2f',
                marginInline: '14px',
                marginTop: '3px',
                fontWeight: '400',
                fontSize: '0.75rem',
                textAlign: 'left',
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
              }
            }}
          >
            <InputLabel htmlFor='image' className={`smallinputtitle`} sx={{ mb: '10px', ml: '5px' }}>
              {t('photo')}
            </InputLabel>
            <input
              style={{ display: 'none' }}
              id='image'
              name='image'
              type='file'
              accept='image/jpg, image/png'
              onChange={e => handleFileChange(e, 'image')}
            />
            <label htmlFor='image'>
              <Button
                variant='outlined'
                component='span'
                sx={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  padding: 0,
                  border: '1px solid',
                  backgroundColor: '#FFFFFF',
                  borderColor: formik?.touched?.image && formik?.errors?.image ? '#d32f2f' : '#E5E5E5',
                  '& span': { backgroundColor: '#F3F3F9', color: '#746A6F', padding: '1rem' },
                  '& .MuiTouchRipple-root': { display: 'none' },
                  '& p': {
                    paddingLeft: '1.25rem'
                  }
                }}
              >
                <span>{t('choose__file')}</span>
                {formik?.values?.image && <p>{formik?.values?.image?.name || formik?.values?.image}</p>}
              </Button>
            </label>
            <p className='error'> {formik?.touched?.image && formik?.errors?.image && `${formik?.errors?.image}`}</p>
          </Box>
          <Box className='form__wrapper'>
            <InputLabel htmlFor='email' className='smallinputtitle'>
              {t('tableHeader__email')}
            </InputLabel>
            <TextField
              className='form__input'
              fullWidth
              size='medium'
              variant='outlined'
              name='email'
              margin='dense'
              type='email'
              id='email'
              placeholder={t('tableHeader__email')}
              value={formik?.values?.email}
              onChange={formik?.handleChange}
              error={formik?.touched?.email && Boolean(formik?.errors?.email)}
              helperText={formik?.touched?.email ? (formik?.errors?.email as string) : '\u00a0'}
            />
          </Box>

          <Box className='form__wrapper'>
            <InputLabel htmlFor='phoneNumber' className='smallinputtitle'>
              {t('tableHeader__tel')}
            </InputLabel>
            <TextField
              className='form__input'
              fullWidth
              size='medium'
              variant='outlined'
              name='phoneNumber'
              margin='dense'
              type='tel'
              id='phoneNumber'
              placeholder={t('tableHeader__tel')}
              value={formik?.values?.phoneNumber}
              onChange={formik?.handleChange}
              error={formik?.touched?.phoneNumber && Boolean(formik?.errors?.phoneNumber)}
              helperText={formik?.touched?.phoneNumber ? (formik?.errors?.phoneNumber as string) : '\u00a0'}
            />
          </Box>

          <Box className='form__wrapper'>
            <InputLabel id='status-label' htmlFor='status' className='smallinputtitle' sx={{ marginBottom: '0.5rem' }}>
              {t('status')}
            </InputLabel>
            <Select
              labelId='status-label'
              id='status'
              value={formik?.values?.status}
              onChange={formik?.handleChange}
              fullWidth
              name='status'
              error={formik?.touched?.status && Boolean(formik?.errors?.status)}
            >
              <MenuItem value={'1'}>{t('published')}</MenuItem>
              <MenuItem value={'0'}>{t('unpublished')}</MenuItem>
            </Select>

            <FormHelperText
              sx={{
                color: '#d32f2f',
                marginInline: '14px',
                marginTop: '3px'
              }}
            >
              {formik?.touched?.status ? (formik?.errors?.status as string) : '\u00a0'}
            </FormHelperText>
          </Box>
        </Container>
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
export default MemberForm
