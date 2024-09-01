'use client'

import Dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import { Alert, AlertColor, Box, Button, Snackbar } from '@mui/material'
import { useAddQuestionMutation } from '@/services/api/QuestionsAPI'
import { useRouter } from 'next/navigation'
import React from 'react'

const Grid = Dynamic<any>(() => import('@mui/material/Grid'), { ssr: false })
const Typography = Dynamic<any>(() => import('@mui/material/Typography'), {
  ssr: false
})
const TextField = Dynamic<any>(() => import('@mui/material/TextField'), {
  ssr: false
})

const AddQuestionForm = () => {
  const [addNewQuestion] = useAddQuestionMutation()

  const router = useRouter()
  const validate = (values: any) => {
    const errors: any = {}

    if (!values.question) {
      errors.question = 'Champs Obligatoire'
    }

    return errors
  }

  const initialFormValues: any = {
    question: ''
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
  
  
  const [isLoading, setIsLoading] = React.useState(false)

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenToast(false)
  }

  const formik = useFormik({
    initialValues: initialFormValues,
    validate: validate,
    onSubmit: values => {
      setIsLoading(true)
      addNewQuestion(values)
        .unwrap()
        .then((response: any) => {
          if (response?.success) {
  
            setToastType('success')
            setToastMessage('Question ajoutée !')
            setIsLoading(false)
            setTimeout(() => {
              router.push('/espace-incube/Q&R')
            }, 2000)
          }
        })
        .catch((err: any) => {
          console.log('error in sending question !', err)
        })
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
          sx={{
            px: {
              xs: '1rem',
              lg: '3rem'
            }
          }}
        >
          <Grid item xs={12} alignItems='center' justifyContent='space-between'>
            <Typography className='smallinputtitle' sx={{ mb: '5px' }}>
              Question
            </Typography>
            <TextField
              autoComplete='off'
              type='text'
              id='question'
              name='question'
              label='question'
              variant='outlined'
              value={formik.values.question}
              onChange={formik.handleChange}
              error={formik.touched.question && Boolean(formik.errors.question)}
              sx={{ width: '100%' }}
            />
          </Grid>

          <Box mt='25px' mx='15px'>
            <Button variant='contained' color='primary' type='submit' className='button' sx={{ marginLeft: 'auto' }}>
              <Typography className='button__typo'>{isLoading ? 'Loading ...' : 'Poser la question'}</Typography>
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
        }}>

        <Alert onClose={handleClose} severity={mapToastTypeToSeverity(toastType)} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>

      </Snackbar>
    </>
  )
}
export default AddQuestionForm
