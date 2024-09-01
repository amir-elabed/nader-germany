'use client'

import React from 'react'
import Box from '@mui/system/Box'
import SocialMedia from '../commun/socialmedia'

import { Typography, Button, Container, Grid } from '@mui/material'

const buttonsData = ['Conditions générales', 'Politique de confidentialité', 'Politique relative aux cookies']

const settings = '2023 © Conception et développement par: TanitWeb'

function Footer({ data }: any) {

  return (
    <Box className='footer'>
      <Box className='footer__section'>
        <Container maxWidth='lg' fixed>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={1}></Grid>
            <Grid item xs={12} lg={11}>
              <Box
                className='footer__section__menu'
                sx={{
                  pl: {
                    lg: '0',
                    xs: '0'
                  },
                  flexWrap: 'wrap',
                  rowGap: '1.5rem',
                  justifyContent: {
                    md: 'space-between',
                    xs: 'center'
                  }
                }}
              >
                <Box>
                  {buttonsData.map((button, index) => (
                    <Button
                      key={index}
                      variant='text'
                      color='inherit'
                      sx={{
                        padding: '4px 8px',
                        fontSize: '14px',
                        color: '#031326',
                        fontFamily: 'Poppins',
                        borderRadius: '0',
                        textTransform: 'none',
                        borderRight: {
                          md: '1px solid #E5E5E5',
                          xs: 'none'
                        },
                        width: {
                          md: 'auto',
                          xs: '100%'
                        },
                        marginBottom: {
                          md: '0',
                          xs: '0.5rem'
                        },
                        '&:last-of-type': {
                          borderRight: 'none'
                        }
                      }}
                    >
                      {button}
                    </Button>
                  ))}
                </Box>
                <Box>
                  <SocialMedia data={data} sx={{ mr: '5px' }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className='footer__copyright'>
        <Typography>{settings}</Typography>
      </Box>
    </Box>
  )
}

export default Footer
