import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className='bg-amber-300 min-h-screen'>
      <Navbar/>
      <div className='flex flex-col items-center justify-center'>
        <Header/>
      </div>
    </div>
  )
}

export default Home
