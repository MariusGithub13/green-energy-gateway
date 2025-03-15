
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { formSchema, FormValues } from "./contact/ContactFormSchema";
import CompanyDetailsFields from "./contact/CompanyDetailsFields";
import EnergyTypesField from "./contact/EnergyTypesField";
import DescriptionFields from "./contact/DescriptionFields";
import TermsAgreementField from "./contact/TermsAgreementField";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      website: "https://",
      energyTypes: [],
      description: "",
      message: "",
      terms: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Form submission data:", data);
      
      toast.success("Your submission has been received! We'll review it shortly.", {
        description: "Thank you for your interest in being listed in our directory.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was a problem submitting your information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CompanyDetailsFields form={form} />
          <EnergyTypesField form={form} />
          <DescriptionFields form={form} />
          <TermsAgreementField form={form} />
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit for Review"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
