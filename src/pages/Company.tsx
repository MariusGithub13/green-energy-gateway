
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCompanyDetail } from '@/hooks/useCompanyDetail';
import CompanyHeader from '@/components/company/CompanyHeader';
import CompanyLogo from '@/components/company/CompanyLogo';
import CompanyDetails from '@/components/company/CompanyDetails';
import CompanySidebar from '@/components/company/CompanySidebar';
import CompanyLoading from '@/components/company/CompanyLoading';
import CompanyNotFound from '@/components/company/CompanyNotFound';
import { generateSlug } from '@/lib/slugUtils';

const CompanyPage = () => {
  const { id, slug } = useParams<{ id?: string; slug?: string }>();
  const { company, isLoading } = useCompanyDetail(id, slug);

  if (isLoading) {
    return <CompanyLoading />;
  }

  if (!company) {
    return <CompanyNotFound />;
  }

  const canonicalUrl = `https://renewableenergy-directory.com/${generateSlug(company.name)}`;

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{`${company.name} | Renewable Energy Directory`}</title>
        <meta name="description" content={company.description} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <Header />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <CompanyHeader company={company} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8 animate-fade-up">
              <div className="overflow-hidden rounded-lg bg-white border border-border shadow-sm">
                <CompanyLogo 
                  logo={company.logo} 
                  companyName={company.name} 
                  website={company.website}
                />
                <CompanyDetails company={company} />
              </div>
            </div>
            
            <CompanySidebar company={company} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanyPage;
