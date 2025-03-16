
import { Link } from 'react-router-dom';
import { ExternalLink, MapPin, Calendar, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Company } from '@/lib/types';

interface CompanySidebarProps {
  company: Company;
}

const CompanySidebar = ({ company }: CompanySidebarProps) => {
  return (
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
  );
};

export default CompanySidebar;
