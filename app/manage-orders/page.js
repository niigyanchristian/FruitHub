"use client";
import { useEffect, useState } from "react";


import AppHead from "@/app/Components/AppHead";
import AppScripts from "@/app/Components/AppScripts";
import AppHeader from "../Components/AppHeader";
import AppFooter from "../Components/AppFooter";
import AppCopyRight from "../Components/AppCopyRight";
import AppCompanies from "../Components/AppCompanies";
import { FindDeliveiresByIds, GetAllOrders, UpdateOrder } from "../actions";
import AppMapComponent from "../Components/AppMapComponent";
import AppPreLoader from "../Components/AppPreLoader";

export default function Home() {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [orders, setOrders] = useState([]);
	const [selected, setSelected] = useState();
	const [mapOrders, setMapOrders] = useState(null);
	const [carts, setCarts] = useState([]);
	const [wishlist, setWishlist] = useState([]);
	const [status, setStatus] = useState('');

	const handleChangeStatus = (event) => {
		setStatus(event.target.value);
	  };
  useEffect(() => {
    setDomLoaded(true);
	myLoad();

	GetAllOrders().
	then(data=>{
		setOrders(data.reverse());
		const orderIds = data.map(order => order.orderId);
		return FindDeliveiresByIds(orderIds)
	}).then(data=>setMapOrders(data))
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

 const handleUpdateOrder =async(orderId)=>{
	var res =await UpdateOrder(orderId,status);
	GetAllOrders().
	then(data=>{
		setOrders(data.reverse());
	});
}

 
  return (
<>
{domLoaded && (
    <html lang="en">
<AppHead/>
<body>
	
	{/* PreLoader */}
    {preLoad&& <AppPreLoader/>}
	
	{/* header */}
	<AppHeader/>

	
	{/* breadcrumb-section */}
	<div className="breadcrumb-section breadcrumb-bg">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2 text-center">
					<div className="breadcrumb-text">
						<p>Fresh and Organic</p>
						<h1>Order Management</h1>
					</div>
				</div>
			</div>
		</div>
	</div>


	{mapOrders&&<AppMapComponent orders={mapOrders}/>}
	{/* check out section */}
	<div className="checkout-section mt-150 mb-150">
		<div className="container">
		<h3 className="">RECENT ORDERS</h3>
			<div className="row">
				<div className="col-lg-8">
					<div className="checkout-accordion-wrap">
						<div className="accordion" id="accordionExample">
						  {orders.map((order,index)=>(
							<div key={index} className="card single-accordion">
						    <div onClick={()=>{
								if(order._id == selected){
									setSelected('')
									return
								}
								setSelected(order._id)
							}} className="card-header" id="headingOne">
						      <h5 className="mb-0">
						        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                ORDER #FUR{order.orderId.toString().substr(0,8)} - STATUS <a href="#">{order.status}</a>
						        </button>
						      </h5>
						    </div>

						    <div id="collapseOne" className={`collapse ${selected==order._id?'show':''}`} aria-labelledby="headingOne" data-parent="#accordionExample">
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
							  <div className="card-body">
						        <div className="billing-address-form">
										<label>Change status</label>
						        	<form onSubmit={handleSubmit}>
										<p>
										<select value={order.status} onChange={handleChangeStatus}>
											{/* <option value="">{order.status}</option> */}
											<option value="On Hold">On Hold</option>
											<option value="Ready">Ready</option>
											<option value="Shipping">Shipping</option>
											<option value="Delivered">Delivered</option>
											<option value="Cancelled">Cancelled</option>
										</select>
										</p>
										<a className="cart-btn"
										onClick={async ()=>handleUpdateOrder(order._id)}>
										Submit
										</a>
						        	</form>
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
									<th>Order Status</th>
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
