import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductLineSelectorProps {
  selectedLine: string;
  onLineSelect: (line: string) => void;
}

const ProductLineSelector = ({ selectedLine, onLineSelect }: ProductLineSelectorProps) => {
  const { t } = useLanguage();

  const base = import.meta.env.BASE_URL;
  const productLines = [
    {
      id: 'sdr',
      title: t('sdr'),
      description: t('sdrDesc'),
      icon: `${base}sdricon.png`,
      alt: 'Single Drum Roller Icon'
    },
    {
      id: 'ltr',
      title: t('ltr'),
      description: t('ltrDesc'),
      icon: `${base}ltricon.webp`,
      alt: 'Light Tandem Roller Icon'
    },
    {
      id: 'htr',
      title: t('htr'),
      description: t('htrDesc'),
      icon: `${base}htricon.webp`,
      alt: 'Heavy Tandem Roller Icon'
    },
    {
      id: 'ptr',
      title: t('ptr'),
      description: t('ptrDesc'),
      icon: `${base}ptricon.png`,
      alt: 'Pneumatic Tired Roller Icon'
    },
    {
      id: 'milling',
      title: t('milling'),
      description: t('millingDesc'),
      icon: `${base}millingicon.png`,
      alt: 'Milling Machine Icon'
    },
    {
      id: 'pavers',
      title: t('pavers'),
      description: t('paversDesc'),
      icon: `${base}pavericon.png`,
      alt: 'Paver Icon'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-bomag-gray mb-6">{t('productLines')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productLines.map((line) => (
          <Card
            key={line.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedLine === line.id
                ? 'border-bomag-orange shadow-lg ring-2 ring-bomag-orange'
                : 'border-gray-200 hover:border-bomag-orange'
            }`}
            onClick={() => onLineSelect(line.id)}
          >
            <CardHeader className="text-center">
              <div className="h-24 mb-2 flex items-end justify-center">
                <img
                  src={line.icon}
                  alt={line.alt}
                  className={`w-auto object-contain ${
                    line.id === 'milling' || line.id === 'pavers'
                      ? 'max-h-24 max-w-[200px]'
                      : 'max-h-[72px] max-w-[120px]'
                  }`}
                />
              </div>
              <CardTitle className="text-bomag-gray">{line.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                {line.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductLineSelector;