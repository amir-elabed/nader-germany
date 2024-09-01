import { Box, Typography } from '@mui/material'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Link from 'next/link'

const VerticalCard = ({ imageUrl, title, description, id }: any) => {
  return (
    <>
      <Link href={`/article/${id}`} style={{ textDecoration: 'none' }}>
        <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }} className='cardNews'>
          <img
            src={`${process.env.NEXT_PUBLIC_API_WITHOUTSLASH}${imageUrl}`}
            alt='Image Alt Text'
            width={330}
            height={200}
          />
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '18px',
              textAlign: 'left',
              padding: '10px'
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              color: '#746A6F',
              textAlign: 'left',
              padding: '10px',
              lineHeight: 1.4,
              maxHeight: '6em',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical'
            }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <Box sx={{ display: 'flex', justifyContent: ' end', alignItems: 'center' }}>
            <Typography
              className='text-voir'
              sx={{
                textAlign: 'right',
                py: '1rem',
                color: '#0A4E96',
                fontFamily: "'Poppins',sans-serif",
                fontWeight: '500'
              }}
            >
              Voir plus{' '}
            </Typography>
            <ArrowForwardIcon sx={{ color: '#0A4E96', padding: '5px' }} />{' '}
          </Box>
        </Box>
      </Link>
    </>
  )
}

export default VerticalCard
