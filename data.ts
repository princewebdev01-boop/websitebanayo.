import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { ChevronLeft, ChevronRight, Quote, Star, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Testimonials() {
  const { testimonials } = useData();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left slide, 1 for right slide

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setDirection(1);
    setIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setDirection(-1);
    setIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Auto-rotate reviews every 8 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [index, testimonials.length]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "80%" : "-80%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-80%" : "80%",
      opacity: 0,
      transition: { duration: 0.35, ease: "easeIn" }
    })
  };

  const activeReview = testimonials[index] || testimonials[0];


  return (
    <section id="testimonials" className="py-24 bg-white scroll-mt-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background Soft Gradiation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-50/50 blur-3xl -z-10" />

        {/* Module Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full inline-block">
            Client Feedback
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-slate-900 tracking-tight">
            Loved by Fast-Growing Businesses
          </h2>
          <p className="font-sans text-base text-slate-500 mt-4 leading-relaxed">
            Read direct stories of speed, design aesthetic, and high-fidelity launch execution told by our client partners.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-3xl mx-auto relative px-4 md:px-12">
          
          <div className="absolute -top-6 left-6 text-blue-100 opacity-60 hidden sm:block">
            <Quote size={80} className="stroke-[1.5]" />
          </div>

          <div className="min-h-[220px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-slate-50 border border-slate-200 p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-sm text-center relative"
              >
                {/* Ratings Stars */}
                <div className="flex justify-center space-x-1 mb-5">
                  {[...Array(activeReview ? activeReview.rating : 5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* review Quotes */}
                <p className="font-sans text-sm sm:text-base md:text-lg text-slate-700 italic font-medium leading-relaxed">
                  "{activeReview ? activeReview.review : "No reviews loaded yet."}"
                </p>

                {/* divider line */}
                <div className="w-12 h-0.5 bg-blue-200 mx-auto my-6" />

                {/* Client detail row */}
                <div className="space-y-1">
                  <h4 className="font-display text-sm sm:text-base font-bold text-slate-900">
                    {activeReview ? activeReview.name : "Quantum Client"}
                  </h4>
                  <p className="font-sans text-xs text-slate-550">
                    {activeReview ? activeReview.role : "Partner"} {activeReview?.company ? "at" : ""} <strong className="text-slate-800 font-semibold">{activeReview ? activeReview.company : ""}</strong>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Steppers */}
          <div className="flex justify-center items-center gap-3.5 mt-8">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-slate-600 hover:text-blue-600 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>
            
            {/* Ticker indicators */}
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`cursor-pointer h-2 rounded-full transition-all duration-300 ${
                    index === i ? "w-6 bg-blue-600" : "w-2 bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-slate-600 hover:text-blue-600 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Secondary metric label cards row below */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-slate-450 border-t border-slate-100 pt-10">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider font-mono">
            <Users size={14} className="text-blue-500" />
            98% Client Retention Rate
          </span>
          <span className="h-4 w-px bg-slate-200 hidden sm:block" />
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider font-mono">
            ⏰ Under 15m Response Guarantee
          </span>
          <span className="h-4 w-px bg-slate-200 hidden sm:block" />
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider font-mono">
            ⭐ 5-Star Freelance Client Reviews
          </span>
        </div>

      </div>
    </section>
  );
}
