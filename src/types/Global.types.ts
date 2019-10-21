export interface IResource {
  key: string;
  path: string;
}

export interface IAnimationConfig {
  start: number;
  end: number;
  frameRate: number;
  repeat: number;
}

export enum AnimationType {
  NoAnimation = "NoAnimation",
  OneDirection = "OneDirection",
  MultipleDirections = "MultipleDirections"
}
