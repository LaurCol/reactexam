import Axios from "axios"

function findAll(){
    return Axios.get("http://musicshop.colassel.com/api/produits")
                .then(response => response.data['hydra:member'])
}

function findBy(src){
    return Axios.get(`http://musicshop.colassel.com/api/produits?categorie=${src}`)
                .then(response => response.data['hydra:member'])
}

function find(id){
    return Axios.get(`http://musicshop.colassel.com/api/produits/${id}`)
                .then(response => response.data)
}

export default {
    findAll: findAll,
    find: find,
    findBy: findBy
}