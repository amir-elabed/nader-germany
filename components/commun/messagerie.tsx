'use client'

import React from 'react'
import { Box, Typography, TextField, IconButton } from '@mui/material'
import Image from 'next/image'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { useRouter } from 'next/navigation'
import { useGetProfileQuery } from '@/services/api/ProfileAPI'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@/utils/formatDate'

const imageStyles = {
  borderRadius: '50%',
  width: '2.5rem',
  height: '2.5rem',
  objectFit: 'cover' as const,
  marginTop: '0.25rem'
}

const MessagerieComponent = (props: any) => {
  const router = useRouter()

  const { data: sessionInfo, refetch }: any = useGetProfileQuery({})
  const role = parseInt(sessionInfo?.role)

  React.useEffect(() => {
    refetch()
  }, [])

  const { t } = useTranslation()
  

  return (
    <Box className='messagerie'>
      {!props?.noSearch && (
        <Box className='messagerie__search'>
          <TextField
            placeholder={t('search')}
            variant='standard'
            sx={{
              '& .MuiInputBase-root::before ,& .MuiInputBase-root::after ': {
                content: 'none'
              }
            }}
            InputProps={{
              startAdornment: (
                <IconButton>
                  <SearchOutlinedIcon />
                </IconButton>
              )
            }}
          />
        </Box>
      )}
      { props?.message?.messagingList?.map((message: any, index: any) => (
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
            onClick={() =>
              role === 1
                ? router.push(`/espace-admin/messagerie/${message?._id}`)
                : role === 2
                ? router.push(`/espace-adminprojet/messagerie/${message?._id}`)
                : role === 3
                ? router.push(`/espace-expert/messagerie/${message?._id}`)
                : router.push(`/espace-incube/messagerie/${message?._id}`)
            }
          >
            <Box display='flex' alignItems='center' width='100%'>
              <Box>
                <Image
                  src={
                    message?.messages[0]?.sender?.image
                      ? `${process.env.NEXT_PUBLIC_API_WITHOUT}` + message?.messages[0]?.sender?.image
                      : '/image/team1.png'
                  }
                  alt={message?.createdBy?.firstName}
                  width={40}
                  height={40}
                  style={imageStyles}
                />
              </Box>
              <Typography flexShrink={0} className='messagerie__listname' style={{ marginLeft: '16px' }}>
                {message?.messages[0]?.sender?.firstName + ' ' + message?.messages[0]?.sender?.lastName}
              </Typography>
              <Typography className='messagerie__listTitle' style={{ marginLeft: '16px' }}>
                {message?.object}
              </Typography>
              <Box marginLeft='auto' flexShrink={0}>
                <Typography className='messagerie__listdate' style={{ marginLeft: 'auto', justifyContent: 'left' }}>
                  {formatDate(message?.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))
     }
    </Box>
  )
}

export default MessagerieComponent
