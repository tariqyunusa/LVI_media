"use client";

import { useEffect } from "react";


export default function ClientWrapper({ children }) {
  useEffect(() => {
    const runAnimations = async () => {
      const { split } = await import("../animations/text");
      const { revealImage } = await import("../animations/image");
      const { fadeInElements } = await import("../animations/fade");
      const { animateBars } = await import("../animations/bars");
      const { scroll } = await import("../animations/scroll")

      split();
      revealImage();
      fadeInElements()
      animateBars()
      scroll()
    };

    runAnimations();
  }, []);

  return <>{children}</>;
}
