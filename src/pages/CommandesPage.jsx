import React, {useState, useEffect} from 'react'
import commandesAPI from '../services/commandesAPI'
import moment from 'moment'
import { toast } from 'react-toastify'
import { NavLink } from "react-router-dom"

const CommandesPage = (props) => {

        var {id} = props.commande.params
        const [commande, setCommande] = useState({
            produit: ""
        })

        const fetchCommande = async id => {
            try{
                const data = await commandesAPI.find(id)
                setCommande(data)
             
            
            }catch(error){
               toast.error("Impossible de charger le produit")
            }
        }
        
        useEffect(()=>{
                fetchCommande(id)
            
        },[id])
    
        const formatDate = (str) => moment(str).format('DD/MM/YYYY')


    return (
<>
    
        <h1>Commande {commande.id}</h1>
        
        <div class="content">
            <div class="container">
                <div class="commande">
                    <h1>Commande {commande.id}</h1>
                    <table cellspacing="0" className="commandeTable">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Nom</th>
                                <th>Prix</th>
                                <th>Quantité</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        {commande.map(commande =>
                                <tr key={commande.id}>
                                    <td className="commandePhoto"><img src={"http://musicshop.colassel.com/uploads/"+produit.photo} alt="photo de {item.produit.nom}"/></td>
                                    <td>{commande.produit.nom}</td>
                                    <td>{commande.produit.prix} &euro;</td>
                                    <td>{commande.quantite}</td>
                                    <td>{commande.quantite * commande.produit.prix} &euro;</td>
                                </tr>
                                )}
                        </tbody>
                        <tfoot>
                            <tr className="total">
                                <td colspan="3">Total :</td>
                                <td>{commande.total} €</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        </>
    )

}
export default CommandesPage;