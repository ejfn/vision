import { EmotionResult } from '../types/api';
import { b64toBinary } from '../utils';
import { EMOTION_API_KEY } from './keys';

export async function detectEmotions(base64: string): Promise<Array<EmotionResult>> {

  const url: string = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize';

  const request: Request = new Request(
    url,
    {
      method: 'POST',
      body: b64toBinary(base64),
      headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': EMOTION_API_KEY
      }
    }
  );

  const response: Response = await fetch(request);
  if (!response.ok) {
    // tslint:disable-next-line:no-unsafe-any
    throw new Error((await response.json()).error.message);
  }

  return response.json() as Promise<Array<EmotionResult>>;
}
