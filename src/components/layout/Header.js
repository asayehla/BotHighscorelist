import React from 'react';
import logo from '../../img/bobby-logo-header.svg';


function Header() {
    return (
        <header className="App-header">
            
            <img src={logo} className='logo' alt='logo'/>
            <h1>
                Bobbybots score board
            </h1>
        </header>
    )
};


export default Header;