import React, {useState} from 'react';
import useFetchData from "../../useFetchData";
import './ShadesCard.css'
import {Link} from "react-router-dom";

const ShadesCard = () => {
    const [shades, setShades] = useState([]);
    useFetchData('http://ggoldapple.com/DataBase/product/get_shades_main_page.php', setShades);

    const formatBrandName = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-');
    };

    return (
        <div className="shades_container">
            {shades.map(product => (
                <div key={product.id_shade} className="shade">
                    <Link to={`/product/${formatBrandName(product.name_product)}`}>
                        <img src={product.photo_link} alt={product.name_shade}/>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            position: 'relative',
                            bottom: '30px',
                            justifyContent: 'space-around',
                            gap: '5px'
                        }}>
                            <p style={{fontWeight: 'bolder', fontSize: '25px'}}>{product.name_product}</p>
                            <h3 style={{fontSize: '15px'}}>{product.name_shade}</h3>
                            <h4>${product.price}</h4>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ShadesCard;