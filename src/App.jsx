import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import CoinPage from './pages/coinPage' 
import CryptoContextProvider from './CryptoContext'
import 'react-alice-carousel/lib/alice-carousel.css';

function App() {

  return (
    <CryptoContextProvider>
    <div className='bg-[#14161a] h-screen text-white'>

        <BrowserRouter>
          {   <Header /> }
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/coins/:id' element={<CoinPage />} />
            <Route path='*' element={<div>Hi there</div>} />
          </Routes>
        </BrowserRouter>

    </div>
    </CryptoContextProvider>
  )
}

export default App
