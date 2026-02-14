import React from "react";

const Banner = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-14 md:gap-10 md:grid-cols-2 md:py-20">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 text-sm font-semibold text-[#ff6fae]">
            <span className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#ff6fae]" />
            Caregiver’s Well-Being
          </div>

          <h1 className="text-4xl font-semibold leading-tight text-gray-900 md:text-5xl">
            Together, We Build A Safer World{" "}
            <span className="text-[#ff6fae] underline decoration-[#ff6fae] decoration-4 underline-offset-8">
              For Families
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-500">
            Caring for your loved ones with trusted caregivers, compassionate support, and a platform that puts their safety and comfort first.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button className="rounded-full bg-[#ff6fae] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,111,174,0.25)] transition hover:brightness-95">
              Book Appointment
              <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 12h10M13 7l4 5-4 5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <div className="flex -space-x-3">
              {[
                "https://plus.unsplash.com/premium_photo-1683134308025-ec5478c4aa6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWxkZXIlMjBjYXJlfGVufDB8fDB8fHww",
                "https://media.istockphoto.com/id/1211138472/photo/mother-and-child-in-white-clothes-stand-at-window.webp?a=1&b=1&s=612x612&w=0&k=20&c=4mjp4kdkbJz2DJx498BH1GV7SfvJcFkKxHsAo5vxsKc=",
                "https://plus.unsplash.com/premium_photo-1665203568927-bf0e58ee3d20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGVsZGVyJTIwY2FyZXxlbnwwfHwwfHx8MA%3D%3D",
                "https://plus.unsplash.com/premium_photo-1666299880508-bffece864e96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFieSUyMGNhcmV8ZW58MHx8MHx8fDA%3D",
              ].map((img, index) => (
                <img
                  key={`avatar-${index}`}
                  src={img}
                  alt={`Avatar ${index + 1}`}
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
              ))}
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#ff6fae] text-sm font-bold text-white">
                +
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 text-sm text-gray-600 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    stroke="#7aa7d9"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M19.5 10.5c0 5-7.5 10.5-7.5 10.5S4.5 15.5 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    stroke="#7aa7d9"
                    strokeWidth="1.6"
                  />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Address</div>
                <div>CareConnect Service Center, Dhaka</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 6v6l4 2"
                    stroke="#7aa7d9"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                    stroke="#7aa7d9"
                    strokeWidth="1.6"
                  />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Opening Hours</div>
                <div>Available Everyday: 8:00 AM – 10:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute right-6 top-6 h-80 w-80 rounded-[80px] border-2 border-dashed border-[#ff9bc6]" />
          <div className="relative mx-auto flex h-[360px] w-[320px] items-center justify-center overflow-hidden rounded-[90px] bg-gradient-to-br from-blue-50 to-pink-50">
            <img
              src="https://plus.unsplash.com/premium_photo-1681996653334-9e16a2b598aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyZSUyMGNlbnRlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="Caregiver with baby and elderly client"
              className="h-full w-full object-cover"
              loading="lazy"
            />

            <button className="absolute -left-8 bottom-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-[#ff6fae] text-white shadow-[0_10px_20px_rgba(255,111,174,0.35)]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 5l11 7-11 7V5Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>

          <div className="absolute -right-2 top-10 rounded-2xl bg-white px-5 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
            <div className="text-3xl font-semibold text-gray-900">10+</div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[#ff6fae]">
              Years Experience
            </div>
          </div>

          <div className="absolute -right-2 bottom-6 rounded-2xl bg-white px-5 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
            <div className="text-3xl font-semibold text-gray-900">1k+</div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[#ff6fae]">
              Happy Clients
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;