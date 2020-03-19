import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // Метод записывает в хуки и localStorage данные
  const login = useCallback((jwtToken, id) => {
      setToken(jwtToken);
      setUserId(id);

      // Записываем данные в localStorage
      localStorage.setItem(storageName, JSON.stringify({
          token: jwtToken,
          userId: id
      }));
  },[]);

  // Метод очищает хуки и localStorage
  const logOut = useCallback(() => {
      setToken(null);
      setUserId(null);
      localStorage.removeItem(storageName);

  },[]);

  // Делаем проверку есть ли пользователь в localeStorage
  useEffect(() => {
      // Получаем данные с localStorage и переводим их в обьект
     const data = JSON.parse(localStorage.getItem(storageName));

     // Если данные есть в LocaleStorage то мы их записываем в localStorage и хуки
     if (data && data.token){
         login(data.token, data.userId);
     }
     setReady(true);

  },[login]);

  return { login, logOut, token, userId, ready };
};