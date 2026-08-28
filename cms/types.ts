// cms/types.ts
// Strongly-typed data models for AURATECH Studio CMS

export interface MetricItem {
  value: string;
  label: string;
}

export interface HomepageSettings {
  badgeText: string;
  heroTitlePrefix: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  metrics: MetricItem[];
  featuredProjectId?: number;
  featuredProjectIds?: number[];
}

export interface Project {
  id: number;
  title: string;
  category: "Residential" | "Commercial" | "Hospitality" | "Sustainable" | string;
  location: string;
  status: "Published" | "Draft" | string;
  stats?: string;
  description: string;
  image: string;
  hoverImage?: string;
  tags?: string[];
  year?: string;
  area?: string;
  timeline?: string;
  highlights?: string[];
  tag?: string;
}

export interface Service {
  id: number;
  title: string;
  icon: string;
  description: string;
  deliverables?: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  author: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  status: "Published" | "Draft" | string;
}

export interface Testimonial {
  id: number;
  author: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
  status: "Published" | "Draft" | string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: string;
}

export interface CompanyInfo {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postal: string;
  instagram: string;
  linkedin: string;
  facebook: string;
}

export interface CMSStore {
  homepage: HomepageSettings;
  projects: Project[];
  services: Service[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  team: TeamMember[];
  company?: CompanyInfo;
}

export interface CMSResponse<T> {
  data: Array<{
    id: number;
    attributes: T;
  }>;
}
