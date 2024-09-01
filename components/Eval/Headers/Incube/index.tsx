import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

const labelStyle = {
  color: '#05264A',
  fontFamily: '"Poppins", sans-serif',
  fontWeight: '700',
  '&:first-letter': {
    textTransform: 'uppercase'
  }
}

const flexStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
}

const dateStyle = {
  color: '#746A6F',
  fontFamily: '"Poppins", sans-serif',
  fontWeight: '500',
  fontSize: '1rem',
  marginTop: '0.375rem'
}

const HeaderIncubeEval = ({ data , criteraData }: any) => {
  const { t } = useTranslation()


  return (
    <Box
      sx={{
        padding: '1.5rem 1rem',
        border: '1px solid #E5E5E5',
        marginBottom: '2rem'
      }}
    >
      <Typography
        component='h2'
        sx={{
          ...labelStyle,
          fontSize: '1.375rem',
          marginBottom: '1.25rem',
          '& span': {
            fontSize: '1.125rem',
            color: '#0A4E96',
            fontWeight: '600'
          }
        }}
      >
        {t('name') + ' ' + t('tableHeader__incube')}:{' '}
        <span> {data && data?.user?.firstName + ' ' + data?.user?.lastName}</span>
      </Typography>
      <Box
        sx={{
          ...flexStyle,
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={flexStyle}>
          <Typography component='h3' sx={{ ...labelStyle, fontSize: '1.125rem' }}>
            {t('Status')}:
          </Typography>
          {data?.evaluation_periode?.status === '0' && (
            <Box sx={{ backgroundColor: '#E5E5E5', padding: '5px' }}>
              <Typography style={{ color: '#05264A' }}>{t('Draft')}</Typography>
            </Box>
          )}
          {data?.evaluation_periode?.status === '1' && (
            <Box sx={{ backgroundColor: '#E5E5E5', padding: '5px' }}>
              <Typography style={{ color: '#0A4E96' }}>{t('initialized')}</Typography>
            </Box>
          )}
          {data?.evaluation_periode?.status === '2' && (
            <Box sx={{ backgroundColor: '#FFE3CC', padding: '5px' }}>
              <Typography style={{ color: '#CC4700' }}>{t('In progress')}</Typography>
            </Box>
          )}
          {data?.evaluation_periode?.status === '3' && (
            <Box sx={{ backgroundColor: '#E4FBF1', padding: '5px' }}>
              <Typography style={{ color: '#03D87F' }}>{t('Finished')}</Typography>
            </Box>
          )}
        </Box>
        <Box sx={flexStyle}>
          <Typography component='h3' sx={{ ...labelStyle, fontSize: '1.125rem' }}>
            {t('Critères')}:
          </Typography>
          <Typography component={'p'} sx={dateStyle}>
            {criteraData?.evaluatedCriteria}/{criteraData?.totalCriteria}
          </Typography>
        </Box>
        <Box sx={flexStyle}>
          <Typography component='h3' sx={{ ...labelStyle, fontSize: '1.125rem' }}>
            {t('Note')}:
          </Typography>
          <Typography component={'p'} sx={dateStyle}>
            {data?.overallAverage || "-"}/20
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
export default HeaderIncubeEval
