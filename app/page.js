"use client";
import { NextScript } from "next/document";
import Script from "next/script";
import { useEffect, useState } from "react";
import AppHead from "./Components/AppHead";
import AppScripts from "./Components/AppScripts";
import AppPreLoader from "./Components/AppPreLoader";
import Link from "next/link";
import AppHeader from "./Components/AppHeader";
import AppFooter from "./Components/AppFooter";
import AppCopyRight from "./Components/AppCopyRight";
import AppCompanies from "./Components/AppCompanies";
import { AddToCart, getAllShops, getMyShops, getSession } from "./actions";
import { redirect } from "next/navigation";
import ShopComponent from "./Components/ShopComponent";
// import 'assets/js/bootstrap.bundle.min.js';

export default function Home() {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [products, setProducts] = useState([]);
	const [allShops, setAllShops] = useState([]);
	const [session, setSession] = useState(null);
	const [myShops, setMyShops] = useState(null);


  useEffect(() => {
    setDomLoaded(true);
	LoadProducts()
	myLoad();

	getAllShops().
	then(data=>setAllShops(data.reverse().slice(0,3)));

	getMyShops().then(data=>{
		console.log('====================================');
		console.log("data:",data);
		console.log('====================================');
		setMyShops(data);
	})
	getSession().
	then(data=>{
		setSession(data);
		// console.log("Session:",data)
	})
  }, []);

  function myLoad(){
	setTimeout(()=>{
		setPreLoader(false)
	},1500)
  }


  function LoadProducts(){
	fetch('http://localhost:8000/',{
        method:'get',
    }).then((data)=>{
        return data.json();
    }).then(data=>{
        setProducts(data.products.slice(0,3));
    }).catch((e)=>{
        console.log(e);
    });
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
	<AppHeader myshops={myShops}/>
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
								<a href="shop.html" className="boxed-btn">Fruit Collection</a>
								<a href="contact.html" className="bordered-btn">Contact Us</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end hero area  */}

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
							<p>When order over $75</p>
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
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, fuga quas itaque eveniet beatae optio.</p>
					</div>
				</div>
			</div>

			<div className="row">
				{products.map((product,index)=>(
					<div key={index} className="col-lg-4 col-md-6 text-center">
					<div className="single-product-item">
						<div className="product-image">
							<a href={`/product/${product._id}`}><img src={`assets/img/products/${product.banner}`} alt=""/></a>
						</div>
						<h3>{product.name}</h3>
						<p className="product-price"><span>{product.unit} in stock</span> ${product.price} </p>
						{product.unit>0?(<a onClick={async ()=>{
							var res = await AddToCart(product._id,1,product.shop_id);
							if(res){
								alert("Cart has been added successfully!");
							}
						}} className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>):(<a className="cart-btn" style={{textDecoration:'line-through',backgroundColor:'#a8a8a8'}}><i className="fas fa-shopping-cart"></i>Unavailable</a>)}
					</div>
				</div>
				))}
			</div>
		</div>
	</div>
	 {/* end product section  */}

	 {/* cart banner section  */}
	<section className="cart-banner pt-100 pb-100">
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
                    <h4>Hikan Strwaberry</h4>
                    <div className="text">Quisquam minus maiores repudiandae nobis, minima saepe id, fugit ullam similique! Beatae, minima quisquam molestias facere ea. Perspiciatis unde omnis iste natus error sit voluptatem accusant</div>
                    {/* Countdown Timer */}
                    <div className="time-counter"><div className="time-countdown clearfix" data-countdown="2020/2/01"><div className="counter-column"><div className="inner"><span className="count">00</span>Days</div></div> <div className="counter-column"><div className="inner"><span className="count">00</span>Hours</div></div>  <div className="counter-column"><div className="inner"><span className="count">00</span>Mins</div></div>  <div className="counter-column"><div className="inner"><span className="count">00</span>Secs</div></div></div></div>
                	<a href="cart.html" className="cart-btn mt-3"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
                </div>
            </div>
        </div>
    </section>
     {/* end cart banner section  */}

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
									" Sed ut perspiciatis unde omnis iste natus error veritatis et  quasi architecto beatae vitae dict eaque ipsa quae ab illo inventore Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium "
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
									" Sed ut perspiciatis unde omnis iste natus error veritatis et  quasi architecto beatae vitae dict eaque ipsa quae ab illo inventore Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium "
								</p>
								<div className="last-icon">
									<i className="fas fa-quote-right"></i>
								</div>
							</div>
						</div>
						<div className="single-testimonial-slider">
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
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end testimonail-section  */}
	
	 {/* advertisement section  */}
	<div className="abt-section mb-150">
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
						<h2>We are <span className="orange-text">Fruitkha</span></h2>
						<p>Etiam vulputate ut augue vel sodales. In sollicitudin neque et massa porttitor vestibulum ac vel nisi. Vestibulum placerat eget dolor sit amet posuere. In ut dolor aliquet, aliquet sapien sed, interdum velit. Nam eu molestie lorem.</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente facilis illo repellat veritatis minus, et labore minima mollitia qui ducimus.</p>
						<a href="about.html" className="boxed-btn mt-4">know more</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end advertisement section  */}
	
	 {/* shop banner  */}
	<section className="shop-banner">
    	<div className="container">
        	<h3>December sale is on! <br/> with big <span className="orange-text">Discount...</span></h3>
            <div className="sale-percent"><span>Sale! <br/> Upto</span>50% <span>off</span></div>
            <a href="shop.html" className="cart-btn btn-lg">Shop Now</a>
        </div>
    </section>
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

)}
</>
  );
}
