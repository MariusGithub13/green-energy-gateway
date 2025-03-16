
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Company } from '@/lib/types';

interface CompanyHeaderProps {
  company: Company;
}

const CompanyHeader = ({ company }: CompanyHeaderProps) => {
  return (
    <div className="mb-6">
      <Button
        variant="ghost"
        asChild
        className="group mb-6 hover:bg-transparent p-0"
      >
        <Link to="/" className="inline-flex items-center text-muted-foreground group-hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to directory
        </Link>
      </Button>
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight animate-fade-in">
          {company.name}
        </h1>
        
        {company.featured && (
          <Badge className="bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
      </div>
    </div>
  );
};

export default CompanyHeader;
