import React from "react";
import { useState,useContext } from "react";
import "./assets/css/main.css";
import { collective } from "./App";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Productlist from "./assets/images/icons/Path.svg";
const AddProduct = () =>  {
    const Auth = useContext(collective);
    const [isGeneral,setIsGeneral] = useState("General");
    const [prod,setProd] = useState({
        productName:"",
        description:"",        
        comparePrice:"",
        cost:"",
        tax_rate:"",
        category:"",
        tags:"",
        status:"in stock",
        id:Auth.cstate.productdata.length+1,  
        variation:[
            {"variant": "",
        "productImage": "",
        "price": "",
        "stock": ""},
        {"variant": "",
        "productImage": "",
        "price": "",
        "stock": ""}
        ]      
    })
    
    const [emptyProd,setEmptyProd] = useState({
        productName:"",
        description:"",        
        comparePrice:"",
        cost:"",
        tax_rate:"",
        category:"",
        tags:"",
        status:"in stock",
        id:Auth.cstate.productdata.length+1,  
        variation:[
            {"variant": "",
        "productImage": "",
        "price": "",
        "stock": ""},
        {"variant": "",
        "productImage": "",
        "price": "",
        "stock": ""}
        ]     
    })
    function handleDiscard(event){
        
        
            setProd(emptyProd);
        }    
    function handleChange(event){
        let key=event.target.name;
        let value=event.target.value;
       
        switch(key){
            case "productName": setProd({...prod,productName:value})
                                break;
            case "description": setProd({...prod,description:value})
                                break;
            case "price": let x= prod.variation.slice(0);
                                x[0].price=value;
                                setProd({...prod,variation:x});
                                break;
            case "comparePrice": setProd({...prod,comparePrice:value})
                                break;
            case "cost": setProd({...prod,cost:value})
                                break;
            case "tax_rate": setProd({...prod,tax_rate:value})
                                break; 
            case "category": setProd({...prod,category:value})
                                break;
            case "tags": setProd({...prod,tags:value})
                                break;
        }
            }
            function handleChangeofVariants(event,i){
                
                let key=event.target.name;
                let value=event.target.value;
                switch(key){
                    case "variantPrice":   let x= prod.variation.slice(0);
                                            x[i].price=value;
                                            setProd({...prod,variation:x});
                                            break;
                    case "variantName":   let y= prod.variation.slice(0);
                                            y[i].variant=value;
                                            setProd({...prod,variation:y});
                                            break;
                    case "variantStock":   let z=prod.variation.slice(0);
                                            z[i].stock=value;
                                            setProd({...prod,variation:z});
                                            break;     
                    case "productImage" :   let pImage=prod.variation.slice(0);
                                            pImage[i].productImage=value;
                                            setProd({...prod,variation:pImage});
                                            break;                                                            
                }
        
            }               
    function handleClick(event){
        setIsGeneral(event.target.name);
    }
    function handleMinus(event,i)            {
        
        let temp=prod.variation.slice(0);
        
        temp.splice(i,1);
        
        setProd({...prod,variation:temp});
        
    }

    function handleAdd(){
        setProd({...prod,variation:[...prod.variation,{"variant": "",
        "productImage": "",
        "price": "",
        "stock": ""}]})
    }
    function handleSave(event){
        let flag=0;
        if(prod.productName!=="" && prod.description!=="" && prod.variation[0].price!=="" && prod.comparePrice!=="" && prod.cost!=="" && prod.tax_rate!=="" ){
            for(let c=0;c<prod.variation.length;c++){
                
                if(prod.variation[c].price!=="" && prod.variation[c].stock!=="" && prod.variation[c].variant!=="" ){
                    continue
                }
                else{
                    flag=1
                    break;
                }
            }
            if(flag==0){
                
                
                alert("Changes saved!")
                Auth.cstate.productdata[prod.id-1]=prod;
                
                
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
    return (
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
                                        <h1 className="head_title">Add Product</h1>
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
                                                    <input type="name" name="productName" className="form-control" id="productName" value={prod.productName} onChange={(event)=>handleChange(event)}/>
                                                </div>
                                                <div className="form-group">
                                                    <label for="Description">
                                                        <span className="text-danger">*</span>
                                                        Description
                                       
                                                    </label>
                                                    <textarea type="text" id="Description" className="form-control" name="description" rows="3" value={prod.description} onChange={(event)=>handleChange(event)}/>
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
                                                            <input type="text" name="price" className="form-control" id="price" value={prod.variation[0].price} onChange={(event)=>handleChange(event)}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label for="comparePrice">
                                                                <span className="text-danger">*</span>
                                                                Compare price
                                                            </label>
                                                            <input type="text" name="comparePrice" className="form-control" id="comparePrice" value={prod.comparePrice} onChange={(event)=>handleChange(event)}/>
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
                                                            <input type="text" name="cost" className="form-control" id="costPerItem" value={prod.cost} onChange={(event)=>handleChange(event)}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label for="taxRate">
                                                                <span className="text-danger">*</span>
                                                                Tax rate
                                                            </label>
                                                            <input type="text" name="tax_rate" className="form-control" id="taxRate" value={prod.tax_rate} onChange={(event)=>handleChange(event)}/>
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
                                                            <select className="form-control" id="productName" name="category" value={prod.category} onChange={(event)=>handleChange(event)}>
                                                                <option value="Select">Select</option>
                                                                <option value="cloths" selected>Cloths</option>
                                                                <option value="bags">Bags</option>
                                                                <option value="shoes">Shoes</option>
                                                                <option value="watches">Watches</option>
                                                                <option value="devices">Devices</option>
                                                                <option value="electonics">Electronics</option>
                                                                <option value="accessories">Accessories</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label for="Description">Tags</label>
                                                            <select className="form-control" id="productName" name="tags" value={prod.tags} onChange={(event)=>handleChange(event)}>
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
                                                
                                                {prod.variation.length>0?(prod.variation.map((item,i)=> <>
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
                                                        <span className="text-danger"></span>
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
export default AddProduct;


    