'use client'
import React from 'react'
import { Typography, Grid, Box, Container } from '@mui/material'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'


function Partners(props: any) {
  const { t } = useTranslation()
  const partners = props?.data?.Partners?.length > 0 ? props?.data?.Partners : ''

  return (
    <>
      {partners && (
        <Box className={`${props?.isBottom && 'partners--bottom'} partners`}>
          <Container maxWidth='lg' fixed>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={12} lg={3}>
                <Typography className='partners__title'>{t('partners__title')}</Typography>
              </Grid>
              <Grid item xs={12} lg={9}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    '& img': {
                      width: '5.625rem!important',
                      height: 'auto!important'
                    }
                  }}
                >
                  {partners?.map((item: any, index: number) => (
                    <Grid item key={index}>
                      <Box sx={{ maxWidth: '6rem' }}>
                        <Image
                          src={item?.logo ? `${process.env.NEXT_PUBLIC_API_WITHOUT}` + item?.logo : imagesList[0]}
                          alt={`Image ${index}`}
                          layout='responsive'
                          width={90}
                          height={100}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  )
}

export default Partners
