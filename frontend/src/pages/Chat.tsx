import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import { ChatView } from '@/components/ChatView';

export default function Chat() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <ChatView />
      </div>
    </LanguageProvider>
  );
}
