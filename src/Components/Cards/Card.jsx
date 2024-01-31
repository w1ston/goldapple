import React, {useEffect, useState} from 'react';
import './Card.css'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useFetchData from "../../useFetchData";
import {Link} from "react-router-dom";

const Card = () => {
    const [products, setProducts] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useFetchData('http://ggoldapple.com/DataBase/product/getProduct.php', setProducts);

    const formatBrandName = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-');
    };

    return (
        <div className="cards_container">
            <Slider {...settings}>
                {products.map(product => (
                    <div key={product.id_product} className="card">
                        <Link to={`/product/${formatBrandName(product.name_product)}`}>
                            <div className="card_info">
                                <img src={product.photo_link} alt={product.name_product}/>
                                <h2>{product.name_product}</h2>
                                <p>${product.price}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Card;