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

    const ProductDetails = ({ productInfo, productPhotos, productShades }) => {
        return (
            <div>
                <h2>{productInfo.name_product}</h2>
                <p>{productInfo.description}</p>
                <h3 style={{fontSize: '30px'}}>{'★'.repeat(productInfo.rating)}</h3>

                <h3>Product Photos:</h3>
                <div>
                    {productPhotos.map((photo, index) => (
                        <img key={index} src={photo} alt={`Product Photo ${index}`} />
                    ))}
                </div>

                <h3>Shades:</h3>
                {productShades.map((shade) => (
                    <div key={shade.id_shade}>
                        <h4>{shade.name_shade}</h4>
                        <div>
                            {shade.photos.map((photo, index) => (
                                <img key={index} src={photo} alt={`Shade Photo ${index}`} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div style={{width: '100%'}}>
            <img style={{width: '100%', height: '200px', objectFit: 'cover'}} src="../../Photos/newBrands.jpeg"
                 alt="photo"/>
            <ProductDetails
                productInfo={productDetails.productInfo}
                productPhotos={productDetails.productPhotos}
                productShades={productDetails.productShades}
            />
        </div>
    );
};

export default ProductDetails;