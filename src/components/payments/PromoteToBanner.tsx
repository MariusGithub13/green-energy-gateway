
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpCircle } from 'lucide-react';
import FeaturedPaymentDialog from './FeaturedPaymentDialog';
import { Company } from '@/lib/types';

interface PromoteToBannerProps {
  company: Company;
  onUpgrade?: (companyId: string) => void;
}

const PromoteToBanner = ({ company, onUpgrade }: PromoteToBannerProps) => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  
  const handlePaymentSuccess = () => {
    if (onUpgrade) {
      onUpgrade(company.id);
    }
  };
  
  // Don't show for already featured companies
  if (company.featured) {
    return null;
  }
  
  return (
    <>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Increase your company's visibility</h3>
            <p className="text-muted-foreground">
              Upgrade to a featured listing to get more exposure for {company.name}
            </p>
          </div>
          <Button 
            onClick={() => setShowPaymentDialog(true)}
            className="whitespace-nowrap"
          >
            <ArrowUpCircle className="mr-2 h-4 w-4" />
            Become Featured
          </Button>
        </div>
      </div>

      <FeaturedPaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        companyId={company.id}
        companyName={company.name}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default PromoteToBanner;
