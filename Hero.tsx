import { useState } from "react";
import { SERVICES } from "../data";
import Icon from "./Icon";
import { ArrowUpRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Business & Retail", "Marketing", "Advanced", "Branding"];

  const filteredServices = selectedCategory === "All"
    ? SERVICES
    : SERVICES.filter(s => s.category === selectedCategory || (selectedCategory === "Marketing" && (s.category === "Revamp" || s.category === "Marketing" || s.category === "Finance")) || (selectedCategory === "Branding" && (s.category === "Branding" || s.category === "Education")));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <section id="services" className="py-24 bg-slate-50/30 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full inline-block">
            Our Expertise
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-slate-900 tracking-tight">
            Tailored High-Performance Digital Solutions
          </h2>
          <p className="font-sans text-base text-slate-500 mt-4 leading-relaxed">
            From beautiful modern storefronts to automated business dashboards, we code optimized architectures designed to solve real business bottlenecks.
          </p>

          {/* Dynamic Filtering Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer px-4.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                  selectedCategory === cat
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.15)",
                  borderColor: "#bfdbfe"
                }}
                className="group bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Service Card Top Header */}
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Icon name={service.iconName} size={18} />
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
                      {service.category}
                    </span>
                  </div>

                  {/* Pricing/Delivery Badge Bar */}
                  <div className="flex gap-2 text-[10px] font-semibold text-slate-500 font-mono">
                    {service.priceStart && (
                      <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-md border border-emerald-100/50">
                        Starts: {service.priceStart}
                      </span>
                    )}
                    {service.deliveryTime && (
                      <span className="bg-blue-50/50 text-blue-700 px-2.5 py-0.5 rounded-md border border-blue-50">
                        ⏱️ {service.deliveryTime}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="text-left space-y-2">
                    <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed h-[64px] overflow-hidden truncate-multiline">
                      {service.description}
                    </p>
                  </div>

                  {/* Divider line */}
                  <div className="border-t border-slate-100 my-1 pt-3">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block text-left mb-2">
                      Key Capabilities Included
                    </span>
                    <ul className="space-y-1.5 text-left">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-[11px] text-slate-600">
                          <Check size={11} className="text-emerald-500 mr-1.5 mt-0.5 shrink-0 stroke-[3]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  onClick={() => onSelectService(service.title)}
                  className="cursor-pointer font-sans text-xs font-bold bg-slate-50 group-hover:bg-blue-600 text-slate-700 group-hover:text-white py-2.5 px-4 rounded-xl mt-6 border border-slate-150 group-hover:border-blue-600 flex items-center justify-center gap-1.5 transition-all duration-300 w-full"
                >
                  Request Consultation
                  <ArrowUpRight size={13} className="opacity-60 group-hover:opacity-100" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
