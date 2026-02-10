import { Main } from "./compositions/Main";

// Single composition configuration
// Total duration: 945 frames (scenes) - 108 frames (9 transitions × 12) = 837 + 30 buffer = 867 frames (~29s)
export const composition = {
  id: "Main",
  component: Main,
  durationInFrames: 870,
  fps: 30,
  width: 1280,
  height: 720,
};
