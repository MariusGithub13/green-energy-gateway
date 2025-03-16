
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFoundContent = () => {
  return (
    <main className="flex-1 container mx-auto px-4 md:px-6 flex items-center justify-center py-20">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-5xl font-bold mb-6">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        <Button asChild>
          <Link to="/" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Return to Directory
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFoundContent;
