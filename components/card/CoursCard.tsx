import { Box, LinearProgress, Typography, linearProgressClasses, styled } from '@mui/material'

const CoursCard = ({ title, totalLessons, completedLessons }: any) => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    animation: 'none',
    [`&.${linearProgressClasses.colorPrimary}`]: {
        animation: 'none',
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
        animation: 'none',
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#0A4E96' : '#308fe8',
    }
  }))

  return (
    <Box sx={{ padding: '1rem', borderBottom: '1px solid #E5E5E5', '& .MuiLinearProgress-barColorPrimary': {width: `${(completedLessons * 100) / totalLessons}%}` }}}>
      <Typography
        component={'h3'}
        sx={{
          fontFamily: '"Poppins", sans-serif',
          fontWeight: '500',
          fontSize: '1rem',
          marginBottom: '1rem'
        }}
      >
        {title}
      </Typography>
      <BorderLinearProgress value={(completedLessons * 100) / totalLessons} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '1rem'
        }}
      >
        <Typography
          component={'p'}
          sx={{
            fontFamily: '"Arial", sans-serif',
            fontWeight: '400',
            fontSize: '0.875rem',
            color: '#B7B7B7'
          }}
        >{`${completedLessons}/${totalLessons} Lessons`}</Typography>
        <Typography
          component={'p'}
          sx={{
            fontFamily: '"Arial", sans-serif',
            fontWeight: '400',
            fontSize: '0.875rem',
            color: '#B7B7B7'
          }}
        >{`${((completedLessons * 100) / totalLessons).toFixed(2)}% Complet`}</Typography>
      </Box>
    </Box>
  )
}
export default CoursCard
