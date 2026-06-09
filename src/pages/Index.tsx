import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import ProductLineSelector from '@/components/ProductLineSelector';
import MachineComparison from '@/components/MachineComparison';
import PerformanceCalculator from '@/components/PerformanceCalculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function Index() {
  const { t } = useLanguage();
  const [selectedLine, setSelectedLine] = useState<string>('sdr');
  const [selectedMachines, setSelectedMachines] = useState<string[]>([]);
  const [editableTCO, setEditableTCO] = useState<{ [key: string]: number }>({});
  const [editablePrice, setEditablePrice] = useState<{ [key: string]: number }>({});
  const [editablePreventiveMaintenance, setEditablePreventiveMaintenance] = useState<{ [key: string]: number }>({});
  const [editableCorrectiveMaintenance, setEditableCorrectiveMaintenance] = useState<{ [key: string]: number }>({});
  const [editableRemainingValue, setEditableRemainingValue] = useState<{ [key: string]: number }>({});
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
    setEditablePrice({});
    setEditablePreventiveMaintenance({});
    setEditableCorrectiveMaintenance({});
    setEditableRemainingValue({});
  }, [selectedLine]);

  // Persist selections per line
  useEffect(() => {
    try {
      localStorage.setItem(`selectedMachines:${selectedLine}`, JSON.stringify(selectedMachines));
    } catch {}
  }, [selectedLine, selectedMachines]);

  // No scrolling needed; calculator only available as modal
  
  return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductLineSelector selectedLine={selectedLine} onLineSelect={setSelectedLine} />
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="grid grid-cols-1">
                <TabsTrigger value="comparison">{t('machineComparison')}</TabsTrigger>
              </TabsList>
              <Dialog open={isPerfCalcOpen} onOpenChange={setIsPerfCalcOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-bomag-yellow text-black hover:bg-bomag-orange/90">{t('openBomagPerformanceCalculator')}</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>{t('bomagPerformanceCalculator')}</DialogTitle>
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
                editablePrice={editablePrice}
                setEditablePrice={setEditablePrice}
                editablePreventiveMaintenance={editablePreventiveMaintenance}
                setEditablePreventiveMaintenance={setEditablePreventiveMaintenance}
                editableCorrectiveMaintenance={editableCorrectiveMaintenance}
                setEditableCorrectiveMaintenance={setEditableCorrectiveMaintenance}
                editableRemainingValue={editableRemainingValue}
                setEditableRemainingValue={setEditableRemainingValue}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
  );
}
