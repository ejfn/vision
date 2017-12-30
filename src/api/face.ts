import { RequestPayload } from '../actions/process';
import { ApiLocationKey } from '../typings/config';
import { base64ToBinary } from '../utils/base64';
import { FaceResult } from './types';

export async function postDetectFace(payload: RequestPayload, key: ApiLocationKey): Promise<Array<FaceResult>> {
  const url: string = `https://${key.location}.api.cognitive.microsoft.com/face/v1.0/detect` +
    '?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender';

  const headers: Headers = new Headers();
  headers.append('Content-Type', 'application/octet-stream');
  headers.append('Ocp-Apim-Subscription-Key', key.key);

  const request: Request = new Request(
    url,
    {
      method: 'POST',
      body: base64ToBinary(payload.base64),
      headers
    }
  );

  const response: Response = await fetch(request);
  if (!response.ok) {
    throw new Error((await response.json()).error.message);
  }

  return response.json() as Promise<Array<FaceResult>>;
}
