'use client'

import * as React from 'react'
import Dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import { useState, useMemo } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Alert, AlertColor, Button, CircularProgress, Snackbar } from '@mui/material'
import { getCookie } from 'cookies-next'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
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

const NewsForm = ({ settings, setIsUpdated, isUpdated, espace }: any) => {
  const auth = useAuth()
  const projectId = auth?.user?.projects[0]
  const { t } = useTranslation()
  const token = getCookie('token')
  const ReactQuill = useMemo(() => Dynamic(() => import('react-quill'), { ssr: false }), [])
  const [isLoading, setIsLoading] = useState(false)

  const validate = (values: any) => {
    const errors: any = {}

    if (!intro) {
      errors.intro = t('form__required')
    }
    if (!title) {
      errors.title = t('form__required')
    }
    if (!values.unpublish_date) {
      errors.unpublish_date = t('form__required')
    }
    if (!values.publish_date) {
      errors.publish_date = t('form__required')
    }
    if (!values.status) {
      errors.status = t('form__required')
    }
    if (!values.tags) {
      errors.tags = t('form__required')
    }
    if (!values.image) {
      errors.image = t('form__required')
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

  const handleImageFileChange = (event: any) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      formik.setFieldValue('image', selectedFile)
    }
  }

  const [openToast, setOpenToast] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState('')
  const [toastType, setToastType] = React.useState('success')

  const [languageTitle, setLanguageTitle] = React.useState({ fr: true, en: false, it: false })
  const [title, setTitle] = useState({
    fr: settings?.article?.fr?.title || '',
    en: settings?.article?.en?.title || '',
    it: settings?.article?.it?.title || ''
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

  const [languageIntro, setLanguageIntro] = React.useState({ fr: true, en: false, it: false })
  const [intro, setIntro] = useState({
    fr: settings?.article?.fr?.intro || '',
    en: settings?.article?.en?.intro || '',
    it: settings?.article?.it?.intro || ''
  })
  const handleChangeIntro = (e: any) => {
    if (languageIntro?.fr) {
      setIntro({ ...intro, fr: e?.target?.value })
    } else if (languageIntro?.en) {
      setIntro({ ...intro, en: e?.target?.value })
    } else if (languageIntro?.it) {
      setIntro({ ...intro, it: e?.target?.value })
    }
  }

  const [languageDescription, setLanguageDescription] = React.useState({ fr: true, en: false, it: false })
  const [description, setDescription] = useState({
    fr: settings?.article?.fr?.description || '',
    en: settings?.article?.en?.description || '',
    it: settings?.article?.it?.description || ''
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
    fr: settings?.article?.fr?.title || '',
    en: settings?.article?.en?.title || '',
    it: settings?.article?.it?.title || ''
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
    fr: settings?.article?.fr?.title || '',
    en: settings?.article?.en?.title || '',
    it: settings?.article?.it?.title || ''
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
    fr: settings?.article?.fr?.title || '',
    en: settings?.article?.en?.title || '',
    it: settings?.article?.it?.title || ''
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

  const initialFormValues: any = {
    projet: settings?.settings?.projet || '',
    title: settings?.article?.title || '',
    intro: settings?.article?.intro || '',
    tags: settings?.article?.tags || '',
    description: description,
    image: settings?.article?.image || '',
    status: settings?.article?.status || '',
    publish_date: settings?.article?.publish_date?.split('T')[0] || '',
    unpublish_date: settings?.article?.unpublish_date?.split('T')[0] || '',
    seo_title: settings?.article?.seo_title || '',
    seo_alias: settings?.article?.seo_alias || '',
    seo_description: settings?.article?.seo_description || ''
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

      formData.append('project', projectId)

      if (intro?.fr) formData.append(`fr.intro`, intro?.fr)
      if (intro?.en) formData.append(`en.intro`, intro?.en)
      if (intro?.it) formData.append(`it.intro`, intro?.it)

      formData.append('image', values.image)
      formData.append('publish_date', values.publish_date)
      formData.append('unpublish_date', values.unpublish_date)
      formData.append('status', values.status)

      if (titleSeo?.fr) formData.append(`fr.seo_title`, titleSeo?.fr)
      if (titleSeo?.en) formData.append(`en.seo_title`, titleSeo?.en)
      if (titleSeo?.it) formData.append(`it.seo_title`, titleSeo?.it)

      if (aliasSeo?.fr) formData.append(`fr.seo_alias`, aliasSeo?.fr)
      if (aliasSeo?.en) formData.append(`en.seo_alias`, aliasSeo?.en)
      if (aliasSeo?.it) formData.append(`it.seo_alias`, aliasSeo?.it)

      if (descriptionSeo?.fr) formData.append(`fr.seo_description`, descriptionSeo?.fr)
      if (descriptionSeo?.en) formData.append(`en.seo_description`, descriptionSeo?.en)
      if (descriptionSeo?.it) formData.append(`it.seo_description`, descriptionSeo?.it)

      formData.append('slug', convertToSlug(title?.fr))

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
            if (isUpdated !== undefined) setIsUpdated(!isUpdated)
          } else {
            setToastType('success')
            setOpenToast(true)
            setToastMessage('Action effectué avec succès')
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
      <form autoComplete='off' onSubmit={formik.handleSubmit} style={{ paddingBottom: '5rem' }}>
        <Box sx={{ padding: '0 20px 15px', borderBottom: '1px solid #E5E5E5', display: 'flex' }}>
          <Typography className='title2'>{settings?.article ? 'Modification article' : 'NOUVEL ARTICLE'}</Typography>
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
            onClick={() => router.push(`/${espace}/news`)}
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

              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('intro')}
                </Typography>
                <TextField
                  autoComplete='off'
                  type='text'
                  id='intro'
                  name='intro'
                  label={t('intro')}
                  variant='outlined'
                  value={languageIntro?.fr ? intro?.fr : languageIntro?.en ? intro?.en : intro?.it}
                  onChange={(e: any) => handleChangeIntro(e)}
                  error={formik.touched.intro && Boolean(formik.errors.intro)}
                  sx={{ width: '100%' }}
                />

                <Box className='languageSelector__wrapper'>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorIntro'
                      id='languageSelectorIntro__fr'
                      defaultChecked
                      checked={languageIntro?.fr}
                      className='languageSelector__input'
                      onChange={() => setLanguageIntro({ fr: true, en: false, it: false })}
                    />
                    <label htmlFor='languageSelectorIntro__fr' className='languageSelector__label'>
                      Fr
                    </label>
                  </Box>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorIntro'
                      id='languageSelectorIntro__en'
                      className='languageSelector__input'
                      checked={languageIntro?.en}
                      onChange={() => setLanguageIntro({ fr: false, en: true, it: false })}
                    />
                    <label htmlFor='languageSelectorIntro__en' className='languageSelector__label'>
                      En
                    </label>
                  </Box>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorIntro'
                      id='languageSelectorIntro__it'
                      className='languageSelector__input'
                      checked={languageIntro?.it}
                      onChange={() => setLanguageIntro({ fr: false, en: false, it: true })}
                    />
                    <label htmlFor='languageSelectorIntro__it' className='languageSelector__label'>
                      It
                    </label>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('tags')}
                </Typography>
                <TextField
                  autoComplete='off'
                  type='text'
                  id='tags'
                  name='tags'
                  label={t('tags')}
                  variant='outlined'
                  value={formik.values.tags}
                  onChange={formik.handleChange}
                  error={formik.touched.tags && Boolean(formik.errors.tags)}
                  sx={{ width: '100%' }}
                />
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
                  onChange={e => handleChangeDescription(e)}
                  style={{ minHeight: '20px' }}
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
                  onChange={handleImageFileChange}
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
                {settings?.article?.image && settings?.article?.image !== 'undefined' && (
                  <img

                
                    src={`${process.env.NEXT_PUBLIC_API_WITHOUTSLASH}` + settings?.article?.image}
                    alt='article'
                    width={200}
                    height={100}
                  />
                )}
              </Grid>

              <Grid item xs={4} alignItems='center'>
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
                    <MenuItem value={1}>{'Publié'}</MenuItem>
                    <MenuItem value={2}>{'Non Publié'}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('pubDate')}
                </Typography>
                <TextField
                  fullWidth
                  size='medium'
                  variant='outlined'
                  name='publish_date'
                  margin='dense'
                  type='date'
                  sx={{ color: '#B7B7B7 !important' }}
                  value={formik.values.publish_date}
                  onChange={formik.handleChange}
                  error={formik.touched.publish_date && Boolean(formik.errors.publish_date)}
                />
              </Grid>
              <Grid item xs={4} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('endDate')}
                </Typography>
                <TextField
                  fullWidth
                  size='medium'
                  variant='outlined'
                  name='unpublish_date'
                  margin='dense'
                  type='date'
                  value={formik.values.unpublish_date}
                  onChange={formik.handleChange}
                  error={formik.touched.unpublish_date && Boolean(formik.errors.unpublish_date)}
                  helperText={formik?.touched?.unpublish_date ? (formik?.errors?.unpublish_date as string) : '\u00a0'}
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
            <Button sx={{ marginTop: '2rem' }} variant='contained' color='primary' type='submit' className='button'>
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
export default NewsForm
