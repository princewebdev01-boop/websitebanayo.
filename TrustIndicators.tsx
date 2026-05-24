import React, { useState, useEffect } from "react";
import { submitInquiry } from "../firebase";
import { SERVICES } from "../data";
import { Mail, Phone, Instagram, Send, MessageSquare, ArrowUp, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useData } from "../context/DataContext";

interface ContactProps {
  initialService: string;
}

export default function Contact({ initialService }: ContactProps) {
  const { siteContent } = useData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [projectDetails, setProjectDetails] = useState("");


  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Update chosen service outline if user clicks standard CTAs above
  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
      // Automatically scroll to the contact form section
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [initialService]);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verification guards
    if (!name.trim() || !email.trim() || !phone.trim() || !selectedService || !projectDetails.trim()) {
      setErrorMessage("Please fill in all mandatory fields correctly.");
      setFormStatus("error");
      return;
    }

    setFormStatus("submitting");
    setErrorMessage("");

    try {
      await submitInquiry({
        name,
        email,
        phone,
        company,
        service: selectedService,
        projectDetails
      });

      setFormStatus("success");
      // Flush inputs on success
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setProjectDetails("");
    } catch (err: any) {
      setFormStatus("error");
      try {
        // Try to decode JSON structure from handled firebase rules errors
        const errObj = JSON.parse(err.message);
        setErrorMessage(`Server rejected: ${errObj.error}`);
      } catch {
        setErrorMessage(err instanceof Error ? err.message : "Connection failed. Please review input sizes and values.");
      }
    }
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-slate-100 scroll-mt-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full inline-block">
            Launch Your Project
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-slate-900 tracking-tight">
            Let’s Scale Your Brand Conversions
          </h2>
          <p className="font-sans text-base text-slate-500 mt-4 leading-relaxed">
            Ready to grow? Complete our brief consult questionnaire below to store request parameters directly in Firestore and trigger a call response.
          </p>
        </div>

        {/* Content Box layout splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Coordinates Cards Left Side */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                Secure 1-on-1 Direct Consulting
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-550 leading-relaxed">
                By routing inquiries through our custom portfolio database, your request is logged directly onto our admin pipeline, guaranteeing attention and instant response indices.
              </p>
            </div>

            {/* Direct Cards channels list */}
            <div className="space-y-4 flex-1 py-4">
              
              {/* WhatsApp Item */}
              <a
                href={siteContent.socialWhatsApp || "https://wa.me/9155328308"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-4 bg-emerald-50/40 hover:bg-emerald-50 border border-emerald-100/80 hover:border-emerald-300 p-4 rounded-2xl transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-600">
                  <MessageSquare size={18} />
                </div>
                <div className="text-left leading-none">
                  <span className="text-[10px] font-extrabold uppercase font-mono tracking-wider text-emerald-600">WhatsApp Connect</span>
                  <div className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1 group-hover:text-emerald-700">
                    Direct Live Chat
                    <span className="text-xs text-slate-400">⏱️ Active</span>
                  </div>
                </div>
              </a>

              {/* Email Item */}
              <a
                href={`mailto:${siteContent.socialEmail || "princewebdev01@gmail.com"}`}
                className="group flex items-center space-x-4 bg-blue-50/40 hover:bg-blue-50 border border-blue-105/80 hover:border-blue-300 p-4 rounded-2xl transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600">
                  <Mail size={18} />
                </div>
                <div className="text-left leading-none">
                  <span className="text-[10px] font-extrabold uppercase font-mono tracking-wider text-blue-600">Email Inquiry</span>
                  <div className="text-sm font-bold text-slate-900 mt-1 group-hover:text-blue-700 truncate max-w-[240px]">
                    {siteContent.socialEmail || "princewebdev01@gmail.com"}
                  </div>
                </div>
              </a>

              {/* Instagram & Telegram channel links */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={siteContent.socialInstagram || "https://instagram.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 bg-slate-50 hover:bg-rose-50/30 border border-slate-200 hover:border-rose-200 p-3.5 rounded-2xl transition-all duration-300"
                >
                  <Instagram size={16} className="text-slate-550 group-hover:text-rose-500" />
                  <div className="text-left">
                    <span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400 block line-none">Instagram</span>
                    <span className="text-xs font-bold text-slate-800 line-none group-hover:text-rose-600">Follow Channel</span>
                  </div>
                </a>

                <a
                  href={siteContent.socialTelegram || "https://telegram.org"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 bg-slate-50 hover:bg-cyan-50/30 border border-slate-200 hover:border-cyan-200 p-3.5 rounded-2xl transition-all duration-300"
                >
                  <Send size={16} className="text-slate-550 group-hover:text-cyan-600" />
                  <div className="text-left">
                    <span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400 block line-none">Telegram</span>
                    <span className="text-xs font-bold text-slate-800 line-none group-hover:text-cyan-700">Chat Telegram</span>
                  </div>
                </a>
              </div>

            </div>

            {/* Support guarantee info */}
            <div className="bg-slate-50 border border-slate-200/80 p-4.5 rounded-2xl flex items-center space-x-3 text-left">
              <span className="text-lg">🛡️</span>
              <div className="leading-tight">
                <h4 className="text-xs font-bold text-slate-950">Identity and Code Protection Guaranteed</h4>
                <p className="text-[10px] text-slate-450 leading-normal mt-0.5">Your email and parameters are encrypted inside Firestore using safe security schemas.</p>
              </div>
            </div>
          </div>

          {/* Consultation Form Right Side */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm text-left">
            <AnimatePresence mode="wait">
              {formStatus === "success" ? (
                <motion.div
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center animate-bounce">
                    <CheckCircle size={32} className="stroke-[2.5]" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-2xl font-black text-slate-950">Inquiry Received Successfully!</h3>
                    <p className="font-sans text-xs text-slate-550 max-w-sm">
                      Thank you for trusting <strong className="text-slate-800">Quantum Web Code</strong>. Your parameters are safely updated inside our Firestore client register. We will reach out to you within 15 minutes!
                    </p>
                  </div>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="cursor-pointer font-sans text-xs font-bold text-blue-600 hover:text-white hover:bg-blue-600 px-4 py-2 border border-blue-200 rounded-xl transition-all duration-300"
                  >
                    Send Another Response
                  </button>
                </motion.div>
              ) : (
                <motion.form key="active-form" onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 mb-2">
                    <Sparkles size={15} className="text-blue-600 animate-pulse" />
                    <span className="font-display text-sm font-bold text-slate-900">Project Parameters Form</span>
                  </div>

                  {/* Name and Email inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4.5 py-3 rounded-xl border border-slate-200 text-xs font-sans focus:outline-none focus:border-blue-500 bg-slate-50/50 focus:bg-white transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4.5 py-3 rounded-xl border border-slate-200 text-xs font-sans focus:outline-none focus:border-blue-500 bg-slate-50/50 focus:bg-white transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Phone and Company inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 555 123 4567"
                        className="w-full px-4.5 py-3 rounded-xl border border-slate-200 text-xs font-sans focus:outline-none focus:border-blue-500 bg-slate-50/50 focus:bg-white transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">Brand / Company (Optional)</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Brand Name"
                        className="w-full px-4.5 py-3 rounded-xl border border-slate-200 text-xs font-sans focus:outline-none focus:border-blue-500 bg-slate-50/50 focus:bg-white transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Category select requested */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">Requested Service *</label>
                    <select
                      required
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-sans focus:outline-none focus:border-blue-500 bg-slate-50/30 font-semibold focus:bg-white transition-all duration-300 appearance-none"
                    >
                      <option value="" disabled className="text-slate-400">Choose custom category...</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  {/* Project description */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">Project Details & Objectives *</label>
                    <textarea
                      required
                      rows={4}
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder="Describe your design parameters, timelines, page numbers, product loads, or payment integrations objectives..."
                      className="w-full px-4.5 py-3 rounded-xl border border-slate-200 text-xs font-sans focus:outline-none focus:border-blue-500 bg-slate-50/50 focus:bg-white transition-all duration-300 resize-none leading-relaxed"
                    />
                  </div>

                  {/* Feedback on errors */}
                  {formStatus === "error" && (
                    <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl flex items-start space-x-2 text-rose-800 text-xs leading-normal">
                      <AlertCircle size={14} className="shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* CTA Submit Button */}
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="cursor-pointer w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-blue-100 disabled:opacity-50 transition-colors"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Logging Inquiry to Firestore...
                      </>
                    ) : (
                      <>
                        Submit Scoping Parameters
                        <Send size={12} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Persistent Blinking Blip Float WhatsApp Button Bottom Right */}
      <a
        href={siteContent.socialWhatsApp || "https://wa.me/9155328308"}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group ring-4 ring-emerald-100/50 animate-bounce"
        title="Chat on WhatsApp"
        aria-label="Direct WhatsApp chat connect"
      >
        <MessageSquare size={22} className="stroke-[2.5]" />
        <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg pointer-events-none whitespace-nowrap">
          Chat Directly Live
        </span>
      </a>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleBackToTop}
            className="fixed bottom-22 right-6 z-45 bg-white text-slate-800 p-3.5 rounded-full shadow-xl border border-slate-200 hover:border-blue-400 hover:text-blue-600 cursor-pointer hover:scale-110 transition-all"
            title="Back to Top"
            aria-label="Scroll back layout to top"
          >
            <ArrowUp size={18} className="stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

    </section>
  );
}
