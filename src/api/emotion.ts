import { ApiKey, getApiKey } from '../apiSelector';
import { EmotionResult } from '../types/api';
import { b64toBinary } from '../utils';

export async function detectEmotions(base64: string): Promise<Array<EmotionResult>> {
  const apiKey: ApiKey = getApiKey('Emotion');

  const url: string = `${apiKey.url}/recognize`;
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

  return response.json() as Promise<Array<EmotionResult>>;
}
