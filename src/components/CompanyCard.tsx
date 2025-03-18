import { Link } from 'react-router-dom';
import { ExternalLink, MapPin } from 'lucide-react';
import { Company, EnergyType } from '@/lib/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getEnergyTypeColor } from '@/lib/companyData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
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

  return (
    <div className="group animate-in relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg bg-white border border-border hover:border-primary/20">
      <div className="absolute top-2 right-2 z-10">
        <span className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          company.featured 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted text-muted-foreground"
        )}>
          {company.featured ? 'Featured' : 'Free Listing'}
        </span>
      </div>
      
      <div className="relative h-40 overflow-hidden bg-muted">
        {faviconUrl && !imageLoaded ? (
          <Avatar className="w-16 h-16 mx-auto mt-12">
            <AvatarImage 
              src={faviconUrl} 
              alt={`${company.name} favicon`}
              onLoad={handleFaviconLoad}
              className="object-contain"
            />
            <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
          </Avatar>
        ) : (
          <img
            src={company.logo || '/placeholder.svg'}
            alt={`${company.name} logo`}
            onLoad={handleImageLoad}
            className={cn(
              "w-1/3 h-full mx-auto object-contain transition-all duration-500 lazyload-img p-3",
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
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold line-clamp-1">
            {company.name}
          </h3>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
          <span className="truncate">{company.location}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {company.energyTypes.map((type) => (
            <span
              key={type}
              className={cn(
                "inline-flex text-xs px-2 py-1 rounded-full font-medium",
                `bg-${getEnergyTypeColor(type)}/10 text-${getEnergyTypeColor(type)}`
              )}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          ))}
        </div>
        
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {company.description}
        </p>
        
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <Link
            to={`/company/${company.id}`}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View details
          </Link>
          
          {hasValidWebsite ? (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Website <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="inline-flex items-center text-sm text-muted-foreground opacity-50">
              Website <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
