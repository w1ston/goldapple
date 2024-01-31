import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

const ProductDetails = () => {
    const {productName} = useParams();
    const formattedName = productName.replace(/-/g, ' ');
    const [productDetails, setProductDetails] = useState(null);

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        fetch(`http://ggoldapple.com/DataBase/product/getProductById.php?productName=${formattedName}`)
            .then(response => response.json())
            .then(data => setProductDetails(data))
            .catch(error => console.error('Ошибка:', error));
    }, [formattedName, productDetails]);

    if (!productDetails) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40em'}}>
                <h1>loading</h1>
            </div>
        )
    }

    if (productDetails.length === 0) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40em', flexDirection: 'column'}}>
                <h1>not found</h1>
                <button onClick={handleGoBack} className="buttonBack type1">назад</button>
            </div>
        );
    }

    return (
        <div style={{width: '100%'}}>
            <img style={{width: '100%', height: '200px', objectFit: 'cover'}} src="../../Photos/newBrands.jpeg"
                 alt="photo"/>
            <div>
                <h2>{productDetails.productInfo.name_product}</h2>
                <p>{productDetails.productInfo.description}</p>
                <p>Цена: {productDetails.productInfo.price}</p>
                <p>Рейтинг: {'★'.repeat(productDetails.productInfo.rating)}</p>

                <h3>Фотографии продукта:</h3>
                <div>
                    {productDetails.productPhotos.map(photo => (
                        <img key={photo.id_photo} src={photo.link}
                             alt={`Фотография продукта ${productDetails.productInfo.name_product}`}/>
                    ))}
                </div>

                <h3>Тени продукта:</h3>
                <ul>
                    {productDetails.productShades.map(shade => (
                        <li key={shade.id_shade}>{shade.name_shade}
                            <img src={shade.photo}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductDetails;