
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./ContactFormSchema";

interface TermsAgreementFieldProps {
  form: UseFormReturn<FormValues>;
}

const TermsAgreementField = ({ form }: TermsAgreementFieldProps) => {
  return (
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
  );
};

export default TermsAgreementField;
