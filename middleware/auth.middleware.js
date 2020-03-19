const jwt = require('jsonwebtoken');
const config = require('config');

// Мы берем token расшифровуем его и записываем его в обьект req

module.exports = (req, res, next) => {
  if(req.method === 'OPTIONS'){
      return next();
  }
  try{
      const token = req.headers.authorization.split(' ')[1];   // "Bearer TOKEN" строку нужно разпарсить что бы получить токен

      if(!token){
         return  res.status(401).json({message: "Нет авторизации!!!"});
      }

      // записываем раскодированый token в обьект req
      req.user = jwt.verify(token, config.get('jwtSecret'));
      next();
  }catch (e) {
      res.status(401).json({message: "Нет авторизации!!!"});
  }
};