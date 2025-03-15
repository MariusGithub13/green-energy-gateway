
import { z } from "zod";
import { EnergyType } from "@/lib/types";

export const formSchema = z.object({
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

export type FormValues = z.infer<typeof formSchema>;

export const energyTypeOptions: { value: EnergyType; label: string }[] = [
  { value: "solar", label: "Solar Energy" },
  { value: "wind", label: "Wind Energy" },
  { value: "hydro", label: "Hydroelectric" },
  { value: "geothermal", label: "Geothermal" },
  { value: "biomass", label: "Biomass" },
  { value: "other", label: "Other Renewable Energy" },
];
