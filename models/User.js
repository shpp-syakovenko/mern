const {Schema, model, Types} = require('mongoose');

/*
* Делаем таблицу для пользователя
* type - тип переменной
* required - значит что поле обезательное
* unique - значет что поле должно быть уникальное
*
*
* links это будет массив ссылок,
* ref - показуем к какой колекции мы привязуемся
* type: Types.ObjectId - по этим данным будем выбирать колекцию ссылок
* */
const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    links: [{type: Types.ObjectId, ref: 'Link'}]
});

module.exports = model('User', schema);