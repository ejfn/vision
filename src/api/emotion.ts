import { RequestPayload } from '../actions/process';
import { ApiKey, getApiKey } from '../apiSelector';
import { b64toBinary } from '../utils';
import { EmotionResult } from './types';

export async function postRecognizeEmotion(payload: RequestPayload): Promise<Array<EmotionResult>> {
  const apiKey: ApiKey = getApiKey('Emotion', payload.azureLocation);

  const url: string = `${apiKey.url}/recognize`;
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

  return response.json() as Promise<Array<EmotionResult>>;
}
