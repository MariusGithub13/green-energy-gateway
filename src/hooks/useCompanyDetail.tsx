import { useState, useEffect } from 'react';
import { Company } from '@/lib/types';
import { getCompanyById, getCompanyBySlug } from '@/lib/companyData';

export const useCompanyDetail = (id?: string, slug?: string) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCompanyData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        let fetchedCompany = null;
        
        // First check if we need to look up by ID or by slug
        if (id) {
          fetchedCompany = await getCompanyById(id);
        } else if (slug) {
          fetchedCompany = await getCompanyBySlug(slug);
        }
        
        if (!fetchedCompany) {
          setError('Company not found');
          return;
        }
        
        // Check if this company was recently upgraded to featured status
        const newlyFeaturedCompanies = JSON.parse(localStorage.getItem('newlyFeaturedCompanies') || '[]');
        if (newlyFeaturedCompanies.includes(fetchedCompany.id)) {
          fetchedCompany = {
            ...fetchedCompany,
            featured: true
          };
        }
        
        setCompany(fetchedCompany);
      } catch (err) {
        console.error('Error fetching company:', err);
        setError('Failed to load company data');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id || slug) {
      fetchCompanyData();
    }
  }, [id, slug]);
  
  // Add function to update company's featured status
  const updateFeaturedStatus = (companyId: string, isFeatured: boolean) => {
    if (company && company.id === companyId) {
      setCompany({
        ...company,
        featured: isFeatured
      });
      
      // Store in localStorage to persist through page refreshes
      if (isFeatured) {
        const newlyFeaturedCompanies = JSON.parse(localStorage.getItem('newlyFeaturedCompanies') || '[]');
        if (!newlyFeaturedCompanies.includes(companyId)) {
          newlyFeaturedCompanies.push(companyId);
          localStorage.setItem('newlyFeaturedCompanies', JSON.stringify(newlyFeaturedCompanies));
        }
      }
    }
  };
  
  return { company, isLoading, error, updateFeaturedStatus };
};
