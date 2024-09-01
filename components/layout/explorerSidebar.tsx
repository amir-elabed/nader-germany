import React from 'react'
import { Box } from '@mui/material'

import LessonsMenu from './lessonsMenu'
import SideBar from './sideBar'


const ExplorerSidebar = ({ isSideOpen, isMenuOpen, modulesData }: any) => {

  return (
    <Box
    className='ExplorerMenu'
      sx={{
        display: {
          md: 'flex',
          xs: !isMenuOpen ? 'flex' : 'flex',
        }
      }}
    >

<SideBar withTeam={false} isMenuOpen={isMenuOpen}  isSideOpen={isSideOpen} sx={{paddingTop:{lg:'0 !important', xs:'80px !important'}}} />
  
      {isSideOpen && <LessonsMenu modules={modulesData} />}
    </Box>
  )
}

export default ExplorerSidebar
