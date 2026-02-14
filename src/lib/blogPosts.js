export const blogPosts = [
  {
    slug: "nutrition-tips-elderly-care",
    title: "Proper Nutrition & Diet Tips For Elderly Care",
    date: "February 10, 2026",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=60",
    description:
      "Proper nutrition is essential for keeping seniors healthy. Learn which foods are beneficial and how to ensure they get the right nutrients every day.",
    content: [
      "Good nutrition supports energy, immunity, and overall well-being—especially for older adults. A balanced plate with enough protein, fiber, healthy fats, and hydration helps maintain strength and recovery.",
      "In daily meals, try to include: lean proteins (fish, eggs, lentils), vegetables and fruits, whole grains, and calcium-rich foods. If appetite is low, smaller meals and healthy snacks can work better than large portions.",
      "If your loved one has diabetes, high blood pressure, kidney issues, or swallowing difficulties, it’s best to follow a clinician’s guidance. A trained caregiver can also help with meal preparation, routine, and hydration reminders."
    ],
    highlights: [
      "Prioritize protein and hydration",
      "Choose nutrient-dense foods",
      "Keep meals simple and consistent"
    ]
  },
  {
    slug: "play-and-child-development",
    title: "The Importance Of Play In Child Development",
    date: "February 8, 2026",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&auto=format&fit=crop&q=60",
    description:
      "Play is crucial for children's mental and physical growth. Discover which activities are most beneficial for your child's development.",
    content: [
      "Play helps children build confidence, communication skills, and creativity. It also supports motor skills and healthy social habits through sharing and teamwork.",
      "You can encourage development with simple activities: building blocks, drawing, pretend play, outdoor games, and reading together. Consistency matters more than complexity.",
      "When a caregiver understands your child’s routine and temperament, playtime becomes safer, calmer, and more productive—especially for busy families."
    ],
    highlights: [
      "Builds social and communication skills",
      "Supports coordination and movement",
      "Encourages creativity and independence"
    ]
  },
  {
    slug: "mental-health-for-seniors",
    title: "Maintaining Mental Health For Seniors",
    date: "February 5, 2026",
    image:
      "https://images.unsplash.com/photo-1516307365426-bea591f05f6e?w=1200&auto=format&fit=crop&q=60",
    description:
      "Mental health becomes more important as we age. Learn how to keep your loved ones mentally healthy and engaged with life.",
    content: [
      "Emotional well-being can change with age due to health conditions, reduced mobility, or loneliness. Small daily habits—connection, routine, and purpose—can have a big impact.",
      "Try to keep seniors engaged with light activities: short walks, conversation, simple hobbies, family visits, or music. Regular sleep and hydration also support mood and focus.",
      "If you notice persistent sadness, confusion, or withdrawal, consider consulting a healthcare professional. CareConnect caregivers can provide companionship and structured support at home."
    ],
    highlights: [
      "Maintain daily routine",
      "Encourage social connection",
      "Seek help when changes persist"
    ]
  }
];

export const getBlogPostBySlug = (slug) => {
  return blogPosts.find((post) => post.slug === slug);
};
