const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Category এবং icon mapping — MongoDB category → card cat
const categoryMap = {
  "Senior Care": "Senior",
  "Child Care":  "Child",
  "Medical":     "Medical",
  "Support":     "Special",
  "Personal":    "Wellness",
  "Home":        "Wellness",
};

// Category based colors
const categoryStyles = {
  "Senior Care": {
    gradient: "from-blue-50 to-sky-100",
    accent: "#3b82f6",
    accentBg: "bg-blue-500",
    tagBg: "bg-blue-500",
  },
  "Child Care": {
    gradient: "from-pink-50 to-rose-100",
    accent: "#ff6fae",
    accentBg: "bg-[#ff6fae]",
    tagBg: "bg-[#ff6fae]",
  },
  "Medical": {
    gradient: "from-green-50 to-emerald-100",
    accent: "#10b981",
    accentBg: "bg-emerald-500",
    tagBg: "bg-emerald-500",
  },
  "Support": {
    gradient: "from-purple-50 to-violet-100",
    accent: "#8b5cf6",
    accentBg: "bg-violet-500",
    tagBg: "bg-violet-500",
  },
  "Personal": {
    gradient: "from-amber-50 to-yellow-100",
    accent: "#f59e0b",
    accentBg: "bg-amber-500",
    tagBg: "bg-amber-500",
  },
  "Home": {
    gradient: "from-teal-50 to-cyan-100",
    accent: "#14b8a6",
    accentBg: "bg-teal-500",
    tagBg: "bg-teal-500",
  },
};

const categoryIcons = {
  "Senior Care": "👴",
  "Child Care":  "👶",
  "Medical":     "🏥",
  "Support":     "💝",
  "Personal":    "🌟",
  "Home":        "🏡",
};

// MongoDB service → card format এ convert করো
function mapService(svc) {
  const style = categoryStyles[svc.category] || {
    gradient: "from-pink-50 to-rose-100",
    accent: "#ff6fae",
    accentBg: "bg-[#ff6fae]",
    tagBg: "bg-[#ff6fae]",
  };

  return {
    _id:       svc._id,
    title:     svc.title,
    desc:      svc.description,
    description: svc.description,
    icon:      categoryIcons[svc.category] || "✨",
    gradient:  style.gradient,
    accent:    style.accent,
    accentBg:  style.accentBg,
    tag:       svc.badge,
    tagBg:     style.tagBg,
    img:       svc.image,
    image:     svc.image,
    cat:       categoryMap[svc.category] || svc.category,
    category:  svc.category,
    price:     `$${svc.price}/hr`,
  };
}

// API থেকে fetch করো
export async function fetchServices() {
  const res = await fetch(`${API_URL}/services`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return Array.isArray(data) ? data.map(mapService) : [];
}

// Fallback — server না চললে এগুলো দেখাবে
export const fallbackServices = [
  {
    title: "Elderly Care", desc: "Daily living assistance, health monitoring, and companionship for seniors.", description: "Daily living assistance, health monitoring, and companionship for seniors.",
    icon: "👴", gradient: "from-blue-50 to-sky-100", accent: "#3b82f6", accentBg: "bg-blue-500", tag: "Most Popular", tagBg: "bg-blue-500",
    img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80", image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80",
    cat: "Senior", category: "Senior Care", price: "$15/hr",
  },
  {
    title: "Baby Sitting", desc: "Trusted babysitters for infants and toddlers with safety-first approach.", description: "Trusted babysitters for infants and toddlers with safety-first approach.",
    icon: "👶", gradient: "from-pink-50 to-rose-100", accent: "#ff6fae", accentBg: "bg-[#ff6fae]", tag: "Top Rated", tagBg: "bg-[#ff6fae]",
    img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80",
    cat: "Child", category: "Child Care", price: "$12/hr",
  },
  {
    title: "Patient Care", desc: "In-home nursing and post-surgery recovery assistance.", description: "In-home nursing and post-surgery recovery assistance.",
    icon: "🏥", gradient: "from-green-50 to-emerald-100", accent: "#10b981", accentBg: "bg-emerald-500", tag: "Certified", tagBg: "bg-emerald-500",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80",
    cat: "Medical", category: "Medical", price: "$18/hr",
  },
  {
    title: "Special Needs", desc: "Tailored support for individuals with physical or developmental disabilities.", description: "Tailored support for individuals with physical or developmental disabilities.",
    icon: "💝", gradient: "from-purple-50 to-violet-100", accent: "#8b5cf6", accentBg: "bg-violet-500", tag: "Expert Care", tagBg: "bg-violet-500",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80",
    cat: "Special", category: "Support", price: "$20/hr",
  },
  {
    title: "Night Care", desc: "Overnight supervision for patients or seniors who need late-night assistance.", description: "Overnight supervision for patients or seniors who need late-night assistance.",
    icon: "🌙", gradient: "from-indigo-50 to-blue-100", accent: "#6366f1", accentBg: "bg-indigo-500", tag: "24/7", tagBg: "bg-indigo-500",
    img: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=600&auto=format&fit=crop&q=80", image: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=600&auto=format&fit=crop&q=80",
    cat: "Senior", category: "Senior Care", price: "$25/hr",
  },
  {
    title: "Therapy Support", desc: "Physical and occupational therapy assistance within the comfort of home.", description: "Physical and occupational therapy assistance within the comfort of home.",
    icon: "🧘", gradient: "from-teal-50 to-cyan-100", accent: "#14b8a6", accentBg: "bg-teal-500", tag: "Professional", tagBg: "bg-teal-500",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80",
    cat: "Medical", category: "Medical", price: "$30/hr",
  },
  {
    title: "Dementia Care", desc: "Specialized memory care and safety monitoring for dementia patients.", description: "Specialized memory care and safety monitoring for dementia patients.",
    icon: "🧠", gradient: "from-sky-50 to-blue-100", accent: "#0ea5e9", accentBg: "bg-sky-500", tag: "Specialist", tagBg: "bg-sky-500",
    img: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=600&auto=format&fit=crop&q=80", image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=600&auto=format&fit=crop&q=80",
    cat: "Senior", category: "Senior Care", price: "$28/hr",
  },
  {
    title: "Child Care", desc: "After-school supervision, homework help, and engaging activities for kids.", description: "After-school supervision, homework help, and engaging activities for kids.",
    icon: "🧒", gradient: "from-amber-50 to-yellow-100", accent: "#f59e0b", accentBg: "bg-amber-500", tag: "New", tagBg: "bg-amber-500",
    img: "https://images.unsplash.com/photo-1484820540052-0182ef970858?w=600&auto=format&fit=crop&q=80", image: "https://images.unsplash.com/photo-1484820540052-0182ef970858?w=600&auto=format&fit=crop&q=80",
    cat: "Child", category: "Child Care", price: "$10/hr",
  },
];