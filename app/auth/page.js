"use client";
import { useEffect, useState } from "react";
import { PaystackConsumer } from 'react-paystack';
import '@/public/assets/css/login-regiser.css';

import AppHead from "@/app/Components/AppHead";
import AppScripts from "@/app/Components/AppScripts";
import AppHeader from "../Components/AppHeader";
import AppFooter from "../Components/AppFooter";
import AppCopyRight from "../Components/AppCopyRight";
import AppCompanies from "../Components/AppCompanies";
import Script from "next/script";
import { login, regiser } from "../actions";

export default function Home() {

	const [domLoaded, setDomLoaded] = useState(false);
	const [inputValueEmail, setInputValueEmail] = useState(''); 
	const [inputValuePassword, setInputValuePassword] = useState(''); 
	const [inputValueUsername, setInputValueUsername] = useState(''); 

    useEffect(() => {
    setDomLoaded(true);
  }, []);



	const handleChangeEmail = (event) => {
		setInputValueEmail(event.target.value);
	};
	const handleChangePassword = (event) => {
		setInputValuePassword(event.target.value);
	};
	const handleChangeUsername = (event) => {
		setInputValueUsername(event.target.value);
	};

	
  return (
<>
{domLoaded && (
	<html lang="en">
<head>
    <meta charSet="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>FruitHub</title>
    {/* <link rel="stylesheet" href=" "/> */}
    <link rel="shortcut icon" type="image/png" href="/assets/img/favicon.png"/>
</head>
<body>
    <img className="body__background" style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',zIndex:-1}} src="/assets/img/hero-bg.jpg" ></img>
    <header>
        {/* <div style={{display:'flex',alignItems:'center'}}>
            <img height="70px" width="70px" className="logoimg" src="/images/img/main_logo_1.png" alt=""/>
            <h2 className="logo">Questions Bank</h2>

        </div>     */}
             <marquee behavior="alternate" direction=""> 
             </marquee> 
        <nav className="navigation">
            {/* <a href="/">Home</a> */}
            <button className="btnLogin-popup">Login</button>
        </nav>
    </header>
    
    <div className="wrapper active-popup">
        <span className="icon-close">
            <ion-icon name="close"></ion-icon>
        </span>
        <div className="form-box login">
            <h2>Login</h2>
            <form>
                <div className="input-box">
                    <span className="icon"><ion-icon name="mail"></ion-icon></span>
                    <input type="email"
					value={inputValueEmail}
					onChange={handleChangeEmail}
					required/>
                    <label>Email</label>
                </div>
                <div className="input-box">
                    <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                    <input type="password"
					value={inputValuePassword}
					onChange={handleChangePassword}
					required/>
                    <label for="email">Password</label>
                </div>
                <div className="remember-forgot">
                    <a href="#">Forgot password?</a>
                </div>
                <div className="btn login" style={{display:'flex',justifyContent:'center',alignItems:'center'}} onClick={async()=>{
                    var res = await login(inputValueEmail,inputValuePassword);
                    res? alert(res.error):null;
                }}><p>Login</p></div>
                <div className="login-register">
                    <p>Don't have an account? <a className="register-link">Register</a></p>  
                </div>
            </form>
        </div>

		{/* Register */}
        <div className="form-box register">
            <h2>Resgistration</h2>
            <form id="myForm">
            <div className="input-box">
                    <span className="icon"><ion-icon name="person"></ion-icon></span>
                    <input type="text"
					value={inputValueUsername}
					onChange={handleChangeUsername}
					required/>
                    <label>Username</label>
                </div>
            <div className="input-box">
                    <span className="icon"><ion-icon name="mail"></ion-icon></span>
                    <input type="text"
					value={inputValueEmail}
					onChange={handleChangeEmail}
					required/>
                    <label>Email</label>
                </div>
                <div className="input-box">
                    <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                    <input type="password"
					value={inputValuePassword}
					onChange={handleChangePassword}
					required/>
                    <label for="email">Password</label>
                </div>



                {/* <div className="remember-forgot">
                    <label><input type="checkbox"/>I agree to the terms & conditions</label>
                </div> */}

                <div className="btn login" style={{display:'flex',justifyContent:'center',alignItems:'center'}} onClick={()=>regiser(inputValueUsername,inputValueEmail,inputValuePassword)}><p>Register</p></div>
                
                <div className="login-register">
                    <p>Already have an account? <a className="login-link">Login</a></p>
                </div>
            </form>
        </div>
    </div> 
    {/* <script src="/js/login.js"></script> */}
    {/* <script type="module" src=""></script> */}
{/* <script nomodule src=""></script> */}

<Script 
       type="module" 
    noModule
       src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
       />
<Script 
       type="module" 
    //    id="hs-script-loader" 
    //    async 
    //    defer 
       src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
       />
<Script 
       type="text/javascript" 
       id="hs-script-loader" 
       async 
       defer 
       src="/assets/js/login.js"
       />
</body>
</html>
)}
</>
  );
}
