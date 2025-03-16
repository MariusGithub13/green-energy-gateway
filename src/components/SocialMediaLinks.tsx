
import { 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram, 
  Github, 
  Youtube,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SocialMediaProps {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  github?: string;
  youtube?: string;
  website?: string;
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
  variant?: "default" | "minimal" | "colorful";
}

const SocialMediaLinks = ({
  linkedin,
  twitter,
  facebook,
  instagram,
  github,
  youtube,
  website,
  className,
  iconSize = 18,
  showLabels = true,
  variant = "default"
}: SocialMediaProps) => {
  // Check if any social media links are provided
  const hasSocialMedia = linkedin || twitter || facebook || instagram || github || youtube || website;
  
  if (!hasSocialMedia) return null;
  
  // Prepare style classes based on variant
  const getItemClasses = (platform: string) => {
    const baseClasses = "flex items-center gap-2 transition-colors duration-200";
    
    if (variant === "minimal") {
      return cn(baseClasses, "text-muted-foreground hover:text-foreground");
    }
    
    if (variant === "colorful") {
      switch (platform) {
        case "linkedin":
          return cn(baseClasses, "text-foreground/80 hover:text-[#0077B5]");
        case "twitter":
          return cn(baseClasses, "text-foreground/80 hover:text-[#1DA1F2]");
        case "facebook":
          return cn(baseClasses, "text-foreground/80 hover:text-[#1877F2]");
        case "instagram":
          return cn(baseClasses, "text-foreground/80 hover:text-[#E4405F]");
        case "github":
          return cn(baseClasses, "text-foreground/80 hover:text-[#333]");
        case "youtube":
          return cn(baseClasses, "text-foreground/80 hover:text-[#FF0000]");
        case "website":
          return cn(baseClasses, "text-foreground/80 hover:text-primary");
        default:
          return cn(baseClasses, "text-foreground/80 hover:text-primary");
      }
    }
    
    // Default variant
    return cn(baseClasses, "text-foreground/80 hover:text-primary");
  };
  
  return (
    <div className={cn("space-y-3", className)}>
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={getItemClasses("linkedin")}
        >
          <Linkedin size={iconSize} />
          {showLabels && <span>LinkedIn</span>}
        </a>
      )}
      
      {twitter && (
        <a
          href={twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={getItemClasses("twitter")}
        >
          <Twitter size={iconSize} />
          {showLabels && <span>Twitter</span>}
        </a>
      )}
      
      {facebook && (
        <a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={getItemClasses("facebook")}
        >
          <Facebook size={iconSize} />
          {showLabels && <span>Facebook</span>}
        </a>
      )}
      
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={getItemClasses("instagram")}
        >
          <Instagram size={iconSize} />
          {showLabels && <span>Instagram</span>}
        </a>
      )}
      
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className={getItemClasses("github")}
        >
          <Github size={iconSize} />
          {showLabels && <span>GitHub</span>}
        </a>
      )}
      
      {youtube && (
        <a
          href={youtube}
          target="_blank"
          rel="noopener noreferrer"
          className={getItemClasses("youtube")}
        >
          <Youtube size={iconSize} />
          {showLabels && <span>YouTube</span>}
        </a>
      )}
      
      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className={getItemClasses("website")}
        >
          <ExternalLink size={iconSize} />
          {showLabels && <span>Website</span>}
        </a>
      )}
    </div>
  );
};

export default SocialMediaLinks;
