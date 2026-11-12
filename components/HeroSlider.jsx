"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StudioImage from "./StudioImage";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=80",
    title: "Find the studio your next shoot deserves",
    text: "Cyc walls, daylight lofts and fully lit sets, available by the hour and priced upfront.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1800&q=80",
    title: "Record clean audio without building a studio",
    text: "Book treated podcast rooms and recording suites with mics and mixers already set up.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1800&q=80",
    title: "Turn your empty space into creative income",
    text: "List your stage, workshop or rehearsal room and let verified creators book open hours.",
  },
];

export default function HeroSlider() {
  return (
    <section className="bg-neutral">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className="h-[72vh] min-h-[520px]"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-full w-full">
              <StudioImage
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/10" />
              <div className="container-page relative flex h-full items-center">
                <div className="max-w-2xl px-6 sm:px-10">
                  <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mt-5 max-w-xl text-lg text-white/85">
                    {slide.text}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/studios" className="btn btn-primary btn-lg">
                      Explore Studios
                    </Link>
                    <Link
                      href="/studios"
                      className="btn btn-lg border-white/70 bg-transparent text-white hover:bg-white hover:text-black"
                    >
                      Host Your Space
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
