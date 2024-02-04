import './App.css';
import Header from "./Components/Header/header"
import {Route, Routes} from "react-router-dom";
import HomePage from "./FirstPage/HomePage";
import BrandPage from "./BrandPage/BrandPage";
import BrandDetails from "./BrandDetails/BrandDetails";
import ProductDetails from "./ProductDetails/ProductDetails";
import SearchPage from "./SearchPage/SearchPage";

function App() {
    return (
        <>
            <header>
                <Header/>
            </header>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/brands" element={<BrandPage/>}/>
                <Route path="/brands/:brandName" element={<BrandDetails/>}/>
                <Route path="/product/:productName" element={<ProductDetails/>}/>
                <Route path="/search" element={<SearchPage/>}/>
            </Routes>
        </>
    );
}

export default App;
