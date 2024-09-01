'use client'
import CreateOutlined from '@mui/icons-material/CreateOutlined'
import { Alert, AlertColor, Box, IconButton, Snackbar, Tooltip, Typography } from '@mui/material'
import Dynamic from 'next/dynamic'
import React from 'react'
import { useGetTeamMembersQuery } from '@/services/api/TeamMembersAPI'
import { useTranslation } from 'react-i18next'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

const DataGrid = Dynamic<any>((() => import('@mui/x-data-grid').then(module => module.DataGrid)) as any, {
  ssr: false
})

interface CellType {
  row: any
}
const imageStyles = {
  width: '40px',
  height: '40px',
  padding: '1px',
  marginRight: '20px',
  borderRadius: '9999px'
}
const EquipeList = ({ hasActions, hasPagination }: any) => {
  const { t } = useTranslation()

  const { data, refetch } = useGetTeamMembersQuery({})
  const token = getCookie('token')

  const router = useRouter()

  const [openToast, setOpenToast] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState('')
  const [toastType, setToastType] = React.useState('success')

  const mapToastTypeToSeverity = (type: string): AlertColor => {
    switch (type) {
      case 'success':
        return 'success'
      case 'info':
        return 'info'
      case 'warning':
        return 'warning'
      case 'error':
        return 'error'
      default:
        return 'info' // Provide a default value or handle other cases
    }
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenToast(false)
  }

  const deleteItem = async (id: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API}teamMembers/${id}`, {
        method: `DELETE`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setToastType('success')
      setOpenToast(true)
      refetch()
      setToastMessage('Membre supprimé !')
    } catch (error) {
      setToastType('error')
      setOpenToast(true)
      setToastMessage('Une erreur est survenue')
    }
  }

  const team = data?.map((item: any) => ({ ...item, id: item?._id }))
  const defaultColumns = hasActions
    ? [
        {
          flex: 0.013,
          minWidth: 70,
          field: 'empty',
          headerName: t('tableHeader__id'),
          renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>
              <Box display='flex' alignItems='center' width='100%'>
                <Typography color='#746A6F'>{row?.id || '-'}</Typography>
              </Box>
            </Typography>
          )
        },
        {
          flex: 0.045,
          minWidth: 260,
          field: 'name',
          headerName: t('tableHeader__fullName'),
          renderCell: ({ row }: CellType) => (
            <Box minWidth='40px' width='fit-content' display='flex' alignItems='center' padding='0.5rem'>
              <img
                src={`${process.env.NEXT_PUBLIC_API_WITHOUTSLASH}` + row?.image || '/image/team1.png'}
                alt='projet'
                width={20}
                height={20}
                style={imageStyles}
              />
              <Box>
                <Typography className='firstTablerow'>{row?.firstName + ' ' + row?.lastName || '-'}</Typography>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: '400',
                    color: '#746A6F',
                    fontFamily: '"poppins", sans-serif'
                  }}
                >
                  {row?.function || '-'}
                </Typography>
              </Box>
            </Box>
          )
        },
        {
          flex: 0.01,
          minWidth: 120,
          field: 'statut',
          headerName: t('tableHeader__status'),
          renderCell: ({ row }: CellType) => (
            <Box minWidth='40px' sx={{ marginInline: 'auto' }}>
              {row?.status === '1' ? (
                <Box sx={{ backgroundColor: '#E4FBF1', width: 100, padding: '5px', textAlign: 'center' }}>
                  <Typography style={{ color: '#03D87F' }}>{t('active')}</Typography>
                </Box>
              ) : (
                <Box sx={{ backgroundColor: '#F6E3E5', width: 100, padding: '5px', textAlign: 'center' }}>
                  <Typography style={{ color: '#CC0000' }}>{t('inactive')}</Typography>
                </Box>
              )}
            </Box>
          )
        },
        {
          flex: 0.005,
          minWidth: 100,
          field: 'actions',
          headerName: '',
          renderCell: ({ row }: CellType) => (
            <>
              <Tooltip title='Modifier'>
                <div>
                  <IconButton
                    onClick={() => router.push(`/espace-admin/equipe/modification/${row?._id}`)}
                    size='small'
                    sx={{ color: '#9E9E9E', textDecoration: 'none', mr: 0.3 }}
                  >
                    <CreateOutlined />
                  </IconButton>
                </div>
              </Tooltip>
              <Tooltip title='Supprimer'>
                <div>
                  <IconButton
                    onClick={() => deleteItem(row?.id)}
                    size='small'
                    sx={{ color: '#9E9E9E', textDecoration: 'none', mr: 0.5 }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </div>
              </Tooltip>
            </>
          )
        }
      ]
    : [
        {
          flex: 0.009,
          minWidth: 70,
          field: 'empty',
          headerName: t('tableHeader__id'),
          renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>
              <Box display='flex' alignItems='center' width='100%'>
                <Typography color='#746A6F'>{row?.id || '-'}</Typography>
              </Box>
            </Typography>
          )
        },
        {
          flex: 0.09,
          minWidth: 120,
          field: 'name',
          headerName: t('tableHeader__fullName'),
          renderCell: ({ row }: CellType) => (
            <Box minWidth='40px' width='fit-content' display='flex' alignItems='center' padding='0.5rem'>
              <img
                src={`${process.env.NEXT_PUBLIC_API_WITHOUTSLASH}` + row?.image || '/image/team1.png'}
                alt='projet'
                width={20}
                height={20}
                style={imageStyles}
              />
              <Box>
                <Typography className='firstTablerow'>{row?.firstName + ' ' + row?.lastName || '-'}</Typography>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: '400',
                    color: '#746A6F',
                    fontFamily: '"poppins", sans-serif'
                  }}
                >
                  {row?.function || '-'}
                </Typography>
              </Box>
            </Box>
          )
        },
        {
          flex: 0.01,
          minWidth: 120,
          field: 'statut',
          headerName: t('tableHeader__status'),
          renderCell: ({ row }: CellType) => (
            <Box minWidth='40px' sx={{ marginInline: 'auto' }}>
              {row?.status === '1' ? (
                <Box sx={{ backgroundColor: '#E4FBF1', width: 100, padding: '5px', textAlign: 'center' }}>
                  <Typography style={{ color: '#03D87F' }}>{t('active')}</Typography>
                </Box>
              ) : (
                <Box sx={{ backgroundColor: '#F6E3E5', width: 100, padding: '5px', textAlign: 'center' }}>
                  <Typography style={{ color: '#CC0000' }}>{t('inactive')}</Typography>
                </Box>
              )}
            </Box>
          )
        }
      ]

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0
  })

  return (
    <>
      <DataGrid
        autoHeight
        rows={team || []}
        columns={defaultColumns}
        pagination
        pageSizeOptions={[5, 10, 25, { label: 'All', value: team?.length }]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        columnSeparator='vertical-line 1px #E5E5E5'
        labelRowsPerPage={'Ligne par page:'}
        sx={{
          '& .MuiDataGrid-columnHeaders': { borderRadius: 0 },
          '& .MuiDataGrid-columnHeader , & .MuiDataGrid-cell': { borderRight: '1px solid #E5E5E5' },
          '& .MuiDataGrid-row:nth-of-type(odd)': { backgroundColor: '#F7F9FC' },
          '& .MuiDataGrid-footerContainer': { display: hasPagination ? 'block' : 'none' },
          '& .MuiTablePagination-actions .MuiButtonBase-root': {
            backgroundColor: '#0A4E96',
            borderRadius: 0,
            position: 'relative',
            '&:last-of-type:before': {
              content: "''",
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'block',
              height: '66%',
              width: '1px',
              backgroundColor: '#fff'
            }
          }

        }}
        componentsProps={{
          pagination: {
            labelRowsPerPage: t('tableHeader__pagination'),
            paginationModel: { pageSize: 10 }
          }
        }}
      />

      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Alert onClose={handleClose} severity={mapToastTypeToSeverity(toastType)} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
export default EquipeList
