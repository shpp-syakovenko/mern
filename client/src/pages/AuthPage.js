import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
       email: '',
       password:''
    });

    useEffect(() => {
        // Если меняеться error мы его показываем
        message(error);
        // Очищаем ошибку
        clearError();
    },[error, message, clearError]);
    
    useEffect( () => {
        // Метод обновляет поля, нужно для коректного отображения после выхода, метод идет с библиотекой materialize-css
        window.M.updateTextFields();
    },[]);

    const changeFormHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    const registerHandler = async () => {
        try{
            const data = await request('api/auth/register', "POST",{...form});
            message(data.message);
        }catch (e) {

        }
    };

    const loginHandler = async () => {
        try{
            const data = await request('api/auth/login', "POST",{...form});
            auth.login(data.token, data.userId);
            message(data.message);
        }catch (e) {

        }
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Авторизация</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Enter email..."
                                       onChange={changeFormHandler}
                                       id="email"
                                       type="text"
                                       name="email"
                                       value={form.email}
                                       className="yellow-input" />
                                    <label htmlFor="email">Email:</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Enter password..."
                                       onChange={changeFormHandler}
                                       id="password"
                                       type="password"
                                       name="password"
                                       value={form.password}
                                       className="yellow-input" />
                                <label htmlFor="password">password:</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                       <button
                           onClick={loginHandler}
                           disabled={loading}
                           className="btn yellow darken-4"
                           style={{marginRight: 10}}
                       >Войти</button>
                       <button
                           onClick={registerHandler}
                           disabled={loading}
                           className="btn grey lighten-1 black-text"
                       >Зарегистрироваться</button>
                    </div>
                </div>

            </div>
        </div>
    )
};