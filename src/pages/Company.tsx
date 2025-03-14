
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone,
  CheckCircle,
  Tag,
  Building,
  Package
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Company as CompanyType, EnergyType } from '@/lib/types';
import { fetchCompanyData, getCompanyById, getEnergyTypeColor } from '@/lib/companyData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const CompanyPage = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadCompany = async () => {
      setIsLoading(true);
      try {
        const allCompanies = await fetchCompanyData();
        if (!id) {
          throw new Error('Company ID not provided');
        }
        
        const foundCompany = getCompanyById(allCompanies, id);
        
        if (foundCompany) {
          setCompany(foundCompany);
        } else {
          toast({
            title: "Company not found",
            description: "We couldn't find the company you're looking for.",
            variant: "destructive",
          });
          navigate('/');
        }
      } catch (error) {
        console.error('Error loading company data:', error);
        toast({
          title: "Error loading data",
          description: "There was a problem loading the company profile. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCompany();
  }, [id, navigate, toast]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-24 container mx-auto px-4 md:px-6">
          <div className="animate-pulse space-y-6 py-10">
            <div className="h-8 w-64 bg-muted rounded mb-6"></div>
            <div className="h-64 bg-muted rounded-lg"></div>
            <div className="h-6 w-48 bg-muted rounded"></div>
            <div className="h-40 bg-muted rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-32 bg-muted rounded"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-24 container mx-auto px-4 md:px-6 text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Company Not Found</h1>
          <p className="mb-6 text-muted-foreground">
            The company you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/">Return to Directory</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8 animate-fade-up">
              <div className="overflow-hidden rounded-lg bg-white border border-border shadow-sm">
                <div className="aspect-video md:aspect-[2/1] relative overflow-hidden bg-muted">
                  <img
                    src={company.logo || '/placeholder.svg'}
                    alt={`${company.name} logo`}
                    onLoad={handleImageLoad}
                    className={cn(
                      "w-full h-full object-contain p-8 transition-all duration-500 lazyload-img",
                      imageLoaded ? "loaded" : ""
                    )}
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>
                
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
                        {type.charAt(0).toUpperCase() + type.slice(1)}
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
              </div>
            </div>
            
            <div className="space-y-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
              <div className="bg-white rounded-lg border border-border shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-4">Company Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-muted-foreground">
                        {company.location}
                        {company.country && `, ${company.country}`}
                        {company.region && ` (${company.region})`}
                      </div>
                    </div>
                  </div>
                  
                  {company.founded && (
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Founded</div>
                        <div className="text-muted-foreground">{company.founded}</div>
                      </div>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-3">Connect</h4>
                    
                    <div className="space-y-3">
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                      
                      {company.contactEmail && (
                        <a
                          href={`mailto:${company.contactEmail}`}
                          className="flex items-center text-foreground/80 hover:text-primary transition-colors"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          {company.contactEmail}
                        </a>
                      )}
                      
                      {company.contactPhone && (
                        <a
                          href={`tel:${company.contactPhone}`}
                          className="flex items-center text-foreground/80 hover:text-primary transition-colors"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          {company.contactPhone}
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {company.socialMedia && Object.values(company.socialMedia).some(Boolean) && (
                    <>
                      <Separator />
                      
                      <div>
                        <h4 className="font-medium mb-3">Social Media</h4>
                        
                        <div className="space-y-3">
                          {company.socialMedia.linkedin && (
                            <a
                              href={company.socialMedia.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-foreground/80 hover:text-[#0077B5] transition-colors"
                            >
                              <span className="i-lucide-linkedin h-4 w-4 mr-2"></span>
                              LinkedIn
                            </a>
                          )}
                          
                          {company.socialMedia.twitter && (
                            <a
                              href={company.socialMedia.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-foreground/80 hover:text-[#1DA1F2] transition-colors"
                            >
                              <span className="i-lucide-twitter h-4 w-4 mr-2"></span>
                              Twitter
                            </a>
                          )}
                          
                          {company.socialMedia.facebook && (
                            <a
                              href={company.socialMedia.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-foreground/80 hover:text-[#1877F2] transition-colors"
                            >
                              <span className="i-lucide-facebook h-4 w-4 mr-2"></span>
                              Facebook
                            </a>
                          )}
                          
                          {company.socialMedia.instagram && (
                            <a
                              href={company.socialMedia.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-foreground/80 hover:text-[#E4405F] transition-colors"
                            >
                              <span className="i-lucide-instagram h-4 w-4 mr-2"></span>
                              Instagram
                            </a>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="bg-primary/5 rounded-lg border border-primary/20 p-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
                <h3 className="font-semibold text-lg mb-4">Submit Your Company</h3>
                <p className="text-muted-foreground mb-4">
                  Want to feature your renewable energy company in our directory? Submit your information for review.
                </p>
                <Button asChild className="w-full">
                  <Link to="/contact">
                    Submit Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanyPage;
