import React, {useState} from 'react';
import jwtDecode from "jwt-decode"
import { toast } from 'react-toastify';
import Axios from 'axios';

const Produit = (props) => {

    const [product,setProduct]= useState({
        id: "",
        categorie: "",
        nom: "",
        prix: "",
        photo: ""
    })

    const fetchProduit= async id =>{
        try {
            const {id,categorie,nom,prix,photo} = await Axios.get(`http://musicshop.colassel.com/api/produits/${id}`)
                                                             .then(response=>response.data)
            setProduct({id,categorie,nom,prix,photo})
            
        } catch (error) {
            toast.error("Impossible de charger")
        }
    }
    
    

    return ( 

        <>
            <h1>Produit</h1>

        </>
        
     );
}
 





export default Produit;