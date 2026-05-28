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
          className="hidden h-full w-full object-cover sm:block"
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
          className="block h-full w-full object-cover sm:hidden"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        {/* Eyebrow */}
        <p className="animate-fade-in mb-6 font-sans text-xs tracking-[0.35em] text-stone-300 uppercase">
          Domaine test · Chinon
        </p>

        {/* Main headline */}
        <h1 className="animate-fade-in-up mb-6 font-serif text-[clamp(2.8rem,8vw,7rem)] leading-[0.95] font-light tracking-tight">
          Le Chinon
          <br />
          <em>dans sa vérité</em>
        </h1>

        {/* Subline */}
        <p className="animate-fade-in-up animation-delay-200 mb-12 font-sans text-base tracking-[0.15em] text-stone-300 uppercase">
          Un domaine, un terroir, une émotion.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up animation-delay-400 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/products"
            className="bg-white px-8 py-3.5 font-sans text-sm tracking-[0.15em] text-stone-900 uppercase transition-colors duration-300 hover:bg-stone-100"
          >
            Découvrir les vins
          </Link>
          <Link
            href="/domaine"
            className="border border-white/60 px-8 py-3.5 font-sans text-sm tracking-[0.15em] text-white uppercase transition-colors duration-300 hover:bg-white/10"
          >
            Explorer le domaine
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 animate-pulse flex-col items-center gap-2 text-white/50">
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase">Découvrir</span>
        <div className="h-10 w-px bg-white/30" />
      </div>
    </section>
  );
}
