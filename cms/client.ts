// cms/client.ts
// Universal typed client for Strapi CMS and local persistent store.

import { CMS_BASE_URL, CMS_TOKEN } from "./config";
import type {
  CMSStore,
  CMSResponse,
  HomepageSettings,
  Project,
  Service,
  BlogPost,
  Testimonial,
  TeamMember,
} from "./types";
import fs from "fs";
import path from "path";

// Function to read local persistent store on the server
function getLocalStore(): CMSStore | null {
  try {
    const dataPath = path.join(process.cwd(), "cms", "data", "store.json");
    if (fs.existsSync(dataPath)) {
      const raw = fs.readFileSync(dataPath, "utf-8");
      return JSON.parse(raw) as CMSStore;
    }
  } catch {
    // fallback if running in client environment
  }
  return null;
}

/**
 * Generic GET request with fallback to local persistent store.
 */
export async function fetchFromCMS<T extends Record<string, unknown>>(
  endpoint: string,
  storeKey: keyof CMSStore,
  formatFn?: (item: unknown) => { id: number; attributes: T }
): Promise<CMSResponse<T>> {
  // If Strapi is active and configured
  if (CMS_TOKEN && CMS_TOKEN !== "REPLACE_WITH_STRAPI_API_TOKEN") {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);
      const url = `${CMS_BASE_URL}${endpoint}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${CMS_TOKEN}` },
        signal: controller.signal,
        cache: "no-store",
      });

      clearTimeout(timeoutId);
      if (response.ok) {
        const json = await response.json();
        if (json && json.data && json.data.length > 0) {
          return json as CMSResponse<T>;
        }
      }
    } catch {
      // fallback to store
    }
  }

  // Read from persistent local JSON store
  const store = getLocalStore();
  if (store && storeKey && store[storeKey]) {
    const rawItems = store[storeKey] as unknown[];
    if (formatFn) {
      return { data: rawItems.map(formatFn) };
    }
    return {
      data: rawItems.map((item) => {
        const typedItem = item as { id: number };
        return {
          id: typedItem.id,
          attributes: item as T,
        };
      }),
    };
  }

  return { data: [] };
}

/** Fetch homepage dynamic settings */
export async function getHomepageSettings(): Promise<HomepageSettings> {
  const store = getLocalStore();
  return (
    store?.homepage || {
      badgeText: "World Architecture Award Winner 2026",
      heroTitlePrefix: "Transforming Spaces into",
      heroTitleAccent: "Timeless Masterpieces",
      heroSubtitle:
        "We combine structural architectural precision, organic materiality, and circadian ambient illumination to craft bespoke physical sanctuaries.",
      ctaPrimaryText: "Explore Portfolio",
      ctaSecondaryText: "Capabilities & Process",
      metrics: [
        { value: "140+", label: "Landmarks Built" },
        { value: "18", label: "Design Awards" },
        { value: "99.4%", label: "Satisfaction" },
        { value: "12 yrs", label: "Studio Excellence" },
      ],
      featuredProjectId: 1,
    }
  );
}

/** Fetch all projects */
export async function getProjects(): Promise<CMSResponse<Project>> {
  return fetchFromCMS<Project>("/api/projects?populate=*", "projects");
}

/** Fetch all services */
export async function getServices(): Promise<CMSResponse<Service>> {
  return fetchFromCMS<Service>("/api/services?populate=*", "services");
}

/** Fetch all blog posts */
export async function getBlogPosts(): Promise<CMSResponse<BlogPost>> {
  return fetchFromCMS<BlogPost>("/api/blog-posts?populate=*", "blogPosts");
}

/** Fetch all testimonials */
export async function getTestimonials(): Promise<CMSResponse<Testimonial>> {
  return fetchFromCMS<Testimonial>("/api/testimonials?populate=*", "testimonials");
}

/** Fetch all team members */
export async function getTeamMembers(): Promise<CMSResponse<TeamMember>> {
  return fetchFromCMS<TeamMember>("/api/team-members?populate=*", "team");
}
