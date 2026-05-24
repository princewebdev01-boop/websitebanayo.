import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onScrollToSection, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Projects", id: "projects" },
    { name: "Pricing", id: "pricing" },
    { name: "About", id: "about" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Contact", id: "contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background shift on scroll
      setIsScrolled(window.scrollY > 20);

      // Scroll progress loader calculations
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onScrollToSection(id);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        id="navbar-root"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo Brand */}
            <div 
              onClick={() => handleLinkClick("home")}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Cpu size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <span className="font-display text-xl font-bold tracking-tight text-slate-950 group-hover:text-blue-600 transition-colors duration-200">
                  Quantum
                </span>
                <span className="text-blue-600 font-display text-xl font-bold">
                  Code
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`font-sans text-sm font-medium transition-colors duration-200 relative py-1.5 cursor-pointer ${
                    activeSection === link.id
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* CTA action Hire Me */}
            <div className="hidden md:flex items-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLinkClick("contact")}
                className="cursor-pointer font-sans text-sm font-semibold bg-slate-950 text-white px-5 py-2.5 rounded-xl shadow-lg hover:bg-blue-600 hover:shadow-blue-200 transition-all duration-300 flex items-center gap-1.5"
              >
                Hire Me
                <ArrowUpRight size={15} />
              </motion.button>
            </div>

            {/* Mobile Menu Icon Toggle */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-700 hover:text-blue-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden bg-white border-b border-slate-100 shadow-md overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors cursor-pointer ${
                      activeSection === link.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
                <div className="pt-4 px-4">
                  <button
                    onClick={() => handleLinkClick("contact")}
                    className="w-full font-sans text-center font-semibold bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Hire Me
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
