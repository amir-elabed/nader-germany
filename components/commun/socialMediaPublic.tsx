import { Box } from '@mui/material'
import React from 'react'
import Dynamic from 'next/dynamic'

const LinkedInIcon = Dynamic(() => import('@mui/icons-material/LinkedIn'), {
  ssr: false
})
const YouTubeIcon = Dynamic(() => import('@mui/icons-material/YouTube'), {
  ssr: false
})
const Instagram = Dynamic(() => import('@mui/icons-material/Instagram'), {
  ssr: false
})

const IconBox = (props: any) => {

  return (
    <Box sx={{ display: 'flex' }}>
      {props?.data?.facebook && (
        <Box>
          <span>
            <Box
              className='socialMedia'
              sx={{
                '& :hover path': {
                  fill: '#fff'
                }
              }}
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='8.469' height='18.348' viewBox='0 0 8.469 18.348'>
                <path
                  id='Tracé_2523'
                  data-name='Tracé 2523'
                  d='M246.175,168.594h3.7v-9.252h2.577l.275-3.1H249.87V154.48c0-.731.147-1.019.852-1.019h2v-3.215h-2.558c-2.749,0-3.989,1.211-3.989,3.529v2.47h-1.922v3.137h1.922Z'
                  transform='translate(-244.253 -150.246)'
                  fill='#087FD1'
                  style={{
                    fill: '#292930'
                  }}
                />
              </svg>
            </Box>
          </span>
        </Box>
      )}
      {props?.data?.twitter && (
        <Box>
          <span>
            <Box className='socialMedia'>
              <svg xmlns='http://www.w3.org/2000/svg' version='1.2' viewBox='0 0 20 20' width='20' height='20'>
                <path
                  id='Layer'
                  fill-rule='evenodd'
                  d='m20 20h-6l-5.4-7.8-6.8 7.8h-1.8l7.8-8.9-7.8-11.1h6l5.1 7.3 6.5-7.3h1.8l-7.5 8.4m3 10.3h2.7l-12.5-17.4h-2.7z'
                  fill='#087FD1'
                  style={{
                    fill: '#292930'
                  }}
                />
              </svg>
            </Box>
          </span>
        </Box>
      )}

      {props?.data?.instagram && (
        <Box>
          <span>
            <Box className='socialMedia'>
              <Instagram
                style={{
                  fontSize: 20,
                  color: '#292930'
                }}
              />
            </Box>
          </span>
        </Box>
      )}
      {props?.data?.youtube && (
        <Box>
          <span>
            <Box className='socialMedia'>
              <YouTubeIcon
                style={{
                  fontSize: 20,
                  color: '#292930'
                }}
              />
            </Box>
          </span>
        </Box>
      )}
      {props?.data?.linkedin && (
        <Box>
          <span>
            <Box className='socialMedia'>
              <LinkedInIcon
                style={{
                  fontSize: 20,
                  color: '#292930'
                }}
              />
            </Box>
          </span>
        </Box>
      )}
    </Box>
  )
}

export default IconBox
