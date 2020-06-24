import React, {useState, useEffect} from 'react';
import jwtDecode from "jwt-decode"
import { toast } from 'react-toastify';
import Axios from 'axios';


const Produit = (props) => {

    const [show, setShow] = useState(true)

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

   useEffect(()=>{
        fetchProduit(props.id)
   },[])
    
    const handleClick = () => {
        let data = window.localStorage.getItem("panier")
        data = data ? data.split(",") : []
        let filtered = data.filter(item => item !== props.id)
        //let filtered = data.splice((props.nb),1)
        console.log(filtered)
        window.localStorage.setItem("panier", filtered.toString())
        setShow(false)
        let myPrix = window.localStorage.getItem("prix")
        let total = (myPrix) ? parseFloat(myPrix) - parseFloat(product.prix) : 0
        window.localStorage.setItem("prix", total)
        window.location.reload();
    }
    

    return ( 

        <>
            {(show) && (
                <>
                <div>
                    <h1>Produit: {product.nom}</h1>
                    <h1>Prix: {parseFloat(product.prix).toLocaleString()}</h1>
                    <button onClick={handleClick}>Annuler</button>
                </div>
                </>
            )}
            

        </>
        
     );
}
 





export default Produit;