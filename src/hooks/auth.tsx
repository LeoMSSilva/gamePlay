import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as AuthSession from 'expo-auth-session';

import { COLLECTION_USER } from '~/configs/database';
import { api } from '~/services/api';

type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
};

type AuthContextData = {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  };
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  const REDIRECT_URI = process.env.REDIRECT_URI as string;
  const SCOPE = process.env.SCOPE as string;
  const RESPONSE_TYPE = process.env.RESPONSE_TYPE as string;
  const CLIENT_ID = process.env.CLIENT_ID as string;
  const CDN_IMAGE = process.env.CDN_IMAGE as string;
  const baseURL = api.defaults.baseURL as string;
  const authUrl = `${baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

  const prepareUser = async (token: string) => {
    const userInfo = await api.get<User>('/users/@me');
    const firstName = userInfo.data.username.split(' ')[0];
    userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;
    return {
      ...userInfo.data,
      firstName,
      token,
    } as User;
  };

  const signIn = async () => {
    try {
      setLoading(true);
      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;
      if (type === 'success' && !params.error && params.access_token) {
        const token = params.access_token;
        api.defaults.headers.authorization = `Bearer ${token}`;
        const userData = await prepareUser(token);
        await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userData));
        setUser(userData);
      }
    } catch {
      throw new Error('Não foi possível autenticar!');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setUser({} as User);
    await AsyncStorage.removeItem(COLLECTION_USER);
  };

  const loadUserStorageData = async () => {
    const storage = await AsyncStorage.getItem(COLLECTION_USER);
    if (storage) {
      const userLogged = JSON.parse(storage) as User;
      api.defaults.headers.authorization = `Bearer ${userLogged.token}`;
      setUser(userLogged);
    }
  };

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
