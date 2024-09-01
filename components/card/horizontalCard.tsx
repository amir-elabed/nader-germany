import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { formatDate } from '@/utils/formatDate'

const CustomCard = (props: any) => {
  const cardStyles = {
    width: props?.cardWidth || '100%',
    paddingInline: props?.variant ? '1rem' : props?.isCardProgramme ? '2.25rem' : '0',
    paddingBlock: '1rem',
    border: props.border ? '1px solid #E5E5E5' : 'none',
    borderRadius: '3%',
    display: 'flex',
    alignItems: props?.isCardProgramme ? 'center' : 'flex-start',
    gap: props?.isCardProgramme ? '0.5rem' : '0'
  }

  const imageStyles = {
    borderRadius: '50%',
    width: '1.875rem',
    height: '1.875rem',
    objectFit: 'cover' as const,
    marginRight:
      props?.imagePosition === 'right' && !props?.isCardProgramme ? '0.6875rem' : props?.isCardProgramme ? '0' : '0',
    marginLeft:
      props?.imagePosition === 'left' && !props?.isCardProgramme ? '0.6875rem' : props?.isCardProgramme ? '0' : '0',
    marginTop: '0.25rem'
  }



  return (
    <Box
      sx={cardStyles}
      className={`horizantalCard ${
        props?.variant === 'expert' ? 'expert' : props?.variant === 'annonce' ? 'expert annonce' : ''
      }`}
      alignItems='center'
    >
      <Box>
        <Image
          src={
            props?.imageUrl && props?.imageUrl !== 'undefined'
              ? `${process.env.NEXT_PUBLIC_API_WITHOUT}` + props?.imageUrl
              : '/image/team1.png'
          }
          alt={props?.title || 'alt'}
          width={34}
          height={34}
          style={imageStyles}
        />
      </Box>
      <Box className='card__body'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'left'
          }}
        >
          {props?.authorName && <Typography className='horizantalCard__title' >{props?.authorName}</Typography>}
          {props?.authorFunction && (
            <Typography className='horizantalCard__description' >{props?.authorFunction}</Typography>
          )}
          {props?.publishDate && props?.publishDate !== '' && (
            <Typography className='horizantalCard__description'>{formatDate(props?.publishDate)}</Typography>
          )}
          {props?.title && (
            <Typography
              className='annonce__title'
              sx={{
                mt: 3
              }}
            >
              {props?.title}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default CustomCard
