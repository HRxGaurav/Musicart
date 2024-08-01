import React from 'react'
import style from "./Footer.module.css";
import {useNavigate} from 'react-router-dom'

const Footer = () => {

  const navigate=useNavigate();

  return (
    <>
    <div className={style.main}>
        <div className={style.textT} onClick={()=>{navigate('../terms_and_conditions')}}>Terms and Conditions</div> <br/>
        <div className={style.text}>Musicart | All rights reserved</div>
    </div>

    <div className={style.empty}></div>
    
    </>
  )
}

export default Footer