import {
  Scene,
  MeshBuilder,
  ExecuteCodeAction,
  ActionManager,
  Vector3,
} from "babylonjs";
import { BaseMesh } from "./BaseMesh";
import { SphereControls } from "../types";

export default class IcoSphere extends BaseMesh<SphereControls> {
  static build(scene: Scene): IcoSphere {
    const icosphere: IcoSphere = new IcoSphere("icosphere", scene);
    icosphere.buildSphere({ radius: 0.5, subdivisions: 5 });

    return icosphere;
  }

  buildSphere(options: any) {
    this.meshObject && this.meshObject.dispose();
    this.meshObject = MeshBuilder.CreateIcoSphere(
      this.name,
      options,
      this.scene
    );
    this.meshObject.position.set(-2, 0, 0);
    this.meshObject.parent = this.transformNode;

    // Attach click event listener to the mesh
    this.meshObject.actionManager = new ActionManager(this.scene);
    this.meshObject.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
        this.showGUI();
        this.applyBouncing(
          this.currentControls.amplitude?.current || 2,
          this.currentControls.duration?.current || 2000
        );
      })
    );
  }

  buildControls(): SphereControls {
    return {
      diameter: { current: 1.0, min: 0.1, max: 2.0 },
      subdivisions: { current: 5.0, min: 1.0, max: 10.0 },
      amplitude: { current: 2.0, min: 1.0, max: 5.0 },
      duration: { current: 2000.0, min: 1000.0, max: 5000.0 },
      onChangeHandler: (key: string, value: number) => {
        if (key === "diameter") {
          this.meshObject?.scaling.copyFromFloats(value, value, value);
        } else if (key === "subdivisions") {
          this.buildSphere({
            radius: this.currentControls.diameter.current / 2,
            subdivisions: Math.floor(value),
          });
        }
      },
    };
  }
}
