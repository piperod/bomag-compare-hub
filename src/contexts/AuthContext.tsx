import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppUser {
  username: string;
  password: string;
  name: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: { username: string; name: string; isAdmin: boolean } | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Authorized users. NOTE: credentials are bundled client-side; this gates a
// static demo app, not sensitive data.
const USERS: AppUser[] = [
  { username: 'randhir.haripersad', password: 'MEjgfDR%Let2KW', name: 'Randhir Haripersad' },
  { username: 'ahmet.cimsit', password: 'ZqKZxondZhbF!9', name: 'Rasim Ahmet Cimsit' },
  { username: 'daniel.werner-meier', password: '1vgMKrcd*9Bcm^', name: 'Daniel Werner-Meier' },
  { username: 'andy.quek', password: 'GCFww9!yyh3iHt', name: 'Andy Aik Lin Quek' },
  { username: 'benjamin.lee', password: '6Kh7PHiY8wUSQ4', name: 'Benjamin Lee' },
  { username: 'jason.tan', password: 'SK$FhfMu6$dna^', name: 'Jason Tan' },
  { username: 'jasha.kokich', password: '9H!LPAruOLPCaJ', name: 'Jasha Kokich' },
  { username: 'fu.tao', password: 'Mz2mpKY876X2El', name: 'Fu Tao' },
  { username: 'ritesh.palmar', password: '2NZ&Bi9lutBuyk', name: 'Ritesh Palmar' },
  { username: 'luisa.vargas', password: 'i6BdLe3y3PQ^53', name: 'Luisa Vargas', isAdmin: true },
  { username: 'diego.torres', password: 'wUbw9!N#2Px1Fa', name: 'Diego Torres' },
  { username: 'admin', password: 'Bomag2026*', name: 'Admin', isAdmin: true },
];

const STORAGE_KEY = 'bomag-auth-user';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthContextType['currentUser']>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { username: string };
        const match = USERS.find((u) => u.username === parsed.username);
        if (match) {
          setCurrentUser({ username: match.username, name: match.name, isAdmin: !!match.isAdmin });
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    const normalized = username.trim().toLowerCase();
    const match = USERS.find(
      (u) => u.username.toLowerCase() === normalized && u.password === password
    );
    if (match) {
      const user = { username: match.username, name: match.name, isAdmin: !!match.isAdmin };
      setCurrentUser(user);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ username: match.username }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value: AuthContextType = {
    isAuthenticated: currentUser !== null,
    currentUser,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
