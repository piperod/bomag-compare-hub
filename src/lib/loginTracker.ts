import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, collection, addDoc, type Firestore } from 'firebase/firestore';

export type LoginEvent = {
  username: string;
  name: string;
  timestamp: string;
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

function getDb(): Firestore | null {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY as string | undefined;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined;
  if (!apiKey || !projectId) return null;

  if (!db) {
    app = initializeApp({
      apiKey,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    });
    db = getFirestore(app);
  }
  return db;
}

/**
 * Fire-and-forget login audit to Firestore (`loginEvents` collection).
 * Configure VITE_FIREBASE_* at build time. Failures never block login.
 */
export function trackLogin(event: LoginEvent): void {
  const firestore = getDb();
  if (!firestore) return;

  void addDoc(collection(firestore, 'loginEvents'), {
    username: event.username,
    name: event.name,
    timestamp: event.timestamp,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    createdAt: new Date().toISOString(),
  }).catch((err) => {
    // Keep auth working; surface the error for debugging (e.g. missing Rules).
    console.warn('[loginTracker] Failed to write login event', err);
  });
}
