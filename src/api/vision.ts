import { VISION_API_KEY, VISION_API_URL } from '../config';
import { VisionResult } from '../types/api';
import { b64toBinary } from '../utils';

export async function describeImage(base64: string): Promise<VisionResult> {

  const url: string = `${VISION_API_URL}/describe`;

  const headers: Headers = new Headers();
  headers.append('Content-Type', 'application/octet-stream');
  headers.append('Ocp-Apim-Subscription-Key', VISION_API_KEY);

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
