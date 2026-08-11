import { collection, addDoc, getDocs } from 'firebase/firestore';
import { getFirebaseDb } from '@/lib/firebase';

export type LoginEvent = {
  username: string;
  name: string;
  timestamp: string;
  userAgent?: string;
};

function getDb() {
  return getFirebaseDb();
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

export async function fetchLoginEvents(): Promise<LoginEvent[]> {
  const firestore = getDb();
  if (!firestore) return [];

  const snap = await getDocs(collection(firestore, 'loginEvents'));
  const events = snap.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      username: String(data.username ?? ''),
      name: String(data.name ?? ''),
      timestamp: String(data.timestamp || data.createdAt || ''),
      userAgent: data.userAgent ? String(data.userAgent) : '',
    };
  });
  events.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  return events;
}

function csvCell(value: string): string {
  const escaped = value.replace(/"/g, '""');
  return `"${escaped}"`;
}

/** UTF-8 CSV that Microsoft Excel / Excel Online opens correctly. */
export function downloadLoginEventsExcel(events: LoginEvent[]): void {
  const header = ['timestamp', 'username', 'name', 'userAgent'];
  const lines = [
    header.join(','),
    ...events.map((event) =>
      [event.timestamp, event.username, event.name, event.userAgent ?? '']
        .map((cell) => csvCell(cell))
        .join(',')
    ),
  ];
  const csv = `\uFEFF${lines.join('\r\n')}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const day = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `bomag-logins-${day}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
