import { LoadingManager, UnsignedByteType } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export function createGLTFLoader(manager?: LoadingManager) {
  const loader = new GLTFLoader(manager);
  try {
    // wire DRACO if available in examples
    const draco = new DRACOLoader();
    // use default decoder path (examples provide network fallback); keep try/catch
    draco.setDecoderPath("/draco/");
    loader.setDRACOLoader(draco);
  } catch (e) {
    // ignore if DRACO not resolved in this environment
  }
  return loader;
}

export function createRGBELoader() {
  const loader = new RGBELoader();
  // use unsigned byte fallback for broader compatibility
  (loader as any).setDataType?.(UnsignedByteType);
  return loader;
}

export default {
  createGLTFLoader,
  createRGBELoader,
};
