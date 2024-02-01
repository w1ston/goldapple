import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import './ProductDetails.css';
import Footer from "../Components/Footer/Footer";
import {useShoppingCart} from "../Components/Shop/ShoppingCartContext";

const ProductDetails = () => {
    const {productName} = useParams();
    const formattedName = productName.replace(/-/g, ' ');
    const [productDetails, setProductDetails] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeShade, setActiveShade] = useState(null);
    const [productPhotos, setProductPhotos] = useState([]);
    const [shadePhotos, setShadePhotos] = useState([]);
    const [shadeName, setShadeName] = useState('');
    const navigate = useNavigate();
    const {addToCart} = useShoppingCart();

    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (productDetails && productDetails.productPhotos) {
            setProductPhotos([...productDetails.productPhotos]);
            if (productDetails.productShades && productDetails.productShades.length > 0) {
                const allShadePhotos = productDetails.productShades.reduce((accumulator, shade) => {
                    setShadeName(shade.name_shade);
                    if (shade.photos) {
                        return accumulator.concat(shade.photos);
                    }
                    return accumulator;
                }, []);
                setShadePhotos(allShadePhotos);
            }
        }
    }, [productDetails]);

    const handleClick = (index) => {
        setActiveIndex(index);
        setActiveShade(null);
    };

    const handleShadeClick = (shade) => {
        if (activeShade && activeShade.id_shade === shade.id_shade) {
            setProductPhotos([...productDetails.productPhotos]);
            setShadePhotos([...shade.photos]);
            setActiveShade(null);
            setShadeName(shade.name_shade)
        } else {
            setActiveShade(shade);
            if (shade && shade.photos) {
                setProductPhotos([...shade.photos]);
                setShadePhotos([...productDetails.productPhotos]);
            }
            setShadeName(productDetails.productInfo.color);
        }
    };

    const handlePhotoClick = (index) => {
        if (activeShade) {
            const updatedProductPhotos = [...shadePhotos];
            const updatedShadePhotos = [...productPhotos];

            [updatedProductPhotos[index], updatedShadePhotos[activeIndex]] = [
                updatedShadePhotos[activeIndex],
                updatedProductPhotos[index],
            ];

            setProductPhotos(updatedProductPhotos);
            setShadePhotos(updatedShadePhotos);

            setActiveIndex(index);
        }
    };


    const fetchData = () => {
        fetch(`http://ggoldapple.com/DataBase/product/getProductById.php?productName=${formattedName}`)
            .then(response => response.json())
            .then(data => {
                setProductDetails(data);
                setHasFetched(true);
            })
            .catch(error => console.error('Ошибка:', error));
    };

    useEffect(() => {
        if (!hasFetched) {
            fetchData();
        }
    }, [formattedName, hasFetched]);

    if (!productDetails) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40em'}}>
                <h1>loading</h1>
            </div>
        )
    }

    if (productDetails.length === 0) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '40em',
                flexDirection: 'column'
            }}>
                <h1>not found</h1>
                <button onClick={handleGoBack} className="buttonBack type1">назад</button>
            </div>
        );
    }

    const handledAddToCart = () => {

        addToCart({
            name: productDetails.productInfo.name_product,
            price: productDetails.productInfo.price,
            photo: productPhotos[0]
        });
    };

    return (
        <div style={{width: '100%'}}>
            <img style={{width: '100%', height: '200px', objectFit: 'cover'}} src="../../Photos/newBrands.jpeg"
                 alt="photo"/>
            <div className="product_info">
                <h5 style={{fontSize: '20px', textAlign: 'center'}}>{'★'.repeat(productDetails.productInfo.rating)}</h5>
                <div style={{overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
                    <h1 style={{fontSize: '70px', position: 'relative', top: '50px', right: '100px', zIndex: '99'}}>
                        {productDetails.productInfo.name_product}
                    </h1>
                    <div style={{position: 'relative'}}>
                        <div style={{display: "flex", alignItems: 'center', gap: '50px'}}
                             className="media_screen_product">
                            <div>
                                <img
                                    src={productPhotos[activeIndex]}
                                    alt={`Product Photo ${activeIndex}`}
                                    style={{width: '800px'}}
                                />

                                <div style={{
                                    position: 'absolute',
                                    top: 100,
                                    left: 15,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px'
                                }}>
                                    {productPhotos.map((photo, index) => (
                                        <img
                                            key={index}
                                            src={photo}
                                            alt={`Product Photo ${index}`}
                                            style={{
                                                width: '100px',
                                                marginRight: '5px',
                                                cursor: 'pointer',
                                                border: index === activeIndex ? '1px solid black' : '1px solid black',
                                                opacity: index === activeIndex ? 1 : 0.5,
                                                transition: 'opacity 0.3s ease',
                                            }}
                                            onClick={() => handleClick(index)}
                                            className="product_photo"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div style={{
                                display: "flex",
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '30px',
                                width: '100%'
                            }}>
                                {productDetails.productShades.map((shade) => (
                                    <div key={shade.id_shade} onClick={() => handleShadeClick(shade)}
                                         style={{display: "flex", flexDirection: 'column', gap: '10px', width: '100%'}}>
                                        <h4 className="shades">оттенки:</h4>
                                        <p style={{textAlign: 'center'}}>{shadeName}</p>
                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                            {shadePhotos.slice(0, 1).map((photo, index) => (
                                                <div key={index} onClick={() => handlePhotoClick(index)}
                                                     className="shades_info">
                                                    <img
                                                        src={photo}
                                                        alt={`Shade Photo ${index}`}
                                                        style={{
                                                            width: index === activeIndex && activeShade === shade ? '100px' : '100px',
                                                            height: index === activeIndex && activeShade === shade ? '100px' : '100px',
                                                            borderRadius: '50%',
                                                            cursor: 'pointer',
                                                            border: '1px solid black',
                                                            marginRight: '5px',
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <h2 style={{}}>${productDetails.productInfo.price}</h2>
                                <button onClick={handledAddToCart} className="button_shop">ДОБАВИТЬ В КОРЗИНУ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default ProductDetails;