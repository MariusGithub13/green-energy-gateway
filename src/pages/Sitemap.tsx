
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { fetchCompanyData } from "@/lib/companyData";
import { generateSlug } from "@/lib/slugUtils";
import { Company } from "@/lib/types";
import { useGenerateSitemap } from "@/hooks/useGenerateSitemap";

const Sitemap = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await fetchCompanyData();
        setCompanies(data);
      } catch (error) {
        console.error("Error loading company data for sitemap:", error);
      }
    };
    
    loadCompanies();
  }, []);
  
  // Use our hook to generate the dynamic sitemap
  useGenerateSitemap(companies);
  
  return (
    <>
      <Helmet>
        <title>Sitemap | Renewable Energy Directory</title>
        <meta name="description" content="Navigate through all pages of the Renewable Energy Directory." />
        <link rel="canonical" href="https://renewableenergy-directory.com/sitemap.html" />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Sitemap</h1>
          <p className="text-lg text-muted-foreground mb-10">
            Find your way around the Renewable Energy Directory with our comprehensive sitemap.
          </p>
          
          <div className="bg-primary/10 p-4 rounded-md mb-8">
            <p className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              <span>XML Sitemap for search engines: </span>
              <a 
                href="/sitemap.xml" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                sitemap.xml
              </a>
            </p>
          </div>
          
          <Separator className="my-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Main Pages</h2>
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-primary hover:underline">Home</Link>
                  <p className="text-sm text-muted-foreground mt-1">
                    The main page of the directory with featured companies.
                  </p>
                </li>
                <li>
                  <Link to="/about" className="text-primary hover:underline">About Us</Link>
                  <p className="text-sm text-muted-foreground mt-1">
                    Learn about our mission and team.
                  </p>
                </li>
                <li>
                  <Link to="/contact" className="text-primary hover:underline">Submit Your Company</Link>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add your renewable energy company to our directory.
                  </p>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6">Categories</h2>
              <ul className="space-y-4">
                <li>
                  <Link to="/?type=solar" className="text-renewable-solar hover:underline">Solar Energy Companies</Link>
                </li>
                <li>
                  <Link to="/?type=wind" className="text-renewable-wind hover:underline">Wind Energy Companies</Link>
                </li>
                <li>
                  <Link to="/?type=hydro" className="text-renewable-hydro hover:underline">Hydroelectric Companies</Link>
                </li>
                <li>
                  <Link to="/?type=geothermal" className="text-renewable-geo hover:underline">Geothermal Companies</Link>
                </li>
                <li>
                  <Link to="/?type=biomass" className="text-renewable-bio hover:underline">Biomass Energy Companies</Link>
                </li>
                <li>
                  <Link to="/?featured=true" className="text-primary hover:underline">Featured Companies</Link>
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Legal & Information</h2>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy.html" className="text-primary hover:underline">Privacy Policy</Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Our privacy policy and data practices.
                </p>
              </li>
              <li>
                <Link to="/terms.html" className="text-primary hover:underline">Terms of Service</Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Terms and conditions for using our directory.
                </p>
              </li>
              <li>
                <Link to="/sitemap" className="text-primary hover:underline">Sitemap</Link>
                <p className="text-sm text-muted-foreground mt-1">
                  This page - navigate through all sections of our website.
                </p>
              </li>
            </ul>
          </div>
          
          {companies.length > 0 && (
            <>
              <Separator className="my-8" />
              
              <div>
                <h2 className="text-2xl font-semibold mb-6">Company Profiles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {companies.map(company => (
                    <Link 
                      key={company.id}
                      to={`/${generateSlug(company.name)}`}
                      className="text-primary hover:underline text-sm"
                    >
                      {company.name}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Sitemap;
