import {API} from '../config'

export const ReadUser= (userId,token) =>{
    return fetch(`${API}/users/${userId}`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
    })
    .then(response=>{
        return response.json()
    })
    .catch(err => console.log(err))
}

export const UpdateProfile = (userId, token, Data) => {
    return fetch(`${API}/users/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(Data) 
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateUser =(user,next) =>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('jwt')){
            let auth = JSON.parse(localStorage.getItem('jwt'))
            auth.user = user
            localStorage.setItem('jwt',JSON.stringify(auth))
            next()
        }
    }
}