import React ,{useEffect,useState}from 'react';
import Layout_I from './Layout_I';
import {getProducts} from './apiCore'
import Card from './Card'
import Search from './Search'
const Home= ()=>{
const [productsBysell,setProductbysell] = useState([])
const [productbyarrival,setProductbyarrival] =useState([])
const [error,setError] =useState(false)

const loadProductBysell =() =>{
    getProducts('sold').then(data =>{
        if(data.error){
            setError(data.error)
        }
        else{
            setProductbysell(data)
        }
    })
}


const loadProductByArrival =() =>{
    getProducts('createdAt').then(data =>{
        if(data.error){
            setError(data.error)
        }
        else{
            setProductbyarrival(data)
        }
    })
}
useEffect(() =>{
    loadProductByArrival()
    loadProductBysell()
},[])
    return(
        <Layout_I  title="Home Page" description="Lazy Market E-Commerce App" className="container-fluid">
                         <h2 className="mb-4">Best Sellers</h2>
           <div className="row" >
            {productsBysell
            .map((product, i) =>( <Card key={i} product={product}/>))}
           </div>
           <h2 className="mb-4">New Arrivals</h2>
           
           <div className="row" >
                
          {productbyarrival
            .map((product, i) =>( <Card key={i} product={product}/>))}
          </div>
        </Layout_I>
    )
}

export default Home;

// <Search />
            