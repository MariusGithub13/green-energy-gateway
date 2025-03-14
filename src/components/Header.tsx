
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Leaf,
  Menu,
  X,
  Search,
  Sun,
  Wind,
  Droplets,
  Flame,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Home', path: '/', icon: <Home className="w-4 h-4 mr-2" /> },
    { label: 'Solar', path: '/?type=solar', icon: <Sun className="w-4 h-4 mr-2" /> },
    { label: 'Wind', path: '/?type=wind', icon: <Wind className="w-4 h-4 mr-2" /> },
    { label: 'Hydro', path: '/?type=hydro', icon: <Droplets className="w-4 h-4 mr-2" /> },
    { label: 'Other Types', path: '/?type=other', icon: <Flame className="w-4 h-4 mr-2" /> },
    { label: 'About', path: '/about', icon: <Leaf className="w-4 h-4 mr-2" /> },
    { label: 'Contact', path: '/contact', icon: <Search className="w-4 h-4 mr-2" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' && !location.search;
    }
    if (path.includes('?')) {
      // Handle paths with query parameters
      const [basePath, query] = path.split('?');
      return location.pathname === basePath && location.search.includes(query);
    }
    return location.pathname === path;
  };

  return (
    <header 
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300 ease-in-out py-4",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-opacity duration-200 hover:opacity-80"
        >
          <Leaf className="h-8 w-8 text-primary" />
          <span className="font-display text-xl font-semibold tracking-tight">
            Renewable Directory
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center",
                isActive(item.path)
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-secondary text-foreground/80 hover:text-foreground"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out fixed inset-0 bg-white z-40 pt-20",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="px-4 py-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 flex items-center",
                isActive(item.path)
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-secondary text-foreground/80 hover:text-foreground"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
