import gsap from "gsap";
import { splitNavParagraphs } from "./splitNav";

export const animateNavigation = ({ state, refs, onComplete }) => {
  const { openNav, closing } = state;

  const { planeRef, logoRef, fpsRef, buttonRef, linkRefs, timelineRef } = refs;

  if (timelineRef.current) {
    timelineRef.current.kill();
    timelineRef.current = null;
  }

  if (openNav && !closing) {
    if (!planeRef.current?.material?.uniforms?.uOpacity) return;

    gsap.set([logoRef.current, fpsRef.current, buttonRef.current], {
      y: 100,
      opacity: 0,
    });

    gsap.set(linkRefs.current, {
      clipPath: "inset(100% 0 0 0)",
      opacity: 0,
    });

    gsap.set(planeRef.current.material.uniforms.uOpacity, { value: 0 });

    timelineRef.current = gsap.timeline();

    timelineRef.current.to(planeRef.current.material.uniforms.uOpacity, {
      value: 1,
      delay: 0.5,
      duration: 1.6,
      ease: "power2.out",
    });

    timelineRef.current.to(
      [logoRef.current, fpsRef.current, buttonRef.current],
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.3
      },
      "-=0.6"
    );

    timelineRef.current.to(
      linkRefs.current,
      {
        clipPath: "inset(0% 0 0 0)",
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.8"
    );
    splitNavParagraphs(document);
  }

  if (closing) {
    timelineRef.current = gsap.timeline();

    timelineRef.current.to(linkRefs.current, {
      clipPath: "inset(100% 0 0 0)",
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: "power2.in",
    });

    timelineRef.current.to(
      [logoRef.current, fpsRef.current, buttonRef.current],
      {
        y: 20,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        stagger: 0.05,
      },
      "-=0.4"
    );

    if (planeRef.current?.material?.uniforms?.uOpacity) {
      timelineRef.current.to(
        planeRef.current.material.uniforms.uOpacity,
        {
          value: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.3"
      );
    }

    timelineRef.current.call(() => {
      if (onComplete) onComplete();
    });
  }
};
