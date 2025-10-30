import { AppBar, Container, Typography } from '@mui/material'
import React from 'react'
import Banner from '../components/banner/Banner'
import CoinsTable from '../components/CoinsTable'

const Homepage = () => {
  return (
    <div>
      <Banner />
      <CoinsTable />
    </div>
  )
}

export default Homepage
