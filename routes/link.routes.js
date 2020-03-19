const { Router } = require('express');
const Link = require('../models/Link');
const config = require('config');
const shortid = require('shortid');
const auth = require('../middleware/auth.middleware'); // Промежуточный слой
const router = Router();

// /api/link/generate
router.post('/generate', auth, async (req, res) => {
    try{
        const baseUrl = config.get('baseUrl');
        const {from} = req.body;

        const code = shortid.generate(); // Уникальный код

        // Проверка есть ли в базе данных уже такая ссылка
        const existing = await Link.findOne({from});

        // Если в БД уже есть такая ссылка то отправляем её
        if(existing){
           return res.json({link: existing})
        }

        const to = baseUrl + "/t/" + code;

        // Создаем ссылку
        const link = new Link({
            code, to, from, owner: req.user.userId
        });

        // Сохраняем ссылку в БД
        await link.save();

        // Отправка ответа на фронт энт
        res.status(201).json({link});

    }catch (e) {
        res.status(500).json({message: "Что то пошло не так!!!"})
    }
});

// /api/link/
router.get('/', auth, async (req, res) => {
    try{
        const links = await Link.find({owner: req.user.userId}); // req.user.userId получаем с промежуточного слоя auth

        // Отправляем ответ
        res.json(links);

    }catch (e) {
        res.status(500).json({message: "Что то пошло не так!!!"})
    }

});

// /api/link/:id
router.get('/:id', auth, async (req, res) => {
    try{
        const link = await Link.findById(req.params.id);

        // Отправляем ответ
        res.json(link);

    }catch (e) {
        res.status(500).json({message: "Что то пошло не так!!!"})
    }

});

module.exports = router;