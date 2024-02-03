import React, {useState} from 'react';

const InputPhone = ({onPhoneChange, isValid}) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const formatPhoneNumber = (e) => {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, '');
        inputValue = inputValue.slice(0, 11);
        inputValue = '+7 (' + inputValue.substring(1, 4) + ') ' + inputValue.substring(4, 7) + ' ' + inputValue.substring(7, 9) + '-' + inputValue.substring(9);

        setPhoneNumber(inputValue);
        onPhoneChange(inputValue);
    };

    return (
        <input
            type="text"
            value={phoneNumber}
            onChange={formatPhoneNumber}
            placeholder="+7 (___) ___ __-__"
            maxLength="18"
            pattern="[0-9]*"
            className={isValid ? '' : 'invalid-input'}
        />
    );
};

export default InputPhone;
