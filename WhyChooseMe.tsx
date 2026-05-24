import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { 
  auth, 
  getProjects, 
  saveProject, 
  deleteProject, 
  getTestimonials, 
  saveTestimonial, 
  deleteTestimonial, 
  getSiteContent, 
  saveSiteContent,
  getInquiries,
  markInquiryAsRead,
  deleteInquiry,
  db
} from "../firebase";
import { PROJECTS as STATIC_PROJECTS, TESTIMONIALS as STATIC_TESTIMONIALS, SERVICES as STATIC_SERVICES } from "../data";
import { Project, Testimonial, Service } from "../types";

// Admin content schema
export interface AdminSiteContent {
  heroHeading: string;
  heroSubheading: string;
  aboutBio: string;
  socialWhatsApp: string;
  socialEmail: string;
  socialInstagram: string;
  socialTelegram: string;
}

const DEFAULT_SITE_CONTENT: AdminSiteContent = {
  heroHeading: "We Build Modern Websites That Help Businesses Grow",
  heroSubheading: "A premium startup digital agency. We handcraft bespoke digital experiences, conversion-ready ecommerce layouts, and highly interactive software interfaces.",
  aboutBio: "I am Prince, a lead full-stack systems developer and designer with over 6 years of core experience constructing pixel-perfect web products. Along with artificial intelligence integration expertise, our work builds deep, verified user confidence and massive customer conversions.",
  socialWhatsApp: "https://wa.me/9155328308", // target or default
  socialEmail: "princewebdev01@gmail.com",
  socialInstagram: "https://instagram.com/princewebdev",
  socialTelegram: "https://t.me/princewebdev"
};

