import React, {useEffect} from 'react'
import style from "./OrderSuccess.module.css";
import { useNavigate } from "react-router-dom";
import homeLogo from "../assets/icons/homeLogo.png";
import boomImage from '../assets/images/boom.png'
import { HomeHeaderMobile } from './Navbar';

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <HomeHeaderMobile/>
      <div className={style.main}>
        <div className={style.container}>
          <div onClick={() => (navigate('/'))}>
            <div className={style.leftSide}><img src={homeLogo} alt="logo" className={style.logo} />
              <div className={style.headerText}>Musicart </div>
            </div>
          </div>
        </div>

        <div className={style.orderSuccessMain}>
          <div className={style.orderSuccessContainer}>
            <img src={boomImage} alt='boom' className={style.image} />
            <div className={style.successMessage}>Order is placed successfully!</div>
            <div className={style.successConfirmation}>You  will be receiving a confirmation email with order details</div>
            <div className={style.button} onClick={() => (navigate('/'))}>Go back to Home page</div>

          </div>
        </div>

      </div>

    </>
  )
}

export default OrderSuccess