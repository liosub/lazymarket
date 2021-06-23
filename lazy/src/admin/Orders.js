import React, { useState, useEffect } from "react";
import Layout_I from "../core/Layout_I";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getAllOrders,getStatus ,updateOrderStatus} from "./apiAdmin";
import moment from 'moment'
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [showinfo, setshowinfo] = useState(false)
    const [statusValuse,setStatusValues] = useState([])
    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        getAllOrders(token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusorders = () => {
        getStatus(token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };


    useEffect(() => {
        loadOrders();
        loadStatusorders();
    }, []);

    const showOrderLength = orders => {
        if(orders.length > 0){
            return (
                <h5 className="text-danger display-2"> Total Orders: {orders.length}</h5>
            )
        }
        else{
            return <h4 className="text-danger">No Orders </h4>
        }
    };

    const showInput = (key,value) =>(
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>

            </div>
            <input text="text"
            value={value}
            className="form-control"
            readOnly />

        </div>
    )
        const productdetails= (products)=>{

           return( products.map((p,pindex) =>(
                <div>
            <div className="mb-4" key ={pindex} style={{ padding:'20px', borderBottom: '2px solid #09b556'}}>
            {showInput('Product name' , p.name)}
            {showInput('Product price' , p.price)}
            {showInput('Product total' , p.count)}
            {showInput('Product ID' , p._id)}
            </div>
            </div>  )))
         
            }
            const ontrue =() => setshowinfo(true)
            const onfalse =() => setshowinfo(false)
         const handleStatuschange = (e,orderId)=>{
            updateOrderStatus(token,orderId,e.target.value).then(data =>{
                if(data.error){
                    console.log("status update failed")
                }
                else{
                    loadOrders()
                }
            })
         }   

        const showStatus = (o) =>(
            <div className="form-group"> 
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select className="form-control" onChange={(e) => handleStatuschange(e,o._id)}
            >
                <option>Update Status</option>
                {statusValuse.map((status, index) =>(
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
            </div>
        ) 
    return (
        <Layout_I
            title="Orders"
            description={`G'day ${
                user.name
            }, you can manage all the orders here`}
        >
                        {showOrderLength(orders)}
                        <br></br>

            <div className="row">
                <div className="col-md-8 offset-md-2">
               
                    {orders.map((o,oIndex) =>{
                        return (
                            <div className="mb-5 font_2" key={oIndex} style={{borderBottom: '2px solid #09b556'}}>
                            <h2 className="mb-5 font-2">
                                <span>Order ID: {o._id}</span>
                            </h2>
                            <ul className="list-group mb-2">
                                <li className="list-group-item">
                                    <p className="font_2">Status:</p>{showStatus(o)}
                                </li>
                                <li className="list-group-item">
                                    <p className="font_2"> Transaction Id:</p> {o.transaction_id}
                                </li>
                                <li className="list-group-item">
                                    <p className="font_2">Amount $</p>{o.amount}
                                </li>
                                <li className="list-group-item">
                                  <p className="font_2">OrderBY</p> {o.user.name}
                                </li>
                                <li className="list-group-item">
                                  <p className="font_2">Order On</p> {moment(o.createdAt).fromNow()}
                                </li>
                                <li className="list-group-item">
                                  <p className="font_2">Delivery address</p> {o.address}
                                </li>
    
                            </ul>
                                <h4 className="mt-4 mb-4 font-2 font-italic">
                                    Total Products in the Orders {o.products.length}
                                </h4>
                                <div>
                                <button onClick={ontrue}>show details</button>
                                <button onClick={onfalse}>hide details</button>
                                                                
                                    { showinfo ? productdetails(o.products) : null}   
                                    
                                      
                                
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Layout_I>
    );
};

export default Orders;
