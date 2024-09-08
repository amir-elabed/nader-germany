import { useGetHomePageQuery } from '@/services/api/HomePageAPI'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Image from 'next/image'

const Hero = ({ image }: any) => {
  return (
    <Box
      className='hero'
      sx={{
        backgroundImage: 'url("/image/weiss.jpg")',
        backgroundAttachment: 'scroll!important',

        backgroundPosition: '50% 50%', // Centers the image within the box
        height: '100vh', // Full viewport height
        position: 'relative' // Ensures the container can be positioned inside
      }}
    >
      <Container
        fixed
        maxWidth={'xl'}
        sx={{
          position: 'absolute',
          bottom: '10%', // Positions the container at the bottom of the box
          left: '40%',
          transform: 'translateX(-50%)', // Centers the container horizontally
          textAlign: 'center', // Centers the text inside the container
          paddingBottom: '20px' // Adds some space below the text
          // width: '50%'
        }}
      >
        {/* <Typography
          component='h1'
          sx={{ p: '0 !important', m: '0 !important' }}
          className='hero__title'
          dangerouslySetInnerHTML={{ __html: 'BBS EXPRESS' }}
        /> */}
        {/* <Image
          src='/image/plan1.png'
          width={300}
          height={150}
          // style={{ width: '25%', height: 'auto' }}
          alt='banner_logo'
        /> */}
      </Container>
    </Box>
  )
}

export default Hero
