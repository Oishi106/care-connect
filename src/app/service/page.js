export default function ServicePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-r from-gray-400 to-gray-300 sm:h-56 md:h-80">
        <img
          src="https://images.unsplash.com/photo-1576091160550-112667149917?q=80&w=1200&auto=format&fit=crop"
          alt="Our services"
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-center bg-black/30 px-4 sm:px-6 md:px-10">
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Our Services
          </h1>
          <div className="mt-2 flex items-center gap-2 text-xs text-pink-300 sm:text-sm">
            <a href="/" className="hover:text-white">
              Home
            </a>
            <span>&gt;</span>
            <span>Services</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-[#ff6fae] sm:text-sm">
            <span className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#ff6fae]" />
            Our Services
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            Comprehensive Care Solutions
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
            We provide trusted, compassionate care services tailored to meet your
            family's unique needs.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {[
            {
              title: "Elderly Care",
              description:
                "Professional care for seniors with medical support and daily assistance",
            },
            {
              title: "Baby Sitting",
              description:
                "Safe and nurturing childcare services from experienced caregivers",
            },
            {
              title: "Companion Care",
              description:
                "Emotional support and companionship to enhance quality of life",
            },
            {
              title: "Medical Care",
              description:
                "Trained healthcare professionals for specialized medical needs",
            },
            {
              title: "Post-Surgery Support",
              description:
                "Dedicated recovery care and rehabilitation assistance",
            },
            {
              title: "Household Help",
              description:
                "Assistance with daily chores and home management tasks",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition duration-300 hover:shadow-md sm:p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 sm:h-12 sm:w-12">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#ff6fae]"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-base font-semibold text-gray-900 sm:text-lg md:text-xl">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 sm:text-base">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
