// MyCard.js
import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

const MyCard = ({ icon: Icon, title }: any) => {
  return (
    <Card className='homecard' sx={{ backgroundColor: '#F7F7F7' }} elevation={0}>
      <CardContent sx={{ paddingBlock: 6, paddingInline: 3.5 }} >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {Icon && <Icon sx={{ fontSize: '50px', color: '#292930' }} />}
          <Typography className='homecard__title' variant='h5' component='div' mt={2} textAlign='center'>
            {title}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default MyCard
