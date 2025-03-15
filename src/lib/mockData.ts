
import { Company } from "./types";

// Mock data for when the API fails or for development
export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "SolarTech Industries",
    website: "https://example.com/solartech",
    description: "Leading provider of solar panel solutions for residential and commercial use.",
    energyTypes: ["solar"],
    location: "California",
    country: "USA",
    founded: 2010,
    featured: true,
    services: ["Installation", "Maintenance", "Consulting"],
    tags: ["solar panels", "renewable", "green energy"]
  },
  {
    id: "2",
    name: "WindForce Energy",
    website: "https://example.com/windforce",
    description: "Specializing in wind turbine manufacturing and wind farm development.",
    energyTypes: ["wind"],
    location: "Texas",
    country: "USA",
    founded: 2008,
    featured: true,
    services: ["Manufacturing", "Development", "Maintenance"],
    tags: ["wind power", "turbines", "renewable"]
  },
  {
    id: "3",
    name: "HydroFlow Systems",
    website: "https://example.com/hydroflow",
    description: "Innovative hydroelectric power solutions for various scales.",
    energyTypes: ["hydro"],
    location: "Oregon",
    country: "USA",
    founded: 2012,
    featured: false,
    services: ["Dam Construction", "Turbine Installation", "Maintenance"],
    tags: ["hydroelectric", "water power", "renewable"]
  },
  {
    id: "4",
    name: "GeoThermal Innovations",
    website: "https://example.com/geothermal",
    description: "Harnessing the Earth's heat for sustainable energy production.",
    energyTypes: ["geothermal"],
    location: "Nevada",
    country: "USA",
    founded: 2015,
    featured: false,
    services: ["Site Assessment", "System Design", "Installation"],
    tags: ["geothermal", "earth energy", "sustainable"]
  },
  {
    id: "5",
    name: "BioEnergy Solutions",
    website: "https://example.com/bioenergy",
    description: "Converting organic materials into clean, renewable energy.",
    energyTypes: ["biomass"],
    location: "Iowa",
    country: "USA",
    founded: 2013,
    featured: false,
    services: ["Biomass Processing", "Energy Conversion", "Consulting"],
    tags: ["biomass", "organic", "biofuel"]
  }
];
