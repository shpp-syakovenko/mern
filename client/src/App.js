import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {NavBar} from "./components/NavBar";
import 'materialize-css';
import {Loader} from "./components/Loader";


function App() {
    // Данные про пользователя
    const {login, logOut, userId, token, ready } = useAuth();
    // Зарегистрирован пользователь или нет
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if(!ready){
        return <Loader />
    }
  return (
      <AuthContext.Provider value={{
          login,
          logOut,
          userId,
          token,
          isAuthenticated
      }}>
          <Router>
              {isAuthenticated && <NavBar/>}
              <div className="container">
                  {routes}
              </div>
          </Router>
      </AuthContext.Provider>

  );
}

export default App;
