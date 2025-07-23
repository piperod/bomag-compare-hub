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
      description: 'Rodillos de un solo tambor para compactación de suelos y asfalto',
      icon: '🛞'
    },
    {
      id: 'ltr',
      title: t('ltr'),
      description: 'Rodillos tandem ligeros para trabajos de compactación versátiles',
      icon: '🚜'
    },
    {
      id: 'htr',
      title: t('htr'),
      description: 'Rodillos tandem pesados para proyectos de gran escala',
      icon: '🚛'
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
              <div className="text-4xl mb-2">{line.icon}</div>
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