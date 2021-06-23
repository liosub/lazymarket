import React,{useState} from 'react';
import Layout from '../core/Layout'
import {Link, Redirect} from 'react-router-dom'
import {signin,authenticate,isAuthenticated} from'../auth';

const Signin= ()=>{
    const [values, setValues]= useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        redirectToReferrer:false,
    })

    const {email,password,loading,error,redirectToReferrer} =values
    const {user}=isAuthenticated()

    const handleChange= name=>event =>{
        setValues({...values,error:false, [name]:event.target.value})
    }

    const clickSubmit=(event)=>{
        event.preventDefault()
        setValues({...values,error:false,loading:true})
        signin({email,password})
        .then(data => {
            if(data.error){
                console.log(data.error)
                setValues({...values,error:data.error,loading:false,redirectToReferrer:false})
            }
            else{
                authenticate(data,()=>{
                setValues({...values,redirectToReferrer:true})
            })
            }
        })
    }
    const showError= () =>(
        <div className="alert alert-danger fs-6 h-1" height="4" style={{display:error? '': 'none'}}>
                      <p>x {error}</p>
        </div>
    );

    const showLoading= () =>(
       loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)
        )

        const redirectUser=() =>{
            if(redirectToReferrer){
                if(user && user.role === true){
                    return <Redirect to="/admin/dashboard" />
                }
                else{
                    return <Redirect to="/user/dashboard" />

                }
            }
            if(isAuthenticated()){
              return <Redirect to="/" />
            }
        }
    const signInForm=() =>(
        <form>

        {showError()}
        {showLoading()}
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
        {redirectUser()}
        </form>
        
    )

    return(
        <div>
<Layout  title="Signin" description="Signin to Lazy Market E-Commerce App" className="container" childern= {signInForm()}/>  

   </div>
 
    )
}

export default Signin;