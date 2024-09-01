import { Grid } from '@mui/material'
import Dynamic from 'next/dynamic'
import { useState } from 'react'

const Paper = Dynamic<any>(() => import('@mui/material/Paper'), { ssr: false })
const Header = Dynamic(() => import('../layout/adminNav'), { ssr: false })
const Footer = Dynamic(() => import('../layout/adminFooter'), { ssr: false })
const SideBar = Dynamic(() => import('../layout/sideBar'), { ssr: false })

interface LayoutProps {
  children?: any
}

export default function Layout(props: LayoutProps) {
  const { children } = props

  const [isMenuOpen, setIsMenuOpen] = useState(true)

  return (
    <>
      <Paper variant='elevation' component='main' elevation={0}>
        <Header setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
        <Grid container sx={{ minHeight: 'calc(100vh - 6.5rem)' }}>
          <Grid item xs={12} lg={isMenuOpen ? 1.75 : 0.5} sx={{ transition: 'all 0.3s ease' }}>
            <SideBar withTeam={false} isMenuOpen={isMenuOpen} />
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              paddingTop: '5rem',
              minHeight: '100vh'
            }}
            item
            xs={12}
            lg={isMenuOpen ? 10.25 : 11.5}
          >
            {children}
          </Grid>
        </Grid>
        <Footer />
      </Paper>
    </>
  )
}
