import { useState } from "react";
import { useData } from "../context/DataContext";
import { ArrowUpRight, CheckCircle, Smartphone, Laptop, Sparkles, X, Star, FileCode, Search, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";

export default function Projects() {
  const { projects } = useData();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filterOptions = ["All", "Ecommerce Store", "Coaching Website", "Restaurant Website", "Gym Website", "Real Estate Website", "AI SaaS Website"];

  const filteredProjects = selectedFilter === "All"
    ? projects
    : projects.filter(p => p.category === selectedFilter);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <section id="projects" className="py-24 bg-white scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="text-left max-w-2xl">
            <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full inline-block">
              Case Studies
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-slate-900 tracking-tight">
              Featured Flagship Implementations
            </h2>
            <p className="font-sans text-base text-slate-500 mt-4 leading-relaxed">
              Explore our functional showcase projects coded with precision. Click any card to launch the comprehensive technical case study overlay.
            </p>
          </div>

          {/* Filtering row */}
          <div className="flex flex-wrap gap-2 lg:max-w-xl justify-start lg:justify-end">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedFilter(opt)}
                className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold font-sans transition-all duration-300 border ${
                  selectedFilter === opt
                    ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-300"
                    : "bg-slate-50 border-slate-150 text-slate-650 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {opt.split(" ")[0]} {opt.split(" ")[1] || ""}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          layout
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.08)" }}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between transition-all duration-300"
              >
                {/* Visual Header Mockup */}
                <div className={`p-6 pb-0 flex flex-col items-center justify-end h-56 relative ${project.colorScheme?.bg || "bg-slate-100"} border-b border-slate-100 overflow-hidden`}>
                  
                  {/* Miniature Browser frame */}
                  <div className="w-[90%] bg-white rounded-t-xl shadow-lg border border-slate-200/60 p-2.5 space-y-2 h-[82%] relative translate-y-3 group-hover:translate-y-1.5 transition-transform duration-300 flex flex-col justify-start text-left">
                    {/* Dots */}
                    <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      </div>
                      <div className="text-[7px] font-mono text-slate-400 font-semibold uppercase tracking-wider">{project.category}</div>
                    </div>

                    {/* Styled Mockup inner */}
                    <div className="space-y-2 pt-1 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="h-3 w-3/4 bg-slate-100 rounded" />
                        <div className="h-2 w-1/2 bg-slate-50 rounded" />
                      </div>

                      {/* Mockup chart or widget block */}
                      {project.id === "proj-saas" && (
                        <div className="bg-slate-50 border border-slate-150 rounded-lg p-2 flex justify-between items-center">
                          <span className="text-[7px] font-mono font-extrabold text-cyan-600">USAGE LOAD: OPTIMAL</span>
                          <div className="w-8 h-2.5 rounded bg-cyan-150 animate-pulse" />
                        </div>
                      )}
                      {project.id === "proj-ecommerce" && (
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-slate-50 rounded-lg p-1 text-center"><span className="text-[10px]">👟</span></div>
                          <div className="bg-blue-50 border border-blue-100 text-blue-800 text-[6px] font-mono p-1 rounded font-bold uppercase flex items-center justify-center">CART ADDED</div>
                        </div>
                      )}
                      {project.id === "proj-coaching" && (
                        <div className="bg-emerald-50 rounded-lg p-1.5 flex justify-between items-center border border-emerald-150">
                          <span className="text-[6px] font-bold text-emerald-800 uppercase font-sans">BOOK FREE DEMO SESSION</span>
                          <span className="text-[7px]">📅</span>
                        </div>
                      )}
                      {project.id === "proj-realestate" && (
                        <div className="bg-slate-50 border border-slate-150 rounded-lg p-1.5 text-center leading-none">
                          <span className="text-[6px] font-bold text-violet-750">Elysian Properties Map v3</span>
                          <div className="h-1 bg-violet-100 w-full rounded mt-1.5" />
                        </div>
                      )}
                      {project.id === "proj-restaurant" && (
                        <div className="bg-amber-50 rounded bg-slate-50 border border-slate-150 p-1.5 flex items-center justify-between">
                          <span className="text-[6px] text-amber-800 uppercase font-bold tracking-tight">Reservations Booked (35)</span>
                          <span className="text-[7px]">🛎️</span>
                        </div>
                      )}
                      {project.id === "proj-gym" && (
                        <div className="bg-rose-50 border border-rose-100 p-1 rounded-lg flex items-center justify-between">
                          <span className="text-[6px] font-bold text-rose-750">Pulse Timetable Live</span>
                          <span className="text-[7px]">🔥</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info and tags */}
                <div className="p-6 text-left flex flex-col flex-1 justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-extrabold uppercase font-mono tracking-wider text-slate-400">
                        {project.category}
                      </span>
                      <div className="flex gap-1.5 text-slate-400 group-hover:text-blue-600 transition-colors">
                        <Laptop size={11} />
                        <span className="text-[8px] font-bold uppercase font-mono">Verified Coded</span>
                      </div>
                    </div>

                    <h3 className="font-display text-xl font-bold text-slate-905 tracking-tight group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-sans text-xs text-slate-550 leading-relaxed truncate-multiline h-[50px]">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1 pt-1.5">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span key={i} className="text-[9px] font-bold font-mono bg-slate-50 text-slate-650 px-2 py-0.5 rounded border border-slate-150">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 mt-5 pt-4 flex gap-3.5 items-center justify-between">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="cursor-pointer font-sans text-xs font-bold text-slate-800 hover:text-blue-600 flex items-center gap-1 group/spec transition-colors"
                    >
                      <FileCode size={13} className="opacity-70 group-hover/spec:scale-110" />
                      Technical Case Study
                    </button>

                    <button
                      onClick={() => setActiveProject(project)}
                      className="cursor-pointer text-[10px] bg-slate-900 text-white rounded-lg p-1.5 hover:p-2 transition-all hover:bg-blue-600"
                      title="View Site"
                    >
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* High-End Technical Case study Sliding Overlay drawer */}
        <AnimatePresence>
          {activeProject && (
            <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
              {/* Overlay background blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProject(null)}
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm cursor-pointer"
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto"
              >
                {/* Header title */}
                <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                  <div className="flex items-center space-x-2.5">
                    <Sparkles size={16} className="text-blue-600 animate-pulse" />
                    <span className="font-display font-medium text-xs text-slate-400">Technical Case Details</span>
                  </div>

                  <button
                    onClick={() => setActiveProject(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Content body drawer */}
                <div className="p-6 flex-1 space-y-6 text-left">
                  {/* Hero card showing category */}
                  <div className={`p-6 rounded-2xl ${activeProject.colorScheme?.bg || "bg-slate-50"} border ${activeProject.colorScheme?.border || "border-slate-200"} flex flex-col items-start gap-3`}>
                    <span className="text-[10px] bg-white text-slate-900 border border-slate-200/50 font-bold px-3 py-1 rounded-full font-mono uppercase tracking-wider">
                      {activeProject.category}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">
                      {activeProject.title}
                    </h2>
                    <p className="font-sans text-xs text-slate-600 leading-relaxed">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Lighthouse Audit stats indicators */}
                  <div>
                    <h4 className="font-display text-sm font-bold text-slate-900 flex items-center mb-3">
                      <Award size={15} className="mr-1.5 text-blue-600" /> Performance Audit Ratings (Verified Lighthouse)
                    </h4>
                    <div className="grid grid-cols-4 gap-2.5">
                      <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-center">
                        <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-mono font-extrabold text-[11px] mx-auto">100</div>
                        <span className="text-[9px] font-bold text-slate-700 font-sans block mt-1.5 leading-none">Speed</span>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-center">
                        <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-mono font-extrabold text-[11px] mx-auto">98</div>
                        <span className="text-[9px] font-bold text-slate-700 font-sans block mt-1.5 leading-none">SEO</span>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-center">
                        <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-mono font-extrabold text-[11px] mx-auto">100</div>
                        <span className="text-[9px] font-bold text-slate-700 font-sans block mt-1.5 leading-none">Best Prac</span>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-center">
                        <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-mono font-extrabold text-[11px] mx-auto">96</div>
                        <span className="text-[9px] font-bold text-slate-700 font-sans block mt-1.5 leading-none">Access</span>
                      </div>
                    </div>
                  </div>

                  {/* Full list of code features */}
                  <div className="space-y-3">
                    <h4 className="font-display text-sm font-bold text-slate-900">
                      High-Performance Implementations Coded:
                    </h4>
                    <div className="space-y-2">
                      {activeProject.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start text-xs text-slate-650 bg-slate-50/50 p-2.5 border border-slate-150 rounded-xl leading-relaxed">
                          <CheckCircle size={14} className="text-blue-500 mr-2 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies capsules */}
                  <div className="space-y-3 pt-2">
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-400">
                      Technical Architecture Stack:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.technologies.map((tech, i) => (
                        <span key={i} className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-md border border-slate-205">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer contact button inside Drawer */}
                <div className="p-6 border-t border-slate-100 bg-slate-50">
                  <a
                    href="https://wa.me/9155328308?text=Hi%20Quantum%20Web%20Code,%20I've%20just%20seen%20your%20awesome%20project%20portfolio!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer w-full py-3 px-4 rounded-xl shadow-lg bg-blue-600 hover:bg-blue-700 text-white font-sans text-sm font-bold flex items-center justify-center gap-2"
                  >
                    Discuss A Similar Project
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
