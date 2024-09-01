import React from 'react'
import Dynamic from 'next/dynamic'
import Image from 'next/image'
import { Alert, AlertColor, Box, IconButton, Snackbar, Tooltip, Typography } from '@mui/material'
import { useGetGroupsQuery } from '@/services/api/GroupsAPI'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { formatDate } from '@/utils/formatDate'
import RemoveRedEyeOutlined from '@mui/icons-material/RemoveRedEyeOutlined'
import CreateOutlined from '@mui/icons-material/CreateOutlined'
import DeleteOutline from '@mui/icons-material/DeleteOutline'

const DataGrid = Dynamic<any>((() => import('@mui/x-data-grid').then(module => module.DataGrid)) as any, {
  ssr: false
})

interface CellType {
  row: any
}

const imageStyles = {
  width: '30px',
  height: '30px',
  padding: '1px',
  marginRight: '0px',
  borderRadius: '9999px'
}

const GroupesList = ({ withActions }: any) => {
  const { data: groupsData, refetch } = useGetGroupsQuery({})

  const groups = groupsData?.map((item: any) => ({
    id: item?._id,
    title: item?.name,
    members: item?.users,
    date: formatDate(item?.createdAt),
    status: item?.status
  }))
  const router = useRouter()
  const token = getCookie('token')

  const { t } = useTranslation()

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
      await fetch(`${process.env.NEXT_PUBLIC_API}groups/${id}`, {
        method: `DELETE`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setToastType('success')
      setOpenToast(true)
      setToastMessage('Ressource supprimée !')
      refetch()
    } catch (error) {
      setToastType('error')
      setOpenToast(true)
      setToastMessage('Une erreur est survenue')
    }
  }

  const defaultColumns = withActions
    ? [
        {
          flex: 0.015,
          minWidth: 100,
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
          flex: 0.2,
          minWidth: 120,
          field: t('tableHeader__title'),
          headerName: 'Titre',
          renderCell: ({ row }: CellType) => (
            <Box minWidth='40px' width='fit-content' display='flex' alignItems='center' padding='0.5rem'>
              <Typography className='firstTablerow'>{row?.title || '-'}</Typography>
            </Box>
          )
        },
        {
          flex: 0.045,
          minWidth: 100,
          field: 'Incubés',
          headerName: t('tableHeader__incube'),
          renderCell: ({ row }: CellType) => (
            <Typography className='descriptionMeduim' variant='body2'>
              {row?.members?.map((member: any) => {
                if (member?.image && member?.image !== 'undefined')
                  return (
                    <IconButton
                      sx={{
                        padding: 0
                      }}
                      onClick={() => router.push(`/espace-expert/suivi-incube/${member?._id}`)}
                    >
                      <Image
                        key={member?.id}
                        src={`${process.env.NEXT_PUBLIC_API_WITHOUT}` + member?.image}
                        alt='projet'
                        width={10}
                        height={10}
                        style={imageStyles}
                      />
                    </IconButton>
                  )
              })}
            </Typography>
          )
        },
        {
          flex: 0.03,
          minWidth: 100,
          field: 'Date',
          headerName: t('tableHeader__date'),
          renderCell: ({ row }: CellType) => (
            <Typography className='descriptionMeduim' variant='body2'>
              {row?.date || '-'}
            </Typography>
          )
        },
        {
          flex: 0.01,
          minWidth: 100,
          field: 'statut',
          headerName: t('tableHeader__status'),
          renderCell: ({ row }: CellType) => (
            <Typography variant='body2' sx={{ justifyContent: 'center' }}>
              <Box minWidth='40px' width='fit-content' sx={{ justifyContent: 'center' }}>
                {row.status === '1' ? (
                  <Box sx={{ backgroundColor: '#E4FBF1', padding: '5px' }}>
                    <Typography style={{ color: '#03D87F' }}>Publié</Typography>
                  </Box>
                ) : (
                  <Box sx={{ backgroundColor: '#F6E3E5', padding: '5px' }}>
                    <Typography style={{ color: '#CC0000' }}>Non Publié</Typography>
                  </Box>
                )}
              </Box>
            </Typography>
          )
        },
        {
          flex: 0.02,
          minWidth: 120,
          field: 'actions',
          headerName: '',
          renderCell: ({ row }: CellType) => (
            <>
              <Tooltip title='Voir'>
                <IconButton
                  onClick={() => router.push(`/espace-expert/groupes/${row?.id}`)}
                  size='small'
                  sx={{ color: '#9E9E9E', textDecoration: 'none', mr: 0.3 }}
                >
                  <RemoveRedEyeOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip title='Modifier'>
                <IconButton
                  onClick={() => router.push(`/espace-expert/groupes/modification/${row?.id}`)}
                  size='small'
                  sx={{ color: '#9E9E9E', textDecoration: 'none', mr: 0.3 }}
                >
                  <CreateOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip title='Supprimer'>
                <IconButton
                  onClick={() => deleteItem(row?.id)}
                  size='small'
                  sx={{ color: '#9E9E9E', textDecoration: 'none', mr: 0.3 }}
                >
                  <DeleteOutline />
                </IconButton>
              </Tooltip>
            </>
          )
        }
      ]
    : [
        {
          flex: 0.015,
          minWidth: 100,
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
          flex: 0.2,
          minWidth: 120,
          field: t('tableHeader__title'),
          headerName: 'Titre',
          renderCell: ({ row }: CellType) => (
            <Box minWidth='40px' width='fit-content' display='flex' alignItems='center' padding='0.5rem'>
              <Typography className='firstTablerow'>{row?.title || '-'}</Typography>
            </Box>
          )
        },
        {
          flex: 0.045,
          minWidth: 100,
          field: 'Incubés',
          headerName: t('tableHeader__incube'),
          renderCell: ({ row }: CellType) => (
            <Typography className='descriptionMeduim' variant='body2'>
              {row?.members?.map((member: any) => {
                if (member?.image && member?.image !== 'undefined')
                  return (
                    <Image
                      key={member?.id}
                      src={`${process.env.NEXT_PUBLIC_API_WITHOUT}` + member?.image}
                      alt='projet'
                      width={10}
                      height={10}
                      style={imageStyles}
                    />
                  )
              })}
            </Typography>
          )
        },
        {
          flex: 0.03,
          minWidth: 100,
          field: 'Date',
          headerName: t('tableHeader__date'),
          renderCell: ({ row }: CellType) => (
            <Typography className='descriptionMeduim' variant='body2'>
              {row?.date || '-'}
            </Typography>
          )
        },
        {
          flex: 0.01,
          minWidth: 100,
          field: 'statut',
          headerName: t('tableHeader__status'),
          renderCell: ({ row }: CellType) => (
            <Typography variant='body2' sx={{ justifyContent: 'center' }}>
              <Box minWidth='40px' width='fit-content' sx={{ justifyContent: 'center' }}>
                {row.status === '1' ? (
                  <Box sx={{ backgroundColor: '#E4FBF1', padding: '5px' }}>
                    <Typography style={{ color: '#03D87F' }}>Publié</Typography>
                  </Box>
                ) : (
                  <Box sx={{ backgroundColor: '#F6E3E5', padding: '5px' }}>
                    <Typography style={{ color: '#CC0000' }}>Non Publié</Typography>
                  </Box>
                )}
              </Box>
            </Typography>
          )
        }
      ]

  return (
    <>
      <DataGrid
        autoHeight
        rows={groups || []}
        columns={defaultColumns}
        pageSize={10}
        columnSeparator='vertical-line 1px #E5E5E5'
        hideFooter={true}
        sx={{
          '& .MuiDataGrid-columnHeaders': { borderRadius: 0 },
          '& .MuiDataGrid-columnHeader , & .MuiDataGrid-cell': { borderRight: '1px solid #E5E5E5' },
          '& .MuiDataGrid-row:nth-of-type(odd)': { backgroundColor: '#F7F9FC' }
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
export default GroupesList
