"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background video with parallax */}
      <div
        className="absolute inset-0 scale-110"
        style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.1)` }}
      >
      {/* Desktop / tablet video */}
      <video
        className="hidden sm:block w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

  {/* Mobile fallback image */}
  <Image
    src="https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=1800&q=85"
    alt="Vignes de Chinon"
    width={1920}
    height={1080}
    className="block sm:hidden w-full h-full object-cover"
  />
</div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        {/* Eyebrow */}
        <p className="font-sans text-xs tracking-[0.35em] uppercase text-stone-300 mb-6 animate-fade-in">
          Domaine test · Chinon
        </p>

        {/* Main headline */}
        <h1 className="font-serif text-[clamp(2.8rem,8vw,7rem)] leading-[0.95] font-light tracking-tight mb-6 animate-fade-in-up">
          Le Chinon
          <br />
          <em>dans sa vérité</em>
        </h1>

        {/* Subline */}
        <p className="font-sans text-base text-stone-300 tracking-[0.15em] uppercase mb-12 animate-fade-in-up animation-delay-200">
          Un domaine, un terroir, une émotion.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
          <Link
            href="/products"
            className="px-8 py-3.5 bg-white text-stone-900 text-sm font-sans tracking-[0.15em] uppercase hover:bg-stone-100 transition-colors duration-300"
          >
            Découvrir les vins
          </Link>
          <Link
            href="/domaine"
            className="px-8 py-3.5 border border-white/60 text-white text-sm font-sans tracking-[0.15em] uppercase hover:bg-white/10 transition-colors duration-300"
          >
            Explorer le domaine
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-pulse">
        <span className="text-[10px] tracking-[0.3em] uppercase font-sans">
          Découvrir 
        </span>
        <div className="w-px h-10 bg-white/30" />
      </div>
    </section>
  );
}
