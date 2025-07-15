import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { FadeImageMaterial } from "../shaders/FadeImagematerial";
import { extend } from "@react-three/fiber";
import gsap from "gsap";

extend({ FadeImageMaterial });

export default function NavImage({ index, isHovered, planeRef }) {
  const meshRef = useRef();
  const images = [
    "/nav/home.webp",
    "/nav/services.webp",
    "/nav/about.webp",
    "/nav/contact.webp",
  ];

  const textures = useLoader(THREE.TextureLoader, images);
  const materialRef = useRef();
  const progressRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(index);
  const [nextIndex, setNextIndex] = useState(index);
  const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
    if (planeRef) {
      planeRef.current = meshRef.current;
    }
  }, [planeRef]);

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

  const uniforms = materialRef.current.uniforms;
  if (isAnimating || isHovered) {
    uniforms.uTime.value = clock.getElapsedTime();
  }

  uniforms.uDistort.value = isHovered ? 1 : 0;
});


  return (
    <mesh  ref={meshRef}>
      <planeGeometry args={[6, 7, 64, 64]} />
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
