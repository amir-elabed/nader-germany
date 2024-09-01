'use client'

import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useRouter } from 'next/navigation'
import { Box, Typography } from '@mui/material'
import { usePathname } from 'next/navigation'

const NavBar = (props: any) => {
  const router = useRouter()
  const pathname = usePathname()

  const currentPath = pathname.split('/').pop()
    const userType = pathname.split('/')
    const premierePartieDuChemin = userType[1]


  return (
    <AppBar position='static' className='menu'>
      <Toolbar
        sx={{
          minHeight: '0!important',
          paddingInline: '0!important',
          justifyContent: {
            xs: 'center',
            lg: 'flex-start'
          },
          rowGap: '1rem',
          '& > *': {
            flexGrow: {
              lg: 0,
              xs: 1
            }
          }
        }}
      >
        {props?.data.map((item: any, index: any) => (
          <Box key={index} className='menu__buttoncontainer'>
            <Typography
              className={`menu__button ${currentPath === item.link ? 'active' : ''}`}
              onClick={() => {
                const path = `/${premierePartieDuChemin}/${item.link}`
                router.push(path)
              }}
            >
              {item.label}
            </Typography>
            {index < props?.data?.length - 1 && <div className='menu__divider'></div>}
          </Box>
        ))}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
