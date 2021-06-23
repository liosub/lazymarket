import React from "react";
import Menu from "./Menu";

const Layout_I = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <Menu />
     <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="h font-1">{title}</h1>
        <p class="lead text-muted">{description}</p>
       
      </div>
     </div>
    <div className="album py-5 bg-light"/>
         <div className="container">
             <div className={className}>{children}</div>
           </div>
         </div>
);

export default Layout_I;
