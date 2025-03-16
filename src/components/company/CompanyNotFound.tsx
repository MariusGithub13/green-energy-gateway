
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CompanyNotFound = () => {
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
};

export default CompanyNotFound;
