import { useState, useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import ProductLineSelector from '@/components/ProductLineSelector';
import MachineComparison from '@/components/MachineComparison';
import PerformanceCalculator from '@/components/PerformanceCalculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Index() {
  const [selectedLine, setSelectedLine] = useState<string>('sdr');
  const [selectedMachines, setSelectedMachines] = useState<string[]>([]);
  const [editableTCO, setEditableTCO] = useState<{ [key: number]: number }>({});
  
  // Reset machine selection when product line changes
  useEffect(() => {
    setSelectedMachines([]);
    setEditableTCO({});
  }, [selectedLine]);
  
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductLineSelector selectedLine={selectedLine} onLineSelect={setSelectedLine} />
          <Tabs defaultValue="comparison" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="comparison">Comparación de Máquinas</TabsTrigger>
              <TabsTrigger value="calculator">Calculadora de Rendimiento BOMAG</TabsTrigger>
            </TabsList>
            <TabsContent value="comparison">
              <MachineComparison 
                selectedLine={selectedLine} 
                selectedMachines={selectedMachines}
                setSelectedMachines={setSelectedMachines}
                editableTCO={editableTCO}
                setEditableTCO={setEditableTCO}
              />
            </TabsContent>
            <TabsContent value="calculator">
              <PerformanceCalculator />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </LanguageProvider>
  );
}
