import { Cpu, Mail, Instagram, MessageSquare, Send } from "lucide-react";
import { useData } from "../context/DataContext";

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const { siteContent } = useData();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <MessageSquare size={16} />, url: siteContent.socialWhatsApp || "https://wa.me/9155328308", label: "WhatsApp" },
    { icon: <Mail size={16} />, url: `mailto:${siteContent.socialEmail || "princewebdev01@gmail.com"}`, label: "Email" },
    { icon: <Instagram size={16} />, url: siteContent.socialInstagram || "https://instagram.com", label: "Instagram" },
    { icon: <Send size={16} />, url: siteContent.socialTelegram || "https://telegram.org", label: "Telegram" }
  ];

  const quickLinks = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Projects", id: "projects" },
    { name: "About", id: "about" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <footer id="footer-root" className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-12">
          
          {/* Logo brand card */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => onScrollToSection("home")}>
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Cpu size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <span className="font-display text-xl font-bold tracking-tight text-white">
                  Quantum
                </span>
                <span className="text-blue-500 font-display text-xl font-bold">
                  Code
                </span>
              </div>
            </div>
            
            <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              We engineer custom, high-speed agency-grade websites aligned perfectly with modern conversion philosophies to help products grow and establish instant brand authority.
            </p>

            {/* Social icons row */}
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((sub, idx) => (
                <a
                  key={idx}
                  href={sub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 flex items-center justify-center transition-all duration-300"
                  aria-label={sub.label}
                >
                  {sub.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links indexes */}
          <div className="md:col-span-3 text-left">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-widest border-b border-slate-900 pb-3 mb-4">
              Explore Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>Ecommerce Development</li>
              <li>Coaching Portals</li>
              <li>Sleek Landing Pages</li>
              <li>Admin Dashboards</li>
              <li>Google Speed Optimizations</li>
            </ul>
          </div>

          <div className="md:col-span-4 text-left">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-widest border-b border-slate-900 pb-3 mb-4">
              Site Index Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onScrollToSection(link.id)}
                  className="cursor-pointer text-left text-xs text-slate-505 hover:text-white transition-colors py-1 block w-fit"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Closing details rights */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 gap-4">
          <p>© {currentYear} Quantum Web Code. All global freelance developer rights reserved.</p>
          <p className="font-sans font-semibold text-slate-500 tracking-wide hover:text-white transition-colors bg-slate-900 border border-slate-800/80 px-4.5 py-1 rounded-full">
            Crafted with passion by Quantum Web Code
          </p>
        </div>
      </div>
    </footer>
  );
}
