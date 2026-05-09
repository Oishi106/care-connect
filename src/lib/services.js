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
    _id:         svc._id,
    title:       svc.title,
    desc:        svc.description,
    description: svc.description,
    icon:        categoryIcons[svc.category] || "✨",
    gradient:    style.gradient,
    accent:      style.accent,
    accentBg:    style.accentBg,
    tag:         svc.badge,
    tagBg:       style.tagBg,
    img:         svc.image,
    image:       svc.image,
    cat:         categoryMap[svc.category] || svc.category,
    category:    svc.category,
    price:       `$${svc.price}/hr`,
    active:      svc.active !== false,
  };
}

// API থেকে fetch করো
export async function fetchServices() {
  try {
    const res = await fetch(
      "https://care-connect-server-hca5.onrender.com/services",
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Render server error");

    const data = await res.json();
    const serviceList = Array.isArray(data) ? data : [];

    return serviceList
      .filter((s) => s.active !== false)
      .map(mapService);

  } catch {
    // Render server down হলে local Next.js API try করো
    const res = await fetch("/api/services?active=true", { cache: "no-store" });
    const data = await res.json();
    const serviceList = Array.isArray(data)
      ? data
      : Array.isArray(data?.services)
        ? data.services
        : [];

    return serviceList
      .filter((s) => s.active !== false)
      .map(mapService);
  }
}