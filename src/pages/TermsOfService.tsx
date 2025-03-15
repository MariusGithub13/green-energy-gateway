
import { Helmet } from "react-helmet";
import { ScrollText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Renewable Energy Directory</title>
        <meta name="description" content="Read our terms of service for using the Renewable Energy Directory." />
      </Helmet>
      
      <Header />
      
      <main className="pt-24 pb-16 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-10">
            <ScrollText className="h-10 w-10 text-primary mr-4" />
            <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
          </div>
          
          <p className="text-muted-foreground text-center mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <Separator className="my-6" />
          
          <div className="prose prose-slate max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Renewable Energy Directory ("Directory"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Directory.
            </p>
            
            <h2>2. Description of Service</h2>
            <p>
              The Directory provides a platform for listing and discovering companies in the renewable energy sector. We aim to connect businesses and consumers interested in renewable energy solutions.
            </p>
            
            <h2>3. User Accounts and Submissions</h2>
            <p>
              3.1. When submitting a company for inclusion in the Directory, you represent and warrant that all information provided is accurate, complete, and not misleading.
            </p>
            <p>
              3.2. You are solely responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account.
            </p>
            <p>
              3.3. We reserve the right to refuse any submission or remove any listing at our sole discretion.
            </p>
            
            <h2>4. Content Guidelines</h2>
            <p>
              4.1. Company listings must be related to renewable energy or sustainable practices.
            </p>
            <p>
              4.2. Submissions must not contain false, defamatory, or misleading information.
            </p>
            <p>
              4.3. Content must not infringe on intellectual property rights, privacy rights, or any other rights of third parties.
            </p>
            <p>
              4.4. We prohibit content that is harmful, offensive, or promotes illegal activities.
            </p>
            
            <h2>5. Intellectual Property</h2>
            <p>
              5.1. The Directory, including its content, features, and functionality, is owned by us and is protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              5.2. By submitting content to the Directory, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, publish, and distribute such content for the purpose of operating and promoting the Directory.
            </p>
            
            <h2>6. Privacy</h2>
            <p>
              Your use of the Directory is also governed by our Privacy Policy, which can be found <a href="/privacy" className="text-primary hover:underline">here</a>.
            </p>
            
            <h2>7. Limitation of Liability</h2>
            <p>
              7.1. The Directory is provided on an "as-is" and "as available" basis. We make no warranties, expressed or implied, regarding the reliability, accuracy, or availability of the Directory.
            </p>
            <p>
              7.2. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Directory.
            </p>
            
            <h2>8. Modifications to the Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on the Directory. Your continued use of the Directory after such modifications constitutes your acceptance of the updated Terms.
            </p>
            
            <h2>9. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to the Directory at any time, without notice, for any reason, including a breach of these Terms.
            </p>
            
            <h2>10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
            
            <h2>11. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:legal@renewabledirectory.com" className="text-primary hover:underline">legal@renewabledirectory.com</a>.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default TermsOfService;
