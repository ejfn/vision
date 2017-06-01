import { decode } from 'base-64';

export interface FaceResult {
  faceId: string;
  faceRectangle: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
  faceLandmarks: {
    [key: string]: {
      x: number;
      y: number;
    }
  };
  faceAttributes: {
    age: number;
    gender: string;
    smile: number;
    facialHair: {
      mustache: number;
      beard: number;
      sideburns: number;
    },
    glasses: string;
    headPose: {
      roll: number;
      yaw: number;
      pitch: number;
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
        'Ocp-Apim-Subscription-Key': '7f94b81ff35743f687ebff1a86539a13'
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
