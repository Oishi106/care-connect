"use client";

import React from "react";
import Link from "next/link";
import { getBlogPostBySlug } from "@/lib/blogPosts";

export default function BlogDetailPage({ params }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, the blog post you're looking for doesn't exist.</p>
          <Link
            href="/#blog"
            className="inline-flex items-center rounded-full bg-[#ff6fae] px-6 py-3 text-sm font-semibold text-white hover:brightness-95 transition"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image Section */}
      <div className="w-full h-96 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Back Button */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 mb-6 sm:mb-8 text-[#ff6fae] font-semibold hover:text-[#d6478d] transition"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-4 text-sm text-gray-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {post.date}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            {post.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none mb-12 sm:mb-16">
          {post.content.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Highlights Section */}
        {post.highlights && (
          <div className="rounded-3xl bg-pink-50 p-8 sm:p-10 mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Key Takeaways
            </h3>
            <ul className="space-y-4">
              {post.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-[#ff6fae] flex items-center justify-center mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-base sm:text-lg">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Section */}
        <div className="rounded-3xl bg-blue-50 p-8 sm:p-10 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Ready to Provide Better Care?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            At CareConnect, we help families find trusted caregivers tailored to their needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-[#ff6fae] px-8 py-3 text-base font-semibold text-white shadow-lg hover:brightness-95 transition"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
}
