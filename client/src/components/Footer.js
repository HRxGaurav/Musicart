import React from 'react'
import style from "./Footer.module.css";

const Footer = () => {
  return (
    <>
    <div className={style.main}>
        <div className={style.text}>Musicart | All rights reserved</div>
    </div>

    <div className={style.empty}></div>
    
    </>
  )
}

export default Footer