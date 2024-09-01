'use client'

import * as React from 'react'
import Dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import { useState, useMemo } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Alert, AlertColor, Box, Button, Snackbar } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { getCookie } from 'cookies-next'
import { useAuth } from '@/context/Hooks'
import { useGetUsersQuery } from '@/services/api/UsersAPI'

const Grid = Dynamic<any>(() => import('@mui/material/Grid'), { ssr: false })
const Typography = Dynamic<any>(() => import('@mui/material/Typography'), {
  ssr: false
})
const TextField = Dynamic<any>(() => import('@mui/material/TextField'), {
  ssr: false
})
const Autocomplete = Dynamic<any>(() => import('@mui/material/Autocomplete'), { ssr: false })

const MessagerieForm = ({ settings }: any) => {
  const auth = useAuth()
  const user = auth?.user
  let projectId = ''

  if (user && user.projects && user.projects.length > 0) {
    projectId = user?.projects[0]?._id
  }

  const { data: usersData } = useGetUsersQuery({ projectId: projectId, status: 'Accepted' })
  const users = usersData?.filter((user: any) => user?.role === '4' || user?.role === '3')

  const ReactQuill = useMemo(() => Dynamic(() => import('react-quill'), { ssr: false }), [])
  const [richText, setRichText] = useState(settings?.message?.description || '')

  const [selectedUsers, setSelectedUsers] = useState(settings?.message?.destinataire || [])
  const token = getCookie('token')

  const validate = (values: any) => {
    const errors: any = {}

    if (!values.objet) {
      errors.objet = 'Champs Obligatoire'
    }

    return errors
  }


  const initialFormValues: any = {
    objet: settings?.message?.object || '',
    description: settings?.message?.messages || '',
    destinataire: settings?.message?.users || []
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
      try {
        await fetch(`${settings?.url}`, {
          method: `${settings?.method}`,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            object: values.objet,
            users: selectedUsers.map((user: any) => ({ user: user._id })),
            messages: [{ description: richText }]
          })
        })
        setToastType('success')
        setOpenToast(true)
        setToastMessage('Action effectué avec succès')
      } catch (error) {
        setToastType('error')
        setOpenToast(true)
        setToastMessage('Une erreur est survenue')
      }
    }
  })

  const { t } = useTranslation()

  return (
    <>
      <form autoComplete='off' onSubmit={formik.handleSubmit}>
        <Grid marginTop='5px' spacing={2} container alignItems='center' justifyContent='space-between'>
          <Grid item xs={12} alignItems='center' justifyContent='space-between'>
            <Typography className='smallinputtitle' sx={{ mb: '5px' }}>
              {t('message__object')}
            </Typography>
            <TextField
              autoComplete='off'
              type='text'
              id='objet'
              name='objet'
              label={t('message__object')}
              variant='outlined'
              value={formik.values.objet}
              onChange={formik.handleChange}
              error={formik.touched.objet && Boolean(formik.errors.objet)}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} alignItems='center' justifyContent='space-between'>
            <Typography className='smallinputtitle' sx={{ mb: '5px' }}>
              {t('message__recipient')}
            </Typography>
            {users && (
              <Autocomplete
                value={selectedUsers}
                multiple
                id='destinataire'
                options={users}
                getOptionLabel={(option: any) => option?.firstName + ' ' + option?.lastName}
                onChange={(e: any, values: any) => setSelectedUsers(values)}
                openOnFocus={false}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    variant='standard'
                    placeholder={t('message__recipient')}
                    sx={{ width: '100%' }}
                  />
                )}
              />
            )}
          </Grid>
          <Grid item xs={12} alignItems='center'>
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
          <Box mt='25px' mx='15px'>
            <Button
              variant='contained'
              color='primary'
              className='button'
              type='submit'
              sx={{ padding: '10px 70px !important' }}
            >
              <Typography className='button__typo'>{t('send')}</Typography>
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
export default MessagerieForm
