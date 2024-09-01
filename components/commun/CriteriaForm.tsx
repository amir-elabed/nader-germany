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


export default function CriteriaForm(props: any) {
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      ...props?.criteria
    },
    onSubmit: () => {}
  })

  React.useEffect(() => {
    props?.setCriteria((criteria: any) => {
      const copyCriteres = [...criteria]
      copyCriteres[props?.index] = {
        criterion: formik.values.criterion,
        weight: formik.values.weight
      }

      return copyCriteres
    })
  }, [formik.values])

  return (
    <>
      {props?.criteria && (
        <Grid container spacing={1} marginTop='10px'>
          <Grid item xs={9} alignItems='center' justifyContent='space-between'>
            <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
              {t('criteria')}
            </Typography>
            <TextField
              type='text'
              id='criterion'
              name='criterion'
              label={t('criteria')}
              value={formik.values.criterion}
              onChange={formik.handleChange}
              error={formik.touched.criterion && Boolean(formik.errors.criterion)}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={2} alignItems='center' justifyContent='space-between'>
            <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
              {t('weight')}
            </Typography>
            <TextField
              type='number'
              id='weight'
              name='weight'
              label={t('weight')}
              value={formik.values.weight}
              onChange={formik.handleChange}
              error={formik.touched.weight && Boolean(formik.errors.weight)}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={1}>
            <>
              <Typography
                position='absolute'
                variant='h6'
                sx={{ color: '#707070 !important', cursor: 'pointer' }}
                fontSize='max(1.1vw,25px)'
                onClick={() => {
                  props?.handleDeleteCriteria(props?.index)
                }}
              >
                <ClearIcon></ClearIcon>
              </Typography>
            </>
          </Grid>
        </Grid>
      )}
    </>
  )
}
