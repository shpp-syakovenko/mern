import { createContext } from 'react';

export const AuthContext = createContext({
   token: null,
   userId: null,
   login: () => {},
   logOut: () => {},
   isAuthenticated: false
});