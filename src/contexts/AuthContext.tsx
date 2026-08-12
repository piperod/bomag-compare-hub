import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signOut,
} from 'firebase/auth';
import { trackLogin } from '@/lib/loginTracker';
import { getFirebaseAuth } from '@/lib/firebase';
import { findUsernameByEmail, getEmailForUsername, saveEmailForUser } from '@/lib/userEmails';

interface AppUser {
  username: string;
  password: string;
  name: string;
  email?: string;
  isAdmin?: boolean;
}

interface SessionUser {
  username: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: SessionUser | null;
  needsEmail: boolean;
  login: (username: string, password: string) => boolean;
  sendEmailSignInLink: (email: string) => Promise<{ ok: boolean; error?: string }>;
  completeEmailSignIn: () => Promise<boolean>;
  saveAccountEmail: (email: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Authorized users. Add `email` to enable passwordless Firebase email-link login.
// NOTE: leftover passwords still work as a fallback.
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
  { username: 'johannes.schroeder', password: 'PvClKJ1ayg!EsF', name: 'Johannes Schroeder' },
  { username: 'carlos.forghieri', password: 'Tr9$vLmQ2!kZa', name: 'Carlos Forghieri' },
  { username: 'ignacio.barbosa', password: 'Bp4^WqXn8!fRt', name: 'Ignacio Barbosa' },
  { username: 'vrm.mexico', password: 'Hy7#GtNc3$wEq', name: 'VRM Mexico' },
  { username: 'juan.porras', password: 'Xn8$RvTq4!wLc7', name: 'Juan David Porras' },
  { username: 'jan.vanbebber', password: 'Qm4#TzKp8!nRc2', name: 'Jan van Bebber' },
  { username: 'admin', password: 'Bomag2026*', name: 'Admin', isAdmin: true },
];

const STORAGE_KEY = 'bomag-auth-user';
const EMAIL_FOR_SIGNIN_KEY = 'bomag-email-for-signin';

function findUserByUsername(username: string): AppUser | undefined {
  return USERS.find((u) => u.username === username);
}

async function resolveUserForEmail(email: string): Promise<SessionUser | null> {
  const normalized = email.trim().toLowerCase();
  const hardcoded = USERS.find((u) => u.email?.toLowerCase() === normalized);
  if (hardcoded) {
    return { username: hardcoded.username, name: hardcoded.name, isAdmin: !!hardcoded.isAdmin };
  }
  const stored = await findUsernameByEmail(normalized);
  if (!stored) return null;
  const listed = findUserByUsername(stored.username);
  if (!listed) return null;
  return { username: listed.username, name: listed.name, isAdmin: !!listed.isAdmin };
}

function persistSession(user: SessionUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ username: user.username }));
}

function trackSessionLogin(user: SessionUser) {
  trackLogin({
    username: user.username,
    name: user.name,
    timestamp: new Date().toISOString(),
  });
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);
  const [needsEmail, setNeedsEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshEmailStatus = async (username: string) => {
    const listed = findUserByUsername(username);
    if (listed?.email) {
      setNeedsEmail(false);
      return;
    }
    const saved = await getEmailForUsername(username);
    setNeedsEmail(!saved);
  };

  const completeEmailSignIn = async (): Promise<boolean> => {
    const auth = getFirebaseAuth();
    if (!auth || !isSignInWithEmailLink(auth, window.location.href)) return false;

    const stored = window.localStorage.getItem(EMAIL_FOR_SIGNIN_KEY) || '';
    const email = stored || window.prompt('Confirm your email to finish sign-in') || '';
    if (!email) return false;

    const allowed = await resolveUserForEmail(email);
    if (!allowed) return false;

    await signInWithEmailLink(auth, email.trim(), window.location.href);
    window.localStorage.removeItem(EMAIL_FOR_SIGNIN_KEY);

    const user = allowed;
    setCurrentUser(user);
    persistSession(user);
    trackSessionLogin(user);

    const cleanUrl = `${window.location.origin}${window.location.pathname}${window.location.hash}`;
    window.history.replaceState({}, document.title, cleanUrl);
    return true;
  };

  useEffect(() => {
    const boot = async () => {
      try {
        const signedIn = await completeEmailSignIn();
        if (signedIn) {
          const username = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}').username;
          if (username) await refreshEmailStatus(username);
          return;
        }

        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as { username: string };
          const match = USERS.find((u) => u.username === parsed.username);
          if (match) {
            setCurrentUser({
              username: match.username,
              name: match.name,
              isAdmin: !!match.isAdmin,
            });
            await refreshEmailStatus(match.username);
          }
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };
    void boot();
    // completeEmailSignIn is stable enough for first mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (username: string, password: string): boolean => {
    const normalized = username.trim().toLowerCase();
    const match = USERS.find(
      (u) => u.username.toLowerCase() === normalized && u.password === password
    );
    if (match) {
      const user: SessionUser = {
        username: match.username,
        name: match.name,
        isAdmin: !!match.isAdmin,
      };
      setCurrentUser(user);
      persistSession(user);
      trackSessionLogin(user);
      void refreshEmailStatus(user.username);
      return true;
    }
    return false;
  };

  const saveAccountEmail = async (email: string): Promise<{ ok: boolean; error?: string }> => {
    if (!currentUser) return { ok: false, error: 'emailSaveFailed' };
    const trimmed = email.trim().toLowerCase();
    if (!trimmed.includes('@')) return { ok: false, error: 'emailSaveFailed' };
    try {
      await saveEmailForUser({
        username: currentUser.username,
        name: currentUser.name,
        email: trimmed,
      });
      setNeedsEmail(false);
      return { ok: true };
    } catch {
      return { ok: false, error: 'emailSaveFailed' };
    }
  };

  const sendEmailSignInLink = async (email: string): Promise<{ ok: boolean; error?: string }> => {
    const auth = getFirebaseAuth();
    if (!auth) return { ok: false, error: 'firebaseUnavailable' };

    const allowed = await resolveUserForEmail(email);
    if (!allowed) return { ok: false, error: 'emailNotAllowed' };

    const continueUrl = `${window.location.origin}${import.meta.env.BASE_URL}`;
    await sendSignInLinkToEmail(auth, email.trim(), {
      url: continueUrl,
      handleCodeInApp: true,
    });
    window.localStorage.setItem(EMAIL_FOR_SIGNIN_KEY, email.trim());
    return { ok: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setNeedsEmail(false);
    localStorage.removeItem(STORAGE_KEY);
    const auth = getFirebaseAuth();
    if (auth) void signOut(auth);
  };

  const value: AuthContextType = {
    isAuthenticated: currentUser !== null,
    currentUser,
    needsEmail,
    login,
    sendEmailSignInLink,
    completeEmailSignIn,
    saveAccountEmail,
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
