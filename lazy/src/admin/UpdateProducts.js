import React, {useEffect, useState} from 'react'
import Layout_I from '../core/Layout_I'
import {isAuthenticated} from '../auth'
import {Link, Redirect} from 'react-router-dom'
import {getProducts,getProduct,deleteProduct,updateProduct} from './apiAdmin'

const UpdateProducts = () =>{

    const [products, setProducts] = useState([])
    const {token} =isAuthenticated()
    const loadProducts =() =>{
        getProducts().then(data =>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setProducts(data)
            }
        })
    }
    const destory = productId =>{
        deleteProduct(token,productId).then(data =>{
            if(data.error){
                console.log(data.error)
            }
            else{
                loadProducts()
            }

        })
    }
    useEffect(() => {
        loadProducts()
    },[])
 
    return (
        <Layout_I  title="Update Products" description="Mange Proudcts Page" className="container-fluid">
        <h2 className="mb-4 font_2">Managment Market </h2>
     
            <div className="row">
                <div className="col-12">
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{p.name}</strong>
                                <Link to={`/product/update/${p._id}`}>
                                    <span className="badge bg-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                <span
                                    onClick={() => destory(p._id)}
                                    className="badge bg-danger badge-pill"
                                >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            </Layout_I>
    );
}

export default UpdateProducts