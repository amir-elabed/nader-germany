import { Box, Typography } from '@mui/material'
import { useGetDashboardExpertQuery } from '@/services/api/DashboardAPI'


const TableExpert = ({  type, noBackground }: any) => {
  const { data } = useGetDashboardExpertQuery({}); 

  return (


    <Box>
    

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

{type == 'modules' &&
        data?.data?.modules?.map((row: any, index: number) => (
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
                {row?.intro}
              </Typography>
            </Box>
          </Box>
        ))}



{type == 'QR' &&
        data?.data?.questionAndReplies?.map((row: any, index: number) => (
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
                  {row?.content}
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
                {row?.userId?.firstName}  {row?.userId?.lastName}
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





    </Box>
  )
}

export default TableExpert

