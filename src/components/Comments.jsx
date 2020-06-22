import React, {useState} from 'react';
import moment from 'moment'
import jwtDecode from "jwt-decode"
import { toast } from 'react-toastify';
import Axios from 'axios';



const Comments = (props) => {

    const token = window.localStorage.getItem("authToken")
    const jwtData = jwtDecode(token)
    var myid= jwtData.id

    const [postComment, setPostComment] = useState({
        message:'',
        user:`/api/users/${myid}`,
        note:1,
        date:'',
        produit: `/api/produits/${props.id}`
    })

    const [errors, setErrors] = useState({
        message:'',
        user:'',
        note:'',
        date:'',
        produit:''
    })
    

    const handleChange = (event) => {
        const {name, value} = event.currentTarget
        setPostComment({...postComment, [name]: value})    
    }

    const handleSubmit = async (event) => {
       
        event.preventDefault()
        const newComment = {
            message:postComment.message,
            user:`/api/users/${myid}`,
            note:parseFloat(postComment.note),
            date:`${moment().format()}`,
            produit: `/api/produits/${props.id}`    
        }

       try{
           await Axios.post('http://musicshop.colassel.com/api/commentaires', newComment)
           toast.success('Votre commentaire a bien été envoyé')
           
       }catch({response}){
           const apiErrors = {}
          const {violations} = response.data
          if(violations){
            violations.forEach(({propertyPath, message}) => {
                apiErrors[propertyPath] = message
            })
            setErrors(apiErrors)
          }
       //   toast.error('Des erreurs dans votre commentaire')
       console.log(response)
    }

    
    }


    return ( 
        <>
        <div class="container">
            <h1>Commenter l'article</h1>
            <form onSubmit={handleSubmit}>
            <select name="note" id="note" value={postComment.note} onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
            </select>
            <textarea id="message" name="message" value={postComment.message} onChange={handleChange}/>
            <div><button type="submit" className="btn btn-success">Envoyer</button></div>
            
            </form>
            </div>
        </>
     );
}
 
export default Comments;