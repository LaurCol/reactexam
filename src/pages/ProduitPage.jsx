import React, { useEffect, useState, useContext } from 'react'
import produitsAPI from '../services/produitsAPI'
import moment from 'moment'
import { toast } from 'react-toastify'
import { Link } from "react-router-dom"
import AuthContext from '../contexts/AuthContext'
import ShowComment from '../components/ShowComment'
import Comments from '../components/Comments';
import { LoremIpsum } from "lorem-ipsum";
import ReactPlayer from 'react-player/youtube'
import usePanier from "../components/usePanier"

const ProduitPage = (props) => {

        const {isAuthenticated } = useContext(AuthContext)

    const [acheter, setAcheter] = useState(true)
    const { addProduct, isProductPresent } = usePanier();
    const id = props.match.params.id
    const nom = props.match.params.nom
        const [produit, setProduit] = useState({
            nom:"",
            prix:"",
            photo:"",
            commentaires:"",
            note:"",
            video:""
        })
    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
            max: 8,
            min: 4
        },
        wordsPerSentence: {
            max: 16,
            min: 4
        }
    });
    const buyButtonLabel = isProductPresent(id) ? "Modifier" : "Ajouter";

        function renderOptionsElements() {
            const selectElement = [];
            for (let i = 1; i <= 10; ++i) {
               selectElement.push(<option value={i} >{i}</option>)
            }

            return selectElement;
        }

        const fetchProduit = async id => {
            try{
                const data = await produitsAPI.find(id)
                setProduit(data)
            }catch(error){
               toast.error("Impossible de charger le produit")
            }
        }
        
        useEffect(()=>{
                fetchProduit(id)
        },[])

    
        const formatDate = (str) => moment(str).format('DD/MM/YYYY')
    
        const comments = Object.keys(produit.commentaires).map(key => {
            return (
                <ShowComment key={key} commentaire={produit.commentaires[key]} />
            )
        })

    return (
        <>
    
    <div className="content">
        <div className="container">
            <h1>Produit : {produit.nom}</h1>
            <div className="infoProduit">
                <div className="coverImg">
                    <img src={"http://musicshop.colassel.com/uploads/"+produit.photo} alt="photo de {produit.nom}"/>
                </div>
                <div className="info">
                    <h3>Prix : {produit.prix} €</h3>
    <h3>Description : <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div></h3>
                            {(acheter) ? (
                                <><button onClick={() => addProduct(produit.id, produit.nom, document.getElementById("productQuantity").value, produit.prix)}>{buyButtonLabel}</button>
                                    <select id="productQuantity">{renderOptionsElements()}</select>
                                    </>

                    ) : 
                    (
                        <div id="ajoute">Ajouté</div>
                    )
                    }
                </div>
                
            </div>
            
            {(produit.video != "") ? (
                <ReactPlayer url={produit.video} />
            ) : (
               <></> 
            )}

            <div className="row align-items-center">
                     <h2 className="mb-3">Commentaires</h2>
                       {( produit.commentaires.length  > 0) ? (
              <>
              
            {comments}
           </> ): (
           <> 
           
           <h3>Cet article n'a pas encore reçu de commentaire ...</h3>
           
           </> )}
           {(isAuthenticated) ?
           ( <> <Comments id={id} /> </>) : ( 
           <> 

         <div className="error-message"> Vous devez vous connecter pour pouvoir commenter</div> 
         <br/>
       <div className="conn"><Link to="/login">Se connecter</Link></div>

           </>

           )     }


            </div>
        </div>
    </div>

        </>

    );

}

export default ProduitPage;