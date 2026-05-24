import { TRUST_INDICATORS } from "../data";
import Icon from "./Icon";
import { motion } from "motion/react";

export default function TrustIndicators() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <section id="trust" className="py-12 border-y border-slate-150 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Engineering Excellence
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mt-3 text-slate-900 tracking-tight">
            Designed for Peak Brand Authority
          </h2>
          <p className="font-sans text-sm text-slate-500 mt-2">
            Every project integrates standard core architectures that elevate user experience, security, and organic scale.
          </p>
        </div>

        {/* Grid Display */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {TRUST_INDICATORS.map((indicator) => (
            <motion.div
              key={indicator.id}
              variants={itemVariants}
              whileHover={{ 
                y: -4, 
                backgroundColor: "rgba(255, 255, 255, 1)",
                boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.12)",
                borderColor: "#bfdbfe"
              }}
              className="group p-5 rounded-2xl bg-slate-50/50 border border-slate-100 transition-all duration-300 text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white mb-4">
                <Icon name={indicator.iconName} size={18} />
              </div>

              <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                {indicator.title}
              </h3>
              <p className="font-sans text-xs text-slate-500 mt-2 leading-relaxed">
                {indicator.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
