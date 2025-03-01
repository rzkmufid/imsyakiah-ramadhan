import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Layout() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="crescent-moon"></span>
              <span className="hidden sm:inline">Imsakiyah Ramadhan</span>
              <span className="sm:hidden">Imsakiyah</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/" ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/about" ? "text-foreground" : "text-muted-foreground"
              )}
            >
              About
            </Link>
            
            {/* GitHub Link */}
            <a 
              href="https://github.com/rzkmufid" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
          
          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            {/* GitHub Link for Mobile */}
            <a 
              href="https://github.com/rzkmufid" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors mr-2"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-2"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-bold">
                      <span className="crescent-moon"></span>
                      Imsakiyah
                    </span>
                    {/* The SheetClose component already provides a close button, so we don't need to add another one */}
                  </div>
                  
                  <nav className="flex flex-col space-y-4">
                    <Link
                      to="/"
                      onClick={closeMenu}
                      className={cn(
                        "px-2 py-3 rounded-md transition-colors hover:bg-primary/10",
                        location.pathname === "/" ? "bg-primary/10 text-primary font-medium" : "text-foreground"
                      )}
                    >
                      Home
                    </Link>
                    <Link
                      to="/about"
                      onClick={closeMenu}
                      className={cn(
                        "px-2 py-3 rounded-md transition-colors hover:bg-primary/10",
                        location.pathname === "/about" ? "bg-primary/10 text-primary font-medium" : "text-foreground"
                      )}
                    >
                      About
                    </Link>
                    
                    {/* GitHub Link in Mobile Menu */}
                    <a 
                      href="https://github.com/rzkmufid" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors flex items-center gap-2 px-2 py-3"
                      onClick={closeMenu}
                    >
                      <Github className="h-5 w-5" />
                      <span>GitHub</span>
                    </a>
                  </nav>
                  
                  <div className="mt-auto pt-6 border-t">
                    <p className="text-sm text-muted-foreground">
                      &copy; {new Date().getFullYear()} Imsakiyah Ramadhan
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="flex items-center text-sm text-muted-foreground">
            Made by <span className="mx-1 text-primary"><a href="https://rzkmufid.vercel.app" target="_blank" rel="noopener noreferrer">Mufid</a></span> for the Muslim community • <span className="mx-1 text-primary">رمضان كريم</span>
          </p>
        </div>
      </footer>
    </div>
  );
}