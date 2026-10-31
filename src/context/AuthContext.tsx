import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../services/firebase';
import { 
  setInMemoryToken, 
  getInMemoryToken, 
  sendGmailMessage, 
  createGmailDraft, 
  SendEmailOptions, 
  getGmailProfile, 
  GmailProfile 
} from '../services/gmailService';

// All Gmail scopes authorized in the project
export const GMAIL_SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.labels',
];

export interface GoogleAuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  googleUser: GoogleAuthUser | null;
  isGmailConnected: boolean;
  gmailProfile: GmailProfile | null;
  isConnecting: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<boolean>;
  disconnectGoogle: () => Promise<void>;
  sendEmail: (options: SendEmailOptions) => Promise<{ id: string; threadId: string }>;
  saveDraft: (options: SendEmailOptions) => Promise<{ id: string }>;
  clearAuthError: () => void;
  refreshGmailProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [googleUser, setGoogleUser] = useState<GoogleAuthUser | null>(null);
  const [isGmailConnected, setIsGmailConnected] = useState<boolean>(false);
  const [gmailProfile, setGmailProfile] = useState<GmailProfile | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setGoogleUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        // Check if token exists in memory
        const token = getInMemoryToken();
        if (token) {
          setIsGmailConnected(true);
          try {
            const profile = await getGmailProfile(token);
            setGmailProfile(profile);
          } catch {
            // Profile fetch optional
          }
        }
      } else {
        setGoogleUser(null);
        setIsGmailConnected(false);
        setGmailProfile(null);
        setInMemoryToken(null, null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<boolean> => {
    setIsConnecting(true);
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      GMAIL_SCOPES.forEach((scope) => provider.addScope(scope));
      // Force prompt so users are aware of the requested permissions
      provider.setCustomParameters({
        prompt: 'consent',
        access_type: 'online',
      });

      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;

      if (!accessToken) {
        throw new Error('Google sign-in succeeded, but no access token was returned for Gmail.');
      }

      // STRICT REQUIREMENT: OAuth access tokens stored strictly in memory
      setInMemoryToken(accessToken, result.user.email);

      setGoogleUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      });
      setIsGmailConnected(true);

      // Fetch user profile info from Gmail API
      try {
        const profile = await getGmailProfile(accessToken);
        setGmailProfile(profile);
      } catch (err: any) {
        console.warn('Could not retrieve Gmail profile immediately:', err);
      }

      return true;
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      setAuthError(err?.message || 'Failed to authenticate with Google.');
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectGoogle = async () => {
    try {
      setInMemoryToken(null, null);
      setIsGmailConnected(false);
      setGmailProfile(null);
      await firebaseSignOut(auth);
    } catch (err: any) {
      console.error('Sign-out error:', err);
    }
  };

  const refreshGmailProfile = async () => {
    const token = getInMemoryToken();
    if (!token) return;
    try {
      const profile = await getGmailProfile(token);
      setGmailProfile(profile);
    } catch (err) {
      console.error('Failed to refresh Gmail profile:', err);
    }
  };

  const sendEmail = async (options: SendEmailOptions) => {
    const token = getInMemoryToken();
    if (!token) {
      throw new Error('Please sign in with Google to use Gmail features.');
    }
    return await sendGmailMessage(options, token);
  };

  const saveDraft = async (options: SendEmailOptions) => {
    const token = getInMemoryToken();
    if (!token) {
      throw new Error('Please sign in with Google to create Gmail drafts.');
    }
    const res = await createGmailDraft(options, token);
    return { id: res.id };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        googleUser,
        isGmailConnected,
        gmailProfile,
        isConnecting,
        authError,
        signInWithGoogle,
        disconnectGoogle,
        sendEmail,
        saveDraft,
        clearAuthError: () => setAuthError(null),
        refreshGmailProfile,
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
