import { shaderMaterial } from "@react-three/drei";

export const FadeImageMaterial = shaderMaterial(
  {
    uTexture1: null,
    uTexture2: null,
    uProgress: 0,
    uTime: 0,
    uDistort: 0,
    uOpacity: 1.0, 
  },
  // Vertex Shader
  `
    uniform float uTime;
    uniform float uDistort; 
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec2 centeredUv = uv - 0.5;
      float dist = length(centeredUv);
      float ripple = sin((10.0 * dist) - (uTime * 3.0)) * 0.2 * uDistort;
      vec3 displacedPosition = position + normal * ripple;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D uTexture1;
    uniform sampler2D uTexture2;
    uniform float uProgress;
    uniform float uTime;
    uniform float uOpacity;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      float ripple = sin(10.0 * distance(uv, vec2(0.5)) - uTime * 2.0) * 0.01;
      vec2 distortedUv = uv + ripple;

      vec4 tex1 = texture2D(uTexture1, distortedUv);
      vec4 tex2 = texture2D(uTexture2, distortedUv);
      vec4 finalColor = mix(tex1, tex2, uProgress);

      gl_FragColor = vec4(finalColor.rgb, finalColor.a * uOpacity); 
    }
  `
);

