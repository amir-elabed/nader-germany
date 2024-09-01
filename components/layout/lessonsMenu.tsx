import React from 'react'
import { List, ListItem, ListItemText, Box, Grid } from '@mui/material'
import { useRouter } from 'next/navigation'

const sidebarStyle = {
  width: '100%',
  height: '100%',
  borderRight: '1px solid #E5E5E5',
  backgroundColor: '#FFFFFF',
  paddingTop: '0'
}
function LessionsMenu(props: any) {
  const router = useRouter()

  return (
    <Box style={sidebarStyle}>
      <List sx={{ paddingTop: '0 !important' }}>
        {props?.modules
          ?.filter((mod: any) => mod?.cours?.length > 0)
          ?.map((module: any, index: any) => (
            <React.Fragment key={index}>
              <ListItem className='explorerTitle'>
                <Grid container alignItems='center'>
                  <ListItemText
                    primary={module?.title}
                    sx={{
                      textAlign: 'left',
                      justifyContent: 'space-between',
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '10px 0px'
                    }}
                  />
                </Grid>
              </ListItem>
              <List style={{ backgroundColor: '#F1F1F1' }}>
                {module?.cours.map((course: any, courseIndex: any) => (
                  <ListItem
                    onClick={() => router.push(`/espace-incube/programme/cours/${course?._id}`)}
                    className='explorerCourse'
                    key={courseIndex}
                    button
                  >
                    <ListItemText primary={course?.title} sx={{ textAlign: 'left' }} />
                  </ListItem>
                ))}
              </List>
            </React.Fragment>
          ))}
      </List>
    </Box>
  )
}

export default LessionsMenu
