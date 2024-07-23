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
import { FindDeliveiresByIds, getSession, GetShoppingDetails } from "../actions";
import AppMapComponent from "../Components/AppMapComponent";

export default function Home() {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [orders, setOrders] = useState([]);
	const [mapoOrders, setMapOrders] = useState(null);
	const [carts, setCarts] = useState([]);
	const [wishlist, setWishlist] = useState([]);
	const [Subtotal, setSubtotal] = useState(0);
	const [shipping, setShipping] = useState(0);

  useEffect(() => {
    setDomLoaded(true);
	myLoad();

	GetShoppingDetails().
	then(data=>{
		// console.log('====================================');
		// console.log("Order:",data.orders);
		// console.log('====================================');
		setCarts(data.cart)
		setOrders(data.orders);
		setWishlist(data.wishlist);
		const orderIds = data.orders.map(order => order.orderId);

		
		return FindDeliveiresByIds(orderIds)
	}).then(data=>{
		console.log('====================================');
		console.log(data);
		setMapOrders(data)
		console.log('====================================');
	})
	// LoadSingleProduct();
  }, []);

  function myLoad(){
	setTimeout(()=>{
		setPreLoader(false)
	},1500)
  }



 
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


	{mapoOrders&&<AppMapComponent orders={mapoOrders}/>}
	{/* check out section */}
	<div className="checkout-section mt-150 mb-150">
		<div className="container">
		<h3 className="">RECENT ORDERS</h3>
			<div className="row">
				<div className="col-lg-8">
					<div className="checkout-accordion-wrap">
						<div className="accordion" id="accordionExample">
						  {orders.map((order)=>(
							<div className="card single-accordion">
						    <div className="card-header" id="headingOne">
						      <h5 className="mb-0">
						        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                ORDER #FUR10001
						        </button>
						      </h5>
						    </div>

						    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
						      <div className="card-body">
						        <div className="billing-address-form">
						        	<span className="fas fa-calendar-alt ml-2"> {order.date.toString().substr(0,10)}</span>
						        	<div className="progressbar-track">
                                    <ul className="progressbar row">
                                        <li id="step-1" className="text-muted green mr-5">
                                            <span className="fas fa-gift ml-2"> Placed</span>
                                        </li>
                                        <li id="step-2" className="text-muted green">
                                            <span className="fas fa-check ml-2"> Accepted</span>
                                        </li>
                                        <li id="step-3" className="text-muted green mx-5">
                                            <span className="fas fa-box ml-2"> Packed</span>
                                        </li>
                                        <li id="step-4" className="text-muted green ">
                                            <span className="fas fa-truck ml-2"> Shipped</span>
                                        </li>
                                        <li id="step-5" className="text-muted green mx-5">
                                            <span className="fas fa-box-open ml-2"> Delivered</span>
                                        </li>
                                    </ul>
                                    </div>
                                    {/* <div id="tracker"></div> */}
						        </div>
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
						{/* <a onClick={()=>PlaceOrder()} className="boxed-btn">Place Order</a> */}
						{/* <PaystackConsumer {...componentProps} >
          {({initializePayment}) => <a className="boxed-btn" onClick={() => initializePayment(handleSuccess, handleClose)}>Place Order</a>}
        </PaystackConsumer> */}
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
