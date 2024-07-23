"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";
import { PaystackConsumer } from 'react-paystack';


import AppHead from "@/app/Components/AppHead";
import AppScripts from "@/app/Components/AppScripts";
import AppHeader from "../Components/AppHeader";
import AppFooter from "../Components/AppFooter";
import AppCopyRight from "../Components/AppCopyRight";
import AppCompanies from "../Components/AppCompanies";
import { getSession, GetShoppingDetails, PlaceOrder } from "../actions";

export default function Home() {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [carts, setCarts] = useState([]);
	const [Subtotal, setSubtotal] = useState(0);
	const [shipping, setShipping] = useState(0);
	const [session, setSession] = useState(null);
	const [config, setConfig] = useState(null);

	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [contact, setContact] = useState('');
	const [note, setNote] = useState('');

	const handleChangeName = (event) =>setName(event.target.value);
	const handleChangeAddress = (event) =>setAddress(event.target.value);
	const handleChangeContact = (event) =>setContact(event.target.value);
	const handleChangeNote = (event) =>setNote(event.target.value);

  useEffect(() => {
    setDomLoaded(true);
	myLoad();

	getSession().
	then(data=>{
		setSession(data)
		return GetShoppingDetails();
	}).then(data=>{
		setCarts(data.cart);
		var newSubtotal = 0; 
		data.cart.forEach(element => {
			const itemTotal = element.product.price * element.unit;
			newSubtotal += itemTotal;
		});
		setSubtotal(newSubtotal);

		var shippingCal = newSubtotal>0?5:0;
		newSubtotal>0?setShipping(shippingCal):setShipping(shippingCal);

		setConfig({
			reference: (new Date()).getTime().toString(),
			email: data.email,
			amount: (newSubtotal+shippingCal)*100,
			publicKey: process.env.NEXT_PUBLIC_PAYMENT_API_KEY,
			currency:'GHS'
		});
	});
	// getSession().
	// then(data=>{
	// 	LoadCarts(data.userToken);
	// 	setSession(data);
	// 	setConfig({
	// 		reference: (new Date()).getTime().toString(),
	// 		email: data?.userEmail,
	// 		amount: (Subtotal+shipping)*100,
	// 		publicKey: process.env.NEXT_PUBLIC_PAYMENT_API_KEY,
	// 		currency:'GHS'
	// 	})
	// })
	
  }, []);

  function myLoad(){
	setTimeout(()=>{
		setPreLoader(false)
	},1500)
  }

// you can call this function anything
const handleSuccess = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
	if(reference.status=='success'){
		const res =await PlaceOrder(reference.reference,name,address,contact,note);
		if(res){
			alert("Order has been placed successfully");
		}
		GetShoppingDetails().
		then(data=>{
			setCarts(data.cart);
			var newSubtotal = 0; 
			data.cart.forEach(element => {
				const itemTotal = element.product.price * element.unit;
				newSubtotal += itemTotal;
			});
			setSubtotal(newSubtotal);

			var shippingCal = newSubtotal>0?5:0;
			newSubtotal>0?setShipping(shippingCal):setShipping(shippingCal);
		});
		setConfig(null)
	// 	GetShoppingDetails();
	// }).then(data=>{
	// 	setCarts(data.cart);
	// 	var newSubtotal = 0; 
	// 	data.cart.forEach(element => {
	// 		const itemTotal = element.product.price * element.unit;
	// 		newSubtotal += itemTotal;
	// 	});
	// 	setSubtotal(newSubtotal);

	// 	var shippingCal = newSubtotal>0?5:0;
	// 	newSubtotal>0?setShipping(shippingCal):setShipping(shippingCal);

	}
  };

  // you can call this function anything
  const handleClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const componentProps = {
	...config,
	text: 'Paystack Button Implementation',
	onSuccess: (reference) => handleSuccess(reference),
	onClose: handleClose
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
						<h1>Check Out Product</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
	{/* end breadcrumb section */}

	{/* check out section */}
	<div className="checkout-section mt-150 mb-150">
		<div className="container">
			<div className="row">
				<div className="col-lg-8">
					<div className="checkout-accordion-wrap">
						<div className="accordion" id="accordionExample">
						  <div className="card single-accordion">
						    <div className="card-header" id="headingOne">
						      <h5 className="mb-0">
						        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
						          Billing Address
						        </button>
						      </h5>
						    </div>

						    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
						      <div className="card-body">
						        <div className="billing-address-form">
						        	<form action="index.html">
						        		<p><input type="text" placeholder="Name"
										value={name}
										onChange={handleChangeName}/></p>
						        		<p><input type="text" placeholder="Address"
										value={address}
										onChange={handleChangeAddress}/></p>
						        		<p><input type="tel" placeholder="Contact"
										value={contact}
										onChange={handleChangeContact}
										/></p>
						        		<p><textarea name="bill" id="bill" cols="30" rows="10" placeholder="Say Something"
										value={note}
										onChange={handleChangeNote}></textarea></p>
						        	</form>
						        </div>
						      </div>
						    </div>
						  </div>
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
									<td>Product</td>
									<td>Total</td>
								</tr>
								{carts.map((cart)=>(
									<tr>
									<td>{cart.product.name}</td>
									<td>${cart.product.price*cart.unit}</td>
								</tr>
								))}
							</tbody>
							<tbody className="checkout-details">
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
							</tbody>
						</table>
						{/* <a onClick={()=>PlaceOrder()} className="boxed-btn">Place Order</a> */}
						{config&&<PaystackConsumer {...componentProps} >
          {({initializePayment}) => <a className="boxed-btn" onClick={() => initializePayment(handleSuccess, handleClose)}>Place Order</a>}
        </PaystackConsumer>}
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
