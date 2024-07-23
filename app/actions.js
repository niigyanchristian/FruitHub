"use server"
import { cookies } from "next/headers"
import {getIronSession} from 'iron-session'
import axios from "axios";
import { redirect } from "next/navigation";



// Authentication and Authorization
export const getSession=async ()=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    if(!session.isLoggedIn){
        session.isLoggedIn=false;
    }
    
    return JSON.parse(JSON.stringify(session));
}

export const login = async(email,password)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    // Make a post request to server for login
    const results = await axios({
        method: 'post',
        url: 'http://localhost:8000/customer/login',
        data: { email,password }
      });

    if(!results.data.id)  {
        return {error:"Wrong credentials!"}
    }else{
        session.userId = results.data.id;
        session.userEmail = results.data.email;
        session.userUsername = results.data.username;
        session.userPhone = results.data.phone?results.data.phone:'';
        session.userProfile = results.data.profile?results.data.profile:{ role: '', full_name: '' };
        session.userToken = results.data.token;
        session.isLoggedIn=true;

        await session.save();
        console.log("session:",session)
        redirect('/')
    }


    
}
export const regiser = async(username,email,password)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    console.log(username,email,password)

    // Make a post request to server for signup
    const results = await axios({
        method: 'post',
        url: 'http://localhost:8000/customer/signup',
        data: { email,password,username }
      });

    if(email !==results.data.email)  {
        return {error:"Wrong credentials!"}
    }

    

    session.userId = results.data.id;
    session.userEmail = results.data.email;
    session.userUsername = results.data.username;
    session.userPhone = results.data.phone;
    session.userProfile = results.data.profile;
    session.userToken = results.data.token;
    session.isLoggedIn=true;
    
    await session.save();
    console.log("session:",session)
    redirect('/')
}

export const updatePassword = async(current_password,new_password)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    // Make a post request to server for signup
    const results = await axios({
        method: 'patch',
        url: 'http://localhost:8000/customer/credentials',
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		},
        data: { current_password,new_password }
      });

    if(results.data.id)  {
  
        session.userId = results.data.id;
        session.userEmail = results.data.email;
        session.userUsername = results.data.username;
        session.userPhone = results.data.phone;
        session.userProfile =results.data.profile?results.data.profile:{ role: '', full_name: '' };
        session.userToken = results.data.token;
        session.isLoggedIn=true;
      
      await session.save();
      return "Password has been changed!";
    }else{
        return results.data;
    }
    
    
    
}

export const updateProfle = async(username,email,phone,full_name)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    // console.log("=>",username,email,phone,full_name)


    // Make a post request to server for signup
    const results = await axios({
        method: 'put',
        url: 'http://localhost:8000/customer/profile',
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		},
        data: { username,email,phone,profile:{full_name}}
      });

    if(email !==results.data.email)  {
        return {error:"Wrong credentials!"}
    }

    session.userId = results.data.id;
    session.userEmail = results.data.email;
    session.userUsername = results.data.username;
    session.userPhone = results.data.phone;
    session.userProfile = results.data.profile;
    session.userToken = results.data.token;
    session.isLoggedIn=true;
    
    await session.save();
    return results.status;
}
export const logout = async()=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

   session.destroy();
}


// Customers
export const getAllShops =async()=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'get',
        url: ' http://localhost:8000/shops',
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		},
      });


    return results.data;
}

export const getShopProducts =async(shop_id)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'get',
        url: `http://localhost:8000/shops/${shop_id}/listings`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		},
      });


    return results.data;
}

export const AddToCart =async(_id,qty,shop_id)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'put',
        url: `http://localhost:8000/cart`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		},
        data:{ _id, qty,shop_id }
      });

    return results.status;
}
export const DeleteFromCart =async(productId)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'DELETE',
        url: `http://localhost:8000/cart/${productId}`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		}
      });

    return results.data;
}

export const AddToWishlist =async(_id)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'put',
        url: `http://localhost:8000/wishlist`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		},
        data:{ _id }
      });

    return results.status;
}

