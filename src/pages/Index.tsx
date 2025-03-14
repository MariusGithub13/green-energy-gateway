
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Leaf, Filter, LayoutGrid, ArrowDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompanyCard from '@/components/CompanyCard';
import FeaturedCompany from '@/components/FeaturedCompany';
import FilterPanel from '@/components/FilterPanel';
import Pagination from '@/components/Pagination';
import { Company, EnergyType, FilterOptions } from '@/lib/types';
import { 
  fetchCompanyData, 
  filterCompanies, 
  getUniqueFilterValues,
  getFeaturedCompanies 
} from '@/lib/companyData';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 20;

const Index = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [featuredCompanies, setFeaturedCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    energyTypes: [],
    countries: [],
    regions: [],
    searchTerm: '',
    featured: false,
  });
  const [filterValues, setFilterValues] = useState({
    countries: [] as string[],
    regions: [] as string[],
    energyTypes: [] as EnergyType[],
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle URL parameters for filtering
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const typeParam = searchParams.get('type');
    const featuredParam = searchParams.get('featured');
    const searchParam = searchParams.get('search');
    const countryParam = searchParams.get('country');
    
    let newFilters = { ...filterOptions };
    
    if (typeParam) {
      newFilters.energyTypes = [typeParam as EnergyType];
    }
    
    if (featuredParam === 'true') {
      newFilters.featured = true;
    }
    
    if (searchParam) {
      newFilters.searchTerm = searchParam;
    }
    
    if (countryParam) {
      newFilters.countries = [countryParam];
    }
    
    setFilterOptions(newFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // Fetch companies data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCompanyData();
        setCompanies(data);
        
        // Set filter values
        const { countries, regions, energyTypes } = getUniqueFilterValues(data);
        setFilterValues({
          countries,
          regions,
          energyTypes,
        });
        
        // Get featured companies
        const featured = getFeaturedCompanies(data);
        setFeaturedCompanies(featured);
        
      } catch (error) {
        console.error('Error loading company data:', error);
        toast({
          title: "Error loading data",
          description: "There was a problem loading the company directory. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [toast]);

  // Apply filters when companies or filter options change
  useEffect(() => {
    if (companies.length > 0) {
      const filtered = filterCompanies(companies, filterOptions);
      setFilteredCompanies(filtered);
      setCurrentPage(1); // Reset to first page when filters change
    }
  }, [companies, filterOptions]);

  // Update URL based on filters
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filterOptions.energyTypes.length === 1) {
      params.set('type', filterOptions.energyTypes[0]);
    }
    
    if (filterOptions.featured) {
      params.set('featured', 'true');
    }
    
    if (filterOptions.searchTerm) {
      params.set('search', filterOptions.searchTerm);
    }
    
    if (filterOptions.countries.length === 1) {
      params.set('country', filterOptions.countries[0]);
    }
    
    const search = params.toString();
    if (search) {
      navigate({ search }, { replace: true });
    } else if (location.search) {
      navigate({ search: '' }, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
  };
  
  const resetFilters = () => {
    setFilterOptions({
      energyTypes: [],
      countries: [],
      regions: [],
      searchTerm: '',
      featured: false,
    });
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex);
  
  // Display featured companies at the top only on the first page and if no filters are applied
  const showFeaturedSection = currentPage === 1 && 
    !filterOptions.featured && 
    filterOptions.energyTypes.length === 0 &&
    filterOptions.countries.length === 0 &&
    filterOptions.regions.length === 0 &&
    !filterOptions.searchTerm;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero Banner */}
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
              onClick={() => {
                const filterElement = document.getElementById('filter-section');
                if (filterElement) {
                  filterElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Browse Directory <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
        
        <div className="container mx-auto px-4 md:px-6 mt-10 md:mt-16" id="filter-section">
          {/* Filter Panel */}
          <FilterPanel
            countries={filterValues.countries}
            regions={filterValues.regions}
            energyTypes={filterValues.energyTypes}
            filters={filterOptions}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
          />
          
          {/* Featured Companies Section */}
          {showFeaturedSection && featuredCompanies.length > 0 && (
            <section className="mb-12 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Featured Companies</h2>
                <Button 
                  variant="ghost" 
                  className="text-sm"
                  onClick={() => handleFilterChange({ ...filterOptions, featured: true })}
                >
                  View all featured
                </Button>
              </div>
              <div className="space-y-4">
                {featuredCompanies.slice(0, 3).map((company) => (
                  <FeaturedCompany key={company.id} company={company} />
                ))}
              </div>
            </section>
          )}
          
          {/* Companies List */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                {isLoading ? 'Loading companies...' : 
                  filteredCompanies.length > 0 
                    ? `${filteredCompanies.length} Companies Found` 
                    : 'No companies found'}
              </h2>
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {currentPage > 1 ? 
                    `Page ${currentPage} of ${totalPages}` : 
                    `Showing ${Math.min(ITEMS_PER_PAGE, filteredCompanies.length)} of ${filteredCompanies.length}`
                  }
                </span>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-80 rounded-lg bg-muted animate-pulse"></div>
                ))}
              </div>
            ) : filteredCompanies.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentCompanies.map((company, index) => (
                    <div 
                      key={company.id} 
                      className="animate-fade-up" 
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CompanyCard company={company} />
                    </div>
                  ))}
                </div>
                
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-16">
                <LayoutGrid className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No companies match your filters</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Try adjusting your search criteria or clearing some filters to see more results.
                </p>
                <Button onClick={resetFilters}>Reset all filters</Button>
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
