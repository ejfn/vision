import { decode } from 'base-64';

// const API_KEY: string = '********';

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

export async function faceDetect(base64: string): Promise<Array<FaceResult>> {

  const url: string = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect'
    + '?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender';

  const request: Request = new Request(
    url,
    {
      method: 'POST',
      body: b64toBinary(base64),
      headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': API_KEY
      }
    }
  );

  const response: Response = await fetch(request);
  if (!response.ok) {
    // tslint:disable-next-line:no-unsafe-any
    throw new Error((await response.json()).error.message);
  }

  return response.json() as Promise<Array<FaceResult>>;
}

function b64toBinary(b64Data: string): Uint8Array {
  const byteCharacters: string = decode(b64Data);
  const byteNumbers: Array<number> = [];
  for (let i: number = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  return new Uint8Array(byteNumbers);
}