export const DeleteFromWishlist =async(_id)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'delete',
        url: `http://localhost:8000/wishlist/${_id}`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		}
      });

    return results.data;
}

export const PlaceOrder =async(txnId,name,address,contact,note)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'POST',
        url: `http://localhost:8000/shopping/order`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		},
        data:{ txnNumber: txnId,name,address,contact,note }
      });

    return results.data;
}

export const FindDeliveiresByIds =async(ids)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'POST',
        url: `http://localhost:8000/deliveries/ids`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		},
        data:{ ids: ids }
      });

    return results.data;
}

export const GetShoppingDetails =async()=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'get',
        url: `http://localhost:8000/customer/shoping-details`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		}
      });
    return results.data;
}

// export const LoadCarts =async()=>{
//     const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

//     const results = await axios({
//         method: 'get',
//         url: `http://localhost:8000/customer/shoping-details`,
//         headers: {
// 			'Authorization': `Bearer ${session.userToken}`
// 		}
//       });
    
//     let newSubtotal = 0; 
//     results.data.cart.forEach(element => {
//         const itemTotal = element.product.price * element.unit;
//         newSubtotal += itemTotal;
//     });

      
//     return {cars:data.cart,newSubtotal};
// }



// Shop owners
export const getMyShops =async()=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'get',
        url: `http://localhost:8000/shop/myshop`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		}
      });
    return results.data;
}
export const getMyShopDetails =async(id)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'get',
        url: `http://localhost:8000/myshop/${id}`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		}
      });
    return results.data;
}

export const AddProduct =async(name,type,unit,suplier,price,banner,shop_id,desc)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'POST',
        url: `http://localhost:8000/product/create`,
        headers: {
            'Content-Type': 'application/json',
			'Authorization': `Bearer ${session.userToken}`
		},
        data:{ name,type,unit,suplier,price,banner,shop_id,desc }
      });

    return results.data;
}

export const UpdateProduct =async(name,type,unit,suplier,price,banner,desc,product_Id,shop_id)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'PUT',
        url: `http://localhost:8000/listings/${product_Id}`,
        headers: {
            'Content-Type': 'application/json',
			'Authorization': `Bearer ${session.userToken}`
		},
        data:{ name,type,unit,suplier,price,banner,desc,shop_id }
      });

    return results.data;
}

export const DeleteProduct =async(product_Id)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'DELETE',
        url: `http://localhost:8000/listings/${product_Id}`,
        headers: {
            'Content-Type': 'application/json',
			'Authorization': `Bearer ${session.userToken}`
		}
      });

    return results.data;
}

export const CreateShop =async(name, desc, banner, address, contact, email)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'POST',
        url: `http://localhost:8000/shop/create`,
        headers: {
            'Content-Type': 'application/json',
			'Authorization': `Bearer ${session.userToken}`
		},
        data:{ name, desc, banner, address, contact, email }
      });

    return results.data;
}
export const getMyShopOrders =async(shop_id)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'get',
        url: `http://localhost:8000/shopping/orders/all`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		}
      });


      const newData = await Manipulator(results.data,shop_id);
    return newData;
}

export const UpdateDelivery =async(status,currentLocation,longitude,latitude,estimatedDeliveryDate,order_id)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    console.log(status,longitude,latitude,order_id)

    const results = await axios({
        method: 'put',
        url: `http://localhost:8000/shopping/order/${order_id}`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		},
        data:{ status,longitude,latitude,currentLocation,estimatedDeliveryDate }
      });
    return results.data;
}


export const getProductDetails =async(product_id)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'get',
        url: `http://localhost:8000/listings/${product_id}`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		}
      });

    return results.data;
}


// ====================================

function Manipulator(data, shop_id) {
    const shopOrders = [];

    data.forEach(order => {
        order.items.forEach(item => {
            if (item.product.shop_id === shop_id) {
                shopOrders.push(item);
            }
        });
    });

    console.log('====================================');
    console.log("shopOrders=>",shopOrders.length);
    console.log('====================================');
    return shopOrders;
}