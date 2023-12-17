import {
  Scene,
  MeshBuilder,
  ActionManager,
  ExecuteCodeAction,
} from "babylonjs";
import { BaseMesh } from "./BaseMesh";
import { CylinderControls } from "../types";

export default class Cylinder extends BaseMesh<CylinderControls> {
  static build(scene: Scene): Cylinder {
    const cylinder: Cylinder = new Cylinder("cylinder", scene);
    cylinder.meshObject = MeshBuilder.CreateCylinder(this.name, {}, scene);
    cylinder.meshObject.parent = cylinder.transformNode;
    cylinder.meshObject.position.set(2, 0, 0);

    // Attach click event listener to the mesh
    cylinder.meshObject.actionManager = new ActionManager(scene);
    cylinder.meshObject.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, function (evt) {
        cylinder.showGUI();
        cylinder.applyBouncing(
          cylinder.currentControls.amplitude?.current || 2,
          cylinder.currentControls.duration?.current || 2000
        );
      })
    );

    return cylinder;
  }

  buildControls(): CylinderControls {
    return {
      diameter: { current: 1.0, min: 0.1, max: 2.0 },
      height: { current: 1.0, min: 0.1, max: 2.0 },
      amplitude: { current: 2.0, min: 1.0, max: 5.0 },
      duration: { current: 2000.0, min: 1000.0, max: 5000.0 },
      onChangeHandler: (): void => {
        this.meshObject?.scaling.copyFromFloats(
          this.currentControls.diameter.current,
          this.currentControls.height.current,
          this.currentControls.diameter.current
        );
      },
    };
  }
}
