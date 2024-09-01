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

const HeaderModuleEval = ({ data }: any) => {

  const { t } = useTranslation()

  return (
    <>
      {data && (
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
            {t('Module')}: <span> {data?.module?.title}</span>
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
                {t('evaluation')}:
              </Typography>
              <Typography component={'p'} sx={dateStyle}>
                {data?.evaluations?.filter((evaluation: any) => evaluation.note !== null)?.length +
                  ' / ' +
                  data?.evaluations?.length}
              </Typography>
            </Box>
            <Box sx={flexStyle}>
              <Typography component='h3' sx={{ ...labelStyle, fontSize: '1.125rem' }}>
                {t('Note')}:
              </Typography>
              <Typography component={'p'} sx={dateStyle}>
                {(data?.moduleAverage || ("-")) + ' / ' + 20}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}
export default HeaderModuleEval
