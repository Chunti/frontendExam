import React, { useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Contact from "./pages/Contact.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import CRUD from "./pages/CRUD";
import Header from "./components/Header.jsx";
import DeployPage from "./components/Deploy.jsx";
import Matches from "./components/Matches.jsx";
import PlayerMatches from "./components/PlayerMatches.jsx";
import CreatePlayer from "./pages/CreatePlayer";
import CreateLocation from "./pages/CreateLocation";

import { useEffect } from "react";
import {
  getToken,
  verifyToken,
  decodeToken,
  removeToken,
  setToken,
} from "./utils/apiFacade";

export const initialState = {
  email: null,
  roles: [],
  isLoggedIn: false,
};

export function updateUser(token, setUser) {
  const payload = decodeToken(token); //console.log(payload);
  setUser({
    email: payload["email"],
    roles: payload["roles"],
    isLoggedIn: true,
  });
}

export function jsonToSession(json, setSession) {
  const payload = decodeToken(json.token); //console.log(payload);
  const user = json.user; console.log(user);
  setSession({
    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      isLoggedIn: true,
    },
    expires: payload["exp"],
  });
}



function App(props) {
  const [user, setUser] = useState(initialState);

  //denne function reruns everytime page is refreshed
  // bemærk denne function er async, fordi verifyToken function return a promise.
  // and async await unpacks that promise
  async function checkToken(token) {
    console.log("Checking token");
    if ((token = await verifyToken(token))) {
      setToken(token);
      updateUser(token, setUser);
    } else {
      console.log("Session expired");
      alert("Your session has expired. Please log in again.");
      removeToken();
    }
  }

  useEffect(() => {
    if (getToken()) {
      (async () => {
        await checkToken(getToken());
      })(); //< async anonymous function is being called right away ()
      setTimeout(async () => {
        await checkToken(getToken());
      }, 1000 * 60 * 30);
    }
  }, []);

  const obj = {
    name: "TestName",
    street: "TestStreet",
    town: "TestTown",
    country: "TestCountry",
  };

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Routes>
       
        {!getToken() ? (
          <>
          <Route path="/" element={<LandingPage user={user} />} /> 
          </>
        ) : 
        ( 
        <>
          <Route path="/" element={<Home user={user} />} />
          {user.roles.includes("admin") && 
            <Route path="/crud" element={<CRUD />} />
          }
          {user.roles.includes("admin") && 
            <Route path="/createplayer" element={<CreatePlayer />} /> 
          }
          {user.roles.includes("admin") && 
            <Route path="/createlocation" element={<CreateLocation />} />
          }


            
          {user.roles.includes("user") && 
            <Route path="/matches" element={<Matches />} />
          }
          {user.roles.includes("player") && 
            <Route path="/yourmatches" element={<PlayerMatches />} />
          }
        </>
        )}
        <Route path="/search" element={<Search />} />
        <Route path="/deployTest" element={<DeployPage/>} />
        <Route path="/contact" element={<Contact address={obj} />} />
        
        <Route path="*" element={<h1>Page Not Found !!!!</h1>} />
      </Routes>
    </>
  );
}

export default App;
