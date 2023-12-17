import {
  Scene,
  MeshBuilder,
  Quaternion,
  ActionManager,
  ExecuteCodeAction,
} from "babylonjs";
import { BaseMesh } from "./BaseMesh";
import { CubeControls } from "../types";

export default class Plane extends BaseMesh<CubeControls> {
  static build(scene: Scene): Plane {
    const plane: Plane = new Plane("plane", scene);
    plane.meshObject = MeshBuilder.CreateBox(this.name, {}, scene);
    plane.meshObject.parent = plane.transformNode;
    plane.meshObject.rotationQuaternion = Quaternion.FromEulerAngles(
      0,
      Math.PI,
      0
    );

    // Attach click event listener to the box mesh
    plane.meshObject.actionManager = new ActionManager(scene);
    plane.meshObject.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, function (evt) {
        plane.showGUI();
        plane.applyBouncing(
          plane.currentControls.amplitude?.current || 2,
          plane.currentControls.duration?.current || 2000
        );
      })
    );

    return plane;
  }

  buildControls(): CubeControls {
    return {
      width: { current: 1.0, min: 0.1, max: 2.0 },
      height: { current: 1.0, min: 0.1, max: 2.0 },
      depth: { current: 1.0, min: 0.1, max: 2.0 },
      amplitude: { current: 2.0, min: 1.0, max: 5.0 },
      duration: { current: 2000.0, min: 1000.0, max: 5000.0 },
      onChangeHandler: () => {
        this.meshObject?.scaling.copyFromFloats(
          this.currentControls.width.current,
          this.currentControls.height.current,
          this.currentControls.depth.current
        );
      },
    };
  }
}
