
import { Helmet } from "react-helmet";
import { Leaf, Users, BarChart, Globe, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Renewable Energy Directory</title>
        <meta name="description" content="Learn about the Renewable Energy Directory, our mission, and our vision for a sustainable future." />
      </Helmet>
      
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Connecting the World to Renewable Energy</h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're building the most comprehensive and accessible directory of renewable energy companies worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/contact">Submit Your Company</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">Explore Directory</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <Separator className="my-16" />
        
        {/* Our Mission */}
        <section className="container mx-auto px-4 md:px-6 my-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
                <h3 className="text-xl font-semibold mb-4">Promoting Renewable Energy</h3>
                <p className="text-muted-foreground">
                  We believe that renewable energy is key to addressing climate change and creating a sustainable future.
                  Our directory makes it easier for businesses and consumers to find and connect with renewable energy
                  providers and services, accelerating the transition to clean energy.
                </p>
              </div>
              <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
                <h3 className="text-xl font-semibold mb-4">Supporting Green Businesses</h3>
                <p className="text-muted-foreground">
                  By giving renewable energy companies more visibility, we help them grow and thrive.
                  Our platform provides a valuable marketing channel for businesses of all sizes, 
                  from startups to established enterprises, that are committed to sustainability.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Features */}
        <section className="container mx-auto px-4 md:px-6 my-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Global Reach</h3>
                <p className="text-muted-foreground">
                  Our directory features renewable energy companies from around the world, 
                  making it a truly global resource.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Comprehensive Data</h3>
                <p className="text-muted-foreground">
                  We provide detailed information about each company, including their services, 
                  technologies, and contact details.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  Every listed company is vetted to ensure they meet our standards for 
                  genuine renewable energy solutions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="container mx-auto px-4 md:px-6 my-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Team</h2>
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're a dedicated team of renewable energy enthusiasts, engineers, and data specialists
                working together to create the most valuable resource for the renewable energy sector.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border text-center">
                <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-1">Alex Rivera</h3>
                <p className="text-sm text-muted-foreground mb-3">Founder & CEO</p>
                <p className="text-sm text-muted-foreground">
                  Former renewable energy consultant with over 15 years of experience in the industry.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border text-center">
                <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-1">Jamie Chen</h3>
                <p className="text-sm text-muted-foreground mb-3">Chief Technology Officer</p>
                <p className="text-sm text-muted-foreground">
                  Software engineer and clean tech advocate focused on using technology to accelerate sustainability.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border text-center">
                <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-1">Morgan Taylor</h3>
                <p className="text-sm text-muted-foreground mb-3">Directory Manager</p>
                <p className="text-sm text-muted-foreground">
                  Manages our company review process and ensures the quality and accuracy of all directory listings.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="container mx-auto px-4 md:px-6 my-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-primary/10 rounded-lg p-8 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the Renewable Energy Directory</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Showcase your renewable energy company in our growing directory and connect with customers
                and partners who share your commitment to a sustainable future.
              </p>
              <Button asChild size="lg">
                <Link to="/contact">Submit Your Company Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default AboutUs;
