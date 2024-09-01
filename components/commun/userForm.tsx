'use client'
import * as React from 'react'
import Dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import 'react-quill/dist/quill.snow.css'
import { Alert, AlertColor, Button, CircularProgress, Container, InputLabel, Snackbar } from '@mui/material'
import { getCookie } from 'cookies-next'
import { useGetProjetsQuery } from '@/services/api/ProjetAPI'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LangueContext'

const Box = Dynamic<any>(() => import('@mui/material/Box'), { ssr: false })
const FormHelperText = Dynamic<any>(() => import('@mui/material/FormHelperText'), { ssr: false })
const Typography = Dynamic<any>(() => import('@mui/material/Typography'), {
  ssr: false
})

const TextField = Dynamic<any>(() => import('@mui/material/TextField'), {
  ssr: false
})
const MenuItem = Dynamic<any>(() => import('@mui/material/MenuItem'), { ssr: false })
const Select = Dynamic<any>(() => import('@mui/material/Select'), { ssr: false })

const UserForm = ({ settings, setIsUpdated, isUpdated, espace , page }: any) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const token = getCookie('token')

  const validate = (values: any) => {
    const errors: any = {}

    if (!values?.firstName) {
      errors.firstName = 'Champs Obligatoire'
    }
    if (!values?.lastName) {
      errors.lastName = 'Champs Obligatoire'
    }
    if (!values?.email) {
      errors.email = 'Champs Obligatoire'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values?.email)) {
      errors.email = 'Format invalide'
    }

    if (!values?.status) {
      errors.status = 'Champs Obligatoire'
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
    firstName: settings?.user?.firstName || '',
    lastName: settings?.user?.lastName || '',
    image: settings?.user?.image || '',
    email: settings?.user?.email || '',
    status: settings?.user?.status || '',
    project: settings?.user?.project || ''
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
      formData.append('projects', values?.project)
      formData.append('image', values?.image)
      formData.append('role', '2')

      try {
        await fetch(`${settings?.url}`, {
          method: `${settings?.method}`,
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        })
          .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`)
            }
            setOpenToast(true)
            setToastMessage('Utilisateur crée avec succès')
            if (isUpdated !== undefined) setIsUpdated(!isUpdated)

            return res.json()
          })
          .then(async data => {
            await axios.put(
              `${process.env.NEXT_PUBLIC_API}users/${data?.user?._id || settings?.user?._id}/status`,
              {
                status: values.status
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            )
          })
        setToastType('success')
        setOpenToast(true)
        setToastMessage('Action effectué avec succès')
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setToastType('error')
        setOpenToast(true)
        setToastMessage('Une erreur est survenue')
      }
    }
  })
  const { language } = useLanguage()
  const { data: projects }: any = useGetProjetsQuery({ lang: language })

  const { t } = useTranslation()

  const router = useRouter()

  return (
    <>
      <form onSubmit={formik?.handleSubmit}>
        <Box
          className='userform'
          sx={{
            padding: '0 20px 15px',
            borderBottom: '1px solid #E5E5E5',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            rowGap: '0.75rem'
          }}
        >
          {page === 'modif' ? (
            <Typography className='title2' component='h1'>
              Modifier administrateur
            </Typography>
          ) : (
            <Typography className='title2' component='h1'>
              Nouvel administrateur
            </Typography>
          )}

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
            onClick={() => router.push(`/${espace}/adminprojet`)}
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

        <Container
          maxWidth={'md'}
          sx={{
            mt: '30px',
            ml: '20px',
            mb: '10rem',
            marginInlineStart: '0',
            '& .form__wrapper': {
              marginBottom: '1.25rem'
            }
          }}
        >
          <Box className='form__wrapper'>
            <InputLabel htmlFor='firstName' className='smallinputtitle'>
              Nom
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
              placeholder='Nom'
              value={formik?.values?.firstName}
              onChange={formik?.handleChange}
              error={formik?.touched?.firstName && Boolean(formik?.errors?.firstName)}
              helperText={formik?.touched?.firstName ? (formik?.errors?.firstName as string) : '\u00a0'}
            />
          </Box>
          <Box className='form__wrapper'>
            <InputLabel htmlFor='lastName' className='smallinputtitle'>
              Prénom
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
              placeholder='Prénom'
              value={formik?.values?.lastName}
              onChange={formik?.handleChange}
              error={formik?.touched?.lastName && Boolean(formik?.errors?.lastName)}
              helperText={formik?.touched?.lastName ? (formik?.errors?.lastName as string) : '\u00a0'}
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
              Photo
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
                <span>Choisir un fichier</span>
                {formik?.values?.image && <p>{formik?.values?.image?.name}</p>}
              </Button>
            </label>
            <p className='error'> {formik?.touched?.image && formik?.errors?.image && `${formik?.errors?.image}`}</p>
            {settings?.user?.image && settings?.user?.image !== 'undefined' && (
              <img
                src={`${process.env.NEXT_PUBLIC_API_WITHOUTSLASH}` + settings?.user?.image}
                alt='User'
                width={200}
                height={100}
              />
            )}
          </Box>
          <Box className='form__wrapper'>
            <InputLabel htmlFor='email' className='smallinputtitle'>
              Email
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
              placeholder='Email'
              value={formik?.values?.email}
              onChange={formik?.handleChange}
              error={formik?.touched?.email && Boolean(formik?.errors?.email)}
              helperText={formik?.touched?.email ? (formik?.errors?.email as string) : '\u00a0'}
            />
          </Box>

          <Box className='form__wrapper'>
            <InputLabel id='status-label' htmlFor='status' className='smallinputtitle' sx={{ marginBottom: '0.5rem' }}>
              Status
            </InputLabel>
            <Select
              labelId='status-label'
              id='status'
              value={formik?.values?.status}
              onChange={formik?.handleChange}
              fullWidth
              name={'status'}
              error={formik?.touched?.status && Boolean(formik?.errors?.status)}
            >
              <MenuItem value='Accepted'>Actif</MenuItem>
              <MenuItem value='Denied'>Inactif</MenuItem>
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
          <Box className='form__wrapper'>
            <InputLabel
              id='project-label'
              htmlFor='project'
              className='smallinputtitle'
              sx={{ marginBottom: '0.5rem' }}
            >
              project
            </InputLabel>
            <Select
              labelId='project-label'
              id='project'
              value={formik?.values?.project}
              onChange={formik?.handleChange}
              fullWidth
              name={'project'}
              error={formik?.touched?.project && Boolean(formik?.errors?.project)}
            >
              {projects &&
                projects.map((project: any) => {
                  return (
                    <MenuItem key={project._id} value={project._id}>
                      {project.title}
                    </MenuItem>
                  )
                })}
            </Select>

            <FormHelperText
              sx={{
                color: '#d32f2f',
                marginInline: '14px',
                marginTop: '3px'
              }}
            >
              {formik?.touched?.project ? (formik?.errors?.project as string) : '\u00a0'}
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
export default UserForm
