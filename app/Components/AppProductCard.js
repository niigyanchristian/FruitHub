import { AddToCart } from "../actions";

function AppProductCard({product}) {
return (
<div className="col-lg-4 col-md-6 text-center">
    <div className="single-product-item">
        <div className="product-image">
            <a href={`/products/${product._id}`}><img src={`${product.banner}`}/></a>
        </div>
        <h3>{product.name}</h3>
        <p className="product-price"><span>{product.unit} in stock</span> GH₵{product.price} </p>
        {product.unit>0?(<a onClick={async ()=>{
            var res = await AddToCart(product._id,1,product.shop_id);
            if(res){
                alert("Cart has been added successfully!");
            }
        }} className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>):(<a className="cart-btn" style={{textDecoration:'line-through',backgroundColor:'#a8a8a8'}}><i className="fas fa-shopping-cart"></i>Unavailable</a>)}
    </div>
</div>
);
}
export default AppProductCard;