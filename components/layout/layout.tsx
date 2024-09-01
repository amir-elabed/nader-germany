'use client'

import { useGetProfileQuery } from '@/services/api/ProfileAPI'
import { Grid } from '@mui/material'
import Dynamic from 'next/dynamic'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useGetProjetQuery } from '@/services/api/ProjetAPI'

const Paper = Dynamic<any>(() => import('@mui/material/Paper'), { ssr: false })
const Header = Dynamic(() => import('../layout/header'), { ssr: false })
const Footer = Dynamic(() => import('../layout/footer'), { ssr: false })
const Hero = Dynamic(() => import('../layout/hero'), { ssr: false })
const SideBar = Dynamic(() => import('../layout/sideBar'), { ssr: false })
const Partners = Dynamic(() => import('./partners'), { ssr: false })
const ExplorerSidebar = Dynamic(() => import('../layout/explorerSidebar'), { ssr: false })

interface LayoutProps {
  children?: any
  isLogged?: any
  withHero?: any
  currentPage?: any
  projectData?: any
  modulesData?: any
  partnersBottom?: boolean
  partnersData?: any
  noMenu?: boolean
  noSidebar?: boolean
}

export default function Layout(props: LayoutProps) {
  const { children } = props
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const [isSideOpen, setIsSideOpen] = useState(true)

  const { data: sessionInfo }: any = useGetProfileQuery({})
  const { data, refetch }: any = useGetProjetQuery(sessionInfo?.projects)

  useEffect(() => {
    refetch
  }, [sessionInfo])

  const projectInfo = props.projectData || data || sessionInfo?.projects[0] || []



  return (
    <>
      <Head>
        {projectInfo?.logo && <link rel='icon' href={`${process.env.NEXT_PUBLIC_API_WITHOUT}` + projectInfo?.logo} />}
      </Head>
      <Paper variant='elevation' component='main' elevation={0}>
        {projectInfo && (
          <Header
            logo={projectInfo?.logo}
            isLogged={props?.isLogged}
            setIsMenuOpen={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
            noMenu={props?.noMenu}
          />
        )}
        {props?.isLogged ? (
          props?.currentPage !== 'incube-course-detail' ? (
            <Grid container>
              <Grid
                item
                xs={12}
                lg={isMenuOpen ? 1.75 : 0.5}
                sx={{
                  paddingBlock: '1.5rem',
                  transition: 'all 0.3s ease',
                  display: props?.noSidebar ? 'none' : 'block'
                }}
              >
                <SideBar
                  projectData={projectInfo}
                  withTeam={true}
                  setIsMenuOpen={setIsMenuOpen}
                  isMenuOpen={isMenuOpen}
                />
              </Grid>
              <Grid
                sx={{ display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', minHeight: '100vh' }}
                item
                xs={12}
                lg={props?.noSidebar ? 12 : isMenuOpen ? 10.25 : 11.5}
              >
                <Hero isLogged={props?.isLogged} projectData={projectInfo} />
                {!props?.partnersBottom ? <Partners data={projectInfo} /> : ''}
                {children}
                {props?.partnersBottom ? <Partners isBottom={true} data={projectInfo} /> : ''}
              </Grid>
            </Grid>
          ) : (
            <>
              <Grid container style={{ marginTop: '80px' }}>
                <Grid
                  item
                  xs={12}
                  md={isSideOpen ? 3.25 : 1.25}
                  lg={isSideOpen ? 4 : 1}
                  sx={{
                    transition: 'all 0.3s ease'
                  }}
                >
                  <ExplorerSidebar
                    modulesData={props?.modulesData}
                    setIsSideOpen={setIsSideOpen}
                    isSideOpen={isSideOpen}
                    isMenuOpen={isMenuOpen}
                  />
                </Grid>
                <Grid
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    flexGrow: '1!important',
                    maxWidth: '100%!important',
                    minHeight: '100vh'
                  }}
                  item
                  xs={12}
                  md={isSideOpen ? 8.75 : 10.75}
                  lg={isSideOpen ? 8: 11}
                >
                  {!props?.partnersBottom ? <Partners data={projectInfo} /> : ''}
                  {children}
                  {props?.partnersBottom ? <Partners isBottom={true} data={projectInfo} /> : ''}
                </Grid>
              </Grid>
            </>
          )
        ) : (
          <>
            <Hero isLogged={props?.isLogged} currentPage={props?.currentPage} projectData={projectInfo} />
            <Partners data={projectInfo} />
            {children}
          </>
        )}
        <Footer data={projectInfo} />
      </Paper>
    </>
  )
}
