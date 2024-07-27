"use client";
import { useEffect, useState } from "react";
import { getMyShops, getSession, updatePassword, updateProfle } from "@/app/actions";
import AppHead from "@/app/Components/AppHead";
import AppHeader from "@/app/Components/AppHeader";
import AppScripts from "@/app/Components/AppScripts";
import AppPreLoader from "../Components/AppPreLoader";
import AppCompanies from "../Components/AppCompanies";
import AppFooter from "../Components/AppFooter";
import AppCopyRight from "../Components/AppCopyRight";

export default function Home({ params }) {

	const [domLoaded, setDomLoaded] = useState(false);
	const [preLoad, setPreLoader] = useState(true);
	const [myShops, setMyShops] = useState(null);
	const [session, setSession] = useState(null);

	const [inputFullName, setInputFullName] = useState(''); 
	const [inputUsername, setInputUsername] = useState(''); 
	const [inputEmail, setInputEmail] = useState(''); 
	const [inputPhone, setInputPhone] = useState(''); 
	const [inputPasswordNew, setInputPasswordNew] = useState(''); 
	const [inputPasswordCurrent, setInputPasswordCurrent] = useState(''); 

	const handleChange = (setter) => (event) => setter(event.target.value);


  useEffect(() => {
    setDomLoaded(true);
	myLoad();

	getSession().
	then(data=>{
		setSession(data);
		setInputUsername(data.userUsername)
		setInputEmail(data.userEmail)
		setInputPhone(data.userPhone)
		setInputFullName(data.userProfile.full_name)
		return getMyShops();
	}).then(data=>{
		setMyShops(data)
	})
  }, []);

  function myLoad(){
	setTimeout(()=>{
		setPreLoader(false)
	},1500)
  }

  const handleUpadeProfile=async()=>{
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
}

  const handleUpadePassword=async()=>{
		var res =await updatePassword(inputPasswordCurrent,inputPasswordNew);
		alert(res.toString());
		getSession().
		then(data=>{
			setSession(data);
			setInputPasswordCurrent('')
			setInputPasswordNew('')
		})

}

  return (
<>
{domLoaded && (
<html lang="en">
<AppHead/>
<body>
	
	{/* PreLoader */}
    {preLoad&& <AppPreLoader/>}
	
	{/* header  */}
	<AppHeader/>

	
	{/* breadcrumb-section  */}
	<div className="breadcrumb-section breadcrumb-bg">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2 text-center">
					<div className="breadcrumb-text">
						<p>See more Details</p>
						<h1>Profile</h1>
					</div>
				</div>
			</div>
		</div>
	</div>

	{/* Update profile section  */}
	<div className="mt-150 mb-150">
		<div className="container">
			<div className="row">
				<div className="col-lg-8">
					<div className="single-article-section">
						<div className="comments-list-wrap">
							<h3 className="comment-count-title">{session?.userProfile.full_name}</h3>
							<div className="comment-list">
								<div className="single-comment-body">
									<div className="comment-user-avater">
										<img src="assets/img/avaters/avatar1.png" alt=""/>
									</div>
									<div className="comment-text-body">
										<h4>{session?.userUsername}</h4>
										<p><i className="fa fa-envelope"></i> {session?.userEmail}</p>
										<p><i className="fa fa-phone"></i> {session?.userPhone}</p>
										<p><strong>Role:</strong> {session?.userProfile.role}</p>
										<h4>My shops</h4>
										{(!myShops||myShops.length==0)?(<p>You have no shop. <a href="/shop/create">Click here to create one</a></p>):(<ul>
											{myShops?.map((shop,index)=>(
												<li key={index}>{shop.name}</li>
											))}
										</ul>)}
									</div>
								</div>
							</div>
						</div>

						<div className="comment-template">
							<h4>Update profile</h4>
							<p>If you have a comment dont feel hesitate to send us your opinion.</p>
							<form>
								<p>
									<input type="text" placeholder="Full Name"
									value={inputFullName}
									onChange={handleChange(setInputFullName)}
									/> <a> </a>
									<input type="text" placeholder="Username"
									value={inputUsername}
									onChange={handleChange(setInputUsername)}/>
								</p>

								<p>
									<input type="text" placeholder="Phone"
									value={inputPhone}
									onChange={handleChange(setInputPhone)}/>
									<input type="email" placeholder="Email"
									value={inputEmail}
									onChange={handleChange(setInputEmail)}
									/>
								</p>
								<a className="cart-btn" 
								onClick={handleUpadeProfile}>Update Profile</a>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div className="col-lg-10 mx-auto" style={{height:'1px',backgroundColor:'#F28123'}}></div>

	{/* Update profile section  */}
	<div className="mt-150 mb-150">
		<div className="container">
			<div className="row">
				<div className="col-lg-8">
					<div className="single-article-section">
						<div className="comment-template">
							<h4>Change password</h4>
							<p>You can change your password here.</p>
							<form>
								<p>
									<input type="password" placeholder="Current password"
									value={inputPasswordCurrent}
									onChange={handleChange(setInputPasswordCurrent)}
									/>
									<br/>
									<br/>
									<input type="password" placeholder="New password"
									value={inputPasswordNew}
									onChange={handleChange(setInputPasswordNew)}/>
								</p>
								
								<a className="cart-btn" 
								onClick={handleUpadePassword}>Change Password</a>
							</form>
						</div>
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
