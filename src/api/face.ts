import { FaceResult } from '../types/api';
import { b64toBinary } from '../utils';
import { FACE_API_KEY, FACE_API_URL } from './config';

export async function detectFaces(base64: string): Promise<Array<FaceResult>> {

  const url: string = `${FACE_API_URL}/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender`;

  const request: Request = new Request(
    url,
    {
      method: 'POST',
      body: b64toBinary(base64),
      headers: [
        ['Content-Type', 'application/octet-stream'],
        ['Ocp-Apim-Subscription-Key', FACE_API_KEY]
      ]
    }
  );

  const response: Response = await fetch(request);
  if (!response.ok) {
    // tslint:disable-next-line:no-unsafe-any
    throw new Error((await response.json()).error.message);
  }

  return response.json() as Promise<Array<FaceResult>>;
}
