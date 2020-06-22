import Axios from "axios"

function findAll(){
    return Axios.get("http://musicshop.colassel.com/api/users")
                .then(response => response.data['hydra:member'])
}

function find(id){
    return Axios.get(`http://musicshop.colassel.com/api/users/${id}`)
                .then(response => response.data)
}


export default {
    findAll: findAll,
    find: find
}