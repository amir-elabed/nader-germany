'use client'
import Image from 'next/image'
import * as React from 'react'
import Dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import { useState, useMemo } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Alert, AlertColor, Button, CircularProgress, Snackbar } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import { getCookie } from 'cookies-next'
import { useGetUsersQuery } from '@/services/api/UsersAPI'
import { useGetPartnersQuery } from '@/services/api/PartnersAPI'
import { useTranslation } from 'react-i18next'
import { useGetTeamMembersQuery } from '@/services/api/TeamMembersAPI'
import { useRouter } from 'next/navigation'
import RemoveRedEyeOutlined from '@mui/icons-material/RemoveRedEyeOutlined'
import Link from 'next/link'
import { useLanguage } from '@/context/LangueContext'
import axios from 'axios'
import Candidatures from '../commun/candidatureForm'
import { useGetProfileQuery } from '@/services/api/ProfileAPI'


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

interface TypeDeLaCandidature {
  status?: any
  start_date_candidacy?: any
  end_date_candidacy?: any
  type?: any
  candidacy_pdf?: any
}

const ProjetForm = ({ settings, setIsUpdated, isUpdated, espace, showReturnButton }: any) => {
  const token = getCookie('token')
  const { t } = useTranslation()
  const { data: sessionInfo }: any = useGetProfileQuery({})
  const role = parseInt(sessionInfo?.role)
  const ReactQuill = useMemo(() => Dynamic(() => import('react-quill'), { ssr: false }), [])
  const [description, setDescription] = useState({
    fr: settings?.projet?.fr?.description || '',
    en: settings?.projet?.en?.description || '',
    it: settings?.projet?.it?.description || ''
  })
  const [beneficiaries, setBeneficiaires] = useState({
    fr: settings?.projet?.fr?.beneficiaries || '',
    en: settings?.projet?.en?.beneficiaries || '',
    it: settings?.projet?.it?.beneficiaries || ''
  })
  const [title, setTitle] = useState({
    fr: settings?.projet?.fr?.title || '',
    en: settings?.projet?.en?.title || '',
    it: settings?.projet?.it?.title || ''
  })
  const [objectifs, setObjectifs] = useState({
    fr: settings?.projet?.fr?.objectifs || '',
    en: settings?.projet?.en?.objectifs || '',
    it: settings?.projet?.it?.objectifs || ''
  })
  const [selectedTeam, setSelectedTeam] = useState(settings?.projet?.teamMembers || [])
  const [selectedPartners, setSelectedPartners] = useState(settings?.projet?.Partners || [])
  const [candidatures, setCandidatures] = React.useState(settings?.projet?.callsForApplications || [{}])

  const commonFieldsArray: any[] = []
  const pdfArray: any[] = []

  candidatures.forEach((candidature: TypeDeLaCandidature) => {
    const commonFields: TypeDeLaCandidature = {
      status: candidature?.status,
      start_date_candidacy: candidature?.start_date_candidacy,
      end_date_candidacy: candidature?.end_date_candidacy,
      type: candidature?.type
    }
    commonFieldsArray.push(commonFields)

    if (candidature?.candidacy_pdf) {
      pdfArray.push(candidature?.candidacy_pdf)
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const { language } = useLanguage()

  const validate = (values: any) => {
    const errors: any = {}

    if (!values.label) {
      errors.label = t('required')
    }
    if (title?.fr === '' && title.en === '' && title.it === '') {
      errors.title = t('required')
    }

    if (values.end_date && values.start_date) {
      const publishDate = new Date(values.start_date)
      const unpublishDate = new Date(values.end_date)

      if (unpublishDate <= publishDate) {
        errors.end_date = 'La date de fin doit être supérieure à la date de publication.'
      }
    }

    if (values.end_of_publication && values.publication_date) {
      const publishDate = new Date(values.publication_date)
      const unpublishDate = new Date(values.end_of_publication)

      if (unpublishDate <= publishDate) {
        errors.end_of_publication = 'La date de fin doit être supérieure à la date de publication.'
      }
    }

    if (values.end_date_candidacy && values.start_date_candidacy) {
      const publishDate = new Date(values.start_date_candidacy)
      const unpublishDate = new Date(values.end_date_candidacy)

      if (unpublishDate <= publishDate) {
        errors.end_date_candidacy = 'La date de fin doit être supérieure à la date de publication.'
      }
    }

    return errors
  }

  const handleLogoFileChange = (event: any) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      formik.setFieldValue('logo', selectedFile)
    }
  }

  const handleCoverFileChange = (event: any) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      formik.setFieldValue('cover', selectedFile)
    }
  }
  const [color1, setColor1] = useState('#083463')

  const handleColor1Change = (e: any) => {
    const newColor = e.target.value
    setColor1(newColor)
  }

  const [color, setColor] = useState('#0A4E96')

  const handleColorChange = (e: any) => {
    const newColor = e.target.value
    setColor(newColor)
    formik.setFieldValue('color', color)
  }

  /* Get the admin project list */
  const { data: usersData }: any = useGetUsersQuery({})
  const administrators = usersData?.filter((item: any) => item?.role === '2' && item?.status === 'Accepted')

  const { data: PartnersData }: any = useGetPartnersQuery({})
  const partners = PartnersData?.filter((item: any) => item?.status === '1')

  const { data: teamData }: any = useGetTeamMembersQuery({})
  const team = teamData?.filter((item: any) => item?.status === '1')

  const initialFormValues: any = {
    label: settings?.projet?.label || '',
    title: settings?.projet?.title || '',
    start_date: settings?.projet?.start_date?.split('T')[0] || '',
    end_date: settings?.projet?.end_date?.split('T')[0] || '',
    beneficiaries: settings?.projet?.beneficiaires || '',
    objectifs: settings?.projet?.objectifs || '',
    description: description,
    teamMembers: settings?.projet?.teamMembers,
    Partners: settings?.projet?.Partners,
    status: settings?.projet?.status || '0',
    publication_date: settings?.projet?.publication_date?.split('T')[0] || '',
    end_of_publication: settings?.projet?.end_of_publication?.split('T')[0] || '',
    candidacy_pdf: settings?.projet?.candidacy_pdf?.split('T')[0] || '',
    administrators: settings?.projet?.administrators,
    facebook: settings?.projet?.facebook || '',
    twitter: settings?.projet?.twitter || '',
    instagram: settings?.projet?.instagram || '',
    youtube: settings?.projet?.youtube || '',
    linkedin: settings?.projet?.linkedin || '',
    seo_title: settings?.projet?.seo_title || '',
    seo_alias: settings?.projet?.seo_alias || '',
    seo_description: settings?.projet?.seo_description || '',
    lang: settings?.projet?.lang || language || ''
  }

  const [openToast, setOpenToast] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState('')
  const [toastType, setToastType] = React.useState('success')

  const [languageTitle, setLangugageTitle] = React.useState({ fr: true, en: false, it: false })
  const [languageBeneficiaries, setLangugageBeneficiaries] = React.useState({ fr: true, en: false, it: false })
  const [languageObjectifs, setLangugageObjectifs] = React.useState({ fr: true, en: false, it: false })
  const [languageDescription, setLangugageDescription] = React.useState({ fr: true, en: false, it: false })

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

  const handleChangeTitle = (e: any) => {
    if (languageTitle?.fr) {
      setTitle({ ...title, fr: e?.target?.value })
    } else if (languageTitle?.en) {
      setTitle({ ...title, en: e?.target?.value })
    } else if (languageTitle?.it) {
      setTitle({ ...title, it: e?.target?.value })
    }
  }

  const handleChangeBeneficeries = (e: any) => {
    if (languageBeneficiaries?.fr && e !== '<p><br></p>') {
      setBeneficiaires({ ...beneficiaries, fr: e })
    } else if (languageBeneficiaries?.en && e !== '<p><br></p>') {
      setBeneficiaires({ ...beneficiaries, en: e })
    } else if (languageBeneficiaries?.it && e !== '<p><br></p>') {
      setBeneficiaires({ ...beneficiaries, it: e })
    }
  }

  const handleChangeDescription = (e: any) => {
    if (languageDescription?.fr && e !== '<p><br></p>') {
      setDescription({ ...description, fr: e })
    } else if (languageDescription?.en && e !== '<p><br></p>') {
      setDescription({ ...description, en: e })
    } else if (languageDescription?.it && e !== '<p><br></p>') {
      setDescription({ ...description, it: e })
    }
  }

  const handleChangeObjectifs = (e: any) => {
    if (languageObjectifs?.fr && e !== '<p><br></p>') {
      setObjectifs({ ...objectifs, fr: e })
    } else if (languageObjectifs?.en && e !== '<p><br></p>') {
      setObjectifs({ ...objectifs, en: e })
    } else if (languageDescription?.it && e !== '<p><br></p>') {
      setObjectifs({ ...objectifs, it: e })
    }
  }

  const formik = useFormik({
    initialValues: initialFormValues,
    validate: validate,
    onSubmit: async values => {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('label', values.label)
      if (title?.fr) formData.append(`fr.title`, title?.fr)
      if (title?.en) formData.append(`en.title`, title?.en)
      if (title?.it) formData.append(`it.title`, title?.it)
      formData.append('start_date', values.start_date)
      formData.append('end_date', values.end_date)
      if (beneficiaries?.fr) formData.append(`fr.beneficiaries`, beneficiaries?.fr)
      if (beneficiaries?.en) formData.append(`en.beneficiaries`, beneficiaries?.en)
      if (beneficiaries?.it) formData.append(`it.beneficiaries`, beneficiaries?.it)
      if (objectifs?.fr) formData.append(`fr.objectifs`, objectifs?.fr)
      if (objectifs?.en) formData.append(`en.objectifs`, objectifs?.en)
      if (objectifs?.it) formData.append(`it.objectifs`, objectifs?.it)
      if (description?.fr) formData.append(`fr.description`, description?.fr)
      if (description?.en) formData.append(`en.description`, description?.en)
      if (description?.it) formData.append(`it.description`, description?.it)
      if (values.logo !== undefined) formData.append('logo', values.logo)
      if (values.cover !== undefined) formData.append('cover', values.cover)
      if (commonFieldsArray?.length > 0) {
        commonFieldsArray.forEach((item, index) => {
          Object.entries(item).forEach(([key, value]) => {
            if (value !== undefined) {
              formData.append(`callsForApplications[${index}][${key}]`, String(value))
            }
          })
        })
      }
      if (selectedTeam && selectedTeam?.length > 0)
        selectedTeam.map((team: any) => formData.append('teamMembers', team?._id))
      if (selectedPartners && selectedPartners?.length > 0)
        selectedPartners.map((partner: any) => formData.append('Partners', partner?._id))
      formData.append('status', values.status)
      formData.append('publication_date', values.publication_date)
      formData.append('end_of_publication', values.end_of_publication)
      if (values.administrators && values.administrators !== '')
        formData.append('administrators', values.administrators)
      formData.append('facebook', values.facebook)
      formData.append('twitter', values.twitter)
      formData.append('instagram', values.instagram)
      formData.append('youtube', values.youtube)
      formData.append('linkedin', values.linkedin)
      formData.append('seo_title', values.seo_title)
      formData.append('seo_alias', values.seo_alias)
      formData.append('seo_description', values.seo_description)
      candidatures?.forEach((candidature: any) => {
        formData.append('candidacy_pdf', candidature?.candidacy_pdf)
      })

      try {
        const response =
          settings?.method === 'POST'
            ? await axios.post(`${settings?.url}`, formData, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            : await axios.patch(`${settings?.url}`, formData, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })

        if (response.data.success) {
          setToastType('success')
          setOpenToast(true)
          setToastMessage('Opération effectuée avec succès')
          setIsLoading(false)
          if (isUpdated !== undefined) setIsUpdated(!isUpdated)
          role === 1 ? router.push('/espace-admin/projets') : router.push('/espace-adminprojet/projet/modification')
        }
      } catch (error: any) {
        setToastType('error')
        setOpenToast(true)
        setToastMessage(error?.response?.data?.message || 'Une erreur est survenue')
        setIsLoading(false)
      }
    }
  })

  const handleaddCandidatures = () => {
    const candidaturesValue: any = candidatures ? [...candidatures, Candidatures] : [Candidatures]
    setCandidatures(candidaturesValue)
  }

  const handleDeleteCandidatures = (index: any) => {
    const candidaturesValue: any = [...candidatures]
    candidaturesValue.splice(index, 1)
    setCandidatures(candidaturesValue)
  }

  const router = useRouter()

  return (
    <>
      <form noValidate onSubmit={formik.handleSubmit} action='' style={{ paddingBottom: '5rem' }}>
        <Box sx={{ padding: '0 20px 15px', borderBottom: '1px solid #E5E5E5', display: 'flex' }}>
          <Typography className='title2'>{settings?.projet ? t('Modif project') : t('New project')}</Typography>
          {showReturnButton !== false && (
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
              onClick={() => router.push(`/${espace}/projets`)}
            >
              <Typography
                sx={{
                  color: '#0A4E96'
                }}
              >
                {t('return')}
              </Typography>
            </Button>
          )}
          {settings?.projet && (
            <Button
              variant='text'

              sx={{
                marginLeft: showReturnButton === false ? 'auto' : '0px',
                marginRight: '1rem',
                padding: 0,
                minWidth: 0,
                color: '#05264A',
                '& a': {
                  color: 'currentcolor',
                  display: 'flex',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center'
                },
                ':hover': { backgroundColor: 'transparent', color: 'blue' },
              }}
            >
              <Link href={`/projet/${settings?.projet?.label}`} target='_blank'>
                <RemoveRedEyeOutlined />
              </Link>
            </Button>
          )}
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
                  {t('label')}
                </Typography>
                <TextField
                  disabled={!settings?.showAdminSelect}
                  type='text'
                  id='label'
                  name='label'
                  label={t('label')}
                  value={formik.values.label}
                  onChange={formik.handleChange}
                  error={formik.touched.label && Boolean(formik.errors.label)}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('title')}
                </Typography>
                <TextField
                  type='text'
                  id='title'
                  name='title'
                  label={`${t('title')} ${t('project')}`}
                  variant='outlined'
                  value={languageTitle?.fr ? title?.fr : languageTitle?.en ? title?.en : title?.it}
                  onChange={(e: any) => handleChangeTitle(e)}
                  error={formik.touched.title && Boolean(formik.errors.title)}
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
                      onChange={() => setLangugageTitle({ fr: true, en: false, it: false })}
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
                      onChange={() => setLangugageTitle({ fr: false, en: true, it: false })}
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
                      onChange={() => setLangugageTitle({ fr: false, en: false, it: true })}
                    />
                    <label htmlFor='languageSelectorTitle__it' className='languageSelector__label'>
                      It
                    </label>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6} alignItems='center'>
                <Typography className='inputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('Start date')}
                </Typography>
                <TextField
                  fullWidth
                  size='medium'
                  variant='outlined'
                  name='start_date'
                  margin='dense'
                  type='date'
                  value={formik.values.start_date}
                  onChange={formik.handleChange}
                  error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                />
              </Grid>
              <Grid item xs={12} lg={6} alignItems='center'>
                <Typography className='inputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('End date')}
                </Typography>
                <TextField
                  fullWidth
                  size='medium'
                  variant='outlined'
                  name='end_date'
                  margin='dense'
                  type='date'
                  value={formik.values.end_date}
                  onChange={formik.handleChange}
                  error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                  helperText={formik?.touched?.end_date ? (formik?.errors?.end_date as string) : '\u00a0'}
                />
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('beneficiaries')}
                </Typography>
                <ReactQuill
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
                  value={
                    languageBeneficiaries?.fr
                      ? beneficiaries?.fr
                      : languageBeneficiaries?.en
                        ? beneficiaries?.en
                        : beneficiaries?.it
                  }
                  onChange={(e: any) => handleChangeBeneficeries(e)}
                  style={{ minHeight: '20px' }}
                />
                <Box className='languageSelector__wrapper'>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorBeneficiaries'
                      id='languageSelectorBeneficiaries__fr'
                      defaultChecked
                      checked={languageBeneficiaries?.fr}
                      className='languageSelector__input'
                      onChange={() => setLangugageBeneficiaries({ fr: true, en: false, it: false })}
                    />
                    <label htmlFor='languageSelectorBeneficiaries__fr' className='languageSelector__label'>
                      Fr
                    </label>
                  </Box>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorBeneficiaries'
                      id='languageSelectorBeneficiaries__en'
                      checked={languageBeneficiaries?.en}
                      className='languageSelector__input'
                      onChange={() => setLangugageBeneficiaries({ fr: false, en: true, it: false })}
                    />
                    <label htmlFor='languageSelectorBeneficiaries__en' className='languageSelector__label'>
                      En
                    </label>
                  </Box>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorBeneficiaries'
                      id='languageSelectorBeneficiaries__it'
                      checked={languageBeneficiaries?.it}
                      className='languageSelector__input'
                      onChange={() => setLangugageBeneficiaries({ fr: false, en: false, it: true })}
                    />
                    <label htmlFor='languageSelectorBeneficiaries__it' className='languageSelector__label'>
                      It
                    </label>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('objective')}
                </Typography>
                <ReactQuill
                  value={languageObjectifs?.fr ? objectifs?.fr : languageObjectifs?.en ? objectifs?.en : objectifs?.it}
                  onChange={(e: any) => handleChangeObjectifs(e)}
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
                      name='languageSelectorObjectifs'
                      id='languageSelectorObjectifs__fr'
                      defaultChecked
                      className='languageSelector__input'
                      checked={languageObjectifs?.fr}
                      onChange={() => setLangugageObjectifs({ fr: true, en: false, it: false })}
                    />
                    <label htmlFor='languageSelectorObjectifs__fr' className='languageSelector__label'>
                      Fr
                    </label>
                  </Box>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorObjectifs'
                      id='languageSelectorObjectifs__en'
                      checked={languageObjectifs?.en}
                      className='languageSelector__input'
                      onChange={() => setLangugageObjectifs({ fr: false, en: true, it: false })}
                    />
                    <label htmlFor='languageSelectorObjectifs__en' className='languageSelector__label'>
                      En
                    </label>
                  </Box>
                  <Box className='languageSelector'>
                    <input
                      type='radio'
                      name='languageSelectorObjectifs'
                      id='languageSelectorObjectifs__it'
                      checked={languageObjectifs?.it}
                      className='languageSelector__input'
                      onChange={() => setLangugageObjectifs({ fr: false, en: false, it: true })}
                    />
                    <label htmlFor='languageSelectorObjectifs__it' className='languageSelector__label'>
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
                  value={
                    languageDescription?.fr
                      ? description?.fr
                      : languageDescription?.en
                        ? description?.en
                        : description?.it
                  }
                  onChange={(e: any) => handleChangeDescription(e)}
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
                      onChange={() => setLangugageDescription({ fr: true, en: false, it: false })}
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
                      onChange={() => setLangugageDescription({ fr: false, en: true, it: false })}
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
                      checked={languageDescription?.it}
                      className='languageSelector__input'
                      onChange={() => setLangugageDescription({ fr: false, en: false, it: true })}
                    />
                    <label htmlFor='languageSelectorDescription__it' className='languageSelector__label'>
                      It
                    </label>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('team')}
                </Typography>
                {team && (
                  <Autocomplete
                    value={selectedTeam}
                    multiple
                    id='team'
                    label={t('team')}
                    options={team}
                    getOptionLabel={(option: any) => option?.firstName + ' ' + option?.lastName}
                    onChange={(e: any, values: any) => setSelectedTeam(values)}
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
              <Grid item xs={12} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('sidebar__partners')}
                </Typography>
                {partners && (
                  <Autocomplete
                    value={selectedPartners}
                    multiple
                    id='Partners'
                    options={partners}
                    getOptionLabel={(option: any) => option?.label}
                    onChange={(e: any, values: any) => setSelectedPartners(values)}
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
                    <MenuItem value='1'>Publié</MenuItem>
                    <MenuItem value='0'>Non Publié</MenuItem>
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
                  {t('endDate')}
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
              <Grid style={{ display: settings?.showAdminSelect ? '' : 'none' }} item xs={12} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('sidebar__admins')}
                </Typography>
                <FormControl fullWidth size='medium' margin='dense'>
                  <Select
                    variant='outlined'
                    required
                    labelId='administrators'
                    id='administrators'
                    label={t('sidebar__admins')}
                    name='administrators'
                    value={formik.values.administrators}
                    onChange={formik.handleChange}
                    error={formik.touched.administrators && Boolean(formik.errors.administrators)}
                    margin='dense'
                  >
                    {administrators &&
                      administrators.map((admin: any) => {
                        return (
                          <MenuItem key={admin._id} value={admin._id}>
                            {admin.firstName} {admin.lastName}
                          </MenuItem>
                        )
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between' display='flex' mt='20px'>
                <Typography className='subtitle'>{t('application')}</Typography>
                <Box sx={{ width: '100%', height: '1px', backgroundColor: '#E5E5E5', ml: '10px' }}></Box>
              </Grid>

              <Grid
                item
                xs={12}
                alignItems='center'
                justifyContent='space-between'
                marginTop='10px'
                sx={{ padding: '20px', borderRadius: '20px', marginBottom: '20px' }}
              >
                {candidatures?.map((candidature: any, index: any) => (
                  <Candidatures
                    setCandidatures={setCandidatures}
                    handleDeleteCandidatures={handleDeleteCandidatures}
                    key={index}
                    index={index}
                    candidature={candidature}
                  ></Candidatures>
                ))}
                <>
                  <Grid
                    item
                    xs={12}
                    alignItems='center'
                    justifyContent='space-between'
                    marginTop='10px'
                    textAlign='end'
                    sx={{ padding: '20px', borderRadius: '20px', marginBottom: '20px' }}
                  >
                    <Button
                      variant='contained'
                      size='large'
                      color='primary'
                      className='button'
                      sx={{ backgroundColor: 'primary', marginTop: '20px' }}
                      onClick={handleaddCandidatures}
                    >
                      {'+ Ajouter un appel à candidature'}
                    </Button>
                  </Grid>
                </>
              </Grid>

              <Grid item xs={12} alignItems='center' justifyContent='space-between' display='flex' mt='20px'>
                <Typography className='subtitle'>Theme</Typography>
                <Box sx={{ width: '100%', height: '1px', backgroundColor: '#E5E5E5', ml: '10px' }}></Box>
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
                  accept='image/svg, image/png'
                  onChange={handleLogoFileChange}
                />
                <label htmlFor='logo'>
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
                    {formik?.values?.logo && <p>{formik?.values?.logo?.name}</p>}
                  </Button>
                </label>
                <p className='error'>{formik?.touched?.logo && formik?.errors?.logo && `${formik?.errors?.logo}`}</p>
                {settings?.projet?.logo && settings?.projet?.logo !== 'undefined' && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_WITHOUTSLASH}` + settings?.projet?.logo}
                    alt='projet'
                    width={200}
                    height={100}
                  />
                )}
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '10px', ml: '5px' }}>
                  {t('cover')}
                </Typography>
                <input
                  style={{ display: 'none' }}
                  id='cover'
                  name='cover'
                  type='file'
                  accept='image/jpg, image/png, image/gif'
                  onChange={handleCoverFileChange}
                />
                <label htmlFor='cover'>
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
                    {formik?.values?.cover && <p>{formik?.values?.cover?.name}</p>}
                  </Button>
                </label>
                <p className='error'>{formik?.touched?.cover && formik?.errors?.cover && `${formik?.errors?.cover}`}</p>
                {settings?.projet?.cover && settings?.projet?.cover !== 'undefined' && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_WITHOUTSLASH}` + settings?.projet?.cover}
                    alt='projet'
                    width={200}
                    height={100}
                  />
                )}
              </Grid>
              <Grid container item lg={12} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('color')}
                </Typography>
              </Grid>

              <Grid container item lg={12} alignItems='center' justifyContent='space-between'>
                <Grid
                  container
                  alignItems='center'
                  justifyContent='initial'
                  sx={{ border: '1px solid #E5E5E5', width: '49%', height: '45px' }}
                >
                  <input type='color' className='input-color' value={color} onChange={handleColorChange} />{' '}
                  <Typography
                    variant='body1'
                    sx={{ borderLeft: '1px solid #E5E5E5', marginLeft: '9px', height: '100%', padding: '11px' }}
                    style={{ color: color }}
                  >
                    {color}
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  alignItems='center'
                  justifyContent='initial'
                  sx={{ border: '1px solid #E5E5E5', width: '49%', height: '45px' }}
                >
                  <input type='color' className='input-color' value={color1} onChange={handleColor1Change} />

                  <Typography
                    variant='body1'
                    style={{ color: color1 }}
                    sx={{ borderLeft: '1px solid #E5E5E5', marginLeft: '9px', height: '100%', padding: '11px' }}
                  >
                    {color1}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} alignItems='center' justifyContent='space-between' display='flex' mt='20px'>
                <Typography className='subtitle'>{t('social__media')}</Typography>
                <Box sx={{ width: '76%', height: '1px', backgroundColor: '#E5E5E5', ml: '10px' }}></Box>
              </Grid>

              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <TextField
                  type='text'
                  id='facebook'
                  name='facebook'
                  variant='outlined'
                  InputProps={{
                    startAdornment: (
                      <Box>
                        <InputAdornment position='start'>
                          <Image
                            src='/image/facebook.svg'
                            width={18}
                            style={{ paddingRight: '2px' }}
                            height={18}
                            priority
                            alt={'facebook'}
                          />
                        </InputAdornment>
                      </Box>
                    )
                  }}
                  value={formik.values.facebook}
                  onChange={formik.handleChange}
                  error={formik.touched.facebook && Boolean(formik.errors.facebook)}
                  sx={{ width: '100%', background: '#F3F3F9 !important' }}
                />
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <TextField
                  type='text'
                  id='twitter'
                  name='twitter'
                  variant='outlined'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Image
                          src='/image/twitter.svg'
                          width={18}
                          height={18}
                          style={{ paddingRight: '2px' }}
                          priority
                          alt={'twitter'}
                        />
                      </InputAdornment>
                    )
                  }}
                  value={formik.values.twitter}
                  onChange={formik.handleChange}
                  error={formik.touched.twitter && Boolean(formik.errors.twitter)}
                  sx={{ width: '100%', background: '#F3F3F9 !important' }}
                />
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <TextField
                  type='text'
                  id='instagram'
                  name='instagram'
                  variant='outlined'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Image
                          src='/image/instagram.svg'
                          width={18}
                          height={18}
                          style={{ paddingRight: '2px' }}
                          priority
                          alt={'facebook'}
                        />
                      </InputAdornment>
                    )
                  }}
                  value={formik.values.instagram}
                  onChange={formik.handleChange}
                  error={formik.touched.instagram && Boolean(formik.errors.instagram)}
                  sx={{ width: '100%', background: '#F3F3F9 !important' }}
                />
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <TextField
                  type='text'
                  id='youtube'
                  name='youtube'
                  variant='outlined'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Image
                          src='/image/youtube.svg'
                          width={18}
                          height={18}
                          style={{ paddingRight: '2px' }}
                          priority
                          alt={'youtube'}
                        />
                      </InputAdornment>
                    )
                  }}
                  value={formik.values.youtube}
                  onChange={formik.handleChange}
                  error={formik.touched.youtube && Boolean(formik.errors.youtube)}
                  sx={{ width: '100%', background: '#F3F3F9 !important' }}
                />
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <TextField
                  type='text'
                  id='linkedin'
                  name='linkedin'
                  variant='outlined'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Image
                          src='/image/linkedin.svg'
                          width={18}
                          height={18}
                          style={{ paddingRight: '5px' }}
                          priority
                          alt={'linkedin'}
                        />
                      </InputAdornment>
                    )
                  }}
                  value={formik.values.linkedin}
                  onChange={formik.handleChange}
                  error={formik.touched.linkedin && Boolean(formik.errors.linkedin)}
                  sx={{ width: '100%', background: '#F3F3F9 !important' }}
                />
              </Grid>


              <Grid item xs={12}>
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
                      t('save')
                    )}
                  </Typography>
                </Button>
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
export default ProjetForm
