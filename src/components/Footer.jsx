import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import authAPI from '../services/authAPI'
import { toast } from 'react-toastify'

const Footer = (props) => {

const {isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useContext(AuthContext)

const handleLogout = () => {
authAPI.logout()
setIsAuthenticated(false)
setIsAdmin(false)
toast.info("Vous êtes déconnecté")

}


return (

<>

<footer>
    <p>Copyright &copy; MusicShop - @Colasse Laurent 2020</p>
    <p>Rue de Laeken 10, Bruxelles - 012/345678</p>
    <p>REALISE DANS LE CADRE D UN EXAM - AUCUN BUT COMMERCIAL</p>
</footer>
</>
);

}

export default Footer;