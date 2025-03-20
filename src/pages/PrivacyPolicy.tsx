import { Helmet } from "react-helmet";
import { Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Renewable Energy Directory</title>
        <meta name="description" content="Learn about our privacy practices and how we protect your data at the Renewable Energy Directory." />
      </Helmet>
      
      <Header />
      
      <main className="pt-24 pb-16 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-10">
            <Shield className="h-10 w-10 text-primary mr-4" />
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          </div>
          
          <p className="text-muted-foreground text-center mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <Separator className="my-6" />
          
          <div className="prose prose-slate max-w-none">
            <h2>1. Introduction</h2>
            <p>
              At Renewable Energy Directory ("we," "us," or "our"), accessible at https://renewableenergy-directory.com/, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            
            <h2>2. Information We Collect</h2>
            <p>
              We may collect the following types of information:
            </p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, company details, and website URL when you submit a company listing.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, pages visited, and time spent on the site.</li>
              <li><strong>Cookies and Similar Technologies:</strong> We use cookies to enhance your experience on our website. You can control cookie settings through your browser preferences.</li>
            </ul>
            
            <h2>3. How We Use Your Information</h2>
            <p>
              We may use the information we collect for the following purposes:
            </p>
            <ul>
              <li>To provide and maintain our Directory service</li>
              <li>To process and display company listings</li>
              <li>To communicate with you about your listing or inquiries</li>
              <li>To improve our website and services</li>
              <li>To send you updates, newsletters, or promotional materials (you can opt out at any time)</li>
              <li>To comply with legal obligations</li>
            </ul>
            
            <h2>4. Information Sharing and Disclosure</h2>
            <p>
              We may share your information with:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> Third-party vendors who help us operate our website and provide our services.</li>
              <li><strong>Directory Users:</strong> Information submitted for company listings will be publicly available in the Directory.</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, privacy, safety, or property.</li>
            </ul>
            <p>
              We do not sell your personal information to third parties.
            </p>
            
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no Internet transmission is completely secure, and we cannot guarantee the security of information transmitted to or from our website.
            </p>
            
            <h2>6. Your Rights</h2>
            <p>
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction or objection to certain processing activities</li>
              <li>Data portability</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided at the end of this Privacy Policy.
            </p>
            
            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 16. We do not knowingly collect or maintain information from children under 16 years of age.
            </p>
            
            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
            
            <h2>9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
            </p>
            
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p>
              Website: <a href="https://renewableenergy-directory.com" className="text-primary hover:underline">https://renewableenergy-directory.com</a><br />
              Email: <a href="mailto:office@devaland.com" className="text-primary hover:underline">office@devaland.com</a><br />
              Address: 123 Renewable Way, Green City, EC 98765, United States
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
