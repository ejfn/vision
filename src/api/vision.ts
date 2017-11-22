import { ApiKey, getApiKey } from '../apiSelector';
import { VisionResult } from '../types/api';
import { b64toBinary } from '../utils';

export async function describeImage(base64: string): Promise<VisionResult> {
  const apiKey: ApiKey = getApiKey('Vision');

  const url: string = `${apiKey.url}/describe`;
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
    // tslint:disable-next-line:no-any
    const e: any = await response.json();
    throw new Error(e.message || e.error.message);
  }

  return response.json() as Promise<VisionResult>;
}
