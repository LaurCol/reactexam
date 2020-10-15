import React, {useState, useEffect} from 'react';
import jwtDecode from "jwt-decode"
import { toast } from 'react-toastify';
import Axios from 'axios';
import usePanier from "./usePanier";


const Produit = (props) => {

    const { removeProduct, changeQuantityfromSelect, panier } = usePanier();
    const [product,setProduct]= useState({
        id: props.id,
        categorie: "",
        nom: "",
        prix: "",
        photo: ""
    })
    

    const fetchProduit= async id =>{
        try {
            const {categorie,nom,prix,photo} = await Axios.get(`http://musicshop.colassel.com/api/produits/${id}`)
                                                             .then(response=>response.data)
            setProduct({id,categorie,nom,prix,photo})
            
        } catch (error) {
            toast.error("Impossible de charger")
            console.log(error)
        }
    }

    function renderOptionsElements() {
        const selectElement = [];
        for (let i = 0; i <= 10; ++i) {
            selectElement.push(<option value={i} >{i}</option>)
        }

        return selectElement;
    }

   useEffect(()=>{
       fetchProduit(props.id)
       
   },[])
    
    const handleClick = () => {
        
    }
    

    return ( 

        <>
                <>
                <div>
                    <h1>Produit: {product.nom}</h1>
                    <h1>Prix: {parseFloat(product.prix).toLocaleString()}</h1>
                    <select onChange={(e) => changeQuantityfromSelect(e.target.value, product.id)} value={panier.products[props.id].quantity}>{renderOptionsElements()}</select>
                    <button class="panierPageSuppr" onClick={() => removeProduct(product.id) }>Supprimer</button>
                </div>
                </>
            
            

        </>
        
     );
}
 





export default Produit;