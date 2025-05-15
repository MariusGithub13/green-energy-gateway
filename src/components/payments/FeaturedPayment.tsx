
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Wallet } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface FeaturedPaymentProps {
  companyId?: string;
  companyName?: string;
  onClose: () => void;
  onSuccess: () => void;
}

const FeaturedPayment = ({ companyId, companyName, onClose, onSuccess }: FeaturedPaymentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call your Stripe checkout endpoint
      // For demonstration, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Payment successful!",
        description: `Your company is now featured in our directory.`,
        variant: "default",
      });
      
      onSuccess();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Upgrade to Featured Status</h2>
        <p className="text-muted-foreground mt-1">
          Get your company noticed by more potential customers
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-2 border-muted">
          <CardHeader>
            <CardTitle>Standard Listing</CardTitle>
            <CardDescription>Your current plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <span>Basic company listing</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <span>Contact information</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <span>Service descriptions</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={onClose}>
              Keep Current Plan
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border-2 border-primary shadow-md">
          <CardHeader className="bg-primary/5">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Featured Listing</CardTitle>
                <CardDescription>Premium visibility</CardDescription>
              </div>
              <span className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                Recommended
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 pt-6">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Everything in Standard</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="font-medium">Priority placement in search results</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="font-medium">Featured badge on your listing</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="font-medium">Inclusion in the Featured Companies section</span>
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-center items-baseline">
                <span className="text-3xl font-bold">$49.99</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handlePayment} disabled={isLoading}>
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  <Wallet className="mr-2 h-4 w-4" /> Upgrade Now
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="text-center text-sm text-muted-foreground mt-6">
        <p>Secure payment processing powered by Stripe.</p>
        <p className="mt-1">Cancel anytime. No long-term commitment required.</p>
      </div>
    </div>
  );
};

export default FeaturedPayment;
