import { useState } from "react";
import { ArrowUpRight, MessageSquare, Zap, Monitor, Smartphone, Tablet, Star, Sparkles, ShoppingBag, Eye, TrendingUp, CheckCircle, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useData } from "../context/DataContext";

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const { siteContent } = useData();
  const [activeTab, setActiveTab] = useState<"shop" | "saas" | "landing">("shop");
  const [frameSize, setFrameSize] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [cartCount, setCartCount] = useState(2);
  const [likeCount, setLikeCount] = useState(148);
  const [isLiked, setIsLiked] = useState(false);


  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const tabs = [
    { id: "shop", label: "Ecommerce Shop", color: "border-blue-500 text-blue-600" },
    { id: "saas", label: "SaaS Dashboard", color: "border-cyan-500 text-cyan-600" },
    { id: "landing", label: "Optimized Landing Page", color: "border-violet-500 text-violet-600" }
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-slate-50/50"
    >
      {/* Background Soft Glow Radial Ellipses */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl -z-10 animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 rounded-full bg-cyan-100/40 blur-3xl -z-10 animate-float" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-indigo-100/30 blur-3xl -z-10 animate-float-fast" />

      {/* Hero Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Actions Left side */}
          <div className="lg:col-span-5 text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100/80 px-3.5 py-1.5 rounded-full"
            >
              <Sparkles size={14} className="text-blue-600 animate-pulse" />
              <span className="font-sans text-xs font-semibold text-blue-700 tracking-wide uppercase">
                Premium Agency Standards
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight"
              >
                {siteContent.heroHeading}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl"
              >
                {siteContent.heroSubheading}
              </motion.p>
            </div>

            {/* Direct CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={() => onScrollToSection("projects")}
                className="cursor-pointer font-sans text-base font-semibold bg-blue-600 text-white px-7 py-3.5 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                View Projects
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href={siteContent.socialWhatsApp || "https://wa.me/9155328308"}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-sans text-base font-semibold bg-white text-slate-800 border border-slate-200 hover:border-emerald-300 px-7 py-3.5 rounded-xl shadow-sm hover:shadow-md hover:bg-emerald-50/20 hover:text-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 group/wa"
              >
                <MessageSquare size={18} className="text-emerald-500 transition-all group-hover/wa:scale-110" />
                Contact on WhatsApp
              </a>
            </motion.div>

            {/* Micro Rating Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-4 pt-1 border-t border-slate-100"
            >
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs text-slate-500 font-sans font-medium">
                Rated <strong className="text-slate-800 font-bold">5.0/5.0</strong> by 90+ direct global freelance business clients.
              </div>
            </motion.div>
          </div>

          {/* Interactive Live Mockup Panel Right side */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Display selectors and size adjustments */}
            <div className="w-full flex justify-between items-center mb-4 px-2">
              <div className="flex bg-slate-100 p-1 rounded-xl space-x-1 border border-slate-200/50">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="hidden sm:flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/50">
                <button
                  onClick={() => setFrameSize("desktop")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${frameSize === "desktop" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-700"}`}
                  title="Desktop View"
                >
                  <Monitor size={15} />
                </button>
                <button
                  onClick={() => setFrameSize("tablet")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${frameSize === "tablet" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-700"}`}
                  title="Tablet View"
                >
                  <Tablet size={15} />
                </button>
                <button
                  onClick={() => setFrameSize("mobile")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${frameSize === "mobile" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-700"}`}
                  title="Mobile View"
                >
                  <Smartphone size={15} />
                </button>
              </div>
            </div>

            {/* Container shell for mockup frame sizes */}
            <div
              className={`relative transition-all duration-500 ease-out border border-slate-200 shadow-2xl rounded-2xl bg-slate-950 overflow-hidden ${
                frameSize === "desktop"
                  ? "w-full max-w-xl md:max-w-2xl h-[400px]"
                  : frameSize === "tablet"
                  ? "w-[360px] md:w-[440px] h-[400px]"
                  : "w-[245px] md:w-[280px] h-[400px]"
              }`}
            >
              {/* Chrome Top Browser Frame */}
              <div className="h-8 bg-slate-100 border-b border-slate-200 px-4 flex items-center justify-between">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="w-1/2 bg-white rounded-md text-[10px] text-slate-400 font-mono text-center py-0.5 border border-slate-200/80 truncate">
                  {activeTab === "shop" && "shop.quantumwebcode.com"}
                  {activeTab === "saas" && "dashboard.quantumwebcode.com"}
                  {activeTab === "landing" && "accelerate.quantumwebcode.com"}
                </div>
                <div className="flex space-x-1 text-slate-350">
                  <div className="w-3" />
                </div>
              </div>

              {/* Dynamic Inside View Renderer */}
              <div className="bg-slate-50 h-[360px] overflow-hidden relative">
                <AnimatePresence mode="wait">
                  {/* Tab Variant 1: Shop */}
                  {activeTab === "shop" && (
                    <motion.div
                      key="shop"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 flex flex-col justify-between h-full"
                    >
                      {/* Store Header */}
                      <div className="flex justify-between items-center border-b border-slate-250 pb-2">
                        <span className="font-display font-black text-xs text-slate-850 flex items-center gap-1">
                          <ShoppingBag size={12} className="text-blue-600" />
                          VELOCITY ATHLETICS
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="relative bg-blue-50 text-blue-600 p-1.5 rounded-full cursor-pointer hover:bg-blue-100" onClick={() => setCartCount(prev => prev + 1)}>
                            <ShoppingBag size={12} />
                            <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white font-mono font-bold rounded-full w-4 h-4 flex items-center justify-center text-[8px] animate-bounce">
                              {cartCount}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Store Product Card */}
                      <div className="grid grid-cols-2 gap-3 my-auto">
                        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                          <div className="bg-slate-100 h-20 rounded-lg flex items-center justify-center relative overflow-hidden group">
                            <span className="text-[28px] transform group-hover:scale-110 transition-transform">👟</span>
                            <div className="absolute top-1 right-1 bg-blue-600 text-white text-[7px] font-bold px-1 py-0.5 rounded-full">
                              NEW
                            </div>
                          </div>
                          <div className="mt-2 text-left">
                            <span className="text-[10px] text-slate-500 uppercase font-sans">Apex Pro</span>
                            <h4 className="text-xs font-bold text-slate-900 leading-tight">Quantum Cushion</h4>
                            <div className="flex justify-between items-center mt-1.5">
                              <span className="text-xs font-mono font-bold text-blue-600">$189.00</span>
                              <button
                                onClick={() => setCartCount(c => c + 1)}
                                className="cursor-pointer text-[10px] bg-slate-900 hover:bg-blue-600 text-white px-2 py-1 rounded-md"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                          <div className="bg-slate-100 h-20 rounded-lg flex items-center justify-center relative overflow-hidden group">
                            <span className="text-[28px] transform group-hover:scale-110 transition-transform">🎧</span>
                            <div className="absolute top-1 right-1 bg-yellow-500 text-slate-950 text-[7px] font-bold px-1 py-0.5 rounded-full">
                              BEST
                            </div>
                          </div>
                          <div className="mt-2 text-left">
                            <span className="text-[10px] text-slate-500 uppercase font-sans">Bose ANC</span>
                            <h4 className="text-xs font-bold text-slate-900 leading-tight">Aero Sound 2</h4>
                            <div className="flex justify-between items-center mt-1.5">
                              <span className="text-xs font-mono font-bold text-blue-600">$299.00</span>
                              <button
                                onClick={() => setCartCount(c => c + 1)}
                                className="cursor-pointer text-[10px] bg-slate-900 hover:bg-blue-600 text-white px-2 py-1 rounded-md"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Store trust bar */}
                      <div className="flex justify-around items-center bg-blue-50/50 p-2 rounded-xl text-[9px] text-blue-800 font-sans font-semibold border border-blue-50">
                        <span className="flex items-center gap-1"><CheckCircle size={10} className="text-blue-500" /> SSL SECURE INTEGRATION</span>
                        <span className="flex items-center gap-1"><Shield size={10} className="text-blue-500" /> INSTANT STRIPE ACCREDITED</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Tab Variant 2: SaaS */}
                  {activeTab === "saas" && (
                    <motion.div
                      key="saas"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 flex flex-col justify-between h-full text-left"
                    >
                      {/* Dashboard Header */}
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <span className="font-display font-medium text-xs text-slate-900 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                          SYNAPSE ANALYTICS
                        </span>
                        <div className="text-[9px] font-mono bg-cyan-100 text-cyan-800 font-bold px-2 py-0.5 rounded-md">
                          SERVER LIVE: 99.99%
                        </div>
                      </div>

                      {/* Dashboard Stats */}
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm text-left relative overflow-hidden group">
                          <div className="text-[9px] text-slate-500 font-sans">Active Users</div>
                          <div className="font-mono text-sm font-bold text-slate-900 mt-0.5">2,842</div>
                          <div className="text-[7px] text-emerald-500 font-bold flex items-center mt-0.5">
                            <TrendingUp size={8} className="mr-0.5" /> +14.2%
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm text-left relative overflow-hidden group">
                          <div className="text-[9px] text-slate-500 font-sans">API Processing</div>
                          <div className="font-mono text-sm font-bold text-slate-900 mt-0.5">0.42 ms</div>
                          <div className="text-[7px] text-emerald-500 font-bold flex items-center mt-0.5">
                            <Zap size={8} className="mr-0.5" /> Optimal
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm text-left relative overflow-hidden group clickable cursor-pointer" onClick={handleLike}>
                          <div className="text-[9px] text-slate-500 font-sans">User Likes</div>
                          <div className="font-mono text-sm font-bold text-slate-900 mt-0.5 transition-colors group-hover:text-cyan-600">{likeCount}</div>
                          <div className="text-[7px] font-mono font-bold text-cyan-600 flex items-center mt-0.5 select-none">
                            {isLiked ? "❤️ Liked!" : "🤍 Click to Like"}
                          </div>
                        </div>
                      </div>

                      {/* Interactive Graph Plotting Area */}
                      <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col justify-between h-32 mt-2">
                        <div className="flex justify-between items-center text-[9px] font-sans">
                          <span className="text-slate-500">Resource Consumption Monitor</span>
                          <span className="font-mono font-bold text-cyan-600">NETWORK CAP: 200MB/s</span>
                        </div>
                        <div className="flex items-end justify-between h-16 px-1 border-b border-l border-slate-200/80 pt-2">
                          <div className="w-6 bg-cyan-100 rounded-t h-[40%] hover:bg-cyan-500 transition-all duration-300 relative group"><span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] bg-slate-900 text-white rounded px-1 hidden group-hover:block">40%</span></div>
                          <div className="w-6 bg-cyan-200 rounded-t h-[55%] hover:bg-cyan-500 transition-all duration-300 relative group"><span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] bg-slate-900 text-white rounded px-1 hidden group-hover:block">55%</span></div>
                          <div className="w-6 bg-cyan-300 rounded-t h-[75%] hover:bg-cyan-500 transition-all duration-300 relative group"><span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] bg-slate-900 text-white rounded px-1 hidden group-hover:block">75%</span></div>
                          <div className="w-6 bg-cyan-400 rounded-t h-[65%] hover:bg-cyan-500 transition-all duration-300 relative group"><span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] bg-slate-900 text-white rounded px-1 hidden group-hover:block">65%</span></div>
                          <div className="w-6 bg-cyan-500 rounded-t h-[95%] hover:bg-cyan-600 transition-all duration-300 relative group"><span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] bg-slate-900 text-white rounded px-1 hidden group-hover:block">95%</span></div>
                        </div>
                        <div className="flex justify-between text-[7px] font-mono text-slate-400 px-1 pt-1">
                          <span>08:00</span>
                          <span>09:00</span>
                          <span>10:00</span>
                          <span>11:00</span>
                          <span>12:00</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Tab Variant 3: Landing Wireframes */}
                  {activeTab === "landing" && (
                    <motion.div
                      key="landing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 flex flex-col justify-between h-full"
                    >
                      {/* Wire Header */}
                      <div className="flex justify-between items-center border-b border-light-200 pb-1.5">
                        <span className="font-display font-bold text-xs text-slate-900">Apex Consulting</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-600" />
                      </div>

                      {/* Main Copy Showcase Area */}
                      <div className="flex flex-col items-center text-center my-auto px-2 space-y-2">
                        <div className="inline-block bg-violet-50 text-violet-700 text-[8px] font-extrabold px-2 py-0.5 rounded-md tracking-wider uppercase">
                          GROWTH HUB
                        </div>
                        <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-950 leading-tight">
                          Skyrocket Your Brand Digital Conversions.
                        </h3>
                        <p className="font-sans text-[9px] text-slate-500 max-w-xs">
                          Modern layout designs optimized with targeted lead pathways to scale signup actions up to 4x. Fully responsive.
                        </p>
                        <button className="bg-violet-600 hover:bg-violet-700 text-white text-[9px] font-bold px-3 py-1.5 rounded-md shadow-sm">
                          Schedule Free Consult
                        </button>
                      </div>

                      {/* Performance Gauge Dashboard indicators */}
                      <div className="grid grid-cols-2 gap-3 bg-white p-2 border border-slate-200/80 rounded-xl relative">
                        <div className="flex items-center space-x-2 border-r border-slate-100 pr-1">
                          <div className="w-7 h-7 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center text-xs font-bold font-mono">
                            100
                          </div>
                          <div className="text-left leading-none">
                            <span className="text-[8px] font-bold text-slate-800">GOOGLE SPEED</span>
                            <div className="text-[7px] text-slate-400">Mobile validated</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 pl-1">
                          <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold font-mono">
                            0.4s
                          </div>
                          <div className="text-left leading-none">
                            <span className="text-[8px] font-bold text-slate-800">FIRST PAINT</span>
                            <div className="text-[7px] text-slate-400">Next-gen core web</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Overlap Widgets for trust & depth */}
            <div className="relative -mt-9 w-11/12 max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-4 flex justify-between items-center z-15">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 animate-pulse">
                  <Zap size={18} />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider font-mono font-extrabold text-blue-600 leading-none">
                    Fast Delivery
                  </div>
                  <div className="text-xs font-bold font-sans text-slate-800 mt-0.5">
                    100% Launch Index
                  </div>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-100" />

              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-650">
                  <Eye size={18} />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider font-mono font-extrabold text-emerald-650 leading-none">
                    SEO Friendly
                  </div>
                  <div className="text-xs font-bold font-sans text-slate-800 mt-0.5">
                    Score: 100/100
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
