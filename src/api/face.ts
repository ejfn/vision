import { ApiKey, getApiKey } from '../apiSelector';
import { b64toBinary } from '../utils';
import { FaceResult } from './types';

export async function postDetectFace(base64: string): Promise<Array<FaceResult>> {
  const apiKey: ApiKey = getApiKey('Face');

  const url: string = `${apiKey.url}/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender`;
  const headers: Headers = new Headers();
  headers.append('Content-Type', 'application/octet-stream');
  headers.append('Ocp-Apim-Subscription-Key', apiKey.key);

  const request: Request = new Request(
    url,
    {
      method: 'POST',
      body: b64toBinary(base64),
      headers
    }
  );

  const response: Response = await fetch(request);
  if (!response.ok) {
    // tslint:disable-next-line:no-unsafe-any
    throw new Error((await response.json()).error.message);
  }

  return response.json() as Promise<Array<FaceResult>>;
}
