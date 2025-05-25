import { createContext } from 'react';

export interface AuthContextType {
    name: string;
}

export const AuthContext = createContext<AuthContextType>({ name: '' }); 