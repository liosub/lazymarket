import React ,{useState}from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import {Createcategory} from './apiAdmin';

const AddCategory = () =>{
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] =useState(false)

    const {user,token} =isAuthenticated();
    const handleChange= (e) =>{
        setError('')
        setName(e.target.value)
    }
    const clickSubmit =(e) =>{
        e.preventDefault()
        setError('')
        setSuccess(false)
        Createcategory(token,{name})
        .then(data =>{
            console.log(data.error)
            if(data.error){
                setError(data.error)
            }
            else{
                setError('');
                setSuccess(true);
            }
        })

    }
    const showSuccess=()=>{
        if(success){
            return <h4 className="text-success">{name} is created!! </h4>
        }
    }

    
    const showError=()=>{
        if(error){
            return <h4 className="text-danger">{name} cannot added!! </h4>
        }
    }


    const goBack=()=>{
            return (
                <div className="mt-5">
                   <Link to="/admin/dashboard" className="text-light"><p>Go Back</p> </Link>
                </div>
            )
        
        
        }
    
    const newCategoryform =() =>(
        <form onSubmit={clickSubmit}>
           {showError()}
            {showSuccess()}
          
            <div className="form-group">
            <label className="text-muted fs-5">Name</label>
            <input onChange={handleChange} type="name" className="form-control"
            value={name} autoFocus required/>
            </div>
            <button className="w-100 btn btn-ls my-2 btn-primary">Add Category</button>
            {goBack()}
        </form>
    )
    return (    
        <Layout  title="Add Category" description="Admin Page to add new Category" className="container-fluid"
        childern={newCategoryform()}/>  

    )
    
}

export default AddCategory;