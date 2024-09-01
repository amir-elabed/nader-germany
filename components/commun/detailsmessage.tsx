'use client'

import React, { useMemo, useState } from 'react'
import Typography from '@mui/material/Typography'
import Dynamic from 'next/dynamic'
import Image from 'next/image'
import { Alert, AlertColor, Box, Button, Snackbar } from '@mui/material'
import 'react-quill/dist/quill.snow.css'
import { formatDate } from '@/utils/formatDate'
import { getCookie } from 'cookies-next'
import axios from 'axios'

const imageStyles = {
  borderRadius: '50%',
  width: '2.5rem',
  height: '2.5rem',
  objectFit: 'cover' as const,
  marginTop: '0.25rem'
}

const Conversation = (props: any) => {
  const ReactQuill = useMemo(() => Dynamic(() => import('react-quill'), { ssr: false }), [])
  const [richText, setRichText] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null)

  const handleItemClick = (index: number) => {
    if (selectedMessage === index) {
      setSelectedMessage(null)
    } else {
      setSelectedMessage(index)
    }
  }


  const conversation = props?.conversation || []

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}messaging/${conversation?._id}/add-response`,
        {
          objet: 'RE: ' + conversation?.object,
          description: richText
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        setToastType('success')
        setOpenToast(true)
        setToastMessage('Action effectuée avec succès')
        setRichText('')
        props.onActionComplete()
      } else {
        setToastType('error')
        setOpenToast(true)
        setToastMessage('Une erreur est survenue')
      }
    } catch (error) {
      setToastType('error')
      setOpenToast(true)
      setToastMessage('Une erreur est survenue')
    }
  }

  return (
    <Box>
      {conversation?.messages?.map((message: any, index: number) => (
        <Box key={index} onClick={() => handleItemClick(index)}>
          <Box
            borderBottom='1px solid #E5E5E5'
            onClick={() => handleItemClick(index)}
            style={{ cursor: 'pointer' }}
            padding='15px'
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src={
                  message?.sender?.image
                    ? `${process.env.NEXT_PUBLIC_API_WITHOUT}` + message?.sender?.image
                    : '/image/team1.png'
                }
                alt={`Image de profil de ${message?.sender?.firstName}`}
                width={40}
                height={40}
                style={imageStyles}
              />
              <Box style={{ marginLeft: '1rem' }}>
                <Typography className='conversationName'>
                  {message?.sender?.firstName + ' ' + message?.sender?.lastName}
                </Typography>
                <Typography className='conversationMessage'>{message?.objet}</Typography>
              </Box>
              <Box style={{ marginLeft: 'auto' }}>
                <Typography className='conversationTime'> {formatDate(message?.createdAt)}</Typography>
              </Box>
            </Box>

            <Box>
              {(selectedMessage === index || index === conversation?.messages.length - 1) && (
                <Box className='conversation__body'>
                  <Typography
                    className='conversationBody'
                    dangerouslySetInnerHTML={{ __html: message?.description }}
                  ></Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      ))}
      <form autoComplete='off' onSubmit={handleSubmit} action=''>
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
        <Box mt='25px'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className='button'
            sx={{ padding: '10px 50px !important' }}
          >
            <Typography className='button__typo'>REPONDRE</Typography>
          </Button>
        </Box>
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
    </Box>
  )
}

export default Conversation
