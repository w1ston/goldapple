import React, {useEffect, useState} from 'react';
import './Modal.css';
import InputPhone from "../InputPhone";
import {useShoppingCart} from "../Shop/ShoppingCartContext";

const Modal = ({isOpen, onClose}) => {
    const [phoneValue, setPhoneValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [randomNumbers, setRandomNumbers] = useState('');
    const {clearCart, toggleCart} = useShoppingCart();
    const [hasFetched, setHasFetched] = useState(false);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [isValidName, setIsValidName] = useState(true);

    useEffect(() => {
        if (!hasFetched) {
            randomNum();
        }
    }, [randomNumbers, hasFetched])

    const randomNum = () => {
        const randomNumbersArray = Array.from({length: 8}, () => Math.floor(Math.random() * 10)).join('');
        setRandomNumbers(randomNumbersArray);
        setHasFetched(true);
    }

    const handlePhoneChange = (value) => {
        setPhoneValue(value);
        setIsValidPhoneNumber(true);
    };

    const handleNameChange = (e) => {
        setNameValue(e.target.value);
        setIsValidName(true);
    };

    const isValidPhone = (phone) => {
        const phoneRegex = /^79\d{9}$/;
        const trimmedPhone = phone.trim(); // Удаляем возможные пробелы в начале и конце строки
        return trimmedPhone.length > 0 && phoneRegex.test(trimmedPhone);
    };

    const validName = (name) => {
        return name.trim().length > 0;
    };


    const handleButtonClick = () => {
        const formattedPhone = phoneValue.replace(/\D/g, '');

        if (isValidPhone(formattedPhone) && validName(nameValue)) {
            fetch(`https://sms.ru/sms/send?api_id=F76499D0-3CA8-296F-3DC4-12AE494BEC9C&to=${formattedPhone}&msg=${nameValue}+номер заказа: ${randomNumbers}, назовите+его+в+магазине&json=1&test=1`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => console.log('SMS sent successfully:', data))
                .catch(error => console.error('Error during SMS sending:', error));

            onClose();
            clearCart();
            toggleCart();
        } else {
            if (!isValidPhone(formattedPhone)) {
                setIsValidPhoneNumber(false);
                console.log('Некорректный номер телефона');
            }

            if (!validName(nameValue)) {
                setIsValidName(false);
                console.log('Некорректное имя');
            }
        }
    };

    return (
        isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}
                          style={{textAlign: 'end', boxSizing: 'border-box', width: '10px'}}>&times;</span>
                    <div style={{display: `flex`, gap: '100px'}}>
                        <div className="wrapper">
                            <input type="text" placeholder="" value={nameValue} onChange={handleNameChange}
                                   maxLength={8} className={isValidName ? '' : 'invalid-input'}/>
                            <label htmlFor="inputName">имя</label>
                        </div>
                        <div className="wrapper">
                            <InputPhone onPhoneChange={handlePhoneChange} isValid={isValidPhoneNumber}/>
                        </div>
                    </div>
                    {!isValidPhoneNumber && <p style={{color: 'red', fontSize: '10px'}}>Некорректный номер телефона</p>}
                    {!isValidName && <p style={{color: 'red', fontSize: '10px'}}>Некорректное имя</p>}
                    <div style={{width: '100%'}}>
                        <button onClick={handleButtonClick} className="buttonBack type1">оформить</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default Modal;