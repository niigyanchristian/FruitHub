"use client";
import { useEffect, useState } from "react";

import AppHead from "@/app/Components/AppHead";
import AppScripts from "@/app/Components/AppScripts";
import AppHeader from "../../../Components/AppHeader";
import AppFooter from "../../../Components/AppFooter";
import AppCopyRight from "../../../Components/AppCopyRight";
import { DeleteProduct, getMyShopDetails, getMyShopOrders, getMyShops, getSession, getShopProducts, UpdateDelivery } from "@/app/actions";
import AppProductComponent from "@/app/Components/AppProductComponent";
import AppMapComponent from "@/app/Components/AppMapComponent";


export default function Home({params}) {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [selected, setSelected] = useState();
	const [orders, setOrders] = useState([]);
	const [myShops, setMyShops] = useState([]);
	const [products, setProducts] = useState([]);
	const [longitude, setLongitude] = useState('');
	const [latitude, setLatitude] = useState('');
	const [status, setStatus] = useState('');
	const [currentLocation, setCurrentLocation] = useState('');
	const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');
	const [myShopsDetails, setMyShopsDetails] = useState({
		name:'Loading...',desc:'Loading...',});
	const [session, setSession] = useState(null);

	const handleChangeLongitude = (event) =>setLongitude(event.target.value);
	const handleChangeLatitude = (event) =>setLatitude(event.target.value);
	const handleChangeStatus = (event) =>setStatus(event.target.value);
	const handleChangecurrentLocation = (event) =>setCurrentLocation(event.target.value);
	const handleChangeEstimatedDeliveryDate = (event) =>setEstimatedDeliveryDate(event.target.value);
	

  useEffect(() => {
    setDomLoaded(true);
	myLoad();
	// LoadSingleProduct();

	getMyShopDetails(params.id).then(data=>setMyShopsDetails(data));
	getMyShops().then(data=>setMyShops(data));
	getMyShopOrders(params.id).then(data=>{
		setOrders(data)
	});
	// getMyShopOrder

	getShopProducts(params.id).then(data=>{
		setProducts(data)
	});
	getSession().
	then(data=>{
		setSession(data);
	})
	
  }, []);

  function myLoad(){
	setTimeout(()=>{
		setPreLoader(false)
	},1500)
  }


  console.log(orders)
  return (
<>
{domLoaded && (
<html lang="en">
<AppHead/>
<body>
	
	{/* PreLoader */}
    {preLoad&&<div className="loader">
        <div className="loader-inner">
            <div className="circle"></div>
        </div>
    </div>}
    {/* PreLoader Ends */}
	
	{/* header */}
		<AppHeader myshops={myShops}/>
	{/* end header */}

	 {/* search area  */}
	<div className="search-area">
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<span className="close-btn"><i className="fas fa-window-close"></i></span>
					<div className="search-bar">
						<div className="search-bar-tablecell">
							<h3>Search For:</h3>
							<input type="text" placeholder="Keywords"/>
							<button type="submit">Search <i className="fas fa-search"></i></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end search arewa  */}
	
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
	 {/* end breadcrumb section  */}

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
								<li><a href="single-news.html">You will vainly look for fruit on it in autumn.</a></li>
								<li><a href="single-news.html">A man's worth has its season, like tomato.</a></li>
								<li><a href="single-news.html">Good thoughts bear good fresh juicy fruit.</a></li>
								<li><a href="single-news.html">Fall in love with the fresh orange</a></li>
								<li><a href="single-news.html">Why the berries always look delecious</a></li>
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
	{/* End Shop About  */}

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
	{/* End Shop Products  */}

	

	 {/* Add product form  */}
	<AppProductComponent shopId={params.id}/>
	 {/* end add product form  */}
	 
	{/* Google maps goes here */}
	<AppMapComponent title="Track shop orders"/>

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
										<option value="Placed">Select status</option>
										<option value="Placed">Placed</option>
										<option value="Accepted">Accepted</option>
										<option value="Packed">Packed</option>
										<option value="Shipped">Shipped</option>
										<option value="Delivered">Delivered</option>
										</select> <a></a>
										<input type="text" placeholder="Current location" value={currentLocation}
								onChange={handleChangecurrentLocation}/>
										</p>
									
								<p>
								<input type="text" placeholder="Longitude" value={longitude} onChange={handleChangeLongitude}/> <a></a>
								<input type="text" placeholder="Latitude" value={latitude}
								onChange={handleChangeLatitude}/>
								</p>

								<p><input type="date" placeholder="Latitude" id="dob" value={estimatedDeliveryDate}
							onChange={handleChangeEstimatedDeliveryDate}/></p>

									<a className="cart-btn" onClick={async()=>{
										var res =await UpdateDelivery(status,currentLocation,longitude,latitude,estimatedDeliveryDate,order._id);
										setCurrentLocation('');
										setEstimatedDeliveryDate('');
										setLatitude('');
										setLongitude('');
										
										if(res._id){
											console.log(res)
											alert("Delivery updated!")
											getMyShopOrders().then(data=>{
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
	{/* ORDER SECTION END */}

	 {/* Comments */}
	 {/* <div className="mt-150 mb-150" id="comments">
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div className="single-article-section">
						<div className="comments-list-wrap">
							<h3 className="comment-count-title">3 Comments</h3>
							<div className="comment-list">
								<div className="single-comment-body">
									<div className="comment-user-avater">
										<img src="/assets/img/avaters/avatar1.png" alt=""/>
									</div>
									<div className="comment-text-body">
										<h4>Jenny Joe <span className="comment-date">Aprl 26, 2020</span> <a href="#">reply</a></h4>
										<p>Nunc risus ex, tempus quis purus ac, tempor consequat ex. Vivamus sem magna, maximus at est id, maximus aliquet nunc. Suspendisse lacinia velit a eros porttitor, in interdum ante faucibus Suspendisse lacinia velit a eros porttitor, in interdum ante faucibus.</p>
									</div>
									<div className="single-comment-body child">
										<div className="comment-user-avater">
											<img src="/assets/img/avaters/avatar3.png" alt=""/>
										</div>
										<div className="comment-text-body">
											<h4>Simon Soe <span className="comment-date">Aprl 27, 2020</span> <a href="#">reply</a></h4>
											<p>Nunc risus ex, tempus quis purus ac, tempor consequat ex. Vivamus sem magna, maximus at est id, maximus aliquet nunc. Suspendisse lacinia velit a eros porttitor, in interdum ante faucibus.</p>
										</div>
									</div>
								</div>
								<div className="single-comment-body">
									<div className="comment-user-avater">
										<img src="/assets/img/avaters/avatar2.png" alt=""/>
									</div>
									<div className="comment-text-body">
										<h4>Addy Aoe <span className="comment-date">May 12, 2020</span> <a href="#">reply</a></h4>
										<p>Nunc risus ex, tempus quis purus ac, tempor consequat ex. Vivamus sem magna, maximus at est id, maximus aliquet nunc. Suspendisse lacinia velit a eros porttitor, in interdum ante faucibus Suspendisse lacinia velit a eros porttitor, in interdum ante faucibus.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div> */}
	 {/* End comments */}

	{/* footer  */}
	<AppFooter/>
	{/* end footer  */}
	
	 {/* copyright  */}
	<AppCopyRight/>
	 {/* end copyright  */}
	
    <AppScripts/>
</body>
</html>

)}
</>
  );
}
