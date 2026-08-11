import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CollectEmailDialog() {
  const { t } = useLanguage();
  const { currentUser, needsEmail, saveAccountEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  if (!currentUser || !needsEmail) return null;

  const onSave = async () => {
    setError('');
    setSaving(true);
    const result = await saveAccountEmail(email);
    setSaving(false);
    if (!result.ok) setError(t(result.error || 'emailSaveFailed'));
  };

  return (
    <Dialog open>
      <DialogContent
        className="sm:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t('collectEmailTitle')}</DialogTitle>
          <DialogDescription>{t('collectEmailHint', { name: currentUser.name })}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="account-email">{t('loginEmail')}</Label>
            <Input
              id="account-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('loginEmailPlaceholder')}
              autoComplete="email"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            className="w-full bg-bomag-yellow text-black hover:bg-bomag-orange/90"
            onClick={() => void onSave()}
            disabled={saving || !email.trim()}
          >
            {saving ? t('verifying') : t('saveEmail')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
