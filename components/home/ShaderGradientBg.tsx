"use client";

// Client-only ShaderGradient background (WebGL via three.js / R3F).
// Loaded with `dynamic(..., { ssr: false })` from CallToAction so it never
// runs during static export / SSR. Config generated on shadergradient.co —
// it includes editor-only keys, so we pass it through a typed cast (the
// component ignores keys it doesn't use at runtime).

import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import type { ComponentProps } from "react";

const gradientProps = {
  control: "props",
  animate: "on",
  axesHelper: "off",
  brightness: 0.8,
  cAzimuthAngle: 180,
  cDistance: 3.6,
  cPolarAngle: 90,
  cameraZoom: 1,
  color1: "#0C2218",
  color2: "#1E6F4E",
  color3: "#90A842",
  destination: "onCanvas",
  embedMode: "off",
  envPreset: "city",
  format: "gif",
  fov: 45,
  frameRate: 10,
  gizmoHelper: "hide",
  grain: "on",
  lightType: "3d",
  pixelDensity: 1.1,
  positionX: -1.4,
  positionY: 0,
  positionZ: 0,
  range: "disabled",
  rangeEnd: 40,
  rangeStart: 0,
  reflection: 0.1,
  rotationX: 0,
  rotationY: 10,
  rotationZ: 50,
  shader: "defaults",
  type: "waterPlane",
  uAmplitude: 1,
  uDensity: 2.1,
  uFrequency: 5.5,
  uSpeed: 0.3,
  uStrength: 4,
  uTime: 0,
  wireframe: false,
} as unknown as ComponentProps<typeof ShaderGradient>;

export default function ShaderGradientBg() {
  return (
    <ShaderGradientCanvas
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <ShaderGradient {...gradientProps} />
    </ShaderGradientCanvas>
  );
}
