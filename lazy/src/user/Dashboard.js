import React from 'react'
import Layout_I from '../core/Layout_I'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'

const Dashboard = () =>{
    const {user: {_id, name,email,role}} = isAuthenticated()
    const userLinks =() =>{
        return (
       
       <div className="card">
       
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
            <li  className="list-group-item"><Link className="nav-link" to="/cart">My Card</Link></li>
            <li  className="list-group-item"><Link className="nav-link" to={`/profile/${_id}`}>My Profile</Link></li>
        </ul>
       
            </div>
        )
    }
    const purchasehistory= ()=>{
        return(
            <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li  className="list-group-item">{name}</li>
                <li  className="list-group-item">{email}</li>
                <li  className="list-group-item">{role === true ? "ADMIN" : "USER"}</li>
            </ul>
            </div>
        )
    }
    const userInfo= () =>{
        return(
            <div className="card mb-5">
            <h3 className="card-header">Purchase Information</h3>
            <ul className="list-group">
                <li  className="list-group-item">History</li>
            </ul>
            </div>         
            
        )
    }
    return (
        <Layout_I title="Profile Page" description="Lazy Market E-Commerce App" className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInfo()}
                {purchasehistory()}
                </div>
            </div>

            </Layout_I>    
        )

}

export default Dashboard;