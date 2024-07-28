"use client";
import { useEffect, useState } from "react";

import AppHead from "@/app/Components/AppHead";
import AppScripts from "@/app/Components/AppScripts";
import AppHeader from "../../../Components/AppHeader";
import AppFooter from "../../../Components/AppFooter";
import AppCopyRight from "../../../Components/AppCopyRight";
import { DeleteProduct, DeleteShop, getMyShopDetails, getMyShopOrders, getShopProducts, UpdateDeliveryProduct } from "@/app/actions";
import AppProductComponent from "@/app/Components/AppProductComponent";
import AppMapComponent from "@/app/Components/AppMapComponent";
import AppPreLoader from "@/app/Components/AppPreLoader";


export default function Home({params}) {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [selected, setSelected] = useState();
	const [orders, setOrders] = useState([]);
	const [products, setProducts] = useState([]);
	const [status, setStatus] = useState('');
	const [myShopsDetails, setMyShopsDetails] = useState({
		name:'Loading...',desc:'Loading...',});
	const handleChangeStatus = (event) =>setStatus(event.target.value);

	

  useEffect(() => {
    setDomLoaded(true);
	myLoad();
	console.log('====================================');
	console.log("params.id=>",params.id);
	console.log('====================================');

	getMyShopDetails(params.id).
	then(data=>{
		console.log('====================================');
	  console.log("MyShopDetails:",data);
	  console.log('====================================');
	  setMyShopsDetails(data);
	  return getMyShopOrders(params.id);
	}).then(data=>{
		console.log('====================================');
	  console.log("MyShopOrders:",data);
	  console.log('====================================');
	  setOrders(data);

	  return getShopProducts(params.id);
	}).then(data=>{
		console.log('====================================');
	  console.log("ShopProducts:",data);
	  console.log('====================================');
	  setProducts(data);
	})
	.catch(e=>{
		console.log('====================================');
		console.log(e.message);
		console.log('====================================');
	})
	
	// fetchData().then(data=>{}).catch(e=>{
	// 	console.log(e.message)
	// })
  }, []);

  function myLoad(){
	setTimeout(()=>{
		setPreLoader(false)
	},1500)
  }


  async function fetchData (){
	try {

	//   const  MyShopDetails= await ;
	  
	//   const MyShopOrders = await 
	  
	//   const ShopProducts = await 
	  

	} catch (error) {
	  console.error('Error fetching data', error);
	}
  };

  const handleDeleteShop=async()=>{
	var res = await DeleteShop(myShopsDetails._id);
	if(res){
		alert('Shop has been deleted!');
	}
	window.location = '/';
  }
  return (
<>
{domLoaded && (
<html lang="en">
<AppHead/>
<body>
	
	{/* PreLoader */}
    {preLoad&&<AppPreLoader/>}
	
	{/* header */}
	<AppHeader/>
	
	 {/* breadcrumb-section  */}
	<div className="breadcrumb-section breadcrumb-bg">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2 text-center">
					<div className="breadcrumb-text">
						<p>Get 24/7 Support</p>
						<h1>{myShopsDetails?.name}</h1>
					</div>
				</div>
			</div>
		</div>
	</div>

	{/* Shop About  */}
	<div className="mt-150 mb-150">
		<div className="container">
			<div className="row">
				<div className="col-lg-8">
					<div className="single-article-section">
						<div className="single-article-text">
							<img className="single-artcile-bg" src={`/assets/img/latest-news/${myShopsDetails?.banner}`}/>
							<p className="blog-meta">
								<span className="author">Account Balance:</span><strong>${myShopsDetails.account?.toFixed(2)}</strong>
							</p>
							<h2>{myShopsDetails.name}</h2>
							<p>{myShopsDetails.desc}</p>
						</div>

					</div>
				</div>
				<div className="col-lg-4">
					<div className="sidebar-section">
						<div className="recent-posts">
							<h4>Recent Products</h4>
							<ul>
								{products.map((product,index)=>(
									<li key={index}><a href="single-news.html">{product.name}</a></li>
								))}

							</ul>
						</div>
						<div className="tag-section">
							<h4>Actions</h4>
							<ul>
								<li><a href="#shop-products">Shop Products</a></li>
								<li><a href="#add-product">Add Product</a></li>
								<li><a href="#orders">Orders</a></li>
								<li><a href="#comments">Comments</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	{/* Shop Products  */}
	<div className="latest-news mt-150 mb-150" id="shop-products">
		<div className="container">
		<h3>Shop Products</h3>
			<div className="row">
			{products.map((product,index)=>(
				<div key={index} className="col-lg-4 col-md-6 text-center">
				<div className="single-product-item">
					<div className="product-image">
						<a href={`/product/${product._id}`}><img src={`/assets/img/products/${product.banner}`} alt=""/></a>
					</div>
					<h3>{product.name}</h3>
					<p className="product-price"><span>{product.unit} in stock</span> ${product.price} </p>
					<a className="cart-btn" href={`/owner/shop/product/${product._id}`} ><i className="fas fa-edit"></i> Edit</a>
					 <a> </a>
					 <a onClick={async ()=>{
						var res = await DeleteProduct(product._id);
						if(res){
							alert("Product has been added successfully!")
						}
						const shopProducts = await getShopProducts(params.id);
						setProducts(shopProducts);
					}} className="cart-btn " ><i className="fas fa-trash"></i> Delete</a>
				</div>
			</div>
			))}
			</div>
		</div>
	</div>

	 {/* Add product form  */}
	<AppProductComponent shopId={params.id}/>
	 
	{/* Google maps goes here */}
	{/* <AppMapComponent title="Track shop orders"/> */}

	{/* ORDER SECTION START */}
	<div className="checkout-section mt-150 mb-150" id="orders">
		<div className="container">
		<h3 className="">RECENT ORDERS</h3>
			<div className="row">
				<div className="col-lg-8">
					<div className="checkout-accordion-wrap">
						<div className="accordion" id="accordionExample">
							{orders.map((order,index)=>{
								
							return(
							<div onClick={()=>setSelected(order._id)} key={index} className="card single-accordion">
							<div className="card-header" id="headingOne">
								<h5 className="mb-0">
								<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								ORDER <a style={{color:'#F28123'}}>#{order._id.toString().substr(14,24)}</a>  - PRICE: <a style={{color:'#F28123'}}>${order.product.price}</a> 
								-  PRODUCT: <a style={{color:'#F28123'}}>{order.product.name}</a> 
								- COUNT: <a style={{color:'#F28123'}}>{order.unit}</a> 
								- STATUS: <a style={{color:'#F28123'}}>{order.product.status}</a> 
								</button>
								</h5>
							</div>

							<div id="collapseOne" className={`collapse ${selected==order._id?'show':''}`} aria-labelledby="headingOne" data-parent="#accordionExample">
								<div className="card-body">
								<div className="contact-form">
								<form>
									<p>
										{/* Status */}
										<select  value={status}
								onChange={handleChangeStatus}>
										<option value="">Select status</option>
										<option value="On Hold">On Hold</option>
										<option value="Delivered">Delivered</option>
										</select>
										<a> </a>
										</p>

								<p></p>

									<a className="cart-btn" onClick={async()=>{
										var res =await UpdateDeliveryProduct(order.orderId,order.product._id,status);
										
										if(res._id){
											alert("Delivery updated!")
											getMyShopOrders(params.id).then(data=>{
												setOrders(data)
											});
										}
									}}>Update</a>
								</form>
								</div>
								</div>
							</div>
							</div>
							)})}
						</div>
					</div>
				</div>

				<div className="col-lg-4">
					<div className="order-details-wrap">
						<table className="order-details">
							<thead>
								<tr>
									<th>Your order Details</th>
									<th>Count</th>
								</tr>
							</thead>
							<tbody className="order-details-body">
								<tr>
									<td><i className="fas fa-gift"></i> Orders placed</td>
									<td>{orders.length}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		</div>

	{/* Delete Shop */}
	<div className="col-lg-10 mx-auto px-auto" style={{height:'1px',backgroundColor:'#F28123'}}></div>
	<div className="checkout-section mt-150 mb-150" id="orders">
		<div className="container">
		<h3 style={{color:'red'}}>DELETE SHOP</h3>
			<p>This will deleted forever</p>
			<div className="row">
			<a className="cart-btn"
			onClick={handleDeleteShop}>Delete shop</a>
			</div></div></div>

	{/* footer  */}
	<AppFooter/>
	
	 {/* copyright  */}
	<AppCopyRight/>
	
    <AppScripts/>
</body>
</html>
)}</>);}