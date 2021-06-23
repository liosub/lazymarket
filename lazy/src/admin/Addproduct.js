import React ,{useState,useEffect}from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Createproduct,getCategories} from './apiAdmin';



const Addproduct =()=>{
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

    //get categories
const intit= ()=>{
    getCategories().then(data=>{
        if(data.error){
            setValues({...values,error:data.error})
        }else{
            setValues({...values,categories:data,formData:new FormData()})
        }
    })
}

    useEffect(()=>{
        intit();
    },[])

    const handleChange= name => event =>{
        const value= 
            name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name,value)
        setValues({...values,[name]:value})
    }

    const clickSubmit= (event)=>{
        event.preventDefault()
        setValues({...values,error:'',loading:true})
        Createproduct(token,formData)
        .then(data =>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({
                    ...values,
                     name:'',
                    description:'',
                    price:'',
                    quantity:'',
                    loading:false,
                    Createproduct:data.name
                   
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
            <p>{`${createProduct}`} is created!</p>
        </div>
    ) 

    const showLoading=() =>(
       loading && (<div className="alert alert-success"><p>Loading...</p></div> )
    ) 
        const newProductform= ()=>(
        <form className="mb-3" onSubmit={clickSubmit}>
            {showError()}
            {showSuccess()}
            {showLoading()}
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

        <button className="btn btn-outline-primary">Create Product</button>
    </form>

    ) 
   return (    
        <Layout  title="Add Product" description="Admin Page to add new Product" className="container-fluid"
        childern={newProductform()}/>  

    )
   
}
export default Addproduct;