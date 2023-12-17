import {
  Mesh,
  Scene,
  TransformNode,
  Animation,
  BounceEase,
  EasingFunction,
  Vector3,
  AnimationGroup,
} from "babylonjs";
import * as dat from "dat.gui";
import { Controls, Dimensions } from "../types";

export abstract class BaseMesh<T> {
  name: string;
  meshObject: Mesh | null = null;
  scene: Scene;
  currentControls: T;
  transformNode: TransformNode;

  constructor(name: string, scene: Scene) {
    this.name = name;
    this.scene = scene;
    this.transformNode = new TransformNode("root");
    this.currentControls = this.buildControls();
  }

  abstract buildControls(): T;

  showGUI(): void {
    //remove old gui
    const oldGuid = document.getElementById("datGUI");
    oldGuid && oldGuid.remove();

    //build new guid
    const gui = new dat.GUI();
    gui.domElement.style.marginTop = "10px";
    gui.domElement.id = "datGUI";

    for (const key in this.currentControls) {
      if (typeof this.currentControls[key] !== "function") {
        const { onChangeHandler } = this.currentControls as unknown as Controls;
        const dimensions = this.currentControls[key] as unknown as Dimensions;
        gui
          .add(dimensions, "current", dimensions.min, dimensions.max)
          .name(key.charAt(0).toUpperCase() + key.slice(1))
          .onChange((value: number) => onChangeHandler(key, value));
      }
    }

    gui.open();
  }

  applyBouncing(amplitude: number, duration: number): void {
    const initialPosition = this.transformNode.position.clone();
    const startPosition = initialPosition.add(new Vector3(0, amplitude, 0));
    const keyFrames = [];
    const fps = 60;
    const totalFrame = Math.floor((duration * fps) / 1000);

    const animation = new Animation(
      "BouncingAnimation",
      "position",
      fps,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    keyFrames.push({ frame: 0, value: startPosition });
    keyFrames.push({ frame: totalFrame, value: initialPosition });

    const easingFunction = new BounceEase();
    easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEOUT);
    animation.setEasingFunction(easingFunction);

    // run animation
    animation.setKeys(keyFrames);
    this.transformNode.animations.push(animation);

    const animationGroup = new AnimationGroup("animationGroup");
    animationGroup.addTargetedAnimation(animation, this.transformNode);
    animationGroup.play();
  }
}
