import React ,{Fragment}from 'react'
import {Link , withRouter} from 'react-router-dom'
import logo from '../assets/Logo.png'
import {signout,isAuthenticated} from '../auth'
import {itemTotal} from './cartHelpers'

const isActive= (history, path)=>{
        if(history.location.pathname=== path){
          return    { 
              color:'#ff9900',
            }
        }else{
            return {color : '#000000'}
        }
}

const Menu = ({history})=>(
    <div  className="d-flex flex-wrap justify-content-center py-1 mb-4 navbar-back">
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <img src={logo} className="bi me-2" height="62" width="90" alt="Logo" />
        <span class="fs-4 logo">Lazy Market</span>
        </div>

        <ul className="nav fs-4 nav-pills">
        <li className="nav-item">
                <Link className="nav-link"  style={isActive(history,'/')} to="/home">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link"  style={isActive(history,'/shop')} to="/shop">Shop</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link"  style={isActive(history,'/cart')} to="/cart">
                    Cart <sup><small className="cart-badge">{itemTotal()}</small></sup></Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === false && (
                                <Fragment>

             
            <li className="nav-item">
                <Link className="nav-link"  style={isActive(history,'/user/dashboard')} to="/user/dashboard">Dashboard</Link>
            </li>
             </Fragment>
            )}
                   {isAuthenticated() && isAuthenticated().user.role === true && (
                                <Fragment>

            <li className="nav-item">
                <Link className="nav-link"  style={isActive(history,'/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
            </li>
             </Fragment>
            )}
            {!isAuthenticated() && (
                <Fragment>
                       <li className="nav-item">
                <Link className="nav-link" style={isActive(history,'/signin')} to="/signin">Signin</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link"  style={isActive(history,'/signup')} to="/signup">Signup</Link>
            </li>
          
                </Fragment>
            )}
            {isAuthenticated() && (
                 <li className="nav-item">
                 <span className="nav-link"  style={{cursor:'pointer',color:'#000000'}} 
                 onClick={()=>{signout(()=>{
                     history.push('/');
                 })}}>Signout</span>
             </li>
        
            )}
           </ul>
        </div>

)

export default withRouter(Menu);