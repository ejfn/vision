import { RequestPayload } from '../actions/process';
import { ApiKey, getApiKey } from '../apiSelector';
import { b64toBinary } from '../utils';
import { VisionResult } from './types';

export async function postDescribePhoto(payload: RequestPayload): Promise<VisionResult> {
  const apiKey: ApiKey = getApiKey('Vision', payload.azureLocation);

  const url: string = `${apiKey.url}/describe`;
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
    const e = await response.json();
    throw new Error(e.message || e.error.message);
  }

  return response.json() as Promise<VisionResult>;
}
