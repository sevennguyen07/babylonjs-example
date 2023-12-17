import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  Vector3,
} from "babylonjs";
import Plane from "./objects/Plane";
import Cylinder from "./objects/Cylinder";
import IcoSphere from "./objects/IcoSphere";

export function createScene(canvas: HTMLCanvasElement): Scene {
  const engine = new Engine(canvas, true, {});
  const scene = new Scene(engine);

  // Camera
  const camera = new ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 2.5,
    4,
    new Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);

  // Light
  new HemisphericLight("light", new Vector3(0.5, 1, 0.8).normalize(), scene);

  // Objects
  Plane.build(scene);
  Cylinder.build(scene);
  IcoSphere.build(scene);

  return scene;
}
