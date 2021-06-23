import React ,{useEffect,useState}from 'react';
import Layout_I from './Layout_I';
import {getCategories,getFilteredProducts} from './apiCore'
import Card from './Card'
import ApiCore from './apiCore'
import Checkbox  from './Checkbox'
import RadioBox  from './Radiobox'
import {prices} from './fixedPrices'
const Shop=()=>{
    const [myFilters, setmyFilters] = useState({
        filters:{category:[] , price:[]}
    })
    const [categories,setCategories] =useState([])
    const [error,setError] = useState(false)
    const [limit,setlimit] =useState(4)
    const [skip,setskip]=useState(0)
    const [filteredResults,setfilteredResults]=useState([])
    const [size,setsize]=useState(0);
    const intit= ()=>{
        getCategories().then(data=>{
            if(data.error){ 
                setError(data.error)
            }else{

                setCategories(data)
                }
        })
    }
    
    useEffect(() =>{
        intit();
        loadfilteredResults(skip,limit,myFilters.filters)
    },[])

    const loadfilteredResults=(newFilters) =>{
       // console.log(newFilters)
        getFilteredProducts(skip,limit,newFilters).then(data=>{
            console.log(data)
            if(data.error){
                setError(data.error)
            }
            else{
                setfilteredResults(data.data)
                setsize(data.size)
                setskip(0)
            }
        })
    }


    const loadmore=() =>{
        let toSkip= skip+ limit 
        getFilteredProducts(toSkip,limit,myFilters.filters).then(data=>{
             if(data.error){
                 setError(data.error)
             }
             else{
                 setfilteredResults([...filteredResults,...data.data])
                 setsize(data.size)
                 setskip(0)
             }
         })
     }

     const loadMoreButton= () =>{
         return(
             size > 0  && size >= limit && (
                 <button onClick={loadmore} className="btn btn-warning mb-5">Load more</button>
             )
         )
     }
    const handleFilters = (filters, filterBy)=>{
        //console.log(filters,filterBy);
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters
        if(filterBy == "price"){
            let priceValue = handlePrice(filters)
            newFilters.filters[filterBy] = priceValue
        }
        loadfilteredResults(myFilters.filters)
        setmyFilters(newFilters)
    } 

    const handlePrice = value =>{
        const data = prices
        let array = []
        for (let key in data){
            if(data[key]._id === parseInt(value)){
                array=data[key].array
            }
                }
                return array;
    }
    return(
        <Layout_I  title="Shop Page" description="Lazy Market E-Commerce App" className="container-fluid">
            <div className="row">
            <div className="col-4">
                    <h4> Filter by Categories</h4>
                    <ul>
                    <Checkbox  categories={categories} handleFilters={filters =>handleFilters(filters,'category')}/>
                    </ul>

                    <h4> Filter by Price Range</h4>
                    <div>
                    <RadioBox  prices={prices} handleFilters={filters =>handleFilters(filters,'price')}/>
                    </div>
                </div>
                <div className="col-8">
                <h2 className="mb-4">Products</h2>
                  <div className="row">
                    {filteredResults.map((product,i) =>(
                        <Card key={i} product={product} />
                    ))}
                </div>
                <hr/>
                {loadMoreButton()}

                </div>

            </div>

        </Layout_I>
    )
}

export default Shop;