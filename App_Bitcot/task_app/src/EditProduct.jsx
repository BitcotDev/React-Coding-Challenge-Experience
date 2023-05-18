import React, { useEffect } from "react";
import { useState } from "react";
import "./assets/css/main.css";
import { collective } from "./App";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Productlist from "./assets/images/icons/Path.svg";
const EditProduct = () => {
    const [isGeneral,setIsGeneral] = useState("General");
    const Auth = useContext(collective);
    
    const [eprod,seteProd] = useState(Auth.cstate.selectedProduct[0]);
    const [change,setChange] = useState(0);
    const [vari,setVari] = useState(JSON.parse(JSON.stringify(Auth.cstate.selectedProduct[0].variation)));
    
    let changeId= Auth.cstate.selectedProduct[0].id;
    function handleDiscard(event){
        let nv = Auth.cstate.selectedProduct[0]
        seteProd(nv);
        setVari(JSON.parse(JSON.stringify(nv.variation)))
    }
    
    function handleChange(event){
        let key=event.target.name;
        let value=event.target.value;
        
        switch(key){
            case "productName": seteProd({...eprod,productName:value})
                                break;
            case "description": seteProd({...eprod,description:value})
                                break;
            case "price": 
                                // let x=eprod.variation;
                                // x[0].price=value;
                                // seteProd({...eprod,variation:x});
                                // break;
            let x=vari.slice(0);
            x[0].price=value;
            setVari(x);
            break;
                                         
            case "comparePrice": seteProd({...eprod,comparePrice:value})
                                break;
            case "cost": seteProd({...eprod,cost:value})
                                break;
            case "tax_rate": seteProd({...eprod,tax_rate:value})
                                break; 
            case "category": seteProd({...eprod,category:value})
                                break;
            case "tags": seteProd({...eprod,tags:value})
                                break;
        }
        
            }
            function handleChangeofVariants(event,i){
                
                let key=event.target.name;
                let value=event.target.value;
                switch(key){
                    case "variantPrice":   let x=vari.slice(0);
                                            x[i].price=value;
                                            setVari(x);
                                            break;
                    case "variantName":   let y=vari.slice(0);
                                            y[i].variant=value;
                                            setVari(y);
                                            break;
                    case "variantStock":   let z=vari.slice(0);
                                            z[i].stock=value;
                                            setVari(z);
                                            break;     
                    case "productImage" :   let pImage=vari.slice(0);
                                            pImage[i].productImage=value;
                                            setVari(pImage);
                                            break;                                                            
                }
        
            }        
    function handleMinus(event,i)            {
        
        let temp=vari.slice(0);
        
        temp.splice(i,1);
        
        setVari(temp);
        
    }

    function handleAdd(){
        setVari([...vari,{"variant": "",
        "productImage": "",
        "price": "",
        "stock": ""}])
    }
    function handleSave(event){
        let flag=0;
        if(eprod.productName!=="" && eprod.description!=="" && vari[0].price!=="" && eprod.comparePrice!=="" && eprod.cost!=="" && eprod.tax_rate!=="" ){
            for(let c=0;c<vari.length;c++){
                
                if(vari[c].price!=="" && vari[c].stock!=="" && vari[c].variant!=="" && vari[c].productImage!==""){
                    continue
                }
                else{
                    flag=1
                    break;
                }
            }
            if(flag==0){
                
                alert("Changes saved!")
                Auth.cstate.productdata[changeId-1]=eprod;
                Auth.cstate.productdata[changeId-1].variation=JSON.parse(JSON.stringify(vari));
            }
            else{
                alert("Please enter all mandatory fields!")
            }
        }
        else{
            alert("Please enter all mandatory fields!")
        }
    }
    function handleTab(event){
        setIsGeneral(event.target.name);
    }
    return(
        <>
            <div className="App">
                <Header />
            
            <div className="page-wrapper">
                <aside className="sidebar-wrapper open custom-scrollbar wow fadeInLeft">
                    <div className="sidebar-content-wrapper">
                        <ul className="sidebar-list">
                            <li className="sidebar-list-item has-subnav active open" id="listTem">
                                <button className="sidebar-link" id="pro_toggle">
                                    <img src={Productlist} alt="Product List" />
                                    <span className="item-text">Ecommerce</span>
                                </button>
                                <ul>
                                    <li>
                                        <NavLink to="/products" className="sidebar-link">Product List</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/addproduct" className="sidebar-link active">Add Product</NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div className="content-area-wrapper">
                    <div className="content-area-wrapper">
                        <div className="content-wrapper">
                            <div className="filter_wrapper  d-block d-sm-none">
                                <div className="filet_left_content">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">
                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABHNCSVQICAgIfAhkiAAAAXtJREFUOE+tVEFOwkAU7e8Q1yyNmFhv0Ih7yg1acW89AXADj1BOYN2D9gaUPZjeABZiXLI2DOObZmiGwSKGTjJpZ/6819f/3x+yjHHu+g6r1bpCCA8hV4UzIkr5ej34ypKFidmuSQ80mp1IWFYXey+YiU20kvGNEHU8fMwHkEbL6bD/G2FBdtHsZDmQc7/s61K1zViCY/PP2SgwCXMypcg749xbZEmupmw4rl//ZiwFMF3ORj39HKmvzaHo+lA+dFAZhpSqOmSHhxSZMaQlhrqVro5Urp5AJnNx9ADOJyF6y/dXr6gmNgWq1v6YDtOjmXDw8vbeQ5XHEFEUUSqrlExaoprfrLQAlVpDM20Lpm0fadoxsj7ZM+22giiEtMYVzBv80U5vOOfCFo+wRbzTAfpCa/TYIko2qtFt2ehCyEYPoWiA90wQPZuEO7eGJM6vIMZ6ALgAtOQeQBOQZ5zzaKu6cXMXmoR7ZP8xrkl4EllePKUQr8HJZAWhbTs/jATsJjmQpCoAAAAASUVORK5CYII=" alt="search" />
                                            </span>
                                        </div>
                                        <input type="text" className="form-control input_modify" placeholder="Search" />
                                    </div>
                                </div>
                            </div>
                            <div className="card nav_pills_card nav_pills_card_new">
                                <div className="card-body">
                                    <div className="heading_wrapper heading_right_content">
                                        <h1 className="head_title">Edit Product</h1>
                                        <div className="btn_wrapper">
                                            <button type="button" className="theme-btn btn-outline-secondary" onClick={(event)=>handleDiscard(event)}>Discard</button>
                                            <button type="button" className="theme-btn theme-btn-primary" onClick={(event)=>{handleSave(event)}}>Save</button>
                                        </div>
                                    </div>
                                    <ul className="nav nav-pills mb-0 nav_pills_wrapper" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="pills-general-tab" data-toggle="pill" data-target="#pills-general" type="button" name="General" onClick={(event)=>{handleTab(event)}} role="tab" aria-controls="pills-general" aria-selected="true">General</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link " id="pills-variation-tab" data-toggle="pill" data-target="#pills-variation" type="button" name="Vairation" onClick={(event)=>{handleTab(event)}} role="tab" aria-controls="pills-variation" aria-selected="false">Variation</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="tab-content" id="pills-tabContent">
                                {isGeneral==="General"?(<div className="tab-pane fade show active" id="pills-general" role="tabpanel" aria-labelledby="pills-general-tab">
                                    <div className="card nav_pills_card">
                                        <div className="card-body">
                                            <div>
                                                <div className="form-title">Basic Info</div>
                                                <div className="form-group">
                                                    <label for="productName">
                                                        <span className="text-danger">*</span>
                                                        Product Name
                                       
                                                    </label>
                                                    <input type="name" name="productName" className="form-control" id="productName" value={eprod.productName} onChange={(event)=>handleChange(event)}/>
                                                </div>
                                                <div className="form-group">
                                                    <label for="Description">
                                                        <span className="text-danger">*</span>
                                                        Description
                                       
                                                    </label>
                                                    <textarea type="text" id="Description" className="form-control" name="description" rows="3" value={eprod.description} onChange={(event)=>handleChange(event)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card nav_pills_card">
                                        <div className="card-body">
                                            <div>
                                                <div className="form-title">Pricing</div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label for="price">
                                                                <span className="text-danger">*</span>
                                                                Price
                                                            </label>
                                                            <input type="text" name="price" className="form-control" id="price" value={vari[0].price} onChange={(event)=>handleChange(event)}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label for="comparePrice">
                                                                <span className="text-danger">*</span>
                                                                Compare price
                                                            </label>
                                                            <input type="text" name="comparePrice" className="form-control" id="comparePrice" value={eprod.comparePrice} onChange={(event)=>handleChange(event)}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label for=" costPerItem">
                                                                <span className="text-danger">*</span>
                                                                Cost per item
                                                            </label>
                                                            <input type="text" name="cost" className="form-control" id="costPerItem" value={eprod.cost} onChange={(event)=>handleChange(event)}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label for="taxRate">
                                                                <span className="text-danger">*</span>
                                                                Tax rate
                                                            </label>
                                                            <input type="text" name="tax_rate" className="form-control" id="taxRate" value={eprod.tax_rate} onChange={(event)=>handleChange(event)}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card nav_pills_card">
                                        <div className="card-body">
                                            <div>
                                                <div className="form-title">Organization</div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label for="productName">Category</label>
                                                            <select className="form-control" name="category" id="productName" value={eprod.category} onChange={(event)=>handleChange(event)}>
                                                                <option value="Select">Select</option>
                                                                <option value="cloths" selected>Cloths</option>
                                                                <option value="bags">Bags</option>
                                                                <option value="shoes">Shoes</option>
                                                                <option value="watches">Watches</option>
                                                                <option value="devices">Devices</option>
                                                                <option value="electronics">Electronics</option>
                                                                <option value="accessories">Accessories</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label for="Description">Tags</label>
                                                            <select className="form-control" name="tags" id="productName" value={eprod.tags} onChange={(event)=>handleChange(event)}>
                                                                <option value="Select">Select</option>
                                                                <option value="Cotton" selected>Cotton</option>
                                                                <option value="Nike">Nike</option>
                                                                <option value="Sales">Sales</option>
                                                                <option value="Sports">Sports</option>
                                                                <option value="Outdoor">Outdoor</option>
                                                                <option value="Toys">Toys</option>
                                                                <option value="Hobbies">Hobbies</option>
                                                                
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                                :(<div className="tab-pane fade show active" id="pills-variation" role="tabpanel" aria-labelledby="pills-variation-tab">
                                    <div className="card nav_pills_card">
                                        <div className="card-body">
                                            <div>
                                                <div className="form-title">Variants</div>
                                                <p>Add A Custome Variat Options For Your Product, Like Different Sizes Or Colors.</p>
                                                
                                                {vari.length>0?(vari.map((item,i)=> <>
                                                    <div className="">
                                                    <div className={i==0?"row":"row isMinus"}>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label for=" productName">
                                                                    <span className="text-danger">*</span>
                                                                    Variant
                                                                </label>
                                                                <input type="text" name="variantName" className="form-control" value={item.variant} onChange={event=>{handleChangeofVariants(event,i)}}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label for=" productName">
                                                                    <span className="text-danger">*</span>
                                                                    Price
                                                                </label>
                                                                <input type="text" name="variantPrice" className="form-control" value={item.price} onChange={event=>{handleChangeofVariants(event,i)}}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label for=" productName">
                                                                    <span className="text-danger">*</span>
                                                                    Stock keeping unit
                                                                </label>
                                                                <input type="text" name="variantStock" className="form-control" value={item.stock} onChange={event=>{handleChangeofVariants(event,i)}}/>
                                                            </div>
                                                        </div>
                                                        {i!=0?<span onClick={event=>{handleMinus(event,i)}} className="removeSpan">-</span>:""}
                                                    </div>
                                                    
                                                </div>
                                                <div className="form-group uploader-wrapper">
                                                    <label for="Description">
                                                        <span className="text-danger">*</span>
                                                        Upload Image
                                                    </label>
                                                    <div className="uploader-wrapper-inner">
                                                        <img name="productImage" src={item.productImage} alt="pictures" onChange={event=>{handleChangeofVariants(event,i)}}/>
                                                        <input type="file" />
                                                    </div>
                                                </div></>)):""}
                                                
                                                <button className="uploader-add-btne" type="button" onClick={handleAdd}>Add field</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>

        </>
    );
}
export default EditProduct;









    
   