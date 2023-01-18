import React, {useEffect, useState} from "react";
import { initialState } from "../App.jsx";
import facade from "../utils/apiFacade.js";

export default function LoggedIn({user,setUser}) {

    const logout = () => {
        facade.removeToken() //removetoken replacing logout
        setUser(initialState) //initialstate er import fra App component
        
    }

    return (            
        <div className="login-container">
            {user.isLoggedIn && <span>Hi, {user["email"]}! 
            {user["roles"].includes("admin") && <span className="badge bg-dark">Admin</span>}
            {user["roles"].includes("player") && <span className="badge bg-dark">Player</span>}
            {user["roles"].includes("user") && <span className="badge bg-dark">User</span>}
            </span>} 
            <button onClick={logout}>Logout</button>
        </div>
    )

}
