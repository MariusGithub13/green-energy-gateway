
import { EnergyType } from "./types";

// Energy type color mapping function
export const getEnergyTypeColor = (type: EnergyType): string => {
  switch (type) {
    case "solar":
      return "yellow-600";
    case "wind":
      return "blue-500";
    case "hydro":
      return "cyan-600";
    case "geothermal":
      return "orange-600";
    case "biomass":
      return "green-600";
    case "other":
      return "purple-500";
    default:
      return "gray-500";
  }
};
