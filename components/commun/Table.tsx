import { Box, Typography } from '@mui/material'
import { useGetDashboardAdminProjetQuery } from '@/services/api/DashboardAPI'


const Table = ({  type, noBackground }: any) => {
  const { data } = useGetDashboardAdminProjetQuery({}); 

  return (


    <Box>
      {type == 'event' && (
        <Box sx={{ border: '1px solid #e5e5e5', padding: '1.25rem', marginBottom: '2rem' }}>
          {  data?.data?.events?.map((row: any, index: number) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.25rem'
              }}
            >
              <Box
                sx={{
                  width: '3rem',
                  height: '3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F3F3F8',
                  borderRadius: '9999px'
                }}
              >
                <Typography
                  sx={{
                    color: '#0A4E96',
                    fontWeight: '700',
                    fontSize: '1.125rem',
                    fontFamily: '"poppins", sans-serif'
                  }}
                >
                  {row?.status}
                </Typography>
              </Box>
              <Box>
                <Typography
                  component='h3'
                  sx={{
                    color: '#05264A',
                    fontWeight: '600',
                    fontSize: '1.125rem',
                    marginBottom: '0.25rem',
                    fontFamily: '"poppins", sans-serif'
                  }}
                >
                  {row?.title}
                </Typography>
                <Typography
                  component={'p'}
                  sx={{
                    color: '#746A6F',
                    fontWeight: '400',
                    fontSize: '0.75rem',
                    fontFamily: '"poppins", sans-serif'
                  }}
                >
                  {row?.createdBy?.firstName} {row?.createdBy?.lastName}
                </Typography>
              </Box>
              <Box sx={{ marginLeft: 'auto' }}>
                <Typography
                  component={'p'}
                  sx={{
                    fontSize: '0.75rem',
                    color: '#B7B7B7',
                    fontFamily: '"Arial", sans-serif',
                    fontWeight: '400',
                    textAlign: 'right'
                  }}
                >
                  {row?.start_date}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}

{type == 'incube' &&
        data?.data?.incubes?.map((row: any, index: number) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              border: '1px solid #E5E5E5',
              borderTop: 'none',
              padding: '0.625rem 1.25rem',
              '&:nth-of-type(odd)': {
                backgroundColor: !noBackground ? '#F7F9FC' : '#fff'
              },

              '&:first-of-type': {
                borderTop: '1px solid #E5E5E5'
              }
            }}
          >
            <Box>
             
                <Typography
                  component={'h3'}
                  sx={{
                    color: '#05264A',
                    fontWeight: '600',
                    fontSize: '1.125rem',
                    marginBottom: '0.25rem',
                    fontFamily: '"poppins", sans-serif'
                  }}
                >
                  {row?.firstName}{row?.lastName}
                </Typography>
             
              <Typography
                component={'p'}
                sx={{
                  color: '#746A6F',
                  fontWeight: '400',
                  display: type === 'resources' ? 'flex' : 'block',
                  alignItems: 'center',
                  gap: '0.625rem',
                  fontSize: type === 'resources' ? '1rem' : '0.75rem',
                  fontFamily: type === 'resources' ? '"Arial", sans-serif' : '"poppins", sans-serif'
                }}
              >
                {row?.icon && row?.icon}
                {row?.function}
              </Typography>
            </Box>
            <Box sx={{ flexShrink: 0 }}>
              <Typography
                component={'p'}
                sx={{
                  fontSize: '0.875rem',
                  color: '#746A6F',
                  fontFamily: '"Arial", sans-serif',
                  fontWeight: '400',
                  textAlign: 'right'
                }}
              >
                {row?.createdAt}
              </Typography>
            </Box>
          </Box>
        ))}

{type == 'expert' &&
        data?.data?.experts?.map((row: any, index: number) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              border: '1px solid #E5E5E5',
              borderTop: 'none',
              padding: '0.625rem 1.25rem',
              '&:nth-of-type(odd)': {
                backgroundColor: !noBackground ? '#F7F9FC' : '#fff'
              },

              '&:first-of-type': {
                borderTop: '1px solid #E5E5E5'
              }
            }}
          >
            <Box>
              
                <Typography
                  component={'h3'}
                  sx={{
                    color: '#05264A',
                    fontWeight: '600',
                    fontSize: '1.125rem',
                    marginBottom: '0.25rem',
                    fontFamily: '"poppins", sans-serif'
                  }}
                >
              {row?.firstName}{row?.lastName}
                </Typography>
            
              <Typography
                component={'p'}
                sx={{
                  color: '#746A6F',
                  fontWeight: '400',
                  display: type === 'resources' ? 'flex' : 'block',
                  alignItems: 'center',
                  gap: '0.625rem',
                  fontSize: type === 'resources' ? '1rem' : '0.75rem',
                  fontFamily: type === 'resources' ? '"Arial", sans-serif' : '"poppins", sans-serif'
                }}
              >
                {row?.icon && row?.icon}
                {row?.function}
              </Typography>
            </Box>
            <Box sx={{ flexShrink: 0 }}>
              <Typography
                component={'p'}
                sx={{
                  fontSize: '0.875rem',
                  color: '#746A6F',
                  fontFamily: '"Arial", sans-serif',
                  fontWeight: '400',
                  textAlign: 'right'
                }}
              >
                  {row?.createdAt}
              </Typography>
            </Box>
          </Box>
        ))}

      {type == 'annonces' &&
        data?.data?.annonces?.map((row: any, index: number) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              border: '1px solid #E5E5E5',
              borderTop: 'none',
              padding: '0.625rem 1.25rem',
              '&:nth-of-type(odd)': {
                backgroundColor: !noBackground ? '#F7F9FC' : '#fff'
              },

              '&:first-of-type': {
                borderTop: '1px solid #E5E5E5'
              }
            }}
          >
            <Box>
             
                <Typography
                  component={'h3'}
                  sx={{
                    color: '#05264A',
                    fontWeight: '600',
                    fontSize: '1.125rem',
                    marginBottom: '0.25rem',
                    fontFamily: '"poppins", sans-serif'
                  }}
                >
                  {row?.title}
                </Typography>
              
              <Typography
                component={'p'}
                sx={{
                  color: '#746A6F',
                  fontWeight: '400',
                  display: type === 'resources' ? 'flex' : 'block',
                  alignItems: 'center',
                  gap: '0.625rem',
                  fontSize: type === 'resources' ? '1rem' : '0.75rem',
                  fontFamily: type === 'resources' ? '"Arial", sans-serif' : '"poppins", sans-serif'
                }}
              >
                {row?.icon && row?.icon}
                {row?.createdBy?.firstName}  {row?.createdBy?.lastName}
              </Typography>
            </Box>
            <Box sx={{ flexShrink: 0 }}>
              <Typography
                component={'p'}
                sx={{
                  fontSize: '0.875rem',
                  color: '#746A6F',
                  fontFamily: '"Arial", sans-serif',
                  fontWeight: '400',
                  textAlign: 'right'
                }}
              >
                {row?.publish_date}
              </Typography>
            </Box>
          </Box>
        ))}
    </Box>
  )
}

export default Table
