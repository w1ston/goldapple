import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import classes from "./header.module.css";
import ShopingCart from "../Shop/ShopingCart";

const useCustomNavigate = () => {
    const navigate = useNavigate();

    return (to) => {
        navigate(to, {replace: true});
    };
}

const Header = () => {
    const handleLinkClick = useCustomNavigate();

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []);

    return (
        <div className={`${isScrolled && classes.head || !isScrolled && classes.headStop}`}>
            <div className={classes.btnHead}>
                <ul className={classes.buttonHead}>
                    <nav>
                        <Link to="/" onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick('/');
                        }}>главная</Link>
                        <Link to="brands">бренды</Link>
                        <Link to="search">поиск</Link>
                        <a style={{zIndex: '999'}}><ShopingCart/></a>
                    </nav>
                </ul>
            </div>
        </div>
    );
};

export default Header;