import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { FadeImageMaterial } from "../shaders/FadeImagematerial";
import { extend } from "@react-three/fiber";
import gsap from "gsap";

extend({ FadeImageMaterial });

export default function NavImage({ index }) {
  const images = [
    "/nav/home.png",
    "/nav/services.png",
    "/nav/about.png",
    "/nav/contact.png",
  ];

  const textures = useLoader(THREE.TextureLoader, images);
  const materialRef = useRef();
  const progressRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(index);
  const [nextIndex, setNextIndex] = useState(index);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (index === currentIndex) return;

    setNextIndex(index);
    setIsAnimating(true);

    gsap.fromTo(
      materialRef.current.uniforms.uProgress,
      { value: 0 },
      {
        value: 1,
        duration: 1,
        ease: "power2.inOut",
        onUpdate: () => {
          progressRef.current = materialRef.current.uniforms.uProgress.value;
        },
        onComplete: () => {
          setCurrentIndex(index);
          materialRef.current.uniforms.uTexture1.value = textures[index];
          materialRef.current.uniforms.uProgress.value = 0;
          progressRef.current = 0;
          setIsAnimating(false);
        },
      }
    );

    materialRef.current.uniforms.uTexture2.value = textures[index];
  }, [index]);

  useFrame(({ clock }) => {
    if (!materialRef.current) return;

    if (isAnimating) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[6, 7]} />
      <fadeImageMaterial
        ref={materialRef}
        uTexture1={textures[currentIndex]}
        uTexture2={textures[nextIndex]}
        uProgress={0}
        uTime={0}
        transparent
      />
    </mesh>
  );
}
