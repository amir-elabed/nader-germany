'use client'

import * as React from 'react'
import Dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'

const TextField = Dynamic<any>(() => import('@mui/material/TextField'), { ssr: false })
const Grid = Dynamic<any>(() => import('@mui/material/Grid'), { ssr: false })
const Typography = Dynamic<any>(() => import('@mui/material/Typography'), {
  ssr: false
})
import ClearIcon from '@mui/icons-material/Clear'

import { Box, FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material'

export default function CandidatureForm(props: any) {
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      ...props?.candidature,
  
      candidacy_pdf: null,
    
    },
    onSubmit: () => {}
  })


  React.useEffect(() => {
    props?.setCandidatures((candidatures: any) => {
      const copyCandidatures = [...candidatures]
      copyCandidatures[props?.index] = {
        status: formik.values.status,
        start_date_candidacy: formik.values.start_date_candidacy,
        end_date_candidacy: formik.values.end_date_candidacy,
        type: formik.values.type,
        candidacy_pdf: formik.values.candidacy_pdf
      }

      return copyCandidatures
    })
  }, [formik.values])


  return (
    <>
      {props?.candidature && (
        <Grid container spacing={1}>
          <Grid item xs={5.5} alignItems='center'>
            <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
              {t('status')}
            </Typography>
            <FormControl fullWidth size='medium' margin='dense'>
              <Select
                variant='outlined'
                required
                labelId={`status-${props?.index}`}
                id={`status-${props?.index}`}
                label={t('status')}
                name='status'
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
                margin='dense'
              >
                <MenuItem value={'1'}>{'Publié'}</MenuItem>
                <MenuItem value={'0'}>{'Non publié'}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5.5} alignItems='center'>
            <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
              {t('type_de_candidature')}
            </Typography>
            <FormControl fullWidth size='medium' margin='dense'>
              <Select
                variant='outlined'
                required
                labelId={`type-${props?.index}`}
                id={`type-${props?.index}`}
                label={t('type_de_candidature')}
                name='type'
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
                margin='dense'
              >
                <MenuItem value={'3'}>{'Expert'}</MenuItem>
                <MenuItem value={'4'}>{'Incubé'}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            <>
              <Typography
                position='absolute'
                variant='h6'
                sx={{ color: '#707070 !important', cursor: 'pointer' }}
                fontSize='max(1.1vw,25px)'
                onClick={() => {
                  props?.handleDeleteCandidatures(props?.index)
                }}
              >
                <ClearIcon></ClearIcon>
              </Typography>
            </>
          </Grid>
          <Grid item xs={5.5} alignItems='center'>
            <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
              {t('pubDate')}
            </Typography>
            <TextField
              fullWidth
              size='medium'
              variant='outlined'
              name='start_date_candidacy'
              margin='dense'
              type='datetime-local'
              value={formik.values.start_date_candidacy ? formik.values.start_date_candidacy.replace('Z', '') : ''}
              onChange={formik.handleChange}
              error={formik.touched.start_date_candidacy && Boolean(formik.errors.start_date_candidacy)}
            />
          </Grid>
          <Grid item xs={5.5} alignItems='center'>
            <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
              {t('endDate')}
            </Typography>
            <TextField
              fullWidth
              size='medium'
              variant='outlined'
              name='end_date_candidacy'
              margin='dense'
              type='datetime-local'
              value={formik.values.end_date_candidacy ? formik.values.end_date_candidacy.replace('Z', '') : ''}
              onChange={formik.handleChange}
              error={formik.touched.end_date_candidacy && Boolean(formik.errors.end_date_candidacy)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            alignItems='center'
            sx={{
              marginBottom: '2rem',
              '& .MuiInputBase-root': { display: 'none' }
            }}
          >
            <InputLabel htmlFor={`candidacy_pdf-${props?.index}`} sx={{ cursor: 'pointer' }}>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: "'Arial',sans-serif",
                  color: '#05264A',
                  marginBottom: '10px',
                  marginLeft: '5px'
                }}
              >
                {t('Fichier de candidature')}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  color: '#746A6F',
                  borderRadius: '0.375rem',
                  flexGrow: 1,
                  width: '100%',
                  border: '1px solid #F3F3F9',
                  overflow: 'hidden',
                  '&:hover': { border: '1px solid #620001', backgroundColor: 'rgba(98, 0, 1, 0.04)' },
                  '& .filebutton': {
                    backgroundColor: '#F3F3F9',
                    paddingInline: '1rem',
                    padding: '1rem',
                    textTransform: 'uppercase',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  },
                  '& .file': {
                    padding: '1rem',
                    flexGrow: 1,
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#620001',
                    '& p': {
                      margin: 0
                    }
                  }
                }}
              >
                <span className='filebutton'>{t('choose__file')}</span>
                <span className='file'>
                  {props.candidature.candidacy_pdf && <p>{formik?.values?.candidacy_pdf?.name}</p>}
                </span>
               
              </Box>
            </InputLabel>
           <Input
              id={`candidacy_pdf-${props?.index}`}
              name='candidacy_pdf'
              type='file'
              onChange={(e: any) => { formik.setFieldValue('candidacy_pdf', e.currentTarget.files[0])
              }}
              error={formik.touched.candidacy_pdf && Boolean(formik.errors.candidacy_pdf)}
              margin='dense'
            />
          </Grid>
        </Grid>
      )}
    </>
  )
}
