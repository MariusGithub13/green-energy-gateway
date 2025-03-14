
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroBanner = () => {
  const scrollToFilters = () => {
    const filterElement = document.getElementById('filter-section');
    if (filterElement) {
      filterElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-b from-primary/5 to-transparent py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-4 animate-fade-in">
          The comprehensive renewable energy directory
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 tracking-tight animate-fade-up">
          Discover Renewable Energy Companies
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
          Explore our curated directory of companies leading the transition to clean, 
          sustainable energy solutions around the world.
        </p>
        <Button 
          className="animate-fade-up" 
          style={{ animationDelay: '200ms' }}
          onClick={scrollToFilters}
        >
          Browse Directory <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default HeroBanner;
