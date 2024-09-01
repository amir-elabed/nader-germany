import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

//import DoneIcon from '@mui/icons-material/Done'
//import StarIcon from '@mui/icons-material/Star'
import HorizontalCard from '../card/horizontalCard'
import { formatDate } from '@/utils/formatDate'

const expertData = {
  imageUrl: '/image/team1.png',
  title: 'Fabio Modica',
  description: 'Directeur Artistique et de la production'
}

/*function RatingStars(props: any) {
  const maxStars = 5 // Maximum number of stars
  const filledStars = Math.min(Math.round(props?.rating), maxStars)

  const starElements = Array.from({ length: maxStars }, (_, index) => (
    <StarIcon key={index} style={{ color: index < filledStars ? '#C09F50' : 'gray', fontSize: '20px' }} />
  ))

  return (
    <Box display='flex' alignItems='center' marginLeft='20px'>
      {starElements}
    </Box>
  )
}*/

function description(props: any) {
  const course = props?.data

  return (
    <Grid container spacing={1}>
      <Box>
        <Typography className='title'>{course?.title}</Typography>
        <Box display='flex' alignItems='center' marginBottom='10px'>
          {/* <Typography className='smalldescription'>1h45min</Typography>
         <RatingStars rating={4.5} /> Replace with the actual rating */}
          <Typography className='smalldescription' style={{ marginLeft: '20px' }}>
            Crée le {formatDate(course?.publishDate)}
          </Typography>
          <Typography className='smalldescription' style={{ marginLeft: '20px' }}>
            Mis à jour le {formatDate(course?.updatedDate)}
          </Typography>
        </Box>
        <Box marginBottom='20px'>
          <HorizontalCard
            cardWidth='100%'
            imagePosition='right'
            imageUrl={course?.createdBy?.image}
            title={expertData.title}
            description={expertData.description}
            border={false}
          />
        </Box>
      </Box>

      {props?.data?.contentType === 3 && (
        <Grid item xs={12} sx={{
          paddingLeft: '0!important',
          '& a': {
            color: '#0C5BB0',
            textDecoration: 'none'
          }
        }}>
          <a href={`${process.env.NEXT_PUBLIC_API_WITHOUT}` + props?.data?.content} target='_blank'>
            Voir le document
          </a>
        </Grid>
      )}

      <Grid item xs={12} sx={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '0!important' }}>
        <Typography className='description' dangerouslySetInnerHTML={{ __html: course?.description }}></Typography>
      </Grid>
    </Grid>
  )
}

export default description
