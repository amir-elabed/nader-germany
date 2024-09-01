'use client'

import React from 'react'
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined'
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined'
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined'
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import SchoolIcon from '@mui/icons-material/SchoolOutlined'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined'
import ModeIcon from '@mui/icons-material/Mode'
import InboxIcon from '@mui/icons-material/Inbox'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500'
import Team from '../projet/team'
import { useRouter } from 'next/navigation'
import { useGetProfileQuery } from '../../services/api/ProfileAPI'
import { useTranslation } from 'react-i18next'

const Sidebar = (props: any) => {
  const router = useRouter()

  const { data: sessionInfo, refetch }: any = useGetProfileQuery({})
  const role = parseInt(sessionInfo?.role)

  React.useEffect(() => {
    refetch()
  }, [])

  const { t } = useTranslation()

  const firstItemsIncube = [
    {
      icon: <ExploreOutlinedIcon />,
      text: t('sidebar__explorer'),
      backgroundColor: '#F7F7F7',
      borderColor: '#E5E5E5',
      link: '/espace-incube/explorer'
    },
    {
      icon: <EventNoteOutlinedIcon />,
      text: t('sidebar__project'),
      link: '/espace-incube/presentation'
    },
    {
      icon: <SchoolIcon />,
      text: t('sidebar__program'),
      link: '/espace-incube/programme'
    },
    {
      icon: <LiveHelpOutlinedIcon />,
      text: t('sidebar__qr'),
      link: '/espace-incube/Q&R'
    },
    {
      icon: <AnnouncementOutlinedIcon />,
      text: t('sidebar__announcements'),
      link: '/espace-incube/annonce'
    }
  ]

  const firstItemsExpert = [
    {
      icon: <DashboardOutlinedIcon />,
      text: t('sidebar__dashboard'),
      link: '/espace-expert/dashboard'
    },
    {
      icon: <SchoolIcon />,
      text: t('sidebar__program'),
      link: '/espace-expert/programme'
    },
    {
      icon: <LiveHelpOutlinedIcon />,
      text: t('sidebar__qr'),
      link: '/espace-expert/Q&R'
    },
    {
      icon: <AnnouncementOutlinedIcon />,
      text: t('sidebar__announcements'),
      link: '/espace-expert/annonces'
    }
  ]

  const firstItemsAdminProjet = [
    {
      icon: <DashboardOutlinedIcon />,
      text: t('sidebar__dashboard'),
      link: '/espace-adminprojet/dashboard'
    },
    {
      icon: <ModeIcon />,
      text: t('sidebar__project'),
      link: '/espace-adminprojet/projet/modification'
    },
    {
      icon: <SchoolIcon />,
      text: t('sidebar__program'),
      link: '/espace-adminprojet/programme'
    },
    {
      icon: <StarBorderPurple500Icon />,
      text: t('evaluation'),
      link: '/espace-adminprojet/evaluation'
    },
    {
      icon: <SchoolIcon />,
      text: t('sidebar__pages'),
      link: '/espace-adminprojet/pages'
    },
    {
      icon: <LiveHelpOutlinedIcon />,
      text: t('sidebar__qr'),
      link: '/espace-adminprojet/Q&R'
    },
    {
      icon: <AnnouncementOutlinedIcon />,
      text: t('announcements'),
      link: '/espace-adminprojet/annonces'
    }
  ]

  const firstItemsAdmin = [
    {
      icon: <DashboardOutlinedIcon />,
      text: t('sidebar__dashboard'),
      link: '/espace-admin/dashboard'
    },
    {
      icon: <EventNoteOutlinedIcon />,
      text: t('sidebar__project'),
      link: '/espace-admin/projets'
    },
    {
      icon: <PeopleOutlineOutlinedIcon />,
      text: t('team'),
      link: '/espace-admin/equipe'
    },

    {
      icon: <HandshakeOutlinedIcon />,
      text: t('sidebar__partners'),
      link: '/espace-admin/partners'
    }
  ]

  const secondItemsIncube = [
    {
      icon: <EventNoteOutlinedIcon />,
      text: t('sidebar__agenda'),
      link: '/espace-incube/agenda'
    }
  ]

  const secondItemsExpert = [
    {
      icon: <LibraryBooksIcon />,
      text: t('sidebar__myCourses'),
      link: '/espace-expert/cours'
    },
    {
      icon: <StarBorderPurple500Icon />,
      text: t('evaluation'),
      link: '/espace-expert/evaluation'
    },
    {
      icon: <FolderCopyOutlinedIcon />,
      text: t('sidebar__resources'),
      link: '/espace-expert/ressources'
    },
    {
      icon: <EventNoteOutlinedIcon />,
      text: t('sidebar__groups'),
      link: '/espace-expert/groupes'
    },
    {
      icon: <EventNoteOutlinedIcon />,
      text: t('agenda'),
      link: '/espace-expert/agenda'
    }
  ]

  const secondItemsAdminprojet = [
    {
      icon: <PeopleOutlineOutlinedIcon />,
      text: t('expert'),
      link: '/espace-adminprojet/candidature-expert'
    },
    {
      icon: <PeopleOutlineOutlinedIcon />,
      text: t('sidebar__incube'),
      link: '/espace-adminprojet/candidature-incube'
    },
    {
      icon: <FolderCopyOutlinedIcon />,
      text: t('sidebar__resources'),
      link: '/espace-adminprojet/ressources'
    },
    {
      icon: <EventNoteOutlinedIcon />,
      text: t('agenda'),
      link: '/espace-adminprojet/agenda'
    },
    {
      icon: <NewspaperIcon />,
      text: t('sidebar__news'),
      link: '/espace-adminprojet/news'
    },
    {
      icon: <PeopleOutlineOutlinedIcon />,
      text: t('team'),
      link: '/espace-adminprojet/equipe'
    }
  ]

  const secondItemsAdmin = [
    {
      icon: <NewspaperIcon />,
      text: t('sidebar__news'),
      link: '/espace-admin/news'
    },
    {
      icon: <ContentCopyOutlinedIcon />,
      text: t('sidebar__pages'),
      link: '/espace-admin/pages'
    },
    {
      icon: <ContentCopyOutlinedIcon />,
      text: 'Home Page',
      link: '/espace-admin/home/modification/page-home'
    },
    {
      icon: <AdminPanelSettingsOutlinedIcon />,
      text: t('sidebar__admins'),
      link: '/espace-admin/adminprojet'
    }
  ]

  const messagerieItems = [
    {
      icon: <ModeIcon />,
      text: t('message__new'),
      link:
        role === 1
          ? '/espace-admin/messagerie/ajout'
          : role === 2
          ? '/espace-adminprojet/messagerie/ajout'
          : role === 3
          ? '/espace-expert/messagerie/ajout'
          : '/espace-incube/messagerie/ajout'
    },
    {
      icon: <InboxIcon />,
      text: t('sidebar__messages__receptionBox'),
      link:
        role === 1
          ? '/espace-admin/messagerie'
          : role === 2
          ? '/espace-adminprojet/messagerie'
          : role === 3
          ? '/espace-expert/messagerie'
          : '/espace-incube/messagerie'
    },
    {
      icon: <ForwardToInboxOutlinedIcon />,
      text: t('sidebar__messages__sentMessages'),
      link:
        role === 1
          ? '/espace-admin/messagerie/envoyee'
          : role === 2
          ? '/espace-adminprojet/messagerie/envoyee'
          : role === 3
          ? '/espace-expert/messagerie/envoyee'
          : '/espace-incube/messagerie/envoyee'
    }
  ]
  const firstItems =
    role === 1
      ? firstItemsAdmin
      : role === 4
      ? firstItemsIncube
      : role === 3
      ? firstItemsExpert
      : role === 2
      ? firstItemsAdminProjet
      : []

  const secondItems =
    role === 1
      ? secondItemsAdmin
      : role === 4
      ? secondItemsIncube
      : role === 3
      ? secondItemsExpert
      : role === 2
      ? secondItemsAdminprojet
      : []

  return (
    <Box
    className='sidebarMenu'
      sx={{
        width: '100%',
        height: '100%',
        borderRight: '1px solid #E5E5E5',
        backgroundColor: '#FFFFFF',
        position: {
          xs: 'fixed',
          lg: 'sticky'
        },
        zIndex: 1,
        top: 0,
        paddingTop: '83px',
        left: 0,
        right: 0,
        maxHeight: 'calc(100vh - 2rem)',
        overflowY: 'auto',
        display: {
          xs: !props?.isMenuOpen ? 'block' : 'none',
          lg: 'block'
        }
      }}
    >
      <List sx={{ paddingTop: '0 !important' }}>
        {firstItems?.map((item: any, index: any) => (
          <ListItem
            key={index}
            button
            className='items'
            sx={{ padding: '11px 0px' }}
            onClick={() => item?.link && router.push(`${item?.link}`)}
          >
            <ListItemIcon
              sx={{
                justifyContent: 'space-evenly',
                display: {
                  lg: 'flex',
                  xs: 'flex'
                }
              }}
            >
              {item?.icon}
            </ListItemIcon>
            <ListItemText
              sx={{
                display: {
                  lg: props?.isMenuOpen ? 'block' : 'none',
                  xs: 'block'
                }
              }}
              primary={item.text}
            />
          </ListItem>
        ))}
      </List>
      <Divider
        sx={{
          marginInline: '1rem',
          marginBlock: '0.25rem',
          display: {
            lg: props?.isMenuOpen ? 'block' : 'none',
            xs: 'block'
          }
        }}
      />
      <List>
        {secondItems?.map((item: any, index: any) => (
          <ListItem
            key={index}
            button
            className='items'
            sx={{ padding: '11px 0px' }}
            onClick={() => router.push(`${item?.link}`)}
          >
            <ListItemIcon
              sx={{
                justifyContent: 'space-evenly',
                display: {
                  lg: 'flex',
                  xs: 'flex'
                }
              }}
            >
              {item?.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                display: {
                  lg: props?.isMenuOpen ? 'block' : 'none',
                  xs: 'block'
                }
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider
        sx={{
          marginBlock: '0.25rem',
          display: {
            lg: props?.isMenuOpen ? 'block' : 'none',
            xs: 'block'
          }
        }}
      />
      <List>
        <ListItem
          sx={{
            display: {
              lg: props?.isMenuOpen ? 'block' : 'none',
              xs: 'block'
            }
          }}
        >
          <Typography className='sideTitle'>{t('message__title')}</Typography>
        </ListItem>

        {messagerieItems.map((item, index) => (
          <ListItem
            key={index}
            button
            className='items'
            sx={{ padding: '11px 0px' }}
            onClick={() => router.push(`${item?.link}`)}
          >
            <ListItemIcon
              sx={{
                justifyContent: 'space-evenly',
                display: {
                  lg: 'flex',
                  xs: 'flex'
                }
              }}
            >
              {item?.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                display: {
                  lg: props?.isMenuOpen ? 'block' : 'none',
                  xs: 'block'
                }
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider
        sx={{
          marginBlock: '0.25rem',
          display: {
            lg: props?.isMenuOpen ? 'block' : 'none',
            xs: 'block'
          }
        }}
      />
      {props?.withTeam && (
        <Box
          sx={{
            padding: '10px',
            display: {
              lg: props?.isMenuOpen ? 'block' : 'none',
              xs: 'block'
            }
          }}
        >
          <Typography className='subtitle' sx={{ padding: '5px' }}>
            {t('team')}
          </Typography>
          <Team cardData={props?.projectData?.teamMembers} withTitle={false} />
        </Box>
      )}
    </Box>
  )
}

export default Sidebar
