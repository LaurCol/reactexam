import React, { useState } from 'react';
import PrivateRoute from './components/PrivateRoute'
import AuthContext from './contexts/AuthContext'
import authAPI from './services/authAPI'
import './App.css';
import { HashRouter, Switch, Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import InscriptionPage from './pages/InscriptionPage'
import ProduitPage from './pages/ProduitPage'
import ChangemdpPage from './pages/ChangemdpPage'
import ChangePage from './pages/ChangePage'
import LoginPage from './pages/LoginPage'
import PanierPage from './pages/PanierPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Header from './components/Header'
import Produits from './components/Produits'
import Panier from './components/Panier'
import { PanierContextProvider } from "./components/PanierContext"
import 'react-toastify/dist/ReactToastify.css'

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated())
  const [isAdmin, setIsAdmin] = useState(authAPI.isAdmin())


    // on donne les informations à la forme de notre context
    const contextValue = {
      isAuthenticated: isAuthenticated,
      setIsAuthenticated : setIsAuthenticated,
      isAdmin : isAdmin,
      setIsAdmin : setIsAdmin
    }
  return (
    <>
    <AuthContext.Provider value={contextValue}>
        <HashRouter>
            <PanierContextProvider>
            <Header/>
            <Navbar/>
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <Route path="/signin" component={InscriptionPage} />
                <PrivateRoute path="/changemdp" component={ChangemdpPage} />
                <PrivateRoute path="/change" component={ChangePage} />
                <PrivateRoute path="/panier" component={PanierPage} />
                <Route path="/produits/:category" component={Produits} />
                <Route path="/produit/:id" component={ProduitPage} />
                <Route path="/" component={Produits} />
            </Switch>
            <Panier />
            <Footer />
            </PanierContextProvider>
        </HashRouter>
    <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </AuthContext.Provider>
</>  );
}

export default App;