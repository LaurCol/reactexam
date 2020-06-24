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

const ProduitPage = (props) => {

        const {isAuthenticated } = useContext(AuthContext)

        const [acheter, setAcheter] = useState(true)

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

        var {id} = props.match.params
        const [produit, setProduit] = useState({
            nom:"",
            prix:"",
            photo:"",
            commentaires:"",
            note:"",
            video:""
        })


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

        const pushToPanier=(id,prix)=>{
            let data = window.localStorage.getItem("panier")
            data = data ? data.split(",") : []
            data.push(id)
            let myPrix = window.localStorage.getItem("prix")
            let total = (myPrix) ? parseFloat(myPrix) + parseFloat(prix) : parseFloat(prix)
          
            window.localStorage.setItem("panier", data.toString())
            window.localStorage.setItem("prix", total)
            setAcheter(false)
        }

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
    <h3>Description : <div>{lorem.generateSentences(5)}</div></h3>
                    {(acheter) ? (
                        <button onClick={()=>pushToPanier(produit.id,produit.prix)}>Ajouter</button>

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