import React ,{useEffect,useState}from 'react';
import {Link, Redirect} from 'react-router-dom';
import {getCart} from './cartHelpers';
import Card from './Card';
import Layout_I from './Layout_I';
import Checkout from './Checkout'

const Cart = () =>{
    const [items, setItems] = useState([]);
    useEffect(() =>{
        setItems(getCart())
    },[])
  const showItems = items =>{
      return (
          <div>
              <h2>Your cart has {`${items.length}`} items</h2>
              <hr/>
              {items.map((product, i) => (<Card key={i} product={product} 
              showAddToCartButton={false}
              cartUpdate= {true}
                showRemoveProductButton={true}
              />))}

          </div>
      )
  }

  const noItemsMessage =() =>(
      <h2>Your cart is empty. <br/> <Link to="/shop">Continue Shopping</Link></h2>
  )
    return(
        <Layout_I  title="CartPage" description="MY CART DETAILS" className="container-fluid">
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>

                <div className="col-6">
                    <h2 className="mb-4"> Your Cart Summary</h2>
                    <hr/>
                    <Checkout products={items} />
                </div>
            </div>
        </Layout_I>
    )
}

export default Cart;