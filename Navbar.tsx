import React from "react";
import { 
  Zap, 
  Laptop, 
  Search, 
  Sliders, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  ShoppingCart, 
  GraduationCap, 
  User, 
  Target, 
  Layout, 
  RefreshCw, 
  CreditCard, 
  FolderOpen, 
  Users, 
  Globe, 
  Award,
  Phone,
  Mail,
  Instagram,
  Send,
  MessageSquare
} from "lucide-react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function Icon({ name, size = 20, className = "" }: IconProps) {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Zap,
    Laptop,
    Search,
    Sliders,
    ShieldCheck,
    Cpu,
    Sparkles,
    ShoppingCart,
    GraduationCap,
    User,
    Target,
    Layout,
    RefreshCw,
    CreditCard,
    FolderOpen,
    Users,
    Globe,
    Award,
    Phone,
    Mail,
    Instagram,
    Send,
    MessageSquare
  };

  const Component = iconMap[name] || Cpu; // Fallback to Cpu if icon not found
  return <Component size={size} className={className} />;
}
