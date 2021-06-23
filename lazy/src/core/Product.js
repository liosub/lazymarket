import React ,{useEffect,useState}from 'react';
import Layout_I from './Layout_I';
import {read ,related} from './apiCore'
import Card from './Card'


const Product =(props) =>{

    const [product,setProduct]= useState({})
    const [error, setError] = useState(false)
    const [relatedProduct, setRelated] = useState([])
    const loadingSingleProduct = productId=>{
        read(productId).then(data =>{
            if(data.error){
                setError(data.error)
            }
            else{
                setProduct(data);
                related(data._id).then(
                    data =>{
                        if(data.error) {
                            setError(data.error)
                        }
                        else{
                            setRelated(data)
                        }
                    }
                )
            
            }
             
        })
    }
    
    useEffect(() =>{
        const productId =props.match.params.productId
        loadingSingleProduct(productId)
    },[])
    return (
        <Layout_I title={product && product.name}  description={product && product.description} className="container-fluid">
                <div className="row">
                    <div className="col-8">
                    {product && product.description && <Card product={product} showViewProductButton={false}/>}
                    </div>

                    <div className="col-4">
                        <h4>Related Products</h4>
                        {relatedProduct.map((p,i) => (
                            <div className="mb-3">
                                <Card key={i} product={p} /> 
                            </div>
                        ))}
                    </div>
                    

                </div>

        </Layout_I>
    )
}

export default Product;