"use client";
import { useEffect, useState } from "react";

import AppHead from "@/app/Components/AppHead";
import AppScripts from "@/app/Components/AppScripts";
import AppHeader from "../Components/AppHeader";
import AppFooter from "../Components/AppFooter";
import AppCopyRight from "../Components/AppCopyRight";
import AppCompanies from "../Components/AppCompanies";
import { FindDeliveiresByIds, GetShoppingDetails } from "../actions";
import AppPreLoader from "../Components/AppPreLoader";


export default function Home() {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [orders, setOrders] = useState([]);
	const [carts, setCarts] = useState([]);
	const [wishlist, setWishlist] = useState([]);
	const [selected, setSelected] = useState();

  useEffect(() => {
    setDomLoaded(true);
	myLoad();

	GetShoppingDetails().
	then(data=>{
		setCarts(data.cart);
		setWishlist(data.wishlist);
		const orderIds = data.orders.map(order => order.orderId);
		return FindDeliveiresByIds(orderIds);
	}).then(data=>{
		setOrders(data);
	});
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
    {preLoad&&<AppPreLoader/>}
	
	{/* header */}
	<AppHeader/>
	
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
                                ORDER #FUR{order.orderId.toString().substr(0,8)}
						        </button>
						      </h5>
						    </div>

						    <div id="collapseOne" className={`collapse ${selected==order._id?'show':''}`} aria-labelledby="headingOne" data-parent="#accordionExample">
						      <div className="card-body">
						        <div className="billing-address-form">
						        	<span className="fas fa-calendar-alt ml-2"> {order.createdAt.toString().substr(0,10)}</span>
						        	<div className="progressbar-track">
                                    <ul className="progressbar row">
                                        <li id="step-1" className="text-muted green mr-5">
                                            <span className="fas fa-box ml-2" style={{color:order.status=='On Hold'?'#F28123':null}}> On Hold</span>
                                        </li>
                                        <li id="step-2" className="text-muted green mx-5">
                                            <span className="fas fa-gift ml-2" style={{color:order.status=='Ready'?'#F28123':null}}> Ready</span>
                                        </li>
                                        <li id="step-3" className="text-muted green ">
                                            <span className="fas fa-truck ml-2" style={{color:order.status=='Shipping'?'#F28123':null}}> Shipped</span>
                                        </li>
                                        <li id="step-4" className="text-muted green mx-5">
                                            <span className="fas fa-box-open ml-2" style={{color:order.status=='Delivered'?'#F28123':null}}> Delivered</span>
                                        </li>
                                    </ul>
                                    </div>
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
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>


	{/* logo carousel  */}
	<AppCompanies/>

	{/* footer  */}
	<AppFooter/>
	
	 {/* copyright  */}
	<AppCopyRight/>
	
    <AppScripts/>
</body>
</html>
)}
</>
  );
}
