import React from 'react';
import Menu from '../core/Menu'

const Layout = ({ title = "Title", description = "Description",className, childern }) => {
    return (
        <div>
            <Menu />
            <div className="p-4 mb-6 bg-light rounded-2">
                <div className="container-fluid py-5">
                    <h2>{title}</h2>
                    <p className="lead">{description}</p>
                    <div className="col-md-4 h-90 p-5 text-white rounded-3 container float-end co">
                   <h2> {childern}</h2>
                </div>
                </div>
              
            </div>
        </div>
    )
}


export default Layout;