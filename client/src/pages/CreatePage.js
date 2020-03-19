import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import { useHistory } from "react-router-dom";

export const CreatePage = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const {request} = useHttp();
    const [link, setLink] = useState('');

    // Отправка ссылки на сервер
    const pressHandler = async event => {
        if(event.key === 'Enter'){
            try{
              const data = await request('/api/link/generate', 'POST', {from: link},{
                  authorization: `Bearer ${auth.token}`
              });
              history.push(`/detail/${data.link._id}`)
            }catch (e) {
                console.log(e);
            }
        }
    };

    useEffect( () => {
        // Метод обновляет поля, нужно для коректного отображения после выхода, метод идет с библиотекой materialize-css
        window.M.updateTextFields();
    },[]);

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: "2rem"}}>
                <div className="input-field">
                    <input placeholder="Enter link..."
                           onChange={event => setLink(event.target.value)}
                           onKeyPress={pressHandler}
                           id="link"
                           type="text"
                           name="link"
                           value={link} />
                    <label htmlFor="link">Link:</label>
                </div>

            </div>

        </div>
    )
};