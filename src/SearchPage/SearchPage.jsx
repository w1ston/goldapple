import React, {useState} from 'react';
import useFetchData from "../useFetchData";
import {Link} from "react-router-dom";
import Footer from "../Components/Footer/Footer";

const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useFetchData('http://ggoldapple.com/DataBase/product/getProduct.php', setProducts);

    const formatBrandName = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-');
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredProduct = products.filter(product =>
        product.name_product.toLowerCase().includes(searchTerm)
    );

    return (
        <div style={{width: '100%'}}>
            <div>
                <img style={{width: '100%', height: '200px', objectFit: 'cover'}} src="../../Photos/eyelinerHeader.jpeg"
                     alt="photo"/>
            </div>
            <div className="search_container">
                <input className="search_input" placeholder="найти товар" maxLength={30} value={searchTerm} onChange={handleSearch}/>
                <div style={{ display: `flex`, flexWrap: 'wrap', gap: '20px', justifyContent: 'center'}}>
                    {filteredProduct.length > 0 ? (
                        filteredProduct.map(product => (
                            <div key={product.id_product} className="shade">
                                <Link to={`/product/${formatBrandName(product.name_product)}`}>
                                    <img src={product.photo_link} alt={product.name_shade} />
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        position: 'relative',
                                        bottom: '30px',
                                        justifyContent: 'space-around',
                                        gap: '5px'
                                    }}>
                                        <p style={{ fontWeight: 'bolder', fontSize: '25px' }}>{product.name_product}</p>
                                        <h3 style={{ fontSize: '15px' }}>{product.name_shade}</h3>
                                        <h4>${product.price}</h4>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <h2>Ничего не найдено</h2>
                    )}
                </div>
            </div>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default SearchPage;