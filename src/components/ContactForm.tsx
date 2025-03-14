
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnergyType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getEnergyTypeColor } from "@/lib/companyData";

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  contactName: z.string().min(2, {
    message: "Contact name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  website: z.string().url({
    message: "Please enter a valid URL including http:// or https://",
  }),
  energyTypes: z.array(z.string()).min(1, {
    message: "Please select at least one energy type.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  message: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const energyTypeOptions: { value: EnergyType; label: string }[] = [
    { value: "solar", label: "Solar Energy" },
    { value: "wind", label: "Wind Energy" },
    { value: "hydro", label: "Hydroelectric" },
    { value: "geothermal", label: "Geothermal" },
    { value: "biomass", label: "Biomass" },
    { value: "other", label: "Other Renewable Energy" },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="energyTypes"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Energy Types</FormLabel>
                  <FormDescription>
                    Select all types of renewable energy your company works with.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {energyTypeOptions.map((option) => (
                    <FormField
                      key={option.value}
                      control={form.control}
                      name="energyTypes"
                      render={({ field }) => {
                        const isSelected = field.value?.includes(option.value);
                        return (
                          <FormItem
                            key={option.value}
                            className={cn(
                              "flex items-center space-x-3 space-y-0 rounded-md border p-3 transition-all",
                              isSelected 
                                ? `border-${getEnergyTypeColor(option.value)}/50 bg-${getEnergyTypeColor(option.value)}/10` 
                                : "hover:border-muted-foreground/25"
                            )}
                          >
                            <FormControl>
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, option.value])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== option.value
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="cursor-pointer text-sm font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please describe your company and its renewable energy solutions..."
                    className="min-h-32 resize-y"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This will appear on your company listing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Message (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any additional information you'd like to share..."
                    className="resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="leading-none">
                  <FormLabel className="text-sm font-normal">
                    I agree to the terms and conditions and consent to having my submitted information published in the directory.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit for Review"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
