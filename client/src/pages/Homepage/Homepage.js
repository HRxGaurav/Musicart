import React from 'react'
import Footer from '../../components/Footer'
import Inventory from '../../components/Inventory'
import Navbar, { NavbarMobile } from '../../components/Navbar'
import Sale from '../../components/Sale'
import IsMobileView from '../../Utilities/IsMobileView'


const Homepage = () => {
  return (
    
    <>
      <Navbar />
      <Sale />
      <Inventory />
      {!IsMobileView() && <Footer/>}
      {IsMobileView() && <NavbarMobile/>}
      
    </>

  )
}

export default Homepage