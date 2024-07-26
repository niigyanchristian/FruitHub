"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";

import AppHead from "@/app/Components/AppHead";
import AppScripts from "@/app/Components/AppScripts";
import AppHeader from "../Components/AppHeader";
import AppFooter from "../Components/AppFooter";
import AppCopyRight from "../Components/AppCopyRight";
import { getSession } from "../actions";




export default function Home() {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [carts, setCarts] = useState([]);
	const [Subtotal, setSubtotal] = useState(0);
	const [shipping, setShipping] = useState(0);
	const [session, setSession] = useState(null);

  useEffect(() => {
    setDomLoaded(true);
	myLoad();
	getSession().
	then(data=>{
		LoadCarts(data.userToken);
		setSession(data);
	})
  }, []);


  function myLoad(){
	setTimeout(()=>{
		setPreLoader(false)
	},1500)
  }


  function LoadCarts(token){


	fetch('http://localhost:8000/customer/shoping-details',{
        method:'get',
		headers: {
			'Authorization': `Bearer ${token}`
		},
    }).then((data)=>{
        return data.json();
    }).then(data=>{
        let newSubtotal = 0; 
		data.cart.forEach(element => {
			const itemTotal = element.product.price * element.unit;
			newSubtotal += itemTotal;
		});
		setSubtotal(newSubtotal);
		newSubtotal>0?setShipping(5):setShipping(0);
		setCarts(data.cart)
		console.log('====================================');
		console.log(data.cart);
		console.log('====================================');
    }).catch((e)=>{
        console.log(e);
    });
  }

  function DeleteCart(productId,token){

	console.log("my token",token)
	fetch(`http://localhost:8000/cart/${productId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	})
	.then(response => response.json())
	.then(data => LoadCarts(token))
	.catch(error => console.error('Error:', error));
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
						<h1>Cart</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end breadcrumb section */}

	 {/* cart */}
	<div className="cart-section mt-150 mb-150">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 col-md-12">
					<div className="cart-table-wrap">
						<table className="cart-table">
							<thead className="cart-table-head">
								<tr className="table-head-row">
									<th className="product-remove"></th>
									<th className="product-image">Product Image</th>
									<th className="product-name">Name</th>
									<th className="product-price">Price</th>
									<th className="product-quantity">Quantity</th>
									<th className="product-total">Total</th>
								</tr>
							</thead>
							<tbody>

								{carts.map((cart,index)=>(
									<tr key={index} className="table-body-row">
									<td className="product-remove"><a onClick={()=>{
										DeleteCart(cart.product._id,session.userToken)
									}}><i className="far fa-window-close"></i></a></td>
									<td className="product-image"><img src={`/assets/img/products/${cart.product.banner}`} alt=""/></td>
									<td className="product-name">{cart.product.name}</td>
									<td className="product-price">${cart.product.price}</td>
									<td className="product-quantity"><input type="number" value={cart.unit}/></td>
									<td className="product-total">{cart.product.price*cart.unit}</td>
								</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div className="col-lg-4">
					<div className="total-section">
						<table className="total-table">
							<thead className="total-table-head">
								<tr className="table-total-row">
									<th>Total</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody>
								<tr className="total-data">
									<td><strong>Subtotal: </strong></td>
									<td>${Subtotal}</td>
								</tr>
								<tr className="total-data">
									<td><strong>Shipping: </strong></td>
									<td>${shipping}</td>
								</tr>
								<tr className="total-data">
									<td><strong>Total: </strong></td>
									<td>${Subtotal+shipping}</td>
								</tr>
							</tbody>
						</table>
						<div className="cart-buttons">
							{/* <a href="cart.html" className="boxed-btn">Update Cart</a> */}
							<a href="/checkout" className="boxed-btn black">Check Out</a>
						</div>
					</div>

					<div className="coupon-section">
						<h3>Apply Coupon</h3>
						<div className="coupon-form-wrap">
							<form action="index.html">
								<p><input type="text" placeholder="Coupon"/></p>
								<p><input type="submit" value="Apply"/></p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end cart */}

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
