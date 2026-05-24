import { useState } from "react";
import { PROCESS_STEPS } from "../data";
import { Check, Calendar, ArrowRight, Sparkles, Code, ShieldCheck, Rocket, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Process() {
  const [activeStep, setActiveStep] = useState<number>(0);

  // Dynamic visual illustrations to render on the right based on active step index
  const renderStepIllustration = (index: number) => {
    switch(index) {
      case 0:
        return (
          <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 flex flex-col justify-between h-56 text-left">
            <div className="flex justify-between items-start">
              <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full font-mono">SCOPING CARD</span>
              <Calendar size={16} className="text-blue-600 animate-bounce" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-white border border-slate-200/80 rounded px-2 flex items-center text-[9px] font-mono"><span className="text-blue-600 mr-1.5 font-bold">1.</span> Launch Call Questions Outline</div>
              <div className="h-4 bg-white border border-slate-200/80 rounded px-2 flex items-center text-[9px] font-mono"><span className="text-blue-600 mr-1.5 font-bold">2.</span> Target Audience Personas Board</div>
              <div className="h-4 bg-white border border-slate-200/80 rounded px-2 flex items-center text-[9px] font-mono"><span className="text-blue-600 mr-1.5 font-bold">3.</span> Functional Requirement List Draft (PRD)</div>
            </div>
            <div className="text-[10px] text-slate-400 font-sans italic text-right">Updated 10m ago</div>
          </div>
        );
      case 1:
        return (
          <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 flex flex-col justify-between h-56 text-left">
            <div className="flex justify-between items-start">
              <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full font-mono">FIGMA WIRE</span>
              <Layers size={16} className="text-emerald-600" />
            </div>
            {/* Grid representation */}
            <div className="grid grid-cols-2 gap-2 flex-1 my-auto">
              <div className="bg-white border-2 border-dashed border-slate-200 rounded p-2.5 flex flex-col justify-between text-center">
                <span className="text-[10px] text-slate-400">Header Hero</span>
                <div className="h-1 bg-slate-100 rounded w-3/4 mx-auto" />
              </div>
              <div className="bg-white border-2 border-dashed border-slate-200 rounded p-2.5 flex flex-col justify-between text-center">
                <span className="text-[10px] text-slate-400">Product Card</span>
                <div className="h-1 bg-slate-100 rounded w-1/2 mx-auto" />
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-sans italic text-right">Draft v1.4 Active</div>
          </div>
        );
      case 2:
        return (
          <div className="bg-[#FAF8FE] rounded-2xl p-6 border border-violet-100 flex flex-col justify-between h-56 text-left">
            <div className="flex justify-between items-start">
              <span className="text-[10px] bg-violet-100 text-violet-700 font-bold px-2 py-0.5 rounded-full font-mono">REACT EDITOR</span>
              <Code size={16} className="text-violet-600" />
            </div>
            <div className="font-mono text-[9px] text-slate-700 bg-white border border-slate-150 p-3 rounded-lg overflow-hidden flex-1 my-3 select-none">
              <div className="text-violet-600">import <span className="text-slate-900">{"{ motion }"}</span> from <span className="text-emerald-600">"motion/react"</span>;</div>
              <div className="text-blue-600">export default function <span className="text-yellow-600">Portfolio</span>() {"{"}</div>
              <div className="pl-4 text-slate-400">return <span className="text-cyan-600">{"<motion.div animate={{ opacity: 1 }}>"}</span>;</div>
              <div className="text-blue-600">{"}"}</div>
            </div>
            <div className="text-[10px] text-slate-400 font-sans italic text-right">Compiled Successfully</div>
          </div>
        );
      case 3:
        return (
          <div className="bg-rose-50/50 rounded-2xl p-6 border border-rose-100 flex flex-col justify-between h-56 text-left">
            <div className="flex justify-between items-start">
              <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full font-mono">LIGHTHOUSE REPORT</span>
              <ShieldCheck size={16} className="text-rose-600" />
            </div>
            <div className="flex justify-around items-center flex-1">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full border-4 border-emerald-500 flex items-center justify-center font-mono font-bold text-xs bg-white">100</div>
                <span className="text-[8px] font-bold text-slate-600 block mt-1">SPEED</span>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full border-4 border-emerald-550 flex items-center justify-center font-mono font-bold text-xs bg-white">100</div>
                <span className="text-[8px] font-bold text-slate-600 block mt-1">SEO</span>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full border-4 border-emerald-500 flex items-center justify-center font-mono font-bold text-xs bg-white">99</div>
                <span className="text-[8px] font-bold text-slate-600 block mt-1">SECURITY</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-sans italic text-right">Lighthouse validated 100%</div>
          </div>
        );
      case 4:
        return (
          <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 flex flex-col justify-between h-56 text-left">
            <div className="flex justify-between items-start">
              <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full font-mono">DNS PROV</span>
              <Rocket size={16} className="text-amber-600 animate-pulse" />
            </div>
            <div className="space-y-1.5 flex flex-col justify-center flex-1">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5"><Check size={12} className="text-emerald-500" /> SSL Certificate successfully bounds</div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5"><Check size={12} className="text-emerald-500" /> Production Vercel deploy ready</div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5"><Check size={12} className="text-emerald-500" /> SEO Caching indexed successfully</div>
            </div>
            <div className="text-[10px] text-slate-450 font-sans font-bold text-emerald-600 text-right">🚀 STATUS: ONLINE</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="process" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full inline-block">
            Working Process
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-slate-900 tracking-tight">
            Our Battle-Tested Delivery Loop
          </h2>
          <p className="font-sans text-base text-slate-500 mt-4 leading-relaxed">
            We follow architectural standards and clear milestones to take your raw requirement specification list into a flawless production launch.
          </p>
        </div>

        {/* Milestone selectors timeline */}
        <div className="relative mb-12 max-w-4xl mx-auto">
          {/* Main timeline visual trace line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0 hidden md:block" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer group flex md:flex-col items-center gap-3 md:gap-2.5 transition-all outline-none ${
                  activeStep === idx ? "scale-105" : "hover:scale-102"
                }`}
              >
                {/* Visual badge */}
                <div
                  className={`w-12 h-12 rounded-full font-display font-bold text-xs flex items-center justify-center border-2 shadow-sm transition-all duration-300 ${
                    activeStep === idx
                      ? "bg-blue-600 text-white border-blue-600 ring-4 ring-blue-100"
                      : "bg-white text-slate-505 border-slate-200 group-hover:border-blue-400 group-hover:text-blue-600"
                  }`}
                >
                  {step.step}
                </div>

                {/* Sub-label text */}
                <span className={`font-sans text-xs font-bold font-semibold transition-colors ${
                  activeStep === idx ? "text-slate-950" : "text-slate-450 group-hover:text-slate-950"
                }`}>
                  {step.title.split(" ")[0]} {step.title.split(" ")[1] || ""}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Display details of actively selected step */}
        <div className="max-w-4xl mx-auto mt-12 bg-slate-50/50 border border-slate-200/80 rounded-2xl p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-left"
            >
              {/* Left description text */}
              <div className="space-y-5">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[11px] font-black text-blue-600 bg-blue-100/50 border border-blue-100 px-2.5 py-0.5 rounded-md uppercase">
                    PHASE {PROCESS_STEPS[activeStep].step}
                  </span>
                  <span className="font-sans text-[10px] font-bold text-slate-450 uppercase flex items-center gap-1">
                    ⏱️ Duration: {PROCESS_STEPS[activeStep].duration}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-2xl font-black text-slate-950 leading-none">
                    {PROCESS_STEPS[activeStep].title}
                  </h3>
                  <p className="font-sans text-xs text-slate-550 leading-relaxed">
                    {PROCESS_STEPS[activeStep].description}
                  </p>
                </div>

                {/* Internal features */}
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Core Milestones Completed
                  </span>
                  <div className="space-y-1.5">
                    {PROCESS_STEPS[activeStep].features.map((feat, idx) => (
                      <div key={idx} className="flex items-center text-xs text-slate-650">
                        <Check size={12} className="text-emerald-500 mr-2 shrink-0 stroke-[2.5]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Switch actions arrows */}
                <div className="flex gap-2 pt-4">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(prev => prev - 1)}
                    className="cursor-pointer text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent px-3 py-1.5 rounded-lg border border-slate-200"
                  >
                    Previous
                  </button>
                  <button
                    disabled={activeStep === PROCESS_STEPS.length - 1}
                    onClick={() => setActiveStep(prev => prev + 1)}
                    className="cursor-pointer text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 px-3.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1"
                  >
                    Next Phase
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Right graphical illustration */}
              <div className="flex flex-col justify-center">
                {renderStepIllustration(activeStep)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
