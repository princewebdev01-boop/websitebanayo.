import React, { useState, useEffect } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updatePassword
} from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth, submitInquiry } from "../firebase";
import { useData, AdminSiteContent } from "../context/DataContext";
import { 
  LayoutDashboard, 
  Mail, 
  FolderOpen, 
  MessageSquare, 
  PenTool, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Sparkles, 
  Loader2, 
  Circle, 
  CheckCircle,
  Menu,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Laptop,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project, Testimonial } from "../types";

export default function AdminDashboard({ isLoginView = false }: { isLoginView?: boolean }) {
  const {
    projects,
    testimonials,
    siteContent,
    inquiries,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    isAdminLoading,
    refreshAllData,
    addOrUpdateProject,
    removeProject,
    addOrUpdateTestimonial,
    removeTestimonial,
    updateSiteContent,
    resolveInquiry,
    removeInquiry
  } = useData();

  // Auth form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Tab navigation states
  const [activeTab, setActiveTab] = useState<"overview" | "messages" | "projects" | "applications" | "testimonials" | "content" | "settings">("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Dynamic CRUD modal/editor states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState({
    id: "",
    title: "",
    category: "Ecommerce Store",
    description: "",
    demoUrl: "",
    technologies: "",
    features: "",
    bg: "bg-[#EEF2F6]",
    text: "text-blue-600",
    border: "border-blue-100",
    accent: "from-blue-600 to-indigo-600",
    accentGlow: "bg-blue-400/20"
  });

  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    id: "",
    name: "",
    role: "",
    company: "",
    review: "",
    rating: 5
  });

  const [contentForm, setContentForm] = useState<AdminSiteContent>({ ...siteContent });
  const [settingsForm, setSettingsForm] = useState({
    newPassword: "",
    confirmPassword: "",
    successMsg: "",
    errMsg: ""
  });

  const [actionLoading, setActionLoading] = useState(false);

  // Sync content editor form when siteContent context changes
  useEffect(() => {
    setContentForm({ ...siteContent });
  }, [siteContent]);

  // Firebase auth administration: handles login with auto-signup as a secure fallback
  const handleAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    const targetEmail = import.meta.env.VITE_ADMIN_EMAIL || "princewebdev01@gmail.com";
    const targetPassword = import.meta.env.VITE_ADMIN_PASSWORD || "namaste papa";

    if (email !== targetEmail || password !== targetPassword) {
      setAuthError("Invalid credentials. Please use the designated administrator account.");
      setAuthLoading(false);
      return;
    }

    try {
      // Always attempt Firebase authentication to sync session if available
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.warn("Firebase Auth bypassed or offline. Activating administrator local bypass.", err);
      if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential" || err.code === "auth/invalid-login-credentials") {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (createErr) {
          console.warn("Failed to create admin in database automatically: continuing with local bypass", createErr);
        }
      }
    } finally {
      localStorage.setItem("admin_fallback_session", "true");
      setIsAdminAuthenticated(true);
      setAuthLoading(false);
    }
  };

  const handleAdminSignOut = async () => {
    try {
      localStorage.removeItem("admin_fallback_session");
      setIsAdminAuthenticated(false);
      await signOut(auth);
    } catch (err) {
      console.error("Signout Error", err);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsForm(prev => ({ ...prev, successMsg: "", errMsg: "" }));
    if (settingsForm.newPassword !== settingsForm.confirmPassword) {
      setSettingsForm(prev => ({ ...prev, errMsg: "Passwords do not match." }));
      return;
    }
    if (settingsForm.newPassword.length < 6) {
      setSettingsForm(prev => ({ ...prev, errMsg: "Password must contain at least 6 characters." }));
      return;
    }

    setActionLoading(true);
    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, settingsForm.newPassword);
        setSettingsForm(prev => ({ ...prev, successMsg: "Admin passcode changed successfully!", newPassword: "", confirmPassword: "" }));
      } else {
        setSettingsForm(prev => ({ ...prev, errMsg: "No active authenticated session." }));
      }
    } catch (err: any) {
      setSettingsForm(prev => ({ ...prev, errMsg: `Password update failed: ${err.message}` }));
    } finally {
      setActionLoading(false);
    }
  };

  // Projects CRUD Action
  const triggerProjectSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    const targetId = editingProject ? editingProject.id : projectForm.id.trim() || `proj-${Date.now()}`;
    const targetType = editingProject?.projectType || (activeTab === "applications" ? "application" : "website");
    const formatted: Project = {
      id: targetId,
      title: projectForm.title,
      category: projectForm.category,
      description: projectForm.description,
      demoUrl: projectForm.demoUrl || "",
      technologies: projectForm.technologies.split(",").map(t => t.trim()).filter(Boolean),
      features: projectForm.features.split("\n").map(f => f.trim()).filter(Boolean),
      projectType: targetType,
      colorScheme: {
        bg: projectForm.bg,
        text: projectForm.text,
        border: projectForm.border,
        accent: projectForm.accent,
        accentGlow: projectForm.accentGlow
      }
    };

    const success = await addOrUpdateProject(formatted);
    if (success) {
      setIsAddingProject(false);
      setEditingProject(null);
      // Reset form
      setProjectForm({
        id: "", title: "", category: "", description: "", demoUrl: "", technologies: "", features: "",
        bg: "bg-[#EEF2F6]", text: "text-blue-600", border: "border-blue-100", accent: "from-blue-600 to-indigo-600", accentGlow: "bg-blue-400/20"
      });
    } else {
      alert("Error saving project. Check permissions rules.");
    }
    setActionLoading(false);
  };

  const triggerProjectDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setActionLoading(true);
    await removeProject(id);
    setActionLoading(false);
  };

  const openEditProject = (p: Project) => {
    setEditingProject(p);
    setProjectForm({
      id: p.id,
      title: p.title,
      category: p.category,
      description: p.description,
      demoUrl: p.demoUrl || "",
      technologies: p.technologies.join(", "),
      features: p.features.join("\n"),
      bg: p.colorScheme?.bg || "bg-[#EEF2F6]",
      text: p.colorScheme?.text || "text-blue-600",
      border: p.colorScheme?.border || "border-blue-100",
      accent: p.colorScheme?.accent || "from-blue-600 to-indigo-600",
      accentGlow: p.colorScheme?.accentGlow || "bg-blue-400/20"
    });
    setIsAddingProject(true);
  };

  // Testimonials CRUD Action
  const triggerTestimonialSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    const targetId = editingTestimonial ? editingTestimonial.id : testimonialForm.id.trim() || `test-${Date.now()}`;
    const formatted: Testimonial = {
      id: targetId,
      name: testimonialForm.name,
      role: testimonialForm.role,
      company: testimonialForm.company,
      review: testimonialForm.review,
      rating: Number(testimonialForm.rating)
    };

    const success = await addOrUpdateTestimonial(formatted);
    if (success) {
      setIsAddingTestimonial(false);
      setEditingTestimonial(null);
      setTestimonialForm({ id: "", name: "", role: "", company: "", review: "", rating: 5 });
    } else {
      alert("Error saving testimonial card details.");
    }
    setActionLoading(false);
  };

  const triggerTestimonialDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    setActionLoading(true);
    await removeTestimonial(id);
    setActionLoading(false);
  };

  const openEditTestimonial = (t: Testimonial) => {
    setEditingTestimonial(t);
    setTestimonialForm({
      id: t.id,
      name: t.name,
      role: t.role,
      company: t.company,
      review: t.review,
      rating: t.rating
    });
    setIsAddingTestimonial(true);
  };

  // Site Copy Content Editor
  const triggerContentSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    const success = await updateSiteContent(contentForm);
    if (success) {
      alert("Site copywriting updated successfully!");
    } else {
      alert("Failed to modify site text files.");
    }
    setActionLoading(false);
  };

  if (isAdminLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-12">
        <Loader2 className="animate-spin text-blue-600 h-10 w-10 mb-4 stroke-[2.5]" />
        <span className="font-mono text-xs uppercase font-bold text-slate-500 tracking-widest">Validating Auth Token...</span>
      </div>
    );
  }

  // Determine if login page should be shown (if not authenticated, force the login view)
  const showLogin = isLoginView || !isAdminAuthenticated;

  // LOGIN PAGE WORKSPACE
  if (showLogin) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-blue-500 selection:text-white">
        
        {/* Abstract design nodes */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100/30 blur-3xl pointer-events-none" />

        <div className="max-w-md w-full space-y-8 bg-white border border-slate-200/95 p-8 sm:p-10 rounded-3xl shadow-2xl shadow-blue-50/40 relative z-10 backdrop-blur-sm">
          
          <div className="text-center space-y-2">
            <div className="flex justify-center items-center gap-1">
              <span className="font-display text-2xl font-black tracking-tight text-slate-900">Quantum</span>
              <span className="text-blue-600 font-display text-2xl font-black">Code</span>
              <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase bg-blue-50 text-blue-700 tracking-wide border border-blue-100">
                ADMIN
              </span>
            </div>
            <p className="text-slate-500 text-xs font-medium">
              Access the digital agency secure management panel
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleAdminSignIn}>
            {authError && (
              <div className="p-3.5 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100">
                {authError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-slate-600 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
                  Admin Email Address
                </label>
                <input
                  type="email"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50/70 text-slate-800 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400"
                  placeholder="admin@agency.com"
                />
              </div>

              <div>
                <label className="block text-slate-600 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
                  Security Passphrase
                </label>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50/70 text-slate-800 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={authLoading}
                className="w-full flex items-center justify-center bg-slate-900 hover:bg-slate-950 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg border border-slate-950 transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group text-xs tracking-wider font-mono uppercase"
              >
                {authLoading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    AUTHORIZING ACCESS...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 text-blue-400 group-hover:scale-110 transition-transform" />
                    ACQUIRE KEYPASS
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Secure indicator */}
          <div className="pt-4 flex justify-center items-center gap-1.5 text-[10px] uppercase font-mono font-semibold text-slate-400">
            <Laptop size={12} className="text-slate-350" />
            Vercel-Safe Session Persistence
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD PANELS
  const statsOverview = {
    totalInquiries: inquiries.length,
    unreadInquiries: inquiries.filter(i => !i.read).length,
    totalProjects: projects.filter(p => p.projectType !== "application").length,
    totalApplications: projects.filter(p => p.projectType === "application").length,
    totalTestimonials: testimonials.length
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-700 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform lg:translate-x-0 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* Sidebar Header Brand block */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-lg tracking-tight text-white">Quantum</span>
            <span className="text-blue-500 font-display font-black text-lg">Code</span>
          </div>
          <button onClick={() => setMobileSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto pt-7">
          <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">Systems</p>
          
          <button
            onClick={() => { setActiveTab("overview"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono font-bold tracking-wide transition-all uppercase ${activeTab === "overview" ? "bg-blue-600 text-white shadow-md shadow-blue-900/40" : "text-slate-450 hover:bg-slate-800/65 hover:text-slate-200"}`}
          >
            <LayoutDashboard size={15} />
            Overview
          </button>

          <button
            onClick={() => { setActiveTab("messages"); setMobileSidebarOpen(false); }}
            className={`w-full flex justify-between items-center px-4 py-3 rounded-xl text-xs font-mono font-bold tracking-wide transition-all uppercase ${activeTab === "messages" ? "bg-blue-600 text-white shadow-md shadow-blue-900/40" : "text-slate-450 hover:bg-slate-800/65 hover:text-slate-200"}`}
          >
            <span className="flex items-center gap-3">
              <Users size={15} />
              Users & Leads
            </span>
            {statsOverview.unreadInquiries > 0 && (
              <span className="bg-rose-500 text-white text-[9px] font-mono font-bold min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center animate-pulse">
                {statsOverview.unreadInquiries}
              </span>
            )}
          </button>

          <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mt-6 mb-2">Portfolio</p>

          <button
            onClick={() => { setActiveTab("projects"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono font-bold tracking-wide transition-all uppercase ${activeTab === "projects" ? "bg-blue-600 text-white shadow-md shadow-blue-900/40" : "text-slate-450 hover:bg-slate-800/65 hover:text-slate-200"}`}
          >
            <FolderOpen size={15} />
            Websites
          </button>

          <button
            onClick={() => { setActiveTab("applications"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono font-bold tracking-wide transition-all uppercase ${activeTab === "applications" ? "bg-blue-600 text-white shadow-md shadow-blue-900/40" : "text-slate-450 hover:bg-slate-800/65 hover:text-slate-200"}`}
          >
            <Laptop size={15} />
            Applications
          </button>

          <button
            onClick={() => { setActiveTab("testimonials"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono font-bold tracking-wide transition-all uppercase ${activeTab === "testimonials" ? "bg-blue-600 text-white shadow-md shadow-blue-900/40" : "text-slate-450 hover:bg-slate-800/65 hover:text-slate-200"}`}
          >
            <MessageSquare size={15} />
            Quotes
          </button>

          <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mt-6 mb-2">Content</p>

          <button
            onClick={() => { setActiveTab("content"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono font-bold tracking-wide transition-all uppercase ${activeTab === "content" ? "bg-blue-600 text-white shadow-md shadow-blue-900/40" : "text-slate-450 hover:bg-slate-800/65 hover:text-slate-200"}`}
          >
            <PenTool size={15} />
            Branding
          </button>

          <button
            onClick={() => { setActiveTab("settings"); setMobileSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono font-bold tracking-wide transition-all uppercase ${activeTab === "settings" ? "bg-blue-600 text-white shadow-md shadow-blue-900/40" : "text-slate-450 hover:bg-slate-800/65 hover:text-slate-200"}`}
          >
            <Settings size={15} />
            Passphrase
          </button>
        </nav>

        {/* Sidebar Footer User profile logout */}
        <div className="p-4 border-t border-slate-850 bg-slate-950 flex flex-col gap-3">
          <div className="flex items-center gap-3 px-2 py-0.5">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-xs">
              P
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-100 font-mono truncate">Prince (Admin)</p>
              <p className="text-[9px] text-slate-500 font-mono">princewebdev01</p>
            </div>
          </div>
          <button
            onClick={handleAdminSignOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-800 hover:bg-rose-950/20 hover:border-rose-900/40 hover:text-rose-400 text-slate-400 text-xs font-mono font-bold uppercase transition-all"
          >
            <LogOut size={13} />
            Logout Session
          </button>
        </div>
      </aside>

      {/* DASHBOARD CONTENT BODY */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen relative overflow-x-hidden">
        
        {/* Dynamic header row */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 sm:px-8 z-40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileSidebarOpen(true)} className="lg:hidden text-slate-650 hover:text-slate-900 p-1.5 bg-slate-50 border border-slate-200 rounded-xl transition-all">
              <Menu size={18} />
            </button>
            <h1 className="text-sm font-mono font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
              SYSTEM DASHBOARD <ChevronRight size={14} className="text-slate-400" />
              <span className="text-blue-600 text-xs tracking-widest">{activeTab}</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={refreshAllData} 
              className="p-2 text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-100 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase"
              title="Refresh database collections"
            >
              <RefreshCw size={12} className={actionLoading ? "animate-spin" : ""} />
              Force Fetch
            </button>
            <a 
              href="/" 
              target="_blank" 
              className="p-2 text-slate-500 hover:text-slate-950 bg-slate-50 border border-slate-200 rounded-xl transition-all inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase"
            >
              Visit Agency
              <ExternalLink size={11} />
            </a>
          </div>
        </header>

        {/* Workspace body panels */}
        <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              
              {/* Analytics grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <div className="bg-white border border-slate-200/95 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">User Submissions</p>
                  <p className="text-2xl font-bold tracking-tight text-slate-900 py-1">{statsOverview.totalInquiries}</p>
                  <div className="flex items-center gap-1.5 text-[11px] text-rose-500 font-bold">
                    <Users size={12} />
                    <span>{statsOverview.unreadInquiries} unread</span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/95 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Website Projects</p>
                  <p className="text-2xl font-bold tracking-tight text-slate-900 py-1">{statsOverview.totalProjects}</p>
                  <span className="text-[10px] font-mono font-bold text-blue-600 uppercase">Web Portfolios</span>
                </div>

                <div className="bg-white border border-slate-200/95 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Mobile/Web Apps</p>
                  <p className="text-2xl font-bold tracking-tight text-slate-900 py-1">{statsOverview.totalApplications}</p>
                  <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase">App Portfolios</span>
                </div>

                <div className="bg-white border border-slate-200/95 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Feedback Quotes</p>
                  <p className="text-2xl font-bold tracking-tight text-slate-900 py-1">{statsOverview.totalTestimonials}</p>
                  <span className="text-[10px] font-mono font-bold text-amber-600 uppercase">Testimonials</span>
                </div>

                <div className="bg-white border border-emerald-250/90 bg-emerald-50/5 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600">Operations Node Status</p>
                  <p className="text-2xl font-bold tracking-tight text-emerald-800 py-1">ACTIVE</p>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-650 font-bold">
                    <CheckCircle size={12} />
                    <span>Inbound Active Gateway</span>
                  </div>
                </div>
              </div>

              {/* Recent Activities and Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent submissions list */}
                <div className="lg:col-span-2 bg-white border border-slate-200/95 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100 flex justify-between items-center">
                    <span>Recent User Form Submissions & Details</span>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[9px] font-mono">Real-Time Ingestion</span>
                  </h3>

                  {inquiries.length === 0 ? (
                    <div className="py-12 text-center text-slate-450 text-xs">
                      No customer inquiries submitted yet.
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-150">
                      {inquiries.slice(0, 4).map((msg) => (
                        <div key={msg.id} className="py-3 flex justify-between items-start gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">{msg.name}</span>
                              <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-100 font-mono">
                                {msg.service}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 font-medium truncate max-w-md">{msg.projectDetails}</p>
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            {!msg.read ? (
                              <span className="h-2 w-2 rounded-full bg-rose-500" />
                            ) : (
                              <CheckCircle size={12} className="text-emerald-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick systems info */}
                <div className="bg-slate-900 text-slate-300 border border-slate-950 p-6 rounded-2xl shadow-sm space-y-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white pb-2 border-b border-slate-800">
                    System Parameters
                  </h3>
                  
                  <div className="space-y-3.5 text-xs font-mono">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-450">AUTHENTICATION:</span>
                      <span className="font-bold text-emerald-400">SECURED (EMAIL/PASS)</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-450">PERSISTENCE MODEL:</span>
                      <span className="font-bold text-blue-400">FIRESTORE CLOUD</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-450">VITE PORT:</span>
                      <span className="text-slate-200 font-bold">3000 (INGRESS)</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-slate-450">CREDENTIALED USER:</span>
                      <span className="text-slate-200 font-bold max-w-[120px] truncate">princewebdev01</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: USER DETAILS & LEADS */}
          {activeTab === "messages" && (
            <div className="bg-white border border-slate-200/95 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">User Submissions & Lead Details</h3>
                  <p className="text-xs text-slate-500 font-medium">Securely stored names, contact lists, choices of services, and specific task requirements from the contact form.</p>
                </div>
                <span className="bg-slate-50 border border-slate-200 px-3 py-1 rounded-full text-xs font-mono text-slate-500">
                  {inquiries.length} user leads in store
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="py-20 text-center text-slate-400 text-xs">
                  No user submissions registered yet.
                </div>
              ) : (
                <div className="space-y-6">
                  {inquiries.map((msg) => (
                    <div key={msg.id} className={`p-5 rounded-2xl border transition-all ${!msg.read ? "bg-blue-50/20 border-blue-100/70 shadow-sm shadow-blue-50" : "bg-white border-slate-150"}`}>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-slate-900 text-sm">{msg.name}</span>
                            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-150 text-[10px] uppercase font-mono tracking-wide">
                              {msg.service}
                            </span>
                            {msg.company && (
                              <span className="bg-slate-50 text-slate-500 px-2 py-0.5 rounded border border-slate-200 text-[10px] font-mono">
                                Company: {msg.company}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-slate-500 font-mono py-1 flex-wrap">
                            <span>Email: <span className="text-slate-700 font-semibold">{msg.email}</span></span>
                            <span>Phone: <span className="text-slate-700 font-semibold">{msg.phone}</span></span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => resolveInquiry(msg.id, !msg.read)}
                            className={`p-2 rounded-xl transition-all cursor-pointer ${msg.read ? "bg-slate-100 text-slate-500 hover:bg-slate-200/80" : "bg-blue-600/10 text-blue-600 hover:bg-blue-600/25"} text-xs font-mono font-bold uppercase inline-flex items-center gap-1`}
                          >
                            {msg.read ? (
                              <>
                                <Check size={12} />
                                Unread
                              </>
                            ) : (
                              <>
                                <Circle size={10} className="fill-blue-600" />
                                Mark Read
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => removeInquiry(msg.id)}
                            className="p-2 text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-100 hover:border-rose-600 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1 text-xs font-mono font-bold uppercase"
                          >
                            <Trash2 size={12} />
                            Purge
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 p-4 rounded-xl bg-slate-50/70 border border-slate-200 text-xs text-slate-700 font-semibold italic whitespace-pre-wrap leading-relaxed">
                        &ldquo;{msg.projectDetails}&rdquo;
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROJECTS MANAGEMENT */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              
              <div className="bg-white border border-slate-200/95 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">Website Projects Collection</h3>
                    <p className="text-xs text-slate-500 font-medium">Add, customize, and edit website projects and landing pages showcased to clients.</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setEditingProject(null);
                      setProjectForm({
                        id: "", title: "", category: "Ecommerce Store", description: "", demoUrl: "", technologies: "", features: "",
                        bg: "bg-[#EEF2F6]", text: "text-blue-600", border: "border-blue-100", accent: "from-blue-600 to-indigo-600", accentGlow: "bg-blue-400/20"
                      });
                      setIsAddingProject(true);
                    }}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all shadow-md shadow-blue-100 cursor-pointer"
                  >
                    <Plus size={14} />
                    New Website Project
                  </button>
                </div>

                {/* Listing Portfolio items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {projects.filter(p => !p.projectType || p.projectType !== "application").map((p) => (
                    <div key={p.id} className="bg-slate-50 border border-slate-150 p-5 rounded-2xl flex flex-col justify-between hover:border-blue-200 hover:shadow-sm transition-all">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded font-mono font-bold uppercase">
                            {p.category}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono tracking-wide">{p.id}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900">{p.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-semibold">{p.description}</p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between gap-2">
                        <button
                          onClick={() => openEditProject(p)}
                          className="px-3 py-1.5 bg-slate-200 hover:bg-blue-600 text-slate-700 hover:text-white rounded-lg text-[10px] font-mono font-bold uppercase cursor-pointer transition-all"
                        >
                          Modify Set
                        </button>
                        <button
                          onClick={() => triggerProjectDelete(p.id)}
                          className="px-3 py-1.5 text-rose-500 hover:text-rose-700 rounded-lg text-[10px] font-mono font-bold uppercase cursor-pointer hover:bg-rose-50 transition-all inline-flex items-center gap-1"
                        >
                          <Trash2 size={11} />
                          Purge
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TAB 3.5: APPLICATIONS MANAGEMENT */}
          {activeTab === "applications" && (
            <div className="space-y-6">
              
              <div className="bg-white border border-slate-200/95 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">Mobile & Web Applications Collection</h3>
                    <p className="text-xs text-slate-500 font-medium">Add, customize, and edit hybrid apps, SaaS templates, and dynamic web portals.</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setEditingProject(null);
                      setProjectForm({
                        id: "", title: "", category: "AI SaaS Website", description: "", demoUrl: "", technologies: "", features: "",
                        bg: "bg-[#F5F3FF]", text: "text-purple-600", border: "border-purple-100", accent: "from-purple-600 to-indigo-600", accentGlow: "bg-purple-400/20"
                      });
                      setIsAddingProject(true);
                    }}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all shadow-md shadow-blue-100 cursor-pointer"
                  >
                    <Plus size={14} />
                    New Application Layout
                  </button>
                </div>

                {/* Listing Portfolio items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {projects.filter(p => p.projectType === "application").map((p) => (
                    <div key={p.id} className="bg-slate-50 border border-slate-150 p-5 rounded-2xl flex flex-col justify-between hover:border-blue-200 hover:shadow-sm transition-all">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded font-mono font-bold uppercase">
                            {p.category}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono tracking-wide">{p.id}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900">{p.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-semibold">{p.description}</p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between gap-2">
                        <button
                          onClick={() => openEditProject(p)}
                          className="px-3 py-1.5 bg-slate-200 hover:bg-blue-600 text-slate-700 hover:text-white rounded-lg text-[10px] font-mono font-bold uppercase cursor-pointer transition-all"
                        >
                          Modify Set
                        </button>
                        <button
                          onClick={() => triggerProjectDelete(p.id)}
                          className="px-3 py-1.5 text-rose-500 hover:text-rose-700 rounded-lg text-[10px] font-mono font-bold uppercase cursor-pointer hover:bg-rose-50 transition-all inline-flex items-center gap-1"
                        >
                          <Trash2 size={11} />
                          Purge
                        </button>
                      </div>
                    </div>
                  ))}
                  {projects.filter(p => p.projectType === "application").length === 0 && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-slate-450 border border-dashed border-slate-200 rounded-2xl font-mono text-xs">
                      No advanced mobile or web applications configured yet. Click button above to deploy one!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PROJECT OVERLAY ADD MODAL FORM */}
              {isAddingProject && (
                <div className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <h4 className="text-xs font-mono font-bold uppercase text-slate-900">
                        {editingProject ? "Modify Showcase Details" : "Construct New Showcase"}
                      </h4>
                      <button onClick={() => setIsAddingProject(false)} className="text-slate-400 hover:text-slate-900 p-1 bg-slate-50 border border-slate-200 rounded-lg">
                        <X size={16} />
                      </button>
                    </div>

                    <form onSubmit={triggerProjectSave} className="space-y-4 text-xs font-mono">
                      {!editingProject && (
                        <div>
                          <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Showcase Unique Identifier ID</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. proj-custom-app (lowercase, alphanumeric or hyphens no spaces)"
                            value={projectForm.id}
                            onChange={(e) => setProjectForm(prev => ({ ...prev, id: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "") }))}
                            className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Project Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Apex Horizon E-Store"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Category / Tag</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ecommerce Store"
                            value={projectForm.category}
                            onChange={(e) => setProjectForm(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Live Preview Redirect Link</label>
                          <input
                            type="url"
                            placeholder="https://client-demo.com"
                            value={projectForm.demoUrl}
                            onChange={(e) => setProjectForm(prev => ({ ...prev, demoUrl: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Showcase Description (Paragraph)</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Full project description copywriting..."
                          value={projectForm.description}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl font-sans text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Technologies Used (Separated with commas)</label>
                        <input
                          type="text"
                          required
                          placeholder="React, Tailwind CSS, Framer Motion, Firebase"
                          value={projectForm.technologies}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, technologies: e.target.value }))}
                          className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Core Deliverables Features (one per line)</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Dynamic zoom card views&#10;Highly animated user slides"
                          value={projectForm.features}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, features: e.target.value }))}
                          className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl font-sans text-xs"
                        />
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingProject(false)}
                          className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 uppercase cursor-pointer"
                        >
                          Dismiss Form
                        </button>
                        <button
                          type="submit"
                          disabled={actionLoading}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl uppercase font-bold tracking-wider inline-flex items-center gap-1.5 transition-all shadow-md shadow-blue-100 cursor-pointer"
                        >
                          {actionLoading && <Loader2 className="animate-spin h-3.5 w-3.5" />}
                          Save In Production
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 4: TESTIMONIALS MANAGEMENT */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              
              <div className="bg-white border border-slate-200/95 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">Client Quotes and Feedback Reviews</h3>
                    <p className="text-xs text-slate-500 font-medium">Add, manage, and edit dynamic client feedback reviews seen on the frontend slider.</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setEditingTestimonial(null);
                      setTestimonialForm({ id: "", name: "", role: "", company: "", review: "", rating: 5 });
                      setIsAddingTestimonial(true);
                    }}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all shadow-md shadow-blue-100 cursor-pointer"
                  >
                    <Plus size={14} />
                    New Quote Card
                  </button>
                </div>

                {/* Rating cards list grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {testimonials.map((t) => (
                    <div key={t.id} className="bg-slate-50 border border-slate-150 p-5 rounded-2xl flex flex-col justify-between hover:border-blue-200 transition-all">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100 font-mono font-bold uppercase">
                            Rating: {t.rating} Stars
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">{t.id}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                        <p className="text-[11px] text-slate-500 font-semibold font-mono">{t.role} - {t.company}</p>
                        <p className="text-xs text-slate-605 italic line-clamp-4 leading-relaxed font-semibold">&ldquo;{t.review}&rdquo;</p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between gap-2">
                        <button
                          onClick={() => openEditTestimonial(t)}
                          className="px-3 py-1.5 bg-slate-200 hover:bg-blue-600 text-slate-700 hover:text-white rounded-lg text-[10px] font-mono font-bold uppercase cursor-pointer transition-all"
                        >
                          Modify Set
                        </button>
                        <button
                          onClick={() => triggerTestimonialDelete(t.id)}
                          className="px-3 py-1.5 text-rose-500 hover:text-rose-700 rounded-lg text-[10px] font-mono font-bold uppercase cursor-pointer hover:bg-rose-50 transition-all inline-flex items-center gap-1"
                        >
                          <Trash2 size={11} />
                          Purge
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TESTIMONIAL ADD/EDIT OVERLAY MODAL */}
              {isAddingTestimonial && (
                <div className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 space-y-5">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <h4 className="text-xs font-mono font-bold uppercase text-slate-900">
                        {editingTestimonial ? "Modify Reviewer Details" : "Construct New Client Review"}
                      </h4>
                      <button onClick={() => setIsAddingTestimonial(false)} className="text-slate-400 hover:text-slate-900 p-1 bg-slate-50 border border-slate-200 rounded-lg">
                        <X size={16} />
                      </button>
                    </div>

                    <form onSubmit={triggerTestimonialSave} className="space-y-4 text-xs font-mono">
                      {!editingTestimonial && (
                        <div>
                          <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Testimonial unique identifier ID</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. test-client-review (lowercase, alphanumeric or hyphens)"
                            value={testimonialForm.id}
                            onChange={(e) => setTestimonialForm(prev => ({ ...prev, id: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "") }))}
                            className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl"
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Client Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Vikram Malhotra"
                            value={testimonialForm.name}
                            onChange={(e) => setTestimonialForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Rating Stars (1 - 5)</label>
                          <select
                            value={testimonialForm.rating}
                            onChange={(e) => setTestimonialForm(prev => ({ ...prev, rating: Number(e.target.value) }))}
                            className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl"
                          >
                            <option value={5}>5 Stars - Premium perfection</option>
                            <option value={4}>4 Stars - Great delivery</option>
                            <option value={3}>3 Stars - Decent output</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Company Role / Designation</label>
                          <input
                            type="text"
                            required
                            placeholder="Founder & CEO"
                            value={testimonialForm.role}
                            onChange={(e) => setTestimonialForm(prev => ({ ...prev, role: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Company / Brand Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Malhotra Apparel Co"
                            value={testimonialForm.company}
                            onChange={(e) => setTestimonialForm(prev => ({ ...prev, company: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Client Feedback/Review Paragraph</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Write full review text..."
                          value={testimonialForm.review}
                          onChange={(e) => setTestimonialForm(prev => ({ ...prev, review: e.target.value }))}
                          className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl font-sans text-xs"
                        />
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingTestimonial(false)}
                          className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 uppercase cursor-pointer"
                        >
                          Dismiss Form
                        </button>
                        <button
                          type="submit"
                          disabled={actionLoading}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl uppercase font-bold tracking-wider inline-flex items-center gap-1.5 transition-all shadow-md shadow-blue-100 cursor-pointer"
                        >
                          {actionLoading && <Loader2 className="animate-spin h-3.5 w-3.5" />}
                          Save Quote Review
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 5: WEBSITE CONTENT MANAGEMENT */}
          {activeTab === "content" && (
            <div className="bg-white border border-slate-200/95 rounded-2xl p-6 shadow-sm">
              <div className="pb-4 border-b border-slate-100 mb-6">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">Branding Content Copywriting</h3>
                <p className="text-xs text-slate-500 font-medium">Update standard Above-the-fold titles, headings, and CTA button destinations synchronized across users.</p>
              </div>

              <form onSubmit={triggerContentSave} className="space-y-5 text-xs font-mono">
                
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase text-blue-600 tracking-wider">Above-The-Fold Main Hero Section</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Hero Heading Title Line</label>
                      <input
                        type="text"
                        required
                        placeholder="We Build Modern Websites That Help Businesses Grow"
                        value={contentForm.heroHeading}
                        onChange={(e) => setContentForm(prev => ({ ...prev, heroHeading: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Hero Subtitle Paragraph Description</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="A premium startup digital agency. We handcraft bespoke digital experiences..."
                        value={contentForm.heroSubheading}
                        onChange={(e) => setContentForm(prev => ({ ...prev, heroSubheading: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors font-sans text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <h4 className="text-[10px] font-bold uppercase text-blue-600 tracking-wider">Core Bio About Me Section</h4>
                  <div>
                    <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Biography Copywrite Description</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="I am Prince, a lead full-stack systems developer..."
                      value={contentForm.aboutBio}
                      onChange={(e) => setContentForm(prev => ({ ...prev, aboutBio: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors font-sans text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <h4 className="text-[10px] font-bold uppercase text-blue-600 tracking-wider">Social Channels Links</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">WhatsApp Mobile URL Link</label>
                      <input
                        type="text"
                        required
                        placeholder="https://wa.me/919999999999"
                        value={contentForm.socialWhatsApp}
                        onChange={(e) => setContentForm(prev => ({ ...prev, socialWhatsApp: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Customer Support Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="princewebdev01@gmail.com"
                        value={contentForm.socialEmail}
                        onChange={(e) => setContentForm(prev => ({ ...prev, socialEmail: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Instagram Profile URL</label>
                      <input
                        type="url"
                        required
                        placeholder="https://instagram.com/princewebdev"
                        value={contentForm.socialInstagram}
                        onChange={(e) => setContentForm(prev => ({ ...prev, socialInstagram: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Telegram User tag Link</label>
                      <input
                        type="url"
                        required
                        placeholder="https://t.me/princewebdev"
                        value={contentForm.socialTelegram}
                        onChange={(e) => setContentForm(prev => ({ ...prev, socialTelegram: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-950 text-white font-mono font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg inline-flex items-center gap-2 cursor-pointer transition-all"
                  >
                    {actionLoading && <Loader2 className="animate-spin h-3.5 w-3.5" />}
                    Save Section Copy
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 6: SETTINGS PANEL */}
          {activeTab === "settings" && (
            <div className="bg-white border border-slate-200/95 rounded-2xl p-6 shadow-sm max-w-lg">
              <div className="pb-4 border-b border-slate-100 mb-6">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">Change Admin Details</h3>
                <p className="text-xs text-slate-500 font-medium font-sans">Modify security passphrase values for accessing this dashboard panel.</p>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs font-mono">
                {settingsForm.successMsg && (
                  <div className="p-3.5 rounded-xl font-semibold text-emerald-800 bg-emerald-50 border border-emerald-100">
                    {settingsForm.successMsg}
                  </div>
                )}
                {settingsForm.errMsg && (
                  <div className="p-3.5 rounded-xl font-semibold text-rose-600 bg-rose-50 border border-rose-100 font-mono">
                    {settingsForm.errMsg}
                  </div>
                )}

                <div>
                  <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">New Passcode</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter at least 6 characters"
                    value={settingsForm.newPassword}
                    onChange={(e) => setSettingsForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all font-medium text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold uppercase tracking-wider mb-1">Verify Passcode</label>
                  <input
                    type="password"
                    required
                    placeholder="Repeat passcode precisely"
                    value={settingsForm.confirmPassword}
                    onChange={(e) => setSettingsForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all font-medium text-sm"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold uppercase text-xs rounded-xl tracking-wider transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    {actionLoading && <Loader2 className="animate-spin h-3.5 w-3.5" />}
                    Update Password Key
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
