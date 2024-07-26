"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";
import { PaystackConsumer } from 'react-paystack';


import AppHead from "@/app/Components/AppHead";
import AppScripts from "@/app/Components/AppScripts";
import AppHeader from "../Components/AppHeader";
import AppFooter from "../Components/AppFooter";
import AppCopyRight from "../Components/AppCopyRight";
import AppCompanies from "../Components/AppCompanies";
import AppMapScripts from "../Components/AppMapScripts";
import AppHeadForProfile from "../Components/AppHeadForProfile";
import { FindDeliveiresByIds, GetAllOrders, getSession, GetShoppingDetails, UpdateOrder } from "../actions";
import AppMapComponent from "../Components/AppMapComponent";

export default function Home() {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [orders, setOrders] = useState([]);
	const [selected, setSelected] = useState();
	const [mapOrders, setMapOrders] = useState(null);
	const [carts, setCarts] = useState([]);
	const [wishlist, setWishlist] = useState([]);
	const [status, setStatus] = useState('');
	// const [Subtotal, setSubtotal] = useState(0);
	// const [shipping, setShipping] = useState(0);

	const handleChangeStatus = (event) => {
		setStatus(event.target.value);
	  };
  useEffect(() => {
    setDomLoaded(true);
	myLoad();

	GetAllOrders().
	then(data=>{
		console.log('====================================');
		console.log("Order:",data);
		console.log('====================================');
		// setCarts(data.cart)
		setOrders(data.reverse());
		// setWishlist(data.wishlist);
		// const orderIds = data.orders.map(order => order.orderId);

		
		// return FindDeliveiresByIds(orderIds)
	}).then(data=>{
		// console.log('====================================');
		// console.log(data);
		// setMapOrders(data)
		// setOrders(data)
		// console.log('====================================');
	})
	// LoadSingleProduct();
  }, []);

  function myLoad(){
	setTimeout(()=>{
		setPreLoader(false)
	},1500)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
	if(status==''){
		alert('Select a status');
		return;
	}
  };


 
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
		<AppHeader/>
	{/* end header */}

	{/* search area */}
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
	{/* end search arewa */}
	
	{/* breadcrumb-section */}
	<div className="breadcrumb-section breadcrumb-bg">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2 text-center">
					<div className="breadcrumb-text">
						<p>Fresh and Organic</p>
						<h1>Your Orders</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
	{/* end breadcrumb section */}


	{/* {mapOrders&&<AppMapComponent orders={mapOrders}/>} */}
	{/* check out section */}
	<div className="checkout-section mt-150 mb-150">
		<div className="container">
		<h3 className="">RECENT ORDERS</h3>
			<div className="row">
				<div className="col-lg-8">
					<div className="checkout-accordion-wrap">
						<div className="accordion" id="accordionExample">
						  {orders.map((order,index)=>(
							<div onClick={()=>setSelected(order._id)} key={index} className="card single-accordion">
						    <div className="card-header" id="headingOne">
						      <h5 className="mb-0">
						        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                ORDER #FUR{order.orderId.toString().substr(0,8)} - STATUS <a href="">{order.status}</a>
						        </button>
						      </h5>
						    </div>

						    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
						      <div className="card-body">
						        <div className="billing-address-form">
								<div className="order-details-wrap">
						<table className="order-details" style={{width:'100%'}}>
							<thead>
								<tr>
									<th>Products</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody className="order-details-body">
								{order.items.map((item,index2)=>(
									<tr key={index2}>
										<td><i className="fas fa-gift"></i>{item.product.name}</td>
										<td>{item.product.status}</td>
									</tr>
								))}
								
							</tbody>
						</table>
					</div>
						        </div>
						      </div>
						    </div>

							<div className="card-body">
						        <div className="billing-address-form">
										<label>Change status</label>
						        	<form onSubmit={handleSubmit}>
						        		{/* <p><input type="text" placeholder="Name"
										// value={'name'}
										// onChange={handleChangeName}
										/></p> */}
										<p>
										<select value={status} onChange={handleChangeStatus}>
											<option value="">{order.status}</option>
											<option value="On Hold">On Hold</option>
											<option value="Ready">Ready</option>
											<option value="Shipping">Shipping</option>
											<option value="Delivered">Delivered</option>
											<option value="Cancelled">Cancelled</option>
										</select>
										</p>
										<a className="cart-btn"
										onClick={async ()=>{
											var res =await UpdateOrder(order._id,status);
											GetAllOrders().
											then(data=>{
												setOrders(data.reverse());
											});

										}}>
										Submit
										</a>
						        	</form>
						        </div>
						      </div>
						  </div>
						  ))}
						</div>

					</div>
				</div>

				<div className="col-lg-4">
					<div className="order-details-wrap">
						<table className="order-details">
							<thead>
								<tr>
									<th>Your order Details</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody className="order-details-body">
								<tr>
									<td><i className="fas fa-gift"></i> Orders placed</td>
									<td>{orders.length}</td>
								</tr>
								<tr>
									<td><i className="fas fa-shopping-cart"></i> Cart</td>
									<td>{carts.length}</td>
								</tr>
								<tr>
									<td><i style={{color:'red'}} className="fas fa-heart"></i> Wishlist</td>
									<td>{wishlist.length}</td>
								</tr>
								
							</tbody>
							{/* <tbody className="checkout-details">
								<tr>
									<td>Subtotal</td>
									<td>${Subtotal}</td>
								</tr>
								<tr>
									<td>Shipping</td>
									<td>${shipping}</td>
								</tr>
								<tr>
									<td>Total</td>
									<td>${Subtotal+shipping}</td>
								</tr>
							</tbody> */}
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	{/* end check out section */}


	{/* logo carousel  */}
	<AppCompanies/>
	 {/* end logo carousel  */}

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