interface DataContextType {
  projects: Project[];
  testimonials: Testimonial[];
  siteContent: AdminSiteContent;
  inquiries: any[];
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isAdminLoading: boolean;
  dataLoading: boolean;
  refreshAllData: () => Promise<void>;
  addOrUpdateProject: (p: Project) => Promise<boolean>;
  removeProject: (id: string) => Promise<boolean>;
  addOrUpdateTestimonial: (t: Testimonial) => Promise<boolean>;
  removeTestimonial: (id: string) => Promise<boolean>;
  updateSiteContent: (c: AdminSiteContent) => Promise<boolean>;
  resolveInquiry: (id: string, read: boolean) => Promise<boolean>;
  removeInquiry: (id: string) => Promise<boolean>;
  triggerBackgroundInquiriesReload: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(STATIC_TESTIMONIALS);
  const [siteContent, setSiteContent] = useState<AdminSiteContent>(DEFAULT_SITE_CONTENT);
  const [inquiries, setInquiries] = useState<any[]>([]);
  
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_fallback_session") === "true";
    }
    return false;
  });
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);

  // Monitor Auth state
  useEffect(() => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "princewebdev01@gmail.com";
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email === adminEmail) {
        setIsAdminAuthenticated(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("admin_fallback_session", "true");
        }
        // Load secure inquiries
        try {
          const list = await getInquiries();
          setInquiries(list);
        } catch (e) {
          console.error("Error loading inquiries for authenticated admin:", e);
        }
      } else {
        const fallback = typeof window !== "undefined" && localStorage.getItem("admin_fallback_session") === "true";
        if (!fallback) {
          setIsAdminAuthenticated(false);
          setInquiries([]);
        } else {
          // If fallback session is true, try loader anyways
          try {
            const list = await getInquiries();
            setInquiries(list);
          } catch (e) {
            console.warn("Failed to fetch inquiries in fallback mode:", e);
          }
        }
      }
      setIsAdminLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshAllData = async () => {
    setDataLoading(true);
    try {
      // 1. Projects
      try {
        const dbProjects = await getProjects();
        if (dbProjects && dbProjects.length > 0) {
          setProjects(dbProjects as Project[]);
        } else {
          setProjects(STATIC_PROJECTS);
        }
      } catch (err) {
        console.warn("[DataContext] Failed to fetch DB projects, falling back to static preset:", err);
        setProjects(STATIC_PROJECTS);
      }

      // 2. Testimonials
      try {
        const dbTestimonials = await getTestimonials();
        if (dbTestimonials && dbTestimonials.length > 0) {
          setTestimonials(dbTestimonials as Testimonial[]);
        } else {
          setTestimonials(STATIC_TESTIMONIALS);
        }
      } catch (err) {
        console.warn("[DataContext] Failed to fetch DB testimonials, falling back to static preset:", err);
        setTestimonials(STATIC_TESTIMONIALS);
      }

      // 3. Site content
      try {
        const dbContent = await getSiteContent("homepage");
        if (dbContent) {
          setSiteContent({
            heroHeading: dbContent.heroHeading || DEFAULT_SITE_CONTENT.heroHeading,
            heroSubheading: dbContent.heroSubheading || DEFAULT_SITE_CONTENT.heroSubheading,
            aboutBio: dbContent.aboutBio || DEFAULT_SITE_CONTENT.aboutBio,
            socialWhatsApp: dbContent.socialWhatsApp || DEFAULT_SITE_CONTENT.socialWhatsApp,
            socialEmail: dbContent.socialEmail || DEFAULT_SITE_CONTENT.socialEmail,
            socialInstagram: dbContent.socialInstagram || DEFAULT_SITE_CONTENT.socialInstagram,
            socialTelegram: dbContent.socialTelegram || DEFAULT_SITE_CONTENT.socialTelegram
          });
        } else {
          setSiteContent(DEFAULT_SITE_CONTENT);
        }
      } catch (err) {
        console.warn("[DataContext] Failed to fetch homepage siteContent, falling back to default preset:", err);
        setSiteContent(DEFAULT_SITE_CONTENT);
      }

      // 4. Inquiries if logged in
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "princewebdev01@gmail.com";
      if (auth.currentUser && auth.currentUser.email === adminEmail) {
        try {
          const list = await getInquiries();
          setInquiries(list);
        } catch (err) {
          console.warn("[DataContext] Failed to load authenticated inquiries:", err);
        }
      }
    } catch (e) {
      console.error("[DataContext] Unexpected error during global data synchronization:", e);
    } finally {
      setDataLoading(false);
    }
  };

  // Initial single trigger
  useEffect(() => {
    refreshAllData();
  }, [isAdminAuthenticated]);

  const triggerBackgroundInquiriesReload = async () => {
    if (isAdminAuthenticated) {
      const list = await getInquiries();
      setInquiries(list);
    }
  };

  /**
   * ADMIN CRUD OPERATIONS
   */
  const addOrUpdateProject = async (p: Project): Promise<boolean> => {
    try {
      await saveProject(p);
      await refreshAllData();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const removeProject = async (id: string): Promise<boolean> => {
    try {
      await deleteProject(id);
      await refreshAllData();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const addOrUpdateTestimonial = async (t: Testimonial): Promise<boolean> => {
    try {
      await saveTestimonial(t);
      await refreshAllData();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const removeTestimonial = async (id: string): Promise<boolean> => {
    try {
      await deleteTestimonial(id);
      await refreshAllData();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const updateSiteContent = async (c: AdminSiteContent): Promise<boolean> => {
    try {
      await saveSiteContent("homepage", c);
      await refreshAllData();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const resolveInquiry = async (id: string, read: boolean): Promise<boolean> => {
    try {
      await markInquiryAsRead(id, read);
      await triggerBackgroundInquiriesReload();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const removeInquiry = async (id: string): Promise<boolean> => {
    try {
      await deleteInquiry(id);
      await triggerBackgroundInquiriesReload();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return (
    <DataContext.Provider value={{
      projects,
      testimonials,
      siteContent,
      inquiries,
      isAdminAuthenticated,
      setIsAdminAuthenticated,
      isAdminLoading,
      dataLoading,
      refreshAllData,
      addOrUpdateProject,
      removeProject,
      addOrUpdateTestimonial,
      removeTestimonial,
      updateSiteContent,
      resolveInquiry,
      removeInquiry,
      triggerBackgroundInquiriesReload
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used inside a DataProvider");
  }
  return context;
}
