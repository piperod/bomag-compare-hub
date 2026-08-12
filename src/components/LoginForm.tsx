import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LANGUAGE_OPTIONS, useLanguage, type Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, Eye, EyeOff, Mail } from 'lucide-react';

const LoginForm: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [mode, setMode] = useState<'email' | 'password'>('password');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, sendEmailSignInLink } = useAuth();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setInfo('');
    try {
      const result = await sendEmailSignInLink(email);
      if (result.ok) {
        setInfo(t('emailLinkSent'));
      } else {
        setError(t(result.error || 'wrongPassword'));
      }
    } catch (err) {
      console.warn('[auth] email link failed', err);
      setError(t('emailLinkFailed'));
    }
    setIsLoading(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setInfo('');

    await new Promise((resolve) => setTimeout(resolve, 300));

    const success = login(username, password);
    if (!success) {
      setError(t('wrongPassword'));
      setPassword('');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-left">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              {t('chooseLanguage')}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setLanguage(opt.value as Language)}
                  className={`rounded-md border px-3 py-2 text-sm font-semibold transition-colors ${
                    language === opt.value
                      ? 'border-bomag-yellow bg-bomag-yellow text-black'
                      : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {t('loginAccess')}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {mode === 'email' ? t('loginDescriptionEmail') : t('loginDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mode === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('loginEmail')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('loginEmailPlaceholder')}
                  autoComplete="email"
                  required
                  disabled={isLoading}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {info && (
                <Alert>
                  <AlertDescription>{info}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !email.trim()}
              >
                <Mail className="h-4 w-4 mr-2" />
                {isLoading ? t('verifying') : t('sendEmailLink')}
              </Button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">{t('username')}</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t('usernamePlaceholder')}
                  autoComplete="username"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('passwordPlaceholder')}
                    className="pr-10"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !username.trim() || !password.trim()}
              >
                {isLoading ? t('verifying') : t('loginSubmit')}
              </Button>
            </form>
          )}

          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-sm text-blue-700 hover:underline"
              onClick={() => {
                setError('');
                setInfo('');
                setMode(mode === 'email' ? 'password' : 'email');
              }}
            >
              {mode === 'email' ? t('usePasswordInstead') : t('useEmailLinkInstead')}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>{t('contactAdmin')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
