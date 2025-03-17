
import { Building, CheckCircle, Package, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Company, EnergyType } from '@/lib/types';
import { getEnergyTypeColor } from '@/lib/companyData';

interface CompanyDetailsProps {
  company: Company;
}

const CompanyDetails = ({ company }: CompanyDetailsProps) => {
  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {company.energyTypes.map((type: EnergyType) => (
          <Badge
            key={type}
            variant="outline"
            className={cn(
              `border-${getEnergyTypeColor(type)}/40 bg-${getEnergyTypeColor(type)}/10 text-${getEnergyTypeColor(type)}`
            )}
          >
            {type === "other" 
              ? (company.country || "Other") 
              : type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        ))}
      </div>
      
      <div className="prose max-w-none">
        <p className="text-lg">{company.description}</p>
      </div>
      
      {(company.services?.length > 0 || company.products?.length > 0) && (
        <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-2">
          {company.services?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Building className="h-5 w-5 mr-2 text-muted-foreground" />
                Services
              </h3>
              <ul className="space-y-2">
                {company.services.map((service, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {company.products?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Package className="h-5 w-5 mr-2 text-muted-foreground" />
                Products
              </h3>
              <ul className="space-y-2">
                {company.products.map((product, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>{product}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {company.tags && company.tags.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Tag className="h-5 w-5 mr-2 text-muted-foreground" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {company.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {company.certifications && company.certifications.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Certifications & Awards</h3>
          <div className="flex flex-wrap gap-2">
            {company.certifications.map((cert, index) => (
              <Badge 
                key={index} 
                variant="outline"
                className="bg-accent/50 text-accent-foreground"
              >
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
