import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '@env'; // or use process.env
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({domain: AUTH0_DOMAIN, clientId: AUTH0_CLIENT_ID});

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const login = useCallback(async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email offline_access',
        audience: 'https://your-api-identifier', // match API in Auth0
      });
      setAccessToken(credentials.accessToken);
      const userInfo = await auth0.auth.userInfo({token: credentials.accessToken});
      setUser(userInfo);
    } catch (e) {
      console.warn('Login error', e);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await auth0.webAuth.clearSession();
    } catch (e) {
      console.warn('Logout error', e);
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  }, []);

  useEffect(() => {
    // In a real app, restore tokens from secure storage here
    setInitializing(false);
  }, []);

  const value = {user, accessToken, initializing, login, logout};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
