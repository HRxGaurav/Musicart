import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomePageHeader } from "./Product";
import style from "./Cart.module.css";
import myCart from "../assets/icons/myCart.svg";
import LogContext from '../Utilities/LogContext.js'
import getCart from "../APIs/getCart.js";
import formatIndianCurrency from "../Utilities/formatIndianCurrency.js";
import updateCartQuantityAPI from "../APIs/updateCartQuantityAPI.js";
import Checkout from './Checkout.js'
import Navbar, { HomeHeaderMobile } from "./Navbar.js";
import backButtonMobile from '../assets/icons/backButtonMobile.svg'
import Loader from './Modals/Loader.js'


const Nodata = () => {
  return (
    <>
      <div className={style.noDataDiv}>
        Your Musicart Cart is empty.
      </div>
    </>
  )
}

const Cart = () => {
  const navigate =useNavigate();
  const [isUserLoggedin] = useContext(LogContext);
  const [cartData, setCartData] = useState([]);
  const [isCheckoutVisible, setCheckoutVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const ConvenienceFee = 45;



  const fetchCart = async () => {
    const response = await getCart();

    if (response.success) {
      setIsLoading(false)
      setCartData(response.data.cart);
    } else {
      setIsLoading(false)
      console.error('Error fetching filtered inventory:', response.error);
    }
  };


  useEffect(() => {

    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await updateCartQuantityAPI(productId, newQuantity);
      fetchCart(); // Refresh cart data after updating quantity
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const calculateTotalPrice = (cart) => {
    // Use the reduce function to calculate the total price
    const totalPrice = cart.reduce((total, cartItem) => {
      // Extract product details and quantity from the cart item
      const { product, quantity } = cartItem;

      // Multiply the product price by quantity and add it to the total
      return total + product.price * quantity;
    }, 0);

    return totalPrice;
  };

  const handlePlaceOrder = () => {
    // Add any logic you need before showing the Checkout component
    setCheckoutVisible(true);
  };


  return (
    <>
      {!isCheckoutVisible && <>
        <div className={style.hideDivInMMobile}><Navbar />
          <HomePageHeader pageName="View Cart" showCart={false} navigatePage='/' navigatePageText='Back to products' /></div>

        {(cartData.length > 0) ?
          <>
            <div className={style.main}>
              <div className={style.myCartDiv}>
                <img src={myCart} alt="mycart" className={style.myCart} />
                <div className={style.myCartText}>My Cart</div>
              </div>

              <div className={style.itmesDivMain}>

                <div className={style.scrollableDiv}>
                  <div className={style.line}></div>

                  {cartData.map((item) => {
                    return (
                      <div className={style.cartItemDiv} key={item.product._id}>
                        <div>
                          <img
                            src={item.product.images[0]}
                            alt="itemImage"
                            className={style.image}
                          />
                        </div>
                        <div className={style.productDetailDiv}>
                          <div className={style.name}>{item.product.name}</div>
                          <div className={style.colour}>Colour : {item.product.colour}</div>
                          <div className={style.stock}>In Stock</div>
                        </div>
                        <div className={style.priceDiv}>
                          <div className={style.name}>Price</div>
                          <div className={style.price}>{formatIndianCurrency(item.product.price)}</div>
                        </div>
                        <div className={style.quantityDiv}>
                          <div className={style.name}>Quantity</div>
                          <select
                            className={style.quantity}
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className={style.totalDiv}>
                          <div className={style.name}>Total</div>
                          <div className={style.total}>{formatIndianCurrency(item.product.price * item.quantity)}</div>
                        </div>
                      </div>

                    )
                  })}

                  <div className={style.line2}></div>

                  <div className={style.totalBottomDiv}>
                    <div className={style.totalItem}>{cartData.length} Item</div>
                    <div className={style.totalValue}>{formatIndianCurrency(calculateTotalPrice(cartData))}</div>
                  </div>
                </div>


                <div className={style.verticalLine}></div>

                <div className={style.grossMainDiv}>
                  <div className={style.priceDetail}>PRICE DETAILS</div>

                  <div className={style.grossContainer}>
                    <div className={style.leftSide}>
                      <div className={style.totalMRP}>Total MRP</div>
                      <div className={style.totalDiscount}>Discount on MRP</div>
                      <div className={style.totalConvenience}>Convenience Fee</div>
                      <div className={style.totalAmount}>Total Amount</div>
                    </div>

                    <div className={style.rightSide}>
                      <div className={style.totalMRPValue}>{formatIndianCurrency(calculateTotalPrice(cartData))}</div>
                      <div className={style.totalDiscountValue}>₹0</div>
                      <div className={style.totalConvenienceValue}>{formatIndianCurrency(ConvenienceFee)}</div>
                      <div className={style.totalAmountValue}>{formatIndianCurrency(calculateTotalPrice(cartData) + ConvenienceFee)}</div>

                    </div>
                  </div>


                  <div className={style.button} onClick={handlePlaceOrder}>PLACE ORDER</div>
                </div>
              </div>


            </div>


            {/* ------------------------------------------Mobile View code ------------------------------------------------- */}
            <HomeHeaderMobile />
            <div className={style.mainMobile}> <img src={backButtonMobile} alt="backButton" className={style.backButtonMobile} onClick={() => (navigate('/'))}/>

              <div className={style.container}>


                {cartData.map((item, index, arr) => {
                  return (<div className={style.productDetailDivMobile} key={item.product._id}>
                    <div><img src={item.product.images[0]} alt="productImage" className={style.imageMobile} /></div>

                    <div className={style.leftSideMobile}>
                      <div className={style.name}>{item.product.name}</div>
                      <div className={style.price}>{formatIndianCurrency(item.product.price)}</div>
                      <div className={style.colour}>Quantity : {item.quantity}</div>
                      <div className={style.colour}>Colour : {item.product.colour}</div>
                      <div className={style.stock}>In Stock</div>
                      
                      
                      {arr.length-1 === index && <div className={style.convenienceDiv}>
                        <div className={style.convenienceTag}>Convenience Fee</div>
                        <div className={style.convenienceValue}>{formatIndianCurrency(ConvenienceFee)}</div>
                      </div>}
                      
                      {arr.length-1 === index && <div className={style.totalAmountDiv}>
                        <div className={style.totalAmountTag}> Total : </div>
                        <div className={style.totalGrossValue}>{formatIndianCurrency(calculateTotalPrice(cartData) + ConvenienceFee)}</div>
                      </div>}
                    </div>

                  </div>)
                })}

              </div>

              <div className={style.horizontalLine}></div>
              <div className={style.grossTextBottom}>Total Amount <span className={style.grossValueBottom}>{formatIndianCurrency(calculateTotalPrice(cartData) + ConvenienceFee)}</span></div>
              <div className={style.placeOrderButtonMobile} onClick={handlePlaceOrder}>PLACE ORDER</div>
            </div>

          </>
          :<>
          <HomeHeaderMobile />
          <Nodata /></>}
      </>}

      {isCheckoutVisible && <Checkout cartData={cartData} convenienceFee={ConvenienceFee} backPage={setCheckoutVisible} />}
      {isLoading && <Loader/>}
    </>
  );
};

export default Cart;
