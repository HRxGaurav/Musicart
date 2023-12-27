import React, { useEffect, useContext, useState } from "react";
import style from "./Navbar.module.css";
import { useNavigate, useLocation } from 'react-router-dom';
import LogContext from '../Utilities/LogContext.js'
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
import checkLoggedin from '../APIs/checkLoggedin.js'
import phoneLogo from "../assets/icons/phoneLogo.svg";
import homeLogo from '../assets/icons/homeLogo.png'
import homeMobileIcon from '../assets/icons/homeMobileIcon.svg'
import cartMobileIcon from '../assets/icons/cartMobileIcon.svg'
import loginMobileIcon from '../assets/icons/loginMobileIcon.svg'
import logoutMobileIcon from '../assets/icons/logoutMobileIcon.svg'

const HomeHeaderMobile = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={style.mainMobile}>
        <div className={style.containerMobile} onClick={() => (navigate('/'))}>
          <img src={homeLogo} alt="homelogo" className={style.imageMobile} />
          <div className={style.textMobile}>Musicart</div>
        </div>

      </div>
    </>
  )
}

const NavbarMobile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserLoggedin, setIsUserLoggedin] = useContext(LogContext);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const userLoggedIn = await checkLoggedin();

        setIsUserLoggedin(userLoggedIn === 200);
        // setLoading(false)
      } catch (error) {
        // setLoading(false)
        console.error('Error checking user login status:', error);
      }
    };

    checkLoggedIn();
  }, []);


  useEffect(() => {
       
    if (location.pathname === '/cart') {
      setSelected(2)
    }

  },[]);



  const logout = () => {
    setIsUserLoggedin(false);
    Cookies.remove('token');
    Cookies.remove('id');
    toast.success('Logout Success!')
    navigate('/')
  }

  const handleHome = () => {
    setSelected(1)
    navigate('/')
  }

  const handleCart = () => {
    if (isUserLoggedin) {
      navigate('/cart')
      setSelected(2)
    } else {
      navigate('/login')
    }
  }

  const handleLogout = () => {
    logout()
    setSelected(1)
    navigate('/')
  }

  const handleLogin = () => {
    setSelected(1)
    navigate('/login')
  }

  return (
    <>
      <div className={style.NavbarMobileMain}>
        <div onClick={handleHome} className={style.container}>
          {selected === 1 && <div className={style.stroke}></div>}
          <img src={homeMobileIcon} alt="homeNavbar" className="stye.image" />
          <div className={style.text}>Home</div>
        </div>
        <div onClick={handleCart} className={style.container}>
          {selected === 2 && <div className={style.stroke}></div>}
          <img src={cartMobileIcon} alt="cartMobileIcon" className="stye.image" />
          <div className={style.text}>Cart</div>
        </div>
        <div onClick={isUserLoggedin ? handleLogout : handleLogin} className={style.container}>
          {selected === 3 && <div className={style.stroke}></div>}
          <img src={isUserLoggedin ? logoutMobileIcon : loginMobileIcon} alt="cartMobileIcon" className="stye.image" />
          <div className={style.text}>{isUserLoggedin ? 'Logout' : 'Login'}</div>
        </div>

      </div>

    </>
  )


}

const Navbar = () => {
  const navigate = useNavigate();
  const [isUserLoggedin, setIsUserLoggedin] = useContext(LogContext);


  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const userLoggedIn = await checkLoggedin();

        setIsUserLoggedin(userLoggedIn === 200);
        // setLoading(false)
      } catch (error) {
        // setLoading(false)
        console.error('Error checking user login status:', error);
      }
    };

    checkLoggedIn();
  }, []);

  const logout = () => {
    setIsUserLoggedin(false);
    Cookies.remove('token');
    Cookies.remove('id');
    toast.success('Logout Success!')
    navigate('/')
  }


  return (
    <>
      <div className={style.main}>

        <div className={style.container}>
          <img src={phoneLogo} alt="phonelogo" className={style.phoneLogo} />
          <div className={style.contactNumber}>912121131313</div>
        </div>

        <div className={style.container}>
          <div className={style.text}>Get 50% off on selected items</div>
          <div className={style.seperator1}>|</div>
          <div className={style.text}>Shop Now</div>
        </div>

        <div className={style.container}>
          {!isUserLoggedin && <div className={style.Login} onClick={() => (navigate('/login'))}>Login</div>}
          {!isUserLoggedin && <div className={style.seperator2}>|</div>}
          {!isUserLoggedin && <div className={style.signUp} onClick={() => (navigate('/register'))}>Signup</div>}
          {isUserLoggedin && <div className={style.logout} onClick={logout}>Logout</div>}
        </div>

      </div>

    </>
  );
};

export default Navbar;
export { HomeHeaderMobile, NavbarMobile };