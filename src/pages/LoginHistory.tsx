import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  downloadLoginEventsExcel,
  fetchLoginEvents,
  type LoginEvent,
} from '@/lib/loginTracker';

export default function LoginHistory() {
  const { currentUser } = useAuth();
  const { t, language } = useLanguage();
  const [events, setEvents] = useState<LoginEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser?.isAdmin) return;
    let cancelled = false;
    fetchLoginEvents()
      .then((rows) => {
        if (!cancelled) setEvents(rows);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [currentUser?.isAdmin]);

  if (!currentUser?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  const formatWhen = (iso: string) => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso || '—';
    return date.toLocaleString(language);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-4">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
            <div>
              <h2 className="text-2xl font-bold">{t('loginHistory')}</h2>
              <p className="text-sm text-gray-600 mt-1">{t('loginHistoryHint')}</p>
            </div>
            <Button
              className="bg-bomag-yellow text-black hover:bg-bomag-orange/90"
              onClick={() => downloadLoginEventsExcel(events)}
              disabled={events.length === 0}
            >
              {t('exportExcel')}
            </Button>
          </div>

          {loading && <p className="text-sm text-gray-600">{t('verifying')}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {!loading && !error && events.length === 0 && (
            <p className="text-sm text-gray-600">{t('noLoginEvents')}</p>
          )}

          {events.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-bomag-light-gray">
                    <th className="border border-gray-300 p-2 text-left">{t('loginWhen')}</th>
                    <th className="border border-gray-300 p-2 text-left">{t('username')}</th>
                    <th className="border border-gray-300 p-2 text-left">{t('loginName')}</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, idx) => (
                    <tr key={`${event.username}-${event.timestamp}-${idx}`} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 whitespace-nowrap">{formatWhen(event.timestamp)}</td>
                      <td className="border border-gray-300 p-2">{event.username}</td>
                      <td className="border border-gray-300 p-2">{event.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
