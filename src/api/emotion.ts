import { RequestPayload } from '../actions/process';
import { ApiLocationKey } from '../typings/extra';
import { base64ToBinary } from '../utils/base64';
import { EmotionResult } from './types';

export async function postRecognizeEmotion(payload: RequestPayload, key: ApiLocationKey): Promise<Array<EmotionResult>> {
  const url: string = `https://${key.location}.api.cognitive.microsoft.com/emotion/v1.0/recognize`;

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
    throw new Error((await response.json()).error.message);
  }

  return response.json() as Promise<Array<EmotionResult>>;
}
