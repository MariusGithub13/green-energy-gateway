
import { Helmet } from "react-helmet";
import { Mail, MapPin, Phone, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Separator } from "@/components/ui/separator";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Renewable Energy Directory</title>
        <meta name="description" content="Contact us to list your renewable energy company in our directory or for any inquiries." />
      </Helmet>
      
      <Header />
      
      <main className="pt-24 pb-16 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Interested in being listed in our directory? Have questions about our service? 
            Fill out the form below or contact us directly using the information provided.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
            <div className="space-y-8 lg:col-span-1">
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <h2 className="text-xl font-semibold mb-4">Get In Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-primary mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:office@devaland.com" className="text-muted-foreground hover:text-primary transition-colors">
                        office@devaland.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel: +40721269312" className="text-muted-foreground hover:text-primary transition-colors">
                        +40 (721) 269 312
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Address</p>
                      <address className="text-muted-foreground not-italic">
                        DEVALAND MARKETING S.R.L.<br />
                        Trading as Devaland Automation Agency<br />
                        Sântandrei 13, Simeria 335903,<br />
                        Hunedoara County, Transylvania, ROMANIA
                      </address>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-primary mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Office Hours</p>
                      <p className="text-muted-foreground">
                        Monday - Friday<br />
                        9:00 AM - 5:00 PM EST
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <h2 className="text-xl font-semibold mb-4">Submit Your Company</h2>
                <p className="text-muted-foreground mb-6">
                  Complete the form below to submit your renewable energy company for inclusion in our directory.
                  Our team will review your submission and contact you with any additional questions.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
          
          <Separator className="my-10" />
          
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6 text-left mt-8">
              <div>
                <h3 className="text-lg font-medium mb-2">How long does the review process take?</h3>
                <p className="text-muted-foreground">
                  Our team typically reviews all submissions within 3-5 business days. You'll receive 
                  an email notification once your company has been approved for listing.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Is there a fee to be listed in the directory?</h3>
                <p className="text-muted-foreground">
                  Basic listings are free of charge. Premium listings with enhanced features and 
                  Featured visibility are available for a monthly subscription fee.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Can I update my company information after listing?</h3>
                <p className="text-muted-foreground">
                  Yes, you can request updates to your listing at any time by contacting our 
                  support team with your company ID and the information you'd like to update.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">How do I report incorrect information?</h3>
                <p className="text-muted-foreground">
                  If you notice any incorrect information in our directory, please email us with 
                  the details and we'll address it as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Contact;
