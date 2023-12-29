import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
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
import Loader from './Modals/Loader.js'

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


const NextArrow = (props) => {
    const {  onClick } = props;
    return (
        <>
            <div  className={style.nextArrow} onClick={onClick} >
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                <path d="M9.37346 4.71462C9.82184 4.93035 9.82184 5.56884 9.37346 5.78457L2.25706 9.20844C1.86292 9.39808 1.406 9.11086 1.406 8.67347V1.82572C1.406 1.38833 1.86292 1.10111 2.25706 1.29074L9.37346 4.71462Z" fill="white" stroke="#A1A1A1" stroke-width="1.31249" />
            </svg>
            </div>
        </>
    )
}

const PrevArrow = (props) => {
    const {  onClick } = props;
    return (
        <>
            <div className={style.prevArrow} onClick={onClick} >
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                <path d="M1.62654 4.71535C1.17816 4.93108 1.17816 5.56957 1.62654 5.7853L8.74294 9.20918C9.13708 9.39881 9.594 9.11159 9.594 8.6742V1.82645C9.594 1.38906 9.13708 1.10184 8.74294 1.29147L1.62654 4.71535Z" fill="white" stroke="#A1A1A1" stroke-width="1.31249" />
            </svg>
            </div>
        </>
    )
}

const ProductDetails = () => {
    const navigate = useNavigate();
    const [isUserLoggedin] = useContext(LogContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageIndex, setImageIndex] = useState(0);
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

    const handleImageClick = (index) => {
        setImageIndex(index)
    }

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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow  />,
        prevArrow: <PrevArrow />
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
                            <img src={product?.images[imageIndex]} alt="productImage" className={style.mainImage} />

                            <div className={style.otherImageDiv}>
                                <img src={product?.images[0]} alt="productImage" className={imageIndex === 0 ? style.otherImageWithBorder : style.otherImage} onClick={() => (handleImageClick(0))} />

                                <img src={product?.images[1]} alt="productImage" className={imageIndex === 1 ? style.otherImageWithBorder : style.otherImage} onClick={() => (handleImageClick(1))} />

                                <img src={product?.images[2]} alt="productImage" className={imageIndex === 2 ? style.otherImageWithBorder : style.otherImage} onClick={() => (handleImageClick(2))} />
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
                            <Slider {...settings}>
                                <img src={product?.images[0]} alt="productImage" className={style.mainImageMobile} />

                                <img src={product?.images[1]} alt="productImage" className={style.mainImageMobile} />

                                <img src={product?.images[2]} alt="productImage" className={style.mainImageMobile} />
                            </Slider>


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




                </>) : <Loader />)}


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