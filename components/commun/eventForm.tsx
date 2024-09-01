'use client'
import * as React from 'react'
import Dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import { useState, useMemo } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Alert, AlertColor, Button, CircularProgress, Snackbar } from '@mui/material'
import { getCookie } from 'cookies-next'
import { useTranslation } from 'react-i18next'
import { useGetGroupsQuery } from '@/services/api/GroupsAPI'
import axios from 'axios'
import { useGetUsersQuery } from '@/services/api/UsersAPI'

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
const Autocomplete = Dynamic<any>(() => import('@mui/material/Autocomplete'), { ssr: false })

const EventForm = ({ settings }: any) => {
  const { t } = useTranslation()
  const token = getCookie('token')
  const ReactQuill = useMemo(() => Dynamic(() => import('react-quill'), { ssr: false }), [])
  const [description, setDescription] = useState(settings?.projet?.description ? settings?.projet?.description : '')
  const [selectedGuests, setSelectedGuests] = useState(settings?.event?.guests || [])
  const [combinedData, setcombinedData] = useState(settings?.event?.guests || [])
  const [isLoading, setIsLoading] = useState(false)

  const { data: groups } = useGetGroupsQuery({ status: '1' })
  const { data: usersData } = useGetUsersQuery({})

  React.useEffect(() => {
    const fetchData = async () => {
      if (groups && usersData) {
        const incubes = usersData?.filter((item: any) => item?.role === '4' && item?.status === 'Accepted')

        const incubesWithFullName = incubes?.map((incube: any) => {
          return {
            ...incube,
            name: incube.firstName + ' ' + incube.lastName
          }
        })

        const data = [...incubesWithFullName, ...groups]
        setcombinedData(data)
      }
    }

    fetchData()
  }, [groups, usersData])

  const validate = (values: any) => {
    const errors: any = {}

    if (!values.category) {
      errors.category = 'Champs Obligatoire'
    }
    if (!values.title) {
      errors.titre = 'Champs Obligatoire'
    }
    if (!values.start_date) {
      errors.start_date = 'Champs Obligatoire'
    }
    if (!values.end_date) {
      errors.end_date = 'Champs Obligatoire'
    }
    
    // if (!values.location) {
    //   errors.location = 'Champs Obligatoire'
    // }

    /* if (!values.eventType) {
      errors.eventType = 'Champs Obligatoire'
    }*/

    if (!values.status) {
      errors.status = 'Champs Obligatoire'
    }

    if (!selectedGuests || selectedGuests?.length === 0) {
      errors.guests = 'Champs Obligatoire'
    }

    if (values.end_of_publication && values.publication_date) {
      const publishDate = new Date(values.publication_date)
      const unpublishDate = new Date(values.end_of_publication)

      if (unpublishDate <= publishDate) {
        errors.end_of_publication = 'La date de fin doit être supérieure à la date de publication.'
      }
    }

    return errors
  }

  const initialFormValues: any = {
    category: settings?.event?.category || '',
    title: settings?.event?.title || '',
    start_date: settings?.event?.start_date?.split('T')[0] || '',
    end_date: settings?.event?.end_date?.split('T')[0] || '',
    location: settings?.event?.location || '',
    eventType: settings?.event?.eventType || '',
    description: description,
    guests: settings?.event?.guests || '',
    status: settings?.event?.status || '',
    publication_date: settings?.event?.publication_date?.split('T')[0] || '',
    end_of_publication: settings?.event?.end_of_publication?.split('T')[0] || '',
    seo_title: settings?.event?.seo_title || '',
    seo_alias: settings?.event?.seo_alias || '',
    seo_description: settings?.event?.seo_description || ''
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
      const requestData = { ...values, guests: selectedGuests?.map((item: any) => item?._id), description: description }
      try {
        let event
        if (settings?.method === 'PATCH') {
          await axios.patch(`${settings?.url}`, requestData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
        } else {
          const response = await axios.post(`${settings?.url}`, requestData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
          event = response.data
        }
        if (formik.values.eventType === 'onLine' && event) {
          console.log('event', event)
          const meetingData = { name: settings?.event?.title, event: settings?.event?._id }
          await axios.post(
            `${process.env.NEXT_PUBLIC_API}bigbluebutton/create-meeting`,
            { name: event?.event?.title, event: event?.event?._id },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          )
        }
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

  return (
    <>
      <form noValidate autoComplete='off' onSubmit={formik.handleSubmit} action=''>
        <Box sx={{ padding: '0px 20px 15px', borderBottom: '1px solid #E5E5E5', display: 'flex' }}>
          <Typography className='title2'>{settings?.event ? 'Modification évènement' : 'Nouvel évènement'}</Typography>
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
              <Grid item xs={12} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('category')}
                </Typography>
                <FormControl fullWidth size='medium' margin='dense'>
                  <Select
                    variant='outlined'
                    required
                    labelId='category'
                    id='category'
                    label='Catégorie'
                    name='category'
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    error={formik.touched.category && Boolean(formik.errors.category)}
                    margin='dense'
                  >
                    <MenuItem value='Group session'>{t('groupSession')}</MenuItem>
                    <MenuItem value='Individual session'>{t('individualSession')}</MenuItem>
                    <MenuItem value='Cours'>{t('course')}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
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
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} lg={6} alignItems='center'>
                <Typography className='inputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('startDate')}
                </Typography>
                <TextField
                  fullWidth
                  size='medium'
                  variant='outlined'
                  name='start_date'
                  margin='dense'
                  type='datetime-local'
                  value={formik.values.start_date}
                  onChange={formik.handleChange}
                  error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                />
              </Grid>
              <Grid item xs={12} lg={6} alignItems='center'>
                <Typography className='inputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('endDate')}
                </Typography>
                <TextField
                  fullWidth
                  size='medium'
                  variant='outlined'
                  name='end_date'
                  margin='dense'
                  type='datetime-local'
                  value={formik.values.end_date}
                  onChange={formik.handleChange}
                  error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                />
              </Grid>
              <Grid item xs={12} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  Type
                </Typography>
                <FormControl fullWidth size='medium' margin='dense'>
                  <Select
                    variant='outlined'
                    required
                    labelId='eventType'
                    id='eventType'
                    label='Type'
                    name='eventType'
                    value={formik.values.eventType}
                    onChange={formik.handleChange}
                    error={formik.touched.eventType && Boolean(formik.errors.eventType)}
                    margin='dense'
                  >
                    <MenuItem value='onLine'>{t('onLine')}</MenuItem>
                    <MenuItem value='onSite'>{t('onSite')}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {formik.values.eventType === 'onSite' ? (
                <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                  <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                    {t('location')}
                  </Typography>
                  <TextField
                    autoComplete='off'
                    type='text'
                    id='location'
                    name='location'
                    label={t('location')}
                    variant='outlined'
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    error={formik.touched.location && Boolean(formik.errors.location)}
                    sx={{ width: '100%' }}
                  />
                </Grid>
              ) : // : formik.values.eventType === 'onLine' ? (
                //   <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                //     <Button
                //       variant='contained'
                //       color='primary'
                //       type='submit'
                //       className='button'
                //       sx={{ marginLeft: 'auto' }}
                //     >
                //       <Typography className='button__typo'>{t('Add a video conference')}</Typography>
                //     </Button>
                //   </Grid>
                // )
                null}

              <Grid item xs={12} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px' }} htmlFor='richText'>
                  Description
                </Typography>
                <ReactQuill value={description} onChange={setDescription} style={{ minHeight: '20px' }} theme="snow"
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
              <Grid item xs={12} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('guests')}
                </Typography>
                {groups && (
                  <Autocomplete
                    value={selectedGuests}
                    multiple
                    id='groups'
                    label={t('groups')}
                    options={combinedData}
                    getOptionLabel={(option: any) => option?.name}
                    onChange={(e: any, values: any) => setSelectedGuests(values)}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        variant='standard'
                        placeholder='Choisir incubé'
                        sx={{ border: '1px solid #b7b7b7', borderRadius: '4px' }}
                      />
                    )}
                  />
                )}
              </Grid>
              <Grid item xs={4} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('Status')}
                </Typography>
                <FormControl fullWidth size='medium' margin='dense'>
                  <Select
                    variant='outlined'
                    required
                    labelId='status'
                    id='status'
                    label={t('Status')}
                    name='status'
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    margin='dense'
                  >
                    <MenuItem value='1'>Publié</MenuItem>
                    <MenuItem value='0'>Non Publié</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('startOfPublication')}
                </Typography>
                <TextField
                  fullWidth
                  size='medium'
                  variant='outlined'
                  name='publication_date'
                  margin='dense'
                  type='datetime-local'
                  value={formik.values.publication_date}
                  onChange={formik.handleChange}
                  error={formik.touched.publication_date && Boolean(formik.errors.publication_date)}
                />
              </Grid>
              <Grid item xs={4} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('endOfPublication')}
                </Typography>
                <TextField
                  fullWidth
                  size='medium'
                  variant='outlined'
                  name='end_of_publication'
                  margin='dense'
                  type='datetime-local'
                  value={formik.values.end_of_publication}
                  onChange={formik.handleChange}
                  error={formik.touched.end_of_publication && Boolean(formik.errors.end_of_publication)}
                  helperText={
                    formik?.touched?.end_of_publication ? (formik?.errors?.end_of_publication as string) : '\u00a0'
                  }
                />
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between' display='flex' mt='20px'>
                <Typography className='subtitle'>SEO</Typography>
                <Box sx={{ width: '100%', height: '1px', backgroundColor: '#E5E5E5', ml: '10px' }}></Box>
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('title')}
                </Typography>
                <TextField
                  autoComplete='off'
                  type='text'
                  id='seo_title'
                  name='seo_title'
                  label='Titre'
                  variant='outlined'
                  value={formik.values.seo_title}
                  onChange={formik.handleChange}
                  error={formik.touched.seo_title && Boolean(formik.errors.seo_title)}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  Alias
                </Typography>
                <TextField
                  autoComplete='off'
                  type='text'
                  id='seo_alias'
                  name='seo_alias'
                  label='Alias'
                  variant='outlined'
                  value={formik.values.seo_alias}
                  onChange={formik.handleChange}
                  error={formik.touched.seo_alias && Boolean(formik.errors.seo_alias)}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  Description
                </Typography>
                <TextField
                  autoComplete='off'
                  type='text'
                  id='seo_description'
                  name='seo_description'
                  label='Description'
                  variant='outlined'
                  value={formik.values.seo_description}
                  onChange={formik.handleChange}
                  error={formik.touched.seo_description && Boolean(formik.errors.seo_description)}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>
            <Button
              sx={{ marginTop: '2rem', marginLeft: 'auto' }}
              variant='contained'
              color='primary'
              type='submit'
              className='button'
            >
              <Typography className='button__typo'>{t('save')}</Typography>
            </Button>
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
export default EventForm
