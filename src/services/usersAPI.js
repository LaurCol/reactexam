import Axios from "axios"

function findAll(){
    return Axios.get("http://musicshop.colassel.com/api/users")
                .then(response => response.data['hydra:member'])
}

function find(id){
    return Axios.get(`http://musicshop.colassel.com/api/users/${id}`)
                .then(response => response.data)
}

function updateUser(id, user){
    return Axios.put(`http://musicshop.colassel.com/api/users/${id}`, user)
}

export default {
    findAll: findAll,
    find: find,
    update: updateUser
}