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
    try {
        const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    // Make a post request to server for login
    const results = await axios({
        method: 'post',
        url: `${process.env.BASE_URL}/customer/login`,
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
        return results.data;
    }
    } catch (error) {
        console.log("Login->Error msg:",error.message);   
    }


    
}


const regiserFunc=async (email,password,username)=>{
    try {
        const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});


    // Make a post request to server for signup
    const results = await axios({
        method: 'post',
        url: `${process.env.BASE_URL}/customer/signup`,
        data: { email,password,username }
      });


    session.userId = results.data.id;
    session.userEmail = results.data.email;
    session.userUsername = results.data.username;
    session.userPhone = results.data.phone;
    session.userProfile = results.data.profile;
    session.userToken = results.data.token;
    session.isLoggedIn=true;
    
    await session.save();
    return true
    } catch (error) {
        console.log("Login->Error msg:",error);
        return false
    }
}
export const regiser = async(username,email,password)=>{
    const results = await regiserFunc(email,password,username);

    // if(results){
    //     redirect('/')
    // }
    return results
}

export const updatePassword = async(current_password,new_password)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    // Make a post request to server for signup
    const results = await axios({
        method: 'patch',
        url: `${process.env.BASE_URL}/customer/credentials`,
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

    // Make a post request to server for signup
    const results = await axios({
        method: 'put',
        url: `${process.env.BASE_URL}/customer/profile`,
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
export const GetAllShops =async()=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'get',
        url: `${process.env.BASE_URL}/shops`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		},
      });


    return results.data;
}

export const GetProducts =async()=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    
    const results = await axios({
        method: 'get',
        url: `${process.env.BASE_URL}`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		},
      });


    return results.data;
}

export const GetProductsByCategory =async(type)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    
    const results = await axios({
        method: 'get',
        url: `${process.env.BASE_URL}/category/${type}`,
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
        url: `${process.env.BASE_URL}/shops/${shop_id}/listings`,
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
        url: `${process.env.BASE_URL}/cart`,
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
        url: `${process.env.BASE_URL}/cart/${productId}`,
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
        url: `${process.env.BASE_URL}/wishlist`,
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
        url: `${process.env.BASE_URL}/wishlist/${_id}`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		}
      });

    return results.data;
}

export const PlaceOrder =async(txnId,name,address,contact,note,longitude,latitude,deliveryFee)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    console.log('=========deliveryFee===========');
    console.log(txnId,name,address,contact,note,longitude,latitude,deliveryFee);
    console.log('====================================');

    const results = await axios({
        method: 'POST',
        url: `${process.env.process.env.BASE_URL}/shopping/order`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		},
        data:{ txnNumber: txnId,name,address,contact,note,destCoords:{ lng:longitude,lat:latitude },deliveryFee}
      });

    return results.data;
}

export const FindDeliveiresByIds =async(ids)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'POST',
        url: `${process.env.BASE_URL}/deliveries/ids`,
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
        url: `${process.env.BASE_URL}/customer/shoping-details`,
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
//         url: `${process.env.BASE_URL}/customer/shoping-details`,
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

    console.log('====================================');
    console.log(session);
    console.log('====================================');
    const results = await axios({
        method: 'get',
        url: `${process.env.BASE_URL}/shop/myshop`,
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
        url: `${process.env.BASE_URL}/myshop/${id}`,
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
        url: `${process.env.BASE_URL}/product/create`,
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
        url: `${process.env.BASE_URL}/listings/${product_Id}`,
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
        url: `${process.env.BASE_URL}/listings/${product_Id}`,
        headers: {
            'Content-Type': 'application/json',
			'Authorization': `Bearer ${session.userToken}`
		}
      });

    return results.data;
}

export const CreateShop =async(name, desc, banner, address, contact, email,longitude,latitude)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'POST',
        url: `${process.env.BASE_URL}/shop/create`,
        headers: {
            'Content-Type': 'application/json',
			'Authorization': `Bearer ${session.userToken}`
		},
        data:{ name, desc, banner, address, contact, email,locCoords:{lng:longitude,lat:latitude} }
      });

    return results.data;
}

export const DeleteShop =async(shop_id)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'delete',
        url: `${process.env.BASE_URL}/myshop/${shop_id}`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		}
      });

    return results.data;
}

export const getMyShopOrders =async(shop_id)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'get',
        url: `${process.env.BASE_URL}/shopping/orders/all`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		}
      });


      const newData = await Manipulator(results.data,shop_id);
    return newData;
}

export const UpdateDeliveryProduct =async(orderId, productId, newStatus)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});


    const results = await axios({
        method: 'put',
        url: `${process.env.BASE_URL}/shopping/order/${orderId}`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		},
        data:{ productId, newStatus }
      });
    return results.data;
}


export const getProductDetails =async(product_id)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'get',
        url: `${process.env.BASE_URL}/listings/${product_id}`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		}
      });

    return results.data;
}


// Order and Delivery Management
export const GetAllOrders =async()=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'get',
        url: `${process.env.BASE_URL}/shopping/orders/all`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		}
      });
    return results.data;
}

export const UpdateOrder =async(order_id,status)=>{
    const session = await getIronSession(cookies(),{password:'ab5b9722-0447-4749-b357-1a2472324dd7',cookieName:'lama-session',cookieOptions:{httpOnly:true}});

    const results = await axios({
        method: 'PUT',
        url: `${process.env.BASE_URL}/shopping/order/status/${order_id}`,
        headers: {
			'Authorization': `Bearer ${session.userToken}`
		},
        data:{status:status}
      });
    return results.data;
}


// ====================================

function Manipulator(data, shop_id) {
    const shopOrders = [];

    data.forEach(order => {
        order.items.forEach(item => {
            if (item.product.shop_id === shop_id) {
                item.orderId=order.orderId;
                shopOrders.push(item);
            }
        });
    });

    return shopOrders;
}

export const mapDistance =async(coords2)=>{

// const origin = { lat: 37.7749, lng: -122.4194 }; // Example: San Francisco
// const destination = { lat: 34.0522, lng: -118.2437 }; // Example: Los Angeles
const coords1 = { lat: 5.655661, lng: -0.18277 }; // San Francisco
// const coords2 = { lat: 34.0522, lng: -118.2437 }; // Los Angeles

// const apiKey = process.env.NEXT_PUBLIC_API_KEY;
// const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${apiKey}`;

// axios.get(url)
//     .then(response => {
//         const data = response.data;
//         if (data.status === "OK") {
//             const distance = data.rows[0].elements[0].distance;
//             console.log(`Distance: ${distance.text} (${distance.value} meters)`);
//         } else {
//             console.error("Error fetching distance data:", data);
//         }
//     })
//     .catch(error => {
//         console.error("Error:", error);
//     });

function haversineDistance(coords1, coords2, isMiles = false) {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(coords2.lat - coords1.lat);
    const dLon = toRad(coords2.lng - coords1.lng);
    const lat1 = toRad(coords1.lat);
    const lat2 = toRad(coords2.lat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    let distance = R * c;

    if (isMiles) {
        distance /= 1.60934; // Convert kilometers to miles
    }

    return distance;
}

// Example usage:
// console.log(`Distance: ${haversineDistance(coords1, coords2)} km`);
// console.log(`Distance: ${haversineDistance(coords1, coords2, true)} miles`);
    return haversineDistance(coords1, coords2)
}