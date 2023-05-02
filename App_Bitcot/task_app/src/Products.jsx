import React, { useEffect } from "react";
import './assets/css/main.css';
import { useNavigate } from "react-router-dom";
import Productlist from "./assets/images/icons/Path.svg";
// import data from 'sample.json';
import { collective } from "./App";
import { useContext, useState } from "react";
import logo from "./assets/images/thumbnails/Logo.svg";
import menu from "./assets/images/icons/icon-menu.svg";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
const Products = () => {
    const navigate = useNavigate();
    const Auth = useContext(collective);
    useEffect(()=>{
        let user = localStorage.getItem('Token_Auth');
        if(user && user!==null){
            navigate('/products')
        }
     },[])
    
    const [searchString,setSearchString] = useState('');
    const [pdata,setpdata]=useState(Auth.cstate.productdata);
    function handleDelete(event){
        let idToRemove = event.target.name;        
        let newArr = pdata.filter(i => i.id != idToRemove);
        Auth.cdispatch({type:'deleteProduct',value:newArr});
    }
    function handleChange(event){
        setSearchString(event.target.value);        
    }
    
        
    
    
    
    
    function handleEdit(event){
        let idToEdit = event.target.name;
        let newEditArr = pdata.filter(i => i.id == idToEdit);
        Auth.cdispatch({type:"editProduct",value:newEditArr})
        
    }
    return (
        <>
        
        <div className="App">
            <Header />
            <div className="page-wrapper">
                <aside className="sidebar-wrapper open custom-scrollbar wow fadeInLeft">
                    <div className="sidebar-content-wrapper">
                        <ul className="sidebar-list">
                            <li className="sidebar-list-item has-subnav active" id="listTem">
                                <button className="sidebar-link" id="pro_toggle">
                                    <img src={Productlist} alt="Product List" />
                                    <span className="item-text">Ecommerce</span>
                                </button>
                                <ul>
                                    <li>
                                        <NavLink to="/products" >Product List</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/addproduct" >Add Product</NavLink>
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
                                                <img src="images/icons/magnifying-glass.png" alt="search" />
                                            </span>
                                        </div>
                                        <input type="text" className="form-control input_modify" placeholder="Search"  />
                                    </div>
                                </div>
                            </div>
                            <div className="heading_wrapper d-flex flex-wrap">
                                <h1 className="head_title">Product List</h1>
                                <nav aria-label="breadcrumb" className="breadcrumb_wrapper">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">E-Commerce</li>
                                        <li className="breadcrumb-item active" aria-current="page">Product List</li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="card products_blc">
                                <div className="card-body">
                                    <div className="filter_wrapper">
                                        <div className="filet_left_content">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon1">
                                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABHNCSVQICAgIfAhkiAAAAXtJREFUOE+tVEFOwkAU7e8Q1yyNmFhv0Ih7yg1acW89AXADj1BOYN2D9gaUPZjeABZiXLI2DOObZmiGwSKGTjJpZ/6819f/3x+yjHHu+g6r1bpCCA8hV4UzIkr5ej34ypKFidmuSQ80mp1IWFYXey+YiU20kvGNEHU8fMwHkEbL6bD/G2FBdtHsZDmQc7/s61K1zViCY/PP2SgwCXMypcg749xbZEmupmw4rl//ZiwFMF3ORj39HKmvzaHo+lA+dFAZhpSqOmSHhxSZMaQlhrqVro5Urp5AJnNx9ADOJyF6y/dXr6gmNgWq1v6YDtOjmXDw8vbeQ5XHEFEUUSqrlExaoprfrLQAlVpDM20Lpm0fadoxsj7ZM+22giiEtMYVzBv80U5vOOfCFo+wRbzTAfpCa/TYIko2qtFt2ehCyEYPoWiA90wQPZuEO7eGJM6vIMZ6ALgAtOQeQBOQZ5zzaKu6cXMXmoR7ZP8xrkl4EllePKUQr8HJZAWhbTs/jATsJjmQpCoAAAAASUVORK5CYII=" alt="search" />
                                                    </span>
                                                </div>
                                                <input type="text" className="form-control input_modify" placeholder="Search" name="searchString" value={searchString} onChange={(event)=>handleChange(event)}/>
                                            </div>
                                            <select className="custom-select input_modify">
                                                <option>All</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                        <div className="filter_btn_wrapper">
                                            <NavLink className="btn theme-btn-primary theme-btn" to="/addproduct">Add Product</NavLink>
                                            {/* <NavLink to="/login">Logout</NavLink> */}
                                        </div>
                                    </div>
        <div className="app_table table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">
                                                        <label className="checkbox_container text-uppercase">ID</label>
                                                    </th>
                                                    <th scope="col" className="th_didivder">
                                                        Products 
                                         
                                                        <span className="filter-order-link">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                                                <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                                                    <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                                                    <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </th>
                                                    <th scope="col" className="th_didivder">
                                                        Category 
                                         
                                                        <span className="filter-order-link">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                                                <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                                                    <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                                                    <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </th>
                                                    <th scope="col" className="th_didivder">
                                                        Price 
                                         
                                                        <span className="filter-order-link">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                                                <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                                                    <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                                                    <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </th>
                                                    <th scope="col" className="th_didivder">
                                                        Stock 
                                         
                                                        <span className="filter-order-link">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                                                <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                                                    <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                                                    <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </th>
                                                    <th scope="col" className="th_didivder">
                                                        Status 
                                         
                                                        <span className="filter-order-link">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                                                <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                                                    <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                                                    <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </th>
                                                    <th scope="col" className="th_didivder">
                                                        Action 
                                         
                                                        <span className="filter-order-link">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                                                <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                                                    <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                                                    <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pdata.filter(a => a.productName.toLowerCase().includes(searchString)).map(d =>{
                                                    return (
                                                        <tr>
                                                            <td>
                                                                <label className="checkbox_container text-uppercase">{d.id}</label>
                                                            </td>
                                                            <td>
                                                                <div className="media align-items-center">
                                                                    <div className="product_thumb">
                                                                        <img src={d.variation[0].productImage} alt="Images" />
                                                                    </div>
                                                                    <div className="media-body product_des">
                                                                        <h6 className="product_name">{d.productName}</h6>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text_primary">{d.category}</td>
                                                            <td>{d.variation[0].price}</td>
                                                            <td>{d.variation[0].stock}</td>
                                                            <td>{d.status}</td>
                                                            <td className="actions">
                                                                <div className="dropdown dropdown_wrapper ">
                                                                    <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts" />
                                                                    </button>
                                                                    <div className="dropdown-menu dropdown-menu-right  ">
                                                                        <NavLink className="dropdown-item" to="/editproduct" name={d.id} onClick={(event)=>handleEdit(event)}>View Details</NavLink>
                                                                        <button className="dropdown-item" name={d.id} onClick={(event)=>{handleDelete(event)}}>Delete</button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}


                                            </tbody>
                                            </table>
            
            </div>
                                </div>
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
export default Products;