
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Company } from '@/lib/types';
import { fetchCompanyData, getCompanyById } from '@/lib/companyData';
import { useToast } from '@/hooks/use-toast';

export const useCompanyDetail = (id: string | undefined) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  return { company, isLoading };
};
