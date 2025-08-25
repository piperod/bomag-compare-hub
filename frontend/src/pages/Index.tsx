import { useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import ProductLineSelector from '@/components/ProductLineSelector';
import MachineComparison from '@/components/MachineComparison';
import PerformanceCalculator from '@/components/PerformanceCalculator';
import { ChatView } from '@/components/ChatView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Index() {
  const [selectedLine, setSelectedLine] = useState<string>('sdr');
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductLineSelector selectedLine={selectedLine} onLineSelect={setSelectedLine} />
          <Tabs defaultValue="comparison" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="comparison">Comparación de Máquinas</TabsTrigger>
              <TabsTrigger value="calculator">Calculadora de Rendimiento</TabsTrigger>
              <TabsTrigger value="chat">AI Assistant</TabsTrigger>
            </TabsList>
            <TabsContent value="comparison">
              <MachineComparison selectedLine={selectedLine} />
            </TabsContent>
            <TabsContent value="calculator">
              <PerformanceCalculator />
            </TabsContent>
            <TabsContent value="chat">
              <ChatView />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </LanguageProvider>
  );
}
