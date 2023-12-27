import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import style from "./Login.module.css";
import homeLogo from "../assets/icons/homeLogo.png";
import loginApi from '../APIs/logInAPI';
import toast from 'react-hot-toast';
import LogContext from '../Utilities/LogContext.js'

const Login = () => {
  const navigate = useNavigate();


  const [isUserLoggedin, setIsUserLoggedin] = useContext(LogContext);
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      // Call the loginApi function with user input
      const response = await loginApi(emailOrMobile, password);

      if (response.success) {
        // Login successful, handle success (e.g., navigate to a new page)
        console.log('Login successful:', response.data);
        toast.success("Logged in successfully");
        setIsUserLoggedin(true);
        Cookies.set('token', response.data.token, { expires: 7 });
        Cookies.set('id', response.data.id, { expires: 7 });
        
        navigate('/');
      } else {
        // Login failed, handle error (e.g., display an error message)
        toast.error(`Login failed: ${response?.error}`);
        console.error('Login failed:', response.error);
      }
    } catch (error) {
      // Handle general error (e.g., server error)
      console.error('Error during login:', error);
      alert('Server error during login');
    }
  };

  return (
    <>
      <div className={style.main}>
        <div className={style.home} onClick={() => (navigate('/'))}>
          <img src={homeLogo} alt='logo' className={style.logo} />
          <div className={style.headerText}>Musicart</div>
        </div>

        <div className={style.welcomeText}>Welcome</div>

        <div className={style.formDiv}>
          <div className={style.innerFormDiv}>
            <h1 className={style.signIn}>Sign in<span className={style.signInTextMobile}>. </span> <span className={style.signInMobile}>Already a customer?</span></h1>
            <label className={style.signInLabel}>Enter your email or mobile number</label>
            <input
              className={style.signInInput}
              type='text'
              placeholder='Email or Mobile Number'
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
            />
            <label className={style.passwordLabel}>Password</label>
            <input
              className={style.passwordInput}
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className={style.continueButton} onClick={handleLogin}>
              Continue
            </button>

            <p className={style.conditionsText}>
              By continuing, you agree to Musicart privacy notice and conditions of use.
            </p>
          </div>
        </div>

        <div className={style.newToDiv}>
          <hr className={style.hr} />
          <h1 className={style.newTo}>New to Musicart?</h1>
          <hr className={style.hr} />
        </div>

        <button className={style.registerButton} onClick={() => (navigate('/register'))}>
          Create your Musicart account
        </button>
      </div>
    </>
  );
};

export default Login;
