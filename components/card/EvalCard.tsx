import { Box, Typography } from '@mui/material'

const EvalCard = ({ title, value, type }: any) => {
  return (
    <Box className='DashboardCard' sx={type === 'expert' ? {padding: '0.875rem 0.75rem'} : {}}>
      <Box className='DashboardCard__body'>
        <Typography component='h2' className='DashboardCard__title' sx={type === 'expert' ? { color: '#031326!important', fontSize: '0.875rem!important', marginBottom: '0!important' } : {}}>
          {title}
        </Typography>
        <Typography component='p' className='DashboardCard__value' sx={type === 'expert' ? { color: '#0A4E96!important', fontSize: '1.8125rem!important' } : {}}>
          {value || '0'}
        </Typography>
      </Box>
    </Box>
  )
}
export default EvalCard
