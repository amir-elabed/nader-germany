'use client'

import * as React from 'react'
import Dynamic from 'next/dynamic'
import { useState, useMemo } from 'react'
import { useFormik } from 'formik'
import 'react-quill/dist/quill.snow.css'
import { Alert, AlertColor, Button, CircularProgress, Snackbar } from '@mui/material'
import { getCookie } from 'cookies-next'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { convertToSlug } from '@/utils/convertToSlug'

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

const Pageform = ({ settings, espace }: any) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { t } = useTranslation()

  const token = getCookie('token')
  const ReactQuill = useMemo(() => Dynamic(() => import('react-quill'), { ssr: false }), [])

  const validate = (values: any) => {
    const errors: any = {}

    if (!title) {
      alert('title is required')
    }
    if (!values.status) {
      errors.status = t('form__required')
    }
    if (!values.image) {
      errors.image = t('form__required')
    }

    return errors
  }

  const handleImageFileChange = (event: any) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      formik.setFieldValue('image', selectedFile)
    }
  }

  const initialFormValues: any = {
    title: settings?.page?.title || '',
    image: settings?.page?.image || '',
    status: settings?.page?.status || '',
    seo_title: settings?.page?.seo_title || '',
    seo_alias: settings?.page?.seo_alias || '',
    seo_description: settings?.page?.seo_description || ''
  }

  const [openToast, setOpenToast] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState('')
  const [toastType, setToastType] = React.useState('success')

  const [languageTitle, setLanguageTitle] = React.useState({ fr: true, en: false, it: false })
  const [title, setTitle] = useState({
    fr: settings?.page?.fr?.title || '',
    en: settings?.page?.en?.title || '',
    it: settings?.page?.it?.title || ''
  })
  const handleChangeTitle = (e: any) => {
    if (languageTitle?.fr) {
      setTitle({ ...title, fr: e?.target?.value })
    } else if (languageTitle?.en) {
      setTitle({ ...title, en: e?.target?.value })
    } else if (languageTitle?.it) {
      setTitle({ ...title, it: e?.target?.value })
    }
  }

  const [languageDescription, setLanguageDescription] = React.useState({ fr: true, en: false, it: false })
  const [description, setDescription] = useState({
    fr: settings?.page?.fr?.description || '',
    en: settings?.page?.en?.description || '',
    it: settings?.page?.it?.description || ''
  })
  const handleChangeDescription = (e: any) => {
    if (languageDescription?.fr && e !== '<p><br></p>') {
      setDescription({ ...description, fr: e })
    } else if (languageDescription?.en && e !== '<p><br></p>') {
      setDescription({ ...description, en: e })
    } else if (languageDescription?.it && e !== '<p><br></p>') {
      setDescription({ ...description, it: e })
    }
  }

  const [languageTitleSeo, setLanguageTitleSeo] = React.useState({ fr: true, en: false, it: false })
  const [titleSeo, setTitleSeo] = useState({
    fr: settings?.page?.fr?.title || '',
    en: settings?.page?.en?.title || '',
    it: settings?.page?.it?.title || ''
  })
  const handleChangeTitleSeo = (e: any) => {
    if (languageTitleSeo?.fr) {
      setTitleSeo({ ...titleSeo, fr: e?.target?.value })
    } else if (languageTitleSeo?.en) {
      setTitleSeo({ ...titleSeo, en: e?.target?.value })
    } else if (languageTitleSeo?.it) {
      setTitleSeo({ ...titleSeo, it: e?.target?.value })
    }
  }

  const [languageAliasSeo, setLanguageAliasSeo] = React.useState({ fr: true, en: false, it: false })
  const [aliasSeo, setAliasSeo] = useState({
    fr: settings?.page?.fr?.title || '',
    en: settings?.page?.en?.title || '',
    it: settings?.page?.it?.title || ''
  })
  const handleChangeAliasSeo = (e: any) => {
    if (languageAliasSeo?.fr) {
      setAliasSeo({ ...aliasSeo, fr: e?.target?.value })
    } else if (languageAliasSeo?.en) {
      setAliasSeo({ ...aliasSeo, en: e?.target?.value })
    } else if (languageAliasSeo?.it) {
      setAliasSeo({ ...aliasSeo, it: e?.target?.value })
    }
  }

  const [languageDescriptionSeo, setLanguageDescriptionSeo] = React.useState({ fr: true, en: false, it: false })
  const [descriptionSeo, setDescriptionSeo] = useState({
    fr: settings?.page?.fr?.title || '',
    en: settings?.page?.en?.title || '',
    it: settings?.page?.it?.title || ''
  })
  const handleChangeDescriptionSeo = (e: any) => {
    if (languageDescriptionSeo?.fr) {
      setDescriptionSeo({ ...descriptionSeo, fr: e?.target?.value })
    } else if (languageDescriptionSeo?.en) {
      setDescriptionSeo({ ...descriptionSeo, en: e?.target?.value })
    } else if (languageDescriptionSeo?.it) {
      setDescriptionSeo({ ...descriptionSeo, it: e?.target?.value })
    }
  }

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

      if (title?.fr) formData.append(`fr.title`, title?.fr)
      if (title?.en) formData.append(`en.title`, title?.en)
      if (title?.it) formData.append(`it.title`, title?.it)

      if (description?.fr) formData.append(`fr.description`, description?.fr)
      if (description?.en) formData.append(`en.description`, description?.en)
      if (description?.it) formData.append(`it.description`, description?.it)

      formData.append('image', values.image)
      formData.append('status', values.status)
      formData.append('slug', convertToSlug(title?.fr))

      if (titleSeo?.fr) formData.append(`fr.seo_title`, titleSeo?.fr)
      if (titleSeo?.en) formData.append(`en.seo_title`, titleSeo?.en)
      if (titleSeo?.it) formData.append(`it.seo_title`, titleSeo?.it)

      if (aliasSeo?.fr) formData.append(`fr.seo_alias`, aliasSeo?.fr)
      if (aliasSeo?.en) formData.append(`en.seo_alias`, aliasSeo?.en)
      if (aliasSeo?.it) formData.append(`it.seo_alias`, aliasSeo?.it)

      if (descriptionSeo?.fr) formData.append(`fr.seo_description`, descriptionSeo?.fr)
      if (descriptionSeo?.en) formData.append(`en.seo_description`, descriptionSeo?.en)
      if (descriptionSeo?.it) formData.append(`it.seo_description`, descriptionSeo?.it)

      if (settings?.projectId) formData.append('projectId', settings?.projectId)

      try {
        await fetch(`${settings?.url}`, {
          method: `${settings?.method}`,
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        }).then(response => {
          if (response.ok) {
            setToastType('success')
            setOpenToast(true)
            setToastMessage('Action effectué avec succès')
            setIsLoading(false)
          } else {
            setToastType('error')
            setOpenToast(true)
            setToastMessage('Une erreur est survenue')
            setIsLoading(false)
          }
        })
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
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ padding: '0 20px 15px', borderBottom: '1px solid #E5E5E5', display: 'flex' }}>
          <Typography className='title2'>{settings?.page ? t('Modif page') : t('New Page lower')}</Typography>
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
            onClick={() => router.push(`/${espace}/pages`)}
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
                  value={languageTitle?.fr ? title?.fr : languageTitle?.en ? title?.en : title?.it}
                  onChange={(e: any) => handleChangeTitle(e)}
                  sx={{ width: '100%' }}
                />
                <Box className='languageSelector__wrapper'>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorTitle'
                      id='languageSelectorTitle__fr'
                      defaultChecked
                      checked={languageTitle?.fr}
                      className='languageSelector__input'
                      onChange={() => setLanguageTitle({ fr: true, en: false, it: false })}
                    />
                    <label htmlFor='languageSelectorTitle__fr' className='languageSelector__label'>
                      Fr
                    </label>
                  </Box>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorTitle'
                      id='languageSelectorTitle__en'
                      className='languageSelector__input'
                      checked={languageTitle?.en}
                      onChange={() => setLanguageTitle({ fr: false, en: true, it: false })}
                    />
                    <label htmlFor='languageSelectorTitle__en' className='languageSelector__label'>
                      En
                    </label>
                  </Box>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorTitle'
                      id='languageSelectorTitle__it'
                      className='languageSelector__input'
                      checked={languageTitle?.it}
                      onChange={() => setLanguageTitle({ fr: false, en: false, it: true })}
                    />
                    <label htmlFor='languageSelectorTitle__it' className='languageSelector__label'>
                      It
                    </label>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px' }} htmlFor='richText'>
                  {t('description')}
                </Typography>
                <ReactQuill
                  value={
                    languageDescription?.fr
                      ? description?.fr
                      : languageDescription?.en
                        ? description?.en
                        : languageDescription?.it
                          ? description?.it
                          : ''
                  }
                  onChange={e => handleChangeDescription(e)}
                  style={{ minHeight: '20px' }}
                  theme="snow"
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
                  ]}
                />
                <Box className='languageSelector__wrapper'>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorDescription'
                      id='languageSelectorDescription__fr'
                      defaultChecked
                      checked={languageDescription?.fr}
                      className='languageSelector__input'
                      onChange={() => setLanguageDescription({ fr: true, en: false, it: false })}
                    />
                    <label htmlFor='languageSelectorDescription__fr' className='languageSelector__label'>
                      Fr
                    </label>
                  </Box>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorDescription'
                      id='languageSelectorDescription__en'
                      className='languageSelector__input'
                      checked={languageDescription?.en}
                      onChange={() => setLanguageDescription({ fr: false, en: true, it: false })}
                    />
                    <label htmlFor='languageSelectorDescription__en' className='languageSelector__label'>
                      En
                    </label>
                  </Box>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorDescription'
                      id='languageSelectorDescription__it'
                      className='languageSelector__input'
                      checked={languageDescription?.it}
                      onChange={() => setLanguageDescription({ fr: false, en: false, it: true })}
                    />
                    <label htmlFor='languageSelectorDescription__it' className='languageSelector__label'>
                      It
                    </label>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '10px', ml: '5px' }}>
                  {t('photo')}
                </Typography>
                <input
                  style={{ display: 'none' }}
                  id='image'
                  name='image'
                  type='file'
                  accept='image/jpg, image/png'
                  onChange={(e: any) => handleImageFileChange(e)}
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
                    {formik?.values?.image && <p>{formik?.values?.image?.name}</p>}
                  </Button>
                </label>
                {settings?.page?.image && settings?.page?.image !== 'undefined' && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_WITHOUTSLASH}` + settings?.page?.image}
                    alt='User'
                    width={200}
                    height={100}
                  />
                )}
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
                  label={t('title')}
                  variant='outlined'
                  value={languageTitleSeo?.fr ? titleSeo?.fr : languageTitleSeo?.en ? titleSeo?.en : titleSeo?.it}
                  onChange={(e: any) => handleChangeTitleSeo(e)}
                  error={formik.touched.seo_title && Boolean(formik.errors.seo_title)}
                  sx={{ width: '100%' }}
                />
                <Box className='languageSelector__wrapper'>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorTitleSeo'
                      id='languageSelectorTitleSeo__fr'
                      defaultChecked
                      checked={languageTitleSeo?.fr}
                      className='languageSelector__input'
                      onChange={() => setLanguageTitleSeo({ fr: true, en: false, it: false })}
                    />
                    <label htmlFor='languageSelectorTitleSeo__fr' className='languageSelector__label'>
                      Fr
                    </label>
                  </Box>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorTitleSeo'
                      id='languageSelectorTitleSeo__en'
                      className='languageSelector__input'
                      checked={languageTitleSeo?.en}
                      onChange={() => setLanguageTitleSeo({ fr: false, en: true, it: false })}
                    />
                    <label htmlFor='languageSelectorTitleSeo__en' className='languageSelector__label'>
                      En
                    </label>
                  </Box>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorTitleSeo'
                      id='languageSelectorTitleSeo__it'
                      className='languageSelector__input'
                      checked={languageTitleSeo?.it}
                      onChange={() => setLanguageTitleSeo({ fr: false, en: false, it: true })}
                    />
                    <label htmlFor='languageSelectorTitleSeo__it' className='languageSelector__label'>
                      It
                    </label>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('alias')}
                </Typography>
                <TextField
                  autoComplete='off'
                  type='text'
                  id='seo_alias'
                  name='seo_alias'
                  label={t('alias')}
                  variant='outlined'
                  value={languageAliasSeo?.fr ? aliasSeo?.fr : languageAliasSeo?.en ? aliasSeo?.en : aliasSeo?.it}
                  onChange={(e: any) => handleChangeAliasSeo(e)}
                  error={formik.touched.seo_alias && Boolean(formik.errors.seo_alias)}
                  sx={{ width: '100%' }}
                />
                <Box className='languageSelector__wrapper'>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorAliasSeo'
                      id='languageSelectorAliasSeo__fr'
                      defaultChecked
                      checked={languageAliasSeo?.fr}
                      className='languageSelector__input'
                      onChange={() => setLanguageAliasSeo({ fr: true, en: false, it: false })}
                    />
                    <label htmlFor='languageSelectorAliasSeo__fr' className='languageSelector__label'>
                      Fr
                    </label>
                  </Box>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorAliasSeo'
                      id='languageSelectorAliasSeo__en'
                      className='languageSelector__input'
                      checked={languageAliasSeo?.en}
                      onChange={() => setLanguageAliasSeo({ fr: false, en: true, it: false })}
                    />
                    <label htmlFor='languageSelectorAliasSeo__en' className='languageSelector__label'>
                      En
                    </label>
                  </Box>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorAliasSeo'
                      id='languageSelectorAliasSeo__it'
                      className='languageSelector__input'
                      checked={languageAliasSeo?.it}
                      onChange={() => setLanguageAliasSeo({ fr: false, en: false, it: true })}
                    />
                    <label htmlFor='languageSelectorAliasSeo__it' className='languageSelector__label'>
                      It
                    </label>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('description')}
                </Typography>
                <TextField
                  autoComplete='off'
                  type='text'
                  id='seo_description'
                  name='seo_description'
                  label={t('description')}
                  variant='outlined'
                  value={
                    languageDescriptionSeo?.fr
                      ? descriptionSeo?.fr
                      : languageDescriptionSeo?.en
                        ? descriptionSeo?.en
                        : descriptionSeo?.it
                  }
                  onChange={(e: any) => handleChangeDescriptionSeo(e)}
                  error={formik.touched.seo_description && Boolean(formik.errors.seo_description)}
                  sx={{ width: '100%' }}
                />
                <Box className='languageSelector__wrapper'>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorDescriptionSeo'
                      id='languageSelectorDescriptionSeo__fr'
                      defaultChecked
                      checked={languageDescriptionSeo?.fr}
                      className='languageSelector__input'
                      onChange={() => setLanguageDescriptionSeo({ fr: true, en: false, it: false })}
                    />
                    <label htmlFor='languageSelectorDescriptionSeo__fr' className='languageSelector__label'>
                      Fr
                    </label>
                  </Box>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorDescriptionSeo'
                      id='languageSelectorDescriptionSeo__en'
                      className='languageSelector__input'
                      checked={languageDescriptionSeo?.en}
                      onChange={() => setLanguageDescriptionSeo({ fr: false, en: true, it: false })}
                    />
                    <label htmlFor='languageSelectorDescriptionSeo__en' className='languageSelector__label'>
                      En
                    </label>
                  </Box>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorDescriptionSeo'
                      id='languageSelectorDescriptionSeo__it'
                      className='languageSelector__input'
                      checked={languageDescriptionSeo?.it}
                      onChange={() => setLanguageDescriptionSeo({ fr: false, en: false, it: true })}
                    />
                    <label htmlFor='languageSelectorDescriptionSeo__it' className='languageSelector__label'>
                      It
                    </label>
                  </Box>
                </Box>
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
export default Pageform
