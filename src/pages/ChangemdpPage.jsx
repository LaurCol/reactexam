import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom"
import Field from '../components/forms/Field'
import usersAPI from '../services/usersAPI'
import { toast } from 'react-toastify'
import jwtDecode from "jwt-decode"

const ChangemdpPage = ({history}) => {

    const token = window.localStorage.getItem("authToken")
    const jwtData = jwtDecode(token)
    var id= jwtData.id

    const [user, setUser] = useState({
        password:"",
     
        confirmPassword:''

    })
    
    const [errors, setErrors ] = useState({
        password:"",
       
        confirmPassword:''
    })

   



    const handleChange = (event) => {
        //const value = event.currentTarget.value 
        //const name = event.currentTarget.name
        const {name, value} = event.currentTarget
        setUser({...user, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const apiErrors = {}
        if(user.password !== user.confirmPassword){
            apiErrors.confirmPassword="Votre mot de passe ne correspond pas"
            setErrors(apiErrors)
            return
        }
        //console.log(user)
        try{
            await usersAPI.update(id, user)
            toast.success("Votre mot de passe a bien été modifié")
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
            <h1>Modification du mot de passe</h1>
                    <form onSubmit={handleSubmit}>
                    
                
                        <Field 
                            name="password"
                            label="Mot de passe"
                            type="password"
                            placeholder="Nouveau mot de passe"
                            value={user.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <Field 
                            name="confirmPassword"
                            label="Confirmation du mot de passe"
                            type="password"
                            placeholder="Confirmation du mot de passe"
                            value={user.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                        />
                        <div className="form-group">
                            <button type="submit" className="btn btn-success">Enregistrer</button>
                            <Link to="/" className="btn btn-secondary">Retour aux clients</Link>
                        </div>
                    </form>
                
            </div>
        </>
     );
}


 export default ChangemdpPage;