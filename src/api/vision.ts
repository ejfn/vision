import { VisionResult } from '../types/api';
import { b64toBinary } from '../utils';
import { VISION_API_KEY } from './keys';

export async function describeImage(base64: string): Promise<VisionResult> {

  const url: string = 'https://southeastasia.api.cognitive.microsoft.com/vision/v1.0/describe';

  const request: Request = new Request(
    url,
    {
      method: 'POST',
      body: b64toBinary(base64),
      headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': VISION_API_KEY
      }
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
