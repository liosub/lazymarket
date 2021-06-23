import React from 'react';
import {API} from '../config'

const ShowImage = ({item,url})=>(
    <div className="product-img" class="rounded mx-auto d-blockl">
        <img src={`${API}/${url}/photo/${item._id}`} alt={item.name}
        className="mb-2 card-img-top" style={{maxHeight:'300px',maxWidth:'250px'}} />
    </div>
)

export default ShowImage; 