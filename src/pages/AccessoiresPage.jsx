import React, {useState, useEffect} from 'react'
import produitsAPI from "../services/produitsAPI"
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'



const HomePage = (props) => {

    const [produits, setProduits] = useState([])
    
    const fetchProduits = async () => {
        try{
            const data = await produitsAPI.findBy("Accessoires")
            setProduits(data)
        }catch(error){
           toast.error("Impossible de charger les données")
        }
    }

    
    useEffect(()=>{
        fetchProduits()
    }, []);

    return (
        <>

        <div className="content">
            <div className="container">
                <h1 className="categorieTitle">Nos accessoires</h1>
                {produits.map(produit =>
                    <Link key={produit.id} to={`/produit/${produit.id}`} className="produitCard">
                        <div className="imgCard">
                            <img src={"http://musicshop.colassel.com/uploads/"+produit.photo} alt={produit.nom}/>
                        </div>
                        <div className="textCard">
                            <span className="nomProdCard">{produit.nom}</span>
                            <span className="prixProdCard">{produit.prix} &euro;</span>
                        </div>
                    </Link>
                )}
            </div>
        </div>

        </>
    )
    
}

export default HomePage;