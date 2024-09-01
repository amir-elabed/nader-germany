'use client'

import React from 'react'
import { Box, Typography, TextField, IconButton } from '@mui/material'
import Image from 'next/image'
import FilterListIcon from '@mui/icons-material/FilterList'
import InboxIcon from '@mui/icons-material/Inbox'
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'
import axios from 'axios'




const imageStyles = {
  borderRadius: '50%',
  width: '2.5rem',
  height: '2.5rem',
  objectFit: 'cover' as const,
  marginTop: '0.25rem'
}

const NotificationsComponent = (props: any) => {

    const router = useRouter()

    const handleNotificationClick = async (notificationId: string) => {
      try {    

          const token = getCookie('token')

           const headers = {
        Authorization: `Bearer ${token}`,
      };    
        
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API}notifications/seen-notification/${notificationId}`,
      null,
      {
        headers
      }
    )
        router.push(
          response.data?.type === 'Message'
            ? '/espace-incube/messagerie'
            : response.data?.type === 'QR'
            ? '/espace-incube/Q&R'
            : '/espace-incube/notifications'
        )
      } catch (error) {
        console.error('Error', error)
      }
    }
  
  return (
    <Box className='messagerie'>
      <Box className='messagerie__search'>
        <TextField
          placeholder='Toutes'
          variant='standard'
          sx={{
            '& .MuiInputBase-root::before ,& .MuiInputBase-root::after ': {
              content: 'none'
            }
          }}
          InputProps={{
            startAdornment: (
              <IconButton>
                <FilterListIcon />
              </IconButton>
            )
          }}
        />
      </Box>
      {props?.notificationsList?.notifications?.map((notif: any, index: any) => (
        <Box
          key={index}
          style={{
            borderBottom: '1px solid #E5E5E5',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
          className={`messagerie__list ${index % 3 === 0 ? 'not-seen' : ''}`}
          onClick={() => handleNotificationClick(notif._id)}
        >
          <Box display='flex' alignItems='center' width='100%'>
            <Box>
              {notif?.type && notif?.type === 'Message' ? (
                <InboxIcon sx={{ color: '#C2C2C2' }} />
              ) : notif?.type === 'QR' ? (
                <LiveHelpOutlinedIcon sx={{ color: '#C2C2C2' }} />
              ) : (
                <Image
                  src={notif?.photo || '/image/NoImage.png'}
                  alt={notif?.recievedFrom}
                  width={40}
                  height={40}
                  style={imageStyles}
                />
              )}
            </Box>
            <Typography className='messagerie__listTitle' style={{ marginLeft: '16px' }}>
              {notif?.object}
            </Typography>
            <Box marginLeft='auto' flexShrink={0}>
              <Typography className='messagerie__listdate' style={{ marginLeft: 'auto', justifyContent: 'left' }}>
                {notif?.createdAt?.slice(0, 10) + ' , ' + notif?.createdAt?.split('T')[1]?.split(':')[0]}:
                {notif?.createdAt?.split('T')[1]?.split(':')[1]}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default NotificationsComponent
