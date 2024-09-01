import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material'

const sidebarStyle = {
  maxWidth: '100%',
  height: '100%',
  borderRight: '1px solid #E5E5E5',
  backgroundColor: '#FFFFFF',
  width: 200,
}

function smallMenu(props: any) {
  return (
    <Box sx={sidebarStyle} >
      <List sx={{paddingTop: '0rem'}}>
        {props?.items.map((item: any, index: any) => (
          <ListItem
            key={index}
            button
           
            className='items'
            onClick={() => index === 0 && props?.setIsSideOpen(!props?.isSideOpen)}
            sx={{
              backgroundColor: item.backgroundColor || sidebarStyle.backgroundColor,
              padding: 0,
     
            }}
          >
            <ListItemIcon sx={{ textAlign: 'center', minWidth: 0, justifyContent: 'space-evenly' }}>
              {item?.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default smallMenu
