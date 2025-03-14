
import { Button } from '@/components/ui/button';
import { Company } from '@/lib/types';
import FeaturedCompany from '@/components/FeaturedCompany';

interface FeaturedSectionProps {
  companies: Company[];
  onViewAllFeatured: () => void;
}

const FeaturedSection = ({ companies, onViewAllFeatured }: FeaturedSectionProps) => {
  if (companies.length === 0) {
    return null;
  }

  return (
    <section className="mb-12 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Featured Companies</h2>
        <Button 
          variant="ghost" 
          className="text-sm"
          onClick={onViewAllFeatured}
        >
          View all featured
        </Button>
      </div>
      <div className="space-y-4">
        {companies.slice(0, 3).map((company) => (
          <FeaturedCompany key={company.id} company={company} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
