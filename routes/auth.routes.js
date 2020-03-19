const { Router } = require('express');
const bcrypt = require('bcryptjs'); // Библиотека для шифровки пароля
const jwt = require('jsonwebtoken'); // Библиотека для создание token
const config = require('config');
const {check, validationResult} = require('express-validator'); // Проверка на валидность
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post('/register',
    [
        check('email', 'Некоректный email').isEmail(),
        check('password', 'Пароль меньше 6 символов!!!').isLength({min: 6})
    ],
    async (req, res) => {
    try{
        // Проверка на валидность заполнения полей
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
               errors: errors.array(),
               message: 'Некоректные данные при регистрации'
            });
        }


        // Получаем данные с фронтенда(с формы)
        const {email, password} = req.body;

        // Ищем есть ли в БД пользователь с таким email
        const candidate = await User.findOne({email});
        if(candidate){
           return res.status(400).json({message: 'Пользователь уже существует!!!'})
        }

        // Хешируем пароль
        const hashPassword = await bcrypt.hash(password, 12);
        // Создаем пользователя
        const user = new User({email, password: hashPassword});

        // Сохраняем пользователя в БД
        await user.save();

        // 201 - стату когда что то создаеться
        res.status(201).json({message: 'Пользователь создан!!!'});


    }catch (e) {
        res.status(500).json({message: 'Что то пошло не так!!!'})
    }
});

// /api/auth/login
router.post('/login',
    [
        check('email', 'Некоректный email').normalizeEmail().isEmail(),
        check('password', 'Пароль не верный.').exists() // Пароль должен существовать
    ],
    async (req, res) => {
        try{
            // Проверка на валидность заполнения полей
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные при входе.'
                });
            }

            const {email, password} = req.body;

            // Поиск пользователя в БД
            const user = await User.findOne({email});

            // Если пользователь не найден.
            if(!user){
                return res.status(400).json({
                    message:'Пользователь не найден!!!'
                })
            }

            // Проверка, совпадают ли пароли, await Обезательно
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({message: 'Неверный пароль, попробуйте снова.'})
            }

            // Создаем token на 1 час
            const token = jwt.sign(
                {userId: user.id}, // Данные
                config.get("jwtSecret"),   // Секретна строка
                { expiresIn: "1h"} // 1 час
            );

            // Вход выполнен отправлям ответ на front-end, по умолчанию status 200
            res.json({token, userId: user.id, message: "Вход выполнен!"});

        }catch (e) {
            res.status(500).json({message: 'Что то пошло не так!!!'})
        }

});

module.exports = router;
