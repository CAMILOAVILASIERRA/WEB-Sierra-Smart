import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import NavBar from "@/components/NavBar";
import QuienesSomos from "@/pages/QuienesSomos";
import Consultoria from "@/pages/Consultoria";
import Contacto from "@/pages/Contacto";
import Cuestionario from "@/pages/Cuestionario";
import ErrorBoundary from "@/components/ErrorBoundary";
import { toast } from "sonner";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (import.meta.env.DEV) {
        console.error("React Query - query error:", error);
      }
      toast.error("Ocurrió un error al cargar datos");
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (import.meta.env.DEV) {
        console.error("React Query - mutation error:", error);
      }
      toast.error("Ocurrió un error al procesar la acción");
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      throwOnError: false,
    },
    mutations: {
      retry: 0,
      throwOnError: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
        >
          <AuthProvider>
            <ErrorBoundary>
              <NavBar />
            </ErrorBoundary>
            <Routes>
              <Route path="/" element={<ErrorBoundary><Index /></ErrorBoundary>} />
              <Route path="/quienes-somos" element={<ErrorBoundary><QuienesSomos /></ErrorBoundary>} />
              <Route path="/consultoria" element={<ErrorBoundary><Consultoria /></ErrorBoundary>} />
              <Route path="/cuestionario" element={<ErrorBoundary><Cuestionario /></ErrorBoundary>} />
              <Route path="/contacto" element={<ErrorBoundary><Contacto /></ErrorBoundary>} />
              <Route path="/auth" element={<ErrorBoundary><Auth /></ErrorBoundary>} />
              <Route path="/admin" element={<ErrorBoundary><Admin /></ErrorBoundary>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<ErrorBoundary><NotFound /></ErrorBoundary>} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
