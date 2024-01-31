import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import './BrandDetails.css';

const BrandDetails = () => {
    const {brandName} = useParams();
    const formattedBrandName = brandName.replace(/-/g, ' ');
    const [brandId, setBrandId] = useState(null);
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };


    useEffect(() => {
        fetch(`http://ggoldapple.com/DataBase/product/getBrandIdByName.php?name_brand=${encodeURIComponent(formattedBrandName)}`)
            .then(response => response.json())
            .then(data => {
                setBrandId(data.id_brand);
            })
            .catch(error => console.error('Ошибка:', error));
    }, [brandName]);

    useEffect(() => {
        if (brandId !== null) {
            fetch(`http://ggoldapple.com/DataBase/product/getProductsByBrand.php?id_brand=${brandId}`)
                .then(response => response.json())
                .then(data => setProducts(data))
                .catch(error => console.error('Ошибка:', error));
        }
    }, [brandId]);

    if (brandId === null) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40em', flexDirection: 'column'}}>
                <h1>not found</h1>
                <button onClick={handleGoBack} className="buttonBack type1">назад</button>
            </div>
        )
    }

    const formatBrandName = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-');
    };


    return (
        <div style={{width: '100%'}}>
            <div>
                <img style={{width: '100%', height: '200px', objectFit: 'cover'}} src="../../Photos/newHeader.jpeg"
                     alt="photo"/>
            </div>
            <div className="brand">
                <h2 style={{fontSize: '80px', fontWeight: 'bold', marginLeft: '400px'}}>{formattedBrandName}</h2>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {products.map(product => (
                        <div key={product.id_shade} className="shade">
                            <Link to={`/product/${formatBrandName(product.name_product)}`}>
                                <img src={product.photo_link} alt={product.name_product}/>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    position: 'relative',
                                    bottom: '30px',
                                    justifyContent: 'space-around',
                                    alignItems: 'center'
                                }}>
                                    <p style={{fontWeight: 'bolder', fontSize: '25px'}}>{product.name_product}</p>
                                    <h4>${product.price}</h4>
                                    <h3 style={{fontSize: '30px'}}>{'★'.repeat(product.rating)}</h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandDetails;