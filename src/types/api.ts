export interface FaceRectangle {
  width: number;
  height: number;
  left: number;
  top: number;
}

export interface FaceAttributes {
  age: number;
  gender: string;
  smile: number;
  facialHair: {
    mustache: number;
    beard: number;
    sideburns: number;
  };
  glasses: string;
  headPose: {
    roll: number;
    yaw: number;
    pitch: number;
  };
}

export interface FaceResult {
  faceId: string;
  faceRectangle: FaceRectangle;
  faceAttributes: FaceAttributes;
  faceLandmarks: {
    [key: string]: {
      x: number;
      y: number;
    }
  };
}

export interface EmotionScores {
  [key: string]: number;
}

export interface EmotionResult {
  faceRectangle: FaceRectangle;
  scores: EmotionScores;
}
