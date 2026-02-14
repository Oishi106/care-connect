"use client";

import React from "react";
import Link from "next/link";

import { blogPosts } from "../../lib/blogPosts";

const Blog = () => {
  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 text-center sm:mb-12 md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-1.5 text-sm font-semibold text-[#ff6fae]">
            <span className="text-[#ff6fae]">�</span>
            Latest Blog
          </div>
          
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            <span className="text-[#ff6fae]">Tips & Stories</span> For Caregivers
          </h2>
          
          <p className="mx-auto max-w-2xl text-gray-500 leading-relaxed">
            Helpful tips and stories for caring for your loved ones. Get expert advice from our specialists to provide the best care.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <div className="mb-3 flex items-center gap-2 text-sm text-[#ff6fae]">
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
                
                {/* Title */}
                <h3 className="mb-3 text-lg font-bold text-gray-900 leading-snug hover:text-[#ff6fae] transition-colors cursor-pointer">
                  {post.title}
                </h3>
                
                {/* Description */}
                <p className="mb-5 text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {post.description}
                </p>
                
                {/* Read More Button */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center rounded-full bg-[#ff6fae] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:brightness-95 transition"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
