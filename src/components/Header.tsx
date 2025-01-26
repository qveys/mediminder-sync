import { Bell, Plus } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-primary z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <img
              src="/placeholder.svg"
              alt="Profile"
              className="w-6 h-6 rounded-full"
            />
          </div>
          <h1 className="text-lg font-medium text-white">Pierre</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};