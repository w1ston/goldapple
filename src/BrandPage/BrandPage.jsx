import React, {useState} from 'react';
import './BrandPage.css';
import useFetchData from "../useFetchData";
import Footer from "../Components/Footer/Footer";
import {Link} from "react-router-dom";

const BrandPage = () => {
    const [brands, setBrands] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useFetchData('http://ggoldapple.com/DataBase/product/get_brands.php', setBrands);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredBrands = brands.filter(brand =>
        brand.name_brand.toLowerCase().includes(searchTerm)
    );

    const formatBrandName = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-');
    };

    return (
        <div style={{width: '100%'}}>
            <div>
                <img style={{width: '100%', height: '200px', objectFit: 'cover'}} src="../../Photos/eyelinerHeader.jpeg"
                     alt="photo"/>
            </div>
            <div className="search_container">
                <input className="search_input" placeholder="найти бренд" value={searchTerm}
                       onChange={handleSearch} maxLength={30}/>
                <div className="brand_container">
                    <ul>
                        {filteredBrands.map(brand => (
                            <li key={brand.id_brand} style={{marginBottom: '10px', textTransform: 'lowercase'}}>
                                <Link to={`/brands/${formatBrandName(brand.name_brand)}`}>
                                    <div className="brand_name">
                                        {brand.name_brand}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default BrandPage;