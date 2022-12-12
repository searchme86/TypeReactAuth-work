import { createContext, ReactElement, useState } from 'react';

interface AuthProviderInterface {
  children: ReactElement;
}

const AuthContext = createContext({});

export const AuthProvider = ({ children }: AuthProviderInterface) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState('');

  let localStoragePersitValue = localStorage.getItem('persist');
  if (typeof localStoragePersitValue === 'string') {
    setPersist(JSON.parse(localStoragePersitValue) || false);
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
