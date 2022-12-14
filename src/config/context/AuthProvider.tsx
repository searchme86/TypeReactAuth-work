import { createContext, ReactElement, SetStateAction, useState } from 'react';

interface AuthProviderInterface {
  children: ReactElement;
}

export interface AuthTokenShape {
  pwd: string;
  roles: number[];
  accessToken: string;
  user: string;
}

interface ContextAuthType {
  auth: AuthTokenShape;
  setAuth: React.Dispatch<SetStateAction<AuthTokenShape>>;
  persist: boolean;
  setPersist: React.Dispatch<SetStateAction<ContextAuthType['persist']>>;
}

const ContextInitialValue: AuthTokenShape = {
  pwd: '',
  roles: [],
  accessToken: '',
  user: '',
};

const AuthContext = createContext<ContextAuthType>({
  auth: ContextInitialValue,
  setAuth: () => null,
  persist: false,
  setPersist: () => null,
});

export const AuthProvider = ({ children }: AuthProviderInterface) => {
  const [auth, setAuth] =
    useState<ContextAuthType['auth']>(ContextInitialValue);
  const [persist, setPersist] = useState<ContextAuthType['persist']>(false);

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
