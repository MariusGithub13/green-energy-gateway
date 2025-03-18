
import { Leaf, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-border/60 mt-16">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center">
              <Leaf className="h-6 w-6 text-primary mr-2" />
              <span className="font-display text-lg font-semibold">Renewable Directory</span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              The comprehensive directory of renewable energy companies from around the world, 
              promoting sustainable solutions for a greener future.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors">
                  About the Directory
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground/80 hover:text-primary transition-colors">
                  Submit Your Company
                </Link>
              </li>
              <li>
                <Link to="/?featured=true" className="text-foreground/80 hover:text-primary transition-colors">
                  Featured Companies
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Energy Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/?type=solar" className="text-foreground/80 hover:text-renewable-solar transition-colors">
                  Solar Energy
                </Link>
              </li>
              <li>
                <Link to="/?type=wind" className="text-foreground/80 hover:text-renewable-wind transition-colors">
                  Wind Energy
                </Link>
              </li>
              <li>
                <Link to="/?type=hydro" className="text-foreground/80 hover:text-renewable-hydro transition-colors">
                  Hydroelectric
                </Link>
              </li>
              <li>
                <Link to="/?type=geothermal" className="text-foreground/80 hover:text-renewable-geo transition-colors">
                  Geothermal
                </Link>
              </li>
              <li>
                <Link to="/?type=biomass" className="text-foreground/80 hover:text-renewable-bio transition-colors">
                  Biomass
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-border/60 mt-10 pt-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Renewable Energy Directory. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link 
                to="/privacy" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a 
              href="mailto:contact@renewableenergy-directory.com"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center transition-colors"
            >
              <Mail className="h-4 w-4 mr-1" />
              <span>Contact</span>
            </a>
            
            <a
              href="https://renewableenergy-directory.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center transition-colors"
            >
              <span>Original Site</span>
              <ExternalLink className="h-3.5 w-3.5 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
