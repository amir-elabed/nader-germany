import React from 'react'
import Dynamic from 'next/dynamic'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const DataGrid = Dynamic<any>((() => import('@mui/x-data-grid').then(module => module.DataGrid)) as any, {
  ssr: false
})

interface CellType {
  row: any
}

const EvalListingModules = ({data}: any) => {

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
        <Typography variant='body2'>
          <Box display='flex' alignItems='center' width='100%'>
            <Typography color='#746A6F'>
              {row?.moduleEvaluations?.filter((item: any) => item?.evaluations?.length !== 0)?.length}
              {' / '}
              {row?.moduleEvaluations?.length}
            </Typography>
          </Box>
        </Typography>
      )
    }
  ]

  return (
    <>
      <DataGrid
        autoHeight
        rows={data?.moduleEvaluations || []}
        columns={columns}
        getRowId={(row: any) => row?.module?._id}
        pageSize={10}
        columnSeparator='vertical-line 1px #E5E5E5'
        hideFooter={true}
        sx={{
          '& .MuiDataGrid-columnHeaders': { borderRadius: 0 },
          '& .MuiDataGrid-columnHeader , & .MuiDataGrid-cell': { borderRight: '1px solid #E5E5E5' },
          '& .MuiDataGrid-row:nth-of-type(odd)': { backgroundColor: '#F7F9FC' }
        }}
      />
    </>
  )
}

export default EvalListingModules
