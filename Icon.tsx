import { SKILL_CATEGORIES } from "../data";
import { CheckCircle2, Award, Zap, Code2, Globe2 } from "lucide-react";
import { motion } from "motion/react";
import { useData } from "../context/DataContext";

export default function About() {
  const { siteContent } = useData();

  const highlights = [
    {
      icon: <Award className="text-blue-600" size={20} />,
      title: "6+ Years Experience",
      text: "Serving global brands, agencies, and small businesses with pixel-perfect responsive templates."
    },
    {
      icon: <Zap className="text-blue-600" size={20} />,
      title: "Fast Execution Index",
      text: "Advanced component design and clean styling structures mean your product goes live up to twice as fast."
    },
    {
      icon: <Code2 className="text-blue-600" size={20} />,
      title: "Modern Tech Practices",
      text: "Coded in robust, modular TypeScript and modern Tailwind, ready to deploy seamlessly to production environments."
    },
    {
      icon: <Globe2 className="text-blue-600" size={20} />,
      title: "Worldwide Client Sync",
      text: "Seamless communication through Slack, WhatsApp, and Google Meet regardless of time zones."
    }
  ];

  return (
    <section id="about" className="py-24 bg-slate-50/50 border-t border-slate-100 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full inline-block">
            About the Developer
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-slate-900 tracking-tight">
            Crafting Digital Direct Selling Powerhouses
          </h2>
          <p className="font-sans text-base text-slate-500 mt-4 leading-relaxed">
            Hi, I’m the lead developer at <strong className="text-slate-800">Quantum Web Code</strong>. I build high-performance web systems designed to maximize user retention and multiply sales.
          </p>
        </div>

        {/* Content body split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Biographical content card left side */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between text-left">
            <div className="space-y-4">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                Helping Startups & Brands Stand Out in the Digital Noise
              </h3>
              <p className="font-sans text-sm text-slate-605 leading-relaxed whitespace-pre-line font-medium">
                {siteContent.aboutBio}
              </p>
            </div>

            {/* highlights row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {highlights.map((hlt, idx) => (
                <div key={idx} className="bg-white p-4.5 rounded-2xl border border-slate-200/60 shadow-sm space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    {hlt.icon}
                  </div>
                  <h4 className="font-display text-sm font-bold text-slate-900">
                    {hlt.title}
                  </h4>
                  <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
                    {hlt.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Core competencies indicators right side */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between text-left">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Technical Competence Index
              </h3>

              <div className="space-y-6">
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.id} className="space-y-3.5">
                    <span className="text-[10px] font-extrabold font-mono uppercase tracking-wider text-slate-400 block pb-1 border-b border-slate-100">
                      {cat.title}
                    </span>
                    <div className="space-y-3">
                      {cat.skills.map((sk, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-sans font-semibold text-slate-700">{sk.name}</span>
                            <span className="font-mono font-bold text-slate-500">{sk.value}%</span>
                          </div>
                          {/* Outer Bar */}
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            {/* Inner animated bar */}
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${sk.value}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand statement bottom tag */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center space-x-2.5">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <span className="font-sans text-xs text-slate-500">
                Guaranteed high-speed, SEO-compliant markup compiled with zero deployment warnings.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
