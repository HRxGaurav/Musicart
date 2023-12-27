import React,{useState, useEffect} from 'react'
import style from "./Checkout.module.css";
import { HomePageHeader } from './Product';
import Navbar, { HomeHeaderMobile } from './Navbar'
import Footer from './Footer';
import { formatIndianCurrencyFloat } from '../Utilities/formatIndianCurrency';
import OrderSuccess from './OrderSuccess'
import clearCartAPI from '../APIs/clearCartAPI';
import { toast } from 'react-hot-toast';
import backButtonMobile from '../assets/icons/backButtonMobile.svg'

const CheckoutDirect = ({ cartData, backPage }) => {
    const [showOrderDetails, setShowOrderDetails] = useState(true);
    const convenienceFee = 45;

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
      }, []);

      

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

    const handleClearCart = async () => {
        try {
            const response = await clearCartAPI();

            if (response.success) {
                setShowOrderDetails(false);
                return('Cart cleared successfully:', response);
            } else {
                console.error('Error clearing cart:', response.error);
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const handlePlaceOrder = () => {
        toast.success("Order Successfully placed")
        setShowOrderDetails(false);
      };

    return (
        <>
            
            {showOrderDetails && <><div className={style.hideDivInMMobile}><Navbar/><div onClick={()=>(backPage(false))}><HomePageHeader pageName="Checkout" showCart={false}  navigatePageText='Back to item'  /></div></div>
           
            <div className={style.main}>
                <div className={style.checkoutText}>Checkout</div>

                <div className={style.container}>



                    <div className={style.leftSide}>
                        <div style={{ display: 'flex' }}>
                            <div className={style.deliveryTag}>1. Delivery address</div>
                            <div className={style.deliveryAddress}> Akash Patel <br />104<br /> kk hh nagar, Lucknow <br /> Uttar Pradesh 226025</div>
                        </div>

                        <div className={style.line}></div>
                        <div style={{ display: 'flex', marginTop: '29px', marginBottom: '39px' }}>
                            <div className={style.paymentTag}>2. Payment method</div>
                            <div className={style.paymentMode}>Pay on delivery ( Cash/Card)</div>
                        </div>

                        <div className={style.line}></div>
                        <div style={{ display: 'flex', marginTop: '29px' }}>
                            <div className={style.reviewTag}>3. Review items and delivery</div>
                            <div>
                                {/* ----------------------------------------------------------map item------------------------------------------------------------------------- */}
                                
                                        <div className={style.cartItems}>
                                            <img src={cartData.images[0]} alt='productImage' className={style.image} />

                                            <div className={style.name}>{cartData.name}</div>
                                            <div className={style.colour}>Colour : {cartData.colour}</div>
                                            <div className={style.stock}>In Stock</div>
                                            <div className={style.deliveryTime}>Estimated delivery :<br /> Monday — FREE Standard Delivery</div>

                                        </div>

                                {/* ------------------------------------------------------------map item end-------------------------------------------------------------------------- */}
                            </div>
                        </div>
                        <div className={style.line}></div>
                        <div className={style.placeOrderBottomDiv}>
                            <div className={style.button} onClick={handlePlaceOrder}>Place your order</div>

                            <div>
                                <div className={style.value}>Order Total : {formatIndianCurrencyFloat(cartData.price)}</div>
                                <div className={style.tnc}>By placing your order, you agree to Musicart privacy notice and conditions of use.</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.rightSide}>

                        <div className={style.button} onClick={handlePlaceOrder}>Place your order</div>
                        <div className={style.tnc}>By placing your order, you agree to Musicart privacy <br />notice and conditions of use.</div>
                        <div className={style.line}></div>
                        <div className={style.summary}>Order Summary</div>
                        <div className={style.grossDiv}>
                            <div className={style.grossDivLeft}>
                                <div className={style.item}>Items :</div>
                                <div className={style.delivery}>Delivery :</div>
                            </div>

                            <div className={style.grossDivRight}>
                                <div className={style.value}>{formatIndianCurrencyFloat(cartData.price)}</div>
                                <div className={style.fees}>{formatIndianCurrencyFloat(convenienceFee)}</div>
                            </div>

                        </div>
                        <div className={style.line2}></div>

                        <div className={style.grossDiv2}>
                            <div className={style.grossDivLeft}>
                                <div className={style.item}>Order Total : </div>
                            </div>

                            <div className={style.grossDivRight}>
                                <div className={style.value}>{formatIndianCurrencyFloat(cartData.price + convenienceFee)}</div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
            

            {/* ----------------------------------Mobile View----------------------------- */}
            
            <HomeHeaderMobile />
                <div className={style.mainMobile}>
                    <img src={backButtonMobile} alt="backButton" className={style.backButtonMobile} onClick={() => (backPage(false))} />
                    <div className={style.checkoutTextMobile}>Checkout</div>
                    <div className={style.deliveryTagMobile}>1. Delivery address</div>
                    <div className={style.deliveryAddressMobile}> Akash Patel<br /> 104<br /> kk hh nagar, Lucknow<br /> Uttar Pradesh 226025<br /> </div>
                    <div className={style.horizontalLine}></div>
                    <div className={style.paymentTagMobile}>2. Payment method</div>
                    <div className={style.paymentModeMobile}>Pay on delivery ( Cash/Card)</div>
                    <div className={style.horizontalLine}></div>
                    <div className={style.reviewTagMobile}>3. Review items and delivery</div>


                    
                            <div className={style.cartItemsMobile} >
                                <img src={cartData.images[0]} alt='productImage' className={style.imageMobile} />
                                <div className={style.nameMobile}>{cartData.name}</div>
                                <div className={style.colourMobile}>Colour : {cartData.colour}</div>
                                <div className={style.stockMobile}>In Stock</div>
                                <div className={style.deliveryTimeMobile}>Estimated delivery :<br /> Monday — FREE Standard Delivery</div>
                            </div>
                     

                    
                    <div className={style.orderSummary}>Order Summary</div>

                    <div className={style.itemDiv}>
                        <div>Items : </div>
                        <div>{formatIndianCurrencyFloat(cartData.price+ 45)}</div>
                    </div>
                    <div className={style.deliveryDiv}>
                        <div>Delivery :  </div>
                        <div>{formatIndianCurrencyFloat(convenienceFee)}</div>
                    </div>

                    <div className={style.horizontalLine}></div>
                    <div className={style.orderSummaryMobile}>
                        <div>Order Total : </div>
                        <div>{formatIndianCurrencyFloat(cartData.price + convenienceFee)}</div>
                    </div>

                    <div className={style.buttonMobile} onClick={handlePlaceOrder}>Place your order</div>


                </div>
            
            
            </>}

            {!showOrderDetails && <OrderSuccess/>}

            <Footer />
        </>
    )
}

export default CheckoutDirect