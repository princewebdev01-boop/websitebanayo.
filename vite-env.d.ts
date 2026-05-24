export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  category: string;
  iconName: string; // Stored as a string so we can resolve dynamically
  priceStart?: string;
  deliveryTime?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  features: string[];
  demoUrl?: string;
  projectType?: "website" | "application";
  colorScheme?: {
    bg: string;
    text: string;
    border: string;
    accent: string;
    accentGlow: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
}

export interface ProcessStep {
  step: string; // e.g. "01"
  title: string;
  description: string;
  duration: string;
  features: string[];
}

export interface StatItem {
  id: string;
  count: number;
  label: string;
  suffix: string;
  iconName: string;
}

export interface TrustIndicator {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface InquiryInput {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  projectDetails: string;
}
