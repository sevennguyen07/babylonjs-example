import { Scene } from "babylonjs";
import "babylonjs-loaders";
import { createScene } from "./src/scene";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("Couldn't find a canvas");
}

const scene: Scene = createScene(canvas);

scene.getEngine().runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  scene.getEngine().resize();
});
