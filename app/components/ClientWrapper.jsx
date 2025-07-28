"use client";

import { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function ClientWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      const assets = [
        "/nav/about.webp",
        "/nav/contact.webp",
        "/nav/home.webp",
        "/nav/services.webp",
        "/Nike_ad.webm",
        "/our_services.webp",
      ];

      const updateProgress = (index) => {
        const percent = Math.floor(((index + 1) / assets.length) * 100);
        setProgress(percent);
      };

      const loadImage = (src, index) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = `${src}?cb=${Date.now()}`;
          img.onload = () => {
            updateProgress(index);
            resolve();
          };
          img.onerror = () => {
            updateProgress(index);
            resolve();
          };
        });

      const loadVideo = (src, index) =>
        new Promise((resolve) => {
          const video = document.createElement("video");
          video.src = `${src}?cb=${Date.now()}`;
          video.onloadeddata = () => {
            updateProgress(index);
            resolve();
          };
          video.onerror = () => {
            updateProgress(index);
            resolve();
          };
        });

      const loaders = assets.map((src, i) =>
        src.endsWith(".mp4") || src.endsWith(".webm")
          ? loadVideo(src, i)
          : loadImage(src, i)
      );

      await Promise.all(loaders);
      setLoading(true);

      setTimeout(() => {
        setShowChildren(true);

        requestAnimationFrame(() => {
          runAnimations();
        });
      }, 600);
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

    loadAssets();
  }, []);

  return <>{loading ? <Loader progress={progress} /> : children}</>;
}
