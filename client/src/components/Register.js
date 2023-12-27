import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import style from "./Register.module.css";
import homeLogo from "../assets/icons/homeLogo.png";
import registerApi from '../APIs/registerAPI';
import LogContext from '../Utilities/LogContext.js'
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();

  const [isUserLoggedin, setIsUserLoggedin] = useContext(LogContext);

  // State variables to handle user input
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Call the registerApi function with user input
      const response = await registerApi(name, phone, email, password);

      if (response.success) {
        // Registration successful, handle success (e.g., navigate to a new page)
        console.log('Registration successful:', response.data);
        toast.success("Registered successfully");
        setIsUserLoggedin(true);
        Cookies.set('token', response.data.token, { expires: 7 });
        Cookies.set('id', response.data.id, { expires: 7 });
        navigate('/'); 
      } else {
        // Registration failed, handle error (e.g., display an error message)
        toast.error(`Registration failed: ${response.error}`);
        // alert(`Registration failed: ${response.error}`);
      }
    } catch (error) {
      // Handle general error (e.g., server error)
      
      console.error('Error during registration:', error);
      alert('Server error during registration');
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
            <h1 className={style.signIn}>Create Account<span className={style.signInTextMobile}>. </span> <span className={style.signInMobile}>Don’t have an account?</span></h1>
            <label className={style.signInLabel}>Your name</label>
            <input className={style.signInInput} type='text' value={name} onChange={(e) => setName(e.target.value)} />
            <label className={style.passwordLabel}>Mobile number</label>
            <input className={style.signInInput} type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
            <label className={style.passwordLabel}>Email Id</label>
            <input className={style.signInInput} type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            <label className={style.passwordLabel}>Password</label>
            <input className={style.passwordInput} type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

            <h2 className={style.tnc}>By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Musicart. Message and data rates may apply.</h2>

            <button className={style.continueButton} onClick={handleRegister}>Continue</button>

            <p className={style.conditionsText}>By continuing, you agree to Musicart privacy notice and conditions of use.</p>
          </div>
        </div>

        <div className={style.alreadyAc} onClick={() => (navigate('/login'))}>Already have an account? <span className={style.alreadyAcSpan}>Sign in</span></div>
      </div>
    </>
  );
};

export default Register;