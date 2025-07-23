
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FilterPanel from '@/components/FilterPanel';
import HeroBanner from '@/components/HeroBanner';
import FeaturedSection from '@/components/FeaturedSection';
import CompanyList from '@/components/CompanyList';
import { FilterOptions } from '@/lib/types';
import { useCompanyData } from '@/hooks/useCompanyData';
import { useUrlFilters } from '@/hooks/useUrlFilters';

const Index = () => {
  const initialFilters: FilterOptions = {
    energyTypes: [],
    countries: [],
    regions: [],
    searchTerm: '',
    featured: false,
  };

  const {
    filteredCompanies,
    featuredCompanies,
    isLoading,
    filterOptions,
    filterValues,
    handleFilterChange,
    resetFilters
  } = useCompanyData(initialFilters);

  // Use the hook for URL parameter handling
  useUrlFilters(filterOptions, handleFilterChange);
  
  // Show featured companies at the top only on the first page and if no filters are applied
  const showFeaturedSection = 
    !filterOptions.featured && 
    filterOptions.energyTypes.length === 0 &&
    filterOptions.countries.length === 0 &&
    filterOptions.regions.length === 0 &&
    !filterOptions.searchTerm;

  const handleViewAllFeatured = () => {
    handleFilterChange({ ...filterOptions, featured: true });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Helmet>
        <title>Renewable Energy Directory | Find Sustainable Energy Companies Worldwide</title>
        <meta name="description" content="Discover a comprehensive directory of renewable energy companies worldwide. Find solar, wind, hydro, geothermal and biomass energy providers." />
        <link rel="canonical" href="https://renewableenergy-directory.com" />
      </Helmet>

      <Header />
      
      <main className="flex-1 pt-24 fade-in">
        {/* Hero Banner */}
        <HeroBanner />
        
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
          {showFeaturedSection && (
            <FeaturedSection 
              companies={featuredCompanies} 
              onViewAllFeatured={handleViewAllFeatured} 
            />
          )}
          
          {/* Companies List */}
          <CompanyList 
            companies={filteredCompanies} 
            isLoading={isLoading} 
            onResetFilters={resetFilters} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
