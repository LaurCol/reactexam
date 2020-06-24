import React, { useState } from 'react';
import PrivateRoute from './components/PrivateRoute'
import AuthContext from './contexts/AuthContext'
import authAPI from './services/authAPI'
import './App.css';
import { HashRouter, Switch, Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import InstrumentsPage from './pages/InstrumentsPage'
import DisquesPage from './pages/DisquesPage'
import AccessoiresPage from './pages/AccessoiresPage'
import VinylesPage from './pages/VinylesPage'
import InscriptionPage from './pages/InscriptionPage'
import ProduitPage from './pages/ProduitPage'
import ChangemdpPage from './pages/ChangemdpPage'
import ChangePage from './pages/ChangePage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PanierPage from './pages/PanierPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Header from './components/Header'
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
    <Header/>
    <Navbar/>
    <Switch>
    <Route path="/login" component={LoginPage}/>
    <Route path="/signin" component={InscriptionPage}/>
    <Route path="/instruments" component={InstrumentsPage} />
    <Route path="/disques" component={DisquesPage} />
    <Route path="/vinyles" component={VinylesPage} />
    <Route path="/accessoires" component={AccessoiresPage} />
    <Route path="/produit/:id" component={ProduitPage} />
    <PrivateRoute path="/changemdp" component={ChangemdpPage} />
    <PrivateRoute path="/change" component={ChangePage} />
    <PrivateRoute path="/panier" component={PanierPage} />
    <Route path="/" component={HomePage} />
    </Switch>
    <Footer/>
    </HashRouter>
    <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
    </AuthContext.Provider>
</>  );
}

export default App;