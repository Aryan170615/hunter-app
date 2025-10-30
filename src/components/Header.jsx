import React, { useContext, useState } from 'react'
import { AppBar, Button, Container, MenuItem, Select, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'
import AuthModal from './Authentication/AuthModal'
import UserSidebar from './Authentication/UserSidebar'

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "30px !important",
  }
}))

const Header = () => {
  const classes = useStyles();  
  const navigate = useNavigate();

  const { currency,setCurrency , user} = CryptoState();



  const darkTheme = createTheme({
    palette: {
      primary: { main: '#fff' },
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme} style={{ height: "100px" }}>
      <AppBar color='transparent' position='static' > 
        <Container style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "80px" }}>
          <Typography 
            className={classes.title}
            onClick={() => navigate('/')}
            variant="h6"
          >
            Crypto Hunter
          </Typography>
          <Select 
            variant='outlined' 
            style={{ width: 100, height: 40, marginRight: 15 }} 
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
          </Select>
          {user ? <UserSidebar /> : <AuthModal />}
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
