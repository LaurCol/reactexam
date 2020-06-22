import React, { useState } from 'react'
import Produit from '../components/Produit'
import Axios from 'axios'



const PanierPage = (props) => {
    const panier = window.localStorage.getItem("panier")
    console.log(panier)
    const myPanier = panier.split(",")
    console.log(myPanier)
    
    

    const show = myPanier.map((id,key)=>{
        return (
            <Produit key={key} id={id}/>
            
        )
    })



    return ( 
        <>
            <div className="container">
                <h1>Mon panier</h1>
                {show}
            </div>

            
        </>

     );
}
 
export default PanierPage;