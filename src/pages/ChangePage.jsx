import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom"
import Field from '../components/forms/Field'
import usersAPI from '../services/usersAPI'
import { toast } from 'react-toastify'
import jwtDecode from "jwt-decode"

const ChangePage = ({history}) => {

    const token = window.localStorage.getItem("authToken")
    const jwtData = jwtDecode(token)
    var id= jwtData.id

    const [user, setUser] = useState({
    
        email: "",

    })
    
    const [errors, setErrors ] = useState({

        email: "",
     
    })

    const fetchUser = async id => {
        try{
           const {email} = await usersAPI.find(id)
           setUser({email})
        }catch(error){
            // notif
         //   history.replace("/") 
          toast.error("Une erreur est survenue !")
        }
    }

    useEffect(()=>{
        fetchUser(id)
    },[id])


    const handleChange = (event) => {
        //const value = event.currentTarget.value 
        //const name = event.currentTarget.name
        const {name, value} = event.currentTarget
        setUser({...user, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const apiErrors = {}
       
        //console.log(user)
        try{
            await usersAPI.update(id, user)
            toast.success("Votre profil a bien été modifié")
            history.replace("/") // redirection
        }catch({response}){
            //console.log(response)
            const {violations} = response.data
            //console.log(violations)
            if(violations){
                const apiErrors = {}
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
            }
        }

    }

    return ( 
        <>
        <div className="container">
            <h1>Modification de l'utilisateur</h1>  <Link to="/changemdp" className="btn btn-primary mt-4 mb-4">Modification du mot de passe</Link>    
            
            <form onSubmit={handleSubmit}>
               
            <Field 
                name="email"
                label="Adresse e-mail"
                placeholder="Adresse e-mail"
                type="email"
                value={user.email}
                onChange={handleChange}
                error={errors.email}
            />
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Enregistrer</button>
                    <Link to="/" className="btn btn-primary ml-5">Retour aux clients</Link>
                </div>
            </form>
           
            </div>
        
        </>
     );
}


 export default ChangePage;