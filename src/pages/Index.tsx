import { useState, useEffect, useRef } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import ProductLineSelector from '@/components/ProductLineSelector';
import MachineComparison from '@/components/MachineComparison';
import PerformanceCalculator from '@/components/PerformanceCalculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Index() {
  const [selectedLine, setSelectedLine] = useState<string>('sdr');
  const [selectedMachines, setSelectedMachines] = useState<string[]>([]);
  const [editableTCO, setEditableTCO] = useState<{ [key: string]: number }>({});
  const [activeTab, setActiveTab] = useState<'comparison' | 'calculator'>('comparison');
  const calculatorRef = useRef<HTMLDivElement | null>(null);
  
  // Load saved selections per line on line change
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`selectedMachines:${selectedLine}`);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setSelectedMachines(parsed);
      else setSelectedMachines([]);
    } catch {
      setSelectedMachines([]);
    }
    setEditableTCO({});
  }, [selectedLine]);

  // Persist selections per line
  useEffect(() => {
    try {
      localStorage.setItem(`selectedMachines:${selectedLine}`, JSON.stringify(selectedMachines));
    } catch {}
  }, [selectedLine, selectedMachines]);

  // Smooth scroll to calculator section when switching to calculator tab
  useEffect(() => {
    if (activeTab === 'calculator' && calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeTab]);
  
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductLineSelector selectedLine={selectedLine} onLineSelect={setSelectedLine} />
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="comparison">Comparación de Máquinas</TabsTrigger>
              <TabsTrigger value="calculator">Calculadora de Rendimiento BOMAG</TabsTrigger>
            </TabsList>
            <TabsContent value="comparison" forceMount>
              <MachineComparison 
                selectedLine={selectedLine} 
                selectedMachines={selectedMachines}
                setSelectedMachines={setSelectedMachines}
                editableTCO={editableTCO}
                setEditableTCO={setEditableTCO}
              />
            </TabsContent>
            <TabsContent value="calculator" forceMount>
              <div ref={calculatorRef}>
                <PerformanceCalculator />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </LanguageProvider>
  );
}
