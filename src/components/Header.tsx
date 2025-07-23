import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-bomag-yellow shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            {/* Remove the BOMAG text div and keep only the logo image */}
            <img src="/bomag-logo.png" alt="BOMAG Logo" className="h-10 w-auto" />
            <h1 className="font-oswald text-black text-xl font-semibold">
              {t('title')}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
              <SelectTrigger className="w-32 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;