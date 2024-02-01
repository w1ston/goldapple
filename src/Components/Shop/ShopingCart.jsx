import React from 'react';
import {useShoppingCart} from './ShoppingCartContext';
import './ShoppingCart.css';

const ShoppingCart = () => {
    const {cartItems, removeFromCart, isCartOpen, toggleCart} = useShoppingCart();

    return (
        <div>
            <div onClick={() => toggleCart()}>корзина ({cartItems.length})</div>
            {isCartOpen && (
                <div className="shopping_cart">
                    <h2>корзина</h2>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                <div>
                                    <img src={item.photo} style={{ width: '100%'}}/>
                                    {item.name} - ${item.price}
                                    <button onClick={() => removeFromCart(index)}>Удалить</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
