"use client";

import { useEffect } from "react";
import { split } from "../animations/text";
import { revealImage } from "../animations/image";

export default function ClientWrapper({ children }) {
  useEffect(() => {
    split();
    revealImage();
  }, []);

  return <>{children}</>;
}  