'use client'

import React from 'react'
import AppBar from '@mui/material/AppBar'
import HeaderNav from './headerNav'
import { Container, Grid } from '@mui/material'



const Header = (props: any) => {


  return (
    <>
      <AppBar className='navbar'>
        {props?.isLogged ? (
          <Grid container>
            <Grid item xs={12} lg={1.75}></Grid>
            <Grid item xs={12} lg={10.25}>
              <Container
                maxWidth='lg'
                fixed
                sx={{
                  padding: {
                    xs: '0 0.5rem',
                    lg: '0 1rem'
                  }
                }}
              >
                <HeaderNav
                  noMenu={props?.noMenu}
                  logo={props?.logo}
                  setIsMenuOpen={props?.setIsMenuOpen}
                  isMenuOpen={props?.isMenuOpen}
                  isLogged={props?.isLogged}
                />
              </Container>
            </Grid>
          </Grid>
        ) : (
          <Container maxWidth='lg' fixed>
            <HeaderNav
              noMenu={props?.noMenu}
              logo={props?.logo}
              setIsMenuOpen={props?.setIsMenuOpen}
              isMenuOpen={props?.isMenuOpen}
            />
          </Container>
        )}
      </AppBar>
    </>
  )
}

export default Header
