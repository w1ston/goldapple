import { useEffect } from 'react';

const useFetchData = (url, setData) => {
    useEffect(() => {
        fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                if (data)
                    setData(data);
                else
                    console.log('Ответ сервера не содержит данных');
            })
            .catch(error => {
                console.log('Ошибка запроса', error);
            });
    }, [url, setData]);
}

export default useFetchData;
