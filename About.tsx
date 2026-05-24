import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DataProvider, useData } from "./context/DataContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustIndicators from "./components/TrustIndicators";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Pricing from "./components/Pricing";
import About from "./components/About";
import Stats from "./components/Stats";
import Process from "./components/Process";
import WhyChooseMe from "./components/WhyChooseMe";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import { Cpu, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Admin Route Protecting Helpers
function AdminLoginProtectedRoute() {
  const { isAdminAuthenticated, isAdminLoading } = useData();

  if (isAdminLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-12">
        <Cpu className="animate-spin text-blue-600 h-10 w-10 mb-4 stroke-[2.5]" />
        <span className="font-mono text-xs uppercase font-bold text-slate-500 tracking-widest">Validating Authentication Token...</span>
      </div>
    );
  }

  if (isAdminAuthenticated) {
    return <AdminDashboard isLoginView={false} />;
  }

  return <AdminDashboard isLoginView={true} />;
}

function LandingPage() {
  const [activeSection, setActiveSection] = useState("home");
  const [preselectedService, setPreselectedService] = useState("");
  
  // Custom loader / splash screen states
  const [isLoading, setIsLoading] = useState(true);
  const [loadPercentage, setLoadPercentage] = useState(0);

  // Splash screen progress ticks
  useEffect(() => {
    if (!isLoading) return;
    
    // Simulate lightweight pre-caching progress
    const interval = setInterval(() => {
      setLoadPercentage(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Small transition pad before dismissal
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 6;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Track active section via IntersectionObserver for polished navigation lines
  useEffect(() => {
    if (isLoading) return;

    const sections = ["home", "services", "projects", "pricing", "about", "testimonials", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Focus center viewport trigger offset
      threshold: 0
    };

    const observerCallbacks = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallbacks, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  const handleScrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
  };

  return (
    <div className="font-sans antialiased text-slate-800 bg-white min-h-screen SelectionCard relative">
      
      {/* Animated Initial Loading Screen in the voice of Premium Agency entry */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="pre-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
          >
            <div className="space-y-6 text-center max-w-sm px-6">
              
              {/* Dynamic spinning launcher emblem */}
              <motion.div
                initial={{ scale: 0.8, rotate: 0 }}
                animate={{ scale: [1, 1.1, 1], rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-xl shadow-blue-200"
              >
                <Cpu size={32} className="stroke-[2.5]" />
              </motion.div>

              <div className="space-y-2">
                <div className="flex justify-center items-center gap-1">
                  <span className="font-display text-2xl font-bold tracking-tight text-slate-950">Quantum</span>
                  <span className="text-blue-600 font-display text-2xl font-bold">Code</span>
                </div>
                
                {/* Visual support caption */}
                <div className="flex justify-center items-center gap-1 text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
                  <Sparkles size={11} className="text-blue-500" />
                  Modern Websites Grow Businesses
                </div>
              </div>

              {/* Progress visual elements */}
              <div className="space-y-2 pt-4">
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${Math.min(loadPercentage, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono font-bold text-slate-500">
                  <span>OPTIMIZING SYSTEM</span>
                  <span>{Math.min(loadPercentage, 100)}%</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Layout with soft cinematic fade-in entrance post load */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            {/* Sticky Navigation row */}
            <Navbar 
              onScrollToSection={handleScrollToSection} 
              activeSection={activeSection} 
            />

            {/* Core Section Blocks */}
            <main>
              <Hero onScrollToSection={handleScrollToSection} />
              
              <TrustIndicators />
              
              <Services onSelectService={handleSelectService} />
              
              <Projects />

              <Pricing />
              
              <About />
              
              <Stats />
              
              <Process />
              
              <WhyChooseMe />
              
              <Testimonials />
              
              <Contact initialService={preselectedService} />
            </main>

            {/* Structured Page Footer */}
            <Footer onScrollToSection={handleScrollToSection} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<Navigate to="/" replace />} />
          <Route path="/admin-login-private" element={<AdminLoginProtectedRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}
