import { Dashboard } from './components/Dashboard';
import { SidebarProvider } from './contexts/SidebarContext';

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-gray-50">
        <Dashboard />
      </div>
    </SidebarProvider>
  );
}

