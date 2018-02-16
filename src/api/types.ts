export interface FaceRectangle {
  width: number;
  height: number;
  left: number;
  top: number;
}

export type Emotion = 'anger' | 'contempt' | 'disgust' | 'fear' | 'happiness' | 'neutral' | 'sadness' | 'surprise';

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
  emotion: Record<Emotion, number>;
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

export interface Description {
  tags: Array<string>;
  captions: Array<Caption>;
}

export interface Caption {
  text: string;
  confidence: number;
}

export interface VisionResult {
  description: Description;
}
