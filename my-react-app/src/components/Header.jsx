import React from "react";
import {Link} from "react-router-dom";
import './header.css';

const Header = () => {

    return (
        <nav className="navigation-bar">
            <ul>
                <li><Link className='link' to="/">Home</Link></li>
                <li><Link className='link' to="/classes">Classes</Link></li>
                <li><Link className='link' to="/materials">Materials</Link></li>
                <li><Link className='link' to="/contact">Contact</Link></li>
                <li><Link className='link' to="/profile">Profile</Link></li>
            </ul>
        </nav>
    );
};
 
export default Header;