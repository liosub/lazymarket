import {API} from '../config'

export const Createcategory= (token,category)=>{
        return fetch(`${API}/categories/create`,{
            method:"POST",
            headers:{
                Accept:'application/json',
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body: JSON.stringify(category)
        })
        .then(response =>{
            return response.json();
        })
        .catch(err =>{
            console.log(err)
        })
    }


export const Createproduct= (token,product)=>{
        return fetch(`${API}/products/create`,{
            method:"POST",
            headers:{
                Accept:'application/json',
                Authorization:`Bearer ${token}`
            },
            body: product
        })
        .then(response =>{
            return response.json();
        })
        .catch(err =>{
            console.log(err)
        })
    }

    export const getCategories= () =>{
        return fetch(`${API}/categories`,{
            method:"GET"
        })
        .then(response=>{
            return response.json()
        })
        .catch(err => console.log(err))
    }

    export const getAllOrders= (token) =>{
        return fetch(`${API}/order/listAll`,{
            method:"GET",
            headers:{
                Accept:'application/json',
                Authorization:`Bearer ${token}`
            },
        })
        .then(response=>{
            return response.json()
        })
        .catch(err => console.log(err))
    }


    export const getStatus= (token) =>{
        return fetch(`${API}/order/status_value`,{
            method:"GET",
            headers:{
                Accept:'application/json',
                Authorization:`Bearer ${token}`
            },
        })
        .then(response=>{
            return response.json()
        })
        .catch(err => console.log(err))
    }



    export const updateOrderStatus= (token,orderId,status) =>{
        return fetch(`${API}/order/${orderId}/status`,{
            method:"PUT",
            headers:{
                Accept:'application/json',
                "Content-Type":'application/json',
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({status, orderId})
        })
        .then(response=>{
            return response.json()
        })
        .catch(err => console.log(err))
    }



    export const getProducts= () =>{
        return fetch(`${API}/products`,{
            method:"GET",
        })
        .then(response=>{
            return response.json()
        })
        .catch(err => console.log(err))
    }


    export const getProduct= (id) =>{
        return fetch(`${API}/products/${id}`,{
            method:"GET",
        })
        .then(response=>{
            return response.json()
        })
        .catch(err => console.log(err))
    }





    export const deleteProduct= (token,id) =>{
        return fetch(`${API}/products/${id}`,{
            method:"DELETE",
            headers:{
                Accept:'application/json',
                "Content-Type":'application/json',
                Authorization:`Bearer ${token}`
            },
        })
        .then(response=>{
            return response.json()
        })
        .catch(err => console.log(err))
    }

    export const updateProduct= (id,token,product) =>{
        console.log(product.price)
        return fetch(`${API}/products/${id}`,{
            method:"PUT",
            body:product,
            headers:{
                Accept:'application/json',
                Authorization:`Beare ${token}`
            }
        })
        .then(response=>{
            return response.json()
        })
        .catch(err => console.log(err))
    }