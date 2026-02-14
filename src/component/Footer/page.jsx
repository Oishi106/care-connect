import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#8a2f5d] text-white">
            <div className="mx-auto w-full max-w-6xl px-6 py-12">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#b75a86]">
                                <svg
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    aria-hidden="true"
                                >
                                    <path d="M12 21c4.418 0 8-2.239 8-5s-3.582-5-8-5-8 2.239-8 5 3.582 5 8 5Z" />
                                    <path d="M12 11c4.418 0 8-2.239 8-5S16.418 1 12 1 4 3.239 4 6s3.582 5 8 5Z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-2xl font-semibold leading-none">Care Connect</div>
                                <div className="text-sm text-white/80">Baby & Elderly Care Platform</div>
                            </div>
                        </div>
                        <p className="text-white/85">
                            Care Connect is a trusted caregiving platform that helps families find reliable babysitters, elderly caretakers, and home care assistants.
                            We connect trained caregivers with families to make home care simple and safe.

                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Quick Link</h3>
                        <ul className="space-y-2 text-white/90">
                            {[
                                "About Us",
                                "Services",
                                "Delivery",
                                "FAQ",
                                "Contact",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                    <span className="text-[#f0a5c5]">&gt;</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Information</h3>
                        <ul className="space-y-2 text-white/90">
                            {[
                                "About Us",
                                "Services",
                                "Delivery",
                                "FAQ",
                                "Contact",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                    <span className="text-[#f0a5c5]">&gt;</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Get In Touch</h3>
                        <p className="text-white/85">
                            We are always ready to support you and your family.
                        </p>
                        <ul className="space-y-3 text-white/90">
                            <li className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#b75a86]">
                                    <svg
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        aria-hidden="true"
                                    >
                                        <path d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10Z" />
                                        <circle cx="12" cy="11" r="2" />
                                    </svg>
                                </span>
                                <span>23 Care Street, Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#b75a86]">
                                    <svg
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        aria-hidden="true"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.72-1.06a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92Z" />
                                    </svg>
                                </span>
                                <span>+880 1XXX-XXXXXX</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#b75a86]">
                                    <svg
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        aria-hidden="true"
                                    >
                                        <path d="M4 4h16v16H4z" />
                                        <path d="m4 6 8 6 8-6" />
                                    </svg>
                                </span>
                                <span>support@careconnect.com</span>
                            </li>
                        </ul>
                        <div className="pt-2">
                            <div className="mb-3 text-sm font-semibold">Social Media :</div>
                            <div className="flex items-center gap-3">
                                {[
                                    { label: "Facebook", path: "M15 3h-3a4 4 0 0 0-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                                    { label: "Twitter", path: "M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 8v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
                                    { label: "YouTube", path: "M22.54 6.42A2.78 2.78 0 0 0 20.6 4.6C18.88 4 12 4 12 4s-6.88 0-8.6.6A2.78 2.78 0 0 0 1.46 6.42 29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.82C5.12 20 12 20 12 20s6.88 0 8.6-.6a2.78 2.78 0 0 0 1.94-1.82A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58z M10 15.5V8.5l6 3.5-6 3.5z" },
                                ].map((icon) => (
                                    <button
                                        key={icon.label}
                                        aria-label={icon.label}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b75a86] text-white transition-colors hover:bg-[#c76f98]"
                                        type="button"
                                    >
                                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d={icon.path} />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white/90">
                    © 2026 care-connect. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;