import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import enLocale from '@fullcalendar/core/locales/en-au'
import itLocale from '@fullcalendar/core/locales/it'
import { Box, Button, Grid, IconButton, Modal, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DateRangeIcon from '@mui/icons-material/DateRange'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import Image from 'next/image'
import { formatDate } from '@/utils/formatDate'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { getCookie } from 'cookies-next'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '1rem',
  borderRadius: '0.5rem',
  outline: 'none',
  maxHeight: '80vh',
  overflowY: 'auto',
  maxWidth: '90vw',
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: '0.5625rem'
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#c1c1c1',
    borderRadius: '1rem',
    transition: 'all 0.3s ease'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#a8a8a8'
  },
  '& .date': {
    color: '#746A6F',
    fontSize: '1rem',
    marginBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '&.blue': {
      color: '#0A4E96'
    },
    '&.description': {
      display: 'block',
      '& p': {
        margin: 0
      },
      '& .label': {
        display: 'inline-block',
        marginInlineEnd: '0.5rem'
      }
    },
    '& .label': {
      display: 'flex',
      alignItems: 'center'
    }
  },
  '& .description': {
    fontSize: '1.125rem',
    paddingBlock: '0.5rem',
    marginBlock: '1rem',
    borderTop: '1px solid #999',
    borderBottom: '1px solid #999'
  },
  '& .label': {
    color: '#05264A',
    fontSize: '1.125rem',
    fontWeight: '700'
  }
}

const MyCalendar = ({ events, user }: { events?: any; user?: any }) => {
  const { t } = useTranslation()
  const token = getCookie('token')

  const [open, setOpen] = React.useState(false)
  const [modalData, setModalData] = React.useState<any>({})
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const eventsData = events?.map((event: any) => ({
    ...event,
    start: event?.start_date
  }))

  const eventClick = (info: any) => {
    const object = { ...info?.event?.extendedProps, title: info?.event?.title }

    setModalData(object)

    handleOpen()
  }

  const calendarOptions = {
    events: eventsData?.length ? eventsData : [],
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      center: 'title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay',
      left: 'prev,next today'
    },
    locale: enLocale
  }
  const router = useRouter()

  const joinVisioconference = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}bigbluebutton/join-meeting`,
        { event: modalData?._id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      // console.log('htmlContent', response.data)

      if (response.data) {
        window.location.href = response.data
      }
    } catch (error) {
      console.error('Error joining visioconference:', error)
      // Handle errors
    }
  }

  return (
    <Box className='agenda'>
      <FullCalendar eventClick={eventClick} {...calendarOptions} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', gap: '1rem', marginBottom: '1rem' }}>
            {user && user?.role === '2' && (
              <>
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() => router.push(`/espace-admin/evenement/modification/${modalData?._id}`)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton sx={{ p: 0 }} onClick={handleClose}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
            <IconButton sx={{ p: 0 }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography
            id='modal-modal-title'
            sx={{
              color: '#05264A',
              fontSize: '1.25rem',
              fontWeight: '600',
              fontFamily: '"poppins", sans-serif'
            }}
            component='h2'
          >
            {modalData?.title || 'Event title goes here'}
          </Typography>
          <Typography className='date description' component='p'>
            <span
              dangerouslySetInnerHTML={{
                __html:
                  modalData?.description ||
                  'Some description for the event in this position, make sure to change this code once the API is fixed. This is just some other text just as filling'
              }}
            ></span>
          </Typography>
          <Typography className='date' component='p'>
            <span className='label'>
              <DateRangeIcon />
            </span>
            {formatDate(modalData?.start_date)}
          </Typography>
          <Typography className='date' component='p'>
            <span className='label'>
              <AccessTimeIcon />
            </span>
            {modalData?.start_date?.split('T')[1]?.split(':')[0]}:{modalData?.start_date?.split('T')[1]?.split(':')[1]}{' '}
            - {modalData?.end_date?.split('T')[1]?.split(':')[0]}:{modalData?.end_date?.split('T')[1]?.split(':')[1]}
          </Typography>
          <Box className='expert' sx={{ paddingBlock: '1.25rem', borderBlock: '1px solid #999' }}>
            <Typography component={'p'} className='label'>
              {t('expert')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginTop: '0.5rem',
                '& img': {
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '9999px'
                },
                '& span': {
                  color: '#031326',
                  fontSize: '0.75rem',
                  fontWeight: '700'
                }
              }}
            >
              <Image width={40} height={40} alt={'expert'} src={'/image/team1.png'} />
              <span>
                {modalData?.createdBy?.firstName} {modalData?.createdBy?.lastName}
              </span>
            </Box>
          </Box>
          <Box className='participents'>
            <Typography component={'p'} className='date blue' sx={{ marginTop: '0.5rem', fontWeight: '700' }}>
              <GroupOutlinedIcon />
              <span>Participants</span>
            </Typography>
            <Typography component={'p'} className='date' sx={{ marginTop: '0.5rem', paddingInlineStart: '2rem' }}>
              {modalData?.guests?.map((item: any) => item?.name)}
            </Typography>
          </Box>
          <Grid item xs={12} alignItems='center' justifyContent='space-between'>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className='button'
              sx={{ marginLeft: 'auto' }}
              onClick={joinVisioconference}
            >
              <Typography component={'p'} sx={{ fontSize: '14px' }}>
                {t('Rejoindre la visioconférence')}
              </Typography>
            </Button>
          </Grid>
        </Box>
      </Modal>
    </Box>
  )
}

export default MyCalendar
function parseStringPromise(data: any) {
  throw new Error('Function not implemented.')
}
