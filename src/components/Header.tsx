import { Bell } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-semibold">MediTrack</h1>
        <button className="p-2 hover:bg-secondary rounded-full transition-colors">
          <Bell className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};