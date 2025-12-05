import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MetaHead } from "@/components/MetaHead";
import Index from "./pages/Index";
import CheckAvailability from "./pages/CheckAvailability";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import PhotoBooth from "./pages/PhotoBooth";
import BoothDetail from "./pages/BoothDetail";
import Photography from "./pages/Photography";
import PhotographyDetail from "./pages/PhotographyDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MetaHead />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/check-availability" element={<CheckAvailability />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/photo-booth" element={<PhotoBooth />} />
          <Route path="/photo-booth/:slug" element={<BoothDetail />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/photography/:slug" element={<PhotographyDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
