
import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { FormValues, energyTypeOptions } from "./ContactFormSchema";
import { cn } from "@/lib/utils";
import { getEnergyTypeColor } from "@/lib/energyUtils";

interface EnergyTypesFieldProps {
  form: UseFormReturn<FormValues>;
}

const EnergyTypesField = ({ form }: EnergyTypesFieldProps) => {
  return (
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
  );
};

export default EnergyTypesField;
