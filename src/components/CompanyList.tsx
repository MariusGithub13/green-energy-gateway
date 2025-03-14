
import { useState } from 'react';
import { Filter, LayoutGrid } from 'lucide-react';
import { Company } from '@/lib/types';
import CompanyCard from '@/components/CompanyCard';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';

interface CompanyListProps {
  companies: Company[];
  isLoading: boolean;
  onResetFilters: () => void;
}

const ITEMS_PER_PAGE = 20;

const CompanyList = ({ companies, isLoading, onResetFilters }: CompanyListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate pagination
  const totalPages = Math.ceil(companies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCompanies = companies.slice(startIndex, endIndex);
  
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          {isLoading ? 'Loading companies...' : 
            companies.length > 0 
              ? `${companies.length} Companies Found` 
              : 'No companies found'}
        </h2>
        <div className="flex items-center">
          <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {currentPage > 1 ? 
              `Page ${currentPage} of ${totalPages}` : 
              `Showing ${Math.min(ITEMS_PER_PAGE, companies.length)} of ${companies.length}`
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
      ) : companies.length > 0 ? (
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
          <Button onClick={onResetFilters}>Reset all filters</Button>
        </div>
      )}
    </section>
  );
};

export default CompanyList;
