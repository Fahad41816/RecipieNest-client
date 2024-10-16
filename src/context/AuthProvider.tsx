/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/order
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { GetCurrentUser } from '../services/AuthService';
import { IUser } from '../types';

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setuser: (user: IUser | null) => void;
  setisLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<IUserProviderValues>({
  user: null,
  isLoading: true,
  setuser: () => {},
  setisLoading: () => {}
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setuser] = useState<IUser | null>(null);
  const [isLoading, setisLoading] = useState(true);

  const addUser = async () => {
    const UserData: any = await GetCurrentUser();

    console.log('user', UserData);

    setuser(UserData);
    setisLoading(false);
  };

  useEffect(() => {
    addUser();
    console.log("userf", user)
  }, [isLoading]);  

  return (
    <UserContext.Provider value={{ user, setuser, isLoading, setisLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within the UserProvider context');
  }

  return context;
};

export default AuthProvider;
