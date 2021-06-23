import React from 'react'
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import Dashboard from './user/Dashboard'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/Addcategory'
import Addproduct from './admin/Addproduct'
import Orders from './admin/Orders'
import App from './App'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import Profile from './user/Profile'
import UpdateProducts from './admin/UpdateProducts'
import Update_Product from './admin/update_product'


require('dotenv').config()

const Routes= ()=>{
    return(
        <BrowserRouter>
       
            <Switch>
                
            <Route path="/" exact component={App}>
                    <App />
                </Route>
                
            <Route path="/home" exact component={Home}>
                    <Home />
                </Route>
                <Route path="/shop" exact  component={Shop}>
                    <Shop />
                </Route>
           
                <Route path="/signin" exact component={Signin}>
                    <Signin />
                </Route>
                <Route path="/signup" exact  component={Signup}>
                    <Signup />
                </Route>
                <Route path="/product/:productId" exact  component={Product}/>
                <PrivateRoute path="/profile/:userId" exact  component={Profile}/>
                <Route path="/cart" exact  component={Cart}/>
                <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}></AdminRoute>
                <AdminRoute path="/create/category" exact component={AddCategory}></AdminRoute>
                <AdminRoute path="/create/product" exact component={Addproduct}></AdminRoute>
                <AdminRoute path="/admin/product/upd" exact component={UpdateProducts}></AdminRoute>
                <AdminRoute path="/admin/orders" exact component={Orders}></AdminRoute>
                <AdminRoute path="/product/update/:productId" exact component={Update_Product}></AdminRoute>

            </Switch>
        </BrowserRouter>
    );
};

export default Routes;