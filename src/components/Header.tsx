import { Bell, Plus, Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export const Header = () => {
  const { theme, setTheme } = useTheme();

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
          <h1 className="text-lg font-medium text-primary-foreground">Pierre</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="hover:bg-white/10"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-primary-foreground" />
            ) : (
              <Sun className="h-5 w-5 text-primary-foreground" />
            )}
          </Button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-primary-foreground" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Plus className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};