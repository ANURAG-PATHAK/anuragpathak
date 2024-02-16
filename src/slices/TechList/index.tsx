"use client";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useEffect, useRef } from "react";
import { MdCircle } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {
  const component = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
          markers: true,
        },
      });
      tl.fromTo(
        ".tech-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(600, 400)
              : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400);
          },
          ease: "power1.inOut",
        },
      );
    }, component);
    return () => ctx.revert();
  }, []);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <Bounded as="div">
        <Heading as="h2" className="mb-8" size="xl">
          {slice.primary.heading}
        </Heading>
      </Bounded>
      {slice.items.map(({ tech_color, tech_name }, index) => (
        <div key={index} className="flex items-center justify-center gap-4">
          <span
            className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
            style={{
              color: tech_color ? tech_color : "inherit",
            }}
          >
            {tech_name}
          </span>
        </div>
      ))}
      {slice.items.map(({ tech_color, tech_name }, index) => (
        <div
          key={index}
          className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
          aria-label={tech_name || undefined}
        >
          {Array.from({ length: 15 }, (_, index) => (
            <div key={index} className="hidden md:flex items-center justify-center gap-4">
              <span
                className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
                style={{
                  color: index === 7 && tech_color ? tech_color : "inherit",
                }}
              >
                {tech_name}
              </span>
              <span className="text-3xl">
                <MdCircle />
              </span>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;
