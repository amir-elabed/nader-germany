'use client'

import React from 'react'
import Button from '@mui/material/Button'
import LockIcon from '@mui/icons-material/Lock'
import { Box } from '@mui/material'

const UnauthorizedPage = () => {

  const iconStyle = {
    fontSize: '4rem'
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '75vh'
      }}
    >
      <Box>
        <LockIcon style={iconStyle} />
        <strong>Vous n'êtes pas autorisés!</strong>
      </Box>
      <p>Vous n'avez pas la permission pour accéder à cette page. Revenez à la page précédente!</p>
        <Button variant='contained' color='secondary' onClick={() => window.history.back()}>
          Retour
        </Button>
    </Box>
  )
}

export default UnauthorizedPage
