import React from 'react';
import './Navbar.css';

function Navbar(){
    
    return (
        <div className="navbar-wrapper">
            <nav>
                <ul>
                    <li className="nav-title">Budget Manager</li>
                    <li><a href="/">Home</a></li>
                    <li><a href="budget-creator">Create Budget</a></li>
                    <li><a href="create-an-account">Signup</a></li>
                </ul>
            </nav>
        </div>
    )
};

export default Navbar;