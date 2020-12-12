import React, { useState, useEffect, useContext, createContext } from 'react';
import cookie from 'js-cookie';
import { api } from '../lib/api'
import Router from 'next/router';

const authContext = createContext();

// You can wrap your _app.js with this provider
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Custom React hook to access the context
export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  // Store the user in state
  const [user, setUser] = useState(null);

  const signin = (email, password) => {
    return api.post('/rest-auth/login/', { email, password })
      .then(response => {
        return response;
      })
      .catch(e => e.response);
  };

  const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();

    return api.post('/rest-auth/logout/')
      .then(response => {
        console.log(response);
      })
      .catch(e => console.log(err));
  };

  useEffect(() => {
    return api.get('/rest-auth/user/')
      .then(response => {
        // console.log(response);
        setUser(response.data)
      })
      .catch(e => console.log(e.response));
  }, []);

  return {
    user,
    signin,
    signout
  };
}