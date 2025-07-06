"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

export default function ClientWrapper({ children }) {
  useEffect(() => {
    const runAnimations = async () => {
      const { split } = await import("../animations/text");
      const { revealImage } = await import("../animations/image");
      const { fadeInElements } = await import("../animations/fade");
      const { animateBars } = await import("../animations/bars");

      split();
      revealImage();
      fadeInElements()
      animateBars()
    };

    runAnimations();
  }, []);

  return <>{children}</>;
}
