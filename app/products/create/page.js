"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";
import { PaystackConsumer } from 'react-paystack';


import AppHead from "@/app/Components/AppHead";
import AppScripts from "@/app/Components/AppScripts";
import AppHeader from "../../Components/AppHeader";
import AppFooter from "../../Components/AppFooter";
import AppCopyRight from "../../Components/AppCopyRight";
import AppCompanies from "../../Components/AppCompanies";
import Script from "next/script";
import { getMyShops, getSession } from "@/app/actions";


export default function Home() {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [carts, setCarts] = useState([]);
	const [shops, setShops] = useState([]);
	const [myShops, setMyShops] = useState([]);
	const [session, setSession] = useState(null);

  useEffect(() => {
    setDomLoaded(true);
	myLoad();
	// LoadSingleProduct();
	getMyShops().then(data=>{
		console.log('====================================');
		console.log("data:",data.length);
		console.log('====================================');
		setMyShops(data);
	});
	getSession().
	then(data=>{
		LoadCarts(data.userToken);
		LoadShops()
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
		setCarts(data.cart);
		let newSubtotal = 0; 
		data.cart.forEach(element => {
			const itemTotal = element.product.price * element.unit;
			newSubtotal += itemTotal;
		});
		setSubtotal(newSubtotal);
		newSubtotal>0?setShipping(5):setShipping(0);
    }).catch((e)=>{
        console.log(e);
    });
  }


  function LoadShops(){
	  getMyShops().then(data=>{
		console.log("My shop:",data)
		setShops(data)
	});
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
						<h1>Add Products</h1>
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
							<div className="single-artcile-bg"></div>
							<p className="blog-meta">
								<span className="author"><i className="fas fa-user"></i> Admin</span>
								<span className="date"><i className="fas fa-calendar"></i> 27 December, 2019</span>
							</p>
							<h2>Pomegranate can prevent heart disease</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint soluta, similique quidem fuga vel voluptates amet doloremque corrupti. Perferendis totam voluptates eius error fuga cupiditate dolorum? Adipisci mollitia quod labore aut natus nobis. Rerum perferendis, nobis hic adipisci vel inventore facilis rem illo, tenetur ipsa voluptate dolorem, cupiditate temporibus laudantium quidem recusandae expedita dicta cum eum. Quae laborum repellat a ut, voluptatum ipsa eum. Culpa fugiat minus laborum quia nam!</p>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, praesentium, dicta. Dolorum inventore molestias velit possimus, dolore labore aliquam aperiam architecto quo reprehenderit excepturi ipsum ipsam accusantium nobis ducimus laudantium.</p>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum est aperiam voluptatum id cupiditate quae corporis ex. Molestias modi mollitia neque magni voluptatum, omnis repudiandae aliquam quae veniam error! Eligendi distinctio, ab eius iure atque ducimus id deleniti, vel alias sint similique perspiciatis saepe necessitatibus non eveniet, quo nisi soluta.</p>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt beatae nemo quaerat, doloribus obcaecati odio!</p>
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
						<div className="archive-posts">
							<h4>Archive Posts</h4>
							<ul>
								<li><a href="single-news.html">JAN 2019 (5)</a></li>
								<li><a href="single-news.html">FEB 2019 (3)</a></li>
								<li><a href="single-news.html">MAY 2019 (4)</a></li>
								<li><a href="single-news.html">SEP 2019 (4)</a></li>
								<li><a href="single-news.html">DEC 2019 (3)</a></li>
							</ul>
						</div>
						<div className="tag-section">
							<h4>Tags</h4>
							<ul>
								<li><a href="single-news.html">Apple</a></li>
								<li><a href="single-news.html">Strawberry</a></li>
								<li><a href="single-news.html">BErry</a></li>
								<li><a href="single-news.html">Orange</a></li>
								<li><a href="single-news.html">Lemon</a></li>
								<li><a href="single-news.html">Banana</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	{/* End Shop About  */}

	{/* Shop Products  */}
	<div className="latest-news mt-150 mb-150">
		<div className="container">
		<h3>Shop Products</h3>
			<div className="row">
				<div className="col-lg-4 col-md-6">
					<div className="single-latest-news">
						<a href="single-news.html"><div className="latest-news-bg news-bg-1"></div></a>
						<div className="news-text-box">
							<h3><a href="single-news.html">You will vainly look for fruit on it in autumn.</a></h3>
							<p className="blog-meta">
								<span className="author"><i className="fas fa-user"></i> Admin</span>
								<span className="date"><i className="fas fa-calendar"></i> 27 December, 2019</span>
							</p>
							<p className="excerpt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus laborum autem, dolores inventore, beatae nam.</p>
							<a href="single-news.html" className="read-more-btn">read more <i className="fas fa-angle-right"></i></a>
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-md-6">
					<div className="single-latest-news">
						<a href="single-news.html"><div className="latest-news-bg news-bg-2"></div></a>
						<div className="news-text-box">
							<h3><a href="single-news.html">A man's worth has its season, like tomato.</a></h3>
							<p className="blog-meta">
								<span className="author"><i className="fas fa-user"></i> Admin</span>
								<span className="date"><i className="fas fa-calendar"></i> 27 December, 2019</span>
							</p>
							<p className="excerpt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus laborum autem, dolores inventore, beatae nam.</p>
							<a href="single-news.html" className="read-more-btn">read more <i className="fas fa-angle-right"></i></a>
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-md-6">
					<div className="single-latest-news">
						<a href="single-news.html"><div className="latest-news-bg news-bg-3"></div></a>
						<div className="news-text-box">
							<h3><a href="single-news.html">Good thoughts bear good fresh juicy fruit.</a></h3>
							<p className="blog-meta">
								<span className="author"><i className="fas fa-user"></i> Admin</span>
								<span className="date"><i className="fas fa-calendar"></i> 27 December, 2019</span>
							</p>
							<p className="excerpt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus laborum autem, dolores inventore, beatae nam.</p>
							<a href="single-news.html" className="read-more-btn">read more <i className="fas fa-angle-right"></i></a>
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-md-6">
					<div className="single-latest-news">
						<a href="single-news.html"><div className="latest-news-bg news-bg-4"></div></a>
						<div className="news-text-box">
							<h3><a href="single-news.html">Fall in love with the fresh orange</a></h3>
							<p className="blog-meta">
								<span className="author"><i className="fas fa-user"></i> Admin</span>
								<span className="date"><i className="fas fa-calendar"></i> 27 December, 2019</span>
							</p>
							<p className="excerpt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus laborum autem, dolores inventore, beatae nam.</p>
							<a href="single-news.html" className="read-more-btn">read more <i className="fas fa-angle-right"></i></a>
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-md-6">
					<div className="single-latest-news">
						<a href="single-news.html"><div className="latest-news-bg news-bg-5"></div></a>
						<div className="news-text-box">
							<h3><a href="single-news.html">Why the berries always look delecious</a></h3>
							<p className="blog-meta">
								<span className="author"><i className="fas fa-user"></i> Admin</span>
								<span className="date"><i className="fas fa-calendar"></i> 27 December, 2019</span>
							</p>
							<p className="excerpt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus laborum autem, dolores inventore, beatae nam.</p>
							<a href="single-news.html" className="read-more-btn">read more <i className="fas fa-angle-right"></i></a>
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-md-6">
					<div className="single-latest-news">
						<a href="single-news.html"><div className="latest-news-bg news-bg-6"></div></a>
						<div className="news-text-box">
							<h3><a href="single-news.html">Love for fruits are genuine of John Doe</a></h3>
							<p className="blog-meta">
								<span className="author"><i className="fas fa-user"></i> Admin</span>
								<span className="date"><i className="fas fa-calendar"></i> 27 December, 2018</span>
							</p>
							<p className="excerpt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus laborum autem, dolores inventore, beatae nam.</p>
							<a href="single-news.html" className="read-more-btn">read more <i className="fas fa-angle-right"></i></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	{/* End Shop Products  */}

	 {/* Add product form  */}
	<div className="contact-from-section mt-150 mb-150" id="add-product">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 mb-5 mb-lg-0">
					<div className="form-title">
						<h2>Add Product</h2>
						{/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, ratione! Laboriosam est, assumenda. Perferendis, quo alias quaerat aliquid. Corporis ipsum minus voluptate? Dolore, esse natus!</p> */}
					</div>
				 	<div id="form_status"></div>
					<div className="contact-form">
						<form type="POST" id="fruitkha-contact">
							<p>
								<input type="text" placeholder="Name" name="name" id="name"/> <a></a>
								<input type="text" placeholder="Type" name="type" id="type"/>
							</p>
							<p>
								<input type="number" placeholder="Quantity" name="unit" id="unit" min={1}/> <a></a>
								<input type="text" placeholder="Suplier" name="suplier" id="suplier"/>
							</p>
							<p>
							<input type="number" placeholder="Price" name="price" id="price" min={1}/> <a></a>
							<input type="text" placeholder="banner" name="banner" id="banner"/>
							
							</p>
							<p>	
							<select id="shop_id" name="shop_id" required>
									<option value="">Select shop</option>
									
									{shops.map((shop,index)=>(
										<option key={index} value={shop._id}>{shop.name}</option>))}
								</select>
							</p>
							<p><textarea name="desc" id="desc" cols="30" rows="10" placeholder="Description"></textarea></p>
							<input type="hidden" name="token" value="FsWga4&@f6aw" />
							<p><a className="boxed-btn" id="Add_Product_btn">Submit</a></p>
						</form>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="contact-form-wrap">
						<div className="contact-form-box">
							<h4><i className="fas fa-map"></i> Shop Address</h4>
							<p>34/8, East Hukupara <br/> Gifirtok, Sadan. <br/> Country Name</p>
						</div>
						<div className="contact-form-box">
							<h4><i className="far fa-clock"></i> Shop Hours</h4>
							<p>MON - FRIDAY: 8 to 9 PM <br/> SAT - SUN: 10 to 8 PM </p>
						</div>
						<div className="contact-form-box">
							<h4><i className="fas fa-address-book"></i> Contact</h4>
							<p>Phone: +00 111 222 3333 <br/> Email: support@fruitkha.com</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end add product form  */}

	 {/* Comments */}
	 <div className="mt-150 mb-150">
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
	</div>
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
