const FALLBACK_SERVICE_COLORS = [
  "from-blue-50 to-sky-100",
  "from-pink-50 to-rose-100",
  "from-green-50 to-emerald-100",
  "from-purple-50 to-violet-100",
  "from-amber-50 to-yellow-100",
  "from-indigo-50 to-blue-100",
  "from-teal-50 to-cyan-100",
  "from-rose-50 to-red-100",
  "from-sky-50 to-blue-100",
  "from-orange-50 to-amber-100",
  "from-pink-50 to-fuchsia-100",
  "from-lime-50 to-green-100",
];

const FALLBACK_ICON_BGS = [
  "bg-blue-300",
  "bg-[#ff6fae]",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-rose-500",
  "bg-sky-500",
  "bg-orange-500",
  "bg-fuchsia-500",
  "bg-lime-500",
];

const FALLBACK_TAG_BGS = [
  "bg-blue-500",
  "bg-[#ff6fae]",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-rose-500",
  "bg-sky-500",
  "bg-orange-500",
  "bg-fuchsia-500",
  "bg-lime-500",
];

export const fallbackServices = [
  {
    title: "Elderly Care",
    description: "Daily living assistance, health monitoring, companionship and emotional support for senior adults.",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80",
    color: "from-blue-50 to-sky-100",
    iconBg: "bg-blue-500",
    tag: "Most Popular",
    tagBg: "bg-blue-500",
    cat: "Senior",
    price: "$15/hr",
  },
  {
    title: "Baby Sitting",
    description: "Trusted, trained babysitters for infants and toddlers with a safety-first, nurturing approach.",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80",
    color: "from-pink-50 to-rose-100",
    iconBg: "bg-[#ff6fae]",
    tag: "Top Rated",
    tagBg: "bg-[#ff6fae]",
    cat: "Child",
    price: "$12/hr",
  },
  {
    title: "Patient Care",
    description: "Specialized in-home nursing, post-surgery recovery assistance and chronic illness management.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80",
    color: "from-green-50 to-emerald-100",
    iconBg: "bg-emerald-500",
    tag: "Certified",
    tagBg: "bg-emerald-500",
    cat: "Medical",
    price: "$18/hr",
  },
  {
    title: "Special Needs Care",
    description: "Expert care for individuals with special requirements and personalized attention.",
    image: "https://images.pexels.com/photos/6981096/pexels-photo-6981096.jpeg",
    color: "from-pink-50 to-pink-100",
    iconBg: "bg-[#ff6fae]",
    tag: "Expert Care",
    tagBg: "bg-[#ff6fae]",
    cat: "Special",
    price: "$20/hr",
  },
];

function getString(value) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function formatPrice(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return `$${value}/hr`;
  }

  const stringValue = getString(value);

  if (!stringValue) {
    return "$15/hr";
  }

  if (/^\$\d+(?:\.\d+)?(?:\/hr)?$/i.test(stringValue)) {
    return stringValue.includes("/hr") ? stringValue : `${stringValue}/hr`;
  }

  const numericMatch = stringValue.match(/\d+(?:\.\d+)?/);

  if (numericMatch) {
    return `$${numericMatch[0]}/hr`;
  }

  return stringValue;
}

export function normalizeServiceItem(item, index = 0) {
  const title = getString(item?.title) || getString(item?.name) || getString(item?.serviceName) || `Service ${index + 1}`;
  const description =
    getString(item?.description) ||
    getString(item?.desc) ||
    getString(item?.summary) ||
    "Professional care service available for booking.";
  const image =
    getString(item?.image) ||
    getString(item?.img) ||
    getString(item?.photo) ||
    "https://images.unsplash.com/photo-1576091160550-112667149917?w=1200&auto=format&fit=crop&q=80";
  const category = getString(item?.cat) || getString(item?.category) || getString(item?.type) || "General";
  const price = formatPrice(item?.price ?? item?.priceLabel);
  const color = getString(item?.color) || FALLBACK_SERVICE_COLORS[index % FALLBACK_SERVICE_COLORS.length];
  const iconBg = getString(item?.iconBg) || FALLBACK_ICON_BGS[index % FALLBACK_ICON_BGS.length];
  const tagBg = getString(item?.tagBg) || FALLBACK_TAG_BGS[index % FALLBACK_TAG_BGS.length];

  return {
    id: item?.id || item?._id || `${title}-${index}`,
    title,
    description,
    image,
    color,
    iconBg,
    tag: getString(item?.tag) || getString(item?.badge) || "Available",
    tagBg,
    cat: category,
    price,
    accent: getString(item?.accent) || "#ff6fae",
    accentBg: getString(item?.accentBg) || iconBg,
    icon: getString(item?.icon) || "✨",
  };
}

export function normalizeServicesResponse(payload) {
  const items = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.services)
      ? payload.services
      : Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload?.result)
          ? payload.result
          : [];

  return items.map((item, index) => normalizeServiceItem(item, index));
}

export async function fetchServices() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const response = await fetch(`${apiBase}/services`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Unable to fetch services.");
  }

  const payload = await response.json();
  return normalizeServicesResponse(payload);
}