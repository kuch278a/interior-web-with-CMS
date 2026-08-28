"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Navbar from "../../components/ui/Navbar";
import Link from "next/link";
import Image from "next/image";
import type {
  Project,
  BlogPost,
  Testimonial,
  TeamMember,
  CompanyInfo,
  HomepageSettings,
  MetricItem,
  CMSStore,
} from "../../../cms/types";
import defaultStore from "../../../cms/data/store.json";

function subscribeAuth(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getAuthSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("auratech_cms_auth") === "true";
}

function getUserSnapshot(): string {
  if (typeof window === "undefined") return "admin@auratech.design";
  return localStorage.getItem("auratech_cms_user") || "admin@auratech.design";
}

function getEmptyAuthSnapshot(): boolean {
  return false;
}

function getDefaultUserSnapshot(): string {
  return "admin@auratech.design";
}

export default function CMSAdminPage() {
  const isAuthenticated = useSyncExternalStore(subscribeAuth, getAuthSnapshot, getEmptyAuthSnapshot);
  const userEmail = useSyncExternalStore(subscribeAuth, getUserSnapshot, getDefaultUserSnapshot);

  const [activeTab, setActiveTab] = useState("homepage");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Homepage Settings State
  const [homepage, setHomepage] = useState<HomepageSettings>(
    (defaultStore.homepage as HomepageSettings) || {
      badgeText: "World Architecture Festival 2026 Winner",
      heroTitlePrefix: "Crafting Timeless",
      heroTitleAccent: "Architectural Sanctuaries",
      heroSubtitle:
        "We merge brutalist monumentality, organic materiality, and bespoke interior precision to create transcendent spatial landmarks worldwide.",
      ctaPrimaryText: "Explore Landmark Portfolio",
      ctaSecondaryText: "Studio Philosophy & Pedigree",
      metrics: [
        { value: "$2.4B+", label: "Commission Portfolio" },
        { value: "18", label: "Design Awards" },
        { value: "99.4%", label: "Satisfaction" },
        { value: "12 yrs", label: "Studio Excellence" },
      ],
      featuredProjectId: 1,
      featuredProjectIds: [1, 2, 3],
    }
  );

  const [projects, setProjects] = useState<Project[]>((defaultStore.projects as Project[]) || []);
  const [blogs, setBlogs] = useState<BlogPost[]>((defaultStore.blogPosts as BlogPost[]) || []);
  const [testimonials, setTestimonials] = useState<Testimonial[]>((defaultStore.testimonials as Testimonial[]) || []);
  const [team, setTeam] = useState<TeamMember[]>((defaultStore.team as TeamMember[]) || []);
  const [company, setCompany] = useState<CompanyInfo>(
    (defaultStore.company as CompanyInfo) || {
      companyName: "AURATECH Studio LLC",
      phone: "+1 (212) 555-0198",
      email: "concierge@auratech-studio.design",
      address: "548 W 22nd Street, Chelsea Arts District",
      city: "New York",
      postal: "New York, NY 10011",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com",
    }
  );

  // New item modal form state
  const [showModal, setShowModal] = useState(false);

  // Blog modal state
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSlug, setBlogSlug] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogReadTime, setBlogReadTime] = useState("");
  const [blogCoverImage, setBlogCoverImage] = useState("");
  const [blogCoverPreview, setBlogCoverPreview] = useState("");
  const [blogUploading, setBlogUploading] = useState(false);

  // Testimonial modal state
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<number | null>(null);
  const [testimonialAuthor, setTestimonialAuthor] = useState("");
  const [testimonialRole, setTestimonialRole] = useState("");
  const [testimonialContent, setTestimonialContent] = useState("");
  const [testimonialRating, setTestimonialRating] = useState(5);
  const [testimonialAvatar, setTestimonialAvatar] = useState("");
  const [testimonialAvatarPreview, setTestimonialAvatarPreview] = useState("");
  const [testimonialUploading, setTestimonialUploading] = useState(false);

  // Team Member modal state
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState<number | null>(null);
  const [teamName, setTeamName] = useState("");
  const [teamRole, setTeamRole] = useState("");
  const [teamBio, setTeamBio] = useState("");
  const [teamPhoto, setTeamPhoto] = useState("");
  const [teamPhotoPreview, setTeamPhotoPreview] = useState("");
  const [teamUploading, setTeamUploading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Residential");
  const [newLocation, setNewLocation] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newHoverImageUrl, setNewHoverImageUrl] = useState("");
  const [newImagePreview, setNewImagePreview] = useState("");
  const [newHoverPreview, setNewHoverPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  // Editing state for existing project images
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editHoverImageUrl, setEditHoverImageUrl] = useState("");
  const [editImagePreview, setEditImagePreview] = useState("");
  const [editHoverPreview, setEditHoverPreview] = useState("");
  const [editUploading, setEditUploading] = useState(false);

  // Upload image file and return its public URL
  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        return data.url as string;
      }
      const err = await res.json();
      setSaveMessage(`Upload error: ${err.error}`);
      return null;
    } catch {
      setSaveMessage("Image upload failed.");
      return null;
    }
  };

  const handleFileSelect = async (
    file: File,
    setUrl: (url: string) => void,
    setPreview: (preview: string) => void,
    setLoadingState: (loading: boolean) => void
  ) => {
    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    // Upload to server
    setLoadingState(true);
    const url = await uploadImage(file);
    if (url) setUrl(url);
    setLoadingState(false);
  };

  const getApiUrl = (endpoint: string) => {
    if (typeof window === "undefined") return endpoint;
    const isGh = window.location.pathname.includes("/interior-web-with-CMS");
    return isGh ? `/interior-web-with-CMS${endpoint}` : endpoint;
  };

  useEffect(() => {
    let ignore = false;
    const loadStore = async () => {
      // 1. Check if local edits exist in localStorage
      try {
        const localSaved = localStorage.getItem("auratech_cms_store");
        if (localSaved && !ignore) {
          const parsed = JSON.parse(localSaved) as Partial<CMSStore>;
          if (parsed.homepage) setHomepage((prev) => ({ ...prev, ...parsed.homepage }));
          if (parsed.projects && parsed.projects.length > 0) setProjects(parsed.projects);
          if (parsed.blogPosts && parsed.blogPosts.length > 0) setBlogs(parsed.blogPosts);
          if (parsed.testimonials && parsed.testimonials.length > 0) setTestimonials(parsed.testimonials);
          if (parsed.team && parsed.team.length > 0) setTeam(parsed.team);
          if (parsed.company) setCompany((prev) => ({ ...prev, ...parsed.company }));
        }
      } catch {}

      // 2. Fetch fresh store from API
      try {
        const res = await fetch(getApiUrl("/api/cms"));
        if (res.ok && !ignore) {
          const data = (await res.json()) as CMSStore;
          if (data.homepage) setHomepage(data.homepage);
          if (data.projects) setProjects(data.projects);
          if (data.blogPosts) setBlogs(data.blogPosts);
          if (data.testimonials) setTestimonials(data.testimonials);
          if (data.team) setTeam(data.team);
          if (data.company) setCompany(data.company);
        }
      } catch (e) {
        console.error("Using default initial store", e);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadStore();

    return () => {
      ignore = true;
    };
  }, []);

  const persistUpdate = async (updates: Partial<CMSStore>, successMsg = "Changes saved to live main page!") => {
    setSaving(true);
    setSaveMessage("");

    // Cache locally
    try {
      const currentLocal = localStorage.getItem("auratech_cms_store");
      const base = currentLocal ? JSON.parse(currentLocal) : {};
      const merged = { ...base, ...updates };
      localStorage.setItem("auratech_cms_store", JSON.stringify(merged));
    } catch {}

    try {
      const res = await fetch(getApiUrl("/api/cms"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        setSaveMessage(`✓ ${successMsg}`);
        setTimeout(() => setSaveMessage(""), 4000);
      } else {
        setSaveMessage(`✓ ${successMsg} (saved locally in browser)`);
        setTimeout(() => setSaveMessage(""), 4000);
      }
    } catch {
      setSaveMessage(`✓ ${successMsg} (saved locally in browser)`);
      setTimeout(() => setSaveMessage(""), 4000);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveHomepage = (e: React.FormEvent) => {
    e.preventDefault();
    persistUpdate({ homepage }, "Main page settings updated successfully!");
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle) {
      const newItem: Project = {
        id: Date.now(),
        title: newTitle,
        category: newCategory,
        location: newLocation || "Global Commission",
        status: "Published",
        stats: "Bespoke Specification",
        description:
          newDescription ||
          "Custom architectural execution featuring bespoke materiality and circadian lighting design.",
        image:
          newImageUrl.trim() ||
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        hoverImage:
          newHoverImageUrl.trim() ||
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        tags: [newCategory, "Custom Design"],
      };
      const updatedProjects = [newItem, ...projects];
      setProjects(updatedProjects);
      persistUpdate({ projects: updatedProjects }, "New project created and published!");
      setNewTitle("");
      setNewLocation("");
      setNewDescription("");
      setNewImageUrl("");
      setNewHoverImageUrl("");
      setNewImagePreview("");
      setNewHoverPreview("");
      setShowModal(false);
    }
  };

  const handleDeleteProject = (id: number) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    persistUpdate({ projects: updated }, "Project removed from store.");
  };

  const startEditingImages = (p: Project) => {
    setEditingProjectId(p.id);
    setEditImageUrl(p.image);
    setEditHoverImageUrl(p.hoverImage || "");
    setEditImagePreview(p.image);
    setEditHoverPreview(p.hoverImage || "");
  };

  const saveProjectImages = (id: number) => {
    const updated = projects.map((p) =>
      p.id === id
        ? { ...p, image: editImageUrl.trim() || p.image, hoverImage: editHoverImageUrl.trim() || p.hoverImage }
        : p
    );
    setProjects(updated);
    persistUpdate({ projects: updated }, "Project images updated.");
    setEditingProjectId(null);
  };

  const toggleStatus = (id: number) => {
    const updated = projects.map((p) =>
      p.id === id
        ? { ...p, status: p.status === "Published" ? "Draft" : "Published" }
        : p
    );
    setProjects(updated);
    persistUpdate({ projects: updated }, "Project status updated.");
  };

  const toggleFeaturedProject = (p: Project) => {
    const currentList =
      homepage.featuredProjectIds && homepage.featuredProjectIds.length > 0
        ? homepage.featuredProjectIds
        : [homepage.featuredProjectId || 1];
    const isFeatured = currentList.includes(p.id);
    let updatedList: number[];
    if (isFeatured) {
      if (currentList.length <= 1) {
        setSaveMessage("At least one project must remain featured on the home page.");
        return;
      }
      updatedList = currentList.filter((id) => id !== p.id);
    } else {
      updatedList = [...currentList, p.id];
    }
    const newFeaturedId = updatedList[0] || p.id;
    const newHomepage = {
      ...homepage,
      featuredProjectId: newFeaturedId,
      featuredProjectIds: updatedList,
    };
    setHomepage(newHomepage);
    persistUpdate(
      { homepage: newHomepage },
      `"${p.title}" ${isFeatured ? "removed from" : "added to"} Home Page Featured projects (${updatedList.length} total)!`
    );
  };

  // ================= BLOG HANDLERS =================
  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

  const resetBlogForm = () => {
    setEditingBlogId(null);
    setBlogTitle("");
    setBlogSlug("");
    setBlogExcerpt("");
    setBlogContent("");
    setBlogAuthor("");
    setBlogReadTime("");
    setBlogCoverImage("");
    setBlogCoverPreview("");
    setShowBlogModal(false);
  };

  const openCreateBlog = () => {
    resetBlogForm();
    setShowBlogModal(true);
  };

  const openEditBlog = (b: BlogPost) => {
    setEditingBlogId(b.id);
    setBlogTitle(b.title);
    setBlogSlug(b.slug);
    setBlogExcerpt(b.excerpt);
    setBlogContent(b.content || "");
    setBlogAuthor(b.author);
    setBlogReadTime(b.readTime);
    setBlogCoverImage(b.coverImage);
    setBlogCoverPreview(b.coverImage);
    setShowBlogModal(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle) return;

    const today = new Date();
    const dateStr = today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    if (editingBlogId !== null) {
      // Editing existing post
      const updated = blogs.map((b) =>
        b.id === editingBlogId
          ? {
              ...b,
              title: blogTitle,
              slug: blogSlug || generateSlug(blogTitle),
              excerpt: blogExcerpt,
              content: blogContent,
              author: blogAuthor || "Editorial Staff",
              readTime: blogReadTime || "3 min read",
              coverImage: blogCoverImage || b.coverImage,
            }
          : b
      );
      setBlogs(updated);
      persistUpdate({ blogPosts: updated }, "Blog post updated!");
    } else {
      // Creating new post
      const newPost: BlogPost = {
        id: Date.now(),
        title: blogTitle,
        slug: blogSlug || generateSlug(blogTitle),
        excerpt: blogExcerpt || "A new perspective on contemporary architecture and design.",
        content: blogContent,
        author: blogAuthor || "Editorial Staff",
        publishedAt: dateStr,
        readTime: blogReadTime || "3 min read",
        coverImage:
          blogCoverImage ||
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        status: "Published",
      };
      const updated = [newPost, ...blogs];
      setBlogs(updated);
      persistUpdate({ blogPosts: updated }, "New blog post published!");
    }

    resetBlogForm();
  };

  const handleDeleteBlog = (id: number) => {
    const updated = blogs.filter((b) => b.id !== id);
    setBlogs(updated);
    persistUpdate({ blogPosts: updated }, "Blog post deleted.");
  };

  const toggleBlogStatus = (id: number) => {
    const updated = blogs.map((b) =>
      b.id === id
        ? { ...b, status: b.status === "Published" ? "Draft" : "Published" }
        : b
    );
    setBlogs(updated);
    persistUpdate({ blogPosts: updated }, "Blog post status updated.");
  };

  // ================= TESTIMONIAL HANDLERS =================
  const resetTestimonialForm = () => {
    setEditingTestimonialId(null);
    setTestimonialAuthor("");
    setTestimonialRole("");
    setTestimonialContent("");
    setTestimonialRating(5);
    setTestimonialAvatar("");
    setTestimonialAvatarPreview("");
    setShowTestimonialModal(false);
  };

  const openCreateTestimonial = () => {
    resetTestimonialForm();
    setShowTestimonialModal(true);
  };

  const openEditTestimonial = (t: Testimonial) => {
    setEditingTestimonialId(t.id);
    setTestimonialAuthor(t.author);
    setTestimonialRole(t.role);
    setTestimonialContent(t.content);
    setTestimonialRating(t.rating);
    setTestimonialAvatar(t.avatar || "");
    setTestimonialAvatarPreview(t.avatar || "");
    setShowTestimonialModal(true);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialAuthor || !testimonialContent) return;

    if (editingTestimonialId !== null) {
      // Edit existing testimonial
      const updated = testimonials.map((t) =>
        t.id === editingTestimonialId
          ? {
              ...t,
              author: testimonialAuthor,
              role: testimonialRole || "Private Client",
              content: testimonialContent,
              rating: testimonialRating,
              avatar: testimonialAvatar || t.avatar,
            }
          : t
      );
      setTestimonials(updated);
      persistUpdate({ testimonials: updated }, "Testimonial updated successfully!");
    } else {
      // Create new testimonial
      const newTestimonial: Testimonial = {
        id: Date.now(),
        author: testimonialAuthor,
        role: testimonialRole || "Private Client",
        content: testimonialContent,
        rating: testimonialRating,
        avatar:
          testimonialAvatar ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        status: "Approved",
      };
      const updated = [newTestimonial, ...testimonials];
      setTestimonials(updated);
      persistUpdate({ testimonials: updated }, "New testimonial added!");
    }

    resetTestimonialForm();
  };

  const handleDeleteTestimonial = (id: number) => {
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    persistUpdate({ testimonials: updated }, "Testimonial deleted from database.");
  };

  const toggleTestimonialStatus = (id: number) => {
    const updated = testimonials.map((t) =>
      t.id === id
        ? { ...t, status: t.status === "Approved" || t.status === "Published" ? "Pending" : "Approved" }
        : t
    );
    setTestimonials(updated);
    persistUpdate({ testimonials: updated }, "Testimonial status updated.");
  };

  // ================= TEAM HANDLERS =================
  const resetTeamForm = () => {
    setEditingTeamId(null);
    setTeamName("");
    setTeamRole("");
    setTeamBio("");
    setTeamPhoto("");
    setTeamPhotoPreview("");
    setShowTeamModal(false);
  };

  const openCreateTeam = () => {
    resetTeamForm();
    setShowTeamModal(true);
  };

  const openEditTeam = (m: TeamMember) => {
    setEditingTeamId(m.id);
    setTeamName(m.name);
    setTeamRole(m.role);
    setTeamBio(m.bio);
    setTeamPhoto(m.photo || "");
    setTeamPhotoPreview(m.photo || "");
    setShowTeamModal(true);
  };

  const handleSaveTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName || !teamRole) return;

    if (editingTeamId !== null) {
      // Edit existing member
      const updated = team.map((m) =>
        m.id === editingTeamId
          ? {
              ...m,
              name: teamName,
              role: teamRole,
              bio: teamBio,
              photo: teamPhoto || m.photo,
            }
          : m
      );
      setTeam(updated);
      persistUpdate({ team: updated }, "Studio Principal updated!");
    } else {
      // Create new member
      const newMember: TeamMember = {
        id: Date.now(),
        name: teamName,
        role: teamRole,
        bio: teamBio || "Architectural visionary crafting bespoke physical sanctuaries.",
        photo:
          teamPhoto ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      };
      const updated = [...team, newMember];
      setTeam(updated);
      persistUpdate({ team: updated }, "New Principal / Studio Partner added!");
    }

    resetTeamForm();
  };

  const handleLogout = () => {
    localStorage.removeItem("auratech_cms_auth");
    localStorage.removeItem("auratech_cms_user");
    window.dispatchEvent(new Event("storage"));
    window.location.href = "/admin/login";
  };

  const handleDeleteTeam = (id: number) => {
    const updated = team.filter((m) => m.id !== id);
    setTeam(updated);
    persistUpdate({ team: updated }, "Studio Principal removed.");
  };

  if (!isAuthenticated && !loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 pt-32 pb-16">
          <div className="max-w-md w-full glass-panel border border-slate-200 dark:border-white/10 rounded-3xl p-8 text-center shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-600 dark:text-purple-300 flex items-center justify-center mx-auto mb-4 text-2xl">
              🔒
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">You Have Logged Out</h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs mb-6">
              Sign back in to manage projects, blog posts, testimonials, and studio team.
            </p>
            <Link
              href="/admin/login"
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs shadow-md hover:scale-105 transition-transform"
            >
              Sign In to CMS →
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Headless CMS Control Plane
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Studio Content Manager
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Edit the live main page, manage portfolio projects, articles, and reviews.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-2 rounded-xl glass-panel text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline flex items-center gap-1.5"
            >
              <span>View Live Main Page</span>
              <span>↗</span>
            </Link>
            <div className="px-3.5 py-2 rounded-xl glass-panel text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{userEmail}</span>
            </div>
            <button
              onClick={() => setShowModal(true)}
              type="button"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              + Create Entry
            </button>
            <button
              onClick={handleLogout}
              type="button"
              className="px-3.5 py-2 rounded-xl glass-panel text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>🔒 Logout</span>
            </button>
          </div>
        </div>

        {/* Global Save Feedback Alert */}
        {saveMessage && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center justify-between animate-fadeIn">
            <span>{saveMessage}</span>
            <Link href="/" target="_blank" className="underline hover:opacity-80">
              Open Main Page to Verify ↗
            </Link>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          {[
            { id: "homepage", label: "🏠 Main Page Editor" },
            { id: "projects", label: "📁 Projects", count: projects.length },
            { id: "blogs", label: "📝 Blog Posts", count: blogs.length },
            { id: "testimonials", label: "⭐ Testimonials", count: testimonials.length },
            { id: "team", label: "👥 Principals & Partners", count: team.length },
            { id: "company", label: "🏢 Company & Socials" },
            { id: "schemas", label: "⚙️ Content Models & API" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-md"
                  : "glass-panel text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white"
              }`}
            >
              {tab.label}{" "}
              {tab.count !== undefined && (
                <span className="opacity-70 ml-1">({tab.count})</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* ================= HOMEPAGE SETTINGS TAB ================= */}
        {activeTab === "homepage" && (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-white/10 gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Main Page Content & Hero Controls
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                  Changes made here update the live headline, copy, metrics, and featured project on the main page.
                </p>
              </div>
              <button
                onClick={handleSaveHomepage}
                disabled={saving}
                type="button"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-lg shadow-purple-500/25 hover:scale-105 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? "Saving..." : "💾 Publish to Live Main Page"}
              </button>
            </div>

            <form onSubmit={handleSaveHomepage} className="space-y-6">
              {/* Badge & Featured Project Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                    Hero Status Pill / Award Badge
                  </label>
                  <input
                    type="text"
                    value={homepage.badgeText}
                    onChange={(e) =>
                      setHomepage({ ...homepage, badgeText: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                    Featured Spotlight Project (Primary Showcase)
                  </label>
                  <select
                    value={homepage.featuredProjectId}
                    onChange={(e) => {
                      const newId = Number(e.target.value);
                      const currentIds = homepage.featuredProjectIds || [homepage.featuredProjectId || 1];
                      const updatedIds = currentIds.includes(newId) ? currentIds : [newId, ...currentIds];
                      setHomepage({
                        ...homepage,
                        featuredProjectId: newId,
                        featuredProjectIds: updatedIds,
                      });
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.category} - {p.location})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Multi-Project Featured Selection for Home Page */}
              <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-purple-500/30 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Featured Home Page Projects ({(homepage.featuredProjectIds || [homepage.featuredProjectId || 1]).length} Selected)
                    </label>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Select two or more projects to showcase on the live home page portfolio grid.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30 w-fit">
                    {(homepage.featuredProjectIds || [homepage.featuredProjectId || 1]).length} Featured on Home
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                  {projects.map((p) => {
                    const isFeatured = (
                      homepage.featuredProjectIds || [homepage.featuredProjectId || 1]
                    ).includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => toggleFeaturedProject(p)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isFeatured
                            ? "bg-purple-600/15 border-purple-500 text-purple-700 dark:text-purple-300 font-bold shadow-sm"
                            : "glass-panel border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-purple-500/40"
                        }`}
                      >
                        <div className="truncate">
                          <span className="text-xs block truncate">{p.title}</span>
                          <span className="text-[10px] opacity-70 block">{p.category}</span>
                        </div>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                            isFeatured
                              ? "bg-purple-600 text-white"
                              : "bg-black/10 dark:bg-white/10 text-slate-500"
                          }`}
                        >
                          {isFeatured ? "★ Featured" : "+ Add"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hero Headline Parts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                    Hero Headline Prefix
                  </label>
                  <input
                    type="text"
                    value={homepage.heroTitlePrefix}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        heroTitlePrefix: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                    Hero Headline Accent (Gradient Text)
                  </label>
                  <input
                    type="text"
                    value={homepage.heroTitleAccent}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        heroTitleAccent: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                  Hero Paragraph / Subtitle
                </label>
                <textarea
                  rows={3}
                  value={homepage.heroSubtitle}
                  onChange={(e) =>
                    setHomepage({ ...homepage, heroSubtitle: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Metric Counters */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
                  Main Page Key Studio Metrics (4 Highlights)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {homepage.metrics?.map((m: MetricItem, idx: number) => (
                    <div key={idx} className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      <input
                        type="text"
                        value={m.value}
                        onChange={(e) => {
                          const copy = [...homepage.metrics];
                          copy[idx] = { ...copy[idx], value: e.target.value };
                          setHomepage({ ...homepage, metrics: copy });
                        }}
                        className="w-full font-bold text-lg text-purple-600 dark:text-purple-400 bg-transparent border-b border-purple-500/30 pb-1 mb-1 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={m.label}
                        onChange={(e) => {
                          const copy = [...homepage.metrics];
                          copy[idx] = { ...copy[idx], label: e.target.value };
                          setHomepage({ ...homepage, metrics: copy });
                        }}
                        className="w-full text-xs text-slate-600 dark:text-slate-400 bg-transparent focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 text-white text-sm font-bold shadow-xl shadow-purple-500/25 hover:scale-[1.01] transition-transform cursor-pointer"
                >
                  {saving ? "Publishing Updates..." : "Save & Update Live Main Page"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= PROJECTS TAB ================= */}
        {activeTab === "projects" && (
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg">
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Portfolio Projects ({projects.length} Total)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Projects saved here reflect immediately on both the main page and the /projects portfolio page.
                </p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                type="button"
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
              >
                + New Project
              </button>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-white/10">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shrink-0">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          {p.title}
                        </h4>
                        {homepage.featuredProjectId === p.id && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                            ★ Main Page Featured
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            p.status === "Published"
                              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {p.category} • {p.location} • {p.stats}
                      </p>
                    </div>

                    {/* Inline Image Editor */}
                    {editingProjectId === p.id && (
                      <div className="mt-3 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-purple-500/20 space-y-3 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Main Image Upload */}
                          <div>
                            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                              Main Image
                            </label>
                            <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-purple-500 dark:hover:border-purple-400 cursor-pointer transition-colors bg-black/5 dark:bg-slate-900/50 overflow-hidden relative group">
                              {editImagePreview ? (
                                <>
                                  <img src={editImagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">Change Image</span>
                                  </div>
                                </>
                              ) : (
                                <div className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400">
                                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                  <span className="font-medium">Click to upload</span>
                                </div>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileSelect(file, setEditImageUrl, setEditImagePreview, setEditUploading);
                                }}
                              />
                            </label>
                          </div>

                          {/* Hover Image Upload */}
                          <div>
                            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                              Hover Image (optional)
                            </label>
                            <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-purple-500 dark:hover:border-purple-400 cursor-pointer transition-colors bg-black/5 dark:bg-slate-900/50 overflow-hidden relative group">
                              {editHoverPreview ? (
                                <>
                                  <img src={editHoverPreview} alt="Hover preview" className="absolute inset-0 w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">Change Image</span>
                                  </div>
                                </>
                              ) : (
                                <div className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400">
                                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                  <span className="font-medium">Click to upload</span>
                                </div>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileSelect(file, setEditHoverImageUrl, setEditHoverPreview, setEditUploading);
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => saveProjectImages(p.id)}
                            type="button"
                            disabled={editUploading}
                            className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-bold cursor-pointer hover:bg-purple-700 transition-colors disabled:opacity-50"
                          >
                            {editUploading ? "Uploading..." : "Save Images"}
                          </button>
                          <button
                            onClick={() => setEditingProjectId(null)}
                            type="button"
                            className="px-3 py-1.5 rounded-lg glass-panel text-slate-700 dark:text-slate-300 text-xs font-medium cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs flex-wrap">
                    <button
                      onClick={() => startEditingImages(p)}
                      type="button"
                      className="px-3 py-1.5 rounded-lg glass-panel text-slate-700 dark:text-slate-300 hover:text-purple-600 font-medium cursor-pointer flex items-center gap-1"
                    >
                      🖼️ Edit Images
                    </button>
                    <button
                      onClick={() => toggleFeaturedProject(p)}
                      type="button"
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        (homepage.featuredProjectIds || [homepage.featuredProjectId || 1]).includes(p.id)
                          ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                          : "glass-panel text-slate-700 dark:text-slate-300 hover:text-purple-600"
                      }`}
                    >
                      {(homepage.featuredProjectIds || [homepage.featuredProjectId || 1]).includes(p.id)
                        ? "★ Featured on Home"
                        : "☆ Feature on Home"}
                    </button>
                    <button
                      onClick={() => toggleStatus(p.id)}
                      type="button"
                      className="px-3 py-1.5 rounded-lg glass-panel text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white font-medium cursor-pointer"
                    >
                      {p.status === "Published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 font-medium cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= BLOGS TAB ================= */}
        {activeTab === "blogs" && (
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg">
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Editorial Articles ({blogs.length} Total)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Blog posts saved here reflect on the /blog page.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/blog"
                  target="_blank"
                  className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                >
                  View Live Blog ↗
                </Link>
                <button
                  onClick={openCreateBlog}
                  type="button"
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold cursor-pointer hover:scale-105 transition-transform"
                >
                  + New Blog Post
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-white/10">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {b.coverImage && (
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shrink-0">
                        <Image
                          src={b.coverImage}
                          alt={b.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          {b.title}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            b.status === "Published"
                              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Slug: <span className="font-mono">{b.slug}</span> • Author: {b.author} • {b.publishedAt} • {b.readTime}
                      </p>
                      {b.excerpt && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                          {b.excerpt}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs flex-wrap">
                    <button
                      onClick={() => openEditBlog(b)}
                      type="button"
                      className="px-3 py-1.5 rounded-lg glass-panel text-slate-700 dark:text-slate-300 hover:text-purple-600 font-medium cursor-pointer"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => toggleBlogStatus(b.id)}
                      type="button"
                      className="px-3 py-1.5 rounded-lg glass-panel text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white font-medium cursor-pointer"
                    >
                      {b.status === "Published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(b.id)}
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 font-medium cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {blogs.length === 0 && (
                <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                  No blog posts yet. Click &quot;+ New Blog Post&quot; to create your first article.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TESTIMONIALS TAB ================= */}
        {activeTab === "testimonials" && (
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg">
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Client Reviews & Endorsements ({testimonials.length} Total)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Reviews saved here appear dynamically on the /testimonials page.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/testimonials"
                  target="_blank"
                  className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                >
                  View Wall of Love ↗
                </Link>
                <button
                  onClick={openCreateTestimonial}
                  type="button"
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold cursor-pointer hover:scale-105 transition-transform"
                >
                  + New Testimonial
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-white/10">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {t.avatar ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200 dark:border-white/10 shrink-0">
                        <Image
                          src={t.avatar}
                          alt={t.author}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-purple-600/20 text-purple-600 dark:text-purple-300 font-bold flex items-center justify-center shrink-0 border border-purple-500/30">
                        {t.author.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          {t.author}
                        </h4>
                        <div className="text-amber-400 text-xs">{"★".repeat(t.rating || 5)}</div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            t.status === "Approved" || t.status === "Published"
                              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {t.status || "Approved"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {t.role}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 italic line-clamp-2">
                        &ldquo;{t.content}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs flex-wrap shrink-0">
                    <button
                      onClick={() => openEditTestimonial(t)}
                      type="button"
                      className="px-3 py-1.5 rounded-lg glass-panel text-slate-700 dark:text-slate-300 hover:text-purple-600 font-medium cursor-pointer"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => toggleTestimonialStatus(t.id)}
                      type="button"
                      className="px-3 py-1.5 rounded-lg glass-panel text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white font-medium cursor-pointer"
                    >
                      {t.status === "Approved" || t.status === "Published" ? "Hide" : "Approve"}
                    </button>
                    <button
                      onClick={() => handleDeleteTestimonial(t.id)}
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 font-medium cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {testimonials.length === 0 && (
                <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                  No testimonials found. Click &quot;+ New Testimonial&quot; to add your first client endorsement.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TEAM / PRINCIPALS TAB ================= */}
        {activeTab === "team" && (
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg">
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Principals & Studio Partners ({team.length} Total)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Leadership team members appear dynamically on the /about page.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/about"
                  target="_blank"
                  className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                >
                  View Live About Page ↗
                </Link>
                <button
                  onClick={openCreateTeam}
                  type="button"
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold cursor-pointer hover:scale-105 transition-transform"
                >
                  + New Principal / Partner
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-white/10">
              {team.map((m) => (
                <div
                  key={m.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {m.photo ? (
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-purple-500/30 shrink-0">
                        <Image
                          src={m.photo}
                          alt={m.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-purple-600/20 text-purple-600 dark:text-purple-300 font-bold flex items-center justify-center shrink-0 border border-purple-500/30 text-lg">
                        {m.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          {m.name}
                        </h4>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/20">
                          {m.role}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                        {m.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs flex-wrap shrink-0">
                    <button
                      onClick={() => openEditTeam(m)}
                      type="button"
                      className="px-3 py-1.5 rounded-lg glass-panel text-slate-700 dark:text-slate-300 hover:text-purple-600 font-medium cursor-pointer"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTeam(m.id)}
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 font-medium cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {team.length === 0 && (
                <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                  No team members added yet. Click &quot;+ New Principal / Partner&quot; to add leadership members.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= COMPANY & SOCIALS TAB ================= */}
        {activeTab === "company" && (
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10 mb-6">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  🏢 Company Contact & Social Media Profiles
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Update your studio&apos;s phone, email, address, Instagram, LinkedIn, and Facebook links.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  persistUpdate(
                    { company },
                    "Company contact details & social channels updated!"
                  )
                }
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-lg shadow-purple-500/25 hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
              >
                💾 Save Company Details
              </button>
            </div>

            <div className="space-y-6 text-xs">
              {/* Studio Identity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Company / Studio Name
                  </label>
                  <input
                    type="text"
                    value={company.companyName}
                    onChange={(e) => setCompany({ ...company, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Main Studio Phone Number
                  </label>
                  <input
                    type="text"
                    value={company.phone}
                    onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              {/* Email & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Main Concierge Email
                  </label>
                  <input
                    type="email"
                    value={company.email}
                    onChange={(e) => setCompany({ ...company, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Primary Atelier Physical Address
                  </label>
                  <input
                    type="text"
                    value={company.address}
                    onChange={(e) => setCompany({ ...company, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    City & Country
                  </label>
                  <input
                    type="text"
                    value={company.city}
                    onChange={(e) => setCompany({ ...company, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Postal / Zip Code
                  </label>
                  <input
                    type="text"
                    value={company.postal}
                    onChange={(e) => setCompany({ ...company, postal: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3">
                  🌐 Social Media Profiles
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      <svg className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>Instagram URL</span>
                    </label>
                    <input
                      type="text"
                      value={company.instagram}
                      onChange={(e) => setCompany({ ...company, instagram: e.target.value })}
                      placeholder="https://instagram.com/yourstudio"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      <svg className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span>LinkedIn URL</span>
                    </label>
                    <input
                      type="text"
                      value={company.linkedin}
                      onChange={(e) => setCompany({ ...company, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/company/yourstudio"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      <svg className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                      <span>Facebook URL</span>
                    </label>
                    <input
                      type="text"
                      value={company.facebook}
                      onChange={(e) => setCompany({ ...company, facebook: e.target.value })}
                      placeholder="https://facebook.com/yourstudio"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SCHEMAS & API TAB ================= */}
        {activeTab === "schemas" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-4 text-purple-600 dark:text-purple-400">
                Defined Strapi Schema Models
              </h3>
              <ul className="space-y-3 text-xs">
                <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between font-mono">
                  <span>cms/models/project.json</span>
                  <span className="text-emerald-500 font-bold">✓ Ready</span>
                </li>
                <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between font-mono">
                  <span>cms/models/services.json</span>
                  <span className="text-emerald-500 font-bold">✓ Ready</span>
                </li>
                <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between font-mono">
                  <span>cms/models/blog-post.json</span>
                  <span className="text-emerald-500 font-bold">✓ Ready</span>
                </li>
                <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between font-mono">
                  <span>cms/models/team-member.json</span>
                  <span className="text-emerald-500 font-bold">✓ Ready</span>
                </li>
                <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between font-mono">
                  <span>cms/models/testimonial.json</span>
                  <span className="text-emerald-500 font-bold">✓ Ready</span>
                </li>
              </ul>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-4 text-purple-600 dark:text-purple-400">
                API & Live Data Synchronization
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5">
                  <span className="text-slate-400">API Endpoint:</span>
                  <p className="font-mono text-slate-900 dark:text-white font-bold mt-1">
                    /api/cms (Persistent JSON Store & Live Next.js Route)
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5">
                  <span className="text-slate-400">Main Page Sync:</span>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                    Direct real-time binding between Admin & Homepage
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5">
                  <span className="text-slate-400">Local Store File:</span>
                  <p className="font-mono text-slate-900 dark:text-white mt-1">
                    cms/data/store.json
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* CREATE NEW PROJECT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-8 border border-white/20 shadow-2xl bg-[var(--bg-color)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Create New Project Entry
              </h3>
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="text-slate-400 hover:text-black dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Lumina Sky Villa"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Sustainable">Sustainable</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Zurich, Switzerland"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Brief architectural highlights..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Main Image Upload */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Project Image
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-purple-500 dark:hover:border-purple-400 cursor-pointer transition-colors bg-black/5 dark:bg-slate-900/50 overflow-hidden relative group">
                    {newImagePreview ? (
                      <>
                        <img src={newImagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Change Image</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="font-medium">Click to upload</span>
                        <span className="text-[10px] text-slate-400">JPG, PNG, WebP up to 10MB</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(file, setNewImageUrl, setNewImagePreview, setUploading);
                      }}
                    />
                  </label>
                </div>

                {/* Hover Image Upload */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Hover Image (optional)
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-purple-500 dark:hover:border-purple-400 cursor-pointer transition-colors bg-black/5 dark:bg-slate-900/50 overflow-hidden relative group">
                    {newHoverPreview ? (
                      <>
                        <img src={newHoverPreview} alt="Hover preview" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Change Image</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="font-medium">Click to upload</span>
                        <span className="text-[10px] text-slate-400">JPG, PNG, WebP up to 10MB</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(file, setNewHoverImageUrl, setNewHoverPreview, setUploading);
                      }}
                    />
                  </label>
                </div>
              </div>

              {uploading && (
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-medium">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  <span>Uploading image...</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl glass-panel text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold cursor-pointer disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Save & Publish Entry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT BLOG POST MODAL */}
      {showBlogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-8 border border-white/20 shadow-2xl bg-[var(--bg-color)] my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingBlogId !== null ? "Edit Blog Post" : "Create New Blog Post"}
              </h3>
              <button
                onClick={resetBlogForm}
                type="button"
                className="text-slate-400 hover:text-black dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={blogTitle}
                  onChange={(e) => {
                    setBlogTitle(e.target.value);
                    if (!editingBlogId && !blogSlug) {
                      setBlogSlug(generateSlug(e.target.value));
                    }
                  }}
                  placeholder="e.g. The 2026 Shift: Warm Brutalism Meets Organic Minimalism"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Slug (URL path)
                  </label>
                  <input
                    type="text"
                    value={blogSlug}
                    onChange={(e) => setBlogSlug(e.target.value)}
                    placeholder="warm-brutalism-minimalism"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={blogAuthor}
                    onChange={(e) => setBlogAuthor(e.target.value)}
                    placeholder="Sebastian Croft"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Read Time
                </label>
                <input
                  type="text"
                  value={blogReadTime}
                  onChange={(e) => setBlogReadTime(e.target.value)}
                  placeholder="e.g. 5 min read"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Short Excerpt / Summary
                </label>
                <textarea
                  rows={2}
                  value={blogExcerpt}
                  onChange={(e) => setBlogExcerpt(e.target.value)}
                  placeholder="Brief summary of the article..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Article Content (Markdown or plain text)
                </label>
                <textarea
                  rows={4}
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  placeholder="Write full article body here..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-mono"
                />
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Cover Image
                </label>
                <label className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-purple-500 dark:hover:border-purple-400 cursor-pointer transition-colors bg-black/5 dark:bg-slate-900/50 overflow-hidden relative group">
                  {blogCoverPreview ? (
                    <>
                      <img src={blogCoverPreview} alt="Cover preview" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Change Image</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span className="font-medium">Click to upload cover image</span>
                      <span className="text-[10px] text-slate-400">JPG, PNG, WebP up to 10MB</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file, setBlogCoverImage, setBlogCoverPreview, setBlogUploading);
                    }}
                  />
                </label>
              </div>

              {blogUploading && (
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-medium">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  <span>Uploading image...</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={resetBlogForm}
                  className="px-4 py-2 rounded-xl glass-panel text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={blogUploading}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold cursor-pointer disabled:opacity-50"
                >
                  {blogUploading
                    ? "Uploading..."
                    : editingBlogId !== null
                    ? "Update Blog Post"
                    : "Save & Publish Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT TESTIMONIAL MODAL */}
      {showTestimonialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-8 border border-white/20 shadow-2xl bg-[var(--bg-color)] my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingTestimonialId !== null ? "Edit Testimonial" : "Create New Testimonial"}
              </h3>
              <button
                onClick={resetTestimonialForm}
                type="button"
                className="text-slate-400 hover:text-black dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Client Name / Author *
                </label>
                <input
                  type="text"
                  required
                  value={testimonialAuthor}
                  onChange={(e) => setTestimonialAuthor(e.target.value)}
                  placeholder="e.g. Victoria Sterling"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Role / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={testimonialRole}
                    onChange={(e) => setTestimonialRole(e.target.value)}
                    placeholder="e.g. Managing Director, Sterling Capital"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Rating (Stars)
                  </label>
                  <select
                    value={testimonialRating}
                    onChange={(e) => setTestimonialRating(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                    <option value={2}>★★☆☆☆ (2 Stars)</option>
                    <option value={1}>★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Testimonial Quote / Endorsement *
                </label>
                <textarea
                  rows={3}
                  required
                  value={testimonialContent}
                  onChange={(e) => setTestimonialContent(e.target.value)}
                  placeholder="Their transformative vision completely redefined our penthouse..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>

              {/* Avatar Upload */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Client Avatar Photo (Optional)
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-purple-500 dark:hover:border-purple-400 cursor-pointer transition-colors bg-black/5 dark:bg-slate-900/50 overflow-hidden relative group">
                  {testimonialAvatarPreview ? (
                    <>
                      <img src={testimonialAvatarPreview} alt="Avatar preview" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Change Photo</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      <span className="font-medium">Click to upload avatar</span>
                      <span className="text-[10px] text-slate-400">JPG, PNG, WebP up to 10MB</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file, setTestimonialAvatar, setTestimonialAvatarPreview, setTestimonialUploading);
                    }}
                  />
                </label>
              </div>

              {testimonialUploading && (
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-medium">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  <span>Uploading avatar...</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={resetTestimonialForm}
                  className="px-4 py-2 rounded-xl glass-panel text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={testimonialUploading}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold cursor-pointer disabled:opacity-50"
                >
                  {testimonialUploading
                    ? "Uploading..."
                    : editingTestimonialId !== null
                    ? "Update Testimonial"
                    : "Save & Publish Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT TEAM MEMBER MODAL */}
      {showTeamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-8 border border-white/20 shadow-2xl bg-[var(--bg-color)] my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingTeamId !== null ? "Edit Principal / Partner" : "Add Principal / Studio Partner"}
              </h3>
              <button
                onClick={resetTeamForm}
                type="button"
                className="text-slate-400 hover:text-black dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTeam} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Sebastian Croft"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Role / Title *
                </label>
                <input
                  type="text"
                  required
                  value={teamRole}
                  onChange={(e) => setTeamRole(e.target.value)}
                  placeholder="e.g. Principal Architect & Founder"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Biography / Credentials
                </label>
                <textarea
                  rows={3}
                  value={teamBio}
                  onChange={(e) => setTeamBio(e.target.value)}
                  placeholder="Former lead partner at Foster + Partners with 18+ years crafting award-winning luxury residential and hospitality landmarks..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Partner Portrait Photo (Optional)
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-purple-500 dark:hover:border-purple-400 cursor-pointer transition-colors bg-black/5 dark:bg-slate-900/50 overflow-hidden relative group">
                  {teamPhotoPreview ? (
                    <>
                      <img src={teamPhotoPreview} alt="Portrait preview" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Change Photo</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      <span className="font-medium">Click to upload portrait</span>
                      <span className="text-[10px] text-slate-400">JPG, PNG, WebP up to 10MB</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file, setTeamPhoto, setTeamPhotoPreview, setTeamUploading);
                    }}
                  />
                </label>
              </div>

              {teamUploading && (
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-medium">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  <span>Uploading portrait...</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={resetTeamForm}
                  className="px-4 py-2 rounded-xl glass-panel text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={teamUploading}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold cursor-pointer disabled:opacity-50"
                >
                  {teamUploading
                    ? "Uploading..."
                    : editingTeamId !== null
                    ? "Update Partner"
                    : "Save & Publish Partner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
