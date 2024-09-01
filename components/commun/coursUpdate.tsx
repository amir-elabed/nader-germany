'use client'

import * as React from 'react'
import Dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import { useState, useMemo } from 'react'
import 'react-quill/dist/quill.snow.css'
import { useTranslation } from 'react-i18next'

const FormControl = Dynamic<any>(() => import('@mui/material/FormControl'), { ssr: false })
const Select = Dynamic<any>(() => import('@mui/material/Select'), { ssr: false })
const Grid = Dynamic<any>(() => import('@mui/material/Grid'), { ssr: false })
const MenuItem = Dynamic<any>(() => import('@mui/material/MenuItem'), { ssr: false })
const FormHelperText = Dynamic<any>(() => import('@mui/material/FormHelperText'), { ssr: false })
const Typography = Dynamic<any>(() => import('@mui/material/Typography'), {
  ssr: false
})
const TextField = Dynamic<any>(() => import('@mui/material/TextField'), {
  ssr: false
})

const Updatecours = () => {

  const { t } = useTranslation()

  const ReactQuill = useMemo(() => Dynamic(() => import('react-quill'), { ssr: false }), [])
  const [richText, setRichText] = useState(
    'Hi Folks! I m excited to announce that I just finished recording the final Plugins Section for my WordPress Development Course. My apologies on the delay on getting this done. It was not originally meant to be part of the course and the developments with Gutenberg changed a lot of what I had planned to originally include. The content is being edited now and should be up on Udemy in the next week or so. This will be the final content I release for this course, besides a few small updates in other sections. However, I have a "WordPress REST API Course" and "Introduction Gutenberg Development Course" done and ready to upload that I will be adding to Udemy shortly. Happy WordPressing!!! Cheers,'
  )

  const validate = (values: any) => {
    const errors: any = {}

    if (!values.title) {
      errors.title = t('form__required')
    }
    if (!values.richText) {
      errors.richText = t('form__required')
    }
    if (!values.statut) {
      errors.statut = t('form__required')
    }
    if (!values.ressource) {
      errors.ressource = t('form__required')
    }

    return errors
  }

  const initialFormValues: any = {
    title: 'Surface Textures For Model Making And Costume Paintings' || '',
    richText: '',
    statut: 1 || '',
    ressource: t('sidebar__resources') || ''
  }

  const formik = useFormik({
    initialValues: initialFormValues,
    validate: validate,
    onSubmit: () => { }
  })

  return (
    <Grid marginTop='5px' spacing={2} container alignItems='center' justifyContent='space-between'>
      <Grid item xs={12} alignItems='center' justifyContent='space-between'>
        <Typography className='smallinputtitle' sx={{ mb: '5px' }}>
          {t('course__title')}
        </Typography>
        <TextField
          autoComplete='off'
          sx={{ width: '100%', color: '#746A6F !important' }}
          type='text'
          id='title'
          name='title'
          label={t('course__title')}
          variant='outlined'
          className='darkchamps'
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
        />
      </Grid>
      <Grid item xs={12} alignItems='center'>
        <Typography className='smallinputtitle' sx={{ mb: '5px' }} htmlFor='richText'>
          {t('course__description')}
        </Typography>
        <ReactQuill value={richText} onChange={setRichText} style={{ minHeight: '20px' }} theme="snow"
          modules={{
            toolbar: {
              container: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image", "video"],
                ["code-block"],
                ["clean"],
              ],
            },
            clipboard: {
              matchVisual: false,
            },
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "indent",
            "link",
            "image",
            "video",
            "code-block",
          ]} />
      </Grid>
      <Grid item xs={12} alignItems='center'>
        <Typography className='inputtitle'>{t('sidebar__resources')}</Typography>
        <TextField
          sx={{ color: '#E5E5E5 !important' }}
          fullWidth
          size='medium'
          variant='outlined'
          name='ressource'
          margin='dense'
          type='text'
          label={t('sidebar__resources')}
          disabled
          className='darkchamps'
          value={formik.values.ressource}
          onChange={formik.handleChange}
          error={formik.touched.ressource && Boolean(formik.errors.ressource)}
          helperText={(formik.touched.ressource && formik.errors.ressource) || '\u00a0'}
        />
      </Grid>
      <Grid item xs={12} alignItems='center'>
        <Typography className='inputtitle'>{t('tableHeader__status')}</Typography>
        <FormControl fullWidth size='medium' margin='dense'>
          <Select
            sx={{ border: '1px solid #E5E5E5' }}
            variant='outlined'
            required
            labelId='statut'
            id='statut'
            label={t('tableHeader__status')}
            name='statut'
            value={formik.values.statut}
            onChange={formik.handleChange}
            error={formik.touched.statut && Boolean(formik.errors.statut)}
            margin='dense'
          >
            <MenuItem value={2}>{t('published')}</MenuItem>
            <MenuItem value={1}>{t('unpublished')}</MenuItem>
          </Select>
          <FormHelperText sx={{ color: '#d32f2f' }}>
            {(formik.touched.statut && formik.errors.statut) || '\u00a0'}
          </FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  )
}
export default Updatecours
