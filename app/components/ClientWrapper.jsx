"use client";

import { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function ClientWrapper({ children }) {
  const [showChildren, setShowChildren] = useState(false);

  const handleLoaderDone = () => {
    setShowChildren(true);
    requestAnimationFrame(() => {
      runAnimations();
    });
  };

  const runAnimations = async () => {
    const { split } = await import("../animations/text");
    const { revealImage } = await import("../animations/image");
    const { fadeInElements } = await import("../animations/fade");
    const { animateBars } = await import("../animations/bars");
    const { scroll } = await import("../animations/scroll");

    split();
    revealImage();
    fadeInElements();
    animateBars();
    scroll();
  };

  return <>{!showChildren ? <Loader onComplete={handleLoaderDone} /> : children}</>;
}
