
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompanyHeader from '@/components/company/CompanyHeader';
import CompanyDetails from '@/components/company/CompanyDetails';
import CompanySidebar from '@/components/company/CompanySidebar';
import CompanyLoading from '@/components/company/CompanyLoading';
import CompanyNotFound from '@/components/company/CompanyNotFound';
import { useCompanyDetail } from '@/hooks/useCompanyDetail';
import PromoteToBanner from '@/components/payments/PromoteToBanner';

const Company = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const { company, isLoading, error } = useCompanyDetail(id, slug);
  const [upgradedCompany, setUpgradedCompany] = useState<typeof company>(null);

  // Combine the original company data with any upgrades that happened during the session
  const displayCompany = upgradedCompany || company;

  // Handle successful featured upgrade
  const handleFeaturedUpgrade = (companyId: string) => {
    if (company) {
      setUpgradedCompany({
        ...company,
        featured: true
      });
    }
  };
  
  // If there's an error or company not found
  if (!isLoading && (error || !company)) {
    return <CompanyNotFound />;
  }

  return (
    <>
      <Helmet>
        <title>
          {isLoading
            ? 'Loading Company...'
            : `${displayCompany?.name} | Renewable Energy Directory`}
        </title>
        {displayCompany && (
          <meta
            name="description"
            content={`Learn about ${displayCompany.name}, a ${displayCompany.energyTypes.join(
              ', '
            )} company based in ${displayCompany.location}.`}
          />
        )}
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 min-h-screen">
        {isLoading ? (
          <CompanyLoading />
        ) : (
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              {/* Promotion banner */}
              {displayCompany && (
                <PromoteToBanner 
                  company={displayCompany} 
                  onUpgrade={handleFeaturedUpgrade}
                />
              )}
              
              {/* Company header */}
              <CompanyHeader company={displayCompany!} />
              
              {/* Main content area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2">
                  <CompanyDetails company={displayCompany!} />
                </div>
                <div className="lg:col-span-1">
                  <CompanySidebar company={displayCompany!} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Company;
