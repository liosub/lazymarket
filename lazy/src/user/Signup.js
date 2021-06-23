import React,{useState} from 'react';
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import {signup} from'../auth';

const Signup= ()=>{
    const [values, setValues]= useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    })

        const {name, email,password,success,error} =values

    const handleChange= name=>event =>{
        setValues({...values,error:false, [name]:event.target.value})
    }

    const clickSubmit=(event)=>{
        event.preventDefault()
        setValues({...values,error:false})
        signup({name,email,password})
        .then(data => {
            if(data.erro){
                setValues({...values,error:data.erro,success:false})
            }
            else{
                setValues({...values,name:'',email:'',password:'',error:'',success:true})
            }
        })
    }
    const showError= () =>(
        <div className="alert alert-danger fs-6 h-1" height="4" style={{display:error? '': 'none'}}>
                      <p>x {error}</p>
        </div>
    );

    const showSuccess= () =>(
        <div className="alert alert-info" style={{display:success? '': 'none'}}>
            <h2>Hi, my new lazy Customer</h2>
            <p>Your account is created Successfully,<Link to="/signin">Signin</Link></p>
        </div>
    )
    
    const signUpForm=() =>(
        <form>

        {showError()}
        {showSuccess()}
            <div className="form-group">
            <label className="text-muted fs-5">Name</label>
            <input onChange={handleChange('name')} type="text" className="form-control"
            value={name}/>
            
            </div>


            <div className="form-group">
            <label className="text-muted fs-5">E-Mail</label>
            <input onChange={handleChange('email')} type="email" className="form-control"
            value={email}/>
            </div>


            <div className="form-group">
            <label className="text-muted fs-5">Password</label>
            <input  onChange={handleChange('password')} type="password" className="form-control"
            value={password}/>
            </div>
            <button  onClick={clickSubmit} class="w-100 btn btn-ls my-2 btn-primary" type="submit">Sign in</button>
             <p class="mt-2 mb-1 fs-6 ">&copy; 2010–2021</p>
    
        </form>
        
    )

    return(
        <div>
<Layout  title="Signup" description="Signup to Lazy Market E-Commerce App" className="container" childern= {signUpForm()}/>  

   </div>
 
    )
}

export default Signup;