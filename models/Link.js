const {Schema, model, Types} = require('mongoose');

/*
* Делаем таблицу для пользователя
* type - тип переменной
* required - значит что поле обезательное
* unique - значет что поле должно быть уникальное
* default - значение по умолчанию
*
*
* from - откуда ссылка
* to - куда ссылка ведет
* code - код ссылки
* date - дата ссылки
* clicks - клики по ссылке
* ref - показуем к какой колекции мы привязуемся
* type: Types.ObjectId - по этому пользователю будем привязывать ссылки
* owner - владелиц ссылки
*
* */
const schema = new Schema({
    from: {type: String, required: true},
    to: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    date: {type: Date, default: Date.now},
    clicks: {type: Number, default: 0},
    owner: {type: Types.ObjectId, ref: "User"}
});

module.exports = model('Link', schema);