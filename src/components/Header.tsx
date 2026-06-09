import { useState } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrency, DISPLAY_CURRENCIES, type DisplayCurrency } from '@/contexts/CurrencyContext';
import { Link, useLocation } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { LogOut, ChevronDown } from 'lucide-react';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { logout } = useAuth();
  const { currency, setCurrency } = useCurrency();
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const location = useLocation();
  const base = import.meta.env.BASE_URL;

  return (
    <header className="bg-bomag-yellow flex items-center justify-between px-4 py-2 shadow">
      <div className="flex items-center gap-4">
        <img src={`${base}bomag-logo.png`} alt="BOMAG Logo" className="h-10" />
        <span className="font-oswald text-2xl tracking-widest text-bomag-gray">BOMAG Compare Hub</span>
      </div>
      <nav className="flex gap-4 items-center flex-wrap justify-end">
        <Link to="/" className={`px-3 py-1 rounded font-semibold ${location.pathname === '/' ? 'bg-white' : ''} text-black`}>{t('detailComparison')}</Link>
        <Link to="/summary" className={`px-3 py-1 rounded font-semibold ${location.pathname === '/summary' ? 'bg-white' : ''} text-black`}>{t('globalSummary')}</Link>
        <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
          <SelectTrigger className="w-32 bg-white text-black border border-gray-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
            <SelectItem value="pt">Português</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative min-w-[11rem]">
        <Collapsible open={currencyOpen} onOpenChange={setCurrencyOpen} className="w-full">
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-gray-50"
            >
              <span>{t('displayCurrency')}</span>
              <span className="tabular-nums text-bomag-blue">{currency}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${currencyOpen ? 'rotate-180' : ''}`} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="absolute z-50 mt-1 w-[11rem] rounded border border-gray-300 bg-white py-1 shadow-lg">
            <div className="flex flex-col">
              {DISPLAY_CURRENCIES.map((code) => (
                <button
                  key={code}
                  type="button"
                  className={`px-3 py-2 text-left text-sm hover:bg-gray-100 ${code === currency ? 'bg-bomag-light-gray font-bold' : ''}`}
                  onClick={() => {
                    setCurrency(code as DisplayCurrency);
                    setCurrencyOpen(false);
                  }}
                >
                  {code}
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
        </div>
        <Button
          onClick={logout}
          variant="outline"
          size="sm"
          className="bg-white text-black border-gray-300 hover:bg-gray-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Salir
        </Button>
      </nav>
    </header>
  );
};

export default Header;