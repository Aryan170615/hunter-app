import { AppBar, Container, Typography } from '@mui/material'
import React from 'react'
import Banner from '../components/banner/Banner'
import CoinsTable from '../components/CoinsTable'

const HomePage = () => {
  return (
    <div>
      <Banner />
      <CoinsTable />
    </div>
  )
}

export default HomePage
