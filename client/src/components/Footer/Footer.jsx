import React from "react";
import "./Footer.scss";
import { logoutUser } from "../../services/api";


const Footer = () => {

    const logout = async(event) => {
        event.preventDefault();
        
        try {
            const response = await logoutUser()
            const result = await response.json();
  
            console.log(result.message)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <footer className="footer flex-container">
            <div className="content-container">
                <p><a href="/about">About</a></p>
                <p><a href="/about">Privacy</a></p>
                <p onClick={logout}>Log out</p>
            </div>
            <div className="right content-container"
                onClick={() => window.location.href = 'mailto:andrey2004112@gmail.com'}>
                <img className="mail"
                src="/mail.png"
                loading="lazy" 
                alt={'Mail'} 
                /> 
            </div>

        </footer>
    );
};

export default Footer;
