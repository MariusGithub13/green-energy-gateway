
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CompanyLogoProps {
  logo: string | undefined;
  companyName: string;
}

const CompanyLogo = ({ logo, companyName }: CompanyLogoProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="aspect-video md:aspect-[2/1] relative overflow-hidden bg-muted">
      <img
        src={logo || '/placeholder.svg'}
        alt={`${companyName} logo`}
        onLoad={handleImageLoad}
        className={cn(
          "w-3/4 h-3/4 object-contain p-4 mx-auto transition-all duration-500 lazyload-img",
          imageLoaded ? "loaded" : ""
        )}
        onError={(e) => {
          e.currentTarget.src = '/placeholder.svg';
        }}
      />
    </div>
  );
};

export default CompanyLogo;
