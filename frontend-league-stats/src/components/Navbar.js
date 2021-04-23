import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className='league-stats-navbar'>
            <nav className='league-stats-navbar-top'>

            </nav>
            <nav className='league-stats-navbar-bottom'>
                <NavLink
                    className='league-stats-navbar-item'
                    activeClassName='league-stats-navbar-item-active'
                    exact to='/'
                >Home</NavLink>
                <NavLink
                    className='league-stats-navbar-item'
                    activeClassName='league-stats-navbar-item-active'
                    to='/champion-rotation'
                >Champion Rotation</NavLink>
                <NavLink
                    className='league-stats-navbar-item'
                    activeClassName='league-stats-navbar-item-active'
                    to='/leaderboard'
                >Leaderboard</NavLink>
            </nav>
        </div>
    );
}

export default NavBar;
