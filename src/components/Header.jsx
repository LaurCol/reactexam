import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import authAPI from '../services/authAPI'
import { toast } from 'react-toastify'

const Header = (props) => {

const {isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useContext(AuthContext)

const handleLogout = () => {
authAPI.logout()
setIsAuthenticated(false)
setIsAdmin(false)
toast.info("Vous êtes déconnecté")

}

return (
    <>
    <div class="header">
        <img src="http://musicshop.colassel.com/banniere.png" alt="bannière du site"/>
        <h1>MusicShop</h1>
    </div>

    </>
);
}

export default Header;