import Axios from "axios"
import jwtDecode from "jwt-decode"


function logout(){
    window.localStorage.removeItem("authToken")
    delete Axios.defaults.headers['Authorization']
}


function authenticate(credentials){
    return Axios
            .post("http://musicshop.colassel.com/api/login_check", credentials)
            .then(response => response.data.token)
            .then(token => {
                // utilisation du localstorage pour stocker notre token
                window.localStorage.setItem("authToken", token)
                window.localStorage.setItem("panier", [])
                window.localStorage.setItem("prix", [])
                // on prévient axios qu'on a un header par défaut sur toutes nos futures requêtes HTTP
                Axios.defaults.headers["Authorization"]="Bearer " + token

                return token
            })
}

function setup(){
    // voir si on a un token
    const token = window.localStorage.getItem("authToken") // si pas de token, il va renvoyer false ou null (donnée falsy, inverse c'est truthy)

    if(token){
        // si le token existe et s'il est encore valide
        const jwtData = jwtDecode(token)
        // jwtDecode décode le token et on par exemple accès à la variable d'expiration

        // millisecondes vs  secondes
        if((jwtData.exp * 1000) > new Date().getTime()){
            Axios.defaults.headers["Authorization"]="Bearer " + token
        }

    }

}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken")
    if(token){
        const jwtData = jwtDecode(token)
        if((jwtData.exp * 1000) > new Date().getTime()){
           return true
        }
        return false // token expiré
    }
    return false // pas de token
}


function isAdmin(){
    const token = window.localStorage.getItem("authToken")

    if(token){

        const data = jwtDecode(token)
        for(var role of data.roles){
            if(role === 'ROLE_ADMIN'){

                return true


            }
        }
        return false // token expiré
    }
    return false // pas de token


}


export default {
    authenticate: authenticate,
    logout: logout,
    setup: setup,
    isAuthenticated: isAuthenticated,
    isAdmin: isAdmin
}