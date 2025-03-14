
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // No pagination needed if there's only one page
  if (totalPages <= 1) return null;

  const generatePages = () => {
    // Always show first and last pages
    // Show 5 pages total when possible (current, 2 before, 2 after)
    // Use ellipsis when needed
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // If total pages are less than max visible, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push({
          number: i,
          type: 'page' as const,
        });
      }
    } else {
      // Always add first page
      pages.push({ number: 1, type: 'page' as const });
      
      // Calculate range around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust range if at edges
      if (currentPage <= 2) {
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }
      
      // Add ellipsis before if needed
      if (startPage > 2) {
        pages.push({ number: -1, type: 'ellipsis' as const });
      }
      
      // Add range pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push({ number: i, type: 'page' as const });
      }
      
      // Add ellipsis after if needed
      if (endPage < totalPages - 1) {
        pages.push({ number: -2, type: 'ellipsis' as const });
      }
      
      // Always add last page
      pages.push({ number: totalPages, type: 'page' as const });
    }
    
    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex items-center justify-center mt-8 space-x-1">
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous Page</span>
      </Button>
      
      <div className="flex items-center space-x-1">
        {pages.map((page, i) => 
          page.type === 'ellipsis' ? (
            <span 
              key={`ellipsis-${i}`} 
              className="w-8 h-8 flex items-center justify-center text-muted-foreground"
            >
              <MoreHorizontal className="h-4 w-4" />
            </span>
          ) : (
            <Button
              key={`page-${page.number}`}
              variant={currentPage === page.number ? "default" : "outline"}
              size="icon"
              className={cn(
                "w-8 h-8",
                currentPage === page.number && "pointer-events-none"
              )}
              onClick={() => onPageChange(page.number)}
            >
              {page.number}
            </Button>
          )
        )}
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next Page</span>
      </Button>
    </div>
  );
};

export default Pagination;
