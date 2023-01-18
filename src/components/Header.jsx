import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css";
import { getToken } from '../utils/apiFacade.js';


function Header({setErrorMsg, user, setUser}) {


    return (
        <nav className="topnav">
            <NavLink className="active" to="/"><i className="fa fa-fw fa-home"></i> Home</NavLink>
            <NavLink to="/search"><i className="fa fa-fw fa-search"></i> Search</NavLink>
            <NavLink to="/deployTest"><i className="fa fa-fw fa-envelope"/> Deploy</NavLink>
            {user.roles.includes("user") ? 
                <NavLink to="/matches"><i className="fa fa-fw fa-envelope"/> Matches </NavLink> : null}

            {user.roles.includes("player") ? 
                <NavLink to="/yourmatches"><i className="fa fa-fw fa-envelope"/> Your Matches </NavLink> : null}

            {user.roles.includes("admin") ? 
                <NavLink to="/crud"><i className="fa fa-fw fa-envelope"/> Create Match </NavLink> : null}
            {user.roles.includes("admin") ? 
                <NavLink to="/createplayer"><i className="fa fa-fw fa-envelope"/> Create Player </NavLink> : null}
                {user.roles.includes("admin") ? 
                <NavLink to="/createlocation"><i className="fa fa-fw fa-envelope"/> Create Location </NavLink> : null}

            {!getToken() ? //hvis man ikke er logget ind, så skal den i login komponent ellers ned i LoggedIn
                <Login setUser={setUser} setErrorMsg={setErrorMsg}/> :
                <LoggedIn user={user} setUser={setUser}/>
            }
        </nav>

    );
}

export default Header;
