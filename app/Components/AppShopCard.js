function AppShopCard({shop}) {
return (
<div className="col-lg-4 col-md-6">
    <div className="single-latest-news">
        <a href={`/shop/${shop._id}`}><img className="latest-news-bg news-bg-1" src={`/assets/img/latest-news/${shop.banner}`}/></a>
        <div className="news-text-box">
            <h3><a href={`/shop/${shop._id}`}>{shop.name}</a></h3>
            <p className="blog-meta">
                <span className="author"><i className="fas fa-phone"></i> {shop.contact}</span>
                <span className="date"><i className="fas fa-map"></i> {shop.address}</span>
            </p>
            <p className="excerpt">{shop.desc}</p>
            <a href={`/shop/${shop._id}`} className="read-more-btn">read more <i className="fas fa-angle-right"></i></a>
        </div>
    </div>
</div>
);
}

export default AppShopCard;