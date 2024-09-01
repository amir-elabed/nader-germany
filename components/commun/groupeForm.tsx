'use client'

import { useState } from 'react'
import Dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import 'react-quill/dist/quill.snow.css'
import { Alert, AlertColor, Autocomplete, Button, CircularProgress, Snackbar } from '@mui/material'
import { getCookie } from 'cookies-next'
import { useAddGroupMutation } from '@/services/api/GroupsAPI'
import { useGetUsersQuery } from '@/services/api/UsersAPI'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import ReactQuill from 'react-quill'
import React from 'react'
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

const GroupesForm = ({ settings, espace }: any) => {
  const { data: incubes }: any = useGetUsersQuery({ role: '4', status: 'Accepted' })
  const [addNewGroup] = useAddGroupMutation()
  const token = getCookie('token')
  const [selectedIncubes, setSelectedIncubes] = useState(settings?.group?.users || [])
  const router = useRouter()
  const [richText, setRichText] = useState(settings?.group?.description || '')

  const { t } = useTranslation()

  const validate = (values: any) => {
    const errors: any = {}

    if (!values.name) {
      errors.name = t('form__required')
    }
    if (!values.status) {
      errors.status = t('form__required')
    }
  }

  const initialFormValues: any = {
    name: settings?.group?.name || '',
    members: settings?.group?.members || '',
    status: settings?.group?.status || '',
    description: settings?.group?.description || ''
  }

  const [openToast, setOpenToast] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
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
      if (settings?.group) {
        const dataToSend = {
          name: values.name,
          status: values.status,
          users: selectedIncubes?.map((item: any) => item?._id),
          description: richText
        }
        try {
          await axios.patch(`${settings?.url}`, dataToSend, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}` // Ajoutez le token dans les headers
            }
          })

          setToastType('success')
          setOpenToast(true)
          setToastMessage('Action effectué avec succès')
          setIsLoading(false)
          router.push('/espace-expert/groupes')
        } catch (error) {
          setToastType('error')
          setOpenToast(true)
          setToastMessage('Une erreur est survenue')
          setIsLoading(false)
        }
      } else {
        addNewGroup({
          name: values.name,
          status: values.status,
          users: selectedIncubes?.map((item: any) => item?._id),
          description: richText
        })
          .unwrap()
          .then((response: any) => {
            if (response?.success) {
              setToastType('success')
              setOpenToast(true)
              setToastMessage('Groupe ajouté !')
              setIsLoading(false)
              formik.resetForm()
              router.push('/espace-expert/groupes')
            }
          })
          .catch((err: any) => {
            console.log('error in creating groups !', err)
            setIsLoading(false)
          })
      }
    }
  })

  return (
    <>
      <form autoComplete='off' onSubmit={formik.handleSubmit}>
        <Box sx={{ padding: '20px', borderBottom: '1px solid #E5E5E5', display: 'flex' }}>
          <Typography className='title2'>{settings?.group ? 'Modification groupe' : 'Nouveau groupe'}</Typography>

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
            onClick={() => router.push(`/${espace}/groupes`)}
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
                    '&.MuiCircularProgress-root': {
                      width: '21px!important',
                      height: '21px!important',
                      color: '#fff'
                    }
                  }}
                />
              ) : (
                t('form__save')
              )}
            </Typography>
          </Button>
        </Box>
        <Grid container spacing={1} sx={{ padding: '1rem', mb: '10rem' }}>
          <Grid item lg={8} xs={12}>
            <Grid spacing={2} container>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('form__group__name')}
                </Typography>
                <TextField
                  autoComplete='off'
                  type='text'
                  id='name'
                  name='name'
                  label={t('form__group__name')}
                  variant='outlined'
                  title
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('form__group__membres')}
                </Typography>
                {incubes && (
                  <Autocomplete
                    value={selectedIncubes}
                    multiple
                    id='members'
                    options={incubes}
                    getOptionLabel={(option: any) => option?.firstName + ' ' + option?.lastName}
                    onChange={(e: any, values: any) => setSelectedIncubes(values)}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        variant='standard'
                        placeholder='Choisir incubé'
                        sx={{ border: '1px solid #b7b7b7', pl: '10px', py: '0.5rem', borderRadius: '4px' }}
                      />
                    )}
                  />
                )}
              </Grid>
              <Grid item xs={12} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('form__status')}
                </Typography>
                <FormControl fullWidth size='medium' margin='dense'>
                  <Select
                    variant='outlined'
                    required
                    labelId='status'
                    id='status'
                    label={t('form__status')}
                    name='status'
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    margin='dense'
                  >
                    <MenuItem value='1'>{'Publié'}</MenuItem>
                    <MenuItem value='0'>{'Non Publié'}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px' }} htmlFor='richText'>
                  {t('description')}
                </Typography>
                <ReactQuill value={richText} onChange={setRichText} style={{ minHeight: '20px' }} theme="snow"
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
export default GroupesForm
