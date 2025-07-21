
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const Index = React.lazy(() => import("./pages/Index"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Contact = React.lazy(() => import("./pages/Contact"));
const TermsOfService = React.lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const Company = React.lazy(() => import("./pages/Company"));
const Sitemap = React.lazy(() => import("./pages/Sitemap"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/terms.html" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/privacy.html" element={<PrivacyPolicy />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/company/:id" element={<Company />} />
            <Route path="/:slug" element={<Company />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/sitemap.html" element={<Sitemap />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
