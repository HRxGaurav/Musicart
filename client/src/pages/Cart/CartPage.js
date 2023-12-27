import React from 'react'
import Cart from '../../components/Cart'
import Footer from '../../components/Footer'
import { NavbarMobile } from '../../components/Navbar'
import IsMobileView from '../../Utilities/IsMobileView'

const CartPage = () => {
  return (
    <>
    
    <Cart/>
    {!IsMobileView() && <Footer/>}
      {IsMobileView() && <NavbarMobile/>}
    
    </>
  )
}

export default CartPage