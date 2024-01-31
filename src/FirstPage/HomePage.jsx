import React from 'react';
import './HomePage.css';
import Card from "../Components/Cards/Card";
import ShadesCard from "../Components/Shades/ShadesCard";
import MakeupPalettes from "../Components/Palette/MakeupPalettes";
import Footer from "../Components/Footer/Footer";

const HomePage = () => {
    return (
        <div style={{ width: '100%'}}>
            <div className="main_photo">
                <img style={{ width: '100%', height: '500px', objectFit: 'cover'}} src="../../Photos/main_header.jpeg" alt="photo"/>
            </div>
            <div className="main_new">
                <h3>новинки</h3>
            </div>
            <div className="main_info">
                <div className="cards">
                    <Card/>
                </div>
            </div>
            <div className="main_new">
                <h2>оттенки</h2>
            </div>
            <div>
                <ShadesCard/>
            </div>
            <div>
                <MakeupPalettes/>
            </div>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default HomePage;