import React, { useState, useEffect } from 'react'
import Produit from '../components/Produit'
import Axios from 'axios'
import { Link } from "react-router-dom"




const PanierPage = (props) => {
    const panier = window.localStorage.getItem("panier")
    console.log(panier)
    const myPanier = panier.split(",")
    console.log(myPanier)
    
    const [amount, setAmount] = useState(window.localStorage.getItem('prix'))
    const [vide, setVide] = useState(false)    

    const show = myPanier.map((id,key)=>{
        return (
            <Produit key={key} id={id}/>       
        )
    })

    const vider = () => {
        window.localStorage.setItem('panier', '')
        window.localStorage.setItem('prix', 0)
        window.location.reload();
    }

    const isZero = (prix) => {
        if(prix <= 0 ){
            setVide(true)
        }
    }

    useEffect(()=>{
        setAmount(window.localStorage.getItem('prix'))
        isZero(window.localStorage.getItem('prix'))
    },[])

    return ( 
        <>
            <div className="container">
                {(vide) ? (
                    <h1>Votre panier est vide</h1>
                ) : 
                (
                    <>
                        <h1>Mon panier</h1>
                        {show}
                        <h1>Total: {parseFloat(amount).toLocaleString()}</h1>
                    <button onClick={vider}>Vider le panier</button>
                    <button id='mailto'><a href={"mailto:colasse.la@gmail.com"}>Obtenir un devis</a></button>
                    </>
                )}
            </div>  
        </>

     );
}
 
export default PanierPage;