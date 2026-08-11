import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { getFirebaseDb } from '@/lib/firebase';

export type StoredUserEmail = {
  username: string;
  name: string;
  email: string;
};

export async function getEmailForUsername(username: string): Promise<string | null> {
  const db = getFirebaseDb();
  if (!db) return null;
  const snap = await getDoc(doc(db, 'userEmails', username));
  if (!snap.exists()) return null;
  const email = String(snap.data().email ?? '').trim().toLowerCase();
  return email || null;
}

export async function saveEmailForUser(input: StoredUserEmail): Promise<void> {
  const db = getFirebaseDb();
  if (!db) throw new Error('firebaseUnavailable');
  const email = input.email.trim().toLowerCase();
  await setDoc(doc(db, 'userEmails', input.username), {
    username: input.username,
    name: input.name,
    email,
    updatedAt: new Date().toISOString(),
  });
}

export async function findUsernameByEmail(email: string): Promise<StoredUserEmail | null> {
  const db = getFirebaseDb();
  if (!db) return null;
  const wanted = email.trim().toLowerCase();
  const snap = await getDocs(collection(db, 'userEmails'));
  for (const row of snap.docs) {
    const data = row.data();
    if (String(data.email ?? '').trim().toLowerCase() === wanted) {
      return {
        username: String(data.username || row.id),
        name: String(data.name ?? ''),
        email: wanted,
      };
    }
  }
  return null;
}
