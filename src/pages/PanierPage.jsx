import React, { useState, useEffect } from 'react'
import Produit from '../components/Produit'
import usersAPI from '../services/usersAPI'
import Axios from 'axios'
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import usePanier from '../components/usePanier'



const PanierPage = (props) => {
    const { panier, getTotalPrice, isPanierEmpty, emptyPanier } = usePanier();
    const productsInLePanier = [];
    for (let id in panier.products) {
        productsInLePanier.push(<Produit key={id} id={id} />);
    }
    useEffect(() => {
        document.getElementById("floatingPanier").style.display = "none";
        return () => {
            document.getElementById("floatingPanier").style.display = "block";
        }
    })

    
const handleMailTo = () => {
    let mailToUrl = "mailto:colasse.la@gmail.com?subject=" + encodeURIComponent("Nouvelle commande de") + "&body=";
    let mailContent = "Bonjour, j'aimerais commander les produits suivants sur votre site MusicShop :\n\n";
    for (let id in panier.products) {
        mailContent = mailContent + "Article : " + panier.products[id].productName + "\t Prix : " + panier.products[id].price + "\t Quantité : " + panier.products[id].quantity + "\n"
    }
    mailContent = mailToUrl + encodeURIComponent(mailContent + "\nMerci,");
    toast.success("Votre commande a bien été effectuée");

    return  mailContent;
}

    return ( 
        <>
            <div className="container">
                {(isPanierEmpty()) ? (
                    <h1>Votre panier est vide</h1>
                ) : 
                (
                    <>
                        <h1>Mon panier</h1>
                            {productsInLePanier}
                            <h1>Total: {getTotalPrice()} €</h1>
                            <button onClick={emptyPanier}>Vider le panier</button>
                    <button id='mailto' input type="submit" onClick={handleMailTo}>Commander</button>
                    </>
                )}
            </div>  
        </>

     );
}

export default PanierPage;