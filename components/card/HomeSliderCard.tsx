import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import Link from 'next/link'

const HomeSliderCard = ({ type, imageUrl, title, description, lessons, students, id, link }: any) => {
  return (
    <Box className='cardHome' sx={{ '& *': { textDecoration: 'none', color: 'inherit' } }}>
      <Link href={link}>
        <Box className='cardHome__image'>
          <img src={imageUrl} width={300} height={300} alt='card image' />
          <img src='/image/logo-card.png' className='logo-card' width={168} height={68} alt='card image' />
        </Box>
        <Box className='cardHome__body'>
          <Typography
            component='h4'
            className={`cardHome__title ${type === 1 ? 'cardHome__title--first' : 'cardHome__title--second'}`}
            sx={{ color: '#000000 !important', py: '1rem' }}
          >
            {title}
          </Typography>
          {type === 2 && (
            <Typography
              component='p'
              className={`cardHome__description`}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          {type === 2 && (
            <Button endIcon={<ArrowRightAlt />} className={`cardHome__button`}>
              Voir plus
            </Button>
          )}
        </Box>
        {type === 1 && (
          <Box className='cardHome__footer'>
            <Typography component='p'>
              <LibraryBooksOutlinedIcon />
              <span>{lessons} Modules</span>
            </Typography>
            <Typography component='p'>
              <GroupOutlinedIcon />
              <span>{students} Incubés</span>
            </Typography>
          </Box>
        )}
      </Link>
    </Box>
  )
}
export default HomeSliderCard
