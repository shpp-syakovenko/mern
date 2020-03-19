const express = require('express'); // Подключаем пакет express
const config = require('config');   // Настройки приложение (важные константы)
const path  = require('path');
const mongoose = require('mongoose'); // Подключаем для связи с Mongo DB


const app = express(); // Server

app.use(express.json({extended: true})); // Обезательно что бы req.body читалось коректно
app.use('/api/auth', require('./routes/auth.routes'));  // регистрируем router auth
app.use('/api/link', require('./routes/link.routes'));  // регистрируем роутер link
app.use('/t', require('./routes/redirect.routes'));

// Если проэкт собран (тоесть готов на реализацию, создана папка build на front-end)
if(process.env.NODE_ENV === 'production'){
    // подключаем статическую сборку
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    // Все get запросы идут к файлу Index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = config.get('port') || 5000; // Метод get позволяет получить значение по ключу

// Асинхронная функция для связи с Mongo DB
async function start(){
    try {
        await mongoose.connect(config.get("mongoUrl"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        // Запускаем сервер только после подключение к базе Mongo DB
        app.listen(PORT, () => console.log(`Server has been start on port ${PORT}...`));

    }catch (e) {
        // Если при соединение возникла ошибка
        console.log("Server error", e.message);
        process.exit(1);
    }
}

start();

