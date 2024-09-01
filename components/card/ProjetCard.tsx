import { Modal, useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

const HomeSliderCard = ({ imageUrl, title, description }: any) => {
  const [open, setOpen] = useState(false)

  const isMobile = useMediaQuery('(max-width:600px)') // Media query to detect mobile devices

  const handleOpen = () => {
    if (!isMobile) {
      setOpen(true)
    }
  }
  const handleClose = () => setOpen(false)

  return (
    <>
      <Box className='cardHomeProjet'>
        <Box className='cardHome__image' onClick={handleOpen} style={{ cursor: isMobile ? 'default' : 'pointer' }}>
          <img src={imageUrl} width={300} height={300} alt='card image' />
        </Box>
        <Box className='cardHome__projet' sx={{ marginTop: '10px' }}>
          <Typography component='h4' className={`cardHome__projetitle`} sx={{ color: '#000000 !important' }}>
            {title}
          </Typography>
          <Typography
            component='p'
            className={`cardHome__descriptionprojet`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </Box>
      </Box>
      <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            width: '80vw', // Fixed width
            height: '80vh', // Fixed height
            maxWidth: '800px', // Max width to control large screens
            maxHeight: '800px', // Max height to control large screens
            outline: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={imageUrl}
            alt='card image'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain' // Ensures the image scales correctly without distortion
            }}
          />
        </Box>
      </Modal>
    </>
  )
}
export default HomeSliderCard
