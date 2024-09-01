'use client'

import * as React from 'react'
import Dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { Alert, AlertColor, Button, CircularProgress, Snackbar } from '@mui/material'
import { getCookie } from 'cookies-next'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const Box = Dynamic<any>(() => import('@mui/material/Box'), { ssr: false })
const Grid = Dynamic<any>(() => import('@mui/material/Grid'), { ssr: false })
const Typography = Dynamic<any>(() => import('@mui/material/Typography'), {
  ssr: false
})
const TextField = Dynamic<any>(() => import('@mui/material/TextField'), {
  ssr: false
})

const EvalForm = ({ settings }: any) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { t } = useTranslation()

  const token = getCookie('token')



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

  const handlePatchStatus = async (newStatus: any) => {
    try {
      setIsLoading(true)
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API}evaluation-periode/${settings?.evaluation?._id}/update-status`,
        { newStatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log('response', response)

      setToastType('success')
      setToastMessage('Status updated successfully')
      setOpenToast(true)
    } catch (error) {
      console.error('Error updating status:', error)

      setToastType('error')
      setToastMessage('Failed to update status')
      setOpenToast(true)
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <>
      <form autoComplete='off'>
        <Box sx={{ padding: '0px 20px 15px ', borderBottom: '1px solid #E5E5E5', display: 'flex' }}>
          <Typography className='title2'>{t('Evaluation period')}:</Typography>
          <Typography className='evalfont'> {settings?.evaluation?.title}</Typography>
          {settings?.evaluation?.status === '0' && (
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className='button'
              sx={{ marginLeft: 'auto' }}
              onClick={() => handlePatchStatus('1')}
            >
              <Typography className='button__typo'>
                {isLoading ? (
                  <CircularProgress
                    sx={{
                      '&.MuiCircularProgress-root': { width: '21px!important', height: '21px!important', color: '#fff' }
                    }}
                  />
                ) : (
                  t('initialized')
                )}
              </Typography>
            </Button>
          )}
          {settings?.evaluation?.status === '1' && (
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className='button'
              sx={{ marginLeft: 'auto' }}
              onClick={() => handlePatchStatus('2')}
            >
              <Typography className='button__typo'>
                {isLoading ? (
                  <CircularProgress
                    sx={{
                      '&.MuiCircularProgress-root': { width: '21px!important', height: '21px!important', color: '#fff' }
                    }}
                  />
                ) : (
                  t('start')
                )}
              </Typography>
            </Button>
          )}
          {settings?.evaluation?.status === '2' && (
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className='button'
              sx={{ marginLeft: 'auto' }}
              onClick={() => handlePatchStatus('3')}
            >
              <Typography className='button__typo'>
                {isLoading ? (
                  <CircularProgress
                    sx={{
                      '&.MuiCircularProgress-root': { width: '21px!important', height: '21px!important', color: '#fff' }
                    }}
                  />
                ) : (
                  t('finish')
                )}
              </Typography>
            </Button>
          )}
          <Button
            variant='contained'
            color='primary'
            type='submit'
            className='button'
            sx={{ marginLeft: settings?.evaluation?.status === '4' ? 'auto' : '1rem' }}
            onClick={() => handlePatchStatus('4')}
          >
            <Typography className='button__typo'>
              {isLoading ? (
                <CircularProgress
                  sx={{
                    '&.MuiCircularProgress-root': { width: '21px!important', height: '21px!important', color: '#fff' }
                  }}
                />
              ) : (
                t('disattivare')
              )}
            </Typography>
          </Button>
        </Box>
        <Grid container spacing={1}>
          <Grid item lg={8} xs={12}>
            <Box sx={{ padding: '0px 20px 15px ', display: 'flex', justifyContent: 'space-between' }}>
              <Typography className='evalinfo' sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {t('Status')}:{' '}
                {settings?.evaluation?.status === '0' && (
                  <Box sx={{ backgroundColor: '#E5E5E5', padding: '5px' }}>
                    <Typography style={{ color: '#05264A' }}>{t('Draft')}</Typography>
                  </Box>
                )}
                {settings?.evaluation?.status === '1' && (
                  <Box sx={{ backgroundColor: '#E5E5E5', padding: '5px' }}>
                    <Typography style={{ color: '#0A4E96' }}>{t('initialized')}</Typography>
                  </Box>
                )}
                {settings?.evaluation?.status === '2' && (
                  <Box sx={{ backgroundColor: '#FFE3CC', padding: '5px' }}>
                    <Typography style={{ color: '#CC4700' }}>{t('In progress')}</Typography>
                  </Box>
                )}
                {settings?.evaluation?.status === '3' && (
                  <Box sx={{ backgroundColor: '#E4FBF1', padding: '5px' }}>
                    <Typography style={{ color: '#03D87F' }}>{t('Finished')}</Typography>
                  </Box>
                )}
                {settings?.evaluation?.status === '4' && (
                  <Box sx={{ backgroundColor: '#F6E3E5', padding: '5px' }}>
                    <Typography style={{ color: '#CC0000' }}>{t('Canceled')}</Typography>
                  </Box>
                )}
              </Typography>
              <Box display='flex' alignItems='center' gap='0.25rem'>
                <Typography className='evalinfo'>{t('Start date')}: </Typography>
                <Typography className='conversationBody' marginTop='13px'>
                  {settings?.evaluation?.start_date
                    ? `${settings?.evaluation?.start_date.split('T')[0]} ${settings?.evaluation?.start_date
                        .split('T')[1]
                        .split('.')[0]}`
                    : '-'}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' gap='0.25rem'>
                <Typography className='evalinfo'>{t('End date')}: </Typography>
                <Typography className='conversationBody' marginTop='13px'>
                  {settings?.evaluation?.end_date
                    ? `${settings?.evaluation?.end_date.split('T')[0]} ${settings?.evaluation?.end_date
                        .split('T')[1]
                        .split('.')[0]}`
                    : '-'}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={8} xs={12} sx={{ mt: '30px', ml: '20px', mb: '2rem' }}>
            <Grid spacing={2} container>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('Titled')}
                </Typography>
                <TextField
                  autoComplete='off'
                  type='text'
                  id='title'
                  name='title'
                  disabled
                  label={t('Titled')}
                  variant='outlined'
                  value={settings?.evaluation?.title}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={6} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('Start date')}
                </Typography>
                <TextField
                  fullWidth
                  size='medium'
                  variant='outlined'
                  name='start_date'
                  disabled
                  margin='dense'
                  type='datetime-local'
                  value={settings?.evaluation?.start_date ? settings?.evaluation?.start_date.replace('Z', '') : ''}
                />
              </Grid>
              <Grid item xs={6} alignItems='center'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('End date')}
                </Typography>
                <TextField
                  fullWidth
                  size='medium'
                  variant='outlined'
                  name='end_date'
                  disabled
                  margin='dense'
                  type='datetime-local'
                  value={settings?.evaluation?.end_date ? settings?.evaluation?.end_date.replace('Z', '') : ''}
                />
              </Grid>
              <Grid item xs={12} alignItems='center' justifyContent='space-between'>
                <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                  {t('Observation')}
                </Typography>
                <TextField
                  autoComplete='off'
                  type='text'
                  id='observation'
                  disabled
                  multiline
                  rows={5}
                  name='observation'
                  variant='outlined'
                  value={settings?.evaluation?.observation}
                  sx={{ width: '100%' }}
                />
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
export default EvalForm
