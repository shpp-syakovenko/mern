const { Router } = require('express');
const Link = require('../models/Link');
const router = Router();

router.get('/:code', async (req, res) => {
    try{
        // Ищем ссылку по полю code
        const link = await Link.findOne({code: req.params.code});

        // Если ссылка найдена
        if(link){
            link.clicks++;
            // Сохраняем изменеие
            await link.save();

            // Делаем редирект на ссылку Link.from
            return res.redirect(link.from);
        }

        res.status(404).json({message: "Ссылка не найдена"});

    }catch (e) {
        res.status(500).json({message: "Что то погло не так!!!"});
    }
});

module.exports = router;