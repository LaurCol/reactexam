import Axios from "axios"

function findAll(){
    return Axios.get("http://musicshop.colassel.com/api/commentaires")
                .then(response => response.data['hydra:member'])
}

function find(id){
    return Axios.get(`http://musicshop.colassel.com/api/commentaires/${id}`)
                .then(response => response.data)
}


export default {
    findAll: findAll,
    find: find
}