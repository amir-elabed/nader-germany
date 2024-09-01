'use client'

import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { Typography, Box, Container } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

const styleCounter = {
  marginTop: '1.25rem',
  display: 'flex',
  flexWrap: 'wrap',
  '& .counter__number': {
    fontWeight: '700',
    fontSize: '2.125rem',
    textAlign: 'center',
    color: '#05264A'
  },
  '& .counter__text': {
    fontSize: '0.875rem',
    textAlign: 'center',
    fontWeight: '500',
    color: '#05264A'
  },
  '& .counter__wrapper': {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '1.25rem'
  }
}

const Hero = (props: any) => {
  const { projectData } = props
  const router = useRouter()

  const [dateExpert, setDateExpert] = useState('')
  const [dateIncube, setDateIncube] = useState('')

  useEffect(() => {
    if (projectData?.callsForApplications?.length > 1) {
      setDateExpert(projectData?.callsForApplications[1]?.end_date_candidacy)
    }
  }, [projectData])

  useEffect(() => {
    if (projectData?.callsForApplications?.length > 1) {
      setDateIncube(projectData?.callsForApplications[0]?.end_date_candidacy)
    }
  }, [projectData])

  const [remainingTimeIncube, setRemainingTimeIncube] = useState<any>(null)
  const [remainingTimeExpert, setRemainingTimeExpert] = useState<any>(null)
  const [remainingTimeProject, setRemainingTimeProject] = useState<any>(null)

  useEffect(() => {
    async function getRemainingTimeIncube() {
      const targetDate = new Date(dateIncube)
      const now = new Date()
      const timeDifference = targetDate.getTime() - now.getTime()

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

      setRemainingTimeIncube({ days, hours, minutes, seconds })
    }

    getRemainingTimeIncube()
  }, [dateIncube])

  useEffect(() => {
    function getRemainingTimeExpert() {
      const targetDate = new Date(dateExpert)
      const now = new Date()
      const timeDifference: number = targetDate.getTime() - now.getTime()

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

      setRemainingTimeExpert({ days, hours, minutes, seconds })
      setRemainingTimeProject({ days, hours, minutes, seconds })
    }
    getRemainingTimeExpert()
  }, [dateExpert])

  function getRemainingTimeProject() {
    const targetDate = new Date(projectData?.end_date)
    const now = new Date()
    const timeDifference: number = targetDate.getTime() - now.getTime()

    return {
      days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeDifference % (1000 * 60)) / 1000)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTimeProject(getRemainingTimeProject())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const { t } = useTranslation()

  return (
    <Box
      className='couverture'
      sx={{
        backgroundImage: props?.projectData?.cover
          ? `url(${process.env.NEXT_PUBLIC_API_WITHOUT}${props?.projectData?.cover})`
          : 'url(/image/couverture.png)',
        width: '100%',
        borderBottom: '1px solid #E5E5E5',
        boxShadow: 'inset 0px 11px 8px -10px #cccccc78',
        backgroundPosition: 'top right',
        marginTop: '80px'
      }}
    >
      <Container>
        <Box sx={{ paddingBlock: '30px' }}>
          {!props?.noTag && (
            <Box className='couverture__button'>
              <Typography style={{ textTransform: 'uppercase' }} className='couverture__button__title'>
                {projectData?.label}
              </Typography>
            </Box>
          )}
          <Box marginTop='10px' marginBottom='10px' maxWidth='48rem'>
            <Typography component='h1' className='couverture__title'>
              {projectData?.title}
            </Typography>
          </Box>

          <>
            {remainingTimeProject?.days >= 0 &&
              remainingTimeProject?.hours >= 0 &&
              remainingTimeProject?.minutes >= 0 &&
              remainingTimeProject?.seconds >= 0 && (
                <Box sx={styleCounter}>
                  <Box className='counter__wrapper'>
                    <Typography className='counter__number'>{remainingTimeProject.days}</Typography>
                    <Typography variant='caption' className='counter__text'>
                      {t('days')}
                    </Typography>
                  </Box>
                  <Box className='counter__wrapper'>
                    <Typography className='counter__number'>{remainingTimeProject.hours}</Typography>
                    <Typography variant='caption' className='counter__text'>
                      {t('hours')}
                    </Typography>
                  </Box>
                  <Box className='counter__wrapper'>
                    <Typography className='counter__number'>{remainingTimeProject.minutes}</Typography>
                    <Typography variant='caption' className='counter__text'>
                      {t('minutes')}
                    </Typography>
                  </Box>
                  <Box display='flex' flexDirection='column'>
                    <Typography className='counter__number'>{remainingTimeProject.seconds}</Typography>
                    <Typography variant='caption' className='counter__text'>
                      {t('secondes')}
                    </Typography>
                  </Box>
                </Box>
              )}

            {((remainingTimeIncube?.days >= 0 &&
              remainingTimeIncube?.hours >= 0 &&
              remainingTimeIncube?.minutes >= 0 &&
              remainingTimeIncube?.seconds >= 0) ||
              (remainingTimeExpert?.days >= 0 &&
                remainingTimeExpert?.hours >= 0 &&
                remainingTimeExpert?.minutes >= 0 &&
                remainingTimeExpert?.seconds >= 0)) && (
              <Box marginTop='20px' marginBottom='20px' display='flex'>
                <Typography fontWeight='bold' fontSize='20px'>
                  Inscrivez-vous
                </Typography>
              </Box>
            )}

            {remainingTimeIncube?.days >= 0 &&
              remainingTimeIncube?.hours >= 0 &&
              remainingTimeIncube?.minutes >= 0 &&
              remainingTimeIncube?.seconds >= 0 && (
                <>
                  <Button
                    variant='contained'
                    color='primary'
                    style={{
                      backgroundColor: '#0A4E96',
                      padding: '10px 80px 10px 80px',
                      boxShadow: 'none'
                    }}
                    onClick={() => router.push(`./${props?.currentPage}/candidature-expert`)}
                  >
                    <Typography fontSize='14px'>EXPERT</Typography>
                  </Button>
                </>
              )}

            {remainingTimeExpert?.days >= 0 &&
              remainingTimeExpert?.hours >= 0 &&
              remainingTimeExpert?.minutes >= 0 &&
              remainingTimeExpert?.seconds >= 0 && (
                <>
                  <Button
                    variant='outlined'
                    color='primary'
                    style={{
                      backgroundColor: '#FFFFFF',
                      padding: '10px 80px 10px 80px',
                      marginLeft: '15px',
                      border: '1px solid #0A4E96'
                    }}
                    onClick={() => router.push(`./${props?.currentPage}/candidature-incube`)}
                  >
                    <Typography fontSize='14px' color='#0A4E96'>
                      {t('incube')}
                    </Typography>
                  </Button>
                </>
              )}
          </>
        </Box>
      </Container>
    </Box>
  )
}

export default Hero
