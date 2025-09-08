import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { logout } = useAuth();
  const location = useLocation();
  const base = import.meta.env.BASE_URL;

  return (
    <header className="bg-bomag-yellow flex items-center justify-between px-4 py-2 shadow">
      <div className="flex items-center gap-4">
        <img src={`${base}bomag-logo.png`} alt="BOMAG Logo" className="h-10" />
        <span className="font-oswald text-2xl tracking-widest text-bomag-gray">BOMAG Compare Hub</span>
      </div>
      <nav className="flex gap-4 items-center">
        <Link to="/" className={`px-3 py-1 rounded font-semibold ${location.pathname === '/' ? 'bg-white' : ''} text-black`}>{t('detailComparison')}</Link>
        <Link to="/summary" className={`px-3 py-1 rounded font-semibold ${location.pathname === '/summary' ? 'bg-white' : ''} text-black`}>{t('globalSummary')}</Link>
        <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
          <SelectTrigger className="w-32 bg-white ml-4 text-black border border-gray-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
            <SelectItem value="pt">Português</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={logout}
          variant="outline"
          size="sm"
          className="ml-4 bg-white text-black border-gray-300 hover:bg-gray-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Salir
        </Button>
      </nav>
    </header>
  );
};

export default Header;