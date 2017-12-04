import { RequestPayload } from '../actions/process';
import { getApiKey } from '../apiSelector';
import { b64toBinary } from '../utils';
import { FaceResult } from './types';

export async function postDetectFace(payload: RequestPayload): Promise<Array<FaceResult>> {
  const apiKey = getApiKey('Face', payload.azureLocation);
  const url: string = `https://${payload.azureLocation}.api.cognitive.microsoft.com/face/v1.0/detect` +
    '?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender';

  const headers: Headers = new Headers();
  headers.append('Content-Type', 'application/octet-stream');
  headers.append('Ocp-Apim-Subscription-Key', apiKey.key);

  const request: Request = new Request(
    url,
    {
      method: 'POST',
      body: b64toBinary(payload.base64),
      headers
    }
  );

  const response: Response = await fetch(request);
  if (!response.ok) {
    throw new Error((await response.json()).error.message);
  }

  return response.json() as Promise<Array<FaceResult>>;
}
