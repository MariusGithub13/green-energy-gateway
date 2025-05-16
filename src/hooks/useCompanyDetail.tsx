
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Company } from '@/lib/types';
import { fetchCompanyData, getCompanyById, getCompanyBySlug } from '@/lib/companyData';
import { generateSlug } from '@/lib/slugUtils';
import { useToast } from '@/hooks/use-toast';

export const useCompanyDetail = (id?: string, slug?: string) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadCompany = async () => {
      setIsLoading(true);
      try {
        const allCompanies = await fetchCompanyData();
        
        let foundCompany: Company | undefined;
        
        if (slug) {
          // If the slug includes .html extension, remove it for the lookup
          const slugWithoutExt = slug.endsWith('.html') 
            ? slug.slice(0, -5) 
            : slug;
          
          foundCompany = getCompanyBySlug(allCompanies, slugWithoutExt);
        } else if (id) {
          foundCompany = getCompanyById(allCompanies, id);
        } else {
          throw new Error('Neither Company ID nor slug provided');
        }
        
        if (foundCompany) {
          setCompany(foundCompany);
          
          // If user accessed by ID or non-HTML slug, redirect to HTML slug URL for SEO
          if ((id && !slug) || (slug && !slug.endsWith('.html'))) {
            const companySlug = generateSlug(foundCompany.name);
            navigate(`/${companySlug}`, { replace: true });
          }
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
  }, [id, slug, navigate, toast]);

  return { company, isLoading };
};
