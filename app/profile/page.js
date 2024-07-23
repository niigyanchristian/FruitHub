"use client"; // This is a client component 👈🏽
import { AddToCart, AddToWishlist, getMyShops, getSession, updatePassword, updateProfle } from "@/app/actions";
import AppHead from "@/app/Components/AppHead";
import AppHeader from "@/app/Components/AppHeader";
import AppScripts from "@/app/Components/AppScripts";
import { useEffect, useState } from "react";
export default function Home({ params }) {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [myShops, setMyShops] = useState(null);
	const [products, setProducts] = useState([]);
	const [singleproducts, setSingleProduct] = useState([]);
	const [session, setSession] = useState(null);

	const [inputFullName, setInputFullName] = useState(''); 
	const [inputUsername, setInputUsername] = useState(''); 
	const [inputEmail, setInputEmail] = useState(''); 
	const [inputPhone, setInputPhone] = useState(''); 
	const [inputPasswordNew, setInputPasswordNew] = useState(''); 
	const [inputPasswordCurrent, setInputPasswordCurrent] = useState(''); 


	const handleChangeFullName = (event) =>setInputFullName(event.target.value);
	const handleChangeUsername = (event) =>setInputUsername(event.target.value);
	const handleChangeEmail = (event) =>setInputEmail(event.target.value);
	const handleChangePhone = (event) =>setInputPhone(event.target.value);
	const handleChangePasswordNew = (event) =>setInputPasswordNew(event.target.value);
	const handleChangePasswordCurrent = (event) =>setInputPasswordCurrent(event.target.value);


  useEffect(() => {
    setDomLoaded(true);
	myLoad();

	getSession().
	then(data=>{
		setSession(data);
		console.log("Session:",data)
		setInputUsername(data.userUsername)
		setInputEmail(data.userEmail)
		setInputPhone(data.userPhone)
		setInputFullName(data.userProfile.full_name)
		return getMyShops();
	})
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
	 {/* end search arewa  */}
	
	 {/* breadcrumb-section  */}
	<div className="breadcrumb-section breadcrumb-bg">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2 text-center">
					<div className="breadcrumb-text">
						<p>See more Details</p>
						<h1>Single Product</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end breadcrumb section  */}

	  {/* Update profile section  */}
	<div class="mt-150 mb-150">
		<div class="container">
			<div class="row">
				<div class="col-lg-8">
					<div class="single-article-section">
						<div class="comments-list-wrap">
							<h3 class="comment-count-title">{session?.userProfile.full_name}</h3>
							<div class="comment-list">
								<div class="single-comment-body">
									<div class="comment-user-avater">
										<img src="assets/img/avaters/avatar1.png" alt=""/>
									</div>
									<div class="comment-text-body">
										<h4>{session?.userUsername}</h4>
										<p><i className="fa fa-envelope"></i> {session?.userEmail}</p>
										<p><i className="fa fa-phone"></i> {session?.userPhone}</p>
										<p><strong>Role:</strong> {session?.userProfile.role}</p>
										<h4>My shops</h4>
										{(!myShops||myShops.length==0)?(<p>You have no shop. <a href="/shop/create">Click here to create one</a></p>):(<ul>
											{myShops?.map((item)=>(
												<li>ekkk</li>
											))}
										</ul>)}
									</div>
								</div>
							</div>
						</div>

						<div class="comment-template">
							<h4>Update profile</h4>
							<p>If you have a comment dont feel hesitate to send us your opinion.</p>
							<form>
								<p>
									<input type="text" placeholder="Full Name"
									value={inputFullName}
									onChange={handleChangeFullName}
									/> <a> </a>
									<input type="text" placeholder="Username"
									value={inputUsername}
									onChange={handleChangeUsername}/>
								</p>

								<p>
									<input type="text" placeholder="Phone"
									value={inputPhone}
									onChange={handleChangePhone}/>
									<input type="email" placeholder="Email"
									value={inputEmail}
									onChange={handleChangeEmail}
									/>
								</p>
								{/* <p><textarea name="comment" id="comment" cols="30" rows="10" placeholder="Your Message"></textarea></p> */}
								<a className="cart-btn" 
								onClick={async()=>{
									var res =await updateProfle(inputUsername,inputEmail,inputPhone,inputFullName);

									if(res==201){
										alert('Profile updated!');
									}
									getSession().
									then(data=>{
										setSession(data);
										setInputUsername(data.userUsername)
										setInputEmail(data.userEmail)
										setInputPhone(data.userPhone)
										setInputFullName(data.userProfile.full_name)
										return getMyShops();
									})
								}}>Update Profile</a>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	 {/* end Update profile section  */}
	 <div className="col-lg-8 mx-auto" style={{height:'1px',backgroundColor:'red'}}></div>
	  {/* Update profile section  */}
	<div class="mt-150 mb-150">
		<div class="container">
			<div class="row">
				<div class="col-lg-8">
					<div class="single-article-section">
						<div class="comment-template">
							<h4>Change password</h4>
							<p>You can change your password here.</p>
							<form>
								<p>
									<input type="password" placeholder="Current password"
									value={inputPasswordCurrent}
									onChange={handleChangePasswordCurrent}
									/>
									<p></p>
									<input type="password" placeholder="New password"
									value={inputPasswordNew}
									onChange={handleChangePasswordNew}/>
								</p>
								{/* <p><textarea name="comment" id="comment" cols="30" rows="10" placeholder="Your Message"></textarea></p> */}
								<a className="cart-btn" 
								onClick={async()=>{
									var res =await updatePassword(inputPasswordCurrent,inputPasswordNew);
									alert(res.toString());
									getSession().
									then(data=>{
										setSession(data);
										setInputPasswordCurrent('')
										setInputPasswordNew('')
									})

								}}>Change Password</a>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end Update profile section  */}

	 {/* logo carousel  */}
	<div className="logo-carousel-section">
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div className="logo-carousel-inner">
						<div className="single-logo-item">
							<img src="/assets/img/company-logos/1.png" alt=""/>
						</div>
						<div className="single-logo-item">
							<img src="/assets/img/company-logos/2.png" alt=""/>
						</div>
						<div className="single-logo-item">
							<img src="/assets/img/company-logos/3.png" alt=""/>
						</div>
						<div className="single-logo-item">
							<img src="/assets/img/company-logos/4.png" alt=""/>
						</div>
						<div className="single-logo-item">
							<img src="/assets/img/company-logos/5.png" alt=""/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end logo carousel  */}

	 {/* footer  */}
	<div className="footer-area">
		<div className="container">
			<div className="row">
				<div className="col-lg-3 col-md-6">
					<div className="footer-box about-widget">
						<h2 className="widget-title">About us</h2>
						<p>Ut enim ad minim veniam perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.</p>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
					<div className="footer-box get-in-touch">
						<h2 className="widget-title">Get in Touch</h2>
						<ul>
							<li>34/8, East Hukupara, Gifirtok, Sadan.</li>
							<li>support@fruitkha.com</li>
							<li>+00 111 222 3333</li>
						</ul>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
					<div className="footer-box pages">
						<h2 className="widget-title">Pages</h2>
						<ul>
							<li><a href="index.html">Home</a></li>
							<li><a href="about.html">About</a></li>
							<li><a href="services.html">Shop</a></li>
							<li><a href="news.html">News</a></li>
							<li><a href="contact.html">Contact</a></li>
						</ul>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
					<div className="footer-box subscribe">
						<h2 className="widget-title">Subscribe</h2>
						<p>Subscribe to our mailing list to get the latest updates.</p>
						<form action="index.html">
							<input type="email" placeholder="Email"/>
							<button type="submit"><i className="fas fa-paper-plane"></i></button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end footer  */}
	
	 {/* copyright  */}
	<div className="copyright">
		<div className="container">
			<div className="row">
				<div className="col-lg-6 col-md-12">
					<p>Copyrights &copy; 2019 - <a href="https://imransdesign.com/">Imran Hossain</a>,  All Rights Reserved.</p>
				</div>
				<div className="col-lg-6 text-right col-md-12">
					<div className="social-icons">
						<ul>
							<li><a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
							<li><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
							<li><a href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
							<li><a href="#" target="_blank"><i className="fab fa-linkedin"></i></a></li>
							<li><a href="#" target="_blank"><i className="fab fa-dribbble"></i></a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	 {/* end copyright  */}
	 
    <AppScripts/>
</body>
</html>

)}
</>
  );
}
