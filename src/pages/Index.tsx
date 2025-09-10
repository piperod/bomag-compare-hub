import { useState, useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import ProductLineSelector from '@/components/ProductLineSelector';
import MachineComparison from '@/components/MachineComparison';
import PerformanceCalculator from '@/components/PerformanceCalculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function Index() {
  const [selectedLine, setSelectedLine] = useState<string>('sdr');
  const [selectedMachines, setSelectedMachines] = useState<string[]>([]);
  const [editableTCO, setEditableTCO] = useState<{ [key: string]: number }>({});
  const [activeTab, setActiveTab] = useState<'comparison'>('comparison');
  const [isPerfCalcOpen, setIsPerfCalcOpen] = useState(false);
  
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

  // No scrolling needed; calculator only available as modal
  
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductLineSelector selectedLine={selectedLine} onLineSelect={setSelectedLine} />
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="grid grid-cols-1">
                <TabsTrigger value="comparison">Comparación de Máquinas</TabsTrigger>
              </TabsList>
              <Dialog open={isPerfCalcOpen} onOpenChange={setIsPerfCalcOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-bomag-yellow text-black hover:bg-bomag-orange/90">Abrir calculadora de rendimiento BOMAG</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Calculadora de Rendimiento BOMAG</DialogTitle>
                  </DialogHeader>
                  <div className="max-h-[75vh] overflow-y-auto">
                    <PerformanceCalculator />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <TabsContent value="comparison" forceMount>
              <MachineComparison 
                selectedLine={selectedLine} 
                selectedMachines={selectedMachines}
                setSelectedMachines={setSelectedMachines}
                editableTCO={editableTCO}
                setEditableTCO={setEditableTCO}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </LanguageProvider>
  );
}
