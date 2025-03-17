
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface CompanyLogoProps {
  logo: string | undefined;
  companyName: string;
  website?: string;
}

const CompanyLogo = ({ logo, companyName, website }: CompanyLogoProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [faviconLoaded, setFaviconLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleFaviconLoad = () => {
    setFaviconLoaded(true);
  };

  // Extract domain for favicon if website exists
  let faviconUrl = '';
  if (website && website !== '#') {
    try {
      const domain = new URL(website).hostname;
      faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch (e) {
      console.warn(`Invalid URL for favicon: ${website}`);
    }
  }

  return (
    <div className="aspect-video md:aspect-[2/1] relative overflow-hidden bg-muted">
      {faviconUrl && !imageLoaded ? (
        <div className="flex items-center justify-center h-full">
          <Avatar className="w-24 h-24">
            <AvatarImage 
              src={faviconUrl} 
              alt={`${companyName} favicon`}
              onLoad={handleFaviconLoad}
              className="object-contain"
            />
            <AvatarFallback>{companyName.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <img
          src={logo || '/placeholder.svg'}
          alt={`${companyName} logo`}
          onLoad={handleImageLoad}
          className={cn(
            "w-1/2 h-1/2 object-contain p-4 mx-auto transition-all duration-500 lazyload-img",
            imageLoaded ? "loaded" : ""
          )}
          onError={(e) => {
            if (faviconUrl) {
              e.currentTarget.src = faviconUrl;
            } else {
              e.currentTarget.src = '/placeholder.svg';
            }
          }}
        />
      )}
    </div>
  );
};

export default CompanyLogo;
