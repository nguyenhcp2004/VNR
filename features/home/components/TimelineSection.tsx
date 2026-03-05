"use client";

import { posts as defaultPosts } from "@/features/tai-lieu/data";
import { PostType } from "@/common/types/post.type";
import { TimelineItem } from "@/features/home/components/TimelineItem";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineSectionProps {
  posts?: PostType[];
  linkPrefix?: string;
}

const TimelineSection = ({
  posts = defaultPosts,
  linkPrefix = "/timeline"
}: TimelineSectionProps) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate header
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true
          }
        }
      );
    }

    // Scroll-linked timeline line - grows as you scroll through timeline
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top bottom", // Start when timeline enters viewport
          end: "bottom top", // End when timeline exits viewport
          scrub: 0.3 // Smooth scroll-linked
        }
      });
    }
  }, []);

  // Sort posts by milestone date (year + month)
  // Handles formats: "1939", "1941–1944", "11-1939", "02-09-1945"
  // Returns YYYYMM as number for comparison (e.g., 194503 for March 1945)
  const extractDate = (milestone: string): number => {
    // Handle year range with en-dash (e.g., "1941–1944") - use start year, assume month 01
    if (milestone.includes("–")) {
      const year = parseInt(milestone.split("–")[0]);
      return year * 100 + 1;
    }
    
    const parts = milestone.split("-");
    
    if (parts.length === 1) {
      // Plain year (e.g., "1939") - assume month 01
      return parseInt(parts[0]) * 100 + 1;
    } else if (parts.length === 2) {
      // MM-YYYY format (e.g., "11-1939")
      const month = parseInt(parts[0]);
      const year = parseInt(parts[1]);
      return year * 100 + month;
    } else if (parts.length === 3) {
      // DD-MM-YYYY format (e.g., "02-09-1945")
      const month = parseInt(parts[1]);
      const year = parseInt(parts[2]);
      return year * 100 + month;
    }
    
    return 0;
  };

  const sortedPosts = [...posts]
    .sort((a, b) => extractDate(b.milestone) - extractDate(a.milestone))
    .slice(0, 10); // Limit to first 10 milestones

  return (
    <div className="container mx-auto px-6 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-5xl md:text-6xl font-bold text-amber-100">
              Timeline
            </h2>
          </div>

          <p className="text-amber-200/80 text-lg max-w-2xl mx-auto">
            Quá trình hình thành và phát triển của quyền con người qua các hình thái xã hội.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 transform -translate-x-1/2 rounded-full shadow-lg shadow-amber-500/50"
            style={{ transformOrigin: "top center", transform: "scaleY(0)" }}
          />

          {/* Timeline Items */}
          <div className="relative pt-8">
            {sortedPosts.map((post, index) => (
              <TimelineItem
                key={post.id}
                post={post}
                index={index}
                linkPrefix={linkPrefix}
              />
            ))}
          </div>

          {/* End marker */}
          <div className="relative flex justify-center pt-8">
            <div className="w-12 h-12 bg-amber-500 rounded-full border-8 border-amber-900/40 shadow-2xl shadow-amber-500/50 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
