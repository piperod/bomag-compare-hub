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

function trackLoginToSheet(event: LoginEvent): void {
  const url = import.meta.env.VITE_LOGIN_SHEET_WEBHOOK_URL as string | undefined;
  if (!url) return;

  const payload = JSON.stringify({
    ...event,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  });

  try {
    void fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: payload,
    });
  } catch (err) {
    console.warn('[loginTracker] Sheet webhook failed', err);
  }
}

function trackLoginToFirestore(event: LoginEvent): void {
  const firestore = getDb();
  if (!firestore) return;

  void addDoc(collection(firestore, 'loginEvents'), {
    username: event.username,
    name: event.name,
    timestamp: event.timestamp,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    createdAt: new Date().toISOString(),
  })
    .then((ref) => {
      console.info('[loginTracker] Firestore saved', ref.id);
    })
    .catch((err) => {
      console.warn('[loginTracker] Firestore failed', err);
    });
}

/**
 * Fire-and-forget login audit to Firestore and/or Google Sheets.
 * Failures never block login.
 */
export function trackLogin(event: LoginEvent): void {
  console.info('[loginTracker] Writing login event', event.username);
  trackLoginToFirestore(event);
  trackLoginToSheet(event);
}
