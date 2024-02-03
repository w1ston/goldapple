import React from 'react';
import {useShoppingCart} from './ShoppingCartContext';
import './ShoppingCart.css';

const ShoppingCart = () => {
    const {cartItems, removeFromCart, isCartOpen, toggleCart} = useShoppingCart();

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const itemPrice = parseFloat(item.price);
            return isNaN(itemPrice) ? total : total + itemPrice;
        }, 0);
    };

    return (
        <div>
            <div onClick={() => toggleCart()}>
                корзина {cartItems.length > 0 && (
                <text style={{ background: '#ff6d6d', padding: 8, borderRadius: 999, color: 'white' }}>
                    {cartItems.length}
                </text>
            )}
            </div>
            {isCartOpen && (
                <div className="shopping_cart">
                    <div style={{display: "flex", justifyContent: 'space-between'}}>
                        <h2>корзина</h2>
                        <button className="button_close" onClick={() => toggleCart()}>X</button>
                    </div>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index} style={{display: `flex`, flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
                                <div className="shop_product">
                                    <div className="shop_product_info">
                                        <img src={item.photo} style={{width: '100%'}}/>
                                        <p>{item.name} - {item.color}</p>
                                        <p>${item.price}</p>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(index)} className="delete_button">удалить</button>
                            </li>
                        ))}
                    </ul>
                    {cartItems.length > 0 && (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <p>Итоговая цена: ${calculateTotalPrice().toFixed(2)}</p>
                        </div>
                    )}
                    {cartItems.length > 0 ? (
                            <button className="buttonBack type1">забрать в магазине</button>
                        ) :
                        <div style={{height: '400px', display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <p style={{fontSize: '30px'}}>в корзине пусто</p>
                        </div>
                    }
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
