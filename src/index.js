import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ShoppingCartProvider} from "./Components/Shop/ShoppingCartContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ShoppingCartProvider>
                <App/>
            </ShoppingCartProvider>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
