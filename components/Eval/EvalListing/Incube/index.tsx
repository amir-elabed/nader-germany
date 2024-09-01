import React from 'react'
import Dynamic from 'next/dynamic'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useRouter } from 'next/navigation'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'
import Progress from '@/components/commun/Progress'

const DataGrid = Dynamic<any>((() => import('@mui/x-data-grid').then(module => module.DataGrid)) as any, {
    ssr: false
})

interface CellType {
    row: any
}

const EvalListingIncube = ({ data, espace }: any) => {

    const router = useRouter()

    const params = useParams()

    const { t } = useTranslation()

    const columns = [
      {
        flex: 0.075,
        minWidth: 100,
        field: 'title',
        headerName: t('tableHeader__title'),
        renderCell: ({ row }: CellType) => (
          <Typography variant='body2'>
            <Box display='flex' alignItems='center' width='100%'>
              <Typography color='#746A6F'>{row?.user?.firstName + ' ' + row?.user?.lastName || '-'}</Typography>
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
              total={row?.moduleEvaluations?.length}
              value={row?.moduleEvaluations?.filter((evaluation: any) => evaluation.moduleStatus === '2')?.length}
            />
            <Typography color='#746A6F'>
              {row?.moduleEvaluations?.filter((evaluation: any) => evaluation.moduleStatus === '2')?.length}
              {'/'}
              {row?.moduleEvaluations?.length}
            </Typography>
          </Box>
        )
      },
      {
        flex: 0.001,
        minWidth: 60,
        field: 'actions',
        headerName: '',
        renderCell: ({ row }: CellType) => (
          <Tooltip title='Consulter'>
            <div>
              <IconButton
                onClick={() => router.push(`/espace-${espace}/evaluation/${params?.id}/incube/${row?._id}`)}
                size='small'
                sx={{ color: '#9E9E9E', textDecoration: 'none', mr: 0.3 }}
              >
                <VisibilityOutlined />
              </IconButton>
            </div>
          </Tooltip>
        )
      }
    ]

    return (
        <>
            <DataGrid
                autoHeight
                rows={data || []}
                columns={columns}
                getRowId={(row: any) => row?._id}
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

export default EvalListingIncube
