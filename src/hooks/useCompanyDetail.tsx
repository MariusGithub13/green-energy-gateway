
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
          // Handle slug lookup with or without .html extension
          const slugWithoutExt = slug.endsWith('.html') 
            ? slug.slice(0, -5) 
            : slug;
          
          foundCompany = getCompanyBySlug(allCompanies, slugWithoutExt);
        } else if (id) {
          foundCompany = getCompanyById(allCompanies, id);
          
          // Only redirect from ID to slug if explicitly accessed by ID
          if (foundCompany) {
            const companySlug = generateSlug(foundCompany.name);
            navigate(`/${companySlug}`, { replace: true });
            return; // Exit early to avoid setting company state twice
          }
        } else {
          throw new Error('Neither Company ID nor slug provided');
        }
        
        if (foundCompany) {
          setCompany(foundCompany);
        } else {
          toast({
            title: "Company not found",
            description: "We couldn't find the company you're looking for.",
            variant: "destructive",
          });
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Error loading company data:', error);
        toast({
          title: "Error loading data",
          description: "There was a problem loading the company profile. Please try again later.",
          variant: "destructive",
        });
        navigate('/', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCompany();
  }, [id, slug, navigate, toast]);

  return { company, isLoading };
};
