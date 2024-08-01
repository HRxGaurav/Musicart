import React, {useContext} from "react";
import style from "./Sale.module.css";
import homeLogo from "../assets/icons/homeLogo.png";
import cartIcon from "../assets/icons/cartIcon.svg";
import { useNavigate } from 'react-router-dom';
import LogContext from '../Utilities/LogContext.js'

const Sale2 = () => {
    const navigate = useNavigate();
    const [isUserLoggedin] = useContext(LogContext);
  return (
    <>
      <div className={style.main}>
        <div className={style.container} >
        <div onClick={() => (navigate('/'))}>
          <div className={style.leftSide}><img src={homeLogo} alt="logo" className={style.logo} />
          <div className={style.headerText}>Musicart <span className={style.home}>Home</span></div></div>
          </div>

        { isUserLoggedin && <div className={style.cartButton}  onClick={() => (navigate('/cart'))}>
        <img src={cartIcon} alt="CartIcon" className={style.cartIcon} />
        <div className={style.cartText}>View Cart</div>
        </div>}
          
        </div>


       
      </div>
      
    </>
  );
};

export default Sale2;
