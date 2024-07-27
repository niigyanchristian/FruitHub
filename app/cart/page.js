"use client";
import { useEffect, useState } from "react";

import AppHead from "@/app/Components/AppHead";
import AppScripts from "@/app/Components/AppScripts";
import AppHeader from "../Components/AppHeader";
import AppFooter from "../Components/AppFooter";
import AppCopyRight from "../Components/AppCopyRight";
import { DeleteFromCart, GetShoppingDetails } from "../actions";
import AppPreLoader from "../Components/AppPreLoader";

export default function Home() {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [carts, setCarts] = useState([]);
	const [Subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setDomLoaded(true);
	myLoad();
	fetchData().then(data=>{})
  }, []);


  function myLoad(){
	setTimeout(()=>{
		setPreLoader(false)
	},1500)
  }


	const handleDeleteCart=async (productId)=>{
		const res = await DeleteFromCart(productId);
		if(res){
			alert('Cart deleted successfuly!');
		}
		fetchData().then(data=>{})
	}

  const fetchData = async () => {
	try {

	  const { cart } = await GetShoppingDetails();
	  setCarts(cart);

	  const newSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.unit, 0);
	  setSubtotal(newSubtotal);
	} catch (error) {
	  console.error('Error fetching data', error);
	}
  };
  return (
<>
{domLoaded && (
<html lang="en">
<AppHead/>
<body>
	
	{/* PreLoader */}
    {preLoad&& <AppPreLoader/>}
    {/* PreLoader Ends */}
	
	 {/* header */}
		<AppHeader/>
	 {/* end header */}
	
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
									<td className="product-remove"><a onClick={()=>handleDeleteCart(cart.product._id)}><i className="far fa-window-close"></i></a></td>
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
									<td><strong>Total: </strong></td>
									<td>${Subtotal}</td>
								</tr>
							</tbody>
						</table>
						<div className="cart-buttons">
							{/* <a href="cart.html" className="boxed-btn">Update Cart</a> */}
							<a href="/checkout" className="boxed-btn black">Check Out</a>
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
