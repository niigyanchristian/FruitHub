"use client";

import { useEffect, useState } from "react";
import AppHead from "./Components/AppHead";
import AppScripts from "./Components/AppScripts";
import AppPreLoader from "./Components/AppPreLoader";
import AppHeader from "./Components/AppHeader";
import AppFooter from "./Components/AppFooter";
import AppCopyRight from "./Components/AppCopyRight";
import AppCompanies from "./Components/AppCompanies";
import { AddToCart, GetAllShops, GetProducts } from "./actions";
import ShopComponent from "./Components/ShopComponent";
import AppProductCard from "./Components/AppProductCard";


export default function Home() {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [products, setProducts] = useState([]);
	const [promotionProduct, setPromotionProduct] = useState(null);
	const [promotionShop, setPromotionShop] = useState(null);
	const [allShops, setAllShops] = useState([]);


  useEffect(() => {
    setDomLoaded(true);
	myLoad();
	GetProducts().then(data=>{
		console.log('============Data================');
		console.log(data);
		console.log('====================================');
		if(data.products.length>0){
			setProducts(data.products.slice(0,3));
			const randomIndex = Math.floor(Math.random() * data.products.length);
			setPromotionProduct(data.products[randomIndex]);
		}

		return GetAllShops();
	}).then(data=>{
		if(data.length>0){
			setAllShops(data.reverse().slice(0,3));
			const randomIndex = Math.floor(Math.random() * data.length);
			setPromotionShop(data[randomIndex]);
		}
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
    {/* PreLoader Ends */}
	
	 {/* header  */}
	<AppHeader/>
	 {/* end header  */}
	
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
	 {/* end search area  */}

	 {/* hero area  */}
	<div className="hero-area hero-bg">
		<div className="container">
			<div className="row">
				<div className="col-lg-9 offset-lg-2 text-center">
					<div className="hero-text">
						<div className="hero-text-tablecell">
							<p className="subtitle">Fresh & Organic</p>
							<h1>Delicious Seasonal Fruits</h1>
							<div className="hero-btns">
								<a href="/products" className="boxed-btn">Fruit Collection</a>
								<a href="contact.html" className="bordered-btn">Shop list</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	 {/* features list section  */}
	<div className="list-section pt-80 pb-80">
		<div className="container">

			<div className="row">
				<div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
					<div className="list-box d-flex align-items-center">
						<div className="list-icon">
							<i className="fas fa-shipping-fast"></i>
						</div>
						<div className="content">
							<h3>Free Shipping</h3>
							<p>When order over GH₵75</p>
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
					<div className="list-box d-flex align-items-center">
						<div className="list-icon">
							<i className="fas fa-phone-volume"></i>
						</div>
						<div className="content">
							<h3>24/7 Support</h3>
							<p>Get support all day</p>
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-md-6">
					<div className="list-box d-flex justify-content-start align-items-center">
						<div className="list-icon">
							<i className="fas fa-sync"></i>
						</div>
						<div className="content">
							<h3>Refund</h3>
							<p>Get refund within 3 days!</p>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
	 {/* end features list section  */}

	 {/* product section  */}
	<div className="product-section mt-150 mb-150">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2 text-center">
					<div className="section-title">	
						<h3><span className="orange-text">Our</span> Products</h3>
						<p>Explore Some of the Amazing Fruits Available on FruitHub</p>
					</div>
				</div>
			</div>

			<div className="row">
				{products.map((product,index)=>(
					<AppProductCard key={index} product={product}/>
				))}
			</div>
		</div>
	</div>
	 {/* end product section  */}

	 {/* Promotion section  */}
	{promotionProduct&&<section className="cart-banner pt-100 pb-100">
    	<div className="container">
        	<div className="row clearfix">
            	{/* Image Column */}
            	<div className="image-column col-lg-6">
                	<div className="image">
                    	<div className="price-box">
                        	<div className="inner-price">
                                <span className="price">
                                    <strong>30%</strong> <br/> off per kg
                                </span>
                            </div>
                        </div>
                    	<img src="assets/img/a.jpg" alt=""/>
                    </div>
                </div>
                {/* Content Column */}
                <div className="content-column col-lg-6">
					<h3><span className="orange-text">Deal</span> of the month</h3>
                    <h4>{promotionProduct.name}</h4>
                    <div className="text">{promotionProduct.desc}</div>
                    {/* Countdown Timer */}
                    <div className="time-counter"><div className="time-countdown clearfix" data-countdown="2020/2/01"><div className="counter-column"><div className="inner"><span className="count">00</span>Days</div></div> <div className="counter-column"><div className="inner"><span className="count">00</span>Hours</div></div>  <div className="counter-column"><div className="inner"><span className="count">00</span>Mins</div></div>  <div className="counter-column"><div className="inner"><span className="count">00</span>Secs</div></div></div></div>
                	<a className="cart-btn mt-3"><i className="fas fa-shopping-cart" 
					onClick={async()=>{
						const res = await AddToCart(promotionProduct._id,1,promotionProduct.shop_id);
						if(res){
							alert("Cart has been added successfully!");
						}
					}}></i> Add to Cart</a>
                </div>
            </div>
        </div>
    </section>}
     {/* end promotion section  */}

	 {/* testimonail-section  */}
	<div className="testimonail-section mt-150 mb-150">
		<div className="container">
			<div className="row">
				<div className="col-lg-10 offset-lg-1 text-center">
					<div className="testimonial-sliders">
						<div className="single-testimonial-slider">
							<div className="client-avater">
								<img src="assets/img/avaters/avatar1.png" alt=""/>
							</div>
							<div className="client-meta">
								<h3>Saira Hakim <span>Local shop owner</span></h3>
								<p className="testimonial-body">
									" Just ordered some fresh apples and oranges from FruitHub, and I’m thrilled with the quality! The variety is fantastic, and the delivery was right on time. I’ll definitely be a repeat customer. Great job, FruitHub! "
								</p>
								<div className="last-icon">
									<i className="fas fa-quote-right"></i>
								</div>
							</div>
						</div>
						<div className="single-testimonial-slider">
							<div className="client-avater">
								<img src="assets/img/avaters/avatar2.png" alt=""/>
							</div>
							<div className="client-meta">
								<h3>David Niph <span>Local shop owner</span></h3>
								<p className="testimonial-body">
									" FruitHub makes it so easy to find and buy fresh fruit. The site is user-friendly, and the detailed descriptions and pictures really help in choosing the best options. My recent order arrived in perfect condition, and the fruits are delicious! Thanks for making fruit shopping so convenient." "
								</p>
								<div className="last-icon">
									<i className="fas fa-quote-right"></i>
								</div>
							</div>
						</div>
						{/* <div className="single-testimonial-slider">
							<div className="client-avater">
								<img src="assets/img/avaters/avatar3.png" alt=""/>
							</div>
							<div className="client-meta">
								<h3>Jacob Sikim <span>Local shop owner</span></h3>
								<p className="testimonial-body">
									" Sed ut perspiciatis unde omnis iste natus error veritatis et  quasi architecto beatae vitae dict eaque ipsa quae ab illo inventore Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium "
								</p>
								<div className="last-icon">
									<i className="fas fa-quote-right"></i>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end testimonail-section  */}
	
	 {/* advertisement section  */}
	{promotionShop&&<div className="abt-section mb-150">
		<div className="container">
			<div className="row">
				<div className="col-lg-6 col-md-12">
					<div className="abt-bg">
						<a href="https://www.youtube.com/watch?v=DBLlFWYcIGQ" className="video-play-btn popup-youtube"><i className="fas fa-play"></i></a>
					</div>
				</div>
				<div className="col-lg-6 col-md-12">
					<div className="abt-text">
						<p className="top-sub">Since Year 1999</p>
						<h2>We are <span className="orange-text">{promotionShop.name}</span></h2>
						<p>{promotionShop.name}</p>
						<a href={`/shop/${promotionShop._id}`} className="boxed-btn mt-4">know more</a>
					</div>
				</div>
			</div>
		</div>
	</div>}
	 {/* end advertisement section  */}
	
	 {/* shop banner  */}
	{promotionShop&&<section className="shop-banner">
    	<div className="container">
        	<h3>July sale is on! <br/> with big <span className="orange-text">Discount...</span></h3>
            <div className="sale-percent"><span>Sale! <br/> Upto</span>30% <span>off</span></div>
            <a href={`/shop/${promotionShop._id}`} className="cart-btn btn-lg">Shop Now</a>
        </div>
    </section>}
	 {/* end shop banner  */}

	 {/* latest shops  */}
		<ShopComponent shops={allShops}/>
	 {/* end latest shops  */}

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
)}</>);}
