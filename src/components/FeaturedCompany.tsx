
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, MapPin } from 'lucide-react';
import { Company } from '@/lib/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getEnergyTypeColor, generateSlug } from '@/lib/companyData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface FeaturedCompanyProps {
  company: Company;
}

const FeaturedCompany = ({ company }: FeaturedCompanyProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [faviconLoaded, setFaviconLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleFaviconLoad = () => {
    setFaviconLoaded(true);
  };

  // Validate website URL
  const hasValidWebsite = company.website && company.website !== "#";
  
  // Extract domain for favicon
  let faviconUrl = '';
  if (hasValidWebsite) {
    try {
      const domain = new URL(company.website).hostname;
      faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch (e) {
      console.warn(`Invalid URL for favicon: ${company.website}`);
    }
  }
  
  // Generate company slug for URL
  const companySlug = generateSlug(company.name);

  return (
    <div className="group rounded-xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:border-primary/40 transition-all duration-300">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 relative h-52 md:h-full overflow-hidden">
          {faviconUrl && !imageLoaded ? (
            <div className="flex items-center justify-center h-full">
              <Avatar className="w-20 h-20">
                <AvatarImage 
                  src={faviconUrl} 
                  alt={`${company.name} favicon`}
                  onLoad={handleFaviconLoad}
                  className="object-contain"
                />
                <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <img
              src={company.logo || '/placeholder.svg'}
              alt={`${company.name} logo`}
              onLoad={handleImageLoad}
              className={cn(
                "w-1/3 h-1/3 mx-auto object-contain transition-all duration-500 lazyload-img p-4",
                imageLoaded ? "loaded" : "",
                !company.logo && "p-8 object-contain"
              )}
              onError={(e) => {
                if (faviconUrl) {
                  e.currentTarget.src = faviconUrl;
                } else {
                  e.currentTarget.src = '/placeholder.svg';
                  e.currentTarget.classList.add('p-8', 'object-contain');
                }
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="md:col-span-2 p-6">
          <div className="flex flex-col h-full">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{company.name}</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                  Featured
                </span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                <span>{company.location}</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {company.energyTypes.map((type) => (
                  <span
                    key={type}
                    className={cn(
                      "inline-flex text-xs px-2.5 py-1 rounded-full font-medium",
                      `bg-${getEnergyTypeColor(type)}/15 text-${getEnergyTypeColor(type)}`
                    )}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                ))}
              </div>
              
              <p className="mt-4 text-muted-foreground line-clamp-3">
                {company.description}
              </p>
            </div>
            
            <div className="mt-auto pt-4 flex items-center justify-between gap-4">
              <Link
                to={`/${companySlug}`}
                className="inline-flex items-center font-medium text-primary hover:underline transition-all duration-200"
              >
                View complete profile <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              
              {hasValidWebsite ? (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Visit website <ExternalLink className="ml-1 h-3.5 w-3.5" />
                </a>
              ) : (
                <span className="inline-flex items-center text-sm text-muted-foreground opacity-50">
                  Visit website <ExternalLink className="ml-1 h-3.5 w-3.5" />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCompany;
