
import { Dialog, DialogContent } from '@/components/ui/dialog';
import FeaturedPayment from './FeaturedPayment';

interface FeaturedPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyId?: string;
  companyName?: string;
  onPaymentSuccess: () => void;
}

const FeaturedPaymentDialog = ({ 
  open, 
  onOpenChange,
  companyId,
  companyName,
  onPaymentSuccess
}: FeaturedPaymentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <FeaturedPayment 
          companyId={companyId} 
          companyName={companyName}
          onClose={() => onOpenChange(false)}
          onSuccess={() => {
            onPaymentSuccess();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FeaturedPaymentDialog;
