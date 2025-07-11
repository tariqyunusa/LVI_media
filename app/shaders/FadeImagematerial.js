import { shaderMaterial } from "@react-three/drei";


export const FadeImageMaterial = shaderMaterial(
  {
    uTexture1: null,
    uTexture2: null,
    uProgress: 0,
    uTime: 0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D uTexture1;
    uniform sampler2D uTexture2;
    uniform float uProgress;
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Ripple distortion
      float ripple = sin(10.0 * distance(uv, vec2(0.5)) - uTime * 2.0) * 0.01;
      vec2 distortedUv = uv + ripple;

      vec4 tex1 = texture2D(uTexture1, distortedUv);
      vec4 tex2 = texture2D(uTexture2, distortedUv);

      gl_FragColor = mix(tex1, tex2, uProgress);
    }
  `
);
