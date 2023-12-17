export type Dimensions = {
  current: number;
  min: number;
  max: number;
};

export interface Controls {
  amplitude?: Dimensions;
  duration?: Dimensions;
  onChangeHandler: (name: string, value: number) => void;
}

export interface CubeControls extends Controls {
  width: Dimensions;
  height: Dimensions;
  depth: Dimensions;
}

export interface CylinderControls extends Controls {
  diameter: Dimensions;
  height: Dimensions;
}

export interface SphereControls extends Controls {
  diameter: Dimensions;
  subdivisions: Dimensions;
}
