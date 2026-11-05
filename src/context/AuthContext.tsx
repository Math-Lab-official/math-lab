import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../services/firebase';

export interface GoogleAuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface DemoUser {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  currentUser: User | null;
  googleUser: GoogleAuthUser | null;
  demoUser: DemoUser | null;
  effectiveUser: {
    uid?: string;
    email: string | null;
    displayName: string | null;
    photoURL?: string | null;
    role: string;
    isDemo: boolean;
  } | null;
  isAuthenticated: boolean;
  isConnecting: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<boolean>;
  signInWithEmail: (email: string, pass: string) => Promise<boolean>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<boolean>;
  sendPasswordReset: (email: string) => Promise<boolean>;
  setDemoLogin: (name: string, email: string, role: string) => void;
  signOut: () => Promise<void>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const formatAuthErrorMessage = (error: any): string => {
  const code = error?.code || '';
  switch (code) {
    case 'auth/user-not-found':
      return 'No registered account found with this email.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password. Please verify and try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Try signing in instead.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before completing.';
    case 'auth/network-request-failed':
      return 'Network connection failed. Please check your internet connection.';
    default:
      return error?.message || 'Authentication error occurred.';
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [googleUser, setGoogleUser] = useState<GoogleAuthUser | null>(null);
  const [demoUser, setDemoUser] = useState<DemoUser | null>(() => {
    try {
      const saved = localStorage.getItem('math_lab_demo_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Listen to real Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setGoogleUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0] || 'Math Scholar',
          photoURL: user.photoURL,
        });
        // Clear demo user if real user is logged in
        setDemoUser(null);
        localStorage.removeItem('math_lab_demo_user');
      } else {
        setGoogleUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<boolean> => {
    setIsConnecting(true);
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      // Standard sign in without any third-party Gmail scopes
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      const result = await signInWithPopup(auth, provider);
      setGoogleUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || result.user.email?.split('@')[0] || 'Math Scholar',
        photoURL: result.user.photoURL,
      });
      setDemoUser(null);
      localStorage.removeItem('math_lab_demo_user');
      return true;
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        console.error('Google Sign-In Error:', err);
      }
      setAuthError(formatAuthErrorMessage(err));
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const signInWithEmail = async (email: string, pass: string): Promise<boolean> => {
    setIsConnecting(true);
    setAuthError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email.trim(), pass);
      setGoogleUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || result.user.email?.split('@')[0] || 'Math Scholar',
        photoURL: result.user.photoURL,
      });
      setDemoUser(null);
      localStorage.removeItem('math_lab_demo_user');
      return true;
    } catch (err: any) {
      console.error('Email Sign-In Error:', err);
      setAuthError(formatAuthErrorMessage(err));
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string): Promise<boolean> => {
    setIsConnecting(true);
    setAuthError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      const cleanName = name.trim() || email.split('@')[0] || 'Math Scholar';
      await updateProfile(result.user, {
        displayName: cleanName,
      });
      setGoogleUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName: cleanName,
        photoURL: result.user.photoURL,
      });
      setDemoUser(null);
      localStorage.removeItem('math_lab_demo_user');
      return true;
    } catch (err: any) {
      console.error('Email Sign-Up Error:', err);
      setAuthError(formatAuthErrorMessage(err));
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const sendPasswordReset = async (email: string): Promise<boolean> => {
    setIsConnecting(true);
    setAuthError(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return true;
    } catch (err: any) {
      console.error('Password Reset Error:', err);
      setAuthError(formatAuthErrorMessage(err));
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const setDemoLogin = (name: string, email: string, role: string) => {
    const demo = { name, email, role };
    setDemoUser(demo);
    try {
      localStorage.setItem('math_lab_demo_user', JSON.stringify(demo));
    } catch {
      // ignore
    }
  };

  const signOut = async () => {
    try {
      setDemoUser(null);
      localStorage.removeItem('math_lab_demo_user');
      await firebaseSignOut(auth);
    } catch (err: any) {
      console.error('Sign-out error:', err);
    }
  };

  const effectiveUser = currentUser
    ? {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Math Scholar',
        photoURL: currentUser.photoURL,
        role: 'Verified Scholar',
        isDemo: false,
      }
    : demoUser
    ? {
        email: demoUser.email,
        displayName: demoUser.name,
        role: demoUser.role,
        isDemo: true,
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        googleUser,
        demoUser,
        effectiveUser,
        isAuthenticated: !!currentUser || !!demoUser,
        isConnecting,
        authError,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        sendPasswordReset,
        setDemoLogin,
        signOut,
        clearAuthError: () => setAuthError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
