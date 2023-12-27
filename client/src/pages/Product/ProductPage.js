import React from 'react'
import Product from '../../components/Product'
import Footer from '../../components/Footer'
import IsMobileView from '../../Utilities/IsMobileView'
import { NavbarMobile } from '../../components/Navbar'
 


const ProductPage = () => {
  return (
    <>

        <Product/>
        {!IsMobileView() && <Footer/>}
      {IsMobileView() && <NavbarMobile/>}
    </>
  )
}

export default ProductPage