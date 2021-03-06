import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import {getUserData,removeItemFromOrder,getTotal,updateQuantity} from '../redux/actions/usersActions';
import {addNewOrder} from '../redux/actions/ordersActions';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const MyOrders = (props) => {
    

    useEffect(()=>{
            props.getUserData();
            props.getTotal();
    },[]);


    const removeItem = (id)=>{
        props.removeItemFromOrder(id);
        window.location = '';
    }

    const checkout =async (order,total)=>{
       await props.addNewOrder(order,total);
        let {_id} = jwtDecode(localStorage.getItem('res')); 
       await axios.patch('http://localhost:4000/users/checkout/'+_id);
       window.location = '/menu';
    }

    const updateQuantity = async(op,itemId)=>{
        props.updateQuantity(op,itemId);
    }

    if(!props.user.orders){
        return (<div>loading</div>);
    }

    return ( 
       
        <div className="container my-order-container">
            <img className="orders-main-image" src="./images/orderBanner.jpg" alt=""/>
            <div className="row mt-5">
                <div className="col-md-12">
                    <h1 className="text-center">{props.user.firstName}'s Orders</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Item Id</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>price</th>
                                <th>total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.user.orders.map((order,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td><img width="50px" src={order.image} alt=""/></td>
                                    <td>{order.itemId}</td>
                                    <td>{order.title}</td>
                                    <td>
                                        <button className="btn btn-success" onClick={()=>updateQuantity('+',order.itemId)}>+</button>
                                        {order.quantity}
                                        <button className="btn btn-danger" onClick={()=>updateQuantity('-',order.itemId)}>-</button>
                                    </td>
                                    <td>{order.price}</td>
                                    <td>{order.price * order.quantity}</td>
                                    <td><button onClick={()=>{removeItem(order.itemId)}} className="btn btn-danger">Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <hr className="mt-5"/>
                <div className="row mt-1">
                    <div className="col-md-12 d-flex justify-content-between">
                        
                        <h2>Total: ${props.total}</h2>
                        <button className="btn btn-primary" onClick={()=>checkout(props.user.orders,props.total)}>Checkout</button>
                    </div>
                </div>
        </div>
     );
}
 
const ms = state=>({
    user:state.users.user,
    total:state.users.total
})
export default connect(ms,{getUserData,removeItemFromOrder,getTotal,addNewOrder,updateQuantity})(MyOrders);