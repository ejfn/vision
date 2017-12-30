import { RequestPayload } from '../actions/process';
import { ApiLocationKey } from '../typings/config';
import { base64ToBinary } from '../utils/base64';
import { VisionResult } from './types';

export async function postDescribePhoto(payload: RequestPayload, key: ApiLocationKey): Promise<VisionResult> {
  const url: string = `https://${key.location}.api.cognitive.microsoft.com/vision/v1.0/describe`;

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
    const e = await response.json();
    throw new Error(e.message || e.error.message);
  }

  return response.json() as Promise<VisionResult>;
}
