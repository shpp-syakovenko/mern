import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Функция для запроса на сервер, useCallback для того что бы реакт не уходил в рекурсию
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        // Флаг запроса на сервер
        setLoading(true);
        try{
            // При отправки нужно перевести в формат JSON
            if(body){
                body = JSON.stringify(body);
                headers['Content-Type'] = "application/json";
            }

            // Запрос на сервер
            const response = await fetch(url, {method, body, headers});
            const data = await response.json();

            // Если запрос на сервер провалился выкидываем ошибку!
            if(!response.ok){
                throw new Error(data.message || 'Ошибка при запросе на сервер!!!');
            }
            // Флаг запроса на сервер
            setLoading(false);
            return data;
        }catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }

    },[]);

    // Функция для чистки ошибок
    const clearError = useCallback(() => setError(null),[]);

    return {loading, error, request, clearError}

};