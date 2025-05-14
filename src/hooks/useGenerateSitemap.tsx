
import { useEffect } from 'react';
import { Company } from '@/lib/types';
import { generateSlug } from '@/lib/slugUtils';

export const useGenerateSitemap = (companies: Company[]) => {
  useEffect(() => {
    if (companies.length > 0 && typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Only run this in production mode
      try {
        const parser = new DOMParser();
        fetch('/sitemap.xml')
          .then(response => response.text())
          .then(text => {
            const xmlDoc = parser.parseFromString(text, 'text/xml');
            const urlset = xmlDoc.getElementsByTagName('urlset')[0];
            
            // Check if we already have company URLs in the sitemap
            const existingUrls = Array.from(xmlDoc.getElementsByTagName('loc'))
              .map(loc => loc.textContent);
            
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
            
            // Add each company URL to the sitemap
            companies.forEach(company => {
              const slug = generateSlug(company.name);
              const companyUrl = `https://renewableenergy-directory.com/${slug}`;
              
              // Only add if this URL doesn't already exist in the sitemap
              if (!existingUrls.includes(companyUrl)) {
                const urlElement = xmlDoc.createElement('url');
                
                const locElement = xmlDoc.createElement('loc');
                locElement.textContent = companyUrl;
                
                const lastmodElement = xmlDoc.createElement('lastmod');
                lastmodElement.textContent = today;
                
                const changefreqElement = xmlDoc.createElement('changefreq');
                changefreqElement.textContent = 'monthly';
                
                const priorityElement = xmlDoc.createElement('priority');
                priorityElement.textContent = '0.7';
                
                urlElement.appendChild(locElement);
                urlElement.appendChild(lastmodElement);
                urlElement.appendChild(changefreqElement);
                urlElement.appendChild(priorityElement);
                
                urlset.appendChild(urlElement);
              }
            });
            
            // Output the updated sitemap to console for debugging
            const serializer = new XMLSerializer();
            const updatedSitemap = serializer.serializeToString(xmlDoc);
            console.log('Dynamic sitemap generated with company URLs:', updatedSitemap);
            
            // In a real production environment, you would save this to the server
            // This can't be done directly in the browser, but would typically
            // be handled by a server-side process or build step
          })
          .catch(error => {
            console.error('Error updating sitemap:', error);
          });
      } catch (error) {
        console.error('Error in sitemap generation:', error);
      }
    }
  }, [companies]);
};
