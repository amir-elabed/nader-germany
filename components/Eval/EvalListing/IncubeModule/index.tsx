import React from 'react'
import Dynamic from 'next/dynamic'
import { Box, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Tooltip } from '@mui/material'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { useParams, useRouter } from 'next/navigation'
import Progress from '@/components/commun/Progress'

const DataGrid = Dynamic<any>((() => import('@mui/x-data-grid').then(module => module.DataGrid)) as any, {
  ssr: false
})

interface CellType {
  row: any
}

const EvalListingModules = ({ data, espace }: any) => {
  const { t } = useTranslation()
  const router = useRouter()

  const params = useParams()

  const columns = [
    {
      flex: 0.075,
      minWidth: 100,
      field: 'title',
      headerName: t('tableHeader__title'),
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>
          <Box display='flex' alignItems='center' width='100%'>
            <Typography color='#746A6F'>{row?.module?.title || '-'}</Typography>
          </Box>
        </Typography>
      )
    },
    {
      flex: 0.025,
      minWidth: 40,
      field: 'evaluation',
      headerName: t('evaluation'),
      renderCell: ({ row }: CellType) => (
        <Box display='flex' flexDirection={'column'} alignItems='center' width='100%' gap='0.375rem'>
          <Progress
            total={row?.evaluations?.length}
            value={row?.evaluations?.filter((evaluation: any) => evaluation.note !== null)?.length}
          />
          <Typography color='#746A6F'>
            {row?.evaluations?.filter((evaluation: any) => evaluation.note !== null)?.length +
              ' / ' +
              row?.evaluations?.length}
          </Typography>
        </Box>
      )
    },
    {
      flex: 0.001,
      minWidth: 100,
      field: 'actions',
      headerName: '',
      renderCell: ({ row }: CellType) => (
        <>
          <Tooltip title='Modifier'>
            <div>
              <IconButton
                onClick={() =>
                  router.push(
                    `/espace-${espace}/evaluation/${params?.id}/module/${row?.module?._id}/incube/${params?.id_incube}`
                  )
                }
                size='small'
                sx={{ color: '#9E9E9E', textDecoration: 'none', mr: 0.3 }}
              >
                <CreateOutlinedIcon />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip title='Consulter'>
            <div>
              <IconButton
                onClick={() =>
                  router.push(
                    `/espace-${espace}/evaluation/${params?.id}/module/${row?.module?._id}/incube/${params?.id_incube}/view`
                  )
                }
                size='small'
                sx={{ color: '#9E9E9E', textDecoration: 'none', mr: 0.3 }}
              >
                <VisibilityOutlinedIcon />
              </IconButton>
            </div>
          </Tooltip>
        </>
      )
    }
  ]

  return (
    <>
      <DataGrid
        autoHeight
        rows={data || []}
        columns={columns}
        getRowId={(row: any) => row?.module?._id}
        pageSize={10}
        columnSeparator='vertical-line 1px #E5E5E5'
        hideFooter={true}
        sx={{
          '& .MuiDataGrid-columnHeaders': { borderRadius: 0 },
          '& .MuiDataGrid-columnHeader , & .MuiDataGrid-cell': { borderRight: '1px solid #E5E5E5' },
          '& .MuiDataGrid-row:nth-of-type(even), .MuiDataGrid-columnHeaders': { backgroundColor: '#F7F9FC' }
        }}
      />
    </>
  )
}

export default EvalListingModules
