import * as React from 'react'
import PropTypes from 'prop-types'
import TablePagination from '@mui/material/TablePagination'

export default function TablePaginationDemo({ count, page, setPage, perPage, setPerPage, withMargin }: any) {
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangePerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPerPage(parseInt(event.target.value))
    setPage(0)
  }

  return (
    <table style={{ width: '100%' }}>
      <tfoot>
        <tr>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: count }]}
            colSpan={3}
            count={count}
            rowsPerPage={perPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangePerPage}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: withMargin ? '7rem' : 0
            }}
          />
        </tr>
      </tfoot>
    </table>
  )
}

TablePaginationDemo.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired,
  setPerPage: PropTypes.func.isRequired
}
