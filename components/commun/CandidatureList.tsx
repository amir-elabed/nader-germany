'use client'

import React, { useState } from 'react'
import { Typography, Box } from '@mui/material'
import Dynamic from 'next/dynamic'
import { Tooltip } from '@mui/material'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { useGetUsersQuery } from '@/services/api/UsersAPI'

const DataGrid = Dynamic<any>((() => import('@mui/x-data-grid').then(module => module.DataGrid)) as any, {
  ssr: false
})
const Checkbox = Dynamic<any>(() => import('@mui/material/Checkbox'), { ssr: false })
const FormControlLabel = Dynamic<any>(() => import('@mui/material/FormControlLabel'), { ssr: false })

const IconButton = Dynamic(() => import('@mui/material/IconButton'), { ssr: false })
const TablePagination = Dynamic(() => import('@/components/commun/pagination'), { ssr: false })

interface CellType {
  row: any
}

const CandidatureList = ({ hasActions, hasPagination, role }: any) => {
  const { data } = useGetUsersQuery({role: role});
  const router = useRouter()

  const { t } = useTranslation()

 const users = data
    ?.map((item: any) => ({
      id: item?._id,
      name: `${item?.firstName} ${item?.lastName}`,
      imageUrl: item?.image,
      email: item?.email,
      telelphone: item?.phoneNumber,
      type: item?.role === '3' ? 'Expert' : 'Incubé',
      date: new Date(item?.createdAt).toLocaleString(),
      statut: item?.status
    }))  


    console.log(role)

  const imageStyles = {
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    marginRight: '10px',
    objectFit: 'cover' as const
  }

  const defaultColumns = hasActions
    ? [
        {
          flex: 0.005,
          minWidth: 100,
          field: 'empty',
          headerName: t('tableHeader__id'),
          renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>
              <Box display='flex' alignItems='center' width='100%'>
                <FormControlLabel
                  control={<Checkbox />}
                  sx={{
                    color: '#E5E5E5',
                    fontSize: '12px'
                  }}
                />{' '}
                <Typography color='#746A6F'>{row.id || '-'}</Typography>
              </Box>
            </Typography>
          )
        },
        {
          flex: 0.1,
          minWidth: 100,
          field: 'name',
          headerName: t('tableHeader__fullName'),
          renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>
              <Box minWidth='40px' width='fit-content' display='flex'>
                <Image
                  src={row.imageUrl ? `${process.env.NEXT_PUBLIC_API_WITHOUT}` + row.imageUrl : '/image/team1.png'}
                  alt='vous'
                  width={40}
                  height={40}
                  style={imageStyles}
                />
                <Typography className='firstTablerow' sx={{ mt: '5px' }}>
                  {row.name || '-'}
                </Typography>
              </Box>
            </Typography>
          )
        },
        {
          flex: 0.03,
          minWidth: 100,
          field: 'email',
          headerName: t('tableHeader__email'),
          renderCell: ({ row }: CellType) => (
            <Typography className='descriptionMeduim' variant='body2'>
              {row.email || '-'}
            </Typography>
          )
        },
        {
          flex: 0.03,
          minWidth: 100,
          field: 'telelphone',
          headerName: t('tableHeader__tel'),
          renderCell: ({ row }: CellType) => (
            <Typography className='descriptionMeduim' variant='body2'>
              {row.telelphone || '-'}
            </Typography>
          )
        },
        {
          flex: 0.015,
          minWidth: 100,
          field: 'appel',
          headerName: t('tableHeader__call'),
          renderCell: () => (
            <Typography className='descriptionMeduim' variant='body2'>
              
            </Typography>
          )
        },
        {
          flex: 0.03,
          minWidth: 100,
          field: 'date',
          headerName: t('tableHeader__date'),
          renderCell: ({ row }: CellType) => (
            <Typography className='descriptionMeduim' variant='body2'>
              {row.date || '-'}
            </Typography>
          )
        },
        {
          flex: 0.02,
          minWidth: 100,
          field: 'statut',
          headerName: t('tableHeader__status'),
          renderCell: ({ row }: CellType) => (
            <Typography variant='body2' sx={{ justifyContent: 'center' }}>
              <Box minWidth='40px' width='fit-content' sx={{ justifyContent: 'center' }}>
                {row.statut === 'On hold' && (
                  <Box sx={{ backgroundColor: '#f3cf88', padding: '5px' }}>
                    <Typography style={{ color: '#ffa800' }}>{t('type__waiting')}</Typography>
                  </Box>
                )}
                {row.statut === 'Accepted' && (
                  <Box sx={{ backgroundColor: '#E4FBF1', padding: '5px' }}>
                    <Typography style={{ color: '#03D87F' }}>{t('type__accepted')}</Typography>
                  </Box>
                )}
                {row.statut === 'Denied' && (
                  <Box sx={{ backgroundColor: '#F6E3E5', padding: '5px' }}>
                    <Typography style={{ color: '#CC0000' }}>{t('type__rejected')}</Typography>
                  </Box>
                )}
              </Box>
            </Typography>
          )
        },
        {
          flex: 0.001,
          minWidth: 60,
          sortable: false,
          field: 'actions',
          headerName: '',
          renderCell: ({ row }: CellType) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title='Modifier'>
                <div>
                  <IconButton
                    onClick={() =>
                      router.push(
                        `/espace-adminprojet/candidature-${row?.type === 'Expert' ? 'expert' : 'incube'}/${row.id}`
                      )
                    }
                    size='small'
                    sx={{ color: '#9E9E9E', textDecoration: 'none', mr: 0.5 }}
                  >
                    <CreateOutlinedIcon />
                  </IconButton>
                </div>
              </Tooltip>
            </Box>
          )
        }
      ]
    : [
        {
          flex: 0.005,
          minWidth: 100,
          field: 'empty',
          headerName: t('tableHeader__id'),
          renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>
              <Box display='flex' alignItems='center' width='100%'>
                <FormControlLabel
                  control={<Checkbox />}
                  sx={{
                    color: '#E5E5E5',
                    fontSize: '12px'
                  }}
                />{' '}
                <Typography color='#746A6F'>{row.id || '-'}</Typography>
              </Box>
            </Typography>
          )
        },
        {
          flex: 0.1,
          minWidth: 100,
          field: 'name',
          headerName: t('tableHeader__fullName'),
          renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>
              <Box minWidth='40px' width='fit-content' display='flex'>
                <Image
                  src={row.imageUrl ? `${process.env.NEXT_PUBLIC_API_WITHOUT}` + row.imageUrl : '/image/team1.png'}
                  alt='vous'
                  width={40}
                  height={40}
                  style={imageStyles}
                />
                <Typography className='firstTablerow' sx={{ mt: '5px' }}>
                  {row.name || '-'}
                </Typography>
              </Box>
            </Typography>
          )
        },
        {
          flex: 0.03,
          minWidth: 100,
          field: 'email',
          headerName: t('tableHeader__email'),
          renderCell: ({ row }: CellType) => (
            <Typography className='descriptionMeduim' variant='body2'>
              {row.email || '-'}
            </Typography>
          )
        },
        {
          flex: 0.03,
          minWidth: 100,
          field: 'telelphone',
          headerName: t('tableHeader__tel'),
          renderCell: ({ row }: CellType) => (
            <Typography className='descriptionMeduim' variant='body2'>
              {row.telelphone || '-'}
            </Typography>
          )
        },
        {
          flex: 0.015,
          minWidth: 100,
          field: 'type',
          headerName: t('tableHeader__type'),
          renderCell: ({ row }: CellType) => (
            <Typography className='descriptionMeduim' variant='body2'>
              {row.type || '-'}
            </Typography>
          )
        },
        {
          flex: 0.03,
          minWidth: 100,
          field: 'date',
          headerName: t('tableHeader__date'),
          renderCell: ({ row }: CellType) => (
            <Typography className='descriptionMeduim' variant='body2'>
              {row.date || '-'}
            </Typography>
          )
        },
        {
          flex: 0.02,
          minWidth: 100,
          field: 'statut',
          headerName: t('tableHeader__status'),
          renderCell: ({ row }: CellType) => (
            <Typography variant='body2' sx={{ justifyContent: 'center' }}>
              <Box minWidth='40px' width='fit-content' sx={{ justifyContent: 'center' }}>
                {row.statut === 'On hold' && (
                  <Box sx={{ backgroundColor: '#f3cf88', padding: '5px' }}>
                    <Typography style={{ color: '#ffa800' }}>{t('type__waiting')}</Typography>
                  </Box>
                )}
                {row.statut === 'Accepted' && (
                  <Box sx={{ backgroundColor: '#E4FBF1', padding: '5px' }}>
                    <Typography style={{ color: '#03D87F' }}>{t('type__accepted')}</Typography>
                  </Box>
                )}
                {row.statut === 'Denied' && (
                  <Box sx={{ backgroundColor: '#F6E3E5', padding: '5px' }}>
                    <Typography style={{ color: '#CC0000' }}>{t('type__rejected')}</Typography>
                  </Box>
                )}
              </Box>
            </Typography>
          )
        }
      ]

  const [perPage, setPerPage] = useState(25)
  const [page, setPage] = useState(0)

  return (
    <>
      <DataGrid
        autoHeight
        rows={users || []}
        columns={defaultColumns}
        columnSeparator='vertical-line 1px #E5E5E5'
        disableColumnSelector
        paginationModel={{ page: page, pageSize: perPage }}
        pageSize={perPage}
        sx={{
          '& .MuiDataGrid-columnHeaders': { borderRadius: 0 },
          '& .MuiDataGrid-columnHeader , & .MuiDataGrid-cell': { borderRight: '1px solid #E5E5E5' },
          '& .MuiDataGrid-row:nth-of-type(even), & .MuiDataGrid-columnHeadersInner ': {
            backgroundColor: '#F7F9FC'
          },
          '& .MuiDataGrid-iconButtonContainer, & .MuiButtonBase-root, & .MuiButtonBase-root svg': {
            opacity: '1!important',
            width: 'auto'
          },
          '& .MuiTablePagination-actions .MuiButtonBase-root': {
            color: ''
          },
          '& .MuiDataGrid-row:nth-of-type(2n)': { backgroundColor: '#F7F9FC' },
          '& .MuiFormControlLabel-root': {
            display: 'none'
          },
          '& .MuiDataGrid-footerContainer.MuiDataGrid-withBorderColor': {
            display: 'none!important'
          }
        }}
      />
      {hasPagination && (
        <TablePagination
          count={users?.length}
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          withMargin
        />
      )}
    </>
  )
}
export default CandidatureList
