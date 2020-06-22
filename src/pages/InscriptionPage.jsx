import React, { useState } from 'react'
import Field from '../components/forms/Field';
import Axios from "axios"

const InscriptionPage = ({history}) => {

    const [user, setUser] = useState({
       email: "",
       password: "",
    })

    const [errors, setErrors] = useState({
       email: "",
       password: "",
    })

    // Gestion des changements des inputs dans le formulaire
    const handleChange = (event) => {
        const {name, value} = event.currentTarget
        setUser({...user, [name]: value})
    }

    // gestion de la soumission du formulaire 
    const handleSubmit = async (event) => {
        event.preventDefault()
        //console.log(user)
        const apiErrors= {}
        try{
            await Axios.post("http://musicshop.colassel.com/api/users", user)
            setErrors({})
            history.replace("/")
        }catch({response}){
            const {violations} = response.data
            if(violations){
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
            }
        }
    }

    return ( 
        <>
<div className="slide">
    <div className="container">
         
    <div className="col-md-6 offset-md-3 mt-5">
        <div className="card-register  mt-5">
            <div className="card-header">
                <h4 className="card-title">
                    Inscription
                </h4>
            </div>
            <div className="card-body">
            <form onSubmit={handleSubmit}>
                <Field 
                    name="email"
                    label="Adresse E-mail"
                    type="email"
                    placeholder="Votre adresse e-mail"
                    error={errors.email}
                    value={user.email}
                    onChange={handleChange}
                />
                <Field 
                    name="password"
                    label="Mot de passe"
                    type="password"
                    placeholder="Votre mot de passe"
                    error={errors.password}
                    value={user.password}
                    onChange={handleChange}
                />
               
                 <div className="form-group">
                    <button type="submit" className="btn btn-success mr-2">Confirmation</button>
                </div>
            </form>
            </div>
            </div>
          
	    </div>
    </div>
</div>
        </>
     );
}
 
export default InscriptionPage;




    