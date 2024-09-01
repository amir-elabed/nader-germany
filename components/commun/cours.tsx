'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

const CourseComponent = (props: any) => {
  const router = useRouter()

  const { t } = useTranslation()

  return (
    <Box className='cours'>
      <Box className='cours__coursTitle'>
        <Typography className='subtitleMeduim'>{props?.title}</Typography>
        <Typography className='descriptionMeduim'>{props?.description}</Typography>
      </Box>
      {props?.cours.map((course: any, index: any) => (
        <Box key={index}>
          <Box className='cours__coursList'>
            <Box display='flex' alignItems='center'>
              {course.type === 1 ? (
                <VideocamOutlinedIcon className='cours__listicons' />
              ) : (
                <TextSnippetOutlinedIcon className='cours__listicons' />
              )}
              <Typography className='cours__listTitle' sx={{ marginLeft: '16px' }}>
                {course?.title}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Box style={{ borderLeft: '1px solid #E5E5E5', margin: '0 10px', height: '40px' }}></Box>
              {course?.status === '1' ? (
                <Box sx={{ background: '#E4FBF1', padding: '5px' }}>
                  <Typography style={{ color: '#03D87F' }}>{t('published')}</Typography>
                </Box>
              ) : (
                <Box sx={{ background: '#F5E4E5', padding: '5px' }}>
                  <Typography style={{ color: '#CC0000' }}>{t('unpublished')}</Typography>
                </Box>
              )}
              <Box style={{ borderLeft: '1px solid #E5E5E5', margin: '0 10px', height: '40px' }}></Box>
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => router.push(`/espace-expert/cours/modification/${course?._id}`)}
              >
                <CreateOutlinedIcon className='cours__actionsicons' />
              </Box>
            </Box>
          </Box>
          {index !== props?.cours?.length - 1 && <Box sx={{ borderBottom: `1px solid #E5E5E5` }} />}
        </Box>
      ))}
    </Box>
  )
}

export default CourseComponent
