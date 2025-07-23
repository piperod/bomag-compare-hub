import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductLineSelectorProps {
  selectedLine: string;
  onLineSelect: (line: string) => void;
}

const ProductLineSelector = ({ selectedLine, onLineSelect }: ProductLineSelectorProps) => {
  const { t } = useLanguage();

  const productLines = [
    {
      id: 'sdr',
      title: t('sdr'),
      description: t('sdrDesc'),
      icon: '/sdricon.png',
      alt: 'Single Drum Roller Icon'
    },
    {
      id: 'ltr',
      title: t('ltr'),
      description: t('ltrDesc'),
      icon: '/ltricon.webp',
      alt: 'Light Tandem Roller Icon'
    },
    {
      id: 'htr',
      title: t('htr'),
      description: t('htrDesc'),
      icon: '/htricon.webp',
      alt: 'Heavy Tandem Roller Icon'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-bomag-gray mb-6">{t('productLines')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <img src={line.icon} alt={line.alt} className="w-auto h-16 max-w-[80px] mx-auto mb-2 object-contain" />
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