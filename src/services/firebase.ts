import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getDatabase, Database } from 'firebase/database';
import { firebaseConfig } from './firebaseConfig';

let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth: Auth = getAuth(app);

let database: Database | null = null;
try {
  database = getDatabase(app);
} catch (err) {
  console.warn('Firebase Realtime Database initialization warning:', err);
}

export { database };
export default app;
