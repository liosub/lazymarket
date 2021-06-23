import React ,{useState,useEffect}from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {getProduct,getCategories,updateProduct} from './apiAdmin';
import { Redirect } from 'react-router';



const Update_Product =({match})=>{
    const {user,token}=isAuthenticated();
    const [values,setValues] =useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading:false,
        error:'',
        createProduct:'',
        redirectToProfile:false,
        formData:''
    })
    const{
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createProduct,
        redirectToProfile,
        formData
    }=values 

const init =(productId) =>{
    getProduct(productId).then(data =>{
        if(data.error){
            setValues({...values,error:data.error})
        }
        else{
            setValues({
                ...values,
                name:data.name,
                description:data.description,
                price:data.price,
                category:data.category._id,
                shipping:data.shipping,
                quantity:data.quantity,
                formData:new FormData()
            })
            intitCategories()
        }
    })
}



    //get categories
const intitCategories= ()=>{
    getCategories().then(data=>{
        if(data.error){
            setValues({...values,error:data.error})
        }else{
            setValues({categories:data,formData:new FormData()})
        }
    })
}

    useEffect(()=>{
        init(match.params.productId);
    },[])

    const handleChange= name => event =>{
        const value= 
            name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name,value)
        console.log(name,value)
        setValues({...values,[name]:value})
    }

    const clickSubmit= (event)=>{
        event.preventDefault()
        setValues({...values,error:'',loading:true})
        updateProduct(match.params.productId,token,formData)
        .then(data =>{
            if(data.err){
                setValues({...values,error:data.err})
            }
            else{
                setValues({
                    ...values,
                     name:'',
                    description:'',
                    price:'',
                    quantity:'',
                    loading:false,
                    redirectToProfile:true,
                    createProduct:data.name
                   
                })
            }
        })    }

    const showError=()=>(
        <div className="alert alert-danger" style={{display: error ? '' :'none'}}>
            {error}
        </div>
    )
    const showSuccess=() =>(
        <div className="alert alert-info" style={{display: createProduct? '':'none'}}>
            <p>{`${createProduct}`} is Updated!</p>
        </div>
    ) 
    const redirectUser =()=>{
        if(redirectToProfile){
            if(!error){
                return <Redirect to="/admin/dashboard"/>
            }
        }
    }

    const showLoading=() =>(
       loading && (<div className="alert alert-success"><p>Loading...</p></div> )
    ) 
        const newProductform= ()=>(
        <form className="mb-3" onSubmit={clickSubmit}>
            {showError()}
            {showSuccess()}
            {showLoading()}
            {redirectUser()}
            <label className="text-muted fs-5">Post Photo</label>
        <div className="form-group fs-5">
                <input
                    onChange={handleChange("photo")}
                    type="file"
                    name="photo"
                    accept="image/*"
                />
        </div>

        <div className="form-group">
            <label className="text-muted fs-5">Name</label>
            <input
                onChange={handleChange("name")}
                type="text"
                className="form-control"
                value={name}
            />
        </div>

        <div className="form-group">
            <label className="text-muted fs-5">Description</label>
            <textarea
                onChange={handleChange("description")}
                className="form-control"
                value={description}
            />
        </div>

        <div className="form-group">
            <label className="text-muted fs-5">Price</label>
            <input
                onChange={handleChange("price")}
                type="number"
                className="form-control"
                value={price}
            />
        </div>

        <div className="form-group">
            <label className="text-muted fs-5">Category</label>
            <select
                onChange={handleChange("category")}
                className="form-control"
            >
                <option >Please select</option>
                {categories && categories.map((c,i)=> (<option key={i} value={c._id}>{c.name}</option>))}
            </select>
        </div>

        <div className="form-group">
            <label className="text-muted fs-5">Shipping</label>
            <select
                onChange={handleChange("shipping")}
                className="form-control"
            >
                <option>Select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
            </select>
        </div>

        <div className="form-group">
            <label className="text-muted fs-5">Quantity</label>
            <input
                onChange={handleChange("quantity")}
                type="number"
                className="form-control"
                value={quantity}
            />
        </div>

        <button className="btn btn-outline-primary btn-block">Update Product</button>
    </form>

    ) 
   return (    
        <Layout  title="Update Product" description="Admin Page to Update Product" className="container-fluid"
        childern={newProductform()}/>  

    )
   
}
export default Update_Product;