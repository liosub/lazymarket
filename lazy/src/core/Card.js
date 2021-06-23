import React ,{useEffect,useState}from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './Showimage';
import moment, { updateLocale } from 'moment'
import {addItem,updateItem,removeItem} from './cartHelpers'

const Card = ({
    product,
     showViewProductButton= true,
      showAddToCartButton= true,
    cartUpdate= false,
    showRemoveProductButton=false
    }) =>{
    const [redirect ,setRedirect] = useState(false)
    const [count, setCount] =useState(product.count)
    const showviewButton= (showViewProductButton) =>{
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-5 my-3 block">

                <button class="btn my-3  btn-success">View Product</button>
                
                   </Link>

            )
        )
    }

    const addToCart =() =>{
        addItem(product, () =>{
            setRedirect(true)
        })
    }
    const shouldRedirect = redirect =>{
        if(redirect){
            return <Redirect to="/cart" />
        }
    }
    const showAddToCart= (showAddToCartButton)=>{
        return showAddToCartButton && (
            <button  onClick={addToCart} className="btn my-3  btn-warning">
            Add to Card</button>
        )
    }

    const showRemoveButton= (showRemoveProductButton)=>{
        return showRemoveProductButton && (
            <button  onClick={() =>removeItem(product._id)} className="btn btn-outline-danger mt-2 mb-2 ml-3">
            Remove to Card
</button>
        )
    }

    const showStock= quantity=>{
        return(
         quantity > 0 ? (
        <span className="badge stock badge-pill"> IN Stock</span>
        ) :(
        <span className="badge stockI badge-pill"> Out of Stock</span>
        ))
        }
    
    const handleChange =productId => event =>{
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if(event.target.value >= 1){
            updateItem(productId,event.target.value)
        }
    }
    const showCartUpdateOptions =  cartUpdate =>{
        return cartUpdate && 
        <div> 
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        Adjust Quantity
                    </span>
                    <input type="number" className="form-control" value={count} 
                    onChange={handleChange(product._id)}/>
                </div>
            </div>
        </div>
    }
    return (
        <div className="col-4 mb-3">
            <div className="card name">
                <div className="card-header font_2">{product.name}</div>
                {shouldRedirect(redirect)}
                <div className="card-body">
                    <ShowImage item={product} url="products" />
                     Info:    <p>{product.description}</p>
                    {showStock(product.quantity)}<br></br>
                     Price:   <p>${product.price}</p>
                    Type:<p>Category: {product.category && product.category.name}</p>
                    Add on <p>{moment(product.createdAt).fromNow()}</p>
                    {showviewButton(showViewProductButton)} &nbsp;&nbsp;&nbsp;
                    {showAddToCart(showAddToCartButton)}
                    {showCartUpdateOptions(cartUpdate)}
                    {showRemoveButton(showRemoveProductButton)}
                </div>
            </div>
        </div>
    )
}

export default Card