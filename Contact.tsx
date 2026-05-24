import React from "react";
import { motion } from "motion/react";
import { Check, HelpCircle, ArrowRight, ShieldCheck, Sparkles, Building, ShoppingBag, Globe, Smartphone } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  subtitle: string;
  features: string[];
  icon: React.ReactNode;
  popular: boolean;
  color: string;
  borderGlow: string;
}

export default function Pricing() {
  const plans: PricingPlan[] = [
    {
      id: "basic",
      name: "Basic Website",
      price: "₹20,000 – ₹40,000",
      subtitle: "Perfect for local businesses, portfolios, and stylish landing pages looking to establish a premium presence.",
      icon: <Globe className="text-blue-600" size={24} />,
      popular: false,
      color: "border-slate-200 hover:border-blue-300",
      borderGlow: "group-hover:shadow-[0_20px_50px_rgba(37,99,235,0.06)]",
      features: [
        "100% Custom Responsive Layout",
        "Up to 5 Premium Static Pages",
        "Framer Motion Transitions",
        "SEO Meta-Tag Configurations",
        "Integrated WhatsApp Chat Badge",
        "Secure High-Performance Caching",
        "Lightning turnaround (5-7 Days)"
      ]
    },
    {
      id: "ecommerce",
      name: "Ecommerce Website",
      price: "₹30,000 – ₹40,000+",
      subtitle: "Engineered specifically to convert visitors into buyers with modern shopping catalogs and secure transactions.",
      icon: <ShoppingBag className="text-indigo-600" size={24} />,
      popular: true,
      color: "border-indigo-200 md:scale-105 shadow-xl shadow-indigo-50/50 hover:border-indigo-400",
      borderGlow: "group-hover:shadow-[0_20px_50px_rgba(99,102,241,0.08)]",
      features: [
        "Custom Storefront Catalog Layout",
        "Fully Managed Product Inventory CMS",
        "Dynamic Checkout & Cart Drawer",
        "Secure Online Payment Integrations",
        "Discount Coupon & Tax Engine",
        "Order Notifications & Status Track",
        "Complete Client Training & Walkthrough"
      ]
    },
    {
      id: "business",
      name: "Premium Business Website",
      price: "₹35,000 – ₹40,000+",
      subtitle: "High-end corporate, agency, or coaching portals needing extensive CMS databases and automation mechanics.",
      icon: <Building className="text-emerald-600" size={24} />,
      popular: false,
      color: "border-slate-200 hover:border-emerald-300",
      borderGlow: "group-hover:shadow-[0_20px_50px_rgba(16,185,129,0.06)]",
      features: [
        "Interactive Booking Calendars",
        "Robust Firebase Secure Database",
        "Dynamic Service Pages & Portals",
        "Lead Generation Forms & CRM Hooks",
        "Automated Email PDF Invoice Dispatch",
        "Advanced Live-Search & Filter Arrays",
        "30 Days of Dedicated Post-Launch Support"
      ]
    },
    {
      id: "app",
      name: "Mobile/Web Application",
      price: "₹40,000 – ₹1,00,000+",
      subtitle: "Highly custom native SaaS products, web portals, interactive tools, or dashboard management utilities.",
      icon: <Smartphone className="text-rose-600" size={24} />,
      popular: false,
      color: "border-slate-200 hover:border-rose-300",
      borderGlow: "group-hover:shadow-[0_20px_50px_rgba(244,63,94,0.06)]",
      features: [
        "Functional iOS & Android Hybrids / web portal",
        "Custom React App Dashboard Infrastructure",
        "User Security Auth Session Managers",
        "Dynamic Real-Time Operations Charts",
        "Custom Content Manager Tool Panels",
        "Gemini AI Assistant / Autocomplete Hooks",
        "Direct API Integration Proxy Infrastructure"
      ]
    }
  ];

  const handleInquire = (planName: string) => {
    // Scroll smoothly to contact form and try to auto-select
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      
      // Attempt to programmatically trigger service selection
      setTimeout(() => {
        const selectElement = document.getElementById("contact-service-dropdown") as HTMLSelectElement;
        if (selectElement) {
          // Find matching option
          for (let i = 0; i < selectElement.options.length; i++) {
            const option = selectElement.options[i];
            if (option.text.toLowerCase().includes(planName.split(" ")[0].toLowerCase())) {
              selectElement.selectedIndex = i;
              // Dispatch change event to sync state
              const event = new Event('change', { bubbles: true });
              selectElement.dispatchEvent(event);
              break;
            }
          }
        }
      }, 800);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-slate-50/60 scroll-mt-10 overflow-hidden relative border-y border-slate-100">
      
      {/* Background visual graphics */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-50/30 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full inline-block">
            Transparent Investments
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Premium Pricing Tailored For Rapid ROI
          </h2>
          <p className="font-sans text-base text-slate-500 leading-relaxed">
            Zero hidden costs. Highly professional, clean corporate coding and design structured to get your business more conversions.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch pt-4">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className={`group flex flex-col justify-between bg-white rounded-3xl border p-7 relative transition-all duration-300 ${plan.color} ${plan.borderGlow}`}
            >
              
              {/* Popular stamp */}
              {plan.popular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 z-10 bg-indigo-600 text-white font-mono text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg shadow-indigo-150">
                  <Sparkles size={11} className="text-amber-300 animate-pulse" />
                  Most Popular choice
                </div>
              )}

              <div className="space-y-6">
                
                {/* Header Icon & Plan Name */}
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:scale-110 group-hover:bg-slate-900/5 transition-transform duration-300">
                    {plan.icon}
                  </div>
                  {plan.popular && (
                    <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full">
                      Ecommerce Ready
                    </span>
                  )}
                </div>

                <div className="space-y-1 text-left">
                  <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                    {plan.name}
                  </h3>
                  <p className="font-sans text-xs text-slate-500 font-medium leading-relaxed">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Price block */}
                <div className="py-2.5 border-y border-slate-100 text-left">
                  <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
                    {plan.price}
                  </span>
                  <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 mt-1">
                    GST Exclusive • One-Time Fee
                  </p>
                </div>

                {/* Features list */}
                <div className="space-y-3 text-left">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-450">What's Included:</p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start text-xs font-sans text-slate-650 font-medium leading-tight">
                        <Check size={14} className="text-emerald-500 mr-2.5 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action pricing btn button */}
              <div className="pt-8">
                <button
                  onClick={() => handleInquire(plan.name)}
                  className={`w-full font-sans font-semibold text-xs py-3 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 border uppercase tracking-wider font-mono ${
                    plan.popular
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100 group-hover:bg-indigo-700 hover:shadow-indigo-200"
                      : "bg-slate-50 border-slate-200 hover:border-slate-350 text-slate-800 hover:bg-slate-950 hover:text-white"
                  }`}
                >
                  Book Consultation
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Dynamic Support Callout banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-6 sm:p-8 bg-white border border-slate-150 rounded-3xl flex flex-col md:flex-row md:items-center justify-between text-left gap-6 shadow-sm shadow-slate-100 relative overflow-hidden"
        >
          {/* Subtle accent border */}
          <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-blue-600" />
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-blue-600" size={18} />
              <h4 className="text-sm font-bold text-slate-900 font-display">Special Custom Deliveries & Feature Scaling</h4>
            </div>
            <p className="text-xs text-slate-500 font-sans max-w-2xl leading-relaxed font-medium">
              Final pricing may increase depending on features and project complexity. We always lock coordinates down on a final flat quote prior to writing single lines of production code.
            </p>
          </div>

          <a
            href="https://wa.me/9155328308"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white text-xs font-mono font-extrabold uppercase rounded-2xl border border-emerald-200/80 transition-all duration-300 cursor-pointer text-center whitespace-nowrap inline-flex items-center justify-center gap-1.5 self-start md:self-auto"
          >
            WhatsApp Estimate Chat⏱️
          </a>
        </motion.div>

      </div>
    </section>
  );
}
