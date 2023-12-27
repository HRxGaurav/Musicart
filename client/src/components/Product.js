import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import style from "./Product.module.css";
import homeLogo from "../assets/icons/homeLogo.png";
import cartIcon from "../assets/icons/cartIcon.svg";
import LogContext from '../Utilities/LogContext.js'
import getProductByIdAPI from "../APIs/getProductByIdApi.js";
import formatIndianCurrency from "../Utilities/formatIndianCurrency.js";
import addToCartAPI from "../APIs/addToCartAPI.js";
import toast from 'react-hot-toast';
import CheckoutDirect from "./CheckoutDirect.js";
import Navbar, { HomeHeaderMobile } from "./Navbar.js";
import backButtonMobile from '../assets/icons/backButtonMobile.svg'

const HomePageHeader = ({ pageName, showCart, navigatePage, navigatePageText }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className={style.main}>
                <div className={style.container}>
                    <div onClick={() => (navigate('/'))}>
                        <div className={style.leftSide}><img src={homeLogo} alt="logo" className={style.logo} />
                            <div className={style.headerText}>Musicart <span className={style.home}>Home/ {pageName}</span></div></div></div>

                    {showCart && <div className={style.cartButton} onClick={() => (navigate('/cart'))}>
                        <img src={cartIcon} alt="CartIcon" className={style.cartIcon} />
                        <div className={style.cartText}>View Cart</div>
                    </div>}

                </div>

                <div className={style.backTo} onClick={() => (navigate(navigatePage))}>{navigatePageText}</div>
            </div>

        </>
    )
}

const ProductDetails = () => {
    const navigate = useNavigate();
    const [isUserLoggedin] = useContext(LogContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCheckoutVisible, setCheckoutVisible] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProductByIdAPI(id);

                if (response.success) {
                    setProduct(response.data.product);
                } else {
                    console.error('Error:', response.error);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleAddToCart = async (event, productId) => {
        event.stopPropagation();

        try {
            const response = await addToCartAPI(productId);

            if (response.success) {
                toast.success("Added to cart successfully");
            } else {
                console.error('Failed to add to cart:', response.error);
            }
        } catch (error) {
            console.error('Error during addToCart:', error);
        }
    };

    const handleBuyNow = () => {
        // Add any logic you need before showing the Checkout component
        setCheckoutVisible(true);
    };


    return (
        <>
            {(!isCheckoutVisible && product) &&
                <><div className={style.hideInMobileView}><Navbar /><HomePageHeader pageName={product.company} showCart={isUserLoggedin} navigatePage='/' navigatePageText='Back to products' /></div> <HomeHeaderMobile />
                    <img src={backButtonMobile} alt="backButtonMobile" className={style.backButtonMobile} onClick={() => (navigate('/'))} />
                </>}
            {!isCheckoutVisible &&

                (product ? (<><div className={style.productName}>{product.fullname}</div>

                    <div className={style.ProductDetailMain}>
                        <div className={style.ProductDetailLeft}>
                            <img src={product?.images[0]} alt="productImage" className={style.mainImage} />

                            <div className={style.otherImageDiv}>
                                <img src={product?.images[0]} alt="productImage" className={style.otherImage} />

                                <img src={product?.images[1]} alt="productImage" className={style.otherImage} />

                                <img src={product?.images[2]} alt="productImage" className={style.otherImage} />
                            </div>


                        </div>


                        <div className={style.ProductDetailRight}>

                            <div className={style.name}>{product.name}</div>
                            <div className={style.rating}> ⭐⭐⭐⭐⭐(50 Customer reviews)</div>
                            <div className={style.price}>Price -  {formatIndianCurrency(product.price)}</div>
                            <div className={style.type}>{product.colour} | {product.type}</div>
                            <div className={style.about}>About this item</div>
                            <ul>
                                {product.about_item.map((item, index) => {
                                    return (
                                        <li className={style.list} key={index}>{item}</li>
                                    )
                                })}
                            </ul>

                            <div className={style.avilability}>Available - <span>In stock</span></div>
                            <div className={style.brand}>Brand -<span> {product.company}</span></div>

                            {isUserLoggedin && <div className={style.addToCart} onClick={(event) => (handleAddToCart(event, product._id))}>Add to cart</div>}
                            {isUserLoggedin && <div className={style.buyNow} onClick={handleBuyNow}>Buy Now</div>}
                            {!isUserLoggedin && <div className={style.LoginButton} onClick={() => (navigate('/login'))}>Sign Up / Login</div>}

                        </div>

                    </div>

                    {/* ------------------------------------Mobile View---------------------------------------------- */}



                    <div className={style.ProductDetailMainMobile}>
                        <div className={style.ProductDetailLeftMobile}>
                            <img src={product?.images[0]} alt="productImage" className={style.mainImageMobile} />

                            <img src={product?.images[1]} alt="productImage" className={style.mainImageMobile} />

                            <img src={product?.images[2]} alt="productImage" className={style.mainImageMobile} />


                        </div>




                        <div className={style.nameMobile}>{product.name}</div>
                        <div className={style.ratingMobile}> ⭐⭐⭐⭐⭐(50 Customer reviews)</div>
                        <div className={style.productNameMobile}>{product.fullname}</div>
                        <div className={style.priceMobile}>Price -  {formatIndianCurrency(product.price)}</div>
                        <div className={style.typeMobile}>{product.colour} | {product.type}</div>
                        <div className={style.aboutMobile}>About this item</div>

                        <ul>
                            {product.about_item.map((item, index) => {
                                return (
                                    <li className={style.listMobile} key={index}>{item}</li>
                                )
                            })}
                        </ul>

                        <div className={style.availabilityMobile}>Available - <span>In stock</span></div>
                        <div className={style.brandMobile}>Brand -<span> {product.company}</span></div>

                        {isUserLoggedin && <div className={style.addToCartMobile} onClick={(event) => (handleAddToCart(event, product._id))}>Add to cart</div>}
                        {isUserLoggedin && <div className={style.buyNowMobile} onClick={handleBuyNow}>Buy Now</div>}
                        {!isUserLoggedin && <div className={style.LoginButtonMobile} onClick={() => (navigate('/login'))}>Sign Up / Login</div>}

                    </div>




                </>) : <div>loading....</div>)}


            {isCheckoutVisible && <CheckoutDirect cartData={product} backPage={setCheckoutVisible} />}
        </>
    )
}


const Product = () => {
    const [isUserLoggedin] = useContext(LogContext);
    return (
        <>

            <ProductDetails />


        </>
    )
}

export default Product
export { HomePageHeader };