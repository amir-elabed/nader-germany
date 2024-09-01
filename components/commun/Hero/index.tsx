import { useGetHomePageQuery } from '@/services/api/HomePageAPI'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

const Hero = ({ image }: any) => {
  return (
    <Box
      className='hero'
      sx={{
        backgroundImage: 'url("/image/weiss.jpg")'
      }}
    >
      <Container fixed maxWidth={'xl'}>
        <Typography
          component='h1'
          sx={{ p: '0 !important', m: '0 !important' }}
          className='hero__title'
          dangerouslySetInnerHTML={{ __html: 'BBS EXPRESS' }}
        />
      </Container>
    </Box>
  )
}

export default Hero
