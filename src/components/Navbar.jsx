import React, { useContext, useRef, useEffect, useState } from 'react'
import authAPI from '../services/authAPI'
import {NavLink} from "react-router-dom"
import AuthContext from '../contexts/AuthContext'
import { toast } from 'react-toastify'




const Navbar = (props) => {

    const {isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useContext(AuthContext)

  const [isActive, setActive] = useState("false");
  const handleToggleNav = () => {
      setActive(!isActive);
    };
    useEffect(() => {
    });

    const handleLogout = () => {
      authAPI.logout()
      setIsAuthenticated(false)
      setIsAdmin(false)
      toast.info("Vous êtes déconnecté")
  }




    return (

      <>
            <nav className={isActive ? "" : "hidden"} id="nav">
                <div className="title"><button onClick={handleToggleNav}>Menu</button></div>
    <div className="nav-menu">
        <button className="nav-item"><NavLink to="/produits"><h3>Tous les produits</h3></NavLink></button>
        <button className="nav-item"><NavLink to="/produits/Instruments"><h3>Instruments</h3></NavLink></button>
        <button className="nav-item"><NavLink to="/produits/Accessoires"><h3>Accessoires</h3></NavLink></button>
        <button className="nav-item"><NavLink to="/produits/CD"><h3>CD</h3></NavLink></button>
        <button className="nav-item"><NavLink to="/produits/Vinyles"><h3>Vinyles</h3></NavLink></button>
        <button className="nav-item"><NavLink to="/panier/"><h3>Panier</h3></NavLink></button>
    </div>
    <div className="account">
    {(isAuthenticated) ? (
           
             
           <>
        <button id="navbar-button"><h1>Bienvenue</h1></button>
        <div id="navbar-menu">
            <ul>
                <li><button><NavLink to="/" onClick={handleLogout}>Déconnexion</NavLink></button></li>
                {(isAdmin) && (
                <>
                    <li><button><a href="http://musicshop.colassel.com/admin">Administration</a></button></li>
                </>
                )}
                <li><button><NavLink to="/change">Mon compte</NavLink></button></li>
            </ul>
        </div>
          </>
    ) : (
        <>
        <button id="navbar-button"><h1>Connexion</h1></button>
        <div id="navbar-menu">
            <ul>
                <li><button><NavLink to="/signin">Inscription</NavLink></button></li>
                <li><button><NavLink to="/login">Connexion</NavLink></button></li>
            </ul>
        </div>
        </>
    )}
    </div>
</nav>
</>

    );

}


export default Navbar;

