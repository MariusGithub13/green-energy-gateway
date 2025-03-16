
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CompanyLoading = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24 container mx-auto px-4 md:px-6">
        <div className="animate-pulse space-y-6 py-10">
          <div className="h-8 w-64 bg-muted rounded mb-6"></div>
          <div className="h-64 bg-muted rounded-lg"></div>
          <div className="h-6 w-48 bg-muted rounded"></div>
          <div className="h-40 bg-muted rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyLoading;
