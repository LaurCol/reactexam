import React, { useContext, useRef, useEffect } from 'react'
import authAPI from '../services/authAPI'
import {NavLink} from "react-router-dom"
import AuthContext from '../contexts/AuthContext'
import { toast } from 'react-toastify'




const Navbar = (props) => {

    const navHider = useRef(null)
    const nav = useRef(null)


    const {isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useContext(AuthContext)

    useEffect(()=>{
        const myNav = nav.current
        const button = navHider.current
        button.addEventListener("click", ()=> {
            myNav.classList.toggle("hidden")
            button.classList.toggle("hidden")
        })
    })

    const handleLogout = () => {
      authAPI.logout()
      setIsAuthenticated(false)
      setIsAdmin(false)
      toast.info("Vous êtes déconnecté")
  }

    return (

      <>
<nav ref={nav} id="nav">
    <div className="title"><button><NavLink to="/">MusicShop</NavLink></button></div>
    <div className="nav-menu">
        <button className="nav-item"><NavLink to="/instruments"><h3>Instruments</h3></NavLink></button>
        <button className="nav-item"><NavLink to="/accessoires"><h3>Accessoires</h3></NavLink></button>
        <button className="nav-item"><NavLink to="/disques"><h3>CD</h3></NavLink></button>
        <button className="nav-item"><NavLink to="/vinyles"><h3>Vinyles</h3></NavLink></button>
        <button className="nav-item"><NavLink to="/"><h3>Tous les produits</h3></NavLink></button>
        <button className="nav-item"><NavLink to="/panier"><h3>Panier</h3></NavLink></button>
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
<button ref={navHider} id="nav-hider"><i className="fas fa-chevron-left"></i></button>
</>

    );

}


export default Navbar;

