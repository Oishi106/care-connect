import Link from "next/link";
import BrandLogo from "../component/BrandLogo";

const quickLinks = [
  {
    href: "/",
    label: "Home",
    description: "Return to the main dashboard of Care Connect.",
  },
  {
    href: "/service",
    label: "Services",
    description: "Browse care options for families and loved ones.",
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Reach out if you need help finding the right page.",
  },
];

export default function NotFound() {
  return (
    <main className="relative isolate overflow-hidden bg-[#fff8fb] font-(family-name:--font-geist-sans) text-slate-900">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,111,174,0.20),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(184,90,134,0.16),transparent_35%),linear-gradient(180deg,#fffafc_0%,#fff4f8_100%)]" />
      <div className="absolute -left-24 top-20 -z-10 h-72 w-72 rounded-full bg-[#ff6fae]/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-16 -z-10 h-80 w-80 rounded-full bg-[#8a2f5d]/15 blur-3xl" />

      <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-4xl border border-white/70 bg-white/70 p-8 shadow-[0_24px_80px_rgba(138,47,93,0.12)] backdrop-blur-xl sm:p-10 lg:p-12">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#ff6fae]/10 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-semibold text-[#b03b73] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#ff6fae]" />
                404 · Page not found
              </span>

              <div className="mt-8 space-y-5">
                <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  This page wandered off, but your care journey can continue.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  The link may be outdated or the page may have moved. Use the
                  shortcuts below to get back to the most useful parts of Care
                  Connect.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full bg-[#ff6fae] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(255,111,174,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ff5ca4]"
                >
                  Back to Home
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-pink-200 bg-white/90 px-6 py-3 text-sm font-semibold text-[#8a2f5d] transition hover:-translate-y-0.5 hover:border-pink-300 hover:bg-pink-50"
                >
                  Contact Support
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group rounded-2xl border border-pink-100 bg-white/80 p-4 shadow-[0_10px_30px_rgba(138,47,93,0.06)] transition hover:-translate-y-1 hover:border-pink-200 hover:shadow-[0_16px_40px_rgba(138,47,93,0.10)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-base font-semibold text-slate-900">
                        {link.label}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-50 text-[#ff6fae] transition group-hover:bg-[#ff6fae] group-hover:text-white">
                        →
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-4xl border border-[#f2d2e0] bg-[#8a2f5d] p-8 text-white shadow-[0_24px_80px_rgba(138,47,93,0.24)] sm:p-10 lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_30%)]" />
            <div className="absolute -right-10 top-6 h-28 w-28 rounded-full border border-white/15 bg-white/8 blur-[2px]" />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-white/90">
                  <BrandLogo
                    width={180}
                    height={64}
                    subtitle="Reliable care, guided with heart"
                    subtitleClassName="text-sm text-white/75"
                    imageClassName="max-w-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="text-7xl font-semibold tracking-tight text-white sm:text-8xl lg:text-[7rem]">
                    404
                  </div>
                  <p className="max-w-md text-base leading-7 text-white/88 sm:text-lg">
                    Even when a page is missing, the support path stays simple,
                    calm, and easy to recover.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Trusted support", value: "24/7" },
                  { label: "Fast recovery", value: "1 click" },
                  { label: "Helpful routes", value: "3 pages" },
                  { label: "Warm tone", value: "Always" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur"
                  >
                    <div className="text-sm text-white/72">{item.label}</div>
                    <div className="mt-1 text-2xl font-semibold text-white">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}