
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./ContactFormSchema";

interface DescriptionFieldsProps {
  form: UseFormReturn<FormValues>;
}

const DescriptionFields = ({ form }: DescriptionFieldsProps) => {
  return (
    <>
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
    </>
  );
};

export default DescriptionFields;
